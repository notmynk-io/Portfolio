import React, { useState, useEffect } from 'react';
import { ShieldAlert, Play, Pause, RefreshCw, Eye, Zap, Camera, Video } from 'lucide-react';

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
  const [activeCamKey, setActiveCamKey] = useState<string>('cam1');
  
  // Camera video sources fitting security & surveillance themes
  const cameraFeeds: Record<string, { label: string; url: string; sector: string }> = {
    cam1: {
      label: 'Cam 1 (North Border Patrol)',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      sector: 'Sector B4 - Perimeter Fence',
    },
    cam2: {
      label: 'Cam 2 (Wildlife Sanctuary)',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      sector: 'Sector W12 - Forest Buffer',
    },
    cam3: {
      label: 'Cam 3 (Main Checkpoint Gate)',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      sector: 'Sector G01 - Main Entrance',
    },
  };

  const currentFeed = cameraFeeds[activeCamKey] || cameraFeeds['cam1'];

  const [targets, setTargets] = useState<Target[]>([
    { id: 1, x: 28, y: 38, vx: 0.15, vy: 0.08, type: 'human', label: 'Unidentified Intruder', confidence: 0.94, speed: 1.2 },
    { id: 2, x: 68, y: 58, vx: -0.18, vy: 0.05, type: 'wildlife', label: 'Leopard / Wildlife', confidence: 0.89, speed: 2.1 },
    { id: 3, x: 48, y: 75, vx: 0.05, vy: -0.12, type: 'vehicle', label: 'Suspicious Offroad Vehicle', confidence: 0.96, speed: 3.5 },
  ]);

  const [logs, setLogs] = useState<Array<{ time: string; type: string; msg: string; status: 'danger' | 'warning' | 'info' }>>([
    { time: '21:14:02', type: 'YOLOv8', msg: 'Model loaded: custom_yolov8x_border.pt (CUDA GPU active)', status: 'info' },
    { time: '21:14:05', type: 'FastAPI', msg: 'Camera stream decoded at 1080p @ 60 FPS', status: 'info' },
    { time: '21:14:10', type: 'DETECTION', msg: `Intruder detected @ ${currentFeed.label} - Confidence 94%`, status: 'danger' },
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

          if (nx < 12 || nx > 88) nvx = -nvx;
          if (ny < 18 || ny > 82) nvy = -nvy;

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
      vehicle: 'Unregistered Vehicle',
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
      speed: 1 + Math.random() * 2,
    };

    setTargets((prev) => [...prev, newTarget]);

    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      {
        time: now,
        type: 'AI_TRIGGER',
        msg: `${labels[type]} spotted on ${currentFeed.label} (YOLOv8 confidence ${(newTarget.confidence * 100).toFixed(0)}%)`,
        status: type === 'human' || type === 'vehicle' ? 'danger' : 'warning',
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleClear = () => {
    setTargets([]);
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { time: now, type: 'SYSTEM', msg: 'Perimeter cleared by operator', status: 'info' },
      ...prev.slice(0, 9),
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
              YOLOv8 + FastAPI Security Camera Stream
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real camera video source with live AI bounding box detection, telemetry webhooks & perimeter analytics.
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
            {isRunning ? 'Pause Video Stream' : 'Play Video Stream'}
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear Targets
          </button>
        </div>
      </div>

      {/* Main Grid: Live Camera Stream + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed Stream Box */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-video bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-2xl group">
            
            {/* REAL DEMO VIDEO STREAM */}
            <video
              key={currentFeed.url}
              src={currentFeed.url}
              autoPlay={isRunning}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />

            {/* Scanline CRT Texture & HUD overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-cyan-950/20 pointer-events-none" />

            {/* Top Bar HUD Overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 text-xs font-mono bg-slate-950/85 backdrop-blur px-3 py-1.5 rounded border border-slate-800/80 shadow">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> LIVE CCTV
                </span>
                <span className="text-slate-300">| {currentFeed.label}</span>
              </div>
              <div className="text-slate-400 hidden sm:block">
                FPS: <span className="text-emerald-400 font-bold">60.0</span> | LATENCY: <span className="text-cyan-400 font-bold">14ms</span>
              </div>
            </div>

            {/* YOLO Target Bounding Boxes Overlaid directly on Video */}
            {targets.map((t) => {
              const colorMap = {
                human: 'border-red-500 bg-red-500/15 text-red-400 shadow-red-500/20',
                wildlife: 'border-amber-500 bg-amber-500/15 text-amber-400 shadow-amber-500/20',
                vehicle: 'border-purple-500 bg-purple-500/15 text-purple-400 shadow-purple-500/20',
                friendly: 'border-emerald-500 bg-emerald-500/15 text-emerald-400 shadow-emerald-500/20',
              };

              return (
                <div
                  key={t.id}
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 border-2 rounded transition-all duration-100 z-10 ${colorMap[t.type]} shadow-lg`}
                >
                  <div className="absolute -top-7 left-0 whitespace-nowrap bg-slate-950/95 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1.5 shadow-md z-20">
                    <span className="font-bold text-white">{t.label}</span>
                    <span className="text-emerald-400 font-bold">{(t.confidence * 100).toFixed(0)}%</span>
                  </div>
                  {/* Bounding Box Corner Target reticle */}
                  <div className="w-16 h-12 flex items-center justify-center relative">
                    <Eye className="w-5 h-5 opacity-90 animate-pulse text-white" />
                  </div>
                </div>
              );
            })}

            {/* Target Spawn Interactive Click Overlay */}
            <div
              className="absolute inset-0 cursor-crosshair flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity bg-slate-950/30 z-20"
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
                  label: 'Click Spawn Target',
                  confidence: 0.93,
                  speed: 1.4,
                };
                setTargets((prev) => [...prev, newT]);
              }}
            >
              <p className="text-xs font-mono text-cyan-300 bg-slate-900/90 px-3 py-1 rounded-full border border-cyan-500/40 shadow-xl">
                Click anywhere on live video to spawn AI bounding box
              </p>
            </div>

            {/* Bottom HUD Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-950/85 backdrop-blur px-3 py-1.5 rounded border border-slate-800 z-20 shadow">
              <div>TARGETS IN FRAME: <span className="text-white font-bold">{targets.length}</span></div>
              <div className="hidden sm:block">SECTOR: <span className="text-cyan-400 font-bold">{currentFeed.sector}</span></div>
              <div>MODEL: <span className="text-emerald-400 font-bold">YOLOv8x CUDA</span></div>
            </div>
          </div>

          {/* Quick Spawn Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-medium mr-1 font-mono">Inject Target:</span>
            <button
              onClick={() => handleAddTarget('human')}
              className="px-2.5 py-1 text-xs font-mono bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded transition-colors"
            >
              + Human Intruder
            </button>
            <button
              onClick={() => handleAddTarget('wildlife')}
              className="px-2.5 py-1 text-xs font-mono bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded transition-colors"
            >
              + Wildlife Animal
            </button>
            <button
              onClick={() => handleAddTarget('vehicle')}
              className="px-2.5 py-1 text-xs font-mono bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded transition-colors"
            >
              + Vehicle
            </button>
          </div>
        </div>

        {/* Sidebar Controls & Webhook Telemetry Log */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Camera Feed Selector */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3 shadow-lg">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
              <Camera className="w-3.5 h-3.5 text-cyan-400" /> Live Video Source
            </h4>

            <div className="space-y-1.5 text-xs font-mono">
              <label className="text-slate-400 block">Select CCTV Camera Feed</label>
              <select
                value={activeCamKey}
                onChange={(e) => setActiveCamKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="cam1">Cam 1 - North Border Patrol</option>
                <option value="cam2">Cam 2 - Wildlife Sanctuary Zone</option>
                <option value="cam3">Cam 3 - Main Checkpoint Gate</option>
              </select>
            </div>

            <div className="space-y-1 text-xs font-mono pt-1">
              <label className="text-slate-400 flex justify-between">
                <span>Detection Confidence</span>
                <span className="text-cyan-400 font-bold">{sensitivity}%</span>
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
          </div>

          {/* Event Log Stream */}
          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 flex-1 flex flex-col min-h-[190px] shadow-lg">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between border-b border-slate-800 pb-2">
              <span>FastAPI Webhook Logs</span>
              <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
              </span>
            </div>

            <div className="flex-1 font-mono text-[11px] space-y-2 overflow-y-auto max-h-[180px] pr-1">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-slate-800/60 pb-1.5">
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
                  <div className="text-slate-300 truncate text-[11px] mt-0.5">{log.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
