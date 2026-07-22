import React, { useState } from 'react';
import { Activity, Bell, AlertTriangle, Battery, Navigation, Radio, Shield, Volume2 } from 'lucide-react';

export const BlindStickSimulator: React.FC = () => {
  const [distance, setDistance] = useState(85); // cm
  const [sosSent, setSosSent] = useState(false);
  const [batteryLevel] = useState(94); // %

  // Calculate pulse rate based on distance
  const getDangerLevel = (dist: number) => {
    if (dist < 30) return { level: 'DANGER', color: 'text-red-400 bg-red-500/10 border-red-500/30', hz: 'Continuous 800Hz Buzzer + Fast Haptic Pulse' };
    if (dist < 70) return { level: 'WARNING', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', hz: 'Intermittent 400Hz Buzzer + Medium Haptic Pulse' };
    return { level: 'SAFE', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', hz: 'Silent / Gentle Pulse' };
  };

  const status = getDangerLevel(distance);

  const handleSos = () => {
    setSosSent(true);
    setTimeout(() => {
      setSosSent(false);
    }, 4000);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Smart Blind Stick Hardware & Telemetry Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulates ultrasonic hazard proximity, haptic feedback frequency, and emergency GPS/GSM SOS dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
          <span className="flex items-center gap-1 text-emerald-400">
            <Battery className="w-4 h-4" /> {batteryLevel}% LiPo
          </span>
          <span>|</span>
          <span className="text-cyan-400 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5" /> ESP32 Bluetooth Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hardware Visual & Proximity Slider */}
        <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-800 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Obstacle Proximity Control</span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-mono border font-bold ${status.color}`}>
              {status.level} ZONE
            </span>
          </h4>

          {/* Interactive Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Simulated Obstacle Distance:</span>
              <span className="text-white font-bold text-sm">{distance} cm</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span className="text-red-400 font-bold">5cm (Danger)</span>
              <span className="text-amber-400">70cm (Warning)</span>
              <span className="text-emerald-400">200cm (Safe)</span>
            </div>
          </div>

          {/* Haptic & Sound Feedback Indicator */}
          <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-amber-400" /> Acoustic Feedback:
              </span>
              <span className="text-slate-400 text-[11px]">{status.hz}</span>
            </div>

            {/* Haptic Wave Pulse Bar */}
            <div className="pt-2">
              <div className="text-[11px] text-slate-400 mb-1">Haptic Grip Vibration Pulse:</div>
              <div className="h-3 bg-slate-900 rounded overflow-hidden flex items-center justify-center border border-slate-800 relative">
                {distance < 70 && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      distance < 30 ? 'from-red-600 to-amber-500 animate-pulse' : 'from-amber-500 to-emerald-500'
                    } opacity-60`}
                  />
                )}
                <span className="relative text-[10px] text-slate-200 font-bold">
                  {distance < 30 ? 'HIGH FREQUENCY SHAKE' : distance < 70 ? 'MODERATE PULSE' : 'IDLE'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SOS Panic Button & Emergency Dispatch Terminal */}
        <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center justify-between">
              <span>Emergency Panic System</span>
              <span className="text-red-400 text-[10px] font-mono">GSM/GPS Module</span>
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Holding the embedded tactile switch sends an instantaneous emergency alert containing live GPS coordinates (`23.3441° N, 85.3096° E`) to pre-configured family contacts.
            </p>

            <button
              onClick={handleSos}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${
                sosSent
                  ? 'bg-emerald-600 text-white animate-bounce'
                  : 'bg-red-600 hover:bg-red-500 text-white border border-red-400/30'
              }`}
            >
              <Bell className="w-4 h-4" />
              {sosSent ? 'Emergency SOS Sent via GSM!' : 'Simulate Emergency SOS Button'}
            </button>
          </div>

          {/* Emergency Logs */}
          <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-[11px] space-y-1.5 text-slate-300">
            <div className="text-[10px] text-slate-500 font-bold uppercase border-b border-slate-800 pb-1">
              Microcontroller Event Feed
            </div>
            {sosSent ? (
              <div className="text-emerald-400 font-bold space-y-0.5">
                <div>[GSM] Connecting to cellular tower...</div>
                <div>[GPS] Satellite Fix: Lat 23.3441° N, Lon 85.3096° E</div>
                <div>[SMS SENT] Alert dispatched to +91 97098 49242</div>
              </div>
            ) : (
              <div className="text-slate-400">
                <div>[SYSTEM] Sensor polling active @ 20Hz</div>
                <div>[ULTRASONIC] Echo return: {distance} cm</div>
                <div>[SOS] Panic button monitoring...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
