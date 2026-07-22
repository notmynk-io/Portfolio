import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, Download, Send, Sparkles, Cpu, Layers, UserCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfileImage } from './ProfileImage';

interface HeaderProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenResume,
  onOpenContact,
  activeSection,
  setActiveSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Exhibition' },
    { id: 'lab', label: 'Interactive Lab' },
    { id: 'skills', label: 'Skills Matrix' },
    { id: 'experience', label: 'Experience' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Branding */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <ProfileImage size="sm" showUploadButton={false} />
          <div>
            <span className="font-bold text-slate-100 text-base tracking-tight group-hover:text-cyan-300 transition-colors block leading-tight">
              Mayank Kumar Gupta
            </span>
            <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Full-Stack & IoT Engineer
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links with Motion Layout Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/90 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-cyan-500/20 border border-cyan-500/40 rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenResume}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" /> Resume
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenContact}
            className="px-4 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" /> Contact
          </motion.button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 rounded-xl border border-slate-800 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-3 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-cyan-400" /> View / Download Resume
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

