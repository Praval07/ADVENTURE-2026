'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { COMPETITION_CATEGORIES } from '@/lib/constants';
import { 
  Camera, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Users, 
  UserCheck, 
  Film, 
  ShieldCheck, 
  AlertCircle, 
  RefreshCw, 
  Download,
  Info,
  Lock,
  Mail,
  Phone,
  Building,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { registerNewTeam } = useApp();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  // Current Step: 1 to 7
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Account Information
  const [account, setAccount] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  // Step 2: Team Creation
  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    teamSize: 3,
  });

  // Step 3: Additional Team Members (teamSize - 1)
  const [members, setMembers] = useState<Array<{
    fullName: string;
    enrollmentNumber: string;
    department: string;
    yearSemester: string;
    collegeEmail: string;
    mobileNumber: string;
  }>>([
    {
      fullName: '',
      enrollmentNumber: '',
      department: 'Computer Science & Engineering',
      yearSemester: '3rd Year / 5th Sem',
      collegeEmail: '',
      mobileNumber: '',
    },
    {
      fullName: '',
      enrollmentNumber: '',
      department: 'Electronics & Communication',
      yearSemester: '3rd Year / 5th Sem',
      collegeEmail: '',
      mobileNumber: '',
    },
  ]);

  // Step 4: Mandatory Live Photo Capture State
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photoConsent, setPhotoConsent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Step 5: Competition Pitch Details
  const [pitch, setPitch] = useState({
    categoryId: COMPETITION_CATEGORIES[0].id,
    businessName: '',
    adTitle: '',
    adConcept: '',
    shortDescription: '',
    problemAddressed: '',
    productDescription: '',
  });

  // Step 6: Mandatory Declarations
  const [declarations, setDeclarations] = useState({
    originality: false,
    copyright: false,
    filmingConsent: false,
    eventRules: false,
    accuracy: false,
    communicationConsent: false,
  });

  // Step 7: Completed Registration Result
  const [registrationResult, setRegistrationResult] = useState<{
    regId: string;
    teamRegId: string;
    teamName: string;
    categoryName: string;
    timestamp: string;
  } | null>(null);

  // Form error notification
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Adjust member forms when team size changes
  const handleTeamSizeChange = (newSize: number) => {
    setTeamInfo({ ...teamInfo, teamSize: newSize });
    const additionalCount = newSize - 1;
    const currentList = [...members];
    if (additionalCount > currentList.length) {
      for (let i = currentList.length; i < additionalCount; i++) {
        currentList.push({
          fullName: '',
          enrollmentNumber: '',
          department: 'Computer Science & Engineering',
          yearSemester: '3rd Year / 5th Sem',
          collegeEmail: '',
          mobileNumber: '',
        });
      }
    } else if (additionalCount < currentList.length) {
      currentList.splice(additionalCount);
    }
    setMembers(currentList);
  };

  // Camera Management
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
        setCameraStream(stream);
        setIsCameraActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        setCameraError('Camera access API is not supported in this environment.');
      }
    } catch (err: unknown) {
      const e = err as Error;
      setCameraError(e.message || 'Camera permission denied or camera unavailable.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      // Clean up camera on unmount
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
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

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  // Step Validation & Navigation
  const validateStep = (step: number): boolean => {
    setErrorMsg(null);
    if (step === 1) {
      if (!account.fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return false;
      }
      if (!account.email.includes('@')) {
        setErrorMsg('Please enter a valid college or personal email address.');
        return false;
      }
      if (!account.mobileNumber.trim()) {
        setErrorMsg('Please enter a valid mobile number.');
        return false;
      }
      if (account.password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        return false;
      }
      if (account.password !== account.confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!teamInfo.teamName.trim()) {
        setErrorMsg('Please provide a creative team name.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      // Validate all additional members
      for (let i = 0; i < members.length; i++) {
        const m = members[i];
        if (!m.fullName.trim() || !m.enrollmentNumber.trim() || !m.collegeEmail.trim()) {
          setErrorMsg(`Please fill all required fields for Team Member ${i + 2}.`);
          return false;
        }
      }
      // Check for duplicate enrollment numbers
      const rollNumbers = members.map((m) => m.enrollmentNumber.trim().toLowerCase());
      const hasDuplicates = new Set(rollNumbers).size !== rollNumbers.length;
      if (hasDuplicates) {
        setErrorMsg('Duplicate enrollment numbers detected across team members.');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (!capturedPhoto) {
        setErrorMsg('Mandatory live photo capture is required to proceed.');
        return false;
      }
      if (!photoConsent) {
        setErrorMsg('Please accept the photo identity verification consent.');
        return false;
      }
      return true;
    }

    if (step === 5) {
      if (!pitch.businessName.trim()) {
        setErrorMsg('Please enter the business or startup name.');
        return false;
      }
      if (!pitch.adTitle.trim()) {
        setErrorMsg('Please provide your advertisement title.');
        return false;
      }
      if (!pitch.shortDescription.trim()) {
        setErrorMsg('Please describe your ad film storyboard and pitch concept.');
        return false;
      }
      return true;
    }

    if (step === 6) {
      const allAccepted = Object.values(declarations).every(Boolean);
      if (!allAccepted) {
        setErrorMsg('All six mandatory declarations must be accepted before submitting registration.');
        return false;
      }
      return true;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 6) {
        handleFinalRegistration();
      } else {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    setErrorMsg(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFinalRegistration = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const selectedCategory = COMPETITION_CATEGORIES.find((c) => c.id === pitch.categoryId) || COMPETITION_CATEGORIES[0];
      const randomReg = Math.floor(1000 + Math.random() * 9000);
      const regId = `ADV26-REG-${randomReg}`;
      
      const newTeam = registerNewTeam({
        teamName: teamInfo.teamName,
        teamSize: teamInfo.teamSize,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.name,
        leaderName: account.fullName,
        leaderEmail: account.email,
        photoUrl: capturedPhoto || '',
        members: [
          {
            id: `mem-${Date.now()}-leader`,
            teamId: '',
            fullName: account.fullName,
            enrollmentNumber: '220198010099',
            department: 'Computer Science & Engineering',
            yearSemester: '3rd Year / 5th Sem',
            collegeEmail: account.email,
            mobileNumber: account.mobileNumber,
            isLeader: true,
            photoUrl: capturedPhoto || '',
            photoStatus: 'Under Verification',
            createdAt: new Date().toISOString(),
          },
          ...members.map((m, idx) => ({
            id: `mem-${Date.now()}-${idx}`,
            teamId: '',
            fullName: m.fullName,
            enrollmentNumber: m.enrollmentNumber,
            department: m.department,
            yearSemester: m.yearSemester,
            collegeEmail: m.collegeEmail,
            mobileNumber: m.mobileNumber,
            isLeader: false,
            photoStatus: 'Verified' as const,
            createdAt: new Date().toISOString(),
          })),
        ],
      });

      setRegistrationResult({
        regId,
        teamRegId: newTeam.teamRegId,
        teamName: newTeam.teamName,
        categoryName: selectedCategory.name,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });

      setIsSubmitting(false);
      setCurrentStep(7);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 1200);
  };

  const stepsList = [
    { num: 1, label: 'Account' },
    { num: 2, label: 'Team Setup' },
    { num: 3, label: 'Members' },
    { num: 4, label: 'Live Photo' },
    { num: 5, label: 'Pitch Details' },
    { num: 6, label: 'Declaration' },
    { num: 7, label: 'Confirmation' },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090b0e] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-32 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff5b26] border-t-transparent mb-4" />
          <p className="text-xs font-semibold text-zinc-400">Loading ADVENTURE 2026 Registration Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090b0e] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Registration Header */}
        <div className="text-center mb-10">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-white p-1 border-2 border-[#FFBE32]/60 shadow-[0_0_20px_rgba(255,190,50,0.3)] overflow-hidden mb-4">
            <img
              src="/images/rec-pratapgarh-logo.png"
              alt="BRBBA REC Pratapgarh Official Emblem"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#ff5b26] bg-[#ff5b26]/10 px-3 py-1 rounded-full border border-[#ff5b26]/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Official Team Registration
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Register for ADVENTURE 2026
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            7-Step Official Challenge Enrollment • Teams of 2–4 Students • Mandatory Live Verification
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-10 rounded-2xl bg-zinc-950 p-4 border border-zinc-800 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between min-w-[560px]">
            {stepsList.map((step, idx) => {
              const isPassed = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-emerald-500 text-black'
                          : isCurrent
                          ? 'bg-[#ff5b26] text-white ring-4 ring-[#ff5b26]/20'
                          : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="h-4 w-4" /> : step.num}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isCurrent ? 'text-white' : isPassed ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-all ${
                        isPassed ? 'bg-emerald-500/80' : 'bg-zinc-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Error Notification Alert */}
        {errorMsg && (
          <div className="mb-6 rounded-xl bg-rose-950/60 border border-rose-800/80 p-4 flex items-center gap-3 text-xs text-rose-300 animate-in fade-in">
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Main Step Container */}
        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-2xl p-6 sm:p-10 backdrop-blur-md">
          {/* STEP 1: Account Creation */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Step 1: Team Leader Account</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Create your login credentials. The team leader is the primary contact for official communication and live identity verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Full Name (as per Student ID) *
                  </label>
                  <input
                    type="text"
                    value={account.fullName}
                    onChange={(e) => setAccount({ ...account, fullName: e.target.value })}
                    placeholder="e.g. Arjun Mehta"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={account.email}
                    onChange={(e) => setAccount({ ...account, email: e.target.value })}
                    placeholder="arjun@recp.ac.in"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Mobile Number (WhatsApp Enabled) *
                  </label>
                  <input
                    type="tel"
                    value={account.mobileNumber}
                    onChange={(e) => setAccount({ ...account, mobileNumber: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={account.password}
                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={account.confirmPassword}
                    onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Team Creation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Step 2: Team Creation</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Choose your team identity. Team size must strictly be between 2 and 4 student members.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Official Team Name *
                  </label>
                  <input
                    type="text"
                    value={teamInfo.teamName}
                    onChange={(e) => setTeamInfo({ ...teamInfo, teamName: e.target.value })}
                    placeholder="e.g. Awadh Film Syndicate / CineCraft Innovators"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-2">
                    Total Team Size (Including Leader) *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[2, 3, 4].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleTeamSizeChange(size)}
                        className={`rounded-xl p-4 text-center border transition-all ${
                          teamInfo.teamSize === size
                            ? 'bg-[#ff5b26]/10 border-[#ff5b26] text-[#ff5b26] font-bold'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="text-2xl font-black">{size} Members</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {size === 2 ? 'Leader + 1 Member' : size === 3 ? 'Leader + 2 Members' : 'Leader + 3 Members'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-950 p-4 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Auto-Generated Team ID Preview:</span>
                  </div>
                  <span className="font-mono font-bold text-white bg-zinc-800 px-2.5 py-1 rounded-md">
                    ADV26-TM-PREVIEW
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Team Members */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Step 3: Team Member Information</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Provide verified details for the remaining {members.length} team members. All enrollment numbers are validated.
                </p>
              </div>

              <div className="space-y-6">
                {members.map((mem, idx) => (
                  <div key={idx} className="rounded-xl bg-zinc-950/80 p-5 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                      <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                        Team Member #{idx + 2} Details
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">Student Verification</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={mem.fullName}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[idx].fullName = e.target.value;
                            setMembers(updated);
                          }}
                          placeholder="e.g. Priya Sharma"
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5b26]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                          Enrollment / Roll Number *
                        </label>
                        <input
                          type="text"
                          value={mem.enrollmentNumber}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[idx].enrollmentNumber = e.target.value;
                            setMembers(updated);
                          }}
                          placeholder="e.g. 220198010045"
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5b26]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                          Department / Branch *
                        </label>
                        <select
                          value={mem.department}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[idx].department = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                        >
                          <option>Computer Science & Engineering</option>
                          <option>Electronics & Communication</option>
                          <option>Information Technology</option>
                          <option>Mechanical Engineering</option>
                          <option>Civil Engineering</option>
                          <option>Electrical Engineering</option>
                          <option>Applied Sciences / MBA / Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                          Year / Semester *
                        </label>
                        <select
                          value={mem.yearSemester}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[idx].yearSemester = e.target.value;
                            setMembers(updated);
                          }}
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                        >
                          <option>1st Year / 1st-2nd Sem</option>
                          <option>2nd Year / 3rd-4th Sem</option>
                          <option>3rd Year / 5th-6th Sem</option>
                          <option>4th Year / 7th-8th Sem</option>
                          <option>Postgraduate / Scholar</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                          College / Personal Email *
                        </label>
                        <input
                          type="email"
                          value={mem.collegeEmail}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[idx].collegeEmail = e.target.value;
                            setMembers(updated);
                          }}
                          placeholder="priya@recp.ac.in"
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5b26]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          value={mem.mobileNumber}
                          onChange={(e) => {
                            const updated = [...members];
                            updated[idx].mobileNumber = e.target.value;
                            setMembers(updated);
                          }}
                          placeholder="+91 98765 00000"
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5b26]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Mandatory Live Photo Capture */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff5b26]">
                    Mandatory Identity Verification
                  </span>
                  <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded-full border border-red-800">
                    Required
                  </span>
                </div>
                <h2 className="text-xl font-black text-white mt-1">Step 4: Live Photo Capture</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  In compliance with national event security guidelines, the team leader must capture a live photo using the browser camera. Prerecorded or uploaded image files are disallowed to prevent impersonation.
                </p>
              </div>

              {/* Camera Preview Area */}
              <div className="rounded-2xl bg-black p-4 border border-zinc-800 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
                {capturedPhoto ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500 shadow-2xl">
                      <img
                        src={capturedPhoto}
                        alt="Captured identity"
                        className="w-72 h-56 object-cover"
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] bg-black/80 text-emerald-400 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Photo Confirmed
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={retakePhoto}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-xs font-bold text-zinc-200 transition-colors"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Retake Photo</span>
                      </button>
                    </div>
                  </div>
                ) : isCameraActive ? (
                  <div className="relative flex flex-col items-center">
                    <div className="relative rounded-xl overflow-hidden border border-zinc-700 shadow-2xl">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-80 h-60 object-cover bg-zinc-950 scale-x-[-1]"
                      />
                      {/* Face position oval guide */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-40 h-52 border-2 border-dashed border-[#ff5b26] rounded-[50%] opacity-80" />
                      </div>
                      <span className="absolute top-2 left-2 text-[10px] bg-black/70 text-zinc-300 px-2 py-0.5 rounded-md font-medium">
                        Center face within the oval guide
                      </span>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#ff5b26]/30 transition-all hover:scale-105"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Capture Photograph</span>
                      </button>
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="rounded-xl bg-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-300 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-4 max-w-sm">
                    <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-[#ff5b26]">
                      <Camera className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Browser Camera Required</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Click below to grant camera permission and capture a clear frontal snapshot.
                      </p>
                    </div>
                    {cameraError && (
                      <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-[11px] text-red-300">
                        {cameraError}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={startCamera}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] px-6 py-3 text-xs font-extrabold text-white shadow-lg shadow-[#ff5b26]/20 hover:scale-105 transition-all"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Open Camera & Verify</span>
                    </button>
                  </div>
                )}
                {/* Hidden Canvas for capture */}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Consent Checkbox */}
              <div className="rounded-xl bg-zinc-950 p-4 border border-zinc-800 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="photoConsent"
                  checked={photoConsent}
                  onChange={(e) => setPhotoConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-zinc-700 text-[#ff5b26] focus:ring-[#ff5b26]"
                />
                <label htmlFor="photoConsent" className="text-xs text-zinc-300 leading-relaxed cursor-pointer">
                  &ldquo;I consent to the collection and use of my photograph for participant identity verification and event administration by the Institution&rsquo;s Innovation Council (IIC) & Skill Development Cell (SDC), BRBBARECP.&rdquo;
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Competition Pitch Details */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Step 5: Competition Pitch Details</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Select your track and outline your advertisement film concept. You can refine your final video upload until 12 November 2026.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Select Competition Category *
                  </label>
                  <select
                    value={pitch.categoryId}
                    onChange={(e) => setPitch({ ...pitch, categoryId: e.target.value })}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                  >
                    {COMPETITION_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} — {c.tagline}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Business / Enterprise / Startup Name *
                    </label>
                    <input
                      type="text"
                      value={pitch.businessName}
                      onChange={(e) => setPitch({ ...pitch, businessName: e.target.value })}
                      placeholder="e.g. Pratapgarh Organic Amla / AuraPay"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Advertisement Film Title *
                    </label>
                    <input
                      type="text"
                      value={pitch.adTitle}
                      onChange={(e) => setPitch({ ...pitch, adTitle: e.target.value })}
                      placeholder="e.g. Nectar of the Soil / Loose Change to Gold"
                      className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Problem Being Addressed *
                  </label>
                  <textarea
                    rows={2}
                    value={pitch.problemAddressed}
                    onChange={(e) => setPitch({ ...pitch, problemAddressed: e.target.value })}
                    placeholder="What commercial friction or market pain point does this enterprise solve?"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Short Ad Film Synopsis & Storyboard Concept *
                  </label>
                  <textarea
                    rows={3}
                    value={pitch.shortDescription}
                    onChange={(e) => setPitch({ ...pitch, shortDescription: e.target.value })}
                    placeholder="Describe your 30–90 second commercial narrative hook, visual tone, and call-to-action..."
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Mandatory Declarations */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-white">Step 6: Official Declarations</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Please read and accept all 6 mandatory event undertakings. All boxes must be checked to complete registration.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'originality', label: 'Originality: I certify that our advertisement film concept, footage, and script are 100% original creations.' },
                  { key: 'copyright', label: 'Copyright & Music: I declare that all background audio, branding, and visuals used adhere to fair-use or royalty-free licensing.' },
                  { key: 'filmingConsent', label: 'Filming Permissions: I confirm our team has obtained requisite verbal or written consent from featured merchants or locations.' },
                  { key: 'eventRules', label: 'Event Rules: We agree to abide by all constraints (30–90 seconds duration, MP4 container, 2–4 student team members).' },
                  { key: 'accuracy', label: 'Accuracy of Information: All student details and enrollment numbers provided are truthful and subject to institutional audit.' },
                  { key: 'communicationConsent', label: 'Communication Consent: We consent to receiving official competition updates via email and WhatsApp from IIC × SDC.' },
                ].map((dec) => (
                  <div
                    key={dec.key}
                    onClick={() => setDeclarations({ ...declarations, [dec.key]: !declarations[dec.key as keyof typeof declarations] })}
                    className="rounded-xl bg-zinc-950 p-4 border border-zinc-800 flex items-start gap-3 cursor-pointer hover:border-zinc-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={declarations[dec.key as keyof typeof declarations]}
                      onChange={() => {}} // handled by parent onClick
                      className="mt-1 h-4 w-4 rounded border-zinc-700 text-[#ff5b26] focus:ring-[#ff5b26]"
                    />
                    <span className="text-xs text-zinc-300 leading-relaxed select-none">
                      {dec.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: Registration Confirmation */}
          {currentStep === 7 && registrationResult && (
            <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-500">
              <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-black shadow-2xl shadow-emerald-500/30">
                <CheckCircle2 className="h-10 w-10 text-black" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                  Registration Confirmed
                </span>
                <h2 className="text-3xl font-black text-white mt-3">
                  Welcome to ADVENTURE 2026!
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
                  Your team application has been recorded. Your live photo is under administrative verification.
                </p>
              </div>

              {/* Summary Receipt Card */}
              <div className="rounded-2xl bg-zinc-950 p-6 border border-zinc-800 text-left max-w-lg mx-auto space-y-3 text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <span className="text-zinc-400">Team Registration ID:</span>
                  <span className="font-mono font-black text-[#ff5b26] text-sm">{registrationResult.teamRegId}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <span className="text-zinc-400">Registration Reference:</span>
                  <span className="font-mono font-bold text-white">{registrationResult.regId}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <span className="text-zinc-400">Team Name:</span>
                  <span className="font-bold text-white">{registrationResult.teamName}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <span className="text-zinc-400">Competition Track:</span>
                  <span className="font-bold text-[#f59e0b]">{registrationResult.categoryName}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
                  <span className="text-zinc-400">Photo Verification Status:</span>
                  <span className="font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800 text-[10px]">
                    Under Verification
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 text-[11px] text-zinc-500">
                  <span>Registration Timestamp:</span>
                  <span>{registrationResult.timestamp}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-6 py-3 text-xs font-bold text-white transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download / Print Registration Slip</span>
                </button>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-8 py-3 text-xs font-extrabold text-white shadow-xl shadow-[#ff5b26]/30 transition-all hover:scale-105"
                >
                  <span>Go to Participant Dashboard</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons (Steps 1 to 6) */}
          {currentStep < 7 && (
            <div className="mt-10 pt-6 border-t border-zinc-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-5 py-2.5 text-xs font-bold text-zinc-300 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-7 py-3 text-xs font-extrabold text-white shadow-lg shadow-[#ff5b26]/25 transition-all hover:scale-105 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" /> Submitting...
                  </span>
                ) : currentStep === 6 ? (
                  <span>Submit Team Registration</span>
                ) : (
                  <>
                    <span>Next Step</span>
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
