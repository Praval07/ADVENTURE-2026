import React from 'react';
import { OFFICIAL_TIMELINE } from '@/lib/constants';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 bg-[#090b0e] text-white relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3.5 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-4">
            <Calendar className="h-3.5 w-3.5" />
            <span>OFFICIAL ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Important Dates & Milestones
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Keep track of all key dates. Dates are centrally managed and non-negotiable for video screening.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto space-y-6">
          {OFFICIAL_TIMELINE.map((item, idx) => {
            const isActive = item.status === 'active';
            return (
              <div
                key={item.id}
                className={`relative rounded-2xl p-6 sm:p-7 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
                  isActive
                    ? 'bg-zinc-900 border-2 border-[#ff5b26] shadow-xl shadow-[#ff5b26]/10'
                    : 'bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono font-bold text-base ${
                    isActive ? 'bg-[#ff5b26] text-white' : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-bold text-white">
                        {item.activity}
                      </h3>
                      {isActive && (
                        <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Live Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-[#f59e0b]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 font-medium mt-1">
                    IST (Indian Standard Time)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
