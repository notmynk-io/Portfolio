import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, BrainCircuit, Code2, Shield, Database, Terminal, Cpu as HardwareIcon, Sparkles, Server, Zap, Radio, Lock } from 'lucide-react';

interface TechSkillCard {
  name: string;
  category: string;
  experience: string;
  projectsBuilt: string;
  icon: any;
  color: string;
  bgGlow: string;
}

export const Skills: React.FC = () => {
  const skillsList: TechSkillCard[] = [
    { name: 'Python', category: 'AI & Systems', experience: 'Advanced', projectsBuilt: '10+ Projects', icon: BrainCircuit, color: 'text-yellow-400 border-yellow-500/40', bgGlow: 'hover:shadow-yellow-500/10' },
    { name: 'YOLOv8 Computer Vision', category: 'AI Models', experience: 'Specialized', projectsBuilt: '4 Security Models', icon: Shield, color: 'text-red-400 border-red-500/40', bgGlow: 'hover:shadow-red-500/10' },
    { name: 'FastAPI', category: 'Backend Framework', experience: 'Advanced', projectsBuilt: '6 REST APIs', icon: Zap, color: 'text-emerald-400 border-emerald-500/40', bgGlow: 'hover:shadow-emerald-500/10' },
    { name: 'ESP32 & Arduino', category: 'IoT & Microcontrollers', experience: 'Expert', projectsBuilt: '8 Hardware Builds', icon: HardwareIcon, color: 'text-cyan-400 border-cyan-500/40', bgGlow: 'hover:shadow-cyan-500/10' },
    { name: 'Embedded C / C++', category: 'Firmware Development', experience: 'Advanced', projectsBuilt: '12 Firmwares', icon: Cpu, color: 'text-purple-400 border-purple-500/40', bgGlow: 'hover:shadow-purple-500/10' },
    { name: 'React & TypeScript', category: 'Frontend Engineering', experience: 'Advanced', projectsBuilt: '15+ Modern Apps', icon: Globe, color: 'text-blue-400 border-blue-500/40', bgGlow: 'hover:shadow-blue-500/10' },
    { name: 'PHP & MySQL', category: 'Full-Stack Web', experience: 'Expert (4 Years)', projectsBuilt: '10+ Client Dashboards', icon: Database, color: 'text-pink-400 border-pink-500/40', bgGlow: 'hover:shadow-pink-500/10' },
    { name: 'Linux & Bash Security', category: 'Cyber Operations', experience: 'Advanced', projectsBuilt: 'Server Hardening', icon: Terminal, color: 'text-amber-400 border-amber-500/40', bgGlow: 'hover:shadow-amber-500/10' },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Lock className="w-3.5 h-3.5 text-purple-400" /> Technology & Cybersecurity Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Skills & Proficiency Cards
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Modular technical capabilities spanning artificial intelligence models, hardware sensor microcontrollers, full-stack web engineering, and security hardening.
          </p>
        </motion.div>

        {/* Modern Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsList.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`bg-slate-900/90 rounded-2xl border border-slate-800/90 p-5 space-y-4 hover:border-cyan-500/50 transition-all duration-300 shadow-xl group relative overflow-hidden ${skill.bgGlow}`}
              >
                {/* Subtle Card Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Top Card Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-slate-950 border ${skill.color} shadow-inner group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 font-medium">
                    {skill.category}
                  </span>
                </div>

                {/* Name & Experience Level */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {skill.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Proficiency:</span>
                    <span className="text-cyan-400 font-bold">{skill.experience}</span>
                  </div>
                </div>

                {/* Projects Built Footer */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Deployments:</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {skill.projectsBuilt}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Pills Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl"
        >
          <div className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Full Tooling & Hardware Ecosystem
          </div>
          <div className="flex flex-wrap justify-center gap-2 font-mono text-xs text-slate-300">
            {[
              'Python', 'C', 'C++', 'Java', 'JavaScript', 'PHP', 'HTML5', 'CSS3', 'MySQL',
              'phpMyAdmin', 'Arduino', 'ESP32', 'ESP8266', 'Sensors (Ultrasonic, Gyro, PIR)',
              'Embedded C/C++', 'Circuit Design', 'YOLOv8', 'FastAPI', 'OpenCV', 'REST APIs',
              'Tailwind CSS', 'React', 'Linux', 'Git', 'Vercel'
            ].map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.08, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 hover:text-cyan-300 transition-colors shadow cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
