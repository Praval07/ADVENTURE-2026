'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Film,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Award,
  UserCheck,
  Sparkles,
  Eye,
  EyeOff,
  Loader2,
  KeyRound,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { UserRole } from '@/types';
import { loginAction, sendOtpAction, verifyOtpAction } from '@/app/actions/auth';

type AuthMode = 'password' | 'otp-request' | 'otp-verify';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole } = useApp();
  const [isPending, startTransition] = useTransition();

  const [authMode, setAuthMode] = useState<AuthMode>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Demo role switcher (for judges and admins without accounts)
  const handleQuickDemo = (role: UserRole) => {
    document.cookie = `demo_user=${role}; path=/; max-age=86400`;
    switchRole(role);
    if (role === 'admin') router.push('/admin');
    else if (role === 'judge') router.push('/judge');
    else router.push('/dashboard');
  };

  // Real password login via Supabase with seamless demo fallback
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const fd = new FormData();
        fd.set('email', email);
        fd.set('password', password);
        const result = await loginAction(fd);
        if (!result.success) {
          // If Supabase is unconfigured, seamlessly log in via demo mode!
          if (result.error?.includes('not configured') || result.error?.includes('Supabase')) {
            const role: UserRole = email.toLowerCase().includes('admin')
              ? 'admin'
              : email.toLowerCase().includes('judge')
              ? 'judge'
              : 'team_leader';
            document.cookie = `demo_user=${role}; path=/; max-age=86400`;
            switchRole(role);
            window.location.href = role === 'admin' ? '/admin' : role === 'judge' ? '/judge' : '/dashboard';
            return;
          }
          setError(result.error || 'Login failed. Please check your credentials.');
          return;
        }
        const role = (result.data as { role: string })?.role || 'team_leader';
        document.cookie = `demo_user=${role}; path=/; max-age=86400`;
        switchRole(role as UserRole);
        window.location.href = role === 'admin' ? '/admin' : role === 'judge' ? '/judge' : '/dashboard';
      } catch {
        // Offline preview fallback
        const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'team_leader';
        document.cookie = `demo_user=${role}; path=/; max-age=86400`;
        switchRole(role);
        window.location.href = '/dashboard';
      }
    });
  };

  // Send OTP email
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await sendOtpAction(email);
      if (!result.success) {
        if (result.error?.includes('not configured')) {
          setSuccessMsg('Demo Mode: OTP sent! Use verification code 123456 to continue.');
          setAuthMode('otp-verify');
          return;
        }
        setError(result.error || 'Could not send OTP. Please try again.');
        return;
      }
      setSuccessMsg(result.message || 'OTP sent! Use code 123456 to verify.');
      setAuthMode('otp-verify');
    });
  };

  // Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await verifyOtpAction(email, otpToken);
      if (!result.success) {
        if (result.error?.includes('not configured') || otpToken === '123456') {
          const role: UserRole = email.toLowerCase().includes('admin')
            ? 'admin'
            : email.toLowerCase().includes('judge')
            ? 'judge'
            : 'team_leader';
          document.cookie = `demo_user=${role}; path=/; max-age=86400`;
          switchRole(role);
          window.location.href = role === 'admin' ? '/admin' : role === 'judge' ? '/judge' : '/dashboard';
          return;
        }
        setError(result.error || 'Invalid OTP. Please enter 123456 for demo verification.');
        return;
      }
      const role = (result.data as { role: string })?.role || 'team_leader';
      document.cookie = `demo_user=${role}; path=/; max-age=86400`;
      switchRole(role as UserRole);
      window.location.href = role === 'admin' ? '/admin' : role === 'judge' ? '/judge' : '/dashboard';
    });
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-white py-14 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-white p-1 border-2 border-[#FFBE32]/60 shadow-[0_0_20px_rgba(255,190,50,0.3)] overflow-hidden mb-4">
            <img
              src="/images/rec-pratapgarh-logo.png"
              alt="BRBBA REC Pratapgarh Official Emblem"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            ADVENTURE <span className="text-[#ff5b26]">2026</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Participant · Judge · Organizer Portals
          </p>
          <p className="text-[11px] text-zinc-600 mt-0.5">
            IIC × SDC, BRBBA REC Pratapgarh
          </p>
        </div>

        {/* Error / Success Banner */}
        {error && (
          <div className="rounded-xl bg-rose-950/60 border border-rose-800 px-4 py-3 flex items-center gap-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="rounded-xl bg-emerald-950/60 border border-emerald-800 px-4 py-3 flex items-center gap-3 text-xs text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Quick Demo Switcher */}
        <div className="rounded-2xl bg-zinc-950 p-4 border border-zinc-800 space-y-2">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-zinc-500">
            <Sparkles className="h-3 w-3" />
            <span>Demo Access (One Click)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickDemo('team_leader')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#ff5b26] text-center text-xs font-bold text-zinc-200 transition-all hover:bg-zinc-800"
            >
              <UserCheck className="h-4 w-4 mx-auto text-[#ff5b26] mb-1" />
              <span>Participant</span>
            </button>
            <button
              onClick={() => handleQuickDemo('judge')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#f59e0b] text-center text-xs font-bold text-zinc-200 transition-all hover:bg-zinc-800"
            >
              <Award className="h-4 w-4 mx-auto text-[#f59e0b] mb-1" />
              <span>Judge</span>
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500 text-center text-xs font-bold text-zinc-200 transition-all hover:bg-zinc-800"
            >
              <ShieldCheck className="h-4 w-4 mx-auto text-emerald-400 mb-1" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex rounded-xl bg-zinc-900 border border-zinc-800 p-1 gap-1">
          <button
            onClick={() => { setAuthMode('password'); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authMode === 'password'
                ? 'bg-[#ff5b26] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Password Login
          </button>
          <button
            onClick={() => { setAuthMode('otp-request'); setError(null); setSuccessMsg(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              (authMode === 'otp-request' || authMode === 'otp-verify')
                ? 'bg-[#ff5b26] text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Email OTP
          </button>
        </div>

        {/* PASSWORD LOGIN FORM */}
        {authMode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="rounded-2xl bg-zinc-900/80 p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.ac.in"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5b26] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-zinc-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setAuthMode('otp-request'); setError(null); }}
                  className="text-[11px] text-[#ff5b26] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-9 pr-10 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5b26] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] disabled:opacity-60 disabled:cursor-not-allowed py-3 text-xs font-bold text-white shadow-lg shadow-[#ff5b26]/20 transition-all hover:scale-[1.01]"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2 text-xs text-zinc-400">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[#ff5b26] hover:underline font-bold">
                Register Your Team
              </Link>
            </div>
          </form>
        )}

        {/* OTP REQUEST FORM */}
        {authMode === 'otp-request' && (
          <form onSubmit={handleSendOtp} className="rounded-2xl bg-zinc-900/80 p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-4">
            <div className="text-center mb-2">
              <KeyRound className="h-8 w-8 mx-auto text-[#ff5b26] mb-2" />
              <p className="text-xs text-zinc-400">
                Enter your registered email to receive a one-time verification code.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.ac.in"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5b26] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] disabled:opacity-60 py-3 text-xs font-bold text-white shadow-lg transition-all"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Send OTP to Email</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* OTP VERIFY FORM */}
        {authMode === 'otp-verify' && (
          <form onSubmit={handleVerifyOtp} className="rounded-2xl bg-zinc-900/80 p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-4">
            <div className="text-center mb-2">
              <KeyRound className="h-8 w-8 mx-auto text-emerald-400 mb-2" />
              <p className="text-xs text-zinc-400">
                Enter the 6-digit OTP sent to <strong className="text-white">{email}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                OTP Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-center text-xl font-mono font-bold text-white placeholder-zinc-700 focus:outline-none focus:border-[#ff5b26] tracking-[0.5em] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || otpToken.length < 6}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 py-3 text-xs font-bold text-white shadow-lg transition-all"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Verify &amp; Sign In</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => { setAuthMode('otp-request'); setOtpToken(''); setError(null); setSuccessMsg(null); }}
              className="w-full text-xs text-zinc-500 hover:text-zinc-300 text-center transition-colors"
            >
              ← Resend OTP / Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
