'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Camera, 
  Film, 
  Award, 
  Settings, 
  BarChart3, 
  Megaphone, 
  Layers, 
  FileCheck,
  ChevronRight,
  Video
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser } = useApp();

  const adminNav = [
    { name: 'Dashboard Overview', href: '/admin', icon: BarChart3 },
    { name: 'Photo Verification', href: '/admin/photos', icon: Camera },
    { name: 'Video Submissions', href: '/admin/videos', icon: Film },
    { name: 'Judge Assignments', href: '/admin/judges', icon: Award },
    { name: 'Event Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#090b0e] text-white flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-800/80 bg-[#0d0f12] flex flex-col justify-between shrink-0">
        <div className="p-5">
          {/* Header */}
          <div className="rounded-xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-900 p-4 border border-zinc-800 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff5b26] mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>ORGANIZER CONSOLE</span>
            </div>
            <h2 className="text-sm font-black text-white">
              IIC × SDC Committee
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              ADVENTURE 2026 Admin
            </p>
          </div>

          {/* Links */}
          <nav className="space-y-1">
            {adminNav.map((item) => {
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

        {/* Admin Persona Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/60 text-xs">
          <div className="font-bold text-white">{currentUser.fullName}</div>
          <div className="text-[10px] text-zinc-400">{currentUser.email}</div>
          <div className="mt-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            Super Administrator
          </div>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
