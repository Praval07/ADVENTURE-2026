'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Settings, Save, CheckCircle2, ShieldCheck, Calendar, Film, Users, Award } from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings, toggleResultPublication } = useApp();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
          <Settings className="h-4 w-4" />
          <span>CENTRAL CONFIGURATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Event Dates, Parameters & Constraints
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          All deadlines, thresholds, and portal availability are driven centrally from these settings.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 flex items-center gap-3 text-xs text-emerald-300 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span className="font-bold">Event settings successfully updated and saved across the platform!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-zinc-900/80 p-6 sm:p-8 border border-zinc-800 shadow-xl">
        {/* Event Identity */}
        <div>
          <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-2 mb-4">
            Event Title & Organizers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Event Name</label>
              <input
                type="text"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Official Email</label>
              <input
                type="email"
                value={formData.officialEmail}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-zinc-300 mb-1">Headline</label>
              <input
                type="text"
                value={formData.eventHeadline}
                onChange={(e) => setFormData({ ...formData, eventHeadline: e.target.value })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
          </div>
        </div>

        {/* Official Deadlines */}
        <div>
          <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-2 mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#ff5b26]" /> Official Event Timeline Dates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Registration Open</label>
              <input
                type="date"
                value={formData.registrationOpenDate}
                onChange={(e) => setFormData({ ...formData, registrationOpenDate: e.target.value })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Registration Deadline</label>
              <input
                type="date"
                value={formData.registrationCloseDate}
                onChange={(e) => setFormData({ ...formData, registrationCloseDate: e.target.value })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Video Submission Deadline</label>
              <input
                type="date"
                value={formData.videoDeadlineDate}
                onChange={(e) => setFormData({ ...formData, videoDeadlineDate: e.target.value })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
          </div>
        </div>

        {/* Video & Team Constraints */}
        <div>
          <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-2 mb-4 flex items-center gap-2">
            <Film className="h-4 w-4 text-[#f59e0b]" /> Rules & Technical Constraints
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Min Duration (s)</label>
              <input
                type="number"
                value={formData.minVideoDurationSeconds}
                onChange={(e) => setFormData({ ...formData, minVideoDurationSeconds: Number(e.target.value) })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Max Duration (s)</label>
              <input
                type="number"
                value={formData.maxVideoDurationSeconds}
                onChange={(e) => setFormData({ ...formData, maxVideoDurationSeconds: Number(e.target.value) })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Min Team Size</label>
              <input
                type="number"
                value={formData.minTeamSize}
                onChange={(e) => setFormData({ ...formData, minTeamSize: Number(e.target.value) })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Max Team Size</label>
              <input
                type="number"
                value={formData.maxTeamSize}
                onChange={(e) => setFormData({ ...formData, maxTeamSize: Number(e.target.value) })}
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
              />
            </div>
          </div>
        </div>

        {/* Global Feature Switches */}
        <div>
          <h3 className="text-sm font-bold text-white border-b border-zinc-800 pb-2 mb-4">
            Master Portal Controls
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <span className="text-xs font-bold text-white block">Team Registration Availability</span>
                <span className="text-[11px] text-zinc-400">Controls whether students can start new registrations</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isRegistrationOpen}
                onChange={(e) => setFormData({ ...formData, isRegistrationOpen: e.target.checked })}
                className="h-5 w-5 rounded text-[#ff5b26] focus:ring-[#ff5b26]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <span className="text-xs font-bold text-white block">Official Result Publication</span>
                <span className="text-[11px] text-zinc-400">Controls whether public leaderboard reveals final ranks</span>
              </div>
              <input
                type="checkbox"
                checked={formData.areResultsPublished}
                onChange={(e) => setFormData({ ...formData, areResultsPublished: e.target.checked })}
                className="h-5 w-5 rounded text-[#ff5b26] focus:ring-[#ff5b26]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <span className="text-xs font-bold text-white block">Certificates Availability</span>
                <span className="text-[11px] text-zinc-400">Enables participants to generate and download official PDF certificates</span>
              </div>
              <input
                type="checkbox"
                checked={formData.areCertificatesAvailable}
                onChange={(e) => setFormData({ ...formData, areCertificatesAvailable: e.target.checked })}
                className="h-5 w-5 rounded text-[#ff5b26] focus:ring-[#ff5b26]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-7 py-3 text-xs font-extrabold text-white shadow-xl shadow-[#ff5b26]/20 transition-all hover:scale-105"
          >
            <Save className="h-4 w-4" />
            <span>Save All Event Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
