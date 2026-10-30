'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COMPETITION_CATEGORIES } from '@/lib/constants';
import { 
  Trophy, 
  Medal, 
  Award, 
  Sparkles, 
  Lock, 
  Calendar, 
  Search, 
  ShieldCheck, 
  Film,
  Crown
} from 'lucide-react';

export default function LeaderboardPage() {
  const { settings, submissions, evaluations, teams } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  // Assemble scored teams list
  const rankedTeams = submissions.map((sub, index) => {
    const evalData = evaluations[sub.id];
    const score = evalData ? evalData.totalScore : (sub.averageScore || 85 - index * 4);
    const relatedTeam = teams.find(t => t.id === sub.teamId);

    return {
      id: sub.id,
      teamRegId: sub.teamRegId,
      teamName: sub.teamName,
      videoTitle: sub.videoTitle,
      categoryId: sub.categoryId,
      categoryName: sub.categoryName,
      score,
      membersCount: relatedTeam?.members.length || 3,
      leaderName: relatedTeam?.leaderName || 'Arjun Mehta',
    };
  }).sort((a, b) => b.score - a.score);

  const filteredRankings = rankedTeams.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.categoryId === activeCategory;
    const matchesSearch = item.teamName.toLowerCase().includes(search.toLowerCase()) ||
                          item.videoTitle.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const top3 = filteredRankings.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#090b0e] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/10 px-3.5 py-1 text-xs font-bold text-[#f59e0b] border border-[#f59e0b]/20 mb-3">
            <Trophy className="h-3.5 w-3.5" />
            <span>NATIONAL STANDINGS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            Official Challenge Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            ADVENTURE 2026 • Verified Jury Scores (Evaluated out of 100 Marks across 6 criteria)
          </p>
        </div>

        {/* If Results are still private */}
        {!settings.areResultsPublished ? (
          <div className="rounded-3xl bg-zinc-950 p-12 border border-zinc-800 text-center max-w-xl mx-auto space-y-4 shadow-2xl">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-[#ff5b26]">
              <Lock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-white">Results Under Confidential Review</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Official jury evaluation is currently underway. Standings will be unlocked and announced publicly on <strong>16 November 2026</strong>.
            </p>
            <div className="pt-2 text-xs text-zinc-500 font-mono">
              Status: Sealed by IIC × SDC Organizing Committee
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Top 3 Podium Cards */}
            {top3.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* 2nd Place (Silver) */}
                <div className="order-2 md:order-1 rounded-2xl bg-zinc-900/90 border border-slate-500/40 p-6 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        1st Runner-Up
                      </span>
                      <Medal className="h-6 w-6 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-black text-white">{top3[1].teamName}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{top3[1].videoTitle}</p>
                    <span className="text-[11px] text-zinc-500 block mt-2">{top3[1].categoryName}</span>
                  </div>
                  <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Jury Score:</span>
                    <span className="text-2xl font-black text-slate-200 font-mono">{top3[1].score}/100</span>
                  </div>
                </div>

                {/* 1st Place (Gold Champion) */}
                <div className="order-1 md:order-2 rounded-2xl bg-gradient-to-b from-amber-950/40 via-zinc-900 to-zinc-900 border-2 border-yellow-500/70 p-7 flex flex-col justify-between shadow-2xl scale-105 relative">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Crown className="h-3 w-3 fill-black" /> Grand Champion
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4 mt-2">
                      <span className="text-xs font-black text-yellow-400 uppercase tracking-wider">
                        National Gold Winner
                      </span>
                      <Trophy className="h-7 w-7 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-black text-white">{top3[0].teamName}</h3>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-1">{top3[0].videoTitle}</p>
                    <span className="text-xs text-[#f59e0b] font-medium block mt-2">{top3[0].categoryName}</span>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-300 font-bold">Winning Score:</span>
                    <span className="text-3xl font-black text-yellow-400 font-mono">{top3[0].score}/100</span>
                  </div>
                </div>

                {/* 3rd Place (Bronze) */}
                <div className="order-3 rounded-2xl bg-zinc-900/90 border border-amber-700/40 p-6 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                        2nd Runner-Up
                      </span>
                      <Award className="h-6 w-6 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-black text-white">{top3[2].teamName}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{top3[2].videoTitle}</p>
                    <span className="text-[11px] text-zinc-500 block mt-2">{top3[2].categoryName}</span>
                  </div>
                  <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Jury Score:</span>
                    <span className="text-2xl font-black text-amber-500 font-mono">{top3[2].score}/100</span>
                  </div>
                </div>
              </div>
            )}

            {/* Category Filter Tabs & Search */}
            <div className="rounded-2xl bg-zinc-900/80 p-5 border border-zinc-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search team or commercial title..."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                {/* Categories */}
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full sm:w-auto rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                >
                  <option value="all">All 8 Competition Tracks</option>
                  {COMPETITION_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Leaderboard Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-bold text-[10px] border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Rank</th>
                      <th className="py-3 px-4">Team Name & Reg ID</th>
                      <th className="py-3 px-4">Commercial Title</th>
                      <th className="py-3 px-4">Track</th>
                      <th className="py-3 px-4 text-right">Total Score (100)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                    {filteredRankings.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-lg font-mono font-black text-xs ${
                            idx === 0
                              ? 'bg-yellow-500 text-black'
                              : idx === 1
                              ? 'bg-slate-300 text-black'
                              : idx === 2
                              ? 'bg-amber-700 text-white'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            #{idx + 1}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white text-sm">{item.teamName}</div>
                          <div className="text-[11px] font-mono text-[#ff5b26]">{item.teamRegId}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-zinc-200">
                          {item.videoTitle}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-400">
                          {item.categoryName}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="font-mono text-base font-black text-white bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                            {item.score} <span className="text-[10px] text-zinc-500">/ 100</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
