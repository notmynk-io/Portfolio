import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { 
  Sparkles, 
  Eye, 
  Code2, 
  Cpu, 
  Globe, 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  Play, 
  Zap, 
  Radio, 
  ShieldAlert, 
  CheckCircle2,
  SlidersHorizontal,
  Search
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'iot' | 'ai'>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Featured spotlight items
  const spotlightProjects = PROJECTS_DATA.slice(0, 3);
  const currentSpotlight = spotlightProjects[spotlightIndex];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesQuery = 
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" /> Engineering Exhibition & Live Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Project Exhibition
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            An immersive gallery showcasing Mayank's production web platforms, IoT microcontrollers, and computer vision models. Select any project to test its live interactive simulation engine!
          </p>
        </motion.div>

        {/* Exhibition Spotlight Banner */}
        {currentSpotlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 rounded-3xl border border-slate-800/90 p-6 md:p-8 shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-colors"
          >
            {/* Background Glow Overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Info Column */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    EXHIBITION SPOTLIGHT #{spotlightIndex + 1}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                    {currentSpotlight.categoryLabel}
                  </span>
                  <span className="text-slate-400">Period: {currentSpotlight.period}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {currentSpotlight.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-cyan-400">
                    {currentSpotlight.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {currentSpotlight.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px] pt-1">
                  {currentSpotlight.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-950 text-cyan-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Spotlight Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveProjectModal(currentSpotlight)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
                  >
                    <Play className="w-4 h-4 fill-slate-950" /> Test Live Interactive Simulator
                  </motion.button>

                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 ml-auto font-mono text-xs">
                    <span className="text-[10px] text-slate-400 px-2">Spotlight:</span>
                    {spotlightProjects.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSpotlightIndex(idx)}
                        className={`w-6 h-6 rounded-lg text-xs font-bold transition-colors ${
                          spotlightIndex === idx
                            ? 'bg-cyan-500 text-slate-950'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Media Preview Frame */}
              <div className="lg:col-span-5">
                <div 
                  onClick={() => setActiveProjectModal(currentSpotlight)}
                  className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-56 lg:h-64 cursor-pointer group/img shadow-2xl"
                >
                  {currentSpotlight.imageUrl ? (
                    <img
                      src={currentSpotlight.imageUrl}
                      alt={currentSpotlight.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 opacity-80 group-hover/img:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-950 flex items-center justify-center p-6 text-center">
                      <Code2 className="w-12 h-12 text-cyan-400/40" />
                    </div>
                  )}

                  {/* Glassmorphic Play Trigger Overlay */}
                  <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-2xl">
                      <Play className="w-4 h-4 fill-slate-950" /> Launch Interactive Demo
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          
          {/* Category Filter Pills with Motion Layout Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Works', icon: Sparkles },
              { id: 'web', label: 'Web Dev & APIs', icon: Globe },
              { id: 'iot', label: 'IoT & Hardware', icon: Cpu },
              { id: 'ai', label: 'AI & Vision', icon: Code2 },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                    isActive
                      ? 'text-cyan-300 font-bold'
                      : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeExhibitionTab"
                      className="absolute inset-0 bg-cyan-500/20 border border-cyan-500/40 rounded-xl shadow-lg shadow-cyan-500/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64 font-mono text-xs">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech stack, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-500"
            />
          </div>

        </div>

        {/* Project Cards Bento Exhibition Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35 }}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 group relative overflow-hidden"
              >
                {/* Image Preview Banner */}
                <div 
                  onClick={() => setActiveProjectModal(project)}
                  className="relative h-44 w-full bg-slate-950 overflow-hidden cursor-pointer"
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 flex items-center justify-center p-4">
                      <Code2 className="w-12 h-12 text-cyan-500/40" />
                    </div>
                  )}
                  
                  {/* Category Badge & Period */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950/90 text-cyan-300 border border-slate-800 backdrop-blur shadow">
                      {project.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-950/90 border border-slate-800 backdrop-blur">
                      {project.period}
                    </span>
                  </div>

                  {/* Hover Play Simulator Badge Overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xl transform group-hover:scale-105 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-slate-950" /> Test Live Simulator
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => setActiveProjectModal(project)}
                      className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links & Direct Actions Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center gap-1 text-[11px] font-mono"
                            title="View GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors flex items-center gap-1 text-[11px] font-mono"
                            title="View Live Application"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setActiveProjectModal(project)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        <span>Interactive Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-2">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-sm font-bold text-slate-300">No projects match your query</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Project Detail Modal Overlay */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};


