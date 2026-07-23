import { Project, Experience, Education, SkillCategory } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Mayank Kumar Gupta",
  role: "AI Engineer | Cybersecurity Enthusiast | Full Stack Developer",
  tagline: "Building AI-powered security systems, intelligent web applications, and scalable software.",
  bio: "Tech innovator skilled in AI computer vision, cybersecurity operations, embedded systems microcontrollers, and full-stack web architectures. Experienced in building real-time automated border surveillance, suspect tracking systems, micro-expression interrogation analyzers, and responsive web portals.",
  email: "notmynk.io@gmail.com",
  phone: "+91 97098 49242",
  linkedin: "https://lstwr.com/linkedin-mynkgupta",
  github: "https://github.com/notmynk-io",
  location: "Jharkhand, India",
  freelanceStatus: "Available for Security & AI Consultations",
  yearsExperience: "4+ Years",
  projectsCompleted: "20+ Projects"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "border-wildlife-surveillance",
    title: "AI Border surveillance and threat detection",
    subtitle: "Drone Feed Monitoring, Real-time Object Detection & YOLOv8 Threat Alerts",
    category: "ai",
    categoryLabel: "AI & Computer Vision",
    period: "2023 - Present",
    summary: "Drone monitoring dashboard, YOLO detections (Humans, Vehicles, Animals), Live camera feed, Threat alerts, Mini analytics.",
    description: "Built an AI-enabled automated surveillance pipeline utilizing YOLOv8 and FastAPI for drone monitoring and border perimeter security. Features real-time bounding box object classification (humans, unauthorized vehicles, wildlife) with automated telemetry dispatches.",
    highlights: [
      "Drone feed monitoring with custom YOLOv8 object detection model.",
      "FastAPI high-speed async REST backend for sub-100ms inference.",
      "Real-time threat alerts stream with severity classification.",
      "Integrated with mini telemetry analytics and perimeter relay alarms."
    ],
    techStack: ["Python", "YOLOv8", "FastAPI", "OpenCV", "ESP32", "AWS EC2", "WebSockets"],
    featured: true,
    demoType: "surveillance",
    githubUrl: "https://github.com/notmynk-io/TrackOn-Vision",
    liveUrl: "https://border-surveillance-ai.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "interrogation-analyser-system",
    title: "AI Interrogation Micro-Expression Analyzer",
    subtitle: "Voice Waveform, Emotion Graph, Stress Biomarkers & Lie Probability Gauge",
    category: "ai",
    categoryLabel: "AI & Cyber Security",
    period: "2023 - Present",
    summary: "Voice waveform, Emotion graph, Confidence score, Stress score, Micro-expression indicator, Lie probability gauge, Speech transcript panel, Timeline.",
    description: "Developed an AI video and voice analysis platform combining facial keypoint tracking with acoustic voice biomarkers to identify deception indicators, emotion variance, stress spikes, and micro-expressions during interrogation interviews.",
    highlights: [
      "Real-time voice waveform acoustic biomarker processing.",
      "Facial micro-expression indicator tracking (AU12 lip corner puller & pupil dilation).",
      "Dynamic lie probability gauge dial with emotion breakdown charts.",
      "Speech transcript panel with time-stamped forensic anomaly flags."
    ],
    techStack: ["Python", "YOLOv8", "OpenCV", "FastAPI", "React", "Whisper AI"],
    featured: true,
    demoType: "interrogation",
    githubUrl: "https://github.com/notmynk-io/TrackOn-Vision",
    liveUrl: "https://interrogation-tracker.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "criminal-tracking-system",
    title: "Criminal Tracking & Facial Re-ID City Network",
    subtitle: "Interactive City Map, CCTV Facial Recognition, Suspect Profile & Trajectory",
    category: "ai",
    categoryLabel: "AI & Cyber Operations",
    period: "2023 - Present",
    summary: "Interactive city map, Facial recognition, Suspect profile, Movement history, Known associates, Location timeline, Heatmap, Real-time tracking panel.",
    description: "Created a multi-camera city CCTV tracking dashboard that detects suspect facial keypoints across urban camera nodes, tracks movement timelines, generates heatmaps, and forecasts suspect movement trajectories.",
    highlights: [
      "Interactive city radar map with live CCTV node status.",
      "Facial recognition scanner simulation with suspect dossier cards.",
      "Movement history location timeline and known associates network graph.",
      "Toggleable density heatmap overlay and real-time tracking panel."
    ],
    techStack: ["Python", "YOLOv8", "FastAPI", "React", "Tailwind CSS", "OpenCV"],
    featured: true,
    demoType: "tracking",
    githubUrl: "https://github.com/notmynk-io/TrackOn-Vision",
    liveUrl: "https://criminal-tracking-network.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "autonomous-radar-targeting",
    title: "Autonomous Radar Detection & Targeting System",
    subtitle: "360° Ultrasonic Sonar, Servo Sweep & Servo Lock-On Fire Control",
    category: "iot",
    categoryLabel: "IoT & Embedded Systems",
    period: "2022 - 2023",
    summary: "Radar sonar system using ESP32/Arduino with continuous 180°-360° servo scanning.",
    description: "An embedded hardware project featuring a high-precision ultrasonic distance sensor mounted on a micro servo motor. It scans angular coordinates, plots distance obstacles in real time, and triggers automated targeting orientation.",
    highlights: [
      "Real-time radar coordinate plotting via serial telemetry protocol.",
      "Adjustable scan angles, sonar frequency thresholds, and target lock modes.",
      "Custom C++ firmware optimized for low memory overhead on ESP32/Arduino.",
      "Graphical control interface for manual override and target lock history."
    ],
    techStack: ["ESP32", "Arduino", "Embedded C++", "Ultrasonic Sensors", "Servo Control"],
    featured: false,
    demoType: "radar",
    githubUrl: "https://github.com/notmynk-io/Ardiuno-SmartBlindStick.git",
    liveUrl: "https://esp32-radar-lab.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "SyntaxLess",
    title: "SyntaxLess is designed as an Intent-First, AI-Native IDE. ",
    subtitle: "Need Something built ? no syntax required only intent is required.",
    category: "ai",
    categoryLabel: "AI Systems & Tooling",
    period: "2023 - Present",
    summary: "Tri-directional synchronization, Monaco editor, React Flow visual diagrams, multi-level explanations, AI assistant quick tools.",
    description: "SyntaxLess decouples abstract software intent from syntax by converting all three representations (Natural Language, Visual Node Graph, and Source Code) into a unified internal AST representation.",
    highlights: [
      "Multi-language code parser supporting C++, Python, PHP, and JavaScript.",
      "Natural language explanation generator for complex algorithms and memory allocation.",
      "Automated code conversion between procedural PHP/MySQL and modern REST frameworks."
    ],
    techStack: ["Python", "React", "FastAPI", "JavaScript", "AWS Lambda", "AST Parsers"],
    featured: false,
    demoType: "code-analyzer",
    githubUrl: "https://github.com/notmynk-io/SyntaxLess",
    liveUrl: "https://syntax-less.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "freelance-client-dashboards",
    title: "Dynamic Client Web Dashboards & E-Commerce Systems",
    subtitle: "Custom PHP & MySQL Backends, Secure Auth, and Admin Control Panels",
    category: "web",
    categoryLabel: "Web Development",
    period: "2020 - 2023",
    summary: "Built and delivered bespoke web platforms, e-commerce stores, and administrative dashboards for diverse freelance clients.",
    description: "Over 4 years of freelance web development delivering customized web applications. Built secure role-based authentication systems, dynamic data management portals, SEO-optimized business websites, and tailored PHP/MySQL database architecture.",
    highlights: [
      "Delivered 10+ custom client websites across e-commerce, portfolios, and service portals.",
      "Implemented secure password hashing, CSRF protection, and SQL injection prevention.",
      "Created intuitive dynamic administrative dashboards with real-time reporting metrics."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "phpMyAdmin", "React", "Tailwind CSS"],
    featured: false,
    demoType: "dashboard",
    githubUrl: "https://github.com/notmynk-io/Klin-Website_Builder",
    liveUrl: "https://klin-website-builder.vercel.app/",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "freelance-dev",
    role: "Freelance Web Developer & Software Engineer",
    company: "Independent Client Solutions",
    period: "Feb 2020 – Dec 2023",
    location: "Remote",
    category: "work",
    bulletPoints: [
      "Architected responsive, SEO-optimized web applications and admin portals for clients over a 4-year tenure.",
      "Engineered secure backends using PHP, MySQL, and REST APIs with role-based authorization and CSRF guards.",
      "Built dynamic management dashboards, portfolio platforms, and customized web systems.",
      "Maintained 100% client satisfaction across projects with strict adherence to timelines and performance standards."
    ],
    skillsUsed: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "phpMyAdmin", "REST APIs", "Tailwind CSS"]
  },
  {
    id: "iot-ai-developer",
    role: "AI & Cybersecurity Systems Developer",
    company: "Independent Security Innovation Projects",
    period: "2021 – Present",
    location: "Jharkhand, India",
    category: "projects",
    bulletPoints: [
      "Engineered AI-enabled border and wildlife surveillance pipelines utilizing YOLOv8 and FastAPI.",
      "Created the AI Interrogation Micro-Expression Analyzer and Criminal Tracking Facial Re-ID City Network.",
      "Designed autonomous radar sonar targeting microcontrollers and smart mobility assistive devices.",
      "Architected the Natural Code AI platform for AST parsing and code refactoring."
    ],
    skillsUsed: ["Python", "YOLOv8", "FastAPI", "OpenCV", "ESP32", "Embedded C++", "React"]
  },
  {
    id: "atal-tinkering-lab",
    role: "Technical Contributor & Mentor",
    company: "Atal Tinkering Lab",
    period: "2022 – 2023",
    location: "Khunti, Jharkhand",
    category: "community",
    bulletPoints: [
      "Provided technical guidance for young innovators building hardware and robotics prototypes.",
      "Assisted students with microcontroller programming, sensor interfacing, and electronic circuit troubleshooting.",
      "Demonstrated STEM projects at local technology exhibitions and hackathons."
    ],
    skillsUsed: ["Arduino", "Circuit Design", "Robotics", "Sensors", "Embedded C++"]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "Usha Martin University",
    degree: "Bachelor of Technology (B.Tech) in Computer Science Engineering",
    period: "2024 – 2028",
    details: [
      "Specializing in Computer Vision, Cyber Operations, Software Systems, and Embedded Systems",
      "Active leader in AI, IoT, and Full-Stack Web technical initiatives"
    ]
  },
  {
    institution: "S.S. D.A.V Public School, Khunti",
    degree: "High School / Senior Secondary Education",
    period: "2024 Completion",
    details: [
      "Rigorous study in Mathematics, Physics, Chemistry, and Computer Science"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI, Vision & Cybersecurity",
    iconName: "BrainCircuit",
    skills: [
      { name: "Python", level: 92, tag: "Primary Language" },
      { name: "YOLOv8 Vision Processing", level: 88, tag: "AI Object Detection" },
      { name: "FastAPI", level: 90, tag: "Async Backend" },
      { name: "OpenCV", level: 85, tag: "Image Analytics" },
      { name: "C & C++", level: 84, tag: "Systems Language" },
      { name: "Linux & Terminal Hardening", level: 88, tag: "Cyber Operations" }
    ]
  },
  {
    title: "IoT & Microcontroller Engineering",
    iconName: "Cpu",
    skills: [
      { name: "ESP32 & Wi-Fi/BT Modules", level: 92, tag: "IoT Hardware" },
      { name: "Arduino & Microcontrollers", level: 94, tag: "Hardware Core" },
      { name: "Embedded C / C++", level: 88, tag: "Firmware" },
      { name: "Sensors (Ultrasonic, PIR, Gyro)", level: 92, tag: "Hardware Interfacing" },
      { name: "Circuit Design & Telemetry", level: 85, tag: "Electronics" }
    ]
  },
  {
    title: "Full-Stack Web Development",
    iconName: "Globe",
    skills: [
      { name: "JavaScript & TypeScript", level: 90, tag: "Frontend & Logic" },
      { name: "PHP", level: 88, tag: "Backend (4 Yrs)" },
      { name: "MySQL & phpMyAdmin", level: 86, tag: "Database" },
      { name: "React & Modern UI", level: 85, tag: "Frontend Framework" },
      { name: "Tailwind CSS", level: 92, tag: "Styling" },
      { name: "REST APIs & Vercel Functions", level: 90, tag: "Architecture" }
    ]
  }
];
