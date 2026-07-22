// Vanilla JavaScript Portfolio Logic & Simulators

// 1. Projects Data
const PROJECTS = [
  {
    id: "border-wildlife-surveillance",
    title: "Border Wildlife & Perimeter Surveillance",
    category: "ai",
    categoryLabel: "AI Vision & IoT",
    period: "2024",
    summary: "Real-time edge surveillance engine detecting wild animal intrusions and unauthorized human activity along border perimeters.",
    description: "Built using YOLOv8 computer vision models trained on custom infrared/thermal thermal footage datasets, integrated with FastAPI WebSocket streams and ESP32 hardware alert relays.",
    techStack: ["Python", "YOLOv8", "FastAPI", "OpenCV", "ESP32", "AWS EC2"],
    githubUrl: "https://github.com/notmynk/border-wildlife-surveillance-yolov8",
    liveUrl: "https://border-surveillance-ai.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "autonomous-radar-targeting",
    title: "Autonomous Radar & Sonar Target Tracking",
    category: "iot",
    categoryLabel: "IoT & Hardware",
    period: "2024",
    summary: "ESP32-powered micro-radar system utilizing ultrasonic sensors mounted on a 180° servo motor for spatial obstacle scanning.",
    description: "Real-time sweep canvas visualizes target angle, distance vectors, and collision velocity. Features automated acoustic alarm triggers.",
    techStack: ["ESP32", "Arduino", "Embedded C++", "Ultrasonic Sensors", "Servo Control"],
    githubUrl: "https://github.com/notmynk/esp32-autonomous-radar-sonar",
    liveUrl: "https://esp32-radar-lab.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "natural-code-platform",
    title: "Natural Code & AI Code Explainer",
    category: "ai",
    categoryLabel: "AI & Full-Stack",
    period: "2024",
    summary: "AI-driven developer platform converting complex Python, C++, and PHP code into natural human-language explanations.",
    description: "Built with AST parsers, FastAPI, and LLM APIs to provide automated refactoring suggestions, security audits, and execution step breakdowns.",
    techStack: ["Python", "FastAPI", "JavaScript", "React", "AWS Lambda"],
    githubUrl: "https://github.com/notmynk/natural-code-ai-explainer",
    liveUrl: "https://natural-code-ai.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "smart-blind-stick",
    title: "Smart Blind Stick Assistive Tech",
    category: "iot",
    categoryLabel: "Embedded Hardware",
    period: "2023",
    summary: "Assistive smart cane for visually impaired individuals featuring ultrasonic distance detection and haptic feedback.",
    description: "Integrates dual HC-SR04 ultrasonic sensors, haptic vibration motors, buzzer alerts, and GSM/GPS modules for emergency location broadcasting.",
    techStack: ["Arduino", "Embedded C++", "Ultrasonic Sensors", "Haptic Motors", "GPS/GSM"],
    githubUrl: "https://github.com/notmynk/smart-blind-stick-assistive-tech",
    liveUrl: "https://smart-blind-stick-prototype.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "interrogation-analyser",
    title: "Interrogation Video Analyser & Suspect Tracker",
    category: "ai",
    categoryLabel: "AI Computer Vision",
    period: "2023",
    summary: "Forensic computer vision system for body language tracking and multi-subject face identification in investigation videos.",
    description: "Leverages YOLOv8 and OpenCV bounding-box analytics to log timeline markers and detect behavioral anomalies for investigative reporting.",
    techStack: ["Python", "YOLOv8", "OpenCV", "FastAPI", "React", "AWS S3"],
    githubUrl: "https://github.com/notmynk/interrogation-analyser-tracking",
    liveUrl: "https://interrogation-tracker.demo.app",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "freelance-client-dashboards",
    title: "Client Web Dashboards & Custom Web Apps",
    category: "web",
    categoryLabel: "Full-Stack Web",
    period: "2020 - Present",
    summary: "Comprehensive suite of 10+ custom web platforms, client portals, and administrative dashboards engineered over 4+ years of freelancing.",
    description: "Crafted robust relational database schemas in MySQL/phpMyAdmin, secure session authentication, and responsive frontend UIs using HTML5, CSS3, JavaScript, and PHP.",
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "phpMyAdmin", "Tailwind CSS"],
    githubUrl: "https://github.com/notmynk/freelance-php-mysql-dashboards",
    liveUrl: "https://client-dashboard-demo.app",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

// 2. Skills Data
const SKILLS = [
  {
    category: "Programming Languages",
    icon: "code",
    skills: ["Python 3", "C / C++", "JavaScript (ES6+)", "PHP", "HTML5 & CSS3", "SQL"]
  },
  {
    category: "Web & AI Frameworks",
    icon: "layers",
    skills: ["React.js", "FastAPI", "Flask", "YOLOv8", "OpenCV", "Tailwind CSS", "Express.js"]
  },
  {
    category: "IoT & Microcontrollers",
    icon: "cpu",
    skills: ["ESP32", "Arduino Uno/Nano", "HC-SR04 Ultrasonic", "Servo Motors", "WebSockets", "UART / Serial"]
  },
  {
    category: "Cloud, DB & Tooling",
    icon: "database",
    skills: ["MySQL / phpMyAdmin", "AWS (EC2/S3)", "Git & GitHub", "Docker", "Linux Shell", "Postman"]
  }
];

// Initialize DOM
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initBackgroundCanvas();
  renderProjects('all');
  renderSkills();
  initLabSimulator();
  initContactForm();
  initModals();
});

