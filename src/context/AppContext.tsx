'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Team, 
  VideoSubmission, 
  EvaluationScore, 
  EventSettings, 
  PhotoVerificationStatus,
  UserRole,
  Announcement,
  InAppNotification,
  CertificateRecord
} from '@/types';
import { 
  INITIAL_USER, 
  INITIAL_ADMIN, 
  INITIAL_JUDGE, 
  INITIAL_TEAMS, 
  INITIAL_SUBMISSIONS, 
  INITIAL_EVALUATIONS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CERTIFICATES
} from '@/lib/store';
import { OFFICIAL_SETTINGS } from '@/lib/constants';

interface AppContextType {
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  teams: Team[];
  myTeam: Team | null;
  submissions: VideoSubmission[];
  evaluations: Record<string, EvaluationScore>;
  settings: EventSettings;
  announcements: Announcement[];
  notifications: InAppNotification[];
  certificates: CertificateRecord[];
  
  // Participant actions
  registerNewTeam: (teamData: Partial<Team> & { leaderName: string; leaderEmail: string; photoUrl: string }) => Team;
  updateLivePhoto: (teamId: string, photoUrl: string) => void;
  submitVideo: (submissionData: Omit<VideoSubmission, 'id' | 'submissionId' | 'status' | 'submittedAt'>) => VideoSubmission;
  
  // Admin actions
  verifyPhoto: (teamId: string, status: PhotoVerificationStatus, rejectionReason?: string) => void;
  updateSettings: (newSettings: Partial<EventSettings>) => void;
  toggleResultPublication: () => void;
  
  // Judge actions
  saveEvaluation: (score: EvaluationScore) => void;
  
  // Notification actions
  markNotificationAsRead: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [submissions, setSubmissions] = useState<VideoSubmission[]>(INITIAL_SUBMISSIONS);
  const [evaluations, setEvaluations] = useState<Record<string, EvaluationScore>>(INITIAL_EVALUATIONS);
  const [settings, setSettings] = useState<EventSettings>(OFFICIAL_SETTINGS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState<InAppNotification[]>(INITIAL_NOTIFICATIONS);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(INITIAL_CERTIFICATES);

  // Load any stored preferences from localStorage if client side
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('adv26_active_role');
      if (savedRole) {
        queueMicrotask(() => {
          if (savedRole === 'admin') setCurrentUser(INITIAL_ADMIN);
          else if (savedRole === 'judge') setCurrentUser(INITIAL_JUDGE);
          else if (savedRole === 'team_leader') setCurrentUser(INITIAL_USER);
        });
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const switchRole = (role: UserRole) => {
    if (role === 'admin' || role === 'super_admin') {
      setCurrentUser(INITIAL_ADMIN);
      try { localStorage.setItem('adv26_active_role', 'admin'); } catch {}
    } else if (role === 'judge') {
      setCurrentUser(INITIAL_JUDGE);
      try { localStorage.setItem('adv26_active_role', 'judge'); } catch {}
    } else {
      setCurrentUser(INITIAL_USER);
      try { localStorage.setItem('adv26_active_role', 'team_leader'); } catch {}
    }
  };

  const myTeam = teams.find(t => t.leaderId === currentUser.id || t.members.some(m => m.collegeEmail === currentUser.email)) || teams[0] || null;

  const registerNewTeam = (data: Partial<Team> & { leaderName: string; leaderEmail: string; photoUrl: string }): Team => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newTeamRegId = `ADV26-TM-${randomSuffix}`;
    const newTeamId = `team-${Date.now()}`;

    const newTeam: Team = {
      id: newTeamId,
      teamRegId: newTeamRegId,
      teamName: data.teamName || 'Innovators Collective',
      leaderId: currentUser.id,
      leaderName: data.leaderName,
      leaderEmail: data.leaderEmail,
      teamSize: data.teamSize || 3,
      categoryId: data.categoryId || 'cat-1',
      categoryName: data.categoryName || 'Local Business',
      registrationStatus: 'approved',
      photoVerificationStatus: 'Under Verification',
      videoSubmissionStatus: 'not_submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: data.members || [
        {
          id: `mem-${Date.now()}`,
          teamId: newTeamId,
          fullName: data.leaderName,
          enrollmentNumber: '2201980' + Math.floor(1000 + Math.random() * 9000),
          department: 'Computer Science & Engineering',
          yearSemester: '3rd Year / 5th Sem',
          collegeEmail: data.leaderEmail,
          mobileNumber: '+91 98765 00000',
          isLeader: true,
          photoUrl: data.photoUrl,
          photoStatus: 'Under Verification',
          createdAt: new Date().toISOString(),
        }
      ],
    };

    setTeams(prev => [newTeam, ...prev]);

    // Send confirmation notification
    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Registration Successful!',
      message: `Your team ${newTeam.teamName} has been registered with ID ${newTeamRegId}. Live photo is under verification.`,
      type: 'success',
      isRead: false,
      link: '/dashboard',
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newTeam;
  };

