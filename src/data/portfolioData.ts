import { Project, Experience, Education, SkillCategory } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Mayank Kumar Gupta",
  role: "Full-Stack Web Developer, IoT & Embedded Engineer",
  tagline: "Bridging web technologies, embedded microcontrollers, and AI computer vision.",
  bio: "I am a tech enthusiast with experience in web development, IoT, and embedded systems, skilled in building both software and hardware-based solutions. I have worked as a freelance web developer for nearly four years, creating responsive and functional websites using HTML, CSS, JavaScript, PHP, and MySQL. Alongside this, I enjoy developing IoT and AI-driven projects such as surveillance systems, sensor-based automation, and microcontroller applications. Currently pursuing B.Tech in Computer Science Engineering, I am continuously expanding my skills in programming, electronics, and real-world problem solving.",
  email: "notmynk.io@gmail.com",
  phone: "+91 97098 49242",
  linkedin: "https://lstwr.com/linkedin-mynkgupta",
  github: "https://github.com",
  location: "Jharkhand, India",
  freelanceStatus: "Available for Projects & Collaboration",
  yearsExperience: "4+ Years",
  projectsCompleted: "15+ Projects"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "border-wildlife-surveillance",
    title: "AI Border & Wildlife Surveillance System",
    subtitle: "Real-time Object Detection, Intrusion Alerting & YOLOv8 Vision Processing",
    category: "ai",
    categoryLabel: "AI & Computer Vision",
    period: "2023 - Present",
    summary: "Built an AI-enabled automated surveillance pipeline utilizing YOLOv8 and FastAPI for border perimeter monitoring and wildlife tracking.",
    description: "Designed a comprehensive computer vision system that monitors video feeds from border zones and wildlife reserves. The system detects intruders, unauthorized vehicles, and wild animals in real-time using custom-trained YOLOv8 models, triggering immediate telemetry alerts via FastAPI webhooks.",
    highlights: [
      "Custom YOLOv8 object detection model trained on thermal and daytime feeds.",
      "FastAPI high-speed async REST backend for sub-100ms inference processing.",
      "Automated alert dispatch with bounding-box metadata and severity classification.",
      "Integrated with hardware relays for perimeter warning lights and acoustic alarms."
    ],
    techStack: ["Python", "YOLOv8", "FastAPI", "OpenCV", "ESP32", "AWS EC2", "WebSockets"],
    featured: true,
    demoType: "surveillance",
    githubUrl: "https://github.com/notmynk/border-wildlife-surveillance-yolov8",
    liveUrl: "https://border-surveillance-ai.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "autonomous-radar-targeting",
    title: "Autonomous Radar Detection & Targeting System",
    subtitle: "360° Ultrasonic Sonar, Servo Sweep & Servo Lock-On Fire Control",
    category: "iot",
    categoryLabel: "IoT & Embedded Systems",
    period: "2022 - 2023",
    summary: "Created a radar sonar system using ESP32/Arduino with continuous 180°-360° servo scanning and automated target lock-on.",
    description: "An embedded hardware project featuring a high-precision ultrasonic distance sensor mounted on a micro servo motor. It scans angular coordinates, plots distance obstacles in real time, and triggers automated laser/targeting orientation when an obstacle breaks the threshold.",
    highlights: [
      "Real-time radar coordinate plotting via serial telemetry protocol.",
      "Adjustable scan angles, sonar frequency thresholds, and target lock modes.",
      "Custom C++ firmware optimized for low memory overhead on ESP32/Arduino.",
      "Graphical control interface for manual override and target lock history."
    ],
    techStack: ["ESP32", "Arduino", "Embedded C++", "Ultrasonic Sensors", "Servo Control", "Python Processing"],
    featured: true,
    demoType: "radar",
    githubUrl: "https://github.com/notmynk/esp32-autonomous-radar-sonar",
    liveUrl: "https://esp32-radar-lab.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "natural-code-platform",
    title: "Natural Code AI Platform",
    subtitle: "AI-Powered Code Understanding, Natural Language Refactoring & Syntax Converter",
    category: "ai",
    categoryLabel: "AI Systems & Tooling",
    period: "2023 - Present",
    summary: "Developing an AI tool that assists developers in analyzing, explaining, and refactoring source code in natural language.",
    description: "An AI-powered development environment that accepts complex source code snippets across multiple languages (PHP, C++, Python, JavaScript) and generates instant explanations, bug detection, and automated refactoring suggestions.",
    highlights: [
      "Multi-language code parser supporting C++, Python, PHP, and JavaScript.",
      "Natural language explanation generator for complex algorithms and memory allocation.",
      "Automated code conversion between procedural PHP/MySQL and modern REST frameworks.",
      "Interactive code sandbox with syntax highlight and error diagnostics."
    ],
    techStack: ["Python", "React", "FastAPI", "JavaScript", "AWS Lambda", "AST Parsers"],
    featured: true,
    demoType: "code-analyzer",
    githubUrl: "https://github.com/notmynk/natural-code-ai-explainer",
    liveUrl: "https://natural-code-ai.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "smart-blind-stick",
    title: "Smart Blind Stick for Visually Impaired",
    subtitle: "Ultrasonic Obstacle Detection, Haptic Feedback & Emergency SOS",
    category: "iot",
    categoryLabel: "IoT & Assistive Tech",
    period: "2022",
    summary: "Engineered an assistive mobility stick with multi-directional ultrasonic sensing, haptic vibration alerts, and emergency alert signaling.",
    description: "A hardware prototype created to empower visually impaired individuals. It uses multi-zone ultrasonic sensors to detect ground hazards and head-level obstacles, translating distance readings into variable haptic vibration frequency.",
    highlights: [
      "Multi-sensor array detecting obstacles from 10cm to 250cm.",
      "Variable haptic motor pulse frequency depending on obstacle proximity.",
      "Low-power ESP32 sleep modes for extended battery operational lifespan.",
      "Integrated emergency panic button triggering SMS/GPS alert dispatch."
    ],
    techStack: ["Arduino", "Embedded C/C++", "Ultrasonic Sensors", "Haptic Motors", "GPS/GSM Module"],
    featured: true,
    demoType: "blind-stick",
    githubUrl: "https://github.com/notmynk/smart-blind-stick-assistive-tech",
    liveUrl: "https://smart-blind-stick-prototype.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "interrogation-analyser-suspect-tracking",
    title: "Interrogation Analyser & Suspect Tracking System",
    subtitle: "Computer Vision Micro-Expression Analysis & Suspect Timeline Mapping",
    category: "ai",
    categoryLabel: "AI & Computer Vision",
    period: "2023",
    summary: "AI system designed to analyze facial expression shifts during video interviews and track suspect movements across multi-camera logs.",
    description: "Developed an advanced video processing pipeline that combines facial landmark keypoint analysis with YOLOv8 re-identification algorithms to map suspect movements and flag micro-expression shifts during recorded interview logs.",
    highlights: [
      "Facial keypoint tracking with emotion variance classification.",
      "Cross-camera suspect re-identification with spatio-temporal tracking.",
      "Interactive timeline view for investigative video breakdown.",
      "Exportable forensic analytics report generator."
    ],
    techStack: ["Python", "YOLOv8", "OpenCV", "FastAPI", "React", "AWS S3"],
    featured: false,
    demoType: "surveillance",
    githubUrl: "https://github.com/notmynk/interrogation-analyser-tracking",
    liveUrl: "https://interrogation-tracker.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
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
      "Created intuitive dynamic administrative dashboards with real-time reporting metrics.",
      "Optimized database schemas in MySQL/phpMyAdmin for lightning-fast queries."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "phpMyAdmin", "React", "Tailwind CSS"],
    featured: true,
    demoType: "dashboard",
    githubUrl: "https://github.com/notmynk/freelance-php-mysql-dashboards",
    liveUrl: "https://client-dashboard-demo.app",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "freelance-dev",
    role: "Freelance Web Developer",
    company: "Independent Client Solutions",
    period: "Feb 2020 – Dec 2023",
    location: "Remote",
    category: "work",
    bulletPoints: [
      "Developed and delivered responsive, SEO-friendly websites for clients across multiple industries.",
      "Architected both front-end user interfaces and back-end database systems using HTML, CSS, JavaScript, PHP, and MySQL.",
      "Built secure login systems, dynamic user dashboards, portfolio portals, and custom web applications.",
      "Adapted quickly to diverse client frameworks and requirements while maintaining strict confidentiality and quality delivery."
    ],
    skillsUsed: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "phpMyAdmin", "REST APIs", "UI/UX"]
  },
  {
    id: "iot-ai-developer",
    role: "IoT, Embedded Systems & AI Developer",
    company: "Independent & Innovation Projects",
    period: "2017 – Present",
    location: "Self-Driven",
    category: "projects",
    bulletPoints: [
      "Designed and prototyped IoT and embedded systems using ESP32, Arduino, sensors, and Python integration.",
      "Engineered AI-enabled solutions including Border & Wildlife Surveillance, Interrogation Analyzer, and Suspect Tracking System with YOLOv8 + FastAPI.",
      "Developed an Autonomous Radar Detection & Targeting System and Smart Blind Stick with ultrasonic/haptic feedback.",
      "Architecting the Natural Code Platform — an AI-powered code understanding, explanation, and editing tool."
    ],
    skillsUsed: ["ESP32", "Arduino", "Embedded C/C++", "Python", "YOLOv8", "FastAPI", "Sensors", "Circuit Design"]
  },
  {
    id: "atal-tinkering-lab",
    role: "Technical Contributor & Mentor",
    company: "Atal Tinkering Lab",
    period: "Community / Academic",
    location: "Khunti, Jharkhand",
    category: "community",
    bulletPoints: [
      "Provided technical guidance and mentorship for young innovators building hardware and robotics prototypes.",
      "Assisted students with microcontroller programming, sensor interfacing, and electronic circuit troubleshooting.",
      "Helped design hands-on STEM project demonstrations for local science and technology exhibitions."
    ],
    skillsUsed: ["Arduino", "Circuit Design", "Robotics", "Sensors", "Embedded C++", "Mentorship"]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "Usha Martin University",
    degree: "Bachelor of Technology (B.Tech) in Computer Science Engineering",
    period: "2024 – 2028",
    details: [
      "Focus on Computer Engineering, Algorithms, Software Systems, and Embedded Hardware",
      "Active developer in AI, IoT, and Web Development student technical initiatives"
    ]
  },
  {
    institution: "S.S. D.A.V Public School, Khunti",
    degree: "High School / Senior Secondary Education",
    period: "2024 Completion",
    details: [
      "Strong foundation in Mathematics, Physics, Chemistry, and Computer Science"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Web & Full-Stack Development",
    iconName: "Globe",
    skills: [
      { name: "HTML5 / CSS3", level: 95, tag: "Frontend" },
      { name: "JavaScript (ES6+)", level: 90, tag: "Frontend" },
      { name: "PHP", level: 88, tag: "Backend" },
      { name: "MySQL & phpMyAdmin", level: 85, tag: "Database" },
      { name: "React & Modern UI", level: 82, tag: "Frontend" },
      { name: "RESTful APIs", level: 88, tag: "Architecture" },
      { name: "Tailwind CSS", level: 90, tag: "Styling" }
    ]
  },
  {
    title: "IoT & Embedded Hardware",
    iconName: "Cpu",
    skills: [
      { name: "Arduino & Microcontrollers", level: 92, tag: "Hardware" },
      { name: "ESP32 / ESP8266 Wi-Fi/BT", level: 90, tag: "IoT Core" },
      { name: "Sensor Integration (Ultrasonic, PIR, Gyro)", level: 92, tag: "Sensors" },
      { name: "Embedded C / C++", level: 85, tag: "Firmware" },
      { name: "Circuit Design & Wiring", level: 82, tag: "Electronics" },
      { name: "Serial & Telemetry Protocols", level: 88, tag: "Communication" }
    ]
  },
  {
    title: "AI, Vision & Systems Languages",
    iconName: "BrainCircuit",
    skills: [
      { name: "Python", level: 90, tag: "Language" },
      { name: "YOLOv8 Computer Vision", level: 85, tag: "AI Models" },
      { name: "FastAPI", level: 88, tag: "Backend Framework" },
      { name: "C & C++", level: 82, tag: "Core Languages" },
      { name: "Java", level: 78, tag: "Core Language" },
      { name: "AI Code Parsing & Natural Tools", level: 84, tag: "AI Tooling" }
    ]
  }
];
