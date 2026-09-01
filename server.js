const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'gate_cs_2027_prep_secret_key_987654321';

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Create uploads directory if not exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500 MB limit
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
}

// Get Local Network IP address for phone access
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

// ==================== AUTH ROUTES ====================

// Register
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const existing = db.findUserByUsername(username);
    if (existing) {
      return res.status(400).json({ error: 'Username already taken. Please login instead.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = db.addUser(username, passwordHash);

    const token = jwt.sign({ userId: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '365d' });
    res.status(201).json({ token, username: newUser.username, userId: newUser.id });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const user = db.findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '365d' });
    res.json({ token, username: user.username, userId: user.id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// Get Current User
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ userId: req.user.userId, username: req.user.username });
});

// System Info Endpoint
app.get('/api/info', (req, res) => {
  res.json({ localIp: getLocalIp(), port: PORT });
});


// ==================== PROGRESS ROUTES ====================

app.get('/api/progress', authenticateToken, (req, res) => {
  try {
    const rows = db.getProgressByUser(req.user.userId);
    const progressMap = {};
    rows.forEach(r => {
      progressMap[r.topic_id] = { completed: r.completed === 1, notes: r.notes || '' };
    });
    res.json(progressMap);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Failed to fetch progress.' });
  }
});

app.post('/api/progress/toggle', authenticateToken, (req, res) => {
  const { topicId, completed, notes } = req.body;
  if (!topicId) {
    return res.status(400).json({ error: 'topicId is required.' });
  }

  try {
    const record = db.upsertProgress(req.user.userId, topicId, completed, notes);
    res.json({ topicId: record.topic_id, completed: record.completed === 1, notes: record.notes });
  } catch (err) {
    console.error('Error toggling progress:', err);
    res.status(500).json({ error: 'Failed to update topic progress.' });
  }
});


// ==================== CUSTOM HOLIDAYS ROUTES ====================

app.get('/api/holidays', authenticateToken, (req, res) => {
  try {
    const holidays = db.getHolidaysByUser(req.user.userId);
    res.json(holidays);
  } catch (err) {
    console.error('Error fetching holidays:', err);
    res.status(500).json({ error: 'Failed to fetch custom holidays.' });
  }
});

app.post('/api/holidays', authenticateToken, (req, res) => {
  const { holidayDate, title } = req.body;
  if (!holidayDate || !title) {
    return res.status(400).json({ error: 'holidayDate and title are required.' });
  }

  try {
    const newHoliday = db.addHoliday(req.user.userId, holidayDate, title);
    res.status(201).json(newHoliday);
  } catch (err) {
    console.error('Error adding holiday:', err);
    res.status(500).json({ error: 'Failed to add custom holiday.' });
  }
});

app.delete('/api/holidays/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  try {
    const success = db.deleteHoliday(req.user.userId, id);
    if (success) {
      res.json({ message: 'Holiday removed successfully.' });
    } else {
      res.status(404).json({ error: 'Holiday not found.' });
    }
  } catch (err) {
    console.error('Error deleting holiday:', err);
    res.status(500).json({ error: 'Failed to delete holiday.' });
  }
});


// ==================== FILE UPLOADS ROUTES ====================

app.post('/api/materials/upload', authenticateToken, upload.single('materialFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const subject = req.body.subject || 'General';

  try {
    const material = db.addMaterial(req.user.userId, req.file.filename, req.file.originalname, req.file.size, subject);
    res.status(201).json(material);
  } catch (err) {
    console.error('File DB insert error:', err);
    res.status(500).json({ error: 'Failed to record file in database.' });
  }
});

app.get('/api/materials', authenticateToken, (req, res) => {
  try {
    const files = db.getMaterialsByUser(req.user.userId);
    res.json(files);
  } catch (err) {
    console.error('Error fetching uploaded files:', err);
    res.status(500).json({ error: 'Failed to fetch uploaded files.' });
  }
});

app.get('/api/materials/download/:id', authenticateToken, (req, res) => {
  try {
    const file = db.getMaterialById(req.user.userId, req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const filePath = path.join(uploadsDir, file.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File missing on storage server.' });
    }

    res.download(filePath, file.original_name);
  } catch (err) {
    console.error('Error downloading file:', err);
    res.status(500).json({ error: 'Failed to download file.' });
  }
});

app.delete('/api/materials/:id', authenticateToken, (req, res) => {
  try {
    const file = db.deleteMaterial(req.user.userId, req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const filePath = path.join(uploadsDir, file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'File deleted successfully.' });
  } catch (err) {
    console.error('Error deleting file:', err);
    res.status(500).json({ error: 'Failed to delete file.' });
  }
});


// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server on 0.0.0.0 so phone can connect!
app.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log(`===================================================`);
  console.log(`🚀 GATE CS 2027 Prep Tracker Server Running!`);
  console.log(`💻 Laptop Access:  http://localhost:${PORT}`);
  console.log(`📱 Phone Access:   http://${localIp}:${PORT}`);
  console.log(`===================================================`);
});
