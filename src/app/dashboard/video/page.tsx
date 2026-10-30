'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { COMPETITION_CATEGORIES } from '@/lib/constants';
import { 
  Film, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileCheck, 
  RefreshCw, 
  ShieldCheck,
  Play,
  RotateCcw
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function VideoSubmissionPage() {
  const { myTeam, submissions, submitVideo } = useApp();

  const existingSub = submissions.find(s => s.teamId === myTeam?.id);

  // Form State
  const [videoTitle, setVideoTitle] = useState(existingSub?.videoTitle || '');
  const [startupName, setStartupName] = useState(existingSub?.startupName || '');
  const [categoryId, setCategoryId] = useState(existingSub?.categoryId || myTeam?.categoryId || COMPETITION_CATEGORIES[0].id);
  const [description, setDescription] = useState(existingSub?.description || '');
  const [problemAddressed, setProblemAddressed] = useState(existingSub?.problemAddressed || '');
  const [productDescription, setProductDescription] = useState(existingSub?.productDescription || '');

  // File & Upload Simulation State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(existingSub?.videoUrl || null);
  const [detectedDuration, setDetectedDuration] = useState<number>(existingSub?.durationSeconds || 0);
  const [detectedFileSize, setDetectedFileSize] = useState<number>(existingSub?.fileSizeBytes || 0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Video File Selection with Duration & Type Validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file format
    if (!file.type.includes('mp4') && !file.name.toLowerCase().endsWith('.mp4')) {
      setErrorMessage('Invalid file format. Only standard MP4 container video files are accepted.');
      return;
    }

    // Check size limit (100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage(`File size (${formatBytes(file.size)}) exceeds the maximum permitted limit of 100 MB.`);
      return;
    }

    setSelectedFile(file);
    setDetectedFileSize(file.size);

    // Create object URL and test duration with video element
    const objectUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(objectUrl);

    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = objectUrl;

    tempVideo.onloadedmetadata = () => {
      const duration = Math.round(tempVideo.duration);
      setDetectedDuration(duration);

      // Check duration constraints (30 to 90 seconds)
      if (duration < 30 || duration > 90) {
        setErrorMessage(
          `Detected video duration is ${duration} seconds. Event rules strictly require between 30 and 90 seconds.`
        );
      }
    };

    tempVideo.onerror = () => {
      setErrorMessage('Could not parse video metadata. Ensure your file is a valid H.264/AAC MP4 video.');
    };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!videoTitle.trim()) {
      setErrorMessage('Please provide a title for your advertisement film.');
      return;
    }
    if (!startupName.trim()) {
      setErrorMessage('Please enter the business or startup name.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Please provide an ad synopsis and commercial concept.');
      return;
    }

    if (!videoPreviewUrl) {
      setErrorMessage('Please select and upload an MP4 video file.');
      return;
    }

    if (detectedDuration < 30 || detectedDuration > 90) {
      setErrorMessage(`Video duration (${detectedDuration}s) violates the mandatory 30–90 second constraint.`);
      return;
    }

    // Simulate reliable secure chunked upload to Supabase Storage
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            const selectedCat = COMPETITION_CATEGORIES.find((c) => c.id === categoryId) || COMPETITION_CATEGORIES[0];
            const result = submitVideo({
              teamId: myTeam?.id || 'team-1',
              teamName: myTeam?.teamName || 'Innovators',
              teamRegId: myTeam?.teamRegId || 'ADV26-TM-1042',
              categoryId: selectedCat.id,
              categoryName: selectedCat.name,
              videoTitle,
              startupName,
              description,
              problemAddressed,
              productDescription,
              videoUrl: videoPreviewUrl,
              durationSeconds: detectedDuration,
              fileSizeBytes: detectedFileSize || 25000000,
            });

            setIsUploading(false);
            setUploadProgress(100);
            setSuccessMessage(
              `Ad film successfully submitted! Assigned Unique Submission ID: ${result.submissionId}. You can replace this video anytime before 12 November 2026.`
            );
          }, 600);
          return 90;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
          <Film className="h-4 w-4" />
          <span>PORTAL STAGE 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          30–90s Video Submission Portal
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Upload or replace your commercial ad film. All submissions must be strictly in MP4 format between 30 and 90 seconds.
        </p>
      </div>

      {/* Constraints Summary Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold">Duration</span>
          <span className="font-bold text-emerald-400">30 to 90 Seconds</span>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold">Format</span>
          <span className="font-bold text-[#f59e0b]">MP4 (H.264 / AAC)</span>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold">Max Size</span>
          <span className="font-bold text-white">100 MB</span>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          <span className="text-zinc-500 block text-[10px] uppercase font-bold">Deadline</span>
          <span className="font-bold text-[#ff5b26]">12 Nov 2026 (23:59 IST)</span>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 flex items-start gap-3 text-xs text-emerald-300 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-white">Submission Successful</span>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 flex items-start gap-3 text-xs text-rose-300 animate-in fade-in">
          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-white">Action Required</span>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleFormSubmit} className="space-y-6 rounded-2xl bg-zinc-900/80 p-6 sm:p-8 border border-zinc-800 shadow-xl">
        {/* Video File Dropzone */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
            MP4 Commercial Video File *
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-zinc-700 hover:border-[#ff5b26] bg-zinc-950 p-8 text-center transition-all group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-zinc-900 text-zinc-400 group-hover:text-[#ff5b26] group-hover:scale-110 transition-all">
              <UploadCloud className="h-7 w-7" />
            </div>
            <h4 className="text-sm font-bold text-white mt-3">
              {selectedFile ? selectedFile.name : 'Click to select or drag MP4 video here'}
            </h4>
            <p className="text-xs text-zinc-500 mt-1">
              Supports standard MP4 format up to 100 MB. Exact runtime must be 30–90 seconds.
            </p>
          </div>
        </div>

        {/* Video Player Preview & Diagnostics */}
        {videoPreviewUrl && (
          <div className="rounded-xl bg-zinc-950 p-4 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Play className="h-4 w-4 text-[#ff5b26]" /> Video Inspection Preview
              </span>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                detectedDuration >= 30 && detectedDuration <= 90
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                Duration: {detectedDuration}s {detectedDuration >= 30 && detectedDuration <= 90 ? '(Compliant)' : '(Out of Range)'}
              </span>
            </div>

            <div className="rounded-xl overflow-hidden bg-black aspect-video max-h-80 mx-auto">
              <video
                controls
                src={videoPreviewUrl}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Progress Bar during Upload */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Encrypting & Uploading to Secure Storage...</span>
              <span className="font-mono font-bold text-white">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Pitch Metadata Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Commercial / Video Title *
            </label>
            <input
              type="text"
              required
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="e.g. AuraPay: Frictionless Micro-Savings"
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Business / Startup Featured *
            </label>
            <input
              type="text"
              required
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              placeholder="e.g. AuraPay Technologies Pvt Ltd"
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Competition Category Track *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
            >
              {COMPETITION_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Problem Being Addressed
            </label>
            <input
              type="text"
              value={problemAddressed}
              onChange={(e) => setProblemAddressed(e.target.value)}
              placeholder="Target customer pain point or market friction"
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Commercial Synopsis & Storyboard Concept *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline the hook, pacing, customer journey, and final call-to-action shown in the video..."
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
            />
          </div>
        </div>

        {/* Submit / Replace Button */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="text-xs text-zinc-400">
            {existingSub ? (
              <span className="flex items-center gap-1.5 text-amber-400">
                <RotateCcw className="h-3.5 w-3.5" /> Replaces previous submission ({existingSub.submissionId})
              </span>
            ) : (
              <span>Initial Video Submission</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] px-8 py-3 text-xs font-extrabold text-white shadow-xl shadow-[#ff5b26]/20 hover:scale-105 transition-all disabled:opacity-50"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" /> Uploading Video...
              </span>
            ) : (
              <>
                <FileCheck className="h-4 w-4" />
                <span>{existingSub ? 'Replace Video Submission' : 'Submit Final Video'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
