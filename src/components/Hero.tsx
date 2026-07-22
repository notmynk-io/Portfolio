import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Download, Send, Github, Linkedin, Shield, Terminal, Cpu, Sparkles, Lock, Layers } from 'lucide-react';
import { ProfileImage } from './ProfileImage';

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
  // Typing animation phrases sequence
  const typingPhrases = [
    'Initializing Portfolio...',
    'Loading AI Modules...',
    'Loading Cybersecurity Systems...',
    'Loading Projects...',
    'Welcome.',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const typeSpeed = isDeleting ? 30 : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentPhrase) {
        // If "Welcome.", pause longer
        if (phraseIndex === typingPhrases.length - 1) {
          setTimeout(() => setIsDeleting(true), 3000);
        } else {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
      } else {
        setCurrentText(
          isDeleting
            ? currentPhrase.substring(0, currentText.length - 1)
            : currentPhrase.substring(0, currentText.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, phraseIndex]);

  // Floating Badges positions
  const techBadges = [
    { name: 'Python', color: 'border-yellow-500/40 text-yellow-300 bg-yellow-950/60', position: '-top-4 left-6', delay: 0 },
    { name: 'React', color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60', position: 'top-10 -right-6', delay: 0.5 },
    { name: 'FastAPI', color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60', position: 'bottom-20 -right-8', delay: 1 },
    { name: 'Cybersecurity', color: 'border-purple-500/40 text-purple-300 bg-purple-950/60', position: '-bottom-4 right-10', delay: 1.5 },
    { name: 'AI', color: 'border-pink-500/40 text-pink-300 bg-pink-950/60', position: '-bottom-4 left-10', delay: 2 },
    { name: 'Node.js', color: 'border-green-500/40 text-green-300 bg-green-950/60', position: 'bottom-20 -left-8', delay: 2.5 },
    { name: 'Linux', color: 'border-amber-500/40 text-amber-300 bg-amber-950/60', position: 'top-10 -left-6', delay: 3 },
  ];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden min-h-[90vh] flex items-center">
      
      {/* Background World Map & Grid Overlay with Radar Sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]" />

        {/* Cyber Grid Lines */}
        <div className="absolute inset-0 cyber-grid opacity-30" />

        {/* Radar Sweep Arc */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-500/10 opacity-40">
          <div className="w-full h-full rounded-full border border-purple-500/10 scale-75" />
          <div className="w-full h-full rounded-full border border-emerald-500/10 scale-50" />
          {/* Rotating Radar Line */}
          <div className="absolute inset-0 origin-center animate-radar bg-[conic-gradient(from_0deg_at_50%_50%,rgba(6,182,212,0.15)_0deg,transparent_60deg)] rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Terminal Typing Status Bar */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400 backdrop-blur shadow-lg shadow-cyan-500/5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{currentText}</span>
              <span className="w-1.5 h-3 bg-cyan-400 animate-pulse" />
            </div>

            {/* Name Heading */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight font-heading leading-[1.08]"
              >
                Mayank Kumar Gupta
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent font-mono flex items-center gap-2"
              >
                <Shield className="w-5 h-5 text-cyan-400 inline shrink-0" />
                <span>AI Engineer | Cybersecurity Enthusiast | Full Stack Developer</span>
              </motion.div>
            </div>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl"
            >
              I build <strong className="text-white">AI-powered security systems</strong>, <strong className="text-white">intelligent web applications</strong>, and <strong className="text-white">scalable software</strong>. Specialized in fusing computer vision, embedded microcontrollers, and modern full-stack web architectures for defense and real-world intelligence.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {/* View Projects */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreProjects}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 flex items-center gap-2 transition-all font-sans"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Download Resume */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenResume}
                className="px-5 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 flex items-center gap-2 transition-all shadow-md font-sans"
              >
                <Download className="w-4 h-4 text-cyan-400" /> Download Resume
              </motion.button>

              {/* Contact Me */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenContact}
                className="px-5 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/50 flex items-center gap-2 transition-all shadow-md font-sans"
              >
                <Send className="w-4 h-4 text-purple-400" /> Contact Me
              </motion.button>

              {/* Social Links Icons */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 font-mono text-left"
            >
              <div>
                <div className="text-2xl font-bold text-white font-heading">4+ Years</div>
                <div className="text-xs text-slate-400">Software & Web Dev</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-heading">15+ Projects</div>
                <div className="text-xs text-slate-400">AI & Cyber Systems</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 font-heading">B.Tech CSE</div>
                <div className="text-xs text-slate-400">Usha Martin Univ</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE CONTENT - Circular Profile Image Frame with Floating Tech Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative py-6"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              
              {/* Outer Rotating Glowing Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin [animation-duration:20s] pointer-events-none" />
              <div className="absolute -inset-3 rounded-full border border-purple-500/20 animate-spin [animation-duration:30s] [animation-direction:reverse] pointer-events-none" />

              {/* Soft Cyan Halo Backlight */}
              <div className="absolute inset-4 bg-gradient-to-tr from-cyan-500/30 via-purple-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse-glow" />

              {/* Main Avatar Container Frame */}
              <div className="relative w-full h-full rounded-full p-2 bg-slate-900/90 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/20 flex flex-col items-center justify-center overflow-hidden group">
                <ProfileImage size="hero" showUploadButton={true} />
              </div>

              {/* Floating Technology Badges around the profile image */}
              {techBadges.map((badge, idx) => (
                <motion.div
                  key={badge.name}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 4 + idx * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: badge.delay,
                  }}
                  className={`absolute ${badge.position} px-3 py-1.5 rounded-full text-xs font-mono font-bold border backdrop-blur-md shadow-xl z-20 flex items-center gap-1.5 cursor-default ${badge.color}`}
                >
                  <Sparkles className="w-3 h-3 opacity-80" />
                  <span>{badge.name}</span>
                </motion.div>
              ))}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
