'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Award, Users, Film, CheckCircle2, Clock, Plus, ShieldCheck } from 'lucide-react';

export default function AdminJudgesPage() {
  const { submissions, evaluations } = useApp();

  const judgesList = [
    {
      id: 'judge-1',
      name: 'Dr. Kavita Verma',
      email: 'dr.kavita.verma@venturestudio.in',
      designation: 'Managing Partner',
      organization: 'Venture Studio Capital',
      assignedCount: submissions.length,
      completedCount: Object.keys(evaluations).length,
    },
    {
      id: 'judge-2',
      name: 'Mr. Sameer Sen',
      email: 'sameer.sen@filmmakersguild.org',
      designation: 'Senior Creative Director',
      organization: 'Ogilvy & National Film Guild',
      assignedCount: submissions.length,
      completedCount: 1,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
          <Award className="h-4 w-4" />
          <span>JURY & EVALUATION OVERSIGHT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Jury Management & Video Assignments
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Monitor jury evaluation progress across all 8 tracks. Evaluations are strictly scored out of 100 marks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {judgesList.map((j) => (
          <div
            key={j.id}
            className="rounded-2xl bg-zinc-900/80 p-6 border border-zinc-800 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f59e0b]/20 text-[#f59e0b] font-bold text-base border border-[#f59e0b]/30">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{j.name}</h3>
                  <p className="text-xs text-zinc-400">{j.designation} • {j.organization}</p>
                  <span className="text-[11px] text-zinc-500 font-mono">{j.email}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Evaluations Completed:</span>
                <span className="font-bold text-emerald-400 font-mono">{j.completedCount} / {j.assignedCount}</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all"
                  style={{ width: `${(j.completedCount / j.assignedCount) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" /> Active Panel Member
              </span>
              <span className="font-bold text-white bg-zinc-800 px-2.5 py-1 rounded-lg">
                6-Criteria Rubric Active
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