// Render Projects
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="bg-slate-900 rounded-2xl border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 group">
      <div class="relative h-44 w-full bg-slate-950 overflow-hidden cursor-pointer" onclick="openProjectModal('${p.id}')">
        <img src="${p.imageUrl}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
        <div class="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 text-cyan-300 border border-slate-800">${p.categoryLabel}</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-950/90 border border-slate-800">${p.period}</span>
        </div>
      </div>

      <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div class="space-y-1.5">
          <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer" onclick="openProjectModal('${p.id}')">${p.title}</h3>
          <p class="text-xs text-slate-400 line-clamp-2">${p.summary}</p>
        </div>

        <div class="space-y-3 pt-2 border-t border-slate-800/80">
          <div class="flex flex-wrap gap-1 font-mono text-[10px]">
            ${p.techStack.map(t => `<span class="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">${t}</span>`).join('')}
          </div>

          <div class="flex items-center justify-between pt-1">
            <div class="flex gap-2 text-xs font-mono">
              <a href="${p.githubUrl}" target="_blank" class="text-slate-400 hover:text-white flex items-center gap-1"><i data-lucide="github" class="w-3.5 h-3.5"></i> Code</a>
              <a href="${p.liveUrl}" target="_blank" class="text-slate-400 hover:text-cyan-300 flex items-center gap-1"><i data-lucide="external-link" class="w-3.5 h-3.5"></i> Live</a>
            </div>
            <button onclick="openProjectModal('${p.id}')" class="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              Simulator &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();

  // Setup filter button active state
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-900', 'text-slate-300');
      });
      btn.classList.remove('bg-slate-900', 'text-slate-300');
      btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
}

