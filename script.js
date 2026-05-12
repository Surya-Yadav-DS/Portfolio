// ─────────────────────────────────────────────────────────────
//  script.js  —  Public portfolio renderer
// ─────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
    "profile": {
        "name": "Surya Prasad Yadav",
        "title": "Data Science Engineer",
        "email": "surya3ydv@gmail.com",
        "phone": "(+977) 9848703545",
        "location": "Kathmandu, Nepal",
        "github": "https://github.com/Surya-Yadav-DS",
        "linkedin": "https://www.linkedin.com/in/surya-prasad-yadav-8b8a82238/",
        "scholar": "https://scholar.google.com/citations?user=N-KpILwAAAAJ&hl=en&authuser=1",
        "resume": "#",
        "photoUrl": "https://drive.google.com/thumbnail?id=1Eytfle8QGZplpdgaTmyu-V3n-xPLhyab&sz=w600"
    },
    "skills": [
        {
            "title": "Machine Learning & AI",
            "icon": "fa-brain",
            "skills": [
                {
                    "name": "Machine Learning",
                    "level": 85
                },
                {
                    "name": "Deep Learning",
                    "level": 80
                },
                {
                    "name": "NLP",
                    "level": 90
                },
                {
                    "name": "Data Mining",
                    "level": 80
                },
                {
                    "name": "Feature Engineering",
                    "level": 85
                },
                {
                    "name": "Model Evaluation",
                    "level": 85
                }
            ]
        },
        {
            "title": "Programming",
            "icon": "fa-code",
            "skills": [
                {
                    "name": "Python",
                    "level": 95
                },
                {
                    "name": "R",
                    "level": 80
                },
                {
                    "name": "SQL",
                    "level": 90
                },
                {
                    "name": "C",
                    "level": 80
                },
                {
                    "name": "Java",
                    "level": 80
                },
                {
                    "name": "JavaScript",
                    "level": 75
                }
            ]
        },
        {
            "title": "Data Science & Analytics",
            "icon": "fa-solid fa-chart-area",
            "skills": [
                {
                    "name": "Data Analysis",
                    "level": 85
                },
                {
                    "name": "Data Visualization",
                    "level": 90
                },
                {
                    "name": "Exploratory Data Analysis (EDA)",
                    "level": 85
                },
                {
                    "name": "Statical Analysis",
                    "level": 80
                },
                {
                    "name": "Time Series Analysis",
                    "level": 80
                }
            ]
        },
        {
            "title": "Tools & Platforms",
            "icon": "fa-solid fa-screwdriver-wrench",
            "skills": [
                {
                    "name": "Pandas",
                    "level": 85
                },
                {
                    "name": "Numpy",
                    "level": 85
                },
                {
                    "name": "Scikit-learn",
                    "level": 80
                },
                {
                    "name": "Streamlit",
                    "level": 85
                },
                {
                    "name": "Git & GitHub",
                    "level": 80
                },
                {
                    "name": "VS Code",
                    "level": 85
                },
                {
                    "name": "PowerBI",
                    "level": 80
                }
            ]
        }
    ],
    "projects": [
        {
            "title": "NEPSE Analytics",
            "description": "Analyzes the past market trend and predicts the future trends.",
            "highlight": "73% Accuracy",
            "tags": [
                "Python",
                "XGBoost",
                "Random Forest",
                "Ridge"
            ],
            "github": "https://github.com/Surya-Yadav-DS/nepse_analytics",
            "live": "https://nepse-analytics-surya.streamlit.app/"
        },
        {
            "title": "SegmentIQ",
            "description": "Built an ML model for Ecommerce and Business insights and analysis",
            "highlight": "Business Insights",
            "tags": [
                "Python",
                "Kmeans",
                "Streamlit"
            ],
            "github": "https://github.com/Surya-Yadav-DS/SegmentIQ",
            "live": "https://segmentiq-surya.streamlit.app/"
        }
    ],
    "research": [
        {
            "title": "Hybrid CNN-LSTM approach for sentiment analysis on IMDB movie reviews",
            "authors": "Surya Prasad Yadav, Rahul Kumar Gupta, Prasant Kumar Dash",
            "venue": "CRC Press",
            "year": "2025",
            "citations": 1,
            "abstract": "The paper introduces a CNN-LSTM hybrid model for sentiment analysis on IMDB data, outperforming traditional models—enhancing accuracy, interpretability, and robustness.",
            "tags": [
                "NLP"
            ],
            "link": "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003658221-55/hybrid-cnn-lstm-approach-sentiment-analysis-imdb-movie-reviews-rahul-kumar-gupta-binayak-ojha-surya-prasad-yadav-abhinav-kumar-singh-prasant-kumar-dash-aadarsh-kumar-singh",
            "pdfLink": "#"
        }
    ],
    "achievements": [
        {
            "title": "Innovate Odisha Hackathon 2.0",
            "description": "24-Hour Tech Marathon",
            "icon": "fa-medal",
            "category": "Hackathon",
            "date": "September 2024"
        },
        {
            "title": "Embedded Systems Training and Internship",
            "description": "Got hands-on experience on embedded systems.",
            "icon": "fa-award",
            "category": "Training cum Internship",
            "date": "July 2024"
        },
        {
            "title": "Cisco Certified Network Associate (CCNA)",
            "description": "Validated knowledge in network fundamentals, IP connectivity, IP services and security fundamentals.",
            "icon": "fa-award",
            "category": "Certification",
            "date": "May 2023"
        },
        {
            "title": "Google UX Design Certificate - Coursera",
            "description": "Developed proficiency in the end-to-end UX design process.",
            "icon": "fa-award",
            "category": "Certification",
            "date": "May 2024"
        },
        {
            "title": "Infosys Springboard Data Visualization Course",
            "description": "Completed an 8-week virtual internship in data insights, PowerBI, modeling, and dashboard design.",
            "icon": "fa-award",
            "category": "Certificate",
            "date": "March 2024"
        }
    ],
    "education": [
        {
            "degree": "Bachelor of Technology in Computer Science & Engineering",
            "specialization": "Data Science",
            "institution": "C.V. Raman Global University",
            "location": "Bhubaneswar, India",
            "period": "2021 – 2025",
            "gpa": "8.46/10.0",
            "highlights": [
                "Advanced Machine Learning",
                "Data Visualization",
                "Data Mining & Data Warehousing",
                "Big Data & Analytics"
            ]
        },
        {
            "degree": "12th Certificate",
            "specialization": "",
            "institution": "DAV Sushil Kedia Vishwa Bharati",
            "location": "Kathmandu, Nepal",
            "period": "2019-2021",
            "gpa": "80.50%",
            "highlights": [
                "Computer Science",
                "Mathematics",
                "Physics"
            ]
        },
        {
            "degree": "10th Certificate",
            "specialization": "",
            "institution": "RR Sure Success English Boarding School",
            "location": "Malangawa, Nepal",
            "period": "2019",
            "gpa": "3.45/4.0",
            "highlights": [
                "Mathematics",
                "Science"
            ]
        }
    ],
    "experience": [
        {
            "title": "Embedded Systems and AI Intern",
            "company": "Cranes Varsity",
            "location": "Bengaluru, India",
            "period": "Oct 2024 - Feb 2025",
            "description": []
        }
    ]
};

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
    setTxt('footerText', `© ${new Date().getFullYear()} ${p.name}`);
    document.title = `${p.name} — Portfolio`;
    if (p.github)   setHref('linkGithub',    p.github);
    if (p.linkedin) setHref('linkLinkedin',  p.linkedin);
    if (p.email)    setHref('linkEmail',     'mailto:' + p.email);
    if (p.scholar)  { setHref('linkScholar', p.scholar); setHref('linkScholarBtn', p.scholar); }
    if (p.resume)   setHref('linkResume',    p.resume);
    if (p.photoUrl) applyPhotoToPage(p.photoUrl);
}

