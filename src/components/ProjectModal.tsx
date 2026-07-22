import React from 'react';
import { Project } from '../types/portfolio';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { SurveillanceSimulator } from './Simulators/SurveillanceSimulator';
import { RadarSimulator } from './Simulators/RadarSimulator';
import { CodeAnalyzerSimulator } from './Simulators/CodeAnalyzerSimulator';
import { BlindStickSimulator } from './Simulators/BlindStickSimulator';
import { DashboardSimulator } from './Simulators/DashboardSimulator';
import { InterrogationAnalyzerSimulator } from './Simulators/InterrogationAnalyzerSimulator';
import { CriminalTrackingSimulator } from './Simulators/CriminalTrackingSimulator';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const renderDemoSimulator = () => {
    switch (project.demoType) {
      case 'surveillance':
        return <SurveillanceSimulator />;
      case 'interrogation':
        return <InterrogationAnalyzerSimulator />;
      case 'tracking':
        return <CriminalTrackingSimulator />;
      case 'radar':
        return <RadarSimulator />;
      case 'code-analyzer':
        return <CodeAnalyzerSimulator />;
      case 'blind-stick':
        return <BlindStickSimulator />;
      case 'dashboard':
        return <DashboardSimulator />;
      default:
        return (
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
            <h4 className="text-sm font-bold text-white font-heading">System Architecture Configured</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto font-sans">
              This system is deployed with custom full-stack backend handlers, security authentication, and optimized database indexing.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 md:p-8 relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700 focus:outline-none z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {project.categoryLabel}
            </span>
            <span className="text-xs font-mono text-slate-400">Period: {project.period}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            {project.title}
          </h2>

          <p className="text-sm text-cyan-400 font-mono">
            {project.subtitle}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 border-y border-slate-800/80 py-3 font-mono text-xs">
          <span className="text-slate-400 shrink-0 self-center">Tech Stack:</span>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description & Key Engineering Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3 text-sm text-slate-300 leading-relaxed font-sans">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
              Project Architecture & Security Scope
            </h3>
            <p>{project.description}</p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Features & Specs
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Live Interactive Simulator Section */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold uppercase text-slate-200 flex items-center gap-2">
              <Play className="w-4 h-4 text-cyan-400 animate-pulse" /> Live Interactive Simulator Engine
            </h3>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Cybersecurity & AI Live Sandbox
            </span>
          </div>

          {renderDemoSimulator()}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};
