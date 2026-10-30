import React from 'react';
import { EVALUATION_CRITERIA } from '@/lib/constants';
import { Award, Check, Sparkles } from 'lucide-react';

export default function EvaluationCriteriaSection() {
  const totalMarks = EVALUATION_CRITERIA.reduce((acc, curr) => acc + curr.maxScore, 0);

  return (
    <section id="evaluation" className="py-24 bg-[#090b0e] text-white relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/10 px-3.5 py-1 text-xs font-bold text-[#f59e0b] border border-[#f59e0b]/20 mb-4">
            <Award className="h-3.5 w-3.5" />
            <span>OBJECTIVE JURY RUBRIC</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            How Submissions Are Evaluated (100 Marks)
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            Jury members score every commercial across six standardized criteria. Total possible score is exactly 100 marks.
          </p>
        </div>

        {/* Evaluation Rubric Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVALUATION_CRITERIA.map((crit, idx) => (
            <div
              key={crit.id}
              className="rounded-2xl bg-zinc-950/80 p-6 border border-zinc-800/80 hover:border-[#ff5b26]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                    Criterion 0{idx + 1}
                  </span>
                  <div className="flex items-center gap-1 rounded-full bg-[#ff5b26]/20 px-3 py-1 text-xs font-black text-[#ff5b26] border border-[#ff5b26]/30">
                    <span>{crit.maxScore}</span>
                    <span className="text-[10px] text-zinc-400">Marks</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {crit.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {crit.description}
                </p>
              </div>

              {/* Score bar representation */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] h-full rounded-full"
                    style={{ width: `${(crit.maxScore / 20) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase mt-1.5">
                  <span>Weightage</span>
                  <span>{crit.maxScore}% of total</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grand Total Tally Callout */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-zinc-900 to-black p-6 border border-zinc-800 max-w-xl mx-auto flex items-center justify-between shadow-2xl">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Cumulative Jury Scoring</div>
            <div className="text-xl font-black text-white mt-0.5">Strict Total: 100 Marks</div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff5b26] text-2xl font-black text-white shadow-lg shadow-[#ff5b26]/30">
            100
          </div>
        </div>
      </div>
    </section>
  );
}
