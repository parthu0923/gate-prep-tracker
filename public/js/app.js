// GATE CS 2027 Main Frontend Application Script

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE ---
  let currentUser = null;
  let jwtToken = localStorage.getItem('gate_token') || null;
  let userProgress = {}; // { topic_id: { completed: boolean, notes: string } }
  let customHolidays = []; // [{ id, holiday_date, title }]
  let uploadedMaterials = [];

  let currentDateObj = new Date('2026-09-07'); // Default start date Sept 7, 2026
  let sideCalendarMonthDate = new Date('2026-09-01');

  // --- INITIALIZATION ---
  initApp();

  async function initApp() {
    setupEventListeners();
    updateCountdown();
    fetchSystemInfo();

    if (jwtToken) {
      const verified = await fetchUserData();
      if (verified) {
        showDashboard();
      } else {
        showLandingAuth();
      }
    } else {
      showLandingAuth();
    }
  }

  async function fetchSystemInfo() {
    try {
      const res = await fetch('/api/info');
      if (res.ok) {
        const info = await res.json();
        const phoneUrlText = document.getElementById('phone-url-text');
        if (phoneUrlText) {
          phoneUrlText.innerText = `http://${info.localIp}:${info.port}`;
        }
      }
    } catch (err) {
      console.log('System info check skipped');
    }
  }

  function showLandingAuth() {
    document.getElementById('auth-landing-screen').classList.remove('hidden');
    document.getElementById('dashboard-app').classList.add('hidden');
  }

  function showDashboard() {
    document.getElementById('auth-landing-screen').classList.add('hidden');
    document.getElementById('dashboard-app').classList.remove('hidden');

    renderCurrentView('dashboard-view');
    renderSideCalendar();
    renderStudyDetails();
    renderSubjectsView();
    renderHolidaysList();
    renderMaterialsList();
  }

  // --- AUTH FUNCTIONS ---
  async function fetchUserData() {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      });
      if (res.ok) {
        currentUser = await res.json();
        updateUserUI();
        await syncUserProgress();
        await syncUserHolidays();
        await syncUserMaterials();
        return true;
      } else {
        logout();
        return false;
      }
    } catch (err) {
      console.error('Auth verification error:', err);
      return false;
    }
  }

  async function syncUserProgress() {
    if (!jwtToken) return;
    try {
      const res = await fetch('/api/progress', {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      });
      if (res.ok) {
        userProgress = await res.json();
        updateOverallProgressUI();
      }
    } catch (err) {
      console.error('Error syncing progress:', err);
    }
  }

  async function syncUserHolidays() {
    if (!jwtToken) return;
    try {
      const res = await fetch('/api/holidays', {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      });
      if (res.ok) {
        customHolidays = await res.json();
        renderSideCalendar();
        renderHolidaysList();
      }
    } catch (err) {
      console.error('Error syncing holidays:', err);
    }
  }

  async function syncUserMaterials() {
    if (!jwtToken) return;
    try {
      const res = await fetch('/api/materials', {
        headers: { 'Authorization': `Bearer ${jwtToken}` }
      });
      if (res.ok) {
        uploadedMaterials = await res.json();
        renderMaterialsList();
      }
    } catch (err) {
      console.error('Error syncing materials:', err);
    }
  }

  function updateUserUI() {
    const displayName = document.getElementById('user-display-name');
    const sidebarUsername = document.getElementById('sidebar-username');

    if (currentUser) {
      if (displayName) displayName.innerText = currentUser.username;
      if (sidebarUsername) sidebarUsername.innerText = currentUser.username;
    }
  }

  function logout() {
    localStorage.removeItem('gate_token');
    jwtToken = null;
    currentUser = null;
    userProgress = {};
    customHolidays = [];
    uploadedMaterials = [];
    showLandingAuth();
  }

  // --- COUNTDOWN TIMER ---
  function updateCountdown() {
    const examDate = new Date('2027-02-06T09:30:00+05:30');
    const now = new Date();
    const diffTime = examDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const countEl = document.getElementById('banner-countdown-badge');
    if (countEl) {
      countEl.innerHTML = `<i class="fa-solid fa-hourglass-half text-green"></i> ${diffDays} Days to GATE 2027`;
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Auth Tabs in Landing Screen
    document.getElementById('tab-login')?.addEventListener('click', () => {
      document.getElementById('tab-login').classList.add('active');
      document.getElementById('tab-register').classList.remove('active');
      document.getElementById('landing-login-form').classList.remove('hidden');
      document.getElementById('landing-register-form').classList.add('hidden');
    });

    document.getElementById('tab-register')?.addEventListener('click', () => {
      document.getElementById('tab-register').classList.add('active');
      document.getElementById('tab-login').classList.remove('active');
      document.getElementById('landing-register-form').classList.remove('hidden');
      document.getElementById('landing-login-form').classList.add('hidden');
    });

    // Login Form Submit
    document.getElementById('landing-login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;
      const errEl = document.getElementById('login-error');
      errEl.classList.add('hidden');

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          jwtToken = data.token;
          localStorage.setItem('gate_token', jwtToken);
          currentUser = { userId: data.userId, username: data.username };
          updateUserUI();
          await syncUserProgress();
          await syncUserHolidays();
          await syncUserMaterials();
          showDashboard();
        } else {
          errEl.innerText = data.error || 'Login failed.';
          errEl.classList.remove('hidden');
        }
      } catch (err) {
        errEl.innerText = 'Network error during login.';
        errEl.classList.remove('hidden');
      }
    });

    // Register Form Submit
    document.getElementById('landing-register-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value;
      const errEl = document.getElementById('reg-error');
      errEl.classList.add('hidden');

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
          jwtToken = data.token;
          localStorage.setItem('gate_token', jwtToken);
          currentUser = { userId: data.userId, username: data.username };
          updateUserUI();
          await syncUserProgress();
          await syncUserHolidays();
          await syncUserMaterials();
          showDashboard();
        } else {
          errEl.innerText = data.error || 'Registration failed.';
          errEl.classList.remove('hidden');
        }
      } catch (err) {
        errEl.innerText = 'Network error during registration.';
        errEl.classList.remove('hidden');
      }
    });

    // Logout Buttons
    document.getElementById('logout-btn')?.addEventListener('click', logout);
    document.getElementById('sidebar-logout-btn')?.addEventListener('click', logout);

    // Sidebar Drawer Toggle
    document.getElementById('menu-toggle-btn')?.addEventListener('click', () => {
      document.getElementById('app-sidebar').classList.add('open');
      document.getElementById('sidebar-overlay').classList.remove('hidden');
    });

    document.getElementById('close-sidebar-btn')?.addEventListener('click', () => {
      document.getElementById('app-sidebar').classList.remove('open');
      document.getElementById('sidebar-overlay').classList.add('hidden');
    });

    document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
      document.getElementById('app-sidebar').classList.remove('open');
      document.getElementById('sidebar-overlay').classList.add('hidden');
    });

    // Sidebar Nav Items
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        renderCurrentView(view);
        document.getElementById('app-sidebar').classList.remove('open');
        document.getElementById('sidebar-overlay').classList.add('hidden');
      });
    });

    // Side Calendar Month Navigation
    document.getElementById('side-prev-month-btn')?.addEventListener('click', () => {
      sideCalendarMonthDate.setMonth(sideCalendarMonthDate.getMonth() - 1);
      renderSideCalendar();
    });

    document.getElementById('side-next-month-btn')?.addEventListener('click', () => {
      sideCalendarMonthDate.setMonth(sideCalendarMonthDate.getMonth() + 1);
      renderSideCalendar();
    });

    // Add Custom Sudden Holiday Form
    document.getElementById('add-holiday-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const holidayDate = document.getElementById('holiday-date').value;
      const title = document.getElementById('holiday-title').value;

      try {
        const res = await fetch('/api/holidays', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify({ holidayDate, title })
        });
        if (res.ok) {
          document.getElementById('add-holiday-form').reset();
          await syncUserHolidays();
          alert('Sudden Holiday Added Successfully!');
        } else {
          const err = await res.json();
          alert(err.error || 'Failed to add holiday.');
        }
      } catch (err) {
        alert('Error connecting to server.');
      }
    });

    // Upload Material File
    const fileInput = document.getElementById('material-file-input');
    const selectedFileName = document.getElementById('selected-file-name');

    fileInput?.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        selectedFileName.innerText = `Selected: ${fileInput.files[0].name} (${(fileInput.files[0].size / (1024*1024)).toFixed(2)} MB)`;
        selectedFileName.classList.remove('hidden');
      }
    });

    document.getElementById('upload-material-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!fileInput.files.length) return;

      const formData = new FormData();
      formData.append('materialFile', fileInput.files[0]);
      formData.append('subject', document.getElementById('upload-subject').value);

      const submitBtn = document.getElementById('upload-submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Uploading...`;

      try {
        const res = await fetch('/api/materials/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${jwtToken}` },
          body: formData
        });

        if (res.ok) {
          document.getElementById('upload-material-form').reset();
          selectedFileName.classList.add('hidden');
          await syncUserMaterials();
          alert('File Uploaded Successfully!');
        } else {
          const err = await res.json();
          alert(err.error || 'Upload failed.');
        }
      } catch (err) {
        alert('Error during upload.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-upload"></i> Upload to Database`;
      }
    });

    // Global Search
    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results-dropdown');

    searchInput?.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
      }

      const matches = DAILY_SCHEDULE_RAW.filter(item => {
        return item.subject.toLowerCase().includes(query) ||
               item.title.toLowerCase().includes(query) ||
               item.subtopics.some(st => st.toLowerCase().includes(query));
      }).slice(0, 10);

      if (matches.length > 0) {
        searchResults.innerHTML = matches.map(m => `
          <div class="search-item" data-date="${m.date}">
            <div class="search-item-title">${m.title}</div>
            <div class="search-item-meta">${m.date} | ${m.subject}</div>
          </div>
        `).join('');

        searchResults.classList.remove('hidden');

        searchResults.querySelectorAll('.search-item').forEach(el => {
          el.addEventListener('click', () => {
            currentDateObj = new Date(el.dataset.date);
            sideCalendarMonthDate = new Date(el.dataset.date);
            renderCurrentView('dashboard-view');
            renderSideCalendar();
            renderStudyDetails();
            searchResults.classList.add('hidden');
            searchInput.value = '';
          });
        });
      } else {
        searchResults.innerHTML = `<div class="search-item"><div class="search-item-meta">No matching topics found.</div></div>`;
        searchResults.classList.remove('hidden');
      }
    });

    // AI Chatbot Controls
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotBtn = document.getElementById('close-chatbot-btn');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotInput = document.getElementById('chatbot-input');

    chatbotToggleBtn?.addEventListener('click', () => {
      chatbotWindow.classList.toggle('hidden');
    });

    closeChatbotBtn?.addEventListener('click', () => {
      chatbotWindow.classList.add('hidden');
    });

    chatbotSendBtn?.addEventListener('click', handleChatbotSend);
    chatbotInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleChatbotSend();
    });
  }

  // --- VIEW SWITCHER ---
  function renderCurrentView(viewId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(viewId)?.classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(btn => {
      if (btn.dataset.view === viewId) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    if (viewId === 'dashboard-view') {
      renderSideCalendar();
      renderStudyDetails();
    }
    if (viewId === 'subjects-view') renderSubjectsView();
    if (viewId === 'holidays-view') renderHolidaysList();
    if (viewId === 'materials-view') renderMaterialsList();
  }

  // --- RENDER SIDE CALENDAR (As requested in reference image!) ---
  function renderSideCalendar() {
    const year = sideCalendarMonthDate.getFullYear();
    const month = sideCalendarMonthDate.getMonth();

    const monthTitle = sideCalendarMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    document.getElementById('side-month-year-title').innerText = monthTitle;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const gridEl = document.getElementById('side-calendar-grid');
    gridEl.innerHTML = '';

    // Empty cells before 1st day of month
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'side-day-cell other-month';
      gridEl.appendChild(emptyCell);
    }

    const currentSelectedYMD = formatDateYMD(currentDateObj);

    // Days of current month
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const cellDateObj = new Date(year, month, day);
      const formattedDate = formatDateYMD(cellDateObj);
      const isSunday = cellDateObj.getDay() === 0;

      const officialHoliday = OFFICIAL_HOLIDAYS_2026[formattedDate];
      const customHoliday = customHolidays.find(h => h.holiday_date === formattedDate);
      const isHoliday = isSunday || officialHoliday || customHoliday;

      const isCompleted = userProgress[formattedDate]?.completed;
      const isSelected = formattedDate === currentSelectedYMD;

      const dayCell = document.createElement('div');
      dayCell.className = `side-day-cell ${isSunday ? 'is-sunday' : ''} ${isHoliday ? 'is-holiday' : ''} ${isSelected ? 'selected-day' : ''} ${isCompleted ? 'is-completed' : ''}`;

      dayCell.innerHTML = `
        <span>${day}</span>
        ${isSunday ? '<span class="day-subtag">SUN</span>' : (officialHoliday || customHoliday ? '<span class="day-subtag">HOL</span>' : '')}
      `;

      dayCell.addEventListener('click', () => {
        currentDateObj = new Date(cellDateObj);
        renderSideCalendar();
        renderStudyDetails();
      });

      gridEl.appendChild(dayCell);
    }
  }

  // --- RENDER STUDY DETAILS & HOURLY GANTT ---
  function renderStudyDetails() {
    const formattedDate = formatDateYMD(currentDateObj);
    const dateTitle = currentDateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    document.getElementById('banner-date-title').innerText = dateTitle;
    document.getElementById('gantt-date-tag').innerText = formattedDate;

    // Calculate day index out of 152
    const dayIndex = DAILY_SCHEDULE_RAW.findIndex(s => s.date === formattedDate);
    const dayCountText = dayIndex >= 0 ? `Day ${dayIndex + 1} of 152` : 'Free / Rest Day';
    document.getElementById('banner-day-count-badge').innerText = dayCountText;

    // Check Blackout Period
    const blackout = BLACKOUT_RANGES.find(r => formattedDate >= r.start && formattedDate <= r.end);
    const blackoutBanner = document.getElementById('blackout-banner');
    if (blackout) {
      document.getElementById('blackout-title').innerText = blackout.reason;
      blackoutBanner.classList.remove('hidden');
    } else {
      blackoutBanner.classList.add('hidden');
    }

    // Render Hourly Gantt Schedule Blocks
    const ganttContainer = document.getElementById('gantt-timeline-blocks');
    const isSunday = currentDateObj.getDay() === 0;

    if (isSunday) {
      ganttContainer.innerHTML = `
        <div class="gantt-block">
          <div class="gantt-block-time">04:00 PM - 06:30 PM (2.5h)</div>
          <div class="gantt-block-label">Maths / Intensive Concept Depth</div>
        </div>
        <div class="gantt-block practice-block">
          <div class="gantt-block-time">07:30 PM - 10:00 PM (2.5h)</div>
          <div class="gantt-block-label">GATE PYQs & Marathon Solving</div>
        </div>
      `;
    } else {
      ganttContainer.innerHTML = `
        <div class="gantt-block">
          <div class="gantt-block-time">08:30 PM - 09:30 PM (1.0h)</div>
          <div class="gantt-block-label">Core Concept & Video Lecture</div>
        </div>
        <div class="gantt-block practice-block">
          <div class="gantt-block-time">09:30 PM - 10:30 PM (1.0h)</div>
          <div class="gantt-block-label">PYQs & Problem Exercises</div>
        </div>
      `;
    }

    // Render Main Topic Card Details
    const scheduleItem = DAILY_SCHEDULE_RAW.find(s => s.date === formattedDate);
    const container = document.getElementById('study-card-container');

    if (!scheduleItem) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px;">
          <i class="fa-solid fa-bed" style="font-size: 36px; color: var(--text-muted); margin-bottom: 12px;"></i>
          <h3>Rest or Self-Study Day</h3>
          <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">No specific assigned GATE topic for ${dateTitle}. Use this time for PYQs or catching up on weak areas!</p>
        </div>
      `;
      return;
    }

    const subjectMeta = SUBJECT_METADATA[scheduleItem.subject] || { color: '#6366f1', youtube: 'Gate Smashers / Neso', textbook: 'Standard Reference' };
    const isCompleted = userProgress[scheduleItem.date]?.completed || false;

    container.innerHTML = `
      <div class="study-card ${isSunday || OFFICIAL_HOLIDAYS_2026[formattedDate] ? 'holiday-card' : ''}">
        <div class="study-card-header">
          <span class="subject-badge" style="background-color: ${subjectMeta.color}">
            <i class="fa-solid fa-book"></i> ${scheduleItem.subject}
          </span>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);">
            <i class="fa-solid fa-clock text-amber"></i> Target: ${scheduleItem.hours}
          </span>
        </div>

        <div class="study-card-body">
          <h1 class="topic-main-title">${scheduleItem.title}</h1>

          <!-- Recommendations Grid -->
          <div class="recommendations-grid">
            <div class="rec-card">
              <i class="fa-brands fa-youtube rec-icon text-red"></i>
              <div>
                <div class="rec-title">Recommended YouTube Teacher</div>
                <div class="rec-content">${subjectMeta.youtube}</div>
              </div>
            </div>
            <div class="rec-card">
              <i class="fa-solid fa-book-open-reader rec-icon text-cyan"></i>
              <div>
                <div class="rec-title">Recommended Textbook</div>
                <div class="rec-content">${subjectMeta.textbook}</div>
              </div>
            </div>
          </div>

          <!-- Subtopics Checklist -->
          <div class="subtopics-box">
            <h4><i class="fa-solid fa-list-check"></i> Subtopics & Key Concepts</h4>
            <div class="subtopics-list">
              ${scheduleItem.subtopics.map((st, idx) => `
                <label class="subtopic-item">
                  <input type="checkbox" class="subtopic-checkbox" data-index="${idx}">
                  <span>${st}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="study-card-footer">
          <button id="toggle-completion-btn" class="completion-status-btn ${isCompleted ? 'completed' : 'incomplete'}">
            <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
            ${isCompleted ? 'Completed Topic' : 'Mark Topic as Completed'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('toggle-completion-btn')?.addEventListener('click', async () => {
      try {
        const res = await fetch('/api/progress/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify({ topicId: scheduleItem.date, completed: !isCompleted })
        });
        if (res.ok) {
          const data = await res.json();
          userProgress[scheduleItem.date] = { completed: data.completed };
          updateOverallProgressUI();
          renderSideCalendar();
          renderStudyDetails();
        }
      } catch (err) {
        console.error('Error toggling topic:', err);
      }
    });
  }

  // --- RENDER SYLLABUS ---
  function renderSubjectsView() {
    const subjectsGrid = document.getElementById('subjects-grid');
    if (!subjectsGrid) return;

    const subjectsList = Object.keys(SUBJECT_METADATA);

    subjectsGrid.innerHTML = subjectsList.map(subj => {
      const meta = SUBJECT_METADATA[subj];
      const subjTopics = DAILY_SCHEDULE_RAW.filter(s => s.subject === subj);
      const totalTopics = subjTopics.length;
      const completedTopics = subjTopics.filter(s => userProgress[s.date]?.completed).length;
      const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <span class="subject-badge" style="background-color: ${meta.color}">
              <i class="fa-solid fa-book"></i> ${subj}
            </span>
            <span style="font-size: 13px; font-weight: 700; color: #a5b4fc;">${percent}%</span>
          </div>
          <div class="progress-bar-bg" style="margin-bottom: 14px;">
            <div class="progress-bar-fill" style="width: ${percent}%; background: ${meta.color};"></div>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); display: flex; flex-direction: column; gap: 6px;">
            <div><strong>Teacher:</strong> ${meta.youtube}</div>
            <div><strong>Textbook:</strong> ${meta.textbook}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- RENDER HOLIDAYS LIST ---
  function renderHolidaysList() {
    const container = document.getElementById('holidays-list-container');
    if (!container) return;

    const officialItems = Object.entries(OFFICIAL_HOLIDAYS_2026).map(([date, title]) => `
      <div class="holiday-item official-holiday">
        <div>
          <strong style="color: var(--red-holiday); font-size: 14px;">${date}</strong>
          <div style="font-size: 13px; font-weight: 600; margin-top: 2px;">${title}</div>
        </div>
        <span class="status-tag" style="background: var(--red-holiday-bg); color: var(--red-holiday);">Official</span>
      </div>
    `);

    const customItems = customHolidays.map(h => `
      <div class="holiday-item custom-holiday">
        <div>
          <strong style="color: var(--amber-warning); font-size: 14px;">${h.holiday_date}</strong>
          <div style="font-size: 13px; font-weight: 600; margin-top: 2px;">${h.title}</div>
        </div>
        <button class="btn btn-outline btn-sm text-red delete-holiday-btn" data-id="${h.id}">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    `);

    container.innerHTML = [...customItems, ...officialItems].join('');

    container.querySelectorAll('.delete-holiday-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        try {
          const res = await fetch(`/api/holidays/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${jwtToken}` }
          });
          if (res.ok) {
            await syncUserHolidays();
          }
        } catch (err) {
          console.error('Error deleting holiday:', err);
        }
      });
    });
  }

  // --- RENDER UPLOADS MATERIALS LIST ---
  function renderMaterialsList() {
    const container = document.getElementById('materials-list-container');
    if (!container) return;

    if (uploadedMaterials.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 30px;">
          <i class="fa-solid fa-folder-open" style="font-size: 32px; margin-bottom: 8px;"></i>
          <p>No study documents uploaded yet.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = uploadedMaterials.map(m => `
      <div class="material-item">
        <div>
          <strong style="font-size: 14px;">${m.original_name}</strong>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
            Subject: ${m.subject} | Size: ${(m.filesize / (1024*1024)).toFixed(2)} MB
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <a href="/api/materials/download/${m.id}" class="btn btn-secondary btn-sm" download target="_blank">
            <i class="fa-solid fa-download"></i>
          </a>
          <button class="btn btn-outline btn-sm text-red delete-file-btn" data-id="${m.id}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.delete-file-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        try {
          const res = await fetch(`/api/materials/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${jwtToken}` }
          });
          if (res.ok) {
            await syncUserMaterials();
          }
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      });
    });
  }

  // --- UPDATE OVERALL PROGRESS UI ---
  function updateOverallProgressUI() {
    const totalCount = DAILY_SCHEDULE_RAW.length;
    const completedCount = Object.values(userProgress).filter(p => p.completed).length;
    const percent = Math.round((completedCount / totalCount) * 100);

    const barEl = document.getElementById('sidebar-progress-bar');
    const textEl = document.getElementById('sidebar-progress-percent');
    if (barEl) barEl.style.width = `${percent}%`;
    if (textEl) textEl.innerText = `${percent}% (${completedCount}/${totalCount})`;
  }

  // --- AI CHATBOT HANDLER ---
  function handleChatbotSend() {
    const input = document.getElementById('chatbot-input');
    const query = input.value.trim();
    if (!query) return;

    appendChatMessage(query, 'user-msg');
    input.value = '';

    setTimeout(() => {
      const response = generateBotResponse(query);
      appendChatMessage(response, 'bot-msg');
    }, 400);
  }

  function appendChatMessage(msg, type) {
    const messagesBox = document.getElementById('chatbot-messages');
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${type}`;
    msgEl.innerText = msg;
    messagesBox.appendChild(msgEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function generateBotResponse(q) {
    const lower = q.toLowerCase();
    if (lower.includes('channel') || lower.includes('youtube') || lower.includes('teacher')) {
      return "For GATE CS core subjects: Neso Academy is gold for Digital Logic; Abdul Bari is unmatched for Algorithms & DS; Vishwadeep Gothi for COA & DBMS; Gate Smashers for Operating Systems & Networks!";
    }
    if (lower.includes('book') || lower.includes('textbook')) {
      return "Top recommended books: CLRS for Algorithms; Kenneth Rosen for Discrete Math; Silberschatz for OS & DBMS; Tanenbaum for Computer Networks; Morris Mano for Digital Logic.";
    }
    if (lower.includes('blackout') || lower.includes('exam')) {
      return "Your study planner automatically reserves blackout periods for college exams (Oct 12 - Nov 20 for Sem 1 Mid-2 & End-sem; Jan 15 - Jan 27 for Sem 2 Mid-1) so you have zero GATE stress during college exams!";
    }
    if (lower.includes('countdown') || lower.includes('date') || lower.includes('when')) {
      return "GATE CS 2027 is scheduled for Feb 6-7, 2027 by IIT Madras. You have ~152 dedicated study days!";
    }
    return "I'm your GATE CS 2027 assistant! You can ask me about recommended YouTube channels, standard textbooks, syllabus topics, or exam blackout schedules.";
  }

  // --- HELPER UTILS ---
  function formatDateYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
});
