'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Camera, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  ShieldCheck, 
  Info,
  Lock
} from 'lucide-react';

export default function PhotoVerificationDashboardPage() {
  const { myTeam, updateLivePhoto } = useApp();

  const leaderMember = myTeam?.members.find((m) => m.isLeader) || myTeam?.members[0];

  // Camera Retake State
  const [isRetaking, setIsRetaking] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setCameraError(null);
    setIsRetaking(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        setCameraError('Camera API unavailable in this browser.');
      }
    } catch (err: unknown) {
      const e = err as Error;
      setCameraError(e.message || 'Camera permission denied.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
    }
    setIsRetaking(false);
  };

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [cameraStream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  const handleConfirmRetake = () => {
    if (!capturedPhoto || !myTeam) return;
    setIsSubmitting(true);
    setTimeout(() => {
      updateLivePhoto(myTeam.id, capturedPhoto);
      setIsSubmitting(false);
      setCapturedPhoto(null);
    }, 800);
  };

  const status = leaderMember?.photoStatus || myTeam?.photoVerificationStatus || 'Under Verification';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
          <ShieldCheck className="h-4 w-4" />
          <span>IDENTITY COMPLIANCE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Participant Photo Verification
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Review live photo verification status reviewed by the Institution’s Innovation Council (IIC).
        </p>
      </div>

      {/* Status Banner */}
      <div className={`p-6 rounded-2xl border ${
        status === 'Verified'
          ? 'bg-emerald-950/40 border-emerald-800'
          : status === 'Rejected – Retake Required'
          ? 'bg-rose-950/40 border-rose-800'
          : 'bg-sky-950/40 border-sky-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              status === 'Verified'
                ? 'bg-emerald-500 text-black'
                : status === 'Rejected – Retake Required'
                ? 'bg-rose-500 text-white'
                : 'bg-sky-500 text-black'
            }`}>
              {status === 'Verified' ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : status === 'Rejected – Retake Required' ? (
                <AlertTriangle className="h-6 w-6" />
              ) : (
                <Clock className="h-6 w-6" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                Verification State
              </span>
              <div className="text-xl font-black text-white">{status}</div>
            </div>
          </div>

          {status === 'Rejected – Retake Required' && !isRetaking && !capturedPhoto && (
            <button
              onClick={startCamera}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#ff5b26]/20 hover:scale-105 transition-all"
            >
              <Camera className="h-4 w-4" />
              <span>Capture Replacement Photo</span>
            </button>
          )}
        </div>

        {/* Rejection Reason Notice if applicable */}
        {leaderMember?.photoRejectionReason && (
          <div className="mt-4 pt-4 border-t border-rose-800/60 text-xs text-rose-200">
            <span className="font-bold block text-rose-100 mb-1">
              Administrator Rejection Feedback:
            </span>
            <p className="bg-rose-950/60 p-3 rounded-xl border border-rose-800/80">
              {leaderMember.photoRejectionReason}
            </p>
          </div>
        )}
      </div>

      {/* Photo Showcase & Retake Modal */}
      <div className="rounded-2xl bg-zinc-900/80 p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white">Registered Leader Photograph</h3>

        {/* If user clicked retake */}
        {isRetaking ? (
          <div className="space-y-4 text-center">
            <div className="relative rounded-xl overflow-hidden bg-black max-w-sm mx-auto border border-zinc-700">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover scale-x-[-1]"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-52 border-2 border-dashed border-[#ff5b26] rounded-[50%]" />
              </div>
            </div>
            {cameraError && (
              <p className="text-xs text-rose-400">{cameraError}</p>
            )}
            <div className="flex justify-center gap-3">
              <button
                onClick={capturePhoto}
                className="rounded-xl bg-[#ff5b26] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#e24a18]"
              >
                Snap Photo
              </button>
              <button
                onClick={stopCamera}
                className="rounded-xl bg-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : capturedPhoto ? (
          <div className="space-y-4 text-center">
            <div className="max-w-xs mx-auto rounded-xl overflow-hidden border-2 border-emerald-500 shadow-2xl">
              <img src={capturedPhoto} alt="New capture preview" className="w-full h-64 object-cover" />
            </div>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleConfirmRetake}
                disabled={isSubmitting}
                className="rounded-xl bg-[#ff5b26] px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-[#e24a18] disabled:opacity-50"
              >
                {isSubmitting ? 'Uploading...' : 'Confirm & Upload Replacement'}
              </button>
              <button
                onClick={() => { setCapturedPhoto(null); startCamera(); }}
                className="rounded-xl bg-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-300"
              >
                Retake
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="rounded-xl overflow-hidden border border-zinc-700 bg-black w-48 h-56 shrink-0 shadow-lg">
              {leaderMember?.photoUrl ? (
                <img
                  src={leaderMember.photoUrl}
                  alt={leaderMember.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600">
                  <Camera className="h-8 w-8 mb-2" />
                  <span className="text-[10px]">No Photo Uploaded</span>
                </div>
              )}
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Participant Name</span>
                <span className="text-base font-bold text-white">{leaderMember?.fullName}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Enrollment Number</span>
                <span className="font-mono text-zinc-200">{leaderMember?.enrollmentNumber}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Department / Semester</span>
                <span>{leaderMember?.department} ({leaderMember?.yearSemester})</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-400">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Encrypted private storage • Only authorized reviewers can inspect</span>
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
