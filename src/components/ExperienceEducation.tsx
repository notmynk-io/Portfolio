import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award, Building2 } from 'lucide-react';

export const ExperienceEducation: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative bg-slate-950/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Briefcase className="w-3.5 h-3.5" /> Career & Education Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Academic Background
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Nearly 4 years of freelance web development experience alongside hands-on IoT hardware prototyping and computer science engineering studies.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 border-b border-slate-800 pb-3"
          >
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Work & Development Experience</h3>
          </motion.div>

          <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-8 pl-6 md:pl-8">
            {EXPERIENCES_DATA.map((exp, idx) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Timeline Node Icon */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20" />

                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-cyan-500/40 transition-all shadow-xl">
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-semibold text-cyan-400 font-mono flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5" /> {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {exp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {exp.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-cyan-400 font-bold shrink-0 mt-0.5">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Skills Used Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {exp.skillsUsed.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 border-b border-slate-800 pb-3"
          >
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white tracking-tight">Education History</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_DATA.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-purple-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-base font-bold text-white">{edu.institution}</h4>
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20 shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs font-mono font-bold text-cyan-400">{edu.degree}</p>
                </div>

                {edu.details && (
                  <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                    {edu.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold shrink-0">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

