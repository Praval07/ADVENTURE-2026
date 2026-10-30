'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COMPETITION_CATEGORIES } from '@/lib/constants';
import { 
  Store, 
  Rocket, 
  Landmark, 
  UtensilsCrossed, 
  GraduationCap, 
  HeartHandshake, 
  Lightbulb, 
  Target,
  ArrowRight,
  Sparkles,
  Tag
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Store,
  Rocket,
  Landmark,
  UtensilsCrossed,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Target,
};

export default function CategoriesSection() {
  const [selectedCat, setSelectedCat] = useState<string>(COMPETITION_CATEGORIES[0].id);

  return (
    <section id="categories" className="py-24 bg-[#090b0e] text-white relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/10 px-3.5 py-1 text-xs font-bold text-[#f59e0b] border border-[#f59e0b]/20 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>8 COMPETITION TRACKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Choose Your Storytelling Canvas
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every team registers under one of eight official tracks. Pick a category that resonates with your entrepreneurial curiosity and commercial storytelling style.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPETITION_CATEGORIES.map((cat, idx) => {
            const Icon = ICON_MAP[cat.icon] || Store;
            const isSelected = selectedCat === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-zinc-900 border-2 border-[#ff5b26] shadow-xl shadow-[#ff5b26]/10 scale-[1.02]' 
                    : 'bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 font-bold">
                      TRACK 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-medium text-[#f59e0b] mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-2">
                    Ideas & Examples:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.examples.slice(0, 2).map((ex, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] bg-zinc-800/90 text-zinc-300 px-2 py-0.5 rounded-md font-medium"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for Category Selection */}
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-[#ff5b26]/20 transition-all hover:scale-105"
          >
            <span>Register Under Your Chosen Category</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