  const updateLivePhoto = (teamId: string, photoUrl: string) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          photoVerificationStatus: 'Under Verification',
          members: t.members.map(m => m.isLeader ? {
            ...m,
            photoUrl,
            photoStatus: 'Under Verification',
            photoRejectionReason: undefined,
          } : m),
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    }));
  };

  const verifyPhoto = (teamId: string, status: PhotoVerificationStatus, rejectionReason?: string) => {
    setTeams(prev => prev.map(t => {
      if (t.id === teamId) {
        return {
          ...t,
          photoVerificationStatus: status,
          members: t.members.map(m => m.isLeader ? {
            ...m,
            photoStatus: status,
            photoRejectionReason: rejectionReason,
          } : m),
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    }));
  };

  const submitVideo = (submissionData: Omit<VideoSubmission, 'id' | 'submissionId' | 'status' | 'submittedAt'>): VideoSubmission => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const subId = `ADV26-VID-${randomSuffix}`;

    const newSub: VideoSubmission = {
      ...submissionData,
      id: `sub-${Date.now()}`,
      submissionId: subId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      evaluationsCount: 0,
      averageScore: 0,
    };

    setSubmissions(prev => [newSub, ...prev.filter(s => s.teamId !== newSub.teamId)]);
    
    // Update team video status
    setTeams(prev => prev.map(t => {
      if (t.id === newSub.teamId) {
        return { ...t, videoSubmissionStatus: 'submitted', updatedAt: new Date().toISOString() };
      }
      return t;
    }));

    // In-app notification
    const notif: InAppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      title: 'Video Submitted Successfully',
      message: `Your video "${newSub.videoTitle}" has been queued for jury screening. (ID: ${subId})`,
      type: 'success',
      isRead: false,
      link: '/dashboard/video',
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [notif, ...prev]);

    return newSub;
  };

  const saveEvaluation = (score: EvaluationScore) => {
    setEvaluations(prev => ({
      ...prev,
      [score.submissionId]: score,
    }));

    // Update submission score
    setSubmissions(prev => prev.map(s => {
      if (s.id === score.submissionId) {
        return {
          ...s,
          status: score.isDraft ? 'under_review' : 'evaluated',
          evaluationsCount: 1,
          averageScore: score.totalScore,
        };
      }
      return s;
    }));
  };

  const updateSettings = (newSettings: Partial<EventSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleResultPublication = () => {
    setSettings(prev => ({ ...prev, areResultsPublished: !prev.areResultsPublished }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        teams,
        myTeam,
        submissions,
        evaluations,
        settings,
        announcements,
        notifications,
        certificates,
        registerNewTeam,
        updateLivePhoto,
        submitVideo,
        verifyPhoto,
        updateSettings,
        toggleResultPublication,
        saveEvaluation,
        markNotificationAsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
