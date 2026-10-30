import React from 'react';
import { Sparkles, Target, Zap, Shield, Rocket, CheckCircle2, Award } from 'lucide-react';

export default function AboutSection() {
  const pillars = [
    {
      icon: Target,
      title: 'Real Commercial Context',
      desc: 'Move beyond theoretical slide decks. Discover genuine local merchants, traditional artisans, or ambitious college ventures and translate their value into a real advertisement.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Zap,
      title: 'High-Impact 30–90s Storytelling',
      desc: 'In today’s digital era, market attention is won or lost in seconds. Master hook formulation, visual tempo, emotional resonance, and high-conversion calls to action.',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: Rocket,
      title: 'Hands-on Production Skills',
      desc: 'Build creative muscle across scriptwriting, cinematography, sound design, color grading, and commercial marketing strategy with peers.',
      color: 'from-rose-500 to-orange-500',
    },
    {
      icon: Award,
      title: 'National Credentials & Jury Review',
      desc: 'Have your creation critiqued by distinguished angel investors, startup founders, and marketing heads, backed by official IIC and SDC certification.',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0d0f12] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3.5 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE CHALLENGE MISSION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Bridging Student Innovation With Cinematic Commercial Mastery
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            ADVENTURE 2026 is an initiative by the Institution’s Innovation Council (IIC) and Skill Development Cell (SDC) at Bharat Ratna Babasaheb Bhimrao Ambedkar REC, Pratapgarh. We believe every great venture deserves an unforgettable story.
          </p>
        </div>

        {/* 4 Mission Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl bg-zinc-900/60 p-6 border border-zinc-800/80 hover:border-[#ff5b26]/40 transition-all hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${pillar.color} shadow-lg shadow-black/40 mb-5`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ff5b26] transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Eligibility & Team Matrix Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 p-8 border border-zinc-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b]">
                Eligibility & Formation
              </span>
              <h3 className="text-2xl font-black text-white">
                Who Can Compete in ADVENTURE 2026?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Open to all undergraduate, diploma, postgraduate, and engineering students across India. You do not need expensive cinema cameras — smartphones with good lighting and creative sound design can produce winning commercials!
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#ff5b26] shrink-0" />
                  <span>Team Size: Strictly 2 to 4 student members</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#ff5b26] shrink-0" />
                  <span>Inter-department & multi-year teams welcomed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#ff5b26] shrink-0" />
                  <span>Verified live identity photo capture required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#ff5b26] shrink-0" />
                  <span>Free registration — Zero participation fee</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-black/60 p-6 border border-zinc-800 text-center space-y-3">
              <div className="text-4xl font-black text-[#ff5b26]">₹0</div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">Free Registration</div>
              <p className="text-[11px] text-zinc-400">
                Supported by Ministry of Education IIC mandate to foster grassroots innovation and media entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
