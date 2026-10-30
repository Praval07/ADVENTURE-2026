import React from 'react';
import Link from 'next/link';
import { Film, Mail, MapPin, ExternalLink, ShieldCheck, Heart, Award, ArrowUpRight } from 'lucide-react';
import { COMPETITION_CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-[#282f3d] bg-[#090b0e] text-zinc-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#ff5b26]/20 via-[#f59e0b]/15 to-[#ff5b26]/20 py-8 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Ready to Craft Your 30–90s Commercial Masterpiece?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Teams of 2–4 students • ₹100% Free Registration • 8 Categories • National Recognition
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff5b26] to-[#f59e0b] px-6 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-xl shadow-[#ff5b26]/20 hover:scale-[1.02] transition-all"
          >
            <span>Register Your Team Now</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Institution Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 border border-white/80 shadow-md shrink-0">
                <img
                  src="/images/rec-pratapgarh-logo.png"
                  alt="BRBBA REC Pratapgarh Official Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">
                  ADVENTURE <span className="text-[#ff5b26]">2026</span>
                </span>
                <p className="text-[11px] text-zinc-400 font-medium">The Entrepreneurship Ad Film Challenge</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
              A premier national entrepreneurship initiative challenging student teams to discover inspiring businesses, craft compelling video commercials, and pitch real market value through cinematic storytelling.
            </p>

            <div className="pt-2 space-y-2 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#ff5b26] shrink-0 mt-0.5" />
                <span>
                  Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College, Pratapgarh, Uttar Pradesh – 230001, India.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#ff5b26] shrink-0" />
                <a href="mailto:iic.recpratapgarh@gmail.com" className="hover:text-white transition-colors">
                  iic.recpratapgarh@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-1 text-[11px] font-semibold text-zinc-300 border border-zinc-700/50">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Ministry of Education IIC
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-800/80 px-3 py-1 text-[11px] font-semibold text-zinc-300 border border-zinc-700/50">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                Skill Development Cell
              </span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Challenge Guide</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><Link href="/#about" className="hover:text-white transition-colors">About the Challenge</Link></li>
              <li><Link href="/#timeline" className="hover:text-white transition-colors">Important Dates</Link></li>
              <li><Link href="/#guidelines" className="hover:text-white transition-colors">Rules & Constraints</Link></li>
              <li><Link href="/#evaluation" className="hover:text-white transition-colors">Evaluation Matrix (100 Marks)</Link></li>
              <li><Link href="/#prizes" className="hover:text-white transition-colors">Prizes & Certificates</Link></li>
              <li><Link href="/#faqs" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Col 4: Competition Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">8 Categories</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              {COMPETITION_CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/#categories`} className="hover:text-[#ff5b26] transition-colors line-clamp-1">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/#categories" className="text-[#ff5b26] hover:underline font-medium">+ 2 More Categories</Link></li>
            </ul>
          </div>

          {/* Col 5: Platform Access & Verification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Portals & Verify</h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><Link href="/register" className="hover:text-white transition-colors">Team Registration</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Participant Dashboard</Link></li>
              <li><Link href="/dashboard/video" className="hover:text-white transition-colors">Upload 30–90s Video</Link></li>
              <li><Link href="/judge" className="hover:text-white transition-colors">Jury Scoring Workbench</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Organizer Admin Portal</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Official Leaderboard</Link></li>
              <li><Link href="/certificates/verify/ADV26-CERT-2026-8801" className="text-[#f59e0b] hover:underline">Verify Certificate QR</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Institution&apos;s Innovation Council (IIC) × Skill Development Cell (SDC), BRBBARECP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Organized with <Heart className="h-3.5 w-3.5 text-rose-500 inline fill-rose-500" /> for Student Innovators
            </span>
            <a href="mailto:iic.recpratapgarh@gmail.com" className="hover:text-white transition-colors">Support Desk</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
