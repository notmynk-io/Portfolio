import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileImage } from './ProfileImage';
import { 
  User, 
  Terminal, 
  Cpu, 
  Code2, 
  Sparkles, 
  Rocket, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Globe, 
  Layers, 
  Compass, 
  HeartHandshake,
  ArrowUpRight,
  BrainCircuit
} from 'lucide-react';

interface AboutMeProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ onOpenResume, onOpenContact }) => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/80">
      {/* Background Accent Blur Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <User className="w-3.5 h-3.5" /> Developer Biography & Aspirations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Mayank Kumar Gupta
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Full-Stack Web Developer, IoT Hardware Engineer & AI Computer Vision Practitioner.
          </p>
        </motion.div>

        {/* Main Grid: Headshot + Journey & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Professional Headshot / Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              
              {/* Background Bento Graphic Overlay */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

              {/* Headshot Visual Frame */}
              <div className="relative mx-auto flex flex-col items-center justify-center p-2">
                <ProfileImage size="hero" showUploadButton={true} />
                <div className="mt-3 text-center">
                  <div className="text-sm font-bold text-white tracking-wide">Mayank K. Gupta</div>
                  <div className="text-xs font-mono text-cyan-400">Jharkhand, India</div>
                </div>
              </div>

              {/* Key Quick Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-center">
                  <div className="text-xl font-extrabold text-cyan-400">4+ Years</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Freelance Web Dev</div>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-center">
                  <div className="text-xl font-extrabold text-purple-400">15+ Built</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">IoT & AI Systems</div>
                </div>
              </div>

              {/* Education & Location Info Box */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>B.Tech CSE @ Usha Martin University (2024–28)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Location: Jharkhand, India (GMT +5:30)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Mentoring: Atal Tinkering Lab (STEM Innovation)</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Detailed Personal Statement & Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            
            {/* My Journey Card */}
            <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4" /> Personal Statement & Journey
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                From Custom Web Engines to Hardware Circuits & Computer Vision
              </h3>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  My journey into technology began nearly four years ago when I started crafting custom web applications for freelance clients. Building full-stack solutions with <strong className="text-slate-100">HTML, CSS, JavaScript, PHP, and MySQL</strong> taught me the fundamentals of database design, secure user authentication, and deliverable UI engineering.
                </p>
                <p>
                  Driven by a desire to bridge digital code with the physical world, I ventured into <strong className="text-slate-100">IoT and embedded systems engineering</strong>. Programming microcontrollers like the <strong className="text-slate-100">ESP32 and Arduino</strong>, interfacing ultrasonic radar sensors, and building assistive mobility devices like the <em>Smart Blind Stick</em> sparked my passion for hardware automation.
                </p>
                <p>
                  Today, while pursuing my <strong className="text-slate-100">B.Tech in Computer Science & Engineering at Usha Martin University</strong>, I actively integrate AI models — training <strong className="text-slate-100">YOLOv8</strong> vision pipelines and building <strong className="text-slate-100">FastAPI backends</strong> for real-time border surveillance, suspect tracking, and intelligent code refactoring tools.
                </p>
              </div>
            </div>

            {/* Career Aspirations Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl relative">
              <div className="flex items-center gap-2.5 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Rocket className="w-4 h-4" /> Vision & Career Aspirations
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                Pioneering Edge AI & Intelligent Hardware Systems
              </h3>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Edge-AI Hardware Integration:</strong> To design ultra-low-latency embedded AI devices that perform computer vision on edge microcontrollers without relying on constant cloud connectivity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Scalable Web Architectures:</strong> Architecting resilient REST & WebSocket cloud microservices using Python, React, and modern databases that power industrial IoT dashboards.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Impactful Assistive Tech:</strong> Creating accessible, life-enhancing hardware solutions for individuals with physical or visual impairments.</span>
                </li>
              </ul>

              {/* Action Buttons */}
              {(onOpenResume || onOpenContact) && (
                <div className="flex flex-wrap gap-3 pt-3">
                  {onOpenContact && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenContact}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 flex items-center gap-2 shadow-lg shadow-cyan-500/10 transition-all"
                    >
                      Collaborate With Mayank <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  )}
                  {onOpenResume && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenResume}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-2 transition-all"
                    >
                      Download Full Resume
                    </motion.button>
                  )}
                </div>
              )}
            </div>

          </motion.div>

        </div>

        {/* Key Skill Pillars Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 pt-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Core Competency Matrix</h3>
            <p className="text-xs text-slate-400 font-mono">Key skills across front-end, back-end, embedded hardware & AI vision</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 1: Web Frontend */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Full-Stack Web</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                HTML5, CSS3, JavaScript ES6+, React, PHP, MySQL, REST APIs, Tailwind CSS.
              </p>
            </motion.div>

            {/* Pillar 2: IoT & Microcontrollers */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">IoT & Embedded</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ESP32, Arduino, Embedded C++, Ultrasonic Sensors, Servos, Telemetry Protocols.
              </p>
            </motion.div>

            {/* Pillar 3: AI & Vision */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-purple-500/40 transition-colors shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">AI & Computer Vision</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Python, YOLOv8, OpenCV, FastAPI, Object Detection & Tracking, LLM Tools.
              </p>
            </motion.div>

            {/* Pillar 4: Cloud & Tools */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-amber-500/40 transition-colors shadow-lg"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Cloud & Tooling</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                AWS Services, Git/GitHub, Docker Containers, phpMyAdmin, Linux & Shell.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

