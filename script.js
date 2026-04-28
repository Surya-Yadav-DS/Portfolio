// ─────────────────────────────────────────────────────────────
//  script.js  —  Public-facing portfolio logic
//  Admin panel is SEPARATE (admin.html / admin.js)
//  Public users cannot edit anything.
// ─────────────────────────────────────────────────────────────

// ── Load data from localStorage (written by admin panel) ──────
function loadPortfolioData() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) return JSON.parse(saved);

    // Default data — shown until admin saves real data
    return {
        profile: {
            name:     'Surya Prasad Yadav',
            title:    'Data Science Engineer',
            email:    'surya3ydv@gmail.com',
            phone:    '(+977) 9848703545',
            location: 'Kathmandu, Nepal',
            github:   'https://github.com/yourusername',
            linkedin: 'https://linkedin.com/in/yourusername',
            scholar:  'https://scholar.google.com/citations?user=yourid',
            resume:   '#'
        },
        skills: [
            { icon: 'fa-brain', title: 'Machine Learning', skills: [
                { name: 'TensorFlow',  level: 90 },
                { name: 'PyTorch',     level: 85 },
                { name: 'Scikit-learn',level: 95 },
                { name: 'Keras',       level: 80 }
            ]},
            { icon: 'fa-code', title: 'Programming', skills: [
                { name: 'Python',      level: 95 },
                { name: 'R',           level: 80 },
                { name: 'SQL',         level: 90 },
                { name: 'JavaScript',  level: 75 }
            ]},
            { icon: 'fa-database', title: 'Data Engineering', skills: [
                { name: 'Apache Spark',level: 85 },
                { name: 'PostgreSQL',  level: 88 },
                { name: 'MongoDB',     level: 80 },
                { name: 'Redis',       level: 75 }
            ]},
            { icon: 'fa-chart-bar', title: 'Data Visualization', skills: [
                { name: 'Tableau',     level: 85 },
                { name: 'Plotly',      level: 90 },
                { name: 'D3.js',       level: 70 },
                { name: 'Power BI',    level: 80 }
            ]},
            { icon: 'fa-chart-line', title: 'Analytics', skills: [
                { name: 'Statistical Analysis', level: 90 },
                { name: 'A/B Testing',          level: 85 },
                { name: 'Predictive Modeling',  level: 88 },
                { name: 'Time Series',          level: 82 }
            ]},
            { icon: 'fa-code-branch', title: 'Tools & Platforms', skills: [
                { name: 'Git',      level: 90 },
                { name: 'Docker',   level: 85 },
                { name: 'AWS',      level: 80 },
                { name: 'Azure ML', level: 75 }
            ]}
        ],
        projects: [
            {
                title: 'Customer Churn Prediction',
                description: 'Built an ML model to predict customer churn with 94% accuracy using XGBoost and deployed via FastAPI on AWS.',
                tags: ['Python', 'XGBoost', 'AWS', 'Docker', 'FastAPI'],
                github: 'https://github.com/yourusername/churn-prediction',
                live: 'https://churn-demo.example.com',
                highlight: '94% Accuracy'
            },
            {
                title: 'Real-time Sentiment Dashboard',
                description: 'Streaming data pipeline for social media sentiment analysis processing 10K+ tweets per minute.',
                tags: ['Apache Kafka', 'Spark', 'React', 'NLP', 'MongoDB'],
                github: 'https://github.com/yourusername/sentiment-dashboard',
                live: 'https://sentiment-demo.example.com',
                highlight: '10K tweets/min'
            },
            {
                title: 'Recommendation Engine',
                description: 'Collaborative filtering system that increased user engagement by 35% across the platform.',
                tags: ['TensorFlow', 'Python', 'Redis', 'PostgreSQL'],
                github: 'https://github.com/yourusername/recommendation-engine',
                live: 'https://rec-demo.example.com',
                highlight: '+35% Engagement'
            },
            {
                title: 'Computer Vision Object Detection',
                description: 'Fine-tuned YOLOv8 model for real-time object detection on edge devices with low latency.',
                tags: ['PyTorch', 'YOLO', 'OpenCV', 'Edge AI'],
                github: 'https://github.com/yourusername/object-detection',
                live: 'https://cv-demo.example.com',
                highlight: 'Real-time'
            },
            {
                title: 'Sales Forecasting System',
                description: 'Time series forecasting using LSTM and Prophet with automated retraining pipelines via Airflow.',
                tags: ['LSTM', 'Prophet', 'Python', 'MLflow', 'Airflow'],
                github: 'https://github.com/yourusername/sales-forecasting',
                live: 'https://forecast-demo.example.com',
                highlight: 'MAPE < 5%'
            },
            {
                title: 'Data Quality Monitor',
                description: 'Automated data quality monitoring platform with anomaly detection and real-time alerting.',
                tags: ['Python', 'Great Expectations', 'Grafana', 'PostgreSQL'],
                github: 'https://github.com/yourusername/data-quality',
                live: 'https://quality-demo.example.com',
                highlight: '99.9% Uptime'
            }
        ],
        research: [
            {
                title: 'Novel Approaches to Time Series Anomaly Detection using Deep Learning',
                authors: 'Surya Prasad Yadav, Co-Author 1, Co-Author 2',
                venue: 'IEEE International Conference on Data Science',
                year: '2024',
                abstract: 'This paper presents a novel deep learning architecture for detecting anomalies in multivariate time series data, outperforming existing baselines by 12%.',
                citations: 15,
                link: 'https://doi.org/example/paper1',
                pdfLink: 'https://arxiv.org/example/paper1.pdf',
                tags: ['Deep Learning', 'Anomaly Detection', 'Time Series']
            },
            {
                title: 'Efficient Feature Engineering for Large-Scale Machine Learning',
                authors: 'Surya Prasad Yadav, Co-Author 3',
                venue: 'ACM International Conference on Machine Learning',
                year: '2024',
                abstract: 'We propose automated feature engineering methods that reduce computational overhead while maintaining model accuracy across diverse datasets.',
                citations: 8,
                link: 'https://doi.org/example/paper2',
                pdfLink: 'https://arxiv.org/example/paper2.pdf',
                tags: ['Feature Engineering', 'Scalability', 'AutoML']
            },
            {
                title: 'Transfer Learning for Medical Image Classification with Limited Data',
                authors: 'Co-Author 1, Surya Prasad Yadav, Co-Author 4',
                venue: 'Journal of Medical AI Research',
                year: '2023',
                abstract: 'A comprehensive study on transfer learning techniques for medical image classification achieving state-of-the-art results with minimal training data.',
                citations: 23,
                link: 'https://doi.org/example/paper3',
                pdfLink: 'https://arxiv.org/example/paper3.pdf',
                tags: ['Transfer Learning', 'Medical AI', 'Computer Vision']
            }
        ],
        achievements: [
            { icon: 'fa-trophy',   title: 'First Place — Data Science Hackathon 2025', description: 'Won first place among 200+ teams for building an AI-powered healthcare diagnosis system.', date: 'March 2025',    category: 'Competition'   },
            { icon: 'fa-award',    title: 'AWS Certified Machine Learning Specialty',    description: 'Professional certification validating expertise in building and deploying ML models on AWS.', date: 'January 2025',  category: 'Certification' },
            { icon: 'fa-medal',    title: "Dean's List — All Semesters",                description: 'Consistently maintained GPA above 3.8/4.0 throughout the undergraduate program.', date: '2021–2025',     category: 'Academic'      },
            { icon: 'fa-star',     title: 'Research Publication — IEEE Conference',     description: 'Published paper on Novel Approaches to Time Series Anomaly Detection in multivariate data.', date: 'November 2024', category: 'Research'      },
            { icon: 'fa-bullseye', title: 'Kaggle Expert',                              description: 'Achieved Expert tier on Kaggle with multiple top 10% finishes and 3 gold medals.', date: 'Ongoing',       category: 'Competition'   },
            { icon: 'fa-bolt',     title: 'Google Data Analytics Certificate',          description: 'Comprehensive certification covering data analysis, visualization, and statistical methods.', date: 'August 2024', category: 'Certification' }
        ],
        education: [
            {
                degree: 'Bachelor of Science in Computer Science',
                specialization: 'Data Science Specialization',
                institution: 'Tribhuvan University',
                location: 'Kathmandu, Nepal',
                period: '2021 – 2025',
                gpa: '3.9 / 4.0',
                highlights: [
                    'Concentration in Machine Learning and Data Analytics',
                    'Deep Learning, Statistical Methods, Big Data Analytics',
                    'Senior Thesis: Advanced Anomaly Detection in Time Series Data'
                ]
            }
        ],
        experience: [
            {
                title: 'Data Science Engineer',
                company: 'CloudMind Analytics',
                location: 'Kathmandu, Nepal',
                period: 'Jan 2024 – Present',
                description: [
                    'Developed predictive models improving customer retention by 28%',
                    'Built automated ETL pipelines processing 10M+ records daily',
                    'Collaborated with cross-functional teams to deliver ML-powered features',
                    'Implemented A/B testing framework to validate model improvements'
                ]
            },
            {
                title: 'Machine Learning Research Assistant',
                company: 'University Research Lab',
                location: 'Kathmandu, Nepal',
                period: 'Jan 2023 – May 2024',
                description: [
                    'Conducted research on deep learning architectures for NLP tasks',
                    'Published 2 papers in peer-reviewed international conferences',
                    'Mentored 5 undergraduate students in ML research projects',
                    'Secured research grant for continued anomaly detection work'
                ]
            },
            {
                title: 'Data Analytics Intern',
                company: 'Fusemachines Nepal',
                location: 'Kathmandu, Nepal',
                period: 'Jun 2022 – Dec 2022',
                description: [
                    'Analyzed large datasets to derive actionable business insights',
                    'Created interactive dashboards for stakeholder reporting',
                    'Improved data pipeline efficiency by 40% through optimization'
                ]
            }
        ]
    };
}

