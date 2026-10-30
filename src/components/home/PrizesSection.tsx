import React from 'react';
import { Trophy, Medal, Award, CheckCircle2, ShieldCheck, Sparkles, QrCode } from 'lucide-react';
import Link from 'next/link';

export default function PrizesSection() {
  const awards = [
    {
      title: 'Grand Champion (Winner)',
      badge: '1st Place • National Gold',
      icon: Trophy,
      color: 'from-amber-400 via-yellow-500 to-amber-600',
      border: 'border-yellow-500/50',
      textColor: 'text-yellow-400',
      benefits: [
        'Prestigious ADVENTURE 2026 Gold Trophy',
        'Official Certificate of Excellence endorsed by IIC × SDC',
        'National Media Feature on BRBBARECP portals',
        'Direct Incubation Mentorship & Seed Pitch Opportunity',
      ],
    },
    {
      title: 'First Runner-Up',
      badge: '2nd Place • National Silver',
      icon: Medal,
      color: 'from-slate-300 via-zinc-400 to-slate-500',
      border: 'border-slate-400/50',
      textColor: 'text-slate-300',
      benefits: [
        'ADVENTURE 2026 Silver Trophy',
        'Official Certificate of Excellence',
        'Featured Spotlight in Institution Annual Report',
        'Exclusive Industry Networking with Angel Investors',
      ],
    },
    {
      title: 'Second Runner-Up',
      badge: '3rd Place • National Bronze',
      icon: Award,
      color: 'from-amber-700 via-amber-800 to-amber-900',
      border: 'border-amber-700/50',
      textColor: 'text-amber-500',
      benefits: [
        'ADVENTURE 2026 Bronze Trophy',
        'Official Certificate of Excellence',
        'Campus Innovation Showcase & Digital Hall of Fame',
        'Product Strategy Consultation Session',
      ],
    },
  ];

  return (
    <section id="prizes" className="py-24 bg-[#0d0f12] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3.5 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-4">
            <Trophy className="h-3.5 w-3.5" />
            <span>RECOGNITION & HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Awards, Honors & Institutional Certification
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Recognizing exceptional student filmmakers and business visionaries with official trophies, certificates, and incubator exposure.
          </p>
        </div>

        {/* Top 3 Tiers */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, idx) => {
            const Icon = award.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl bg-zinc-900/80 p-8 border ${award.border} shadow-2xl flex flex-col justify-between hover:-translate-y-1 transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${award.color} text-black shadow-lg`}>
                      <Icon className="h-7 w-7 text-black" />
                    </div>
                    <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 ${award.textColor}`}>
                      {award.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-4">
                    {award.title}
                  </h3>

                  <ul className="space-y-3 text-xs text-zinc-300">
                    {award.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${award.textColor}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate Callout Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-zinc-900 via-[#181b22] to-zinc-900 p-8 border border-zinc-800 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                <QrCode className="h-4 w-4" />
                <span>Tamper-Proof Digital Verification</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Official QR-Coded Certificates for All Participants
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                Every verified student team that submits an approved commercial receives an official digital PDF certificate signed by BRBBARECP, IIC and SDC authorities, equipped with a scannable QR verification code.
              </p>
            </div>
            <Link
              href="/certificates/verify/ADV26-CERT-2026-8801"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-6 py-3 text-xs font-bold text-white border border-zinc-700 transition-all hover:scale-105"
            >
              <QrCode className="h-4 w-4 text-[#ff5b26]" />
              <span>Preview Verification Page</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
