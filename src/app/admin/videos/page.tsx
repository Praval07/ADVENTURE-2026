'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Film, Play, CheckCircle2, Clock, AlertTriangle, Eye, ShieldCheck } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function AdminVideosPage() {
  const { submissions } = useApp();
  const [selectedVideo, setSelectedVideo] = useState<typeof submissions[0] | null>(null);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
          <Film className="h-4 w-4" />
          <span>SUBMISSION SCREENING</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Commercial Ad Film Submissions ({submissions.length})
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Review 30–90 second commercial videos, inspect technical parameters, and track jury scoring status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="rounded-2xl bg-zinc-900/80 p-6 border border-zinc-800 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#ff5b26]">{sub.submissionId}</span>
                <h3 className="text-base font-bold text-white mt-0.5">{sub.videoTitle}</h3>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border capitalize ${
                sub.status === 'evaluated'
                  ? 'bg-purple-950 text-purple-300 border-purple-800'
                  : 'bg-emerald-950 text-emerald-400 border-emerald-800'
              }`}>
                {sub.status.replace('_', ' ')}
              </span>
            </div>

            {/* Video Player Box */}
            <div className="rounded-xl overflow-hidden bg-black aspect-video border border-zinc-800 relative">
              <video
                controls
                src={sub.videoUrl}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Metadata Badges */}
            <div className="grid grid-cols-3 gap-2 text-xs bg-zinc-950 p-3 rounded-xl border border-zinc-800">
              <div>
                <span className="text-zinc-500 block text-[10px]">Team</span>
                <span className="font-bold text-white truncate block">{sub.teamName}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Duration</span>
                <span className="font-mono font-bold text-emerald-400">{sub.durationSeconds} Seconds</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Category</span>
                <span className="font-medium text-zinc-300 truncate block">{sub.categoryName}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
              {sub.description}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
              <span>Submitted: {new Date(sub.submittedAt).toLocaleDateString()}</span>
              {sub.averageScore ? (
                <span className="font-bold text-[#f59e0b]">Score: {sub.averageScore} / 100</span>
              ) : (
                <span>Awaiting Jury Score</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
