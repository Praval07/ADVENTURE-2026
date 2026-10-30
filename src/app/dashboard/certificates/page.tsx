'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Award, Download, QrCode, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function ParticipantCertificatesPage() {
  const { certificates, myTeam, currentUser } = useApp();

  const myCerts = certificates.filter(
    (c) => c.teamRegId === myTeam?.teamRegId || c.participantName === currentUser.fullName
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
          <Award className="h-4 w-4" />
          <span>OFFICIAL CREDENTIALS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Event Certificates & Honors
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Official digital certificates endorsed by Institution&apos;s Innovation Council (IIC) × Skill Development Cell (SDC), BRBBARECP.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="space-y-6">
        {(myCerts.length > 0 ? myCerts : certificates.slice(0, 2)).map((cert) => (
          <div
            key={cert.id}
            className="rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 p-6 sm:p-8 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-[#f59e0b] font-bold bg-[#f59e0b]/10 px-2.5 py-1 rounded-md border border-[#f59e0b]/20">
                  {cert.certificateId}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Officially Verified
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">{cert.participantName}</h3>
                <p className="text-xs text-zinc-400">
                  {cert.roleInTeam} • Team: <span className="text-white font-bold">{cert.teamName}</span> ({cert.teamRegId})
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <span>Award: <strong className="text-[#ff5b26]">{cert.awardTitle}</strong></span>
                <span>•</span>
                <span>Track: {cert.categoryName}</span>
                <span>•</span>
                <span>Date: {cert.issueDate}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                href={`/certificates/verify/${cert.certificateId}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 text-xs font-bold text-white transition-colors border border-zinc-700"
              >
                <QrCode className="h-4 w-4 text-[#ff5b26]" />
                <span>Verify QR Page</span>
              </Link>

              <a
                href={`/api/certificate/${cert.certificateId}`}
                download={`${cert.certificateId}.pdf`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-[#ff5b26]/20 transition-all hover:scale-105"
              >
                <Download className="h-4 w-4" />
                <span>Download Official PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
