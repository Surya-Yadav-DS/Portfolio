// ─────────────────────────────────────────────────────────────
//  admin.js  —  Password-protected admin panel logic
//  ⚠  CHANGE THE PASSWORD BELOW before publishing!
// ─────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = 'admin123'; // ← CHANGE THIS before going live

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
    const n = document.getElementById('saveNotif');
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 2800);
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
}

// ── Tabs ──────────────────────────────────────────────────────
function switchTab(name, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + name).classList.add('active');
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
function setValue(id, v) { const e = document.getElementById(id); if (e) e.value = v; }

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
        showNotif();
    };
    reader.readAsDataURL(file);
}
function showPhotoPreview(src) {
    const img  = document.getElementById('adminPhotoPreview');
    const icon = document.querySelector('.photo-upload-area .upload-icon');
    const txt  = document.querySelectorAll('.photo-upload-area p');
    img.src = src; img.style.display = 'block';
    if (icon) icon.style.display = 'none';
    txt.forEach(t => { t.style.display = 'none'; });
}
function removePhoto() {
    localStorage.removeItem('profilePhoto');
    const img  = document.getElementById('adminPhotoPreview');
    const icon = document.querySelector('.photo-upload-area .upload-icon');
    const txt  = document.querySelectorAll('.photo-upload-area p');
    img.style.display = 'none';
    if (icon) icon.style.display = '';
    txt.forEach(t => { t.style.display = ''; });
    showNotif();
}
function showNotif() {
    const n = document.getElementById('saveNotif');
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 2800);
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

