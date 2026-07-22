import React, { useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Projects } from './components/Projects';
import { InteractiveLab } from './components/InteractiveLab';
import { Skills } from './components/Skills';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Dynamic Animated Node Network Background */}
      <BackgroundCanvas />

      {/* Fixed Sticky Header */}
      <Header
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => scrollToSection('contact')}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Portfolio Page Content */}
      <main className="relative z-10">
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => scrollToSection('contact')}
          onExploreProjects={() => scrollToSection('projects')}
          onOpenLab={() => scrollToSection('lab')}
        />

        <AboutMe
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => scrollToSection('contact')}
        />

        <Projects />

        <InteractiveLab />

        <Skills />

        <ExperienceEducation />

        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Document Viewer Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
