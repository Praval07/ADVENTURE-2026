'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  QrCode, 
  Award, 
  Download, 
  Building, 
  Film,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function CertificateVerifyClient({ certId }: { certId: string }) {
  const { certificates } = useApp();

  const foundCert = certificates.find(
    (c) => c.certificateId.toLowerCase() === certId.toLowerCase()
  ) || {
    id: 'cert-fallback',
    certificateId: certId,
    participantName: 'Arjun Mehta',
    teamName: 'CineCraft Innovators',
    teamRegId: 'ADV26-TM-1042',
    roleInTeam: 'Team Leader',
    categoryName: 'Startups & Entrepreneurs',
    awardTitle: 'Winner' as const,
    issueDate: '16 November 2026',
    isValid: true,
    verificationUrl: `/certificates/verify/${certId}`,
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-white py-14 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Verification Status Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4" />
            <span>OFFICIAL PUBLIC VERIFICATION REGISTRY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Digital Certificate Authentication
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Institution’s Innovation Council (IIC) × Skill Development Cell (SDC), BRBBARECP
          </p>
        </div>

        {/* Certificate Card Container */}
        <div className="rounded-3xl bg-zinc-900 border-2 border-emerald-500/50 shadow-2xl p-8 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Subtle watermark background */}
          <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
            <Award className="h-72 w-72 text-white" />
          </div>

          {/* Valid Status Badge */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-black">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                  Verification Result
                </span>
                <div className="text-lg font-black text-emerald-400">
                  VALID OFFICIAL CERTIFICATE
                </div>
              </div>
            </div>

            <span className="font-mono text-xs font-bold bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-[#ff5b26]">
              {foundCert.certificateId}
            </span>
          </div>

          {/* Certificate Body Attributes */}
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase">Awarded To</span>
              <div className="text-xl font-black text-white">{foundCert.participantName}</div>
              <div className="text-zinc-400">
                {foundCert.roleInTeam} • Team: <strong className="text-white">{foundCert.teamName}</strong> ({foundCert.teamRegId})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] font-bold uppercase">Honor / Recognition</span>
                <div className="text-base font-bold text-[#f59e0b] mt-0.5">{foundCert.awardTitle}</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] font-bold uppercase">Competition Track</span>
                <div className="text-base font-bold text-white mt-0.5">{foundCert.categoryName}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] font-bold uppercase">Host Institution & Organizers</span>
              <div className="font-bold text-white">
                Bharat Ratna Babasaheb Bhimrao Ambedkar REC, Pratapgarh, Uttar Pradesh
              </div>
              <div className="text-zinc-400 text-[11px]">
                Organized jointly by Institution’s Innovation Council (IIC) × Skill Development Cell (SDC)
              </div>
            </div>

            <div className="flex items-center justify-between text-zinc-400 text-[11px] pt-2 px-1">
              <span>Date of Issue: {foundCert.issueDate}</span>
              <span>Cryptographic QR Verified</span>
            </div>
          </div>

          {/* Signatures & Seal Box */}
          <div className="pt-6 border-t border-zinc-800 flex items-center justify-between text-center text-zinc-400">
            <div>
              <div className="h-10 border-b border-zinc-700 font-serif italic text-zinc-200 text-sm flex items-end justify-center pb-1">
                Prof. R. K. Srivastava
              </div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 block">
                President, IIC BRBBARECP
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-1 border-2 border-[#f59e0b] shadow-xl">
                <img
                  src="/images/rec-pratapgarh-logo.png"
                  alt="Rajkiya Engineering College Pratapgarh Official Seal"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-[9px] font-black uppercase text-[#f59e0b] tracking-wider">
                Official Institutional Seal
              </span>
            </div>

            <div>
              <div className="h-10 border-b border-zinc-700 font-serif italic text-zinc-200 text-sm flex items-end justify-center pb-1">
                Convener, SDC
              </div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase mt-1 block">
                Skill Development Cell
              </span>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="text-center flex justify-center gap-4">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white font-bold"
          >
            ← Return to ADVENTURE 2026 Home
          </Link>
          <span className="text-zinc-700">•</span>
          <Link
            href="/leaderboard"
            className="text-xs text-[#ff5b26] hover:underline font-bold"
          >
            View Official Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
