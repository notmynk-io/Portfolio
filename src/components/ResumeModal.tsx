import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES_DATA, EDUCATION_DATA, SKILL_CATEGORIES } from '../data/portfolioData';
import { X, Download, Copy, Check, Mail, Phone, Linkedin, ExternalLink, Printer } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 md:p-8 relative my-auto animate-in fade-in zoom-in-95 duration-200 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white tracking-tight">Mayank's Resume Document</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors border border-cyan-500/30 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Email' : 'Copy Contact'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Printable Resume Paper View */}
        <div className="bg-slate-950 p-6 md:p-8 rounded-xl border border-slate-800/80 space-y-8 font-sans">
          
          {/* Header Contact Card */}
          <div className="border-b border-slate-800 pb-6 space-y-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{PERSONAL_INFO.name}</h1>
            <p className="text-base font-semibold text-cyan-400 font-mono">{PERSONAL_INFO.role}</p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-2">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 text-cyan-300 hover:underline">
                <Mail className="w-3.5 h-3.5" /> {PERSONAL_INFO.email}
              </a>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> {PERSONAL_INFO.phone}
              </span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-purple-300 hover:underline">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile
              </a>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-1">
              Experience
            </h3>

            <div className="space-y-6">
              {EXPERIENCES_DATA.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h4 className="text-sm font-bold text-white">
                      {exp.role} <span className="text-slate-400 font-normal">| {exp.company}</span>
                    </h4>
                    <span className="text-xs font-mono text-cyan-300">{exp.period}</span>
                  </div>

                  <ul className="space-y-1 text-xs text-slate-300 pl-3">
                    {exp.bulletPoints.map((b, i) => (
                      <li key={i} className="list-disc leading-relaxed">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-400 border-b border-slate-800 pb-1">
              Education
            </h3>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline flex-wrap gap-1 text-xs">
                  <div>
                    <h4 className="font-bold text-white">{edu.institution}</h4>
                    <p className="text-slate-300">{edu.degree}</p>
                  </div>
                  <span className="font-mono text-purple-300">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-1">
              Skills & Technical Knowledge
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <strong className="text-slate-200">Programming Languages:</strong>
                <p className="text-slate-400 font-mono">Python, C, C++, Java, JavaScript, PHP, SQL, HTML, CSS</p>
              </div>
              <div>
                <strong className="text-slate-200">IoT & Hardware:</strong>
                <p className="text-slate-400 font-mono">Arduino, ESP32, Sensors, Embedded C/C++, Circuit Design</p>
              </div>
              <div>
                <strong className="text-slate-200">Web & Databases:</strong>
                <p className="text-slate-400 font-mono">PHP, MySQL, phpMyAdmin, React, REST APIs, Tailwind CSS</p>
              </div>
              <div>
                <strong className="text-slate-200">AI & Vision:</strong>
                <p className="text-slate-400 font-mono">YOLOv8, FastAPI, OpenCV, AI Code Analysis</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Close */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Close Resume
          </button>
        </div>
      </div>
    </div>
  );
};
