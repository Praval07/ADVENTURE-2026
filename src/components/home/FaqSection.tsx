'use client';

import React, { useState } from 'react';
import { FAQS } from '@/lib/constants';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 bg-[#0d0f12] text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3.5 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>ANSWERS & ASSISTANCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Everything you need to know about team eligibility, mandatory camera verification, video specs, and scoring.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4">
                    {faq.q}
                  </span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#ff5b26] text-white' : ''}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/50 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
