import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal, Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
          {/* Left Brand */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                  MKG
                </div>
              </div>
              <span className="font-bold text-white tracking-tight text-lg">Mayank Kumar Gupta</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Freelance Full-Stack Developer • IoT & Embedded Engineer • AI Systems
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-purple-400 border border-slate-800 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors flex items-center gap-1 text-xs font-mono"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" /> Top
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Mayank Kumar Gupta. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with React, Tailwind CSS, ESP32 & AI Simulators</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
