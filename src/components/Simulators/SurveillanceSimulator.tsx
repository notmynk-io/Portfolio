import React, { useState, useEffect, useRef } from 'react';
import { Camera, ShieldAlert, Play, Pause, RefreshCw, Eye, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

interface Target {
  id: number;
  x: number; // %
  y: number; // %
  vx: number;
  vy: number;
  type: 'human' | 'wildlife' | 'vehicle' | 'friendly';
  label: string;
  confidence: number;
  speed: number;
}

export const SurveillanceSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [sensitivity, setSensitivity] = useState(85); // %
  const [activeCamera, setActiveCamera] = useState<'Cam 1 (North Border)' | 'Cam 2 (Wildlife Zone)' | 'Cam 3 (Perimeter Gate)'>('Cam 1 (North Border)');
  const [soundAlerts, setSoundAlerts] = useState(true);
  
  const [targets, setTargets] = useState<Target[]>([
    { id: 1, x: 25, y: 35, vx: 0.15, vy: 0.1, type: 'human', label: 'Unidentified Intruder', confidence: 0.94, speed: 1.2 },
    { id: 2, x: 70, y: 60, vx: -0.2, vy: 0.05, type: 'wildlife', label: 'Leopard / Wildlife', confidence: 0.89, speed: 2.1 },
    { id: 3, x: 45, y: 80, vx: 0.05, vy: -0.15, type: 'vehicle', label: 'Suspicious Offroad Vehicle', confidence: 0.96, speed: 3.5 },
  ]);

  const [logs, setLogs] = useState<Array<{ time: string; type: string; msg: string; status: 'danger' | 'warning' | 'info' }>>([
    { time: '21:14:02', type: 'YOLOv8', msg: 'Model loaded: custom_yolov8x_border.pt (CUDA GPU active)', status: 'info' },
    { time: '21:14:05', type: 'FastAPI', msg: 'Webhook endpoint listening on port 8000', status: 'info' },
    { time: '21:14:10', type: 'DETECTION', msg: 'Intruder detected @ Cam 1 (Sector B4) - Confidence 94%', status: 'danger' },
  ]);

  // Target animation loop
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTargets((prev) =>
        prev.map((t) => {
          let nx = t.x + t.vx * (t.speed * 0.5);
          let ny = t.y + t.vy * (t.speed * 0.5);
          let nvx = t.vx;
          let nvy = t.vy;

          if (nx < 10 || nx > 90) nvx = -nvx;
          if (ny < 15 || ny > 85) nvy = -nvy;

          return { ...t, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleAddTarget = (type: 'human' | 'wildlife' | 'vehicle') => {
    const labels = {
      human: 'Suspicious Person',
      wildlife: 'Wild Elephant / Panther',
      vehicle: 'Unregistered Truck'
    };
    const newTarget: Target = {
      id: Date.now(),
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      type,
      label: labels[type],
      confidence: parseFloat((0.85 + Math.random() * 0.14).toFixed(2)),
      speed: 1 + Math.random() * 2
    };

    setTargets((prev) => [...prev, newTarget]);

    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      {
        time: now,
        type: 'AI_TRIGGER',
        msg: `${labels[type]} spotted on ${activeCamera} (YOLOv8 confidence ${(newTarget.confidence * 100).toFixed(0)}%)`,
        status: type === 'human' || type === 'vehicle' ? 'danger' : 'warning'
      },
      ...prev.slice(0, 9)
    ]);
  };

  const handleClear = () => {
    setTargets([]);
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { time: now, type: 'SYSTEM', msg: 'Perimeter cleared by operator', status: 'info' },
      ...prev.slice(0, 9)
    ]);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              YOLOv8 + FastAPI Surveillance Live Monitor
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulates real-time video stream bounding-box detection, telemetry webhooks & perimeter response.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Pause Feed' : 'Resume Feed'}
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear Targets
          </button>
        </div>
      </div>

      {/* Main Grid: Camera View + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera View Box */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-2xl group">
            {/* Camera Overlay Grid & HUD */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
            
            {/* Top Bar HUD */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 text-xs font-mono bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-bold uppercase tracking-wider">LIVE STREAM</span>
                <span className="text-slate-400">| {activeCamera}</span>
              </div>
              <div className="text-slate-400">
                FPS: <span className="text-emerald-400 font-bold">59.8</span> | LATENCY: <span className="text-cyan-400 font-bold">18ms</span>
              </div>
            </div>

            {/* Target Bounding Boxes */}
            {targets.map((t) => {
              const colorMap = {
                human: 'border-red-500 bg-red-500/10 text-red-400',
                wildlife: 'border-amber-500 bg-amber-500/10 text-amber-400',
                vehicle: 'border-purple-500 bg-purple-500/10 text-purple-400',
                friendly: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
              };

              return (
                <div
                  key={t.id}
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 border-2 rounded transition-all duration-100 ${colorMap[t.type]}`}
                >
                  <div className="absolute -top-6 left-0 whitespace-nowrap bg-slate-950/90 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700 flex items-center gap-1 shadow">
                    <span className="font-bold">{t.label}</span>
                    <span className="text-emerald-400">{(t.confidence * 100).toFixed(0)}%</span>
                  </div>
                  {/* Bounding box corners */}
                  <div className="w-16 h-12 flex items-center justify-center">
                    <Eye className="w-5 h-5 opacity-80 animate-pulse" />
                  </div>
                </div>
              );
            })}

            {/* Target Spawn Interactive Click Area */}
            <div
              className="absolute inset-0 cursor-crosshair flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity bg-slate-950/20"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = ((e.clientX - rect.left) / rect.width) * 100;
                const clickY = ((e.clientY - rect.top) / rect.height) * 100;
                const newT: Target = {
                  id: Date.now(),
                  x: clickX,
                  y: clickY,
                  vx: (Math.random() - 0.5) * 0.3,
                  vy: (Math.random() - 0.5) * 0.3,
                  type: 'human',
                  label: 'Custom Click Target',
                  confidence: 0.92,
                  speed: 1.5,
                };
                setTargets((prev) => [...prev, newT]);
              }}
            >
              <p className="text-xs font-mono text-cyan-300 bg-slate-900/90 px-3 py-1 rounded-full border border-cyan-500/30">
                Click anywhere on video feed to spawn AI detection target
              </p>
            </div>

            {/* Bottom HUD */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/80 backdrop-blur px-3 py-1 rounded border border-slate-800">
              <div>ACTIVE TARGETS: <span className="text-white font-bold">{targets.length}</span></div>
              <div>MODEL: <span className="text-emerald-400">YOLOv8x-Custom</span></div>
              <div>FASTAPI STATUS: <span className="text-emerald-400">200 OK</span></div>
            </div>
          </div>

          {/* Quick Spawn Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium mr-1">Simulate Target:</span>
            <button
              onClick={() => handleAddTarget('human')}
              className="px-2.5 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded transition-colors"
            >
              + Human Intruder
            </button>
            <button
              onClick={() => handleAddTarget('wildlife')}
              className="px-2.5 py-1 text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded transition-colors"
            >
              + Wildlife Animal
            </button>
            <button
              onClick={() => handleAddTarget('vehicle')}
              className="px-2.5 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded transition-colors"
            >
              + Vehicle
            </button>
          </div>
        </div>

        {/* Sidebar Controls & Webhook Telemetry Log */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Settings */}
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Pipeline Configuration
            </h4>

            <div className="space-y-2 text-xs">
              <label className="text-slate-400 flex justify-between">
                <span>YOLO Detection Confidence Threshold</span>
                <span className="text-cyan-400 font-mono font-bold">{sensitivity}%</span>
              </label>
              <input
                type="range"
                min="50"
                max="98"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="text-slate-400 block">Camera Feed Source</label>
              <select
                value={activeCamera}
                onChange={(e) => setActiveCamera(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="Cam 1 (North Border)">Cam 1 (North Border)</option>
                <option value="Cam 2 (Wildlife Zone)">Cam 2 (Wildlife Zone)</option>
                <option value="Cam 3 (Perimeter Gate)">Cam 3 (Perimeter Gate)</option>
              </select>
            </div>
          </div>

          {/* Event Log Stream */}
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex-1 flex flex-col min-h-[180px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>FastAPI Webhook Logs</span>
              <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
              </span>
            </div>

            <div className="flex-1 font-mono text-[11px] space-y-1.5 overflow-y-auto max-h-[180px] pr-1">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-slate-800/60 pb-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>[{log.time}]</span>
                    <span
                      className={
                        log.status === 'danger'
                          ? 'text-red-400 font-bold'
                          : log.status === 'warning'
                          ? 'text-amber-400 font-bold'
                          : 'text-cyan-400'
                      }
                    >
                      {log.type}
                    </span>
                  </div>
                  <div className="text-slate-300 truncate">{log.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
