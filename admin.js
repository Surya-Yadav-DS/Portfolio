// ─────────────────────────────────────────────────────────────
//  admin.js  —  Password-protected admin panel logic
//  ⚠  CHANGE THE PASSWORD BELOW before publishing!
// ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'Sydv@1122'; // ← CHANGE THIS before going live

// ── Authentication ────────────────────────────────────────────
function tryLogin() {
    const pw = document.getElementById('pwInput').value;
    if (pw === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminAuth', '1');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminPanel').classList.add('visible');
        initAdmin();
    } else {
        document.getElementById('loginError').classList.add('show');
        document.getElementById('pwInput').value = '';
        document.getElementById('pwInput').focus();
    }
}

function logout() {
    sessionStorage.removeItem('adminAuth');
    location.reload();
}

// Check if already authenticated this session
if (sessionStorage.getItem('adminAuth') === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').classList.add('visible');
}

// ── Load / Save data ──────────────────────────────────────────
let data = JSON.parse(localStorage.getItem('portfolioData')) || getDefaults();

function saveAll() {
    localStorage.setItem('portfolioData', JSON.stringify(data));
    showNotif('✓ Saved! Use "Export for Vercel" → push to GitHub to update your live site.');
}

// ── Init admin panel ──────────────────────────────────────────
function initAdmin() {
    loadProfileFields();
    loadPhotoPreview();
    renderSkills();
    renderProjects();
    renderResearch();
    renderAchievements();
    renderEducation();
    renderExperience();
    loadMessages();
    updateUnreadBadge();
}

// ── Tabs ──────────────────────────────────────────────────────
function switchTab(name, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + name).classList.add('active');
    if (name === 'messages') loadMessages();
}

// ── PROFILE ──────────────────────────────────────────────────
function loadProfileFields() {
    const p = data.profile || {};
    setValue('p_name',     p.name     || '');
    setValue('p_title',    p.title    || '');
    setValue('p_email',    p.email    || '');
    setValue('p_phone',    p.phone    || '');
    setValue('p_location', p.location || '');
    setValue('p_github',   p.github   || '');
    setValue('p_linkedin', p.linkedin || '');
    setValue('p_scholar',  p.scholar  || '');
    setValue('p_resume',   p.resume   || '');
}
function setValue(id, val) { const e = document.getElementById(id); if (e) e.value = val; }

function saveProfile() {
    data.profile = {
        name:     document.getElementById('p_name').value.trim(),
        title:    document.getElementById('p_title').value.trim(),
        email:    document.getElementById('p_email').value.trim(),
        phone:    document.getElementById('p_phone').value.trim(),
        location: document.getElementById('p_location').value.trim(),
        github:   document.getElementById('p_github').value.trim(),
        linkedin: document.getElementById('p_linkedin').value.trim(),
        scholar:  document.getElementById('p_scholar').value.trim(),
        resume:   document.getElementById('p_resume').value.trim(),
    };
    saveAll();
}

// ── PHOTO ─────────────────────────────────────────────────────
function loadPhotoPreview() {
    const saved = localStorage.getItem('profilePhoto');
    if (saved) showPhotoPreview(saved);
}
function uploadPhoto(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        localStorage.setItem('profilePhoto', ev.target.result);
        showPhotoPreview(ev.target.result);
        showNotif('✓ Photo saved!');
    };
    reader.readAsDataURL(file);
}
function showPhotoPreview(src) {
    const img  = document.getElementById('adminPhotoPreview');
    const icon = document.querySelector('.photo-upload-area .upload-icon');
    const txts = document.querySelectorAll('.photo-upload-area p');
    img.src = src; img.style.display = 'block';
    if (icon) icon.style.display = 'none';
    txts.forEach(t => { t.style.display = 'none'; });
}
function removePhoto() {
    localStorage.removeItem('profilePhoto');
    const img  = document.getElementById('adminPhotoPreview');
    const icon = document.querySelector('.photo-upload-area .upload-icon');
    const txts = document.querySelectorAll('.photo-upload-area p');
    img.style.display = 'none';
    if (icon) icon.style.display = '';
    txts.forEach(t => { t.style.display = ''; });
    showNotif('✓ Photo removed.');
}

// ── Notification ──────────────────────────────────────────────
function showNotif(msg) {
    const n = document.getElementById('saveNotif');
    if (n) {
        const span = n.querySelector('.notif-text');
        if (span && msg) span.textContent = msg;
        n.classList.add('show');
        setTimeout(() => n.classList.remove('show'), 3500);
    }
}