const FORMS = {
    skill: {
        title: 'Skill Category',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Category Name</label><input class="fi" id="m_title" value="${d.title || ''}" placeholder="e.g. Machine Learning"></div>
            <div class="fg"><label class="fl">Icon (Font Awesome class)</label><input class="fi" id="m_icon" value="${d.icon || 'fa-code'}" placeholder="fa-brain"></div>
            <div class="fg"><label class="fl">Skills (one per line: Name, Level%)</label>
                <textarea class="fi" id="m_skills" rows="6" placeholder="TensorFlow, 90&#10;PyTorch, 85&#10;Scikit-learn, 95">${(d.skills||[]).map(s=>s.name+', '+s.level).join('\n')}</textarea>
            </div>`,
        read: () => ({
            title: v('m_title'), icon: v('m_icon') || 'fa-code',
            skills: v('m_skills').split('\n').map(l => {
                const [name, level] = l.split(',').map(x => x.trim());
                return name ? { name, level: parseInt(level) || 80 } : null;
            }).filter(Boolean)
        }),
        array: 'skills'
    },
    project: {
        title: 'Project',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Title</label><input class="fi" id="m_title" value="${esc(d.title||'')}" placeholder="Project title"></div>
            <div class="fg"><label class="fl">Description</label><textarea class="fi" id="m_desc" rows="3" placeholder="What does it do?">${esc(d.description||'')}</textarea></div>
            <div class="fg"><label class="fl">Highlight Badge</label><input class="fi" id="m_highlight" value="${esc(d.highlight||'')}" placeholder="94% Accuracy"></div>
            <div class="fg"><label class="fl">Tags (comma-separated)</label><input class="fi" id="m_tags" value="${(d.tags||[]).join(', ')}" placeholder="Python, TensorFlow, Docker"></div>
            <div class="fg"><label class="fl">GitHub URL</label><input class="fi" type="url" id="m_github" value="${esc(d.github||'')}" placeholder="https://github.com/..."></div>
            <div class="fg"><label class="fl">Live Demo URL</label><input class="fi" type="url" id="m_live" value="${esc(d.live||'')}" placeholder="https://demo.example.com"></div>`,
        read: () => ({
            title:       v('m_title'),
            description: v('m_desc'),
            highlight:   v('m_highlight'),
            tags:        v('m_tags').split(',').map(t=>t.trim()).filter(Boolean),
            github:      v('m_github') || '#',
            live:        v('m_live')   || '#',
        }),
        array: 'projects'
    },
    research: {
        title: 'Research Publication',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Title</label><input class="fi" id="m_title" value="${esc(d.title||'')}" placeholder="Paper title"></div>
            <div class="fg"><label class="fl">Authors</label><input class="fi" id="m_authors" value="${esc(d.authors||'')}" placeholder="Your Name, Co-Author"></div>
            <div class="fg"><label class="fl">Venue / Journal</label><input class="fi" id="m_venue" value="${esc(d.venue||'')}" placeholder="IEEE Conference on..."></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Year</label><input class="fi" id="m_year" value="${esc(d.year||'')}" placeholder="2024"></div>
                <div class="fg"><label class="fl">Citations</label><input class="fi" type="number" id="m_cit" value="${d.citations||0}"></div>
            </div>
            <div class="fg"><label class="fl">Abstract</label><textarea class="fi" id="m_abstract" rows="3">${esc(d.abstract||'')}</textarea></div>
            <div class="fg"><label class="fl">Tags (comma-separated)</label><input class="fi" id="m_tags" value="${(d.tags||[]).join(', ')}" placeholder="Deep Learning, NLP"></div>
            <div class="fg"><label class="fl">DOI / Paper URL</label><input class="fi" type="url" id="m_link" value="${esc(d.link||'')}" placeholder="https://doi.org/..."></div>
            <div class="fg"><label class="fl">PDF URL</label><input class="fi" type="url" id="m_pdf" value="${esc(d.pdfLink||'')}" placeholder="https://arxiv.org/..."></div>`,
        read: () => ({
            title:    v('m_title'), authors: v('m_authors'), venue: v('m_venue'),
            year:     v('m_year'), citations: parseInt(v('m_cit'))||0,
            abstract: v('m_abstract'),
            tags:     v('m_tags').split(',').map(t=>t.trim()).filter(Boolean),
            link:     v('m_link') || '#', pdfLink: v('m_pdf') || '#',
        }),
        array: 'research'
    },
    achievement: {
        title: 'Achievement',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Title</label><input class="fi" id="m_title" value="${esc(d.title||'')}" placeholder="Achievement title"></div>
            <div class="fg"><label class="fl">Description</label><textarea class="fi" id="m_desc" rows="2">${esc(d.description||'')}</textarea></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Icon (FA class)</label><input class="fi" id="m_icon" value="${d.icon||'fa-award'}" placeholder="fa-trophy"></div>
                <div class="fg"><label class="fl">Category</label><input class="fi" id="m_cat" value="${esc(d.category||'')}" placeholder="Competition"></div>
            </div>
            <div class="fg"><label class="fl">Date</label><input class="fi" id="m_date" value="${esc(d.date||'')}" placeholder="March 2025"></div>`,
        read: () => ({
            title:d.title=v('m_title'), description:v('m_desc'),
            icon:v('m_icon')||'fa-award', category:v('m_cat'), date:v('m_date')
        }),
        array: 'achievements'
    },
    education: {
        title: 'Education',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Degree</label><input class="fi" id="m_degree" value="${esc(d.degree||'')}" placeholder="B.Sc. Computer Science"></div>
            <div class="fg"><label class="fl">Specialization</label><input class="fi" id="m_spec" value="${esc(d.specialization||'')}" placeholder="Data Science Specialization"></div>
            <div class="fg"><label class="fl">Institution</label><input class="fi" id="m_inst" value="${esc(d.institution||'')}" placeholder="Tribhuvan University"></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Location</label><input class="fi" id="m_loc" value="${esc(d.location||'')}" placeholder="Kathmandu, Nepal"></div>
                <div class="fg"><label class="fl">Period</label><input class="fi" id="m_period" value="${esc(d.period||'')}" placeholder="2021 – 2025"></div>
            </div>
            <div class="fg"><label class="fl">GPA (optional)</label><input class="fi" id="m_gpa" value="${esc(d.gpa||'')}" placeholder="3.9 / 4.0"></div>
            <div class="fg"><label class="fl">Highlights (one per line — leave blank if none)</label>
                <textarea class="fi" id="m_highlights" rows="4" placeholder="Machine Learning specialization&#10;Best Thesis Award">${(d.highlights||[]).join('\n')}</textarea>
            </div>`,
        read: () => ({
            degree:d.degree=v('m_degree'), specialization:v('m_spec'),
            institution:v('m_inst'), location:v('m_loc'), period:v('m_period'),
            gpa:v('m_gpa'),
            highlights:v('m_highlights').split('\n').map(l=>l.trim()).filter(Boolean)
        }),
        array: 'education'
    },
    experience: {
        title: 'Experience',
        html: (d = {}) => `
            <div class="fg"><label class="fl">Job Title</label><input class="fi" id="m_title" value="${esc(d.title||'')}" placeholder="Data Science Engineer"></div>
            <div class="fg"><label class="fl">Company</label><input class="fi" id="m_company" value="${esc(d.company||'')}" placeholder="CloudMind Analytics"></div>
            <div class="grid-2">
                <div class="fg"><label class="fl">Location</label><input class="fi" id="m_loc" value="${esc(d.location||'')}" placeholder="Kathmandu, Nepal"></div>
                <div class="fg"><label class="fl">Period</label><input class="fi" id="m_period" value="${esc(d.period||'')}" placeholder="Jan 2024 – Present"></div>
            </div>
            <div class="fg"><label class="fl">Responsibilities (one per line — leave blank if none)</label>
                <textarea class="fi" id="m_desc" rows="5" placeholder="Built ML models improving retention by 28%&#10;Deployed ETL pipelines">${(d.description||[]).join('\n')}</textarea>
            </div>`,
        read: () => ({
            title:v('m_title'), company:v('m_company'),
            location:v('m_loc'), period:v('m_period'),
            description:v('m_desc').split('\n').map(l=>l.trim()).filter(Boolean)
        }),
        array: 'experience'
    }
};

let currentEditData = {};

function openModal(type, index = -1) {
    modalType  = type;
    modalIndex = index;
    const cfg  = FORMS[type];
    const existing = index >= 0 ? data[cfg.array][index] : {};
    currentEditData = existing;
    document.getElementById('modalTitle').textContent = (index >= 0 ? 'Edit ' : 'Add ') + cfg.title;
    document.getElementById('modalBody').innerHTML = cfg.html(existing);
    document.getElementById('modalOverlay').classList.add('open');
}
function editItem(type, index) { openModal(type, index); }
function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }

function saveModal() {
    const cfg = FORMS[modalType];
    const item = cfg.read();
    if (!data[cfg.array]) data[cfg.array] = [];
    if (modalIndex >= 0) data[cfg.array][modalIndex] = item;
    else data[cfg.array].push(item);
    saveAll();
    closeModal();
    // Re-render the list
    const renderers = {
        skill:'renderSkills', project:'renderProjects', research:'renderResearch',
        achievement:'renderAchievements', education:'renderEducation', experience:'renderExperience'
    };
    window[renderers[modalType]]?.();
}

function deleteItem(type, index) {
    const cfg = FORMS[type];
    if (!confirm(`Delete this ${cfg.title}?`)) return;
    data[cfg.array].splice(index, 1);
    saveAll();
    const renderers = {
        skill:'renderSkills', project:'renderProjects', research:'renderResearch',
        achievement:'renderAchievements', education:'renderEducation', experience:'renderExperience'
    };
    window[renderers[type]]?.();
}

// ── Export / Import ───────────────────────────────────────────
function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'portfolio-data.json'; a.click();
    URL.revokeObjectURL(url);
}
function importData(e) {
    const file = e.target.files[0]; if (!file) return;
    const r = new FileReader();
    r.onload = ev => {
        try { data = JSON.parse(ev.target.result); saveAll(); location.reload(); }
        catch { alert('Invalid JSON file.'); }
    };
    r.readAsText(file);
}

// ── Helpers ───────────────────────────────────────────────────
function v(id) { return (document.getElementById(id)?.value || '').trim(); }
function esc(s) { return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }

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
            { title: 'Customer Churn Prediction', description: 'ML model predicting churn with 94% accuracy.', tags: ['Python','XGBoost','AWS'], github: 'https://github.com/yourusername/churn', live: 'https://churn-demo.example.com', highlight: '94% Accuracy' }
        ],
        research: [
            { title: 'Novel Approaches to Time Series Anomaly Detection', authors: 'Surya Prasad Yadav et al.', venue: 'IEEE International Conference on Data Science', year: '2024', abstract: 'Deep learning architecture for anomaly detection.', citations: 15, link: '#', pdfLink: '#', tags: ['Deep Learning','Anomaly Detection'] }
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