const portfolioData = loadPortfolioData();

// ── Initialize ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    loadProfileData();
    loadSavedPhoto();
    renderSkills();
    renderProjects();
    renderResearch();
    renderAchievements();
    renderEducation();
    renderExperience();
    initContactForm();
    initScrollAnimations();
});

// ── Load profile data — READ ONLY for public users ────────────
function loadProfileData() {
    const p = portfolioData.profile;

    setTextSafe('profileName',     p.name);
    setTextSafe('profileTitle',    p.title);
    setTextSafe('profileLocation', p.location);
    setTextSafe('profileEmail',    p.email);
    setTextSafe('profilePhone',    p.phone);
    setTextSafe('contactEmail',    p.email);
    setTextSafe('contactPhone',    p.phone);
    setTextSafe('contactLocation', p.location);
    setTextSafe('footerText',      `© 2026 ${p.name}. Built with HTML, CSS & JavaScript.`);

    setHrefSafe('linkGithub',    p.github);
    setHrefSafe('linkLinkedin',  p.linkedin);
    setHrefSafe('linkEmail',     `mailto:${p.email}`);
    setHrefSafe('linkScholar',   p.scholar);
    setHrefSafe('linkScholarBtn',p.scholar);
    setHrefSafe('linkResume',    p.resume);
}

