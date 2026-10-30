import React from 'react';
import { PARTICIPATION_RULES } from '@/lib/constants';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function GuidelinesSection() {
  return (
    <section id="guidelines" className="py-24 bg-[#0d0f12] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3.5 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>SUBMISSION COMPLIANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Official Participation Rules & Constraints
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Every submission is screened against these mandatory parameters prior to jury evaluation.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTICIPATION_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-900/70 p-6 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#ff5b26] uppercase tracking-wider">
                    Rule #{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold bg-[#ff5b26]/20 text-[#ff5b26] px-2.5 py-0.5 rounded-full border border-[#ff5b26]/30">
                    {rule.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {rule.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {rule.detail}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Strictly Enforced</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-amber-950/30 border border-amber-800/50 p-5 flex items-start gap-4 max-w-3xl mx-auto">
          <AlertTriangle className="h-6 w-6 text-[#f59e0b] shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 space-y-1">
            <span className="font-bold text-white uppercase tracking-wider">
              Important Filming & Copyright Disclaimer:
            </span>
            <p>
              Ensure all background music has appropriate royalty-free licensing or written authorization. Filming on private commercial premises requires merchant consent. ADVENTURE 2026 upholds rigorous creative originality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
