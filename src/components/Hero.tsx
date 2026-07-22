import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Terminal, Cpu, Code2, Sparkles, Download, Mail, ExternalLink, ShieldAlert, CheckCircle, Zap } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onExploreProjects: () => void;
  onOpenLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenResume,
  onOpenContact,
  onExploreProjects,
  onOpenLab,
}) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Radial Glow Effects with motion pulse */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Top Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 backdrop-blur shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-emerald-300 font-semibold">{PERSONAL_INFO.freelanceStatus}</span>
            </motion.div>

            {/* Title & Headline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]"
              >
                Hello, I'm <br />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name}
                </span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl font-semibold text-slate-300 flex items-center gap-2"
              >
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span>Freelance Web Developer & IoT / AI Engineer</span>
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-sans"
            >
              Specialized in engineering full-stack web applications, IoT embedded systems, and AI computer vision. Experienced in <strong className="text-slate-200">PHP, MySQL, JavaScript, Python, ESP32, Arduino, YOLOv8, and FastAPI</strong>.
            </motion.p>

            {/* Interactive Tech Tags Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-2 pt-1 font-mono text-xs"
            >
              {['PHP & MySQL', 'ESP32 / Arduino', 'YOLOv8 + FastAPI', 'Python & C++', 'REST APIs', 'Dynamic Dashboards', 'Sensors & Circuit Design'].map((tech, i) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05, borderColor: 'rgba(6,182,212,0.6)' }}
                  className="px-3 py-1 rounded-md bg-slate-900/80 text-cyan-300 border border-slate-800/90 shadow-sm transition-colors cursor-default"
                >
                  #{tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreProjects}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all"
              >
                Explore Exhibition <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenLab}
                className="px-5 py-3 rounded-xl font-semibold text-sm text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/60 flex items-center gap-2 transition-all shadow-md"
              >
                <Cpu className="w-4 h-4 text-cyan-400" /> Interactive Hardware & AI Lab
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenResume}
                className="px-4 py-3 rounded-xl font-semibold text-sm text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-purple-400" /> Resume
              </motion.button>
            </motion.div>

            {/* Quick Experience Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left font-mono"
            >
              <div>
                <div className="text-2xl font-bold text-white">4+ Years</div>
                <div className="text-xs text-slate-400">Freelance Development</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">15+ Projects</div>
                <div className="text-xs text-slate-400">Web, IoT & AI Systems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">B.Tech CSE</div>
                <div className="text-xs text-slate-400">Usha Martin Univ (2024-28)</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Card: Interactive Developer Terminal Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl p-5 space-y-4 font-mono text-xs backdrop-blur-md relative group hover:border-cyan-500/40 transition-colors">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-bold text-slate-300 ml-2">mayank@system-core:~</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ONLINE
                </span>
              </div>

              {/* Terminal Code Snippet */}
              <div className="space-y-2 text-slate-300 leading-relaxed overflow-x-auto">
                <p className="text-slate-500">// Mayank's System Capabilities & Tech Profile</p>
                
                <div>
                  <span className="text-purple-400 font-bold">const</span> developer = &#123;
                </div>
                
                <div className="pl-4">
                  <span className="text-cyan-400">name</span>: <span className="text-emerald-300">"{PERSONAL_INFO.name}"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">education</span>: <span className="text-emerald-300">"B.Tech CSE @ Usha Martin Univ"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">freelanceExperience</span>: <span className="text-amber-300">"4 Years (HTML, CSS, JS, PHP, MySQL)"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">specializations</span>: [
                  <div className="pl-4 text-emerald-300">
                    "AI Border Surveillance (YOLOv8 + FastAPI)",<br />
                    "Autonomous Radar Systems (ESP32 / Arduino)",<br />
                    "Natural Code AI Platform",<br />
                    "Smart Blind Stick Assistive Tech"<br />
                  </div>
                  ],
                </div>
                <div className="pl-4">
                  <span className="text-cyan-400">contact</span>: <span className="text-emerald-300">"{PERSONAL_INFO.email}"</span>
                </div>
                <div>&#125;;</div>

                <div className="pt-2 text-cyan-400 flex items-center gap-1">
                  <span>&gt; System Status: Ready for new web/hardware deployments...</span>
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* Quick Launch Cards */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenLab}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all text-left group/btn shadow-inner"
                >
                  <div className="text-cyan-400 font-bold flex items-center justify-between">
                    <span>Radar & Vision Lab</span>
                    <Zap className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Test YOLOv8 & ESP32 Sonar</div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenContact}
                  className="p-2.5 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-all text-left group/btn shadow-inner"
                >
                  <div className="text-emerald-400 font-bold flex items-center justify-between">
                    <span>Hire Mayank</span>
                    <Mail className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  </div>
                  <div className="text-slate-400 text-[10px] mt-0.5">Start a web / IoT project</div>
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

