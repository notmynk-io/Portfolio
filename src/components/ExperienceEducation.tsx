import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES_DATA, EDUCATION_DATA } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, Building2, ShieldCheck, Award, ExternalLink, RotateCw, CheckCircle2, Lock } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  description: string;
  skills: string[];
  verifyUrl: string;
}

export const ExperienceEducation: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const certifications: Certification[] = [
    {
      id: 'cert-1',
      title: 'YOLOv8 Computer Vision & Deep Learning',
      issuer: 'Ultralytics & Computer Vision Lab',
      date: '2023',
      credentialId: 'YOLO-AI-80942',
      description: 'Specialized certification covering custom object detection model training, video stream bounding box processing, and edge AI deployment.',
      skills: ['YOLOv8', 'Python', 'OpenCV', 'PyTorch', 'Edge AI'],
      verifyUrl: 'https://github.com/notmynk-io/TrackOn-Vision.git'
    },
    {
      id: 'cert-2',
      title: 'ESP32 & Embedded IoT Firmware Architecture',
      issuer: 'Atal Tinkering Lab & Microcontroller Guild',
      date: '2022',
      credentialId: 'ESP32-HARDWARE-312',
      description: 'Mastery in ESP32/Arduino microcontroller firmware, C++ memory optimization, sensor arrays, and serial telemetry protocols.',
      skills: ['ESP32', 'Embedded C++', 'Sensors', 'Telemetry', 'Circuit Design'],
      verifyUrl: 'https://github.com/notmynk-io/Ardiuno-SmartBlindStick'
    },
    {
      id: 'cert-3',
      title: 'Full-Stack Web Security & Database Engineering',
      issuer: 'Independent Client Solutions',
      date: '2021',
      credentialId: 'PHP-SEC-902',
      description: 'Comprehensive certification in secure Web Development, PHP/MySQL architecture, password hashing, and CSRF/XSS protection.',
      skills: ['PHP', 'MySQL', 'REST APIs', 'SQL Injection Guard', 'Auth Systems'],
      verifyUrl: 'https://github.com/notmynk-io/Credit-Card-Fraud-Detection.git'
    },
    {
      id: 'cert-4',
      title: 'Cybersecurity Operations & Network Defense',
      issuer: 'Cyber Defense Academy',
      date: '2023',
      credentialId: 'CYBER-DEF-540',
      description: 'Hardening Linux web servers, firewall configurations, forensic log analysis, and automated anomaly alerting dispatches.',
      skills: ['Linux Security', 'Log Analytics', 'FastAPI Webhooks', 'Network Defense'],
      verifyUrl: 'https://github.com/notmynk-io/webrecon-cybersecurity.git'
    }
  ];

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Career Timeline & Certifications
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Experience & Verified Certifications
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Nearly 4 years of client software engineering alongside computer science studies, AI research, and verified technical credentials.
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
            <h3 className="text-xl font-bold text-white tracking-tight font-heading">Work & Development Timeline</h3>
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
                {/* Timeline Node Point */}
                <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20" />

                <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-cyan-500/40 transition-all shadow-xl">
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
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
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans">
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

        {/* Certifications Interactive Flip Cards */}
        <div className="space-y-8 pt-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between border-b border-slate-800 pb-3"
          >
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-bold text-white tracking-tight font-heading">Verified Certifications</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">Click or Hover Card to Flip</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => {
              const isFlipped = !!flippedCards[cert.id];
              return (
                <div
                  key={cert.id}
                  onClick={() => toggleFlip(cert.id)}
                  className="h-72 [perspective:1000px] cursor-pointer group"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative [transform-style:preserve-3d]"
                  >
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between shadow-2xl [backface-visibility:hidden] group-hover:border-cyan-500/50 transition-colors">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-400">
                            <Award className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> VERIFIED
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                            {cert.title}
                          </h4>
                          <p className="text-xs font-mono text-slate-400">{cert.issuer}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-800">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span>Issued: {cert.date}</span>
                          <span className="text-slate-500 text-[10px]">{cert.credentialId}</span>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-400 font-mono pt-1 group-hover:underline">
                          <RotateCw className="w-3.5 h-3.5" /> Flip for Specs
                        </div>
                      </div>
                    </div>

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 bg-slate-950 rounded-2xl border border-cyan-500/40 p-5 flex flex-col justify-between shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className="space-y-3">
                        <div className="text-xs font-mono text-cyan-400 font-bold flex items-center justify-between">
                          <span>CREDENTIAL DETAILS</span>
                          <Lock className="w-3.5 h-3.5 text-cyan-400" />
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {cert.description}
                        </p>

                        <div className="flex flex-wrap gap-1 font-mono text-[10px] pt-1">
                          {cert.skills.map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors"
                        >
                          Verify Credential <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip(cert.id);
                          }}
                          className="text-[10px] font-mono text-slate-400 hover:text-white"
                        >
                          Flip Back ↩
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-8 pt-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 border-b border-slate-800 pb-3"
          >
            <GraduationCap className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white tracking-tight font-heading">Academic Education</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_DATA.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 hover:border-purple-500/40 transition-all shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-base font-bold text-white font-heading">{edu.institution}</h4>
                    <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20 shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs font-mono font-bold text-cyan-400">{edu.degree}</p>
                </div>

                {edu.details && (
                  <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80 font-sans">
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