function applyPhotoToPage(src) {
    if (!src) return;
    const img   = document.getElementById('profilePhoto');
    const emoji = document.querySelector('.profile-emoji');
    if (img)   { img.src = src; img.style.display = 'block'; }
    if (emoji) emoji.style.display = 'none';
}

function loadSavedPhoto() {
    if ((portfolioData.profile || {}).photoUrl) return;
    const photo = localStorage.getItem('profilePhoto');
    if (photo) applyPhotoToPage(photo);
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
    grid.innerHTML = portfolioData.skills.map(cat => `
        <div class="skill-card">
            <div class="skill-header">
                <div class="skill-icon"><i class="fas ${cat.icon}"></i></div>
                <h3>${cat.title}</h3>
            </div>
            <div class="skill-list">
                ${cat.skills.map(s => `
                    <div class="skill-item">
                        <div class="skill-name"><span>${s.name}</span><span class="skill-pct">${s.level}%</span></div>
                        <div class="skill-bar"><div class="skill-progress" style="width:0%" data-width="${s.level}%"></div></div>
                    </div>`).join('')}
            </div>
        </div>`).join('');
    setTimeout(() => document.querySelectorAll('.skill-progress').forEach(b => b.style.width = b.dataset.width), 200);
}

// ── Projects ──────────────────────────────────────────────────
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = portfolioData.projects.map(p => {
        const gh = p.github ? `<a href="${p.github}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>` : '';
        const lv = p.live   ? `<a href="${p.live}"   class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : '';
        return `
        <div class="project-card">
            <div class="project-card-top">
                <h3 class="project-title">${p.title}</h3>
                <span class="project-highlight"><i class="fas fa-star"></i> ${p.highlight}</span>
            </div>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
            ${(gh || lv) ? `<div class="project-links">${gh}${lv}</div>` : ''}
        </div>`;
    }).join('');
}

// ── Research ──────────────────────────────────────────────────
function renderResearch() {
    const list = document.getElementById('researchList');
    if (!list) return;
    list.innerHTML = portfolioData.research.map(r => `
        <div class="research-item">
            <div class="research-inner">
                <div class="research-icon-wrap"><i class="fas fa-file-alt"></i></div>
                <div class="research-body">
                    <h3 class="research-title">${r.title}</h3>
                    <div class="research-meta">
                        <span><i class="fas fa-users"></i> ${r.authors}</span>
                        <span><i class="fas fa-calendar"></i> ${r.year}</span>
                    </div>
                    <p class="research-venue">${r.venue}</p>
                    <p class="research-abstract">${r.abstract}</p>
                    <div class="research-tags">${(r.tags || []).map(t => `<span class="research-tag">${t}</span>`).join('')}</div>
                    <div class="research-footer">
                        <span class="research-citations"><i class="fas fa-quote-right"></i> <strong class="cite-num">${r.citations}</strong> citations</span>
                        ${r.link    && r.link    !== '#' ? `<a href="${r.link}"    class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> View Paper</a>` : ''}
                        ${r.pdfLink && r.pdfLink !== '#' ? `<a href="${r.pdfLink}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> PDF</a>` : ''}
                    </div>
                </div>
            </div>
        </div>`).join('');
}

// ── Achievements ──────────────────────────────────────────────
function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;
    grid.innerHTML = portfolioData.achievements.map(a => `
        <div class="achievement-card">
            <div class="achievement-inner">
                <div class="achievement-front">
                    <div class="ach-front-inner">
                        <div class="ach-icon-wrap"><i class="fas ${a.icon}"></i></div>
                        <div class="ach-info">
                            <div class="ach-top-row">
                                <h3 class="ach-title">${a.title}</h3>
                                <span class="ach-category">${a.category}</span>
                            </div>
                            <p class="ach-desc">${a.description}</p>
                            <p class="ach-date"><i class="fas fa-calendar-alt"></i> ${a.date}</p>
                        </div>
                    </div>
                </div>
                <div class="achievement-back">
                    <i class="fas ${a.icon} ach-back-icon"></i>
                    <p class="ach-unlocked">🎉 Unlocked!</p>
                    <p class="ach-flip-hint">Click to flip back</p>
                </div>
            </div>
        </div>`).join('');
    document.querySelectorAll('.achievement-card').forEach(c => c.addEventListener('click', () => c.classList.toggle('flipped')));
}

// ── Education ─────────────────────────────────────────────────
function renderEducation() {
    const list = document.getElementById('educationList');
    if (!list) return;
    list.innerHTML = portfolioData.education.map(edu => {
        const gpaHTML = edu.gpa
            ? `<span class="edu-meta-pill"><i class="fas fa-star"></i> GPA: ${edu.gpa}</span>` : '';
        const hlHTML  = (edu.highlights && edu.highlights.length)
            ? `<ul class="edu-highlights">${edu.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : '';
        return `
        <div class="education-item">
            <div class="edu-exp-inner">
                <div class="edu-icon-wrap"><i class="fas fa-graduation-cap"></i></div>
                <div class="edu-exp-body">
                    <h3 class="edu-degree">${edu.degree}</h3>
                    ${edu.specialization ? `<p class="edu-spec">${edu.specialization}</p>` : ''}
                    <p class="edu-inst"><i class="fas fa-university"></i> ${edu.institution}</p>
                    <div class="edu-meta-row">
                        ${edu.location ? `<span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> ${edu.location}</span>` : ''}
                        ${edu.period   ? `<span class="edu-meta-pill"><i class="fas fa-calendar"></i> ${edu.period}</span>`         : ''}
                        ${gpaHTML}
                    </div>
                    ${hlHTML}
                </div>
            </div>
        </div>`;
    }).join('');
}

// ── Experience ────────────────────────────────────────────────
function renderExperience() {
    const list = document.getElementById('experienceList');
    if (!list) return;
    list.innerHTML = portfolioData.experience.map(exp => {
        const descHTML = (exp.description && exp.description.length)
            ? `<ul class="exp-bullets">${exp.description.map(d => `<li>${d}</li>`).join('')}</ul>` : '';
        return `
        <div class="experience-item">
            <div class="edu-exp-inner">
                <div class="exp-icon-wrap"><i class="fas fa-briefcase"></i></div>
                <div class="edu-exp-body">
                    <h3 class="exp-title-text">${exp.title}</h3>
                    <p class="exp-company"><i class="fas fa-building"></i> ${exp.company}</p>
                    <div class="edu-meta-row">
                        ${exp.location ? `<span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>` : ''}
                        ${exp.period   ? `<span class="edu-meta-pill"><i class="fas fa-calendar"></i> ${exp.period}</span>`         : ''}
                    </div>
                    ${descHTML}
                </div>
            </div>
        </div>`;
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
