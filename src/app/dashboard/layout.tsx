'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Camera, 
  Film, 
  History, 
  Award, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { myTeam, currentUser } = useApp();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Team & Members', href: '/dashboard/team', icon: Users },
    { name: 'Photo Verification', href: '/dashboard/photo', icon: Camera },
    { name: 'Video Submission', href: '/dashboard/video', icon: Film },
    { name: 'Official Certificates', href: '/dashboard/certificates', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#090b0e] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-800/80 bg-[#0d0f12] flex flex-col justify-between shrink-0">
        <div className="p-5">
          {/* Team Identifier Header */}
          <div className="rounded-xl bg-zinc-900/90 p-4 border border-zinc-800 mb-6">
            <span className="text-[10px] font-mono text-[#ff5b26] font-bold block mb-0.5">
              {myTeam?.teamRegId || 'ADV26-TM-XXXX'}
            </span>
            <h2 className="text-sm font-black text-white truncate">
              {myTeam?.teamName || 'Your Registered Team'}
            </h2>
            <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
              <span>{myTeam?.categoryName || 'Category'}</span>
              <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-medium">
                {myTeam?.teamSize || 3} Members
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#ff5b26] text-white shadow-md shadow-[#ff5b26]/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3.5 w-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Persona Info */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#ff5b26] to-[#f59e0b] text-white font-bold text-xs">
              {currentUser.fullName.charAt(0)}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{currentUser.fullName}</div>
              <div className="text-[10px] text-zinc-400 truncate">{currentUser.email}</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
            <span>Status: Active</span>
            <Link href="/" className="hover:text-zinc-300">Public Site</Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
