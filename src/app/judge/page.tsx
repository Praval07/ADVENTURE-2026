'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { EVALUATION_CRITERIA } from '@/lib/constants';
import { 
  Award, 
  Play, 
  CheckCircle2, 
  Save, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Film, 
  AlertCircle 
} from 'lucide-react';
import { EvaluationScore } from '@/types';

export default function JudgePortalPage() {
  const { submissions, evaluations, saveEvaluation, currentUser } = useApp();

  const [selectedSubId, setSelectedSubId] = useState<string>(submissions[0]?.id || '');
  const activeSubmission = submissions.find((s) => s.id === selectedSubId) || submissions[0];

  const currentEval = activeSubmission ? evaluations[activeSubmission.id] : undefined;

  // Evaluation Form Scores
  const [creativity, setCreativity] = useState<number>(currentEval?.creativityScore ?? 18);
  const [marketing, setMarketing] = useState<number>(currentEval?.marketingScore ?? 18);
  const [adQuality, setAdQuality] = useState<number>(currentEval?.adQualityScore ?? 18);
  const [business, setBusiness] = useState<number>(currentEval?.businessUnderstandingScore ?? 13);
  const [innovation, setInnovation] = useState<number>(currentEval?.innovationScore ?? 13);
  const [presentation, setPresentation] = useState<number>(currentEval?.presentationScore ?? 8);
  const [feedback, setFeedback] = useState<string>(currentEval?.feedback ?? '');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Live calculated total out of 100
  const liveTotal = creativity + marketing + adQuality + business + innovation + presentation;

  const handleSaveEvaluation = (isDraft: boolean) => {
    if (!activeSubmission) return;

    const evaluationRecord: EvaluationScore = {
      submissionId: activeSubmission.id,
      judgeId: currentUser.id,
      judgeName: currentUser.fullName,
      creativityScore: creativity,
      marketingScore: marketing,
      adQualityScore: adQuality,
      businessUnderstandingScore: business,
      innovationScore: innovation,
      presentationScore: presentation,
      totalScore: liveTotal,
      feedback,
      isDraft,
      evaluatedAt: new Date().toISOString(),
    };

    saveEvaluation(evaluationRecord);
    setSavedNotice(
      isDraft 
        ? 'Evaluation saved as draft. You can revise before final jury submission.'
        : `Final evaluation submitted! Total Score: ${liveTotal}/100 recorded in database.`
    );
    setTimeout(() => setSavedNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f59e0b] mb-1">
              <Award className="h-4 w-4" />
              <span>JURY SCORING WORKBENCH</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Official Commercial Evaluation (100 Marks)
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Jury Evaluator: <strong className="text-white">{currentUser.fullName}</strong> • IIC × SDC External Jury Panel
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-bold">Select Submission:</span>
            <select
              value={selectedSubId}
              onChange={(e) => {
                setSelectedSubId(e.target.value);
                const ev = evaluations[e.target.value];
                if (ev) {
                  setCreativity(ev.creativityScore);
                  setMarketing(ev.marketingScore);
                  setAdQuality(ev.adQualityScore);
                  setBusiness(ev.businessUnderstandingScore);
                  setInnovation(ev.innovationScore);
                  setPresentation(ev.presentationScore);
                  setFeedback(ev.feedback);
                }
              }}
              className="rounded-xl bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#ff5b26]"
            >
              {submissions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.submissionId} - {s.teamName} ({s.videoTitle})
                </option>
              ))}
            </select>
          </div>
        </div>

        {savedNotice && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center gap-3 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{savedNotice}</span>
          </div>
        )}

        {/* Evaluation Grid: Left Video Player & Team Details, Right 6-Criterion Scoring Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Video Playback & Pitch Synopsis */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-zinc-900/80 p-5 border border-zinc-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#ff5b26]">
                  {activeSubmission?.submissionId}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  {activeSubmission?.durationSeconds}s Duration
                </span>
              </div>

              {/* Embedded Player */}
              <div className="rounded-xl overflow-hidden bg-black aspect-video border border-zinc-700 shadow-2xl relative">
                <video
                  controls
                  key={activeSubmission?.videoUrl}
                  src={activeSubmission?.videoUrl}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{activeSubmission?.videoTitle}</h3>
                <div className="text-xs text-[#f59e0b] font-medium mt-0.5">
                  Featured: {activeSubmission?.startupName} • {activeSubmission?.categoryName}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300">
                <div>
                  <span className="text-zinc-500 font-bold block text-[10px] uppercase">Problem Addressed:</span>
                  <p className="mt-0.5 text-zinc-300">{activeSubmission?.problemAddressed || 'Local customer friction and market discovery.'}</p>
                </div>
                <div>
                  <span className="text-zinc-500 font-bold block text-[10px] uppercase">Synopsis:</span>
                  <p className="mt-0.5 text-zinc-400 leading-relaxed">{activeSubmission?.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): 6-Criterion Scoring Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-zinc-900/80 p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
              {/* Live Tally Bar */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-black/60 border border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Calculated Jury Score
                  </span>
                  <div className="text-3xl font-black text-white font-mono mt-0.5">
                    {liveTotal} <span className="text-base text-zinc-500">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border ${
                    liveTotal >= 90
                      ? 'bg-amber-950 text-amber-400 border-amber-800'
                      : liveTotal >= 75
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    {liveTotal >= 90 ? 'Outstanding (Gold Tier)' : liveTotal >= 75 ? 'Commended (Silver Tier)' : 'Competitive'}
                  </span>
                </div>
              </div>

              {/* 6 Criteria Sliders & Inputs */}
              <div className="space-y-4">
                {/* 1. Creativity & Originality (20) */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">1. Creativity & Originality</span>
                      <span className="text-zinc-500 block text-[10px]">Novelty, storytelling hook, narrative freshness</span>
                    </div>
                    <span className="font-mono font-bold text-[#ff5b26] text-sm">{creativity} / 20</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={creativity}
                    onChange={(e) => setCreativity(Number(e.target.value))}
                    className="w-full accent-[#ff5b26] cursor-pointer"
                  />
                </div>

                {/* 2. Marketing Strategy (20) */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">2. Marketing Strategy</span>
                      <span className="text-zinc-500 block text-[10px]">Value proposition clarity, target resonance, CTA</span>
                    </div>
                    <span className="font-mono font-bold text-[#ff5b26] text-sm">{marketing} / 20</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={marketing}
                    onChange={(e) => setMarketing(Number(e.target.value))}
                    className="w-full accent-[#ff5b26] cursor-pointer"
                  />
                </div>

                {/* 3. Advertisement Quality (20) */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">3. Advertisement Quality</span>
                      <span className="text-zinc-500 block text-[10px]">Cinematography, audio clarity, editing rhythm, color</span>
                    </div>
                    <span className="font-mono font-bold text-[#ff5b26] text-sm">{adQuality} / 20</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={20}
                    value={adQuality}
                    onChange={(e) => setAdQuality(Number(e.target.value))}
                    className="w-full accent-[#ff5b26] cursor-pointer"
                  />
                </div>

                {/* 4. Business Understanding (15) */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">4. Business Understanding</span>
                      <span className="text-zinc-500 block text-[10px]">Market reality, customer pain-point empathy, economics</span>
                    </div>
                    <span className="font-mono font-bold text-[#f59e0b] text-sm">{business} / 15</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={business}
                    onChange={(e) => setBusiness(Number(e.target.value))}
                    className="w-full accent-[#f59e0b] cursor-pointer"
                  />
                </div>

                {/* 5. Problem Identification & Innovation (15) */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">5. Problem Identification & Innovation</span>
                      <span className="text-zinc-500 block text-[10px]">Significance of challenge, ingeniousness of solution</span>
                    </div>
                    <span className="font-mono font-bold text-[#f59e0b] text-sm">{innovation} / 15</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={innovation}
                    onChange={(e) => setInnovation(Number(e.target.value))}
                    className="w-full accent-[#f59e0b] cursor-pointer"
                  />
                </div>

                {/* 6. Overall Presentation (10) */}
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">6. Overall Presentation</span>
                      <span className="text-zinc-500 block text-[10px]">Emotional appeal, brand recall, 30-90s persuasion</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{presentation} / 10</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={presentation}
                    onChange={(e) => setPresentation(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Qualitative Feedback */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Qualitative Jury Feedback & Strengths:
                  </label>
                  <textarea
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback for student filmmakers and startup founders..."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleSaveEvaluation(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 text-xs font-bold text-zinc-300 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveEvaluation(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] px-6 py-2.5 text-xs font-extrabold text-white shadow-xl shadow-[#ff5b26]/20 hover:scale-105 transition-all"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Final Evaluation ({liveTotal}/100)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
