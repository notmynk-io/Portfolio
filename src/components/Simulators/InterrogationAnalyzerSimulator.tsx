import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain, Mic, Activity, Eye, ShieldAlert, Video, Camera, BarChart2 } from 'lucide-react';

export const InterrogationAnalyzerSimulator: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [lieProbability, setLieProbability] = useState(68);
  const [stressScore, setStressScore] = useState(82);
  const [confidenceScore, setConfidenceScore] = useState(94.2);
  const [activeSegment, setActiveSegment] = useState(2);

  // Video source of subject under video surveillance / facial analysis
  const interrogationVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4';

  const transcripts = [
    { time: '00:14', speaker: 'Investigator', text: 'Can you confirm your location on the night of the 14th between 22:00 and 01:00?', status: 'neutral' },
    { time: '00:21', speaker: 'Subject #04', text: 'I was at home alone... watching TV. I did not leave the apartment.', status: 'flagged', stress: 88, lieProb: 74, micro: 'Prolonged blinking & voice pitch spike' },
    { time: '00:35', speaker: 'Investigator', text: 'Traffic cameras registered your blue SUV near Sector 7 at 22:45.', status: 'neutral' },
    { time: '00:42', speaker: 'Subject #04', text: 'Oh, right... I lent the vehicle to a friend... I forgot.', status: 'critical', stress: 94, lieProb: 89, micro: 'Micro-expression: Lip compression & pupil dilation' },
  ];

  // Dynamic biomarker simulation loop
  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => {
      setLieProbability((prev) => Math.min(99, Math.max(40, prev + (Math.random() * 6 - 3))));
      setStressScore((prev) => Math.min(99, Math.max(50, prev + (Math.random() * 8 - 4))));
    }, 1500);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-6 text-slate-100 space-y-6 shadow-2xl">
      {/* Top Console Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white tracking-wide font-heading">
              AI Interrogation Micro-Expression & Lie Analyzer
            </h3>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Camera Feed with Real-time OpenCV Landmark Tracking & Pitch Biomarkers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAnalyzing(!isAnalyzing)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isAnalyzing
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            {isAnalyzing ? 'Analyzer Active' : 'Analyzer Paused'}
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Interrogation Camera Feed with Facial Landmark HUD */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Live Camera Video Player Box */}
          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl group">
            <video
              src={interrogationVideoUrl}
              autoPlay={isAnalyzing}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Simulated Facial Mesh / OpenCV Bounding Reticle Overlaid on Subject */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-36 h-44 border-2 border-purple-400/80 rounded-3xl relative shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-pulse">
                
                {/* Facial Mesh Landmarks */}
                <div className="absolute top-10 left-6 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <div className="absolute top-10 right-6 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <div className="absolute top-20 left-16 w-2.5 h-2.5 rounded-full bg-purple-400" />
                <div className="absolute bottom-10 left-10 right-10 h-1 bg-red-400/80 rounded" />

                {/* Micro-Expression Bounding Label */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 text-[10px] font-mono px-2 py-0.5 rounded border border-purple-500/40 text-purple-300 font-bold shadow">
                  AU12 LIP TENSION + PUPIL +38%
                </div>
              </div>
            </div>

            {/* Top Bar HUD */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono bg-slate-950/85 backdrop-blur px-2.5 py-1 rounded border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-bold uppercase flex items-center gap-1">
                  <Video className="w-3 h-3" /> CAM #04 ROOM B
                </span>
              </div>
              <span className="text-cyan-400 font-bold">OPENCV 68-PTS</span>
            </div>

            {/* Bottom Overlay Bar */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono bg-slate-950/85 backdrop-blur px-2.5 py-1 rounded border border-slate-800 text-slate-300">
              <span>DECEPTION: <strong className="text-purple-400">{lieProbability.toFixed(1)}%</strong></span>
              <span>STRESS: <strong className="text-amber-400">{stressScore.toFixed(0)}/100</strong></span>
            </div>
          </div>

          {/* Lie Probability Dial Card */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-slate-300">
                <ShieldAlert className="w-4 h-4 text-purple-400" /> DECEPTION INDEX
              </span>
              <span className="text-emerald-400 font-bold">ACCURACY: {confidenceScore}%</span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div className="space-y-1">
                <div className="text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                  {lieProbability.toFixed(1)}%
                </div>
                <div className="text-[11px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 inline-block font-semibold">
                  {lieProbability > 75 ? 'HIGH DECEPTION RISK' : 'ELEVATED STRESS'}
                </div>
              </div>

              {/* Graphical Gauge */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="#1e293b" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#a855f7"
                    strokeWidth="8"
                    strokeDasharray={200}
                    strokeDashoffset={200 - (200 * lieProbability) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute text-[10px] font-mono text-purple-300 font-bold">
                  {lieProbability > 70 ? 'LIE' : 'TRUTH'}
                </div>
              </div>
            </div>

            {/* Pitch Stress Bar */}
            <div className="space-y-1 pt-1 font-mono text-xs">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Micro-Voice Pitch Stress</span>
                <span className="text-amber-400 font-bold">{stressScore.toFixed(0)} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                  style={{ width: `${stressScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Audio Waveform Biomarkers */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Mic className="w-3.5 h-3.5" /> VOICE WAVEFORM BIOMARKERS
              </span>
              <span className="text-[10px] text-emerald-400">48kHz STEREO</span>
            </div>

            <div className="h-10 flex items-center justify-between gap-1 px-2 bg-slate-950 rounded border border-slate-800">
              {[30, 65, 45, 90, 20, 85, 100, 40, 75, 55, 95, 30, 60, 80, 45, 70, 90, 35, 80, 50, 95, 40].map(
                (h, idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      height: isAnalyzing ? [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] : `${h * 0.5}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: idx * 0.04,
                    }}
                    className="w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full"
                  />
                )
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Interrogation Speech Transcript & Micro-expression Logs */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-xl border border-slate-800 p-4 md:p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <h4 className="text-xs font-bold font-mono text-slate-300 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                TRANSCRIPT & AI ANOMALY DETECTION TIMELINE
              </h4>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                WHISPER AI + OPENCV
              </span>
            </div>

            {/* Transcript Cards */}
            <div className="space-y-3">
              {transcripts.map((t, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSegment(idx)}
                  className={`p-3 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                    activeSegment === idx
                      ? 'bg-slate-950 border-purple-500/50 shadow-lg shadow-purple-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                    <span className="font-bold text-slate-300">{t.speaker}</span>
                    <span className="text-slate-500">[{t.time}]</span>
                  </div>

                  <p className="text-slate-200 text-xs font-medium leading-relaxed">{t.text}</p>

                  {t.micro && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="text-red-400 flex items-center gap-1 font-semibold">
                        <Eye className="w-3 h-3" /> {t.micro}
                      </span>
                      <div className="flex gap-2">
                        <span className="text-amber-400">STRESS: {t.stress}%</span>
                        <span className="text-red-400 font-bold">LIE PROB: {t.lieProb}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Micro-Expression Diagnostic Card */}
          <div className="bg-slate-950 p-3 rounded-xl border border-purple-500/30 font-mono text-xs space-y-1.5">
            <div className="text-[10px] text-purple-400 font-bold flex items-center justify-between">
              <span>ACTIVE FORENSIC DIAGNOSTIC</span>
              <span className="text-emerald-400">FPS: 60.0</span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Micro-expression trigger logged at 00:42. Facial AU12 (Lip Corner Puller) suppressed within 120ms, accompanied by pupil dilation +38%. High probability of non-truthful response.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
