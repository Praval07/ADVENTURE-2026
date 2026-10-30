'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  X, 
  ShieldCheck, 
  Search, 
  Eye,
  Send,
  Lock
} from 'lucide-react';
import { PhotoVerificationStatus } from '@/types';

interface PhotoItem {
  teamId: string;
  teamName: string;
  teamRegId: string;
  participantName: string;
  enrollmentNumber: string;
  department: string;
  photoUrl: string;
  status: PhotoVerificationStatus;
  rejectionReason?: string;
}

export default function AdminPhotoVerificationPage() {
  const { teams, verifyPhoto } = useApp();

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');

  // Flatten photo items from teams
  const photoItems: PhotoItem[] = teams.map((t) => {
    const leader = t.members.find((m) => m.isLeader) || t.members[0];
    return {
      teamId: t.id,
      teamName: t.teamName,
      teamRegId: t.teamRegId,
      participantName: leader?.fullName || t.leaderName,
      enrollmentNumber: leader?.enrollmentNumber || '220198010001',
      department: leader?.department || 'Engineering',
      photoUrl: leader?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      status: t.photoVerificationStatus,
      rejectionReason: leader?.photoRejectionReason,
    };
  });

  const displayedPhotos = activeTab === 'pending'
    ? photoItems.filter((p) => p.status === 'Under Verification' || p.status === 'Photo Uploaded')
    : photoItems;

  const handleApprove = (teamId: string) => {
    verifyPhoto(teamId, 'Verified');
    if (selectedPhoto?.teamId === teamId) {
      setSelectedPhoto(null);
    }
  };

  const handleOpenReject = (item: PhotoItem) => {
    setSelectedPhoto(item);
    setRejectionModalOpen(true);
    setRejectionReason('Face blurred, insufficient lighting, or face guide not followed.');
  };


  const handleConfirmReject = () => {
    if (!selectedPhoto) return;
    verifyPhoto(selectedPhoto.teamId, 'Rejected – Retake Required', rejectionReason);
    setRejectionModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
          <Camera className="h-4 w-4" />
          <span>SECURITY & IDENTITY REVIEW</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Participant Photo Verification Desk
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Review mandatory browser-captured live photographs. Approve or reject with required explanation for student retake.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pending'
              ? 'bg-[#ff5b26] text-white shadow-md'
              : 'text-zinc-400 hover:text-white bg-zinc-900'
          }`}
        >
          Pending Review ({photoItems.filter((p) => p.status === 'Under Verification').length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#ff5b26] text-white shadow-md'
              : 'text-zinc-400 hover:text-white bg-zinc-900'
          }`}
        >
          All Photos ({photoItems.length})
        </button>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPhotos.map((item) => (
          <div
            key={item.teamId}
            className="rounded-2xl bg-zinc-900/80 p-5 border border-zinc-800 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Photo Preview */}
              <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3] border border-zinc-700/80 mb-3 group">
                <img
                  src={item.photoUrl}
                  alt={item.participantName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-white border border-white/10">
                  <Lock className="h-3 w-3 text-emerald-400" />
                  <span>{item.teamRegId}</span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.status === 'Verified'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : item.status === 'Rejected – Retake Required'
                      ? 'bg-rose-950 text-rose-400 border-rose-800'
                      : 'bg-sky-950 text-sky-400 border-sky-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Student Details */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold text-white">{item.participantName}</h3>
                  <span className="font-mono text-zinc-400 text-[11px]">{item.enrollmentNumber}</span>
                </div>
                <p className="text-zinc-400 text-xs">Team: <strong className="text-zinc-200">{item.teamName}</strong></p>
                <p className="text-zinc-500 text-[11px]">{item.department}</p>
              </div>

              {item.rejectionReason && (
                <div className="mt-2 p-2 rounded-lg bg-rose-950/40 border border-rose-800 text-[11px] text-rose-300">
                  Reason: {item.rejectionReason}
                </div>
              )}
            </div>

            {/* Admin Action Buttons */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedPhoto(item)}
                className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                title="Inspect Enlarged Photo"
              >
                <Eye className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenReject(item)}
                  className="rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 px-3 py-1.5 text-xs font-bold transition-colors"
                >
                  Reject & Retake
                </button>
                <button
                  onClick={() => handleApprove(item.teamId)}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold px-3 py-1.5 text-xs transition-colors shadow-md"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enlarged Inspection Modal */}
      {selectedPhoto && !rejectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Inspect Participant Photo</h3>
              <button onClick={() => setSelectedPhoto(null)} className="text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black aspect-square max-h-96 mx-auto border border-zinc-700">
              <img src={selectedPhoto.photoUrl} alt="Enlarged" className="w-full h-full object-cover" />
            </div>

            <div className="text-xs text-zinc-300 space-y-1">
              <div>Student: <strong className="text-white">{selectedPhoto.participantName}</strong> ({selectedPhoto.enrollmentNumber})</div>
              <div>Team: {selectedPhoto.teamName} ({selectedPhoto.teamRegId})</div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => handleOpenReject(selectedPhoto)}
                className="rounded-xl bg-rose-950 border border-rose-800 text-rose-300 px-4 py-2 text-xs font-bold hover:bg-rose-900"
              >
                Reject & Require Retake
              </button>
              <button
                onClick={() => handleApprove(selectedPhoto.teamId)}
                className="rounded-xl bg-emerald-500 text-black px-5 py-2 text-xs font-black hover:bg-emerald-400"
              >
                Approve Identity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Requirement Modal */}
      {rejectionModalOpen && selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="h-5 w-5" />
              <span>Mandatory Photo Rejection Feedback</span>
            </div>
            <p className="text-xs text-zinc-400">
              State the exact rationale so {selectedPhoto.participantName} understands how to capture an acceptable replacement photo.
            </p>

            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setRejectionModalOpen(false)}
                className="rounded-xl bg-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="rounded-xl bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 text-xs font-bold shadow-lg"
              >
                Confirm Rejection & Notify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
