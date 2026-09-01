const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const dbFilePath = path.join(dataDir, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initial Database Structure
const initialData = {
  users: [],
  topic_progress: [],
  custom_holidays: [],
  uploaded_materials: [],
  lastIds: {
    users: 0,
    topic_progress: 0,
    custom_holidays: 0,
    uploaded_materials: 0
  }
};

function loadDb() {
  if (!fs.existsSync(dbFilePath)) {
    saveDb(initialData);
    return initialData;
  }
  try {
    const raw = fs.readFileSync(dbFilePath, 'utf8');
    const data = JSON.parse(raw);
    if (!data.lastIds) {
      data.lastIds = {
        users: data.users.length ? Math.max(...data.users.map(u => u.id)) : 0,
        topic_progress: data.topic_progress.length ? Math.max(...data.topic_progress.map(t => t.id)) : 0,
        custom_holidays: data.custom_holidays.length ? Math.max(...data.custom_holidays.map(h => h.id)) : 0,
        uploaded_materials: data.uploaded_materials.length ? Math.max(...data.uploaded_materials.map(m => m.id)) : 0
      };
    }
    return data;
  } catch (err) {
    console.error('Error reading DB file, creating fresh DB:', err);
    saveDb(initialData);
    return initialData;
  }
}

function saveDb(data) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving DB file:', err);
  }
}

const db = {
  getUsers: () => loadDb().users,
  findUserByUsername: (username) => loadDb().users.find(u => u.username.toLowerCase() === username.toLowerCase()),
  findUserById: (id) => loadDb().users.find(u => u.id === id),
  addUser: (username, passwordHash) => {
    const data = loadDb();
    data.lastIds.users += 1;
    const newUser = {
      id: data.lastIds.users,
      username,
      password_hash: passwordHash,
      created_at: new Date().toISOString()
    };
    data.users.push(newUser);
    saveDb(data);
    return newUser;
  },

  // Progress
  getProgressByUser: (userId) => {
    const data = loadDb();
    return data.topic_progress.filter(tp => tp.user_id === userId);
  },
  upsertProgress: (userId, topicId, completed, notes) => {
    const data = loadDb();
    let record = data.topic_progress.find(tp => tp.user_id === userId && tp.topic_id === topicId);
    if (record) {
      if (completed !== undefined) record.completed = completed ? 1 : 0;
      if (notes !== undefined) record.notes = notes;
      record.updated_at = new Date().toISOString();
    } else {
      data.lastIds.topic_progress += 1;
      record = {
        id: data.lastIds.topic_progress,
        user_id: userId,
        topic_id: topicId,
        completed: completed ? 1 : 0,
        notes: notes || '',
        updated_at: new Date().toISOString()
      };
      data.topic_progress.push(record);
    }
    saveDb(data);
    return record;
  },

  // Custom Holidays
  getHolidaysByUser: (userId) => {
    const data = loadDb();
    return data.custom_holidays.filter(h => h.user_id === userId);
  },
  addHoliday: (userId, holidayDate, title) => {
    const data = loadDb();
    let existing = data.custom_holidays.find(h => h.user_id === userId && h.holiday_date === holidayDate);
    if (existing) {
      existing.title = title;
      saveDb(data);
      return existing;
    }
    data.lastIds.custom_holidays += 1;
    const newHoliday = {
      id: data.lastIds.custom_holidays,
      user_id: userId,
      holiday_date: holidayDate,
      title,
      created_at: new Date().toISOString()
    };
    data.custom_holidays.push(newHoliday);
    saveDb(data);
    return newHoliday;
  },
  deleteHoliday: (userId, holidayId) => {
    const data = loadDb();
    const initialLen = data.custom_holidays.length;
    data.custom_holidays = data.custom_holidays.filter(h => !(h.id === Number(holidayId) && h.user_id === userId));
    saveDb(data);
    return data.custom_holidays.length < initialLen;
  },

  // Uploaded Materials
  getMaterialsByUser: (userId) => {
    const data = loadDb();
    return data.uploaded_materials.filter(m => m.user_id === userId);
  },
  getMaterialById: (userId, id) => {
    const data = loadDb();
    return data.uploaded_materials.find(m => m.id === Number(id) && m.user_id === userId);
  },
  addMaterial: (userId, filename, originalName, filesize, subject) => {
    const data = loadDb();
    data.lastIds.uploaded_materials += 1;
    const newMaterial = {
      id: data.lastIds.uploaded_materials,
      user_id: userId,
      filename,
      original_name: originalName,
      filesize,
      subject: subject || 'General',
      uploaded_at: new Date().toISOString()
    };
    data.uploaded_materials.push(newMaterial);
    saveDb(data);
    return newMaterial;
  },
  deleteMaterial: (userId, id) => {
    const data = loadDb();
    const file = data.uploaded_materials.find(m => m.id === Number(id) && m.user_id === userId);
    if (file) {
      data.uploaded_materials = data.uploaded_materials.filter(m => m.id !== Number(id));
      saveDb(data);
    }
    return file;
  }
};

module.exports = db;
