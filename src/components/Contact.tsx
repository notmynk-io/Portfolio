import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, Linkedin, Send, Copy, Check, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        throw new Error(data.error || 'Failed to dispatch message to server.');
      }

      setIsSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', projectType: 'Web Development', message: '' });
      }, 5000);
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setErrorMessage(err.message || 'An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

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
            <MessageSquare className="w-3.5 h-3.5" /> Start A Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch With Mayank
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Have a web development project, IoT embedded solution, or AI vision prototype in mind? Let's discuss requirements and turn your ideas into reality.
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
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-2 hover:border-cyan-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Email</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-bold text-white hover:text-cyan-300 font-mono">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email)}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-2 hover:border-emerald-500/40 transition-all shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Phone / WhatsApp</div>
                  <div className="text-sm font-bold text-white font-mono">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 flex items-center gap-3 hover:border-purple-500/40 transition-all shadow-xl group block"
            >
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">LinkedIn Network</div>
                <div className="text-sm font-bold text-white group-hover:text-purple-300 font-mono">
                  linkedin.com/in/mynkgupta
                </div>
              </div>
            </a>

            {/* Availability Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Freelance Services Offered:</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4">
                <li>Full-Stack Web Portals (PHP, MySQL, React)</li>
                <li>Custom IoT Microcontroller Solutions (ESP32/Arduino)</li>
                <li>AI YOLOv8 Computer Vision Pipelines & FastAPI</li>
                <li>Custom Dynamic E-Commerce & Client Dashboards</li>
              </ul>
            </div>
          </motion.div>

          {/* Project Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-900/90 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6"
          >
            <h3 className="text-xl font-bold text-white tracking-tight">Send a Direct Project Inquiry</h3>

            {isSubmitted ? (
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-3">
                <Sparkles className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Message Transmitted Successfully!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out, {formData.name}. Mayank will review your project details and respond shortly to <strong>{formData.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Project Category</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="Web Development">Full-Stack Web Development (PHP/MySQL/React)</option>
                    <option value="IoT & Hardware">IoT & Embedded Systems Prototype (ESP32/Sensors)</option>
                    <option value="AI Computer Vision">AI Computer Vision / YOLOv8 Pipeline</option>
                    <option value="General Technical Inquiry">General Collaboration / Technical Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Project Scope & Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your requirements, timeline, or project goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 font-mono">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Dispatching to Server...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Dispatch Message to Mayank
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

