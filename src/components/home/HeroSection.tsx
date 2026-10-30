'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Volume2, 
  VolumeX, 
  Calendar, 
  Clock, 
  Building2,
  Film
} from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Performance & Accessibility: Respect prefers-reduced-motion and pause off-screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      video.pause();
    }

    // IntersectionObserver to pause video when hero is not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause();
          } else if (!mediaQuery.matches) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Audio Toggle Handler
  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#080B0E] text-[#F5F2EA] pt-20 pb-16 lg:py-24"
    >
      {/* ============================================================ */}
      {/* CINEMATIC VIDEO BACKGROUND (BRIGHT & CRISP)                  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          poster="/images/adventure-2026-hero-poster.webp"
          onLoadedData={() => setVideoLoaded(true)}
          className={`h-full w-full object-cover object-center filter brightness-[1.05] contrast-[1.08] saturate-[1.08] transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-85 sm:opacity-90' : 'opacity-70'
          }`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/videos/adventure-2026-hero.mp4" type="video/mp4" />
        </video>

        {/* Lightweight Directional Scrim (Gives copy high contrast without darkening the video) */}
        {/* Soft horizontal text-contrast gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080B0E]/80 via-[#080B0E]/45 to-transparent" />

        {/* Subtle radial spotlight behind text column for crisp legibility */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 25% 45%, rgba(8,11,14,0.6) 0%, rgba(8,11,14,0.2) 55%, transparent 80%)'
          }}
        />

        {/* Soft bottom vignette blending into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/60 to-transparent" />

        {/* Top subtle navbar shadow */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#080B0E]/70 to-transparent" />
      </div>

      {/* Floating Cinematic Video Badge (Top Right) */}
      <div className="hidden md:flex absolute top-24 right-8 z-10 items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 border border-white/15 backdrop-blur-md shadow-xl text-xs">
        <Film className="h-3.5 w-3.5 text-[#FF9D00]" />
        <span className="font-semibold text-zinc-300">Cinematic 24 FPS Footage</span>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* ============================================================ */}
      {/* HERO EDITORIAL CONTENT (FULL-BLEED CINEMATIC MOVIE STYLE)    */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl flex flex-col items-start text-left">
          
          {/* Official College Emblem & Institutional Presenter */}
          <div className="flex items-center gap-3.5 mb-5 group">
            <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_0_25px_rgba(255,255,255,0.4)] border-2 border-[#FFBE32] shrink-0 transition-transform hover:scale-105">
              <div className="h-full w-full rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/images/rec-pratapgarh-logo.png"
                  alt="Rajkiya Engineering College, Pratapgarh Official Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#080B0E] z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-[#FF9D00] shadow-[0_0_10px_#FF9D00] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#FFBE32] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  IIC × SDC PRESENTS
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#F5F2EA] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] line-clamp-1">
                Bharat Ratna Babasaheb Bhimrao Ambedkar REC, Pratapgarh
              </p>
            </div>
          </div>

          {/* Grand Cinematic Movie Title */}
          <div className="mb-2 space-y-0.5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase font-sans leading-[0.9] text-[#F5F2EA] drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)]">
              ADVENTURE
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-[#FF9D00] via-[#FFAE19] to-[#FFBE32] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,157,0,0.55)]">
                2026
              </span>
              <span className="h-0.5 w-16 sm:w-24 bg-gradient-to-r from-[#FF9D00]/70 to-transparent" />
            </div>
          </div>

          {/* Official Challenge Designation */}
          <div className="mb-4">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.24em] uppercase text-[#FFBE32] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              THE ENTREPRENEURSHIP AD FILM CHALLENGE
            </p>
          </div>

          {/* Cinematic Tagline & Narrative Hook */}
          <div className="max-w-xl mb-6">
            <p className="text-lg sm:text-xl md:text-2xl font-black text-[#F5F2EA] tracking-tight leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Turn Your Ideas Into Stories.{' '}
              <span className="bg-gradient-to-r from-[#FF9D00] to-[#FFBE32] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,157,0,0.4)]">
                Turn Stories Into Impact.
              </span>
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed mt-2.5 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              Craft a 30–90 second cinematic ad film. Pitch bold student innovations and bring startup stories to life on the national stage.
            </p>
          </div>

          {/* Cinematic Glowing Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-7">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF9D00] via-[#FFAE19] to-[#FFBE32] px-7 py-3.5 text-xs sm:text-sm font-black text-[#080B0E] uppercase tracking-wider shadow-[0_0_25px_rgba(255,157,0,0.45)] hover:shadow-[0_0_40px_rgba(255,190,50,0.7)] hover:scale-105 active:scale-[0.98] transition-all group"
            >
              <Sparkles className="h-4 w-4 text-[#080B0E] group-hover:rotate-12 transition-transform" />
              <span>REGISTER YOUR TEAM</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/#about"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black/40 hover:bg-black/60 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#F5F2EA] border border-white/20 hover:border-[#FFBE32] backdrop-blur-xl shadow-lg transition-all hover:scale-105 active:scale-[0.98]"
            >
              <Play className="h-3.5 w-3.5 text-[#FF9D00] fill-[#FF9D00]" />
              <span>EXPLORE CHALLENGE</span>
            </Link>
          </div>

          {/* Cinematic Movie Credits / Metadata Strip (Clean, Seamless, No Box) */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-zinc-300 pt-4 border-t border-white/15 max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#FF9D00]" />
              <span><strong className="text-[#F5F2EA]">Registration:</strong> 29 Oct – 5 Nov 2026</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#FFBE32]" />
              <span><strong className="text-[#F5F2EA]">Deadline:</strong> 12 Nov 2026</span>
            </div>
            <span className="hidden sm:inline text-white/30">•</span>
            <div className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-[#FF9D00]" />
              <span className="text-zinc-300">REC Pratapgarh</span>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* FLOATING AUDIO CONTROLLER                                    */}
      {/* ============================================================ */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-[#F5F2EA] border border-white/25 shadow-2xl backdrop-blur-xl hover:border-[#FF9D00] hover:text-[#FF9D00] hover:scale-105 transition-all active:scale-95 group"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-zinc-400 group-hover:text-[#FF9D00]" />
        ) : (
          <Volume2 className="h-5 w-5 text-[#FF9D00] animate-pulse" />
        )}
      </button>

      {/* Subtle Scroll Hint */}
      <div className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 text-zinc-400 animate-bounce pointer-events-none">
        <span className="text-[9px] uppercase font-bold tracking-[0.25em]">Scroll</span>
        <div className="w-1 h-3 rounded-full bg-[#FF9D00]" />
      </div>
    </section>
  );
}
