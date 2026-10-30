'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Film, 
  Menu, 
  X, 
  Bell, 
  ShieldCheck, 
  Award, 
  UserCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { UserRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, switchRole, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Categories', href: '/#categories' },
    { name: 'Timeline', href: '/#timeline' },
    { name: 'Guidelines', href: '/#guidelines' },
    { name: 'Evaluation', href: '/#evaluation' },
    { name: 'Prizes', href: '/#prizes' },
    { name: 'FAQs', href: '/#faqs' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#282f3d]/50 bg-[#0d0f12]/90 backdrop-blur-md text-white transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 border-2 border-[#FFBE32]/60 shadow-[0_0_15px_rgba(255,190,50,0.35)] transition-transform group-hover:scale-105 shrink-0">
            <div className="h-full w-full rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="/images/rec-pratapgarh-logo.png"
                alt="BRBBA REC Pratapgarh Official Emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0d0f12] z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-[#ff5b26] transition-colors">
                ADVENTURE <span className="text-[#ff5b26]">2026</span>
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-[#ff5b26]/10 px-2.5 py-0.5 text-xs font-semibold text-[#ff5b26] border border-[#ff5b26]/30">
                IIC × SDC
              </span>
            </div>
            <p className="text-[11px] font-medium text-zinc-400 tracking-wide line-clamp-1">
              BRBBA REC Pratapgarh
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all ${
                pathname === link.href 
                  ? 'text-[#ff5b26] bg-[#ff5b26]/10' 
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Quick Persona / Role Switcher for QA and Multi-role Testing */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-lg bg-[#181b22] px-3 py-1.5 text-xs font-medium text-zinc-200 border border-zinc-700/60 hover:border-[#ff5b26]/50 transition-colors"
              title="Switch demo persona for instant role testing"
            >
              <div className="h-2 w-2 rounded-full bg-[#ff5b26] animate-pulse" />
              <span className="hidden md:inline text-zinc-400">Role:</span>
              <span suppressHydrationWarning className="capitalize font-semibold text-white">
                {currentUser.role.replace('_', ' ')}
              </span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#14171d] p-2 text-white shadow-2xl border border-zinc-800 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-zinc-800 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Switch Active Persona
                </div>
                {(['team_leader', 'judge', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchRole(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      currentUser.role === r 
                        ? 'bg-[#ff5b26] text-white font-bold' 
                        : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                    }`}
                  >
                    <span>{r === 'team_leader' ? 'Participant / Leader' : r === 'judge' ? 'Evaluation Judge' : 'Event Organizer / Admin'}</span>
                    {currentUser.role === r && <ShieldCheck className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* In-app Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5b26] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5b26]"></span>
                </span>
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#14171d] p-3 text-white shadow-2xl border border-zinc-800 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-xs font-bold text-zinc-300">Live Notifications</span>
                  <span className="text-[10px] bg-[#ff5b26]/20 text-[#ff5b26] px-2 py-0.5 rounded-full font-bold">
                    {unreadNotifs.length} New
                  </span>
                </div>
                <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80 text-xs">
                      <div className="font-semibold text-zinc-200">{n.title}</div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Primary Role-Aware Action Buttons */}
          {currentUser.role === 'admin' ? (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff5b26] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#ff5b26]/25 hover:bg-[#e24a18] transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin Console</span>
            </Link>
          ) : currentUser.role === 'judge' ? (
            <Link
              href="/judge"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#f59e0b] px-4 py-2 text-xs font-bold text-black shadow-lg shadow-[#f59e0b]/25 hover:bg-[#d97706] transition-all"
            >
              <Award className="h-4 w-4" />
              <span>Judge Workbench</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <UserCheck className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff5b26] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#ff5b26]/25 hover:bg-[#e24a18] transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Register Team</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-zinc-800/80 bg-[#0d0f12] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-2.5 text-xs font-medium text-zinc-200 hover:bg-[#ff5b26]/10 hover:text-[#ff5b26] transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#ff5b26] py-2.5 text-xs font-bold text-white shadow-md shadow-[#ff5b26]/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Register Your Team (2–4 Students)</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-zinc-800 py-2.5 text-xs font-bold text-zinc-200"
            >
              <span>Participant Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