function setTextSafe(id, val) {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
}
function setHrefSafe(id, val) {
    const el = document.getElementById(id);
    if (el && val && val !== '#') el.href = val;
}

// ── Load saved profile photo (set by admin panel) ─────────────
function loadSavedPhoto() {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        const img   = document.getElementById('profilePhoto');
        const emoji = document.querySelector('.profile-emoji');
        if (img)   { img.src = savedPhoto; img.style.display = 'block'; }
        if (emoji) { emoji.style.display = 'none'; }
    }
    // Public users cannot change the photo — camera button stays hidden
}

// ── Theme toggle ──────────────────────────────────────────────
function initTheme() {
    const btn = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') {
        document.body.classList.add('dark');
        btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ── Scroll-spy nav ────────────────────────────────────────────
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => obs.observe(s));

    navItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(item.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ── Render Skills ─────────────────────────────────────────────
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
                ${cat.skills.map(skill => `
                    <div class="skill-item">
                        <div class="skill-name">
                            <span>${skill.name}</span>
                            <span class="skill-pct">${skill.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width:0%" data-width="${skill.level}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    // Bars animated by animations.js on scroll-into-view
}

// ── Render Projects ───────────────────────────────────────────
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = portfolioData.projects.map(p => `
        <div class="project-card">
            <div class="project-card-top">
                <h3 class="project-title">${p.title}</h3>
                <span class="project-highlight"><i class="fas fa-star"></i> ${p.highlight}</span>
            </div>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">
                ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${p.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> Code
                </a>
                <a href="${p.live}" class="project-link" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `).join('');
}

// ── Render Research ───────────────────────────────────────────
function renderResearch() {
    const list = document.getElementById('researchList');
    if (!list) return;
    list.innerHTML = portfolioData.research.map(paper => `
        <div class="research-item">
            <div class="research-inner">
                <div class="research-icon-wrap">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="research-body">
                    <h3 class="research-title">${paper.title}</h3>
                    <div class="research-meta">
                        <span><i class="fas fa-users"></i> ${paper.authors}</span>
                        <span><i class="fas fa-calendar"></i> ${paper.year}</span>
                    </div>
                    <p class="research-venue">${paper.venue}</p>
                    <p class="research-abstract">${paper.abstract}</p>
                    <div class="research-tags">
                        ${paper.tags.map(t => `<span class="research-tag">${t}</span>`).join('')}
                    </div>
                    <div class="research-footer">
                        <span class="research-citations">
                            <i class="fas fa-quote-right"></i>
                            <strong class="cite-num">${paper.citations}</strong> citations
                        </span>
                        <a href="${paper.link}"    class="project-link" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> View Paper</a>
                        <a href="${paper.pdfLink}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf"></i> PDF</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ── Render Achievements ───────────────────────────────────────
function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;
    grid.innerHTML = portfolioData.achievements.map(a => `
        <div class="achievement-card">
            <div class="achievement-inner">
                <div class="achievement-front">
                    <div class="ach-front-inner">
                        <div class="ach-icon-wrap">
                            <i class="fas ${a.icon}"></i>
                        </div>
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
        </div>
    `).join('');

    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
}

// ── Render Education ──────────────────────────────────────────
function renderEducation() {
    const list = document.getElementById('educationList');
    if (!list) return;
    list.innerHTML = portfolioData.education.map(edu => {
        // Only render highlights list if there are actual highlights
        const highlightHTML = (edu.highlights && edu.highlights.length)
            ? `<ul class="edu-highlights">
                ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
               </ul>`
            : '';
        // Only render GPA if it exists
        const gpaHTML = edu.gpa ? `<span class="edu-meta-pill">GPA: ${edu.gpa}</span>` : '';

        return `
        <div class="education-item">
            <div class="edu-exp-inner">
                <div class="edu-icon-wrap">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="edu-exp-body">
                    <h3 class="edu-degree">${edu.degree}</h3>
                    <p class="edu-spec">${edu.specialization || ''}</p>
                    <p class="edu-inst"><i class="fas fa-university"></i> ${edu.institution}</p>
                    <div class="edu-meta-row">
                        <span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> ${edu.location || ''}</span>
                        <span class="edu-meta-pill"><i class="fas fa-calendar"></i> ${edu.period || ''}</span>
                        ${gpaHTML}
                    </div>
                    ${highlightHTML}
                </div>
            </div>
        </div>`;
    }).join('');
}

// ── Render Experience ─────────────────────────────────────────
function renderExperience() {
    const list = document.getElementById('experienceList');
    if (!list) return;
    list.innerHTML = portfolioData.experience.map(exp => {
        // Only render description list if there are actual items
        const descHTML = (exp.description && exp.description.length)
            ? `<ul class="exp-bullets">
                ${exp.description.map(d => `<li>${d}</li>`).join('')}
               </ul>`
            : '';

        return `
        <div class="experience-item">
            <div class="edu-exp-inner">
                <div class="exp-icon-wrap">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div class="edu-exp-body">
                    <h3 class="exp-title-text">${exp.title}</h3>
                    <p class="exp-company"><i class="fas fa-building"></i> ${exp.company}</p>
                    <div class="edu-meta-row">
                        <span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> ${exp.location || ''}</span>
                        <span class="edu-meta-pill"><i class="fas fa-calendar"></i> ${exp.period || ''}</span>
                    </div>
                    ${descHTML}
                </div>
            </div>
        </div>`;
    }).join('');
}

// ── Contact form ──────────────────────────────────────────────
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        btn.disabled = true;
        await new Promise(r => setTimeout(r, 2000));
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; form.reset(); }, 2500);
    });
}

// ── Scroll-reveal (sections fade up) ─────────────────────────
function initScrollAnimations() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('section').forEach(s => {
        s.style.opacity   = '0';
        s.style.transform = 'translateY(22px)';
        s.style.transition = 'opacity .6s ease, transform .6s ease';
        obs.observe(s);
    });
}