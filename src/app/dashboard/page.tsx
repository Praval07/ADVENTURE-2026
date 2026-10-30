'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Film, 
  Camera, 
  Users, 
  Award, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { myTeam, submissions, announcements } = useApp();

  const mySubmission = submissions.find(s => s.teamId === myTeam?.id);

  const getPhotoStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold text-xs flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5" /> Verified</span>;
      case 'Under Verification':
        return <span className="bg-sky-950 text-sky-400 border border-sky-800 px-2.5 py-0.5 rounded-full font-bold text-xs flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Under Verification</span>;
      case 'Rejected – Retake Required':
        return <span className="bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-0.5 rounded-full font-bold text-xs flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Retake Required</span>;
      default:
        return <span className="bg-amber-950 text-amber-400 border border-amber-800 px-2.5 py-0.5 rounded-full font-bold text-xs">Pending</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-zinc-900 via-[#181b22] to-zinc-900 p-6 sm:p-8 border border-zinc-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>PARTICIPANT WORKBENCH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {myTeam?.teamName || 'Your Team'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Official Registration ID: <span className="font-mono font-bold text-white">{myTeam?.teamRegId}</span> • {myTeam?.categoryName}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/video"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-[#ff5b26]/20 hover:scale-105 transition-all"
          >
            <Film className="h-4 w-4" />
            <span>{mySubmission ? 'View / Replace Video' : 'Submit 30–90s Video'}</span>
          </Link>
        </div>
      </div>

      {/* 4 Status Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Registration Status */}
        <div className="rounded-2xl bg-zinc-900/70 p-5 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Registration</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white capitalize">
            {myTeam?.registrationStatus || 'Approved'}
          </div>
          <div className="text-[11px] text-zinc-500 mt-1">
            Enrolled for ADVENTURE 2026
          </div>
        </div>

        {/* Metric 2: Photo Verification Status */}
        <div className="rounded-2xl bg-zinc-900/70 p-5 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Identity Photo</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Camera className="h-4 w-4" />
            </div>
          </div>
          <div className="mb-2">
            {getPhotoStatusBadge(myTeam?.photoVerificationStatus || 'Under Verification')}
          </div>
          <Link href="/dashboard/photo" className="text-[11px] text-[#ff5b26] hover:underline font-medium flex items-center gap-1">
            <span>View Photo Details</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Metric 3: Video Submission */}
        <div className="rounded-2xl bg-zinc-900/70 p-5 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Video Submission</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff5b26]/10 text-[#ff5b26]">
              <Film className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white">
            {mySubmission ? 'Submitted' : 'Pending Upload'}
          </div>
          <div className="text-[11px] text-zinc-400 mt-1">
            {mySubmission ? `${mySubmission.durationSeconds}s • ${mySubmission.submissionId}` : 'Deadline: 12 Nov 2026'}
          </div>
        </div>

        {/* Metric 4: Team Composition */}
        <div className="rounded-2xl bg-zinc-900/70 p-5 border border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Team Roster</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-white">
            {myTeam?.members.length || 3} / 4 Students
          </div>
          <Link href="/dashboard/team" className="text-[11px] text-[#f59e0b] hover:underline font-medium flex items-center gap-1 mt-1">
            <span>Manage Team Members</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Row: Active Submission Details & Official Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Submission Showcase */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-zinc-900/70 p-6 border border-zinc-800/80">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Active Ad Film Submission</h3>
                <p className="text-xs text-zinc-400">Review your commercial synopsis and media status</p>
              </div>
              <Link
                href="/dashboard/video"
                className="text-xs font-bold text-[#ff5b26] hover:underline flex items-center gap-1"
              >
                <span>{mySubmission ? 'Replace Video' : 'Upload Video'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {mySubmission ? (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden bg-black border border-zinc-800 aspect-video relative flex items-center justify-center">
                  <video
                    controls
                    className="w-full h-full object-contain"
                    src={mySubmission.videoUrl}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Submission ID</span>
                    <span className="font-mono font-bold text-white">{mySubmission.submissionId}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Duration</span>
                    <span className="font-bold text-emerald-400">{mySubmission.durationSeconds} Seconds</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Track</span>
                    <span className="font-bold text-zinc-200">{mySubmission.categoryName}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold">Review Status</span>
                    <span className="font-bold text-[#ff5b26] capitalize">{mySubmission.status.replace('_', ' ')}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{mySubmission.videoTitle}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{mySubmission.description}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-zinc-800 text-zinc-400">
                  <Film className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-white">No Ad Film Uploaded Yet</h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Your team has not yet uploaded its 30–90 second commercial. Deadline is 12 November 2026 (23:59 IST).
                </p>
                <Link
                  href="/dashboard/video"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff5b26] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#e24a18] transition-all"
                >
                  <Film className="h-4 w-4" />
                  <span>Upload MP4 Commercial Now</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): Announcements & Deadlines */}
        <div className="space-y-6">
          {/* Deadline Countdown Card */}
          <div className="rounded-2xl bg-zinc-900/70 p-6 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
              <Clock className="h-4 w-4" />
              <span>Upcoming Deadline</span>
            </div>
            <h4 className="text-lg font-black text-white">Video Submission Deadline</h4>
            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
              <div className="text-xl font-bold font-mono text-[#ff5b26]">12 November 2026</div>
              <div className="text-[11px] text-zinc-400">23:59 IST • Portal Locks Automatically</div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Teams can replace video files an unlimited number of times prior to this deadline.
            </p>
          </div>

          {/* Announcements Feed */}
          <div className="rounded-2xl bg-zinc-900/70 p-6 border border-zinc-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Official Announcements</span>
              <span className="text-[10px] text-zinc-500 font-normal">IIC × SDC</span>
            </h3>

            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-200 line-clamp-1">{ann.title}</span>
                    <span className="text-[10px] text-zinc-500 shrink-0">{ann.date}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
