import React from 'react';
import { Camera, Film, Send, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProcessSection() {
  const steps = [
    {
      step: '01',
      icon: Camera,
      title: 'Register & Live Photo Verification',
      desc: 'Form a team of 2 to 4 students. The team leader completes browser-based live face capture for strict participant authenticity.',
      badge: 'Step 1 • Identity',
    },
    {
      step: '02',
      icon: Film,
      title: 'Business Discovery & Scripting',
      desc: 'Select 1 of 8 competition tracks. Interview your merchant or define your startup value proposition. Draft a snappy 30–90s storyboard.',
      badge: 'Step 2 • Pre-Production',
    },
    {
      step: '03',
      icon: Send,
      title: 'Shoot & Upload Ad Film (MP4)',
      desc: 'Film your commercial using mobile or digital camera. Edit with engaging audio & subtitles. Upload the MP4 file before 12 November deadline.',
      badge: 'Step 3 • Production',
    },
    {
      step: '04',
      icon: Trophy,
      title: 'Jury Evaluation & Grand Felicitation',
      desc: 'Independent jury scores your commercial out of 100 marks across 6 criteria. Top films earn awards and QR-verified certificates.',
      badge: 'Step 4 • Results',
    },
  ];

  return (
    <section className="py-24 bg-[#0d0f12] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff5b26] block mb-2">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Your 4-Stage Journey From Idea To National Recognition
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            A structured, transparent competition workflow designed to test real entrepreneurial creativity.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i} 
                className="relative rounded-2xl bg-zinc-900/60 p-6 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black font-mono text-[#ff5b26]">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-full">
                      {st.badge}
                    </span>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-[#ff5b26]/20 to-[#f59e0b]/20 border border-[#ff5b26]/30 mb-4">
                    <Icon className="h-6 w-6 text-[#ff5b26]" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-[#ff5b26]/20 hover:scale-105 transition-all"
          >
            <span>Start Stage 1: Team Registration</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