// Render Skills
function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  container.innerHTML = SKILLS.map(s => `
    <div class="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
      <div class="flex items-center gap-2.5 text-cyan-400 font-bold text-sm">
        <i data-lucide="${s.icon}" class="w-4 h-4"></i>
        <span>${s.category}</span>
      </div>
      <div class="flex flex-wrap gap-1.5 font-mono text-xs pt-1">
        ${s.skills.map(sk => `<span class="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">${sk}</span>`).join('')}
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Lab Simulator Radar Sweep
function initLabSimulator() {
  const canvas = document.getElementById('lab-radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const angleSlider = document.getElementById('lab-angle-slider');
  const distSlider = document.getElementById('lab-dist-slider');
  const angleVal = document.getElementById('lab-angle-val');
  const distVal = document.getElementById('lab-dist-val');
  const statusText = document.getElementById('lab-status-text');

  let sweepAngle = 0;
  let sweepDir = 1;

  function drawRadar() {
    const angle = parseInt(angleSlider ? angleSlider.value : 90);
    const distance = parseInt(distSlider ? distSlider.value : 45);

    if (angleVal) angleVal.textContent = `${angle}°`;
    if (distVal) distVal.textContent = `${distance} cm`;
    if (statusText) statusText.textContent = `Target Distance: ${distance} cm | Angle: ${angle}° | Status: ACTIVE SCANNING`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height - 20;
    const maxR = canvas.height - 40;

    // Draw Radar Semi-Circles
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let r = 0.25; r <= 1.0; r += 0.25) {
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * r, Math.PI, 0, false);
      ctx.stroke();
    }

    // Radial Rays
    for (let a = 0; a <= 180; a += 30) {
      const rad = (a * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(Math.PI - rad) * maxR, cy - Math.sin(Math.PI - rad) * maxR);
      ctx.stroke();
    }

    // Sweep Line
    sweepAngle += 1.5 * sweepDir;
    if (sweepAngle >= 180 || sweepAngle <= 0) sweepDir *= -1;

    const sweepRad = (sweepAngle * Math.PI) / 180;
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(Math.PI - sweepRad) * maxR, cy - Math.sin(Math.PI - sweepRad) * maxR);
    ctx.stroke();

    // Target Blip
    const targetRad = (angle * Math.PI) / 180;
    const targetDistR = (distance / 200) * maxR;
    const tx = cx + Math.cos(Math.PI - targetRad) * targetDistR;
    const ty = cy - Math.sin(Math.PI - targetRad) * targetDistR;

    ctx.fillStyle = distance < 30 ? '#ef4444' : '#06b6d4';
    ctx.beginPath();
    ctx.arc(tx, ty, 6, 0, Math.PI * 2);
    ctx.fill();

    requestAnimationFrame(drawRadar);
  }

  if (angleSlider) angleSlider.addEventListener('input', drawRadar);
  if (distSlider) distSlider.addEventListener('input', drawRadar);

  drawRadar();
}

// Background Particle Canvas
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 1.8 + 0.5
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#06b6d4';

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Contact Form Handler with Python Backend
function initContactForm() {
  const form = document.getElementById('contact-form');
  const responseDiv = document.getElementById('form-response');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('notmynk.exe@gmail.com');
      alert('Email notmynk.exe@gmail.com copied to clipboard!');
    });
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const category = document.getElementById('form-category').value;
    const message = document.getElementById('form-message').value;

    const submitBtn = document.getElementById('form-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Dispatching to Python Server...';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, projectType: category, message })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        responseDiv.className = 'p-3 rounded-xl text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono';
        responseDiv.textContent = `✓ ${data.message || 'Message sent successfully!'}`;
        responseDiv.classList.remove('hidden');

        if (window.confetti) {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }

        form.reset();
      } else {
        throw new Error(data.error || 'Failed to dispatch message');
      }
    } catch (err) {
      responseDiv.className = 'p-3 rounded-xl text-xs bg-red-500/10 border border-red-500/30 text-red-400 font-mono';
      responseDiv.textContent = `⚠️ Error: ${err.message}`;
      responseDiv.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="send" class="w-4 h-4"></i> Dispatch Message to Mayank';
      lucide.createIcons();
    }
  });
}

// Modals Setup
function initModals() {
  const resumeBtn = document.getElementById('open-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const closeResumeBtn = document.getElementById('close-resume-btn');

  if (resumeBtn && resumeModal) {
    resumeBtn.addEventListener('click', () => resumeModal.classList.remove('hidden', 'flex') || resumeModal.classList.add('flex'));
  }
  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => resumeModal.classList.add('hidden'));
  }

  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  if (closeModalBtn && projectModal) {
    closeModalBtn.addEventListener('click', () => projectModal.classList.add('hidden'));
  }
}

function openProjectModal(id) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">${project.categoryLabel}</span>
        <span class="text-slate-400">${project.period}</span>
      </div>

      <h3 class="text-xl font-bold text-white">${project.title}</h3>
      <p class="text-sm text-slate-300 font-sans leading-relaxed">${project.description}</p>

      <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
        <div class="font-bold text-cyan-400">Tech Stack:</div>
        <div class="flex flex-wrap gap-1.5">
          ${project.techStack.map(t => `<span class="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">${t}</span>`).join('')}
        </div>
      </div>

      <div class="flex gap-3 pt-2">
        <a href="${project.githubUrl}" target="_blank" class="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white border border-slate-800 flex items-center gap-1.5 font-bold">
          <i data-lucide="github" class="w-4 h-4"></i> GitHub Code
        </a>
        <a href="${project.liveUrl}" target="_blank" class="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold flex items-center gap-1.5">
          <i data-lucide="external-link" class="w-4 h-4"></i> Live Application
        </a>
      </div>
    </div>
  `;

  lucide.createIcons();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
