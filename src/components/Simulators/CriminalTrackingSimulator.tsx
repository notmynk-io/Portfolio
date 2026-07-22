import React, { useState } from 'react';
import { MapPin, ShieldAlert, Radio, Flame, Eye, Clock, Activity, Video } from 'lucide-react';

interface Suspect {
  id: string;
  name: string;
  alias: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  lastSeenLocation: string;
  lastSeenTime: string;
  matchScore: number;
  associatesCount: number;
  coordinates: { x: number; y: number };
  cctvVideoUrl: string;
}

export const CriminalTrackingSimulator: React.FC = () => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState<string>('S-809');

  const suspects: Suspect[] = [
    {
      id: 'S-809',
      name: 'Vikram "Ghost" Singh',
      alias: 'Operator X',
      threatLevel: 'CRITICAL',
      lastSeenLocation: 'Sector 4 Metro Terminal (CCTV #12)',
      lastSeenTime: '2 mins ago',
      matchScore: 98.4,
      associatesCount: 4,
      coordinates: { x: 42, y: 38 },
      cctvVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
    {
      id: 'S-312',
      name: 'Anand Sharma',
      alias: 'Cipher',
      threatLevel: 'HIGH',
      lastSeenLocation: 'National Highway Gate 8',
      lastSeenTime: '18 mins ago',
      matchScore: 91.2,
      associatesCount: 2,
      coordinates: { x: 72, y: 65 },
      cctvVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 'S-540',
      name: 'Rohan Mehta',
      alias: 'Viper',
      threatLevel: 'ELEVATED',
      lastSeenLocation: 'Old Port Warehouses',
      lastSeenTime: '45 mins ago',
      matchScore: 89.6,
      associatesCount: 3,
      coordinates: { x: 28, y: 78 },
      cctvVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    },
  ];

  const activeSuspect = suspects.find((s) => s.id === selectedSuspect) || suspects[0];

  const timelineEvents = [
    { time: '14:22:10', loc: 'Downtown Financial Hub - CCTV #04', event: 'Facial match 98.4% logged' },
    { time: '14:15:40', loc: 'North Alley Transit Hub', event: 'Cellular tower ping registered' },
    { time: '13:50:00', loc: 'Sector 2 ATM Kiosk', event: 'Vehicle license plate scan match' },
  ];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 space-y-6 shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white tracking-wide font-heading">
              AI Criminal Tracking & Facial Re-ID City Network
            </h3>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Multi-Camera CCTV Node Grid with Live Re-ID Camera Feeds
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showHeatmap
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            {showHeatmap ? 'Heatmap Overlay ON' : 'Toggle Heatmap'}
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive City Radar Map */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-[16/10] bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800 shadow-2xl group">
            {/* Grid & Map Overlay */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                showHeatmap ? 'bg-[radial-gradient(circle_at_42%_38%,rgba(239,68,68,0.4)_0%,transparent_50%)]' : ''
              }`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

            {/* Radar Scan Line */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60 animate-pulse" />
            </div>

            {/* Suspect Coordinates Markers */}
            {suspects.map((s) => {
              const isSelected = s.id === selectedSuspect;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSuspect(s.id)}
                  style={{ left: `${s.coordinates.x}%`, top: `${s.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-8 h-8 rounded-full animate-ping ${
                        isSelected ? 'bg-red-500/40' : 'bg-cyan-500/20'
                      }`}
                    />
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                        isSelected
                          ? 'bg-red-500 border-white text-white shadow-lg shadow-red-500/50 scale-110'
                          : 'bg-slate-900 border-cyan-400 text-cyan-300 hover:border-white'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Marker Label */}
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 text-slate-200 pointer-events-none z-10 shadow">
                    <span className="font-bold">{s.alias}</span> ({s.matchScore}%)
                  </div>
                </div>
              );
            })}

            {/* HUD Header */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-cyan-300 font-bold">GRID SECTOR 07 - METRO NODE</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                ACTIVE CCTV FEED: <span className="text-emerald-400 font-bold">142 NODES</span>
              </div>
            </div>

            {/* Bottom Controls Indicator */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded border border-slate-800">
              <span>TARGET SELECTED: <strong className="text-red-400">{activeSuspect.name}</strong></span>
              <span className="text-cyan-400 font-bold">RE-ID ACCURACY: {activeSuspect.matchScore}%</span>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">FACIAL MATCHES</div>
              <div className="text-lg font-bold text-cyan-400">1,482</div>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">ALERT STATUS</div>
              <div className="text-lg font-bold text-red-400">CRITICAL</div>
            </div>
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">EST. TRAJECTORY</div>
              <div className="text-lg font-bold text-emerald-400">92% CONF.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Suspect Profile & Movement Timeline */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Live CCTV Video Feed & Suspect Profile Card */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" /> RE-ID CCTV FEED & DOSSIER
              </span>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30 font-bold">
                {activeSuspect.threatLevel} THREAT
              </span>
            </div>

            {/* Live CCTV Camera Feed Box for Selected Suspect */}
            <div className="relative aspect-video rounded-lg bg-slate-950 border border-cyan-500/40 overflow-hidden shadow-lg">
              <video
                key={activeSuspect.cctvVideoUrl}
                src={activeSuspect.cctvVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />

              {/* Bounding Box on Suspect */}
              <div className="absolute top-1/4 left-1/3 w-20 h-24 border-2 border-red-500 bg-red-500/20 rounded shadow-[0_0_15px_rgba(239,68,68,0.5)] flex flex-col justify-between p-1">
                <div className="text-[9px] font-mono bg-slate-950 text-red-400 font-bold px-1 py-0.2 rounded w-fit">
                  {activeSuspect.alias}
                </div>
                <div className="text-[9px] font-mono bg-slate-950 text-emerald-400 font-bold px-1 py-0.2 rounded w-fit self-end">
                  {activeSuspect.matchScore}%
                </div>
              </div>

              {/* Top Camera Label HUD */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono bg-slate-950/80 backdrop-blur px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <Video className="w-3 h-3" /> CCTV NODE #12
                </span>
                <span className="text-emerald-400 font-bold">MATCH: {activeSuspect.matchScore}%</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="space-y-0.5 font-sans">
                <h4 className="font-bold text-white text-sm">{activeSuspect.name}</h4>
                <p className="text-xs font-mono text-cyan-400">Alias: {activeSuspect.alias}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 font-mono pt-1">
                  <Clock className="w-3 h-3 text-emerald-400" /> {activeSuspect.lastSeenTime}
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-[10px] text-slate-400">LAST KNOWN LOCATION</div>
              <div className="text-slate-200 font-semibold">{activeSuspect.lastSeenLocation}</div>
            </div>
          </div>

          {/* Movement History Timeline */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> TIMELINE & CAMERA PINGS
            </h4>

            <div className="space-y-2.5 font-mono text-xs">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="flex gap-2.5 items-start text-[11px] border-l-2 border-cyan-500/40 pl-2.5">
                  <div>
                    <div className="text-slate-400 font-bold">[{evt.time}]</div>
                    <div className="text-slate-200">{evt.loc}</div>
                    <div className="text-emerald-400 text-[10px]">{evt.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
