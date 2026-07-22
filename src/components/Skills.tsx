import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Cpu, Globe, BrainCircuit, CheckCircle2, Code2, Database, Layers, Sparkles } from 'lucide-react';

export const Skills: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

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
            <Layers className="w-3.5 h-3.5" /> Technical Expertise & Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Proficiency Matrix
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Comprehensive breakdown of programming languages, hardware microcontrollers, web frameworks, and database architecture.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-6 hover:border-cyan-500/40 transition-all shadow-xl"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
                  {getIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{cat.title}</h3>
                  <span className="text-[11px] font-mono text-slate-400">{cat.skills.length} Technical Skills</span>
                </div>
              </div>

              {/* Individual Skill Progress Bars */}
              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {skill.name}
                      </span>
                      <span className="text-slate-400 font-normal text-[11px]">{skill.tag}</span>
                    </div>

                    {/* Progress Bar with Motion Fill */}
                    <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/90 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + sIdx * 0.1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 rounded-full shadow-lg shadow-cyan-500/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Core Technologies List Tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center space-y-4 shadow-xl"
        >
          <div className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Languages, Microcontrollers & Tools Summary
          </div>
          <div className="flex flex-wrap justify-center gap-2 font-mono text-xs text-slate-300">
            {[
              'Python', 'C', 'C++', 'Java', 'JavaScript', 'PHP', 'HTML5', 'CSS3', 'MySQL',
              'phpMyAdmin', 'Arduino', 'ESP32', 'ESP8266', 'Sensors (Ultrasonic, Gyro, PIR)',
              'Embedded C/C++', 'Circuit Design', 'YOLOv8', 'FastAPI', 'OpenCV', 'REST APIs',
              'Tailwind CSS', 'React'
            ].map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.08, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 hover:text-cyan-300 transition-colors shadow"
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

