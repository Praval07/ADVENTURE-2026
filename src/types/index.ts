export type UserRole = 'participant' | 'team_leader' | 'judge' | 'admin' | 'super_admin';

export type PhotoVerificationStatus = 
  | 'Photo Pending' 
  | 'Photo Uploaded' 
  | 'Under Verification' 
  | 'Verified' 
  | 'Rejected – Retake Required';

export type SubmissionStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'evaluated' 
  | 'approved' 
  | 'rejected';

export type AwardType = 
  | 'Winner' 
  | 'Runner-Up' 
  | 'Second Runner-Up' 
  | 'Special Recognition' 
  | 'Participant';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  mobileNumber: string;
  role: UserRole;
  collegeName: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  fullName: string;
  enrollmentNumber: string;
  department: string;
  yearSemester: string;
  collegeEmail: string;
  mobileNumber: string;
  isLeader: boolean;
  photoUrl?: string;
  photoStatus: PhotoVerificationStatus;
  photoRejectionReason?: string;
  createdAt: string;
}

export interface Team {
  id: string;
  teamRegId: string; // e.g. ADV26-TM-7801
  teamName: string;
  leaderId: string;
  leaderName: string;
  leaderEmail: string;
  teamSize: number;
  categoryId: string;
  categoryName: string;
  members: TeamMember[];
  registrationStatus: 'pending' | 'approved' | 'rejected' | 'under_review';
  photoVerificationStatus: PhotoVerificationStatus;
  videoSubmissionStatus: 'not_submitted' | 'submitted' | 'under_review' | 'evaluated';
  createdAt: string;
  updatedAt: string;
}

export interface CompetitionCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
  icon: string;
  color: string;
  isActive: boolean;
}

export interface VideoSubmission {
  id: string;
  submissionId: string; // ADV26-VID-XXXX
  teamId: string;
  teamName: string;
  teamRegId: string;
  categoryId: string;
  categoryName: string;
  videoTitle: string;
  startupName: string;
  description: string;
  problemAddressed: string;
  productDescription: string;
  videoUrl: string;
  storagePath?: string;
  durationSeconds: number;
  fileSizeBytes: number;
  thumbnailUrl?: string;
  status: SubmissionStatus;
  submittedAt: string;
  replacedAt?: string;
  evaluationsCount?: number;
  averageScore?: number;
}

export interface EvaluationCriterion {
  id: string;
  title: string;
  description: string;
  maxScore: number;
}

export interface EvaluationScore {
  creativityScore: number; // Max 20
  marketingScore: number; // Max 20
  adQualityScore: number; // Max 20
  businessUnderstandingScore: number; // Max 15
  innovationScore: number; // Max 15
  presentationScore: number; // Max 10
  totalScore: number; // Max 100
  feedback: string;
  isDraft: boolean;
  evaluatedAt: string;
  judgeId: string;
  judgeName: string;
  submissionId: string;
}

export interface CertificateRecord {
  id: string;
  certificateId: string; // e.g. ADV26-CERT-2026-9812
  participantName: string;
  teamName: string;
  teamRegId: string;
  roleInTeam: string;
  categoryName: string;
  awardTitle: AwardType;
  issueDate: string;
  isValid: boolean;
  revokedReason?: string;
  verificationUrl: string;
  qrCodeUrl?: string;
}

export interface EventTimelineItem {
  id: string;
  activity: string;
  date: string;
  status: 'upcoming' | 'active' | 'completed';
  description: string;
}

export interface EventSettings {
  eventName: string;
  eventHeadline: string;
  eventSubtitle: string;
  institutionName: string;
  organizers: string;
  officialEmail: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  videoDeadlineDate: string;
  judgingDates: string;
  resultAnnouncementDate: string;
  isRegistrationOpen: boolean;
  isVideoSubmissionOpen: boolean;
  areResultsPublished: boolean;
  areCertificatesAvailable: boolean;
  minTeamSize: number;
  maxTeamSize: number;
  minVideoDurationSeconds: number;
  maxVideoDurationSeconds: number;
  maxUploadSizeBytes: number;
  heroVideoUrl: string;
  heroPosterUrl: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'normal' | 'high' | 'urgent';
  target: 'all' | 'participants' | 'judges';
}

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  isRead: boolean;
  link?: string;
  createdAt: string;
}
