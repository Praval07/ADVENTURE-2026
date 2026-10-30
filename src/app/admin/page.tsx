'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  Film, 
  Camera, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  Search, 
  Filter, 
  ArrowUpRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { teams, submissions, evaluations, settings } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Compute 10 mandatory admin metrics
  const totalTeams = teams.length;
  const totalParticipants = teams.reduce((acc, t) => acc + t.members.length, 0);
  const pendingPhotos = teams.filter((t) => t.photoVerificationStatus === 'Under Verification').length;
  const verifiedPhotos = teams.filter((t) => t.photoVerificationStatus === 'Verified').length;
  const rejectedPhotos = teams.filter((t) => t.photoVerificationStatus === 'Rejected – Retake Required').length;
  const videosSubmitted = submissions.length;
  const videosPendingReview = submissions.filter((s) => s.status === 'submitted').length;
  const completedEvaluations = Object.keys(evaluations).length;

  const filteredTeams = teams.filter((t) => {
    const matchesSearch = 
      t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teamRegId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.leaderName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const exportCSV = () => {
    const headers = ['Team ID', 'Team Name', 'Leader Name', 'Leader Email', 'Team Size', 'Category', 'Photo Status', 'Video Status'];
    const rows = teams.map((t) => [
      t.teamRegId,
      `"${t.teamName}"`,
      `"${t.leaderName}"`,
      t.leaderEmail,
      t.teamSize,
      `"${t.categoryName}"`,
      t.photoVerificationStatus,
      t.videoSubmissionStatus,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ADVENTURE_2026_Teams_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>ORGANIZER COMMAND</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            ADVENTURE 2026 Administration Portal
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            BRBBARECP • Institution’s Innovation Council (IIC) × Skill Development Cell (SDC)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-xs font-bold text-white border border-zinc-700 transition-colors"
          >
            <Download className="h-4 w-4 text-[#ff5b26]" />
            <span>Export CSV / Excel</span>
          </button>
        </div>
      </div>

      {/* 10 Live Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Total Teams</span>
          <div className="text-2xl font-black text-white mt-1">{totalTeams}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Total Students</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{totalParticipants}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Photos Pending</span>
          <div className="text-2xl font-black text-[#f59e0b] mt-1">{pendingPhotos}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Photos Verified</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{verifiedPhotos}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Photo Retakes</span>
          <div className="text-2xl font-black text-rose-400 mt-1">{rejectedPhotos}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Videos Uploaded</span>
          <div className="text-2xl font-black text-[#ff5b26] mt-1">{videosSubmitted}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Videos In Review</span>
          <div className="text-2xl font-black text-sky-400 mt-1">{videosPendingReview}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Jury Evaluations</span>
          <div className="text-2xl font-black text-purple-400 mt-1">{completedEvaluations}</div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Portal Status</span>
          <div className="text-xs font-black text-emerald-400 mt-2 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 inline-block">
            {settings.isRegistrationOpen ? 'Registration Live' : 'Closed'}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <span className="text-[10px] font-bold uppercase text-zinc-400 block">Results Status</span>
          <div className="text-xs font-black text-amber-400 mt-2 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 inline-block">
            {settings.areResultsPublished ? 'Published' : 'Draft / Private'}
          </div>
        </div>
      </div>

      {/* Teams Table with Search and Filtering */}
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-xl overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team, reg ID, or leader..."
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 font-semibold">Track:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
            >
              <option value="all">All 8 Tracks</option>
              <option value="cat-1">Local Business</option>
              <option value="cat-2">Startups & Entrepreneurs</option>
              <option value="cat-3">Traditional Business</option>
              <option value="cat-6">Social Entrepreneurship</option>
            </select>
          </div>
        </div>

        {/* Table Element */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 uppercase tracking-wider font-bold text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Team Reg ID</th>
                <th className="py-3.5 px-4">Team Name</th>
                <th className="py-3.5 px-4">Leader / Contact</th>
                <th className="py-3.5 px-4">Size</th>
                <th className="py-3.5 px-4">Category Track</th>
                <th className="py-3.5 px-4">Photo Status</th>
                <th className="py-3.5 px-4">Video Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {filteredTeams.map((t) => (
                <tr key={t.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#ff5b26]">
                    {t.teamRegId}
                  </td>
                  <td className="py-3 px-4 font-bold text-white">
                    {t.teamName}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{t.leaderName}</div>
                    <div className="text-[11px] text-zinc-500">{t.leaderEmail}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-[11px] font-semibold text-zinc-300">
                      {t.teamSize} Students
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 font-medium">
                    {t.categoryName}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      t.photoVerificationStatus === 'Verified'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : t.photoVerificationStatus === 'Rejected – Retake Required'
                        ? 'bg-rose-950 text-rose-400 border-rose-800'
                        : 'bg-sky-950 text-sky-400 border-sky-800'
                    }`}>
                      {t.photoVerificationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize font-semibold text-zinc-200">
                      {t.videoSubmissionStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/admin/photos"
                      className="inline-flex items-center gap-1 rounded-lg bg-zinc-800 hover:bg-[#ff5b26] hover:text-white px-2.5 py-1 text-[11px] font-bold text-zinc-300 transition-colors"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Review</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
