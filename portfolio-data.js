// ═══════════════════════════════════════════════════════════════
//  portfolio-data.js  
// ═══════════════════════════════════════════════════════════════

const PORTFOLIO = {

  // ── PROFILE ────────────────────────────────────────────────
  profile: {
    name:           'Surya Prasad Yadav',
    title:          'Data Science Engineer',
    tagline:        'Building intelligent systems from raw data',
    email:          'surya3ydv@gmail.com',
    phone:          '(+977) 9848703545',
    location:       'Kathmandu, Nepal',
    github:         '#',
    linkedin:       '#',
    scholar:        '#',
    resume:         '#',               
    availableForHire: true,
    profilePhoto:   '',              
  },

  // ── STATS ───────────────────────────────────────────────────
  stats: [
    { icon: 'fa-code',        color: 'blue',   value: '5',    label: 'Projects Completed' },
    { icon: 'fa-code-branch', color: 'purple', value: '10K+', label: 'Lines of Code'       },
    { icon: 'fa-award',       color: 'orange', value: '15+',  label: 'Certifications'      },
    { icon: 'fa-users',       color: 'green',  value: '8+',   label: 'Collaborations'      },
  ],

  // ── ABOUT ───────────────────────────────────────────────────
  about: `I'm a passionate Data Scientist and Machine Learning Engineer with a strong foundation
in computer science and a specialization in extracting meaningful insights from complex datasets.
My journey combines rigorous academic training with hands-on experience building production-ready
ML systems — turning raw data into intelligent, impactful products.`,

  aboutTags: ['Problem Solver', 'Team Player', 'Continuous Learner', 'Open Source Contributor'],

  // ── SKILLS ─────────────────────────────────────────────────
  skills: [
    {
      icon: 'fa-brain', title: 'Machine Learning',
      skills: [
        { name: 'TensorFlow',   level: 90 },
        { name: 'PyTorch',      level: 85 },
        { name: 'Scikit-learn', level: 95 },
        { name: 'Keras',        level: 80 },
      ]
    },
    {
      icon: 'fa-code', title: 'Programming',
      skills: [
        { name: 'Python',      level: 95 },
        { name: 'SQL',         level: 90 },
        { name: 'R',           level: 80 },
        { name: 'JavaScript',  level: 75 },
      ]
    },
    {
      icon: 'fa-database', title: 'Data Engineering',
      skills: [
        { name: 'Apache Spark', level: 85 },
        { name: 'PostgreSQL',   level: 88 },
        { name: 'MongoDB',      level: 80 },
        { name: 'Redis',        level: 75 },
      ]
    },
    {
      icon: 'fa-chart-bar', title: 'Data Visualization',
      skills: [
        { name: 'Tableau',  level: 85 },
        { name: 'Plotly',   level: 90 },
        { name: 'D3.js',    level: 70 },
        { name: 'Power BI', level: 80 },
      ]
    },
    {
      icon: 'fa-chart-line', title: 'Analytics',
      skills: [
        { name: 'Statistical Analysis', level: 90 },
        { name: 'A/B Testing',          level: 85 },
        { name: 'Predictive Modeling',  level: 88 },
        { name: 'Time Series',          level: 82 },
      ]
    },
    {
      icon: 'fa-code-branch', title: 'Tools & Platforms',
      skills: [
        { name: 'Git',      level: 90 },
        { name: 'Docker',   level: 85 },
        { name: 'AWS',      level: 80 },
        { name: 'Azure ML', level: 75 },
      ]
    },
  ],

  // ── PROJECTS ────────────────────────────────────────────────
  projects: [
    {
      title:       'Customer Churn Prediction',
      description: 'ML model predicting customer churn with 94% accuracy using XGBoost, deployed as a REST API via FastAPI on AWS EC2 with Docker.',
      tags:        ['Python', 'XGBoost', 'AWS', 'Docker', 'FastAPI'],
      github:      'https://github.com/yourusername/churn-prediction',
      live:        'https://churn-demo.example.com',
      highlight:   '94% Accuracy',
    },
    {
      title:       'Real-time Sentiment Dashboard',
      description: 'Streaming pipeline for social media sentiment analysis processing 10K+ tweets per minute with live Kafka ingestion and Spark processing.',
      tags:        ['Apache Kafka', 'Spark', 'NLP', 'MongoDB'],
      github:      'https://github.com/yourusername/sentiment-dashboard',
      live:        'https://sentiment-demo.example.com',
      highlight:   '10K tweets/min',
    },
    {
      title:       'Recommendation Engine',
      description: 'Collaborative filtering recommendation system increasing user engagement by 35% across the platform with real-time serving via Redis.',
      tags:        ['TensorFlow', 'Python', 'Redis', 'PostgreSQL'],
      github:      'https://github.com/yourusername/recommendation-engine',
      live:        '',
      highlight:   '+35% Engagement',
    },
    {
      title:       'Computer Vision Object Detection',
      description: 'Fine-tuned YOLOv8 for real-time object detection on edge devices with sub-100ms latency and OpenCV preprocessing pipeline.',
      tags:        ['PyTorch', 'YOLO', 'OpenCV', 'Edge AI'],
      github:      'https://github.com/yourusername/object-detection',
      live:        'https://cv-demo.example.com',
      highlight:   'Real-time',
    },
    {
      title:       'Sales Forecasting System',
      description: 'Time series forecasting using LSTM and Prophet with automated retraining pipelines on Airflow and MLflow experiment tracking.',
      tags:        ['LSTM', 'Prophet', 'MLflow', 'Airflow'],
      github:      'https://github.com/yourusername/sales-forecasting',
      live:        '',
      highlight:   'MAPE < 5%',
    },
    {
      title:       'Data Quality Monitor',
      description: 'Automated data quality platform with Great Expectations, anomaly detection, Grafana dashboards and real-time Slack alerting.',
      tags:        ['Python', 'Great Expectations', 'Grafana', 'PostgreSQL'],
      github:      'https://github.com/yourusername/data-quality',
      live:        '',
      highlight:   '99.9% Uptime',
    },
  ],

  // ── RESEARCH PUBLICATIONS ────────────────────────────────────
  research: [
    {
      title:     'Novel Approaches to Time Series Anomaly Detection using Deep Learning',
      authors:   'Surya Prasad Yadav, A. Sharma, R. Thapa',
      venue:     'IEEE International Conference on Data Science',
      year:      '2024',
      abstract:  'A novel deep learning architecture for detecting anomalies in multivariate time series data, outperforming existing baselines by 12% on six public benchmarks.',
      citations: 15,
      tags:      ['Deep Learning', 'Anomaly Detection', 'Time Series'],
      link:      'https://doi.org/example/paper1',
      pdfLink:   'https://arxiv.org/example/paper1.pdf',
    },
    {
      title:     'Efficient Feature Engineering for Large-Scale Machine Learning',
      authors:   'Surya Prasad Yadav, M. Koirala',
      venue:     'ACM International Conference on Machine Learning',
      year:      '2024',
      abstract:  'Automated feature engineering methods reducing computational overhead while maintaining accuracy across diverse large-scale datasets.',
      citations: 8,
      tags:      ['Feature Engineering', 'Scalability', 'AutoML'],
      link:      'https://doi.org/example/paper2',
      pdfLink:   'https://arxiv.org/example/paper2.pdf',
    },
    {
      title:     'Transfer Learning for Medical Image Classification with Limited Data',
      authors:   'A. Sharma, Surya Prasad Yadav, R. Thapa',
      venue:     'Journal of Medical AI Research',
      year:      '2023',
      abstract:  'Comprehensive study on transfer learning for medical image classification achieving state-of-the-art results with as few as 200 labeled examples.',
      citations: 23,
      tags:      ['Transfer Learning', 'Medical AI', 'Computer Vision'],
      link:      'https://doi.org/example/paper3',
      pdfLink:   'https://arxiv.org/example/paper3.pdf',
    },
  ],

  // ── ACHIEVEMENTS ─────────────────────────────────────────────
  achievements: [
    { icon: 'fa-trophy',   title: 'First Place — Data Science Hackathon 2025', description: 'Won first place among 200+ teams for building an AI-powered healthcare diagnosis system.', date: 'March 2025',    category: 'Competition'   },
    { icon: 'fa-award',    title: 'AWS Certified Machine Learning Specialty',    description: 'Professional certification validating expertise in building and deploying ML models on AWS.', date: 'January 2025',  category: 'Certification' },
    { icon: 'fa-medal',    title: "Dean's List — All Semesters",                description: 'Consistently maintained GPA above 3.8/4.0 throughout the undergraduate program.',              date: '2021–2025',     category: 'Academic'      },
    { icon: 'fa-star',     title: 'Research Publication — IEEE Conference',     description: 'Published peer-reviewed paper on anomaly detection accepted at IEEE Data Science conference.', date: 'November 2024', category: 'Research'      },
    { icon: 'fa-bullseye', title: 'Kaggle Expert',                              description: 'Achieved Expert tier on Kaggle with multiple top 10% finishes and 3 gold medals.',             date: 'Ongoing',       category: 'Competition'   },
    { icon: 'fa-bolt',     title: 'Google Data Analytics Certificate',          description: 'Comprehensive certification covering data analysis, visualization, and statistical methods.',   date: 'August 2024',   category: 'Certification' },
  ],

  // ── EDUCATION ────────────────────────────────────────────────
  // Leave gpa as '' to hide it. Leave highlights as [] to show no bullets.
  education: [
    {
      degree:         'B.Sc. Computer Science & Data Science',
      specialization: 'Data Science Specialization',
      institution:    'Tribhuvan University',
      location:       'Kathmandu, Nepal',
      period:         '2021 – 2025',
      gpa:            '3.9 / 4.0',
      highlights: [
        'Concentration in Machine Learning and Data Analytics',
        'Coursework: Deep Learning, Statistical Methods, Big Data Analytics',
        'Senior Thesis: Advanced Anomaly Detection in Time Series Data',
      ],
    },
    {
      degree:         '+2 Science (PCM)',
      specialization: '',
      institution:    "St. Xavier's College",
      location:       'Kathmandu, Nepal',
      period:         '2019 – 2021',
      gpa:            '',
      highlights: [],
    },
  ],

  // ── EXPERIENCE ───────────────────────────────────────────────
  // Leave description as [] to show no bullets.
  experience: [
    {
      title:       'Data Science Engineer',
      company:     'CloudMind Analytics',
      location:    'Kathmandu, Nepal',
      period:      'Jan 2024 – Present',
      description: [
        'Developed predictive models improving customer retention by 28%',
        'Built automated ETL pipelines processing 10M+ records daily',
        'Implemented A/B testing framework validating model improvements',
        'Deployed 6 production ML models with drift monitoring on AWS',
      ],
    },
    {
      title:       'Machine Learning Research Assistant',
      company:     'TU Research Lab',
      location:    'Kathmandu, Nepal',
      period:      'Jan 2023 – May 2024',
      description: [
        'Researched deep learning architectures for low-resource NLP tasks',
        'Published 2 papers in peer-reviewed international conferences',
        'Mentored 5 undergraduate students in ML research projects',
      ],
    },
    {
      title:       'Data Analytics Intern',
      company:     'Fusemachines Nepal',
      location:    'Kathmandu, Nepal',
      period:      'Jun 2022 – Dec 2022',
      description: [
        'Analyzed large datasets to derive actionable business insights',
        'Built interactive dashboards for stakeholder reporting',
        'Improved data pipeline efficiency by 40% through optimization',
      ],
    },
  ],

  // ── EMAILJS CONFIG (for contact form messages) ───────────────
  // FREE setup at https://www.emailjs.com — takes 5 minutes:
  // 1. Create account at emailjs.com
  // 2. Add Email Service (Gmail / Outlook etc.)
  // 3. Create Email Template — use variables: {{from_name}}, {{from_email}}, {{message}}
  // 4. Copy your Service ID, Template ID, and Public Key below
  emailjs: {
    serviceId:  'service_2rsiuzd',
    templateId: 'template_lzxvxjo',
    publicKey:  'W0XBkOMINniq2HdBG',
  },
};
