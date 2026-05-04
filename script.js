// ─────────────────────────────────────────────────────────────
//  script.js  —  Public portfolio
// ─────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
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
        { icon:'fa-brain',       title:'Machine Learning',   skills:[{name:'TensorFlow',level:90},{name:'PyTorch',level:85},{name:'Scikit-learn',level:95},{name:'Keras',level:80}]},
        { icon:'fa-code',        title:'Programming',        skills:[{name:'Python',level:95},{name:'R',level:80},{name:'SQL',level:90},{name:'JavaScript',level:75}]},
        { icon:'fa-database',    title:'Data Engineering',   skills:[{name:'Apache Spark',level:85},{name:'PostgreSQL',level:88},{name:'MongoDB',level:80},{name:'Redis',level:75}]},
        { icon:'fa-chart-bar',   title:'Data Visualization', skills:[{name:'Tableau',level:85},{name:'Plotly',level:90},{name:'D3.js',level:70},{name:'Power BI',level:80}]},
        { icon:'fa-chart-line',  title:'Analytics',          skills:[{name:'Statistical Analysis',level:90},{name:'A/B Testing',level:85},{name:'Predictive Modeling',level:88},{name:'Time Series',level:82}]},
        { icon:'fa-code-branch', title:'Tools & Platforms',  skills:[{name:'Git',level:90},{name:'Docker',level:85},{name:'AWS',level:80},{name:'Azure ML',level:75}]}
    ],
    projects: [
        {title:'Customer Churn Prediction',       description:'Built an ML model to predict customer churn with 94% accuracy using XGBoost deployed via FastAPI on AWS.',          tags:['Python','XGBoost','AWS','Docker','FastAPI'],       github:'https://github.com/yourusername/churn-prediction',      live:'https://churn-demo.example.com',     highlight:'94% Accuracy'},
        {title:'Real-time Sentiment Dashboard',   description:'Streaming data pipeline for social media sentiment analysis processing 10K+ tweets per minute.',                     tags:['Apache Kafka','Spark','React','NLP','MongoDB'],    github:'https://github.com/yourusername/sentiment-dashboard',   live:'https://sentiment-demo.example.com', highlight:'10K tweets/min'},
        {title:'Recommendation Engine',           description:'Collaborative filtering system that increased user engagement by 35% across the platform.',                          tags:['TensorFlow','Python','Redis','PostgreSQL'],        github:'https://github.com/yourusername/recommendation-engine', live:'https://rec-demo.example.com',       highlight:'+35% Engagement'},
        {title:'Computer Vision Object Detection',description:'Fine-tuned YOLOv8 for real-time object detection on edge devices with low latency.',                                tags:['PyTorch','YOLO','OpenCV','Edge AI'],               github:'https://github.com/yourusername/object-detection',      live:'https://cv-demo.example.com',        highlight:'Real-time'},
        {title:'Sales Forecasting System',        description:'Time series forecasting using LSTM and Prophet with automated retraining pipelines via Airflow.',                    tags:['LSTM','Prophet','Python','MLflow','Airflow'],      github:'https://github.com/yourusername/sales-forecasting',     live:'https://forecast-demo.example.com',  highlight:'MAPE < 5%'},
        {title:'Data Quality Monitor',            description:'Automated data quality monitoring platform with anomaly detection and real-time alerting.',                           tags:['Python','Great Expectations','Grafana','PostgreSQL'],github:'https://github.com/yourusername/data-quality',          live:'https://quality-demo.example.com',   highlight:'99.9% Uptime'}
    ],
    research: [
        {title:'Novel Approaches to Time Series Anomaly Detection using Deep Learning',authors:'Surya Prasad Yadav, Co-Author 1, Co-Author 2',venue:'IEEE International Conference on Data Science',year:'2024',abstract:'A novel deep learning architecture for detecting anomalies in multivariate time series, outperforming existing baselines by 12%.',citations:15,link:'https://doi.org/example/paper1',pdfLink:'https://arxiv.org/example/paper1.pdf',tags:['Deep Learning','Anomaly Detection','Time Series']},
        {title:'Efficient Feature Engineering for Large-Scale Machine Learning',       authors:'Surya Prasad Yadav, Co-Author 3',           venue:'ACM International Conference on Machine Learning',year:'2024',abstract:'Automated feature engineering methods that reduce computational overhead while maintaining accuracy across diverse datasets.',citations:8, link:'https://doi.org/example/paper2',pdfLink:'https://arxiv.org/example/paper2.pdf',tags:['Feature Engineering','Scalability','AutoML']},
        {title:'Transfer Learning for Medical Image Classification with Limited Data', authors:'Co-Author 1, Surya Prasad Yadav, Co-Author 4',venue:'Journal of Medical AI Research',               year:'2023',abstract:'A comprehensive study on transfer learning for medical image classification achieving state-of-the-art with minimal training data.',citations:23,link:'https://doi.org/example/paper3',pdfLink:'https://arxiv.org/example/paper3.pdf',tags:['Transfer Learning','Medical AI','Computer Vision']}
    ],
    achievements: [
        {icon:'fa-trophy',  title:'First Place — Data Science Hackathon 2025',description:'Won first place among 200+ teams for an AI-powered healthcare diagnosis system.',date:'March 2025',   category:'Competition'},
        {icon:'fa-award',   title:'AWS Certified Machine Learning Specialty',   description:'Professional certification validating expertise in building ML models on AWS.',        date:'January 2025', category:'Certification'},
        {icon:'fa-medal',   title:"Dean's List — All Semesters",               description:'Consistently maintained GPA above 3.8/4.0 throughout the undergraduate program.',  date:'2021–2025',    category:'Academic'},
        {icon:'fa-star',    title:'Research Publication — IEEE Conference',    description:'Published paper on Novel Approaches to Time Series Anomaly Detection.',             date:'November 2024',category:'Research'},
        {icon:'fa-bullseye',title:'Kaggle Expert',                             description:'Achieved Expert tier with multiple top 10% finishes and 3 gold medals.',            date:'Ongoing',      category:'Competition'},
        {icon:'fa-bolt',    title:'Google Data Analytics Certificate',         description:'Comprehensive certification covering data analysis, visualization and statistics.', date:'August 2024',  category:'Certification'}
    ],
    education: [
        {degree:'B.Sc. Computer Science & Data Science',specialization:'Data Science Specialization',institution:'Tribhuvan University', location:'Kathmandu, Nepal',period:'2021–2025',gpa:'3.9 / 4.0',highlights:['Concentration in Machine Learning and Data Analytics','Courses: Deep Learning, Statistical Methods, Big Data Analytics','Senior Thesis: Advanced Anomaly Detection in Time Series Data']},
        {degree:'+2 Science (PCM)',                      specialization:'',                           institution:"St. Xavier's College",location:'Kathmandu, Nepal',period:'2019–2021',gpa:'',         highlights:[]}
    ],
    experience: [
        {title:'Data Science Engineer', company:'CloudMind Analytics',location:'Kathmandu, Nepal',period:'Jan 2024 – Present',  description:['Developed predictive models improving customer retention by 28%','Built automated ETL pipelines processing 10M+ records daily','Implemented A/B testing framework validating model improvements','Deployed 6 production ML models with drift monitoring on AWS']},
        {title:'ML Research Assistant', company:'TU Research Lab',    location:'Kathmandu, Nepal',period:'Jan 2023 – May 2024', description:['Researched deep learning architectures for low-resource NLP','Published 2 papers in peer-reviewed conferences','Mentored 5 undergraduate students in ML projects']},
        {title:'Data Analytics Intern', company:'Fusemachines Nepal', location:'Kathmandu, Nepal',period:'Jun 2022 – Dec 2022', description:['Analyzed large datasets for actionable business insights','Built interactive dashboards for stakeholder reporting','Improved pipeline efficiency by 40%']}
    ]
};

// Load from localStorage if admin saved data; else use DEFAULT_DATA above
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

    // Live sync: when admin saves in another tab, re-render instantly
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
function setTxt(id, v)  { const e=document.getElementById(id); if(e && v!=null) e.textContent=v; }
function setHref(id, v) { const e=document.getElementById(id); if(e && v && v!=='#') e.href=v; }

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
    setTxt('footerText',      `© ${new Date().getFullYear()} ${p.name}`);
    document.title = `${p.name} — Portfolio`;
    setHref('linkGithub',     p.github);
    setHref('linkLinkedin',   p.linkedin);
    setHref('linkEmail',      `mailto:${p.email}`);
    setHref('linkScholar',    p.scholar);
    setHref('linkScholarBtn', p.scholar);
    setHref('linkResume',     p.resume);
}

function loadSavedPhoto() {
    const photo = localStorage.getItem('profilePhoto');
    if (!photo) return;
    const img   = document.getElementById('profilePhoto');
    const emoji = document.querySelector('.profile-emoji');
    if (img)   { img.src=photo; img.style.display='block'; }
    if (emoji) { emoji.style.display='none'; }
}

// ── Theme ─────────────────────────────────────────────────────
function initTheme() {
    const btn   = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'light';
    if (saved==='dark') { document.body.classList.add('dark'); btn.innerHTML='<i class="fas fa-sun"></i>'; }
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
    const obs   = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const id = en.target.getAttribute('id');
                items.forEach(i => i.classList.toggle('active', i.getAttribute('href')===`#${id}`));
            }
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
    items.forEach(i => i.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(i.getAttribute('href'))?.scrollIntoView({behavior:'smooth'});
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
    setTimeout(() => document.querySelectorAll('.skill-progress').forEach(b => b.style.width=b.dataset.width), 200);
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
            <div class="project-tags">${p.tags.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
            ${(gh||lv)?`<div class="project-links">${gh}${lv}</div>`:''}
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
                    <div class="research-tags">${(r.tags||[]).map(t=>`<span class="research-tag">${t}</span>`).join('')}</div>
                    <div class="research-footer">
                        <span class="research-citations"><i class="fas fa-quote-right"></i> <strong class="cite-num">${r.citations}</strong> citations</span>
                        ${r.link    && r.link    !=='#'?`<a href="${r.link}"    class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> View Paper</a>`:''}
                        ${r.pdfLink && r.pdfLink !=='#'?`<a href="${r.pdfLink}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> PDF</a>`:''}
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
        const gpaHTML = edu.gpa ? `<span class="edu-meta-pill"><i class="fas fa-star"></i> GPA: ${edu.gpa}</span>` : '';
        const hlHTML  = (edu.highlights && edu.highlights.length)
            ? `<ul class="edu-highlights">${edu.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>` : '';
        return `
        <div class="education-item">
            <div class="edu-exp-inner">
                <div class="edu-icon-wrap"><i class="fas fa-graduation-cap"></i></div>
                <div class="edu-exp-body">
                    <h3 class="edu-degree">${edu.degree}</h3>
                    ${edu.specialization?`<p class="edu-spec">${edu.specialization}</p>`:''}
                    <p class="edu-inst"><i class="fas fa-university"></i> ${edu.institution}</p>
                    <div class="edu-meta-row">
                        ${edu.location?`<span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> ${edu.location}</span>`:''}
                        ${edu.period  ?`<span class="edu-meta-pill"><i class="fas fa-calendar"></i> ${edu.period}</span>`:''}
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
            ? `<ul class="exp-bullets">${exp.description.map(d=>`<li>${d}</li>`).join('')}</ul>` : '';
        return `
        <div class="experience-item">
            <div class="edu-exp-inner">
                <div class="exp-icon-wrap"><i class="fas fa-briefcase"></i></div>
                <div class="edu-exp-body">
                    <h3 class="exp-title-text">${exp.title}</h3>
                    <p class="exp-company"><i class="fas fa-building"></i> ${exp.company}</p>
                    <div class="edu-meta-row">
                        ${exp.location?`<span class="edu-meta-pill"><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>`:''}
                        ${exp.period  ?`<span class="edu-meta-pill"><i class="fas fa-calendar"></i> ${exp.period}</span>`:''}
                    </div>
                    ${descHTML}
                </div>
            </div>
        </div>`;
    }).join('');
}

// ── Contact Form ──────────────────────────────────────────────
// Saves to localStorage key "portfolioMessages" — admin reads this
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

        // Save message — admin reads 'portfolioMessages' from localStorage
        const msg = {
            id:      Date.now(),
            name,
            email,
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
            if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('section').forEach(s => {
        s.style.cssText += 'opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease';
        obs.observe(s);
    });
}