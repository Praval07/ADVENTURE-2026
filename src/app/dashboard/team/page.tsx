'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Users, UserPlus, Trash2, ShieldCheck, Mail, Phone, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function TeamManagementPage() {
  const { myTeam } = useApp();

  const [membersList, setMembersList] = useState(myTeam?.members || []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    fullName: '',
    enrollmentNumber: '',
    department: 'Computer Science & Engineering',
    yearSemester: '3rd Year / 5th Sem',
    collegeEmail: '',
    mobileNumber: '',
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (membersList.length >= 4) return;

    const added = {
      id: `mem-${Date.now()}`,
      teamId: myTeam?.id || 'team-1',
      fullName: newMember.fullName,
      enrollmentNumber: newMember.enrollmentNumber,
      department: newMember.department,
      yearSemester: newMember.yearSemester,
      collegeEmail: newMember.collegeEmail,
      mobileNumber: newMember.mobileNumber,
      isLeader: false,
      photoStatus: 'Verified' as const,
      createdAt: new Date().toISOString(),
    };

    setMembersList([...membersList, added]);
    setShowAddModal(false);
    setNewMember({
      fullName: '',
      enrollmentNumber: '',
      department: 'Computer Science & Engineering',
      yearSemester: '3rd Year / 5th Sem',
      collegeEmail: '',
      mobileNumber: '',
    });
  };

  const handleRemoveMember = (id: string) => {
    if (membersList.length <= 2) {
      alert('Event rules strictly require a minimum of 2 team members.');
      return;
    }
    setMembersList(membersList.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff5b26] mb-1">
            <Users className="h-4 w-4" />
            <span>ROSTER MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Team Members ({membersList.length} / 4)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Enforcing the mandatory 2 to 4 student member limit.
          </p>
        </div>

        {membersList.length < 4 && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#ff5b26]/20 transition-all hover:scale-105"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Member ({4 - membersList.length} slots left)</span>
          </button>
        )}
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {membersList.map((member, idx) => (
          <div
            key={member.id}
            className={`rounded-2xl p-6 border transition-all ${
              member.isLeader
                ? 'bg-zinc-900/90 border-[#ff5b26]/60 shadow-xl shadow-[#ff5b26]/5'
                : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-black text-sm ${
                  member.isLeader ? 'bg-gradient-to-tr from-[#ff5b26] to-[#f59e0b] text-white' : 'bg-zinc-800 text-zinc-300'
                }`}>
                  {member.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{member.fullName}</h3>
                    {member.isLeader && (
                      <span className="text-[10px] bg-[#ff5b26]/20 text-[#ff5b26] font-bold px-2 py-0.5 rounded-full border border-[#ff5b26]/30">
                        Leader
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs text-zinc-400 block">{member.enrollmentNumber}</span>
                </div>
              </div>

              {!member.isLeader && membersList.length > 2 && (
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                  title="Remove Member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-2 text-xs text-zinc-300 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#f59e0b] shrink-0" />
                <span className="truncate">{member.department} • {member.yearSemester}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#ff5b26] shrink-0" />
                <span className="truncate">{member.collegeEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{member.mobileNumber}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
              <span className="text-zinc-500">Student Identity:</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" /> Enrolled & Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-black text-white mb-1">Add Team Member</h3>
            <p className="text-xs text-zinc-400 mb-4">
              Enter official college student credentials. Team size limit is 4.
            </p>

            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newMember.fullName}
                  onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                  placeholder="e.g. Rahul Gupta"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Enrollment / Roll No *</label>
                <input
                  type="text"
                  required
                  value={newMember.enrollmentNumber}
                  onChange={(e) => setNewMember({ ...newMember, enrollmentNumber: e.target.value })}
                  placeholder="e.g. 230198010049"
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Department</label>
                  <select
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                  >
                    <option>Computer Science & Engineering</option>
                    <option>Electronics & Communication</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil Engineering</option>
                    <option>Electrical Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Year / Sem</label>
                  <select
                    value={newMember.yearSemester}
                    onChange={(e) => setNewMember({ ...newMember, yearSemester: e.target.value })}
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                  >
                    <option>1st Year / 1st-2nd Sem</option>
                    <option>2nd Year / 3rd-4th Sem</option>
                    <option>3rd Year / 5th-6th Sem</option>
                    <option>4th Year / 7th-8th Sem</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newMember.collegeEmail}
                    onChange={(e) => setNewMember({ ...newMember, collegeEmail: e.target.value })}
                    placeholder="student@recp.ac.in"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={newMember.mobileNumber}
                    onChange={(e) => setNewMember({ ...newMember, mobileNumber: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#ff5b26]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl bg-zinc-800 px-4 py-2 text-xs font-bold text-zinc-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#ff5b26] hover:bg-[#e24a18] px-5 py-2 text-xs font-bold text-white shadow-lg"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