// ── RENDER HELPERS ────────────────────────────────────────────
function renderSkills() {
    const list = document.getElementById('skillsList');
    if (!list) return;
    list.innerHTML = (data.skills || []).map((cat, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <div class="item-card-title"><i class="fas ${cat.icon || 'fa-code'}"></i> ${cat.title}</div>
                <div class="item-card-actions">
                    <button class="btn btn-ghost btn-sm" onclick="editItem('skill',${i})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('skill',${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="item-card-sub">${(cat.skills || []).map(s => `${s.name} (${s.level}%)`).join(' · ')}</div>
        </div>`).join('');
}

function renderProjects() {
    const list = document.getElementById('projectsList');
    if (!list) return;
    list.innerHTML = (data.projects || []).map((p, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <div class="item-card-title">${p.title}</div>
                <div class="item-card-actions">
                    <button class="btn btn-ghost btn-sm" onclick="editItem('project',${i})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('project',${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="item-card-sub">${p.description || ''}</div>
            <div class="item-card-tags">${(p.tags || []).map(t => `<span class="item-tag">${t}</span>`).join('')}</div>
        </div>`).join('');
}

function renderResearch() {
    const list = document.getElementById('researchList');
    if (!list) return;
    list.innerHTML = (data.research || []).map((r, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <div class="item-card-title">${r.title}</div>
                <div class="item-card-actions">
                    <button class="btn btn-ghost btn-sm" onclick="editItem('research',${i})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('research',${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="item-card-sub">${r.authors || ''} · ${r.venue || ''} · ${r.year || ''}</div>
        </div>`).join('');
}

function renderAchievements() {
    const list = document.getElementById('achievementsList');
    if (!list) return;
    list.innerHTML = (data.achievements || []).map((a, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <div class="item-card-title"><i class="fas ${a.icon || 'fa-award'}"></i> ${a.title}</div>
                <div class="item-card-actions">
                    <button class="btn btn-ghost btn-sm" onclick="editItem('achievement',${i})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('achievement',${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="item-card-sub">${a.category || ''} · ${a.date || ''}</div>
        </div>`).join('');
}

function renderEducation() {
    const list = document.getElementById('educationList');
    if (!list) return;
    list.innerHTML = (data.education || []).map((e, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <div class="item-card-title">${e.degree}</div>
                <div class="item-card-actions">
                    <button class="btn btn-ghost btn-sm" onclick="editItem('education',${i})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('education',${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="item-card-sub">${e.institution || ''} · ${e.period || ''}${e.gpa ? ' · GPA: ' + e.gpa : ''}</div>
        </div>`).join('');
}

function renderExperience() {
    const list = document.getElementById('experienceList');
    if (!list) return;
    list.innerHTML = (data.experience || []).map((e, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <div class="item-card-title">${e.title}</div>
                <div class="item-card-actions">
                    <button class="btn btn-ghost btn-sm" onclick="editItem('experience',${i})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('experience',${i})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="item-card-sub">${e.company || ''} · ${e.location || ''} · ${e.period || ''}</div>
        </div>`).join('');
}

// ── MODAL ─────────────────────────────────────────────────────
let modalType = '', modalIndex = -1;

// ────────────────────────────────────────────────────────────────
//  FORMS definition
//  BUG FIX: The original read() closures used "d.field = v(...)" which
//  mutated the original data object in place — making subsequent edits
//  of the same item appear blank or corrupted. Fixed: read() only
//  reads from the DOM. openModal() deep-copies the item before passing
//  it to html(), so the live data is never touched by the modal.
// ────────────────────────────────────────────────────────────────
const FORMS = {
    skill: {
        title: 'Skill Category',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Category Name</label><input class="fi" id="m_title" value="${esc(d.title || '')}" placeholder="e.g. Machine Learning"></div>
            <div class="fg"><label class="fl">Icon (Font Awesome class)</label><input class="fi" id="m_icon" value="${esc(d.icon || 'fa-code')}" placeholder="fa-brain"></div>
            <div class="fg"><label class="fl">Skills (one per line: Name, Level%)</label>
                <textarea class="fi" id="m_skills" rows="6" placeholder="TensorFlow, 90&#10;PyTorch, 85&#10;Scikit-learn, 95">${(d.skills || []).map(s => s.name + ', ' + s.level).join('\n')}</textarea>
            </div>`,
        read: () => ({
            title: v('m_title'),
            icon:  v('m_icon') || 'fa-code',
            skills: v('m_skills').split('\n').map(l => {
                const parts = l.split(',').map(x => x.trim());
                const name  = parts[0];
                const level = parseInt(parts[1]) || 80;
                return name ? { name, level } : null;
            }).filter(Boolean)
        }),
        array: 'skills'
    },
    project: {
        title: 'Project',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Title</label><input class="fi" id="m_title" value="${esc(d.title || '')}" placeholder="Project title"></div>
            <div class="fg"><label class="fl">Description</label><textarea class="fi" id="m_desc" rows="3" placeholder="What does it do?">${esc(d.description || '')}</textarea></div>
            <div class="fg"><label class="fl">Highlight Badge</label><input class="fi" id="m_highlight" value="${esc(d.highlight || '')}" placeholder="94% Accuracy"></div>
            <div class="fg"><label class="fl">Tags (comma-separated)</label><input class="fi" id="m_tags" value="${esc((d.tags || []).join(', '))}" placeholder="Python, TensorFlow, Docker"></div>
            <div class="fg"><label class="fl">GitHub URL</label><input class="fi" type="url" id="m_github" value="${esc(d.github || '')}" placeholder="https://github.com/..."></div>
            <div class="fg"><label class="fl">Live Demo URL</label><input class="fi" type="url" id="m_live" value="${esc(d.live || '')}" placeholder="https://demo.example.com"></div>`,
        read: () => ({
            title:       v('m_title'),
            description: v('m_desc'),
            highlight:   v('m_highlight'),
            tags:        v('m_tags').split(',').map(t => t.trim()).filter(Boolean),
            github:      v('m_github'),
            live:        v('m_live'),
        }),
        array: 'projects'
    },
    research: {
        title: 'Research Publication',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Title</label><input class="fi" id="m_title" value="${esc(d.title || '')}" placeholder="Paper title"></div>
            <div class="fg"><label class="fl">Authors</label><input class="fi" id="m_authors" value="${esc(d.authors || '')}" placeholder="Your Name, Co-Author"></div>
            <div class="fg"><label class="fl">Venue / Journal</label><input class="fi" id="m_venue" value="${esc(d.venue || '')}" placeholder="IEEE Conference on..."></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Year</label><input class="fi" id="m_year" value="${esc(d.year || '')}" placeholder="2024"></div>
                <div class="fg"><label class="fl">Citations</label><input class="fi" type="number" id="m_cit" value="${d.citations || 0}"></div>
            </div>
            <div class="fg"><label class="fl">Abstract</label><textarea class="fi" id="m_abstract" rows="3">${esc(d.abstract || '')}</textarea></div>
            <div class="fg"><label class="fl">Tags (comma-separated)</label><input class="fi" id="m_tags" value="${esc((d.tags || []).join(', '))}" placeholder="Deep Learning, NLP"></div>
            <div class="fg"><label class="fl">DOI / Paper URL</label><input class="fi" type="url" id="m_link" value="${esc(d.link || '')}" placeholder="https://doi.org/..."></div>
            <div class="fg"><label class="fl">PDF URL</label><input class="fi" type="url" id="m_pdf" value="${esc(d.pdfLink || '')}" placeholder="https://arxiv.org/..."></div>`,
        read: () => ({
            title:    v('m_title'),
            authors:  v('m_authors'),
            venue:    v('m_venue'),
            year:     v('m_year'),
            citations: parseInt(v('m_cit')) || 0,
            abstract: v('m_abstract'),
            tags:     v('m_tags').split(',').map(t => t.trim()).filter(Boolean),
            link:     v('m_link'),
            pdfLink:  v('m_pdf'),
        }),
        array: 'research'
    },
    achievement: {
        title: 'Achievement',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Title</label><input class="fi" id="m_title" value="${esc(d.title || '')}" placeholder="Achievement title"></div>
            <div class="fg"><label class="fl">Description</label><textarea class="fi" id="m_desc" rows="2">${esc(d.description || '')}</textarea></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Icon (FA class)</label><input class="fi" id="m_icon" value="${esc(d.icon || 'fa-award')}" placeholder="fa-trophy"></div>
                <div class="fg"><label class="fl">Category</label><input class="fi" id="m_cat" value="${esc(d.category || '')}" placeholder="Competition"></div>
            </div>
            <div class="fg"><label class="fl">Date</label><input class="fi" id="m_date" value="${esc(d.date || '')}" placeholder="March 2025"></div>`,
        // FIXED: removed the "d.title = v(...)" mutation pattern
        read: () => ({
            title:       v('m_title'),
            description: v('m_desc'),
            icon:        v('m_icon') || 'fa-award',
            category:    v('m_cat'),
            date:        v('m_date')
        }),
        array: 'achievements'
    },
    education: {
        title: 'Education',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Degree</label><input class="fi" id="m_degree" value="${esc(d.degree || '')}" placeholder="B.Sc. Computer Science"></div>
            <div class="fg"><label class="fl">Specialization</label><input class="fi" id="m_spec" value="${esc(d.specialization || '')}" placeholder="Data Science Specialization"></div>
            <div class="fg"><label class="fl">Institution</label><input class="fi" id="m_inst" value="${esc(d.institution || '')}" placeholder="Tribhuvan University"></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Location</label><input class="fi" id="m_loc" value="${esc(d.location || '')}" placeholder="Kathmandu, Nepal"></div>
                <div class="fg"><label class="fl">Period</label><input class="fi" id="m_period" value="${esc(d.period || '')}" placeholder="2021 – 2025"></div>
            </div>
            <div class="fg"><label class="fl">GPA (optional)</label><input class="fi" id="m_gpa" value="${esc(d.gpa || '')}" placeholder="3.9 / 4.0"></div>
            <div class="fg"><label class="fl">Highlights (one per line — leave blank if none)</label>
                <textarea class="fi" id="m_highlights" rows="4" placeholder="Machine Learning specialization&#10;Best Thesis Award">${(d.highlights || []).join('\n')}</textarea>
            </div>`,
        // FIXED: removed "degree:d.degree=v('m_degree')" — that was mutating the source object
        read: () => ({
            degree:         v('m_degree'),
            specialization: v('m_spec'),
            institution:    v('m_inst'),
            location:       v('m_loc'),
            period:         v('m_period'),
            gpa:            v('m_gpa'),
            highlights:     v('m_highlights').split('\n').map(l => l.trim()).filter(Boolean)
        }),
        array: 'education'
    },
    experience: {
        title: 'Experience',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Job Title</label><input class="fi" id="m_title" value="${esc(d.title || '')}" placeholder="Data Science Engineer"></div>
            <div class="fg"><label class="fl">Company</label><input class="fi" id="m_company" value="${esc(d.company || '')}" placeholder="CloudMind Analytics"></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Location</label><input class="fi" id="m_loc" value="${esc(d.location || '')}" placeholder="Kathmandu, Nepal"></div>
                <div class="fg"><label class="fl">Period</label><input class="fi" id="m_period" value="${esc(d.period || '')}" placeholder="Jan 2024 – Present"></div>
            </div>
            <div class="fg"><label class="fl">Responsibilities (one per line)</label>
                <textarea class="fi" id="m_desc" rows="5" placeholder="Built ML models improving retention by 28%&#10;Deployed ETL pipelines">${(d.description || []).join('\n')}</textarea>
            </div>`,
        read: () => ({
            title:       v('m_title'),
            company:     v('m_company'),
            location:    v('m_loc'),
            period:      v('m_period'),
            description: v('m_desc').split('\n').map(l => l.trim()).filter(Boolean)
        }),
        array: 'experience'
    }
};

function openModal(type, index) {
    index = (index === undefined) ? -1 : Number(index);
    modalType  = type;
    modalIndex = index;
    const cfg = FORMS[type];
    // Deep-copy so the modal never mutates the live data object while editing
    const existing = index >= 0 ? JSON.parse(JSON.stringify(data[cfg.array][index])) : {};
    document.getElementById('modalTitle').textContent = (index >= 0 ? 'Edit ' : 'Add ') + cfg.title;
    document.getElementById('modalBody').innerHTML = cfg.html(existing);
    document.getElementById('modalOverlay').classList.add('open');
}
function editItem(type, index) { openModal(type, index); }
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }

function saveModal() {
    const cfg  = FORMS[modalType];
    const item = cfg.read();
    if (!data[cfg.array]) data[cfg.array] = [];
    if (modalIndex >= 0) data[cfg.array][modalIndex] = item;
    else data[cfg.array].push(item);
    saveAll();
    closeModal();
    const renderers = {
        skill: renderSkills, project: renderProjects, research: renderResearch,
        achievement: renderAchievements, education: renderEducation, experience: renderExperience
    };
    renderers[modalType]?.();
}

function deleteItem(type, index) {
    const cfg = FORMS[type];
    if (!confirm(`Delete this ${cfg.title}?`)) return;
    data[cfg.array].splice(index, 1);
    saveAll();
    const renderers = {
        skill: renderSkills, project: renderProjects, research: renderResearch,
        achievement: renderAchievements, education: renderEducation, experience: renderExperience
    };
    renderers[type]?.();
}

// ══════════════════════════════════════════════════════════════
//  MESSAGES
//  Messages are saved to localStorage['portfolioMessages'] by
//  the contact form in script.js. Admin and portfolio run on
//  the same origin (your Vercel domain), so localStorage IS
//  shared — messages will appear here after a visitor submits.
// ══════════════════════════════════════════════════════════════
let msgFilter = 'all';

function getMessages() {
    try { return JSON.parse(localStorage.getItem('portfolioMessages') || '[]'); }
    catch(e) { return []; }
}
function saveMessages(msgs) {
    localStorage.setItem('portfolioMessages', JSON.stringify(msgs));
}

function loadMessages() {
    const msgs    = getMessages();
    const today   = new Date().toDateString();
    const unread  = msgs.filter(m => !m.read).length;
    const todayCt = msgs.filter(m => new Date(m.date).toDateString() === today).length;

    const el = id => document.getElementById(id);
    if (el('ms_total'))  el('ms_total').textContent  = msgs.length;
    if (el('ms_unread')) el('ms_unread').textContent = unread;
    if (el('ms_today'))  el('ms_today').textContent  = todayCt;

    let filtered = msgs;
    if (msgFilter === 'unread') filtered = msgs.filter(m => !m.read);
    if (msgFilter === 'today')  filtered = msgs.filter(m => new Date(m.date).toDateString() === today);

    renderMessages(filtered);
    updateUnreadBadge();
}

function renderMessages(msgs) {
    const list = document.getElementById('msgList');
    if (!list) return;
    if (!msgs.length) {
        list.innerHTML = `<div class="msg-empty">
            <i class="fas fa-inbox"></i>
            <p>No messages yet</p>
            <small>Messages sent via the contact form on your portfolio will appear here.</small>
        </div>`;
        return;
    }
    list.innerHTML = msgs.map(m => {
        const dateStr = new Date(m.date).toLocaleString();
        const preview = String(m.message || '').replace(/\n/g, ' ').substring(0, 120);
        return `
        <div class="msg-card ${m.read ? '' : 'unread'}" id="msg-${m.id}">
            <div class="msg-head" onclick="toggleMsg(${m.id})">
                <div class="msg-left">
                    <div class="msg-sender-name">
                        ${!m.read ? '<span class="unread-dot"></span>' : ''}
                        ${esc(m.name)}
                    </div>
                    <div class="msg-sender-email">${esc(m.email)}</div>
                    <div class="msg-subject-line">${esc(m.subject || '(no subject)')}</div>
                    <div class="msg-preview-text">${esc(preview)}</div>
                </div>
                <div class="msg-right">
                    <div class="msg-time">${dateStr}</div>
                    <div class="msg-btn-row">
                        <button class="btn btn-danger btn-sm" onclick="event.stopPropagation();deleteMsg(${m.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="msg-body-wrap" id="body-${m.id}">
                <div class="msg-body-text">${esc(m.message)}</div>
                <a class="msg-reply-btn" href="mailto:${esc(m.email)}?subject=Re: ${esc(m.subject || '')}&body=Hi ${esc(m.name)},%0A%0A">
                    <i class="fas fa-reply"></i> Reply via Email
                </a>
            </div>
        </div>`;
    }).join('');
}

function toggleMsg(id) {
    const msgs = getMessages();
    const idx  = msgs.findIndex(m => m.id === id);
    if (idx < 0) return;
    msgs[idx].read = true;
    saveMessages(msgs);

    const body = document.getElementById('body-' + id);
    const card = document.getElementById('msg-' + id);
    if (body) body.classList.toggle('open');
    if (card) card.classList.remove('unread');

    const unread = msgs.filter(m => !m.read).length;
    const el = document.getElementById('ms_unread');
    if (el) el.textContent = unread;
    updateUnreadBadge();
}

function deleteMsg(id) {
    if (!confirm('Delete this message permanently?')) return;
    const msgs = getMessages().filter(m => m.id !== id);
    saveMessages(msgs);
    loadMessages();
}

function setMsgFilter(filter, btn) {
    msgFilter = filter;
    document.querySelectorAll('.mf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadMessages();
}

function markAllRead() {
    const msgs = getMessages().map(m => ({ ...m, read: true }));
    saveMessages(msgs);
    loadMessages();
}

function clearAllMessages() {
    if (!confirm('Delete ALL messages? This cannot be undone.')) return;
    localStorage.removeItem('portfolioMessages');
    loadMessages();
}

function exportMessages() {
    const msgs = getMessages();
    const blob = new Blob([JSON.stringify(msgs, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'portfolio-messages.json'; a.click();
    URL.revokeObjectURL(url);
}

function updateUnreadBadge() {
    const unread = getMessages().filter(m => !m.read).length;
    const badge  = document.getElementById('unreadBadge');
    if (!badge) return;
    badge.textContent   = unread;
    badge.style.display = unread > 0 ? '' : 'none';
}

// ══════════════════════════════════════════════════════════════
//  EXPORT / IMPORT
// ══════════════════════════════════════════════════════════════

// Raw JSON backup
function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'portfolio-backup.json'; a.click();
    URL.revokeObjectURL(url);
}

// Import from JSON backup
function importData(e) {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = ev => {
        try { data = JSON.parse(ev.target.result); saveAll(); location.reload(); }
        catch { alert('Invalid JSON file.'); }
    };
    r.readAsText(file);
}

// ──────────────────────────────────────────────────────────────
//  EXPORT FOR VERCEL
//
//  localStorage is PER-BROWSER. Changes you make in admin.html
//  in your local browser do NOT appear for visitors on Vercel
//  because they have their own fresh browser/localStorage.
//
//  The correct workflow for deploying content to Vercel:
//  1. Edit data in admin panel
//  2. Click "Export for Vercel" → downloads a new script.js
//  3. Replace the old script.js in your project folder
//  4. git add script.js → git commit → git push
//  5. Vercel redeploys in ~30s. Everyone sees your new data.
// ──────────────────────────────────────────────────────────────
function exportForVercel() {
    // Serialise all current data as the DEFAULT_DATA constant,
    // then wrap the entire original script.js logic around it.
    const snapshot = JSON.stringify(data, null, 4);

    const js = `// ─────────────────────────────────────────────────────────────
//  script.js  —  Public portfolio renderer
//
//  HOW TO UPDATE YOUR LIVE VERCEL SITE:
//  1. In admin.html click "Export for Vercel"
//  2. Save the downloaded script.js into your project folder
//     (replace the old one)
//  3. git add script.js
//  4. git commit -m "update portfolio content"
//  5. git push
//  Vercel auto-deploys — visitors see your changes in ~30s.
// ─────────────────────────────────────────────────────────────

const DEFAULT_DATA = ${snapshot};

// Load from localStorage if admin saved data in the same browser;
// otherwise use DEFAULT_DATA baked in above (what Vercel visitors see).
function loadPortfolioData() {
    try {
        const saved = localStorage.getItem('portfolioData');
        return saved ? JSON.parse(saved) : DEFAULT_DATA;
    } catch(e) { return DEFAULT_DATA; }
}

const portfolioData = loadPortfolioData();

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    applyProfile(portfolioData);
    loadSavedPhoto();
    renderSkills();
    renderProjects();
    renderResearch();
    renderAchievements();
    renderEducation();
    renderExperience();
    initContactForm();
    initScrollAnimations();

    // Live sync when admin edits in another tab of the SAME browser
    window.addEventListener('storage', e => {
        if (e.key === 'portfolioData' && e.newValue) {
            try {
                const fresh = JSON.parse(e.newValue);
                Object.assign(portfolioData, fresh);
                applyProfile(portfolioData);
                renderSkills(); renderProjects(); renderResearch();
                renderAchievements(); renderEducation(); renderExperience();
            } catch(err) {}
        }
        if (e.key === 'profilePhoto') loadSavedPhoto();
    });
});

// ── Helpers ───────────────────────────────────────────────────
function setTxt(id, val) {
    const e = document.getElementById(id);
    if (e && val != null) e.textContent = val;
}
function setHref(id, val) {
    const e = document.getElementById(id);
    if (e && val) e.href = val;
}

// ── Profile ───────────────────────────────────────────────────
function applyProfile(d) {
    const p = d.profile || {};
    setTxt('profileName',     p.name);
    setTxt('profileTitle',    p.title);
    setTxt('profileLocation', p.location);
    setTxt('profileEmail',    p.email);
    setTxt('profilePhone',    p.phone);
    setTxt('contactEmail',    p.email);
    setTxt('contactPhone',    p.phone);
    setTxt('contactLocation', p.location);
    setTxt('footerText', \`© \${new Date().getFullYear()} \${p.name}\`);
    document.title = \`\${p.name} — Portfolio\`;
    if (p.github)   setHref('linkGithub',    p.github);
    if (p.linkedin) setHref('linkLinkedin',  p.linkedin);
    if (p.email)    setHref('linkEmail',     'mailto:' + p.email);
    if (p.scholar)  { setHref('linkScholar', p.scholar); setHref('linkScholarBtn', p.scholar); }
    if (p.resume)   setHref('linkResume',    p.resume);
}

function loadSavedPhoto() {
    const photo = localStorage.getItem('profilePhoto');
    if (!photo) return;
    const img   = document.getElementById('profilePhoto');
    const emoji = document.querySelector('.profile-emoji');
    if (img)   { img.src = photo; img.style.display = 'block'; }
    if (emoji) emoji.style.display = 'none';
}

// ── Theme ─────────────────────────────────────────────────────
function initTheme() {
    const btn   = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') { document.body.classList.add('dark'); btn.innerHTML = '<i class="fas fa-sun"></i>'; }
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const dark = document.body.classList.contains('dark');
        btn.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
}

// ── Nav ───────────────────────────────────────────────────────
function initNavigation() {
    const items = document.querySelectorAll('.nav-item');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const id = en.target.getAttribute('id');
                items.forEach(i => i.classList.toggle('active', i.getAttribute('href') === '#' + id));
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
    items.forEach(i => i.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(i.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    }));
}

// ── Skills ────────────────────────────────────────────────────
function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;
    grid.innerHTML = portfolioData.skills.map(cat => \`
        <div class="skill-card">
            <div class="skill-header">
                <div class="skill-icon"><i class="fas \${cat.icon}"></i></div>
                <h3>\${cat.title}</h3>
            </div>
            <div class="skill-list">
                \${cat.skills.map(s => \`
                    <div class="skill-item">
                        <div class="skill-name"><span>\${s.name}</span><span class="skill-pct">\${s.level}%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width:0%" data-width="\${s.level}%"></div></div>
                    </div>\`).join('')}
            </div>
        </div>\`).join('');
    setTimeout(() => document.querySelectorAll('.skill-progress').forEach(b => b.style.width = b.dataset.width), 200);
}

// ── Projects ──────────────────────────────────────────────────
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = portfolioData.projects.map(p => {
        const gh = p.github ? \`<a href="\${p.github}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>\` : '';
        const lv = p.live   ? \`<a href="\${p.live}"   class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Live Demo</a>\` : '';
        return \`
        <div class="project-card">
            <div class="project-card-top">
                <h3 class="project-title">\${p.title}</h3>
                <span class="project-highlight"><i class="fas fa-star"></i> \${p.highlight}</span>
            </div>
            <p class="project-desc">\${p.description}</p>
            <div class="project-tags">\${p.tags.map(t => \`<span class="project-tag">\${t}</span>\`).join('')}</div>
            \${(gh || lv) ? \`<div class="project-links">\${gh}\${lv}</div>\` : ''}
        </div>\`;
    }).join('');
}

// ── Research ──────────────────────────────────────────────────
function renderResearch() {
    const list = document.getElementById('researchList');
    if (!list) return;
    list.innerHTML = portfolioData.research.map(r => \`
        <div class="research-item">
            <div class="research-inner">
                <div class="research-icon-wrap"><i class="fas fa-file-alt"></i></div>
                <div class="research-body">
                    <h3 class="research-title">\${r.title}</h3>
                    <div class="research-meta">
                        <span><i class="fas fa-users"></i> \${r.authors}</span>
                        <span><i class="fas fa-calendar"></i> \${r.year}</span>
                    </div>
                    <p class="research-venue">\${r.venue}</p>
                    <p class="research-abstract">\${r.abstract}</p>
                    <div class="research-tags">\${(r.tags || []).map(t => \`<span class="research-tag">\${t}</span>\`).join('')}</div>
                    <div class="research-footer">
                        <span class="research-citations"><i class="fas fa-quote-right"></i> <strong class="cite-num">\${r.citations}</strong> citations</span>
                        \${r.link    && r.link    !== '#' ? \`<a href="\${r.link}"    class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> View Paper</a>\` : ''}
                        \${r.pdfLink && r.pdfLink !== '#' ? \`<a href="\${r.pdfLink}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> PDF</a>\` : ''}
                    </div>
                </div>
            </div>
        </div>\`).join('');
}

// ── Achievements ──────────────────────────────────────────────
function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;
    grid.innerHTML = portfolioData.achievements.map(a => \`
        <div class="achievement-card">
            <div class="achievement-inner">
                <div class="achievement-front">
                    <div class="ach-front-inner">
                        <div class="ach-icon-wrap"><i class="fas \${a.icon}"></i></div>
                        <div class="ach-info">
                            <div class="ach-top-row">
                                <h3 class="ach-title">\${a.title}</h3>
                                <span class="ach-category">\${a.category}</span>
                            </div>
                            <p class="ach-desc">\${a.description}</p>
                            <p class="ach-date"><i class="fas fa-calendar-alt"></i> \${a.date}</p>
                        </div>
                    </div>
                </div>
                <div class="achievement-back">
                    <i class="fas \${a.icon} ach-back-icon"></i>
                    <p class="ach-unlocked">🎉 Unlocked!</p>
                    <p class="ach-flip-hint">Click to flip back</p>
                </div>
            </div>
        </div>\`).join('');
    document.querySelectorAll('.achievement-card').forEach(c => c.addEventListener('click', () => c.classList.toggle('flipped')));
}

// ── Education ─────────────────────────────────────────────────
function renderEducation() {
    const list = document.getElementById('educationList');
    if (!list) return;
    list.innerHTML = portfolioData.education.map(edu => {
        const gpaHTML = edu.gpa
            ? \`<span class="edu-meta-pill"><i class="fas fa-star"></i> GPA: \${edu.gpa}</span>\` : '';
        const hlHTML  = (edu.highlights && edu.highlights.length)
            ? \`<ul class="edu-highlights">\${edu.highlights.map(h => \`<li>\${h}</li>\`).join('')}</ul>\` : '';
        return \`
        <div class="education-item">
            <div class="edu-exp-inner">
                <div class="edu-icon-wrap"><i class="fas fa-graduation-cap"></i></div>
                <div class="edu-exp-body">
                    <h3 class="edu-degree">\${edu.degree}</h3>
                    \${edu.specialization ? \`<p class="edu-spec">\${edu.specialization}</p>\` : ''}
                    <p class="edu-inst"><i class="fas fa-university"></i> \${edu.institution}</p>
                    <div class="edu-meta-row">
                        \${edu.location ? \`<span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> \${edu.location}</span>\` : ''}
                        \${edu.period   ? \`<span class="edu-meta-pill"><i class="fas fa-calendar"></i> \${edu.period}</span>\`         : ''}
                        \${gpaHTML}
                    </div>
                    \${hlHTML}
                </div>
            </div>
        </div>\`;
    }).join('');
}

// ── Experience ────────────────────────────────────────────────
function renderExperience() {
    const list = document.getElementById('experienceList');
    if (!list) return;
    list.innerHTML = portfolioData.experience.map(exp => {
        const descHTML = (exp.description && exp.description.length)
            ? \`<ul class="exp-bullets">\${exp.description.map(d => \`<li>\${d}</li>\`).join('')}</ul>\` : '';
        return \`
        <div class="experience-item">
            <div class="edu-exp-inner">
                <div class="exp-icon-wrap"><i class="fas fa-briefcase"></i></div>
                <div class="edu-exp-body">
                    <h3 class="exp-title-text">\${exp.title}</h3>
                    <p class="exp-company"><i class="fas fa-building"></i> \${exp.company}</p>
                    <div class="edu-meta-row">
                        \${exp.location ? \`<span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> \${exp.location}</span>\` : ''}
                        \${exp.period   ? \`<span class="edu-meta-pill"><i class="fas fa-calendar"></i> \${exp.period}</span>\`         : ''}
                    </div>
                    \${descHTML}
                </div>
            </div>
        </div>\`;
    }).join('');
}

// ── Contact Form ──────────────────────────────────────────────
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn      = document.getElementById('submitBtn');
        const feedback = document.getElementById('formFeedback');
        const name     = (document.getElementById('msg_name')?.value    || '').trim();
        const email    = (document.getElementById('msg_email')?.value   || '').trim();
        const subject  = (document.getElementById('msg_subject')?.value || '').trim();
        const message  = (document.getElementById('msg_message')?.value || '').trim();
        if (!name || !email || !message) return;

        btn.disabled  = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

        const msg = {
            id:      Date.now(),
            name, email,
            subject: subject || '(no subject)',
            message,
            date:    new Date().toISOString(),
            read:    false
        };
        try {
            const all = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
            all.unshift(msg);
            if (all.length > 500) all.length = 500;
            localStorage.setItem('portfolioMessages', JSON.stringify(all));
        } catch(err) {}

        await new Promise(r => setTimeout(r, 900));
        form.reset();
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        if (feedback) {
            feedback.style.cssText = 'display:block;margin-top:12px;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:500;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.3);color:#16a34a;';
            feedback.textContent = '✓ Message received! I will get back to you soon.';
        }
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> <span>Send Message</span>';
            btn.disabled  = false;
            if (feedback) feedback.style.display = 'none';
        }, 3500);
    });
}

// ── Scroll reveal ─────────────────────────────────────────────
function initScrollAnimations() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity    = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('section').forEach(s => {
        s.style.cssText += 'opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease';
        obs.observe(s);
    });
}
`;

    const blob = new Blob([js], { type: 'text/javascript' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'script.js'; a.click();
    URL.revokeObjectURL(url);
    showNotif('✓ script.js downloaded! Replace in your project → git push → Vercel deploys in ~30s.');
}

// ── Helpers ───────────────────────────────────────────────────
function v(id)  { return (document.getElementById(id)?.value || '').trim(); }
function esc(s) {
    return String(s ?? '')
        .replace(/&/g,  '&amp;')
        .replace(/</g,  '&lt;')
        .replace(/>/g,  '&gt;')
        .replace(/"/g,  '&quot;')
        .replace(/'/g,  '&#39;');
}

// ── Default data ──────────────────────────────────────────────
function getDefaults() {
    return {
        profile: {
            name: 'Surya Prasad Yadav', title: 'Data Science Engineer',
            email: 'surya3ydv@gmail.com', phone: '(+977) 9848703545',
            location: 'Kathmandu, Nepal',
            github: 'https://github.com/yourusername',
            linkedin: 'https://linkedin.com/in/yourusername',
            scholar: 'https://scholar.google.com/citations?user=yourid',
            resume: '#'
        },
        skills: [
            { icon: 'fa-brain', title: 'Machine Learning', skills: [
                { name: 'TensorFlow', level: 90 }, { name: 'PyTorch', level: 85 },
                { name: 'Scikit-learn', level: 95 }, { name: 'Keras', level: 80 }
            ]},
            { icon: 'fa-code', title: 'Programming', skills: [
                { name: 'Python', level: 95 }, { name: 'R', level: 80 },
                { name: 'SQL', level: 90 }, { name: 'JavaScript', level: 75 }
            ]},
            { icon: 'fa-database', title: 'Data Engineering', skills: [
                { name: 'Apache Spark', level: 85 }, { name: 'PostgreSQL', level: 88 },
                { name: 'MongoDB', level: 80 }, { name: 'Redis', level: 75 }
            ]}
        ],
        projects: [
            { title: 'Customer Churn Prediction', description: 'ML model predicting churn with 94% accuracy.', tags: ['Python','XGBoost','AWS'], github: 'https://github.com/yourusername/churn', live: '', highlight: '94% Accuracy' }
        ],
        research: [
            { title: 'Novel Approaches to Time Series Anomaly Detection', authors: 'Surya Prasad Yadav et al.', venue: 'IEEE International Conference on Data Science', year: '2024', abstract: 'Deep learning architecture for anomaly detection.', citations: 15, link: '', pdfLink: '', tags: ['Deep Learning','Anomaly Detection'] }
        ],
        achievements: [
            { icon: 'fa-trophy', title: 'First Place — Data Science Hackathon 2025', description: 'Won first place among 200+ teams.', date: 'March 2025', category: 'Competition' }
        ],
        education: [
            { degree: 'B.Sc. Computer Science & Data Science', specialization: 'Data Science Specialization', institution: 'Tribhuvan University', location: 'Kathmandu, Nepal', period: '2021 – 2025', gpa: '3.9 / 4.0', highlights: ['Machine Learning concentration', 'Senior Thesis: Anomaly Detection in Time Series Data'] }
        ],
        experience: [
            { title: 'Data Science Engineer', company: 'CloudMind Analytics', location: 'Kathmandu, Nepal', period: 'Jan 2024 – Present', description: ['Developed predictive models improving retention by 28%', 'Built ETL pipelines processing 10M+ records daily'] }
        ]
    };
}