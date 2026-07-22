import React, { useState } from 'react';
import { Cpu, ShieldAlert, Radar, Code2, Activity, LayoutDashboard, Terminal } from 'lucide-react';
import { SurveillanceSimulator } from './Simulators/SurveillanceSimulator';
import { RadarSimulator } from './Simulators/RadarSimulator';
import { CodeAnalyzerSimulator } from './Simulators/CodeAnalyzerSimulator';
import { BlindStickSimulator } from './Simulators/BlindStickSimulator';
import { DashboardSimulator } from './Simulators/DashboardSimulator';

export const InteractiveLab: React.FC = () => {
  const [activeLabTab, setActiveLabTab] = useState<'surveillance' | 'radar' | 'code' | 'blindstick' | 'dashboard'>('surveillance');

  const labItems = [
    { id: 'surveillance', label: 'YOLOv8 AI Vision', icon: ShieldAlert, desc: 'Object detection & perimeter alerts' },
    { id: 'radar', label: 'ESP32 Sonar Radar', icon: Radar, desc: '360° distance sweep & target lock' },
    { id: 'code', label: 'Natural Code AI', icon: Code2, desc: 'Code AST analysis & refactoring' },
    { id: 'blindstick', label: 'Smart Blind Stick', icon: Activity, desc: 'Ultrasonic haptic & SOS alert' },
    { id: 'dashboard', label: 'Client Web Portal', icon: LayoutDashboard, desc: 'PHP/MySQL auth & metrics' },
  ];

  return (
    <section id="lab" className="py-20 bg-slate-950/60 relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" /> Mayank's Hardware & Software Playground
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Technical Lab
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Directly test hardware microcontrollers, computer vision pipelines, and web database engines right inside your browser.
          </p>
        </div>

        {/* Lab Navigation Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono">
          {labItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeLabTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveLabTab(item.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <div className="text-left">
                  <div className="font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal hidden sm:block">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Simulator Container */}
        <div className="pt-2">
          {activeLabTab === 'surveillance' && <SurveillanceSimulator />}
          {activeLabTab === 'radar' && <RadarSimulator />}
          {activeLabTab === 'code' && <CodeAnalyzerSimulator />}
          {activeLabTab === 'blindstick' && <BlindStickSimulator />}
          {activeLabTab === 'dashboard' && <DashboardSimulator />}
        </div>
      </div>
    </section>
  );
};
