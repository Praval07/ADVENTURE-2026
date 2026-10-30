'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Phone, Building } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#090b0e] text-white relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3.5 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-4">
            <Mail className="h-3.5 w-3.5" />
            <span>CONNECT WITH ORGANIZERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Get In Touch With The Organizing Committee
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Have questions regarding team formation, camera verification, category fit, or college partnerships? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Institutional Contact Info Card */}
          <div className="rounded-2xl bg-zinc-900/80 p-8 border border-zinc-800 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff5b26]">
                Host Institution
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Pratapgarh, Uttar Pradesh – 230001, India
              </p>
            </div>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Joint Organizing Cells</span>
                  <span className="text-zinc-400 text-xs">
                    Institution’s Innovation Council (IIC) & Skill Development Cell (SDC)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#ff5b26] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Official Competition Email</span>
                  <a
                    href="mailto:iic.recpratapgarh@gmail.com"
                    className="text-[#ff5b26] hover:underline font-medium"
                  >
                    iic.recpratapgarh@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Campus Location</span>
                  <span className="text-zinc-400 text-xs">
                    NH 96, Chilbila, Pratapgarh District, Uttar Pradesh, PIN 230001
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-xs text-zinc-400 leading-relaxed">
              <span className="font-bold text-white block mb-1">Official Response SLA:</span>
              Inquiries submitted through this form or sent to <code className="text-[#ff5b26]">iic.recpratapgarh@gmail.com</code> are typically resolved within 24–48 hours by the faculty and student conveners.
            </div>
          </div>

          {/* Quick Query Form */}
          <div className="rounded-2xl bg-zinc-900/80 p-8 border border-zinc-800 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Transmitted!</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you for reaching out. The ADVENTURE 2026 organizing team will review your query and reply to {formData.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-[#ff5b26] hover:underline font-bold"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-base font-bold text-white mb-2">Send an Official Inquiry</h4>
                
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="aditi@recp.ac.in"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Subject / Query Track</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Team Formation / Live Camera / Video Guidelines"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] py-3 text-xs font-bold text-white shadow-lg shadow-[#ff5b26]/20 transition-all hover:scale-[1.01]"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Inquiry to IIC × SDC</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
