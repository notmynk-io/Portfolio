import React, { useState, useEffect, useRef } from 'react';
import { Radar, Lock, Unlock, Sliders, Cpu, Play, Pause, AlertCircle, RefreshCw } from 'lucide-react';

interface DetectedObstacle {
  angle: number; // degrees
  distance: number; // cm
  time: number;
}

export const RadarSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSweeping, setIsSweeping] = useState(true);
  const [sweepAngle, setSweepAngle] = useState(0); // 0 to 180 degrees
  const [sweepDirection, setSweepDirection] = useState<1 | -1>(1);
  const [maxDistance, setMaxDistance] = useState(100); // cm
  const [lockTarget, setLockTarget] = useState<DetectedObstacle | null>(null);
  const [autoLockMode, setAutoLockMode] = useState(true);
  const [sweepSpeed, setSweepSpeed] = useState(2);

  // Simulated static obstacle targets
  const [obstacles, setObstacles] = useState<Array<{ angle: number; distance: number }>>([
    { angle: 45, distance: 35 },
    { angle: 90, distance: 60 },
    { angle: 135, distance: 25 },
  ]);

  const [serialLog, setSerialLog] = useState<string[]>([
    '[ESP32 Boot] Ultrasonic Sonar Initialized on Pins TRIG:12, ECHO:14',
    '[Servo Core] Pan Servo Homing to 0°...',
    '[System Ready] Sweep range: 0° -> 180°, Telemetry active',
  ]);

  // Sweep animation step
  useEffect(() => {
    if (!isSweeping) return;

    const timer = setInterval(() => {
      setSweepAngle((prev) => {
        let next = prev + sweepDirection * sweepSpeed;
        if (next >= 180) {
          setSweepDirection(-1);
          next = 180;
        } else if (next <= 0) {
          setSweepDirection(1);
          next = 0;
        }

        // Check if any obstacle is hit during sweep
        obstacles.forEach((obs) => {
          if (Math.abs(obs.angle - next) < sweepSpeed * 1.5) {
            const now = new Date().toLocaleTimeString();
            const logMsg = `[SONAR PING] Angle: ${Math.round(next)}° | Dist: ${obs.distance}cm ${
              obs.distance < 40 ? '-> [TRIGGER LOCK]' : ''
            }`;

            setSerialLog((logs) => [logMsg, ...logs.slice(0, 8)]);

            if (autoLockMode && obs.distance < 45) {
              setLockTarget({ angle: obs.angle, distance: obs.distance, time: Date.now() });
            }
          }
        });

        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [isSweeping, sweepDirection, sweepSpeed, obstacles, autoLockMode]);

  // Draw Radar Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 400);
    const height = (canvas.height = 240);
    const centerX = width / 2;
    const centerY = height - 20;
    const radius = Math.min(centerX - 20, centerY - 20);

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Radar Background semi-circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.fillStyle = '#020617';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#1e293b';
    ctx.stroke();

    // Concentric grid circles (25%, 50%, 75%, 100%)
    [0.25, 0.5, 0.75, 1.0].forEach((ratio) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * ratio, Math.PI, 2 * Math.PI);
      ctx.strokeStyle = '#0f172a';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Distance label
      ctx.fillStyle = '#475569';
      ctx.font = '10px monospace';
      ctx.fillText(`${Math.round(maxDistance * ratio)}cm`, centerX + 5, centerY - radius * ratio + 10);
    });

    // Angle grid lines (0°, 30°, 60°, 90°, 120°, 150°, 180°)
    [0, 30, 60, 90, 120, 150, 180].forEach((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x = centerX - radius * Math.cos(rad);
      const y = centerY - radius * Math.sin(rad);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#1e293b';
      ctx.stroke();

      // Angle label
      const labelX = centerX - (radius + 14) * Math.cos(rad);
      const labelY = centerY - (radius + 14) * Math.sin(rad);
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`${deg}°`, labelX - 8, labelY + 4);
    });

    // Draw obstacle blips
    obstacles.forEach((obs) => {
      const rad = (obs.angle * Math.PI) / 180;
      const distRatio = Math.min(obs.distance / maxDistance, 1);
      const ox = centerX - radius * distRatio * Math.cos(rad);
      const oy = centerY - radius * distRatio * Math.sin(rad);

      ctx.beginPath();
      ctx.arc(ox, oy, 6, 0, Math.PI * 2);
      ctx.fillStyle = obs.distance < 40 ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 158, 11, 0.8)';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw Radar Sweep Line & Cone Fade
    const currentRad = (sweepAngle * Math.PI) / 180;
    const sweepX = centerX - radius * Math.cos(currentRad);
    const sweepY = centerY - radius * Math.sin(currentRad);

    // Sweep cone gradient
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    const prevRad = currentRad - (sweepDirection * 0.25);
    ctx.arc(centerX, centerY, radius, Math.PI + prevRad, Math.PI + currentRad, sweepDirection < 0);
    ctx.closePath();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.fill();

    // Main sweep vector
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(sweepX, sweepY);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Lock Target indicator if active
    if (lockTarget) {
      const lockRad = (lockTarget.angle * Math.PI) / 180;
      const lockRatio = Math.min(lockTarget.distance / maxDistance, 1);
      const lx = centerX - radius * lockRatio * Math.cos(lockRad);
      const ly = centerY - radius * lockRatio * Math.sin(lockRad);

      ctx.beginPath();
      ctx.arc(lx, ly, 12, 0, Math.PI * 2);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([2, 2]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [sweepAngle, obstacles, maxDistance, lockTarget, sweepDirection]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height - 20;

    const dx = centerX - clickX;
    const dy = centerY - clickY;
    const distPx = Math.sqrt(dx * dx + dy * dy);
    const radius = Math.min(centerX - 20, centerY - 20);

    if (distPx <= radius && dy >= 0) {
      const angleRad = Math.atan2(dy, dx);
      let angleDeg = Math.round((angleRad * 180) / Math.PI);
      if (angleDeg < 0) angleDeg += 360;

      const calcDist = Math.round((distPx / radius) * maxDistance);

      const newObs = { angle: angleDeg, distance: Math.max(10, calcDist) };
      setObstacles((prev) => [...prev, newObs]);

      const now = new Date().toLocaleTimeString();
      setSerialLog((logs) => [
        `[USER OBSTACLE] Plotted Target @ ${angleDeg}° (${calcDist}cm)`,
        ...logs.slice(0, 8),
      ]);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radar className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Autonomous Radar Sonar & Fire Control Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulates ESP32/Arduino ultrasonic distance scanning, servo sweep angular telemetry & target lock-on.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSweeping(!isSweeping)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isSweeping
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {isSweeping ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isSweeping ? 'Pause Sweep' : 'Start Sweep'}
          </button>
          <button
            onClick={() => {
              setObstacles([]);
              setLockTarget(null);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Sonar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Display Canvas */}
        <div className="lg:col-span-2 space-y-3 flex flex-col items-center">
          <div className="relative bg-slate-900 rounded-lg p-3 border border-slate-800 shadow-2xl w-full flex flex-col items-center">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="cursor-crosshair max-w-full rounded border border-slate-800/80 bg-slate-950"
            />
            <p className="text-[11px] font-mono text-slate-400 mt-2 text-center">
              Click anywhere on radar grid to place a target obstacle
            </p>

            {/* Radar Telemetry Bar */}
            <div className="w-full mt-3 grid grid-cols-3 gap-2 text-center text-xs font-mono bg-slate-950 p-2 rounded border border-slate-800">
              <div className="border-r border-slate-800">
                SWEEP ANGLE: <span className="text-emerald-400 font-bold">{Math.round(sweepAngle)}°</span>
              </div>
              <div className="border-r border-slate-800">
                TARGETS PLOTTED: <span className="text-cyan-400 font-bold">{obstacles.length}</span>
              </div>
              <div>
                LOCK STATE:{' '}
                {lockTarget ? (
                  <span className="text-red-400 font-bold animate-pulse">LOCKED ({lockTarget.angle}° / {lockTarget.distance}cm)</span>
                ) : (
                  <span className="text-slate-500">SEARCHING</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Servo & Serial Terminal Sidebar */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Servo & Sonar Parameters
            </h4>

            <div className="space-y-1">
              <label className="text-slate-400 flex justify-between">
                <span>Sweep Speed (Deg / Step)</span>
                <span className="text-emerald-400 font-mono font-bold">{sweepSpeed}°</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={sweepSpeed}
                onChange={(e) => setSweepSpeed(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 flex justify-between">
                <span>Ultrasonic Range (Max Distance)</span>
                <span className="text-cyan-400 font-mono font-bold">{maxDistance} cm</span>
              </label>
              <input
                type="range"
                min="50"
                max="200"
                step="10"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-slate-300">Auto Target Lock (&lt;40cm)</span>
              <button
                onClick={() => setAutoLockMode(!autoLockMode)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-colors ${
                  autoLockMode
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {autoLockMode ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                {autoLockMode ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>

          {/* ESP32 Serial Monitor */}
          <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex-1 flex flex-col min-h-[160px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> ESP32 Serial Monitor (115200 baud)
              </span>
            </div>

            <div className="flex-1 font-mono text-[10px] space-y-1 overflow-y-auto max-h-[160px] text-slate-300 pr-1">
              {serialLog.map((log, idx) => (
                <div key={idx} className="border-b border-slate-800/40 pb-0.5">
                  <span className="text-slate-500">&gt; </span>
                  <span className={log.includes('LOCKED') || log.includes('TRIGGER') ? 'text-red-400 font-bold' : log.includes('PING') ? 'text-emerald-400' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
