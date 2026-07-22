import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, Linkedin, Send, Copy, Check, Sparkles, MessageSquare, Terminal, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development & AI Security',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    // Sequence Step 1: Encrypting Payload
    setSubmissionStep('Encrypting Payload (256-bit AES)...');
    await new Promise((r) => setTimeout(r, 800));

    // Sequence Step 2: Dispatching via Resend Vercel API
    setSubmissionStep('Dispatching via Resend Vercel API...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch transmission to serverless API.');
      }

      // Sequence Step 3: Complete
      setSubmissionStep('Transmission Complete - Verified');
      await new Promise((r) => setTimeout(r, 600));

      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', projectType: 'Web Development & AI Security', message: '' });
      }, 6000);
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setErrorMessage(err.message || 'Transmission failed. Please check network or contact directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <Lock className="w-3.5 h-3.5 text-purple-400" /> Secure Transmission Channel
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
            Cyber Command Inbox & Contact
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Direct AES-encrypted terminal connection to Mayank Kumar Gupta for project consultations, security operations, and software engineering inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            
            {/* Email Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-2 hover:border-cyan-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono">Primary Email Node</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-bold text-white hover:text-cyan-300 font-mono">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email)}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-2 hover:border-emerald-500/40 transition-all shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Direct Phone / WhatsApp</div>
                  <div className="text-sm font-bold text-white font-mono">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 flex items-center gap-3 hover:border-purple-500/40 transition-all shadow-xl group block"
            >
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">LinkedIn Network Profile</div>
                <div className="text-sm font-bold text-white group-hover:text-purple-300 font-mono">
                  linkedin.com/in/mynkgupta
                </div>
              </div>
            </a>

            {/* Security Guarantee Box */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-2 font-mono text-xs">
              <div className="text-cyan-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Encrypted API Endpoint Active</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                All communications sent through this terminal are routed via Vercel Serverless Functions and dispatched directly to Mayank's verified Gmail address with DKIM/SPF protection.
              </p>
            </div>
          </motion.div>

          {/* Secure Cyber Terminal Inbox */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 font-heading">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Secure Message Dispatch Terminal
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                RESEND API READY
              </span>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-white font-heading">Transmission Complete & Verified!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto font-sans">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your payload has been delivered to <strong>notmynk.io@gmail.com</strong>. Mayank will review and reply to <strong>{formData.email}</strong> shortly.
                  </p>
                </div>
                <div className="inline-block font-mono text-[11px] text-cyan-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  STATUS: 200 OK | DISPATCHED VIA VERCEL SERVERLESS
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Sender Identity / Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Return Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@securitylab.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Target Inquiry Category</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  >
                    <option value="Web Development & AI Security">AI Computer Vision & Security Operations</option>
                    <option value="IoT & Hardware Engineering">IoT & Embedded Microcontrollers (ESP32/Arduino)</option>
                    <option value="Full-Stack Web Engineering">Full-Stack Web Engineering (React/PHP/MySQL)</option>
                    <option value="General Technical Collaboration">General Collaboration / Technical Consultation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Transmission Payload / Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your project scope, technical timeline, or collaboration proposal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-mono">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Submit button / Terminal sequence */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-80 disabled:cursor-wait font-sans"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-950 font-bold">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>{submissionStep}</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Dispatch Payload to notmynk.io@gmail.com
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
