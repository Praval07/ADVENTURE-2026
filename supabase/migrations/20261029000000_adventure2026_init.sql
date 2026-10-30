-- ============================================================================
-- ADVENTURE 2026 – Master Database Schema Migration
-- Event: The Entrepreneurship Ad Film Challenge
-- Organizers: Institution's Innovation Council (IIC) × Skill Development Cell (SDC)
-- Institution: Bharat Ratna Babasaheb Bhimrao Ambedkar REC, Pratapgarh, UP
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    college_name TEXT NOT NULL DEFAULT 'BRBBARECP',
    role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('participant', 'team_leader', 'judge', 'admin', 'super_admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. COMPETITION CATEGORIES
CREATE TABLE IF NOT EXISTS public.competition_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    icon_name TEXT,
    color_hex TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TEAMS
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_reg_id TEXT UNIQUE NOT NULL, -- e.g. ADV26-TM-1001
    team_name TEXT NOT NULL,
    leader_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    team_size INT NOT NULL CHECK (team_size BETWEEN 2 AND 4),
    category_id UUID REFERENCES public.competition_categories(id),
    registration_status TEXT NOT NULL DEFAULT 'pending' CHECK (registration_status IN ('pending', 'approved', 'rejected', 'under_review')),
    photo_verification_status TEXT NOT NULL DEFAULT 'Photo Pending' CHECK (photo_verification_status IN ('Photo Pending', 'Photo Uploaded', 'Under Verification', 'Verified', 'Rejected – Retake Required')),
    video_submission_status TEXT NOT NULL DEFAULT 'not_submitted' CHECK (video_submission_status IN ('not_submitted', 'submitted', 'under_review', 'evaluated')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    enrollment_number TEXT NOT NULL,
    department TEXT NOT NULL,
    year_semester TEXT NOT NULL,
    college_email TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    is_leader BOOLEAN NOT NULL DEFAULT false,
    photo_url TEXT,
    photo_status TEXT NOT NULL DEFAULT 'Photo Pending' CHECK (photo_status IN ('Photo Pending', 'Photo Uploaded', 'Under Verification', 'Verified', 'Rejected – Retake Required')),
    photo_rejection_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(team_id, enrollment_number)
);

-- 5. REGISTRATIONS & PITCH DETAILS
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reg_id TEXT UNIQUE NOT NULL, -- e.g. ADV26-REG-7701
    team_id UUID NOT NULL UNIQUE REFERENCES public.teams(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.competition_categories(id),
    business_name TEXT NOT NULL,
    ad_title TEXT NOT NULL,
    ad_concept TEXT NOT NULL,
    short_description TEXT NOT NULL,
    problem_addressed TEXT NOT NULL,
    product_description TEXT NOT NULL,
    originality_declared BOOLEAN NOT NULL DEFAULT false,
    copyright_cleared BOOLEAN NOT NULL DEFAULT false,
    filming_consent BOOLEAN NOT NULL DEFAULT false,
    event_rules_accepted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. PARTICIPANT LIVE PHOTOS
CREATE TABLE IF NOT EXISTS public.participant_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    photo_storage_path TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Under Verification' CHECK (status IN ('Photo Uploaded', 'Under Verification', 'Verified', 'Rejected – Retake Required')),
    consent_given BOOLEAN NOT NULL DEFAULT true,
    rejection_reason TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. PHOTO VERIFICATION LOGS
CREATE TABLE IF NOT EXISTS public.photo_verification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    photo_id UUID NOT NULL REFERENCES public.participant_photos(id) ON DELETE CASCADE,
    admin_id UUID NOT NULL REFERENCES public.profiles(id),
    previous_status TEXT NOT NULL,
    new_status TEXT NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. VIDEO SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.video_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id TEXT UNIQUE NOT NULL, -- e.g. ADV26-VID-9021
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.competition_categories(id),
    video_title TEXT NOT NULL,
    startup_name TEXT NOT NULL,
    description TEXT NOT NULL,
    video_url TEXT NOT NULL,
    storage_path TEXT,
    duration_seconds INT NOT NULL CHECK (duration_seconds BETWEEN 30 AND 90),
    file_size_bytes BIGINT NOT NULL,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'under_review', 'evaluated', 'approved', 'rejected')),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. SUBMISSION REPLACEMENT HISTORY
CREATE TABLE IF NOT EXISTS public.submission_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES public.video_submissions(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    previous_video_url TEXT NOT NULL,
    previous_duration_seconds INT,
    replaced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    replacement_reason TEXT
);

-- 10. JUDGES
CREATE TABLE IF NOT EXISTS public.judges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    organization TEXT NOT NULL,
    bio TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. JUDGE ASSIGNMENTS
CREATE TABLE IF NOT EXISTS public.judge_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judge_id UUID NOT NULL REFERENCES public.judges(id) ON DELETE CASCADE,
    submission_id UUID NOT NULL REFERENCES public.video_submissions(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed')),
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(judge_id, submission_id)
);

-- 12. EVALUATIONS (Max 100 Marks across 6 criteria)
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judge_id UUID NOT NULL REFERENCES public.judges(id) ON DELETE CASCADE,
    submission_id UUID NOT NULL REFERENCES public.video_submissions(id) ON DELETE CASCADE,
    creativity_score INT NOT NULL CHECK (creativity_score BETWEEN 0 AND 20),
    marketing_score INT NOT NULL CHECK (marketing_score BETWEEN 0 AND 20),
    ad_quality_score INT NOT NULL CHECK (ad_quality_score BETWEEN 0 AND 20),
    business_understanding_score INT NOT NULL CHECK (business_understanding_score BETWEEN 0 AND 15),
    innovation_score INT NOT NULL CHECK (innovation_score BETWEEN 0 AND 15),
    presentation_score INT NOT NULL CHECK (presentation_score BETWEEN 0 AND 10),
    total_score INT NOT NULL CHECK (total_score BETWEEN 0 AND 100),
    feedback TEXT,
    is_draft BOOLEAN NOT NULL DEFAULT false,
    evaluated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(judge_id, submission_id)
);

-- 13. RESULTS AND WINNERS
CREATE TABLE IF NOT EXISTS public.results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.competition_categories(id),
    rank_position INT,
    award_type TEXT NOT NULL CHECK (award_type IN ('Winner', 'Runner-Up', 'Second Runner-Up', 'Special Recognition', 'Participant')),
    final_total_score NUMERIC(5,2) NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. CERTIFICATES
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_id TEXT UNIQUE NOT NULL, -- e.g. ADV26-CERT-2026-9041
    participant_name TEXT NOT NULL,
    team_name TEXT NOT NULL,
    team_reg_id TEXT NOT NULL,
    role_in_team TEXT NOT NULL,
    category_name TEXT NOT NULL,
    award_title TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    is_valid BOOLEAN NOT NULL DEFAULT true,
    revoked_reason TEXT,
    qr_code_url TEXT,
    pdf_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'high', 'urgent')),
    target_audience TEXT NOT NULL DEFAULT 'all' CHECK (target_audience IN ('all', 'participants', 'judges')),
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. IN-APP NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'alert')),
    is_read BOOLEAN NOT NULL DEFAULT false,
    link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. EVENT SETTINGS
CREATE TABLE IF NOT EXISTS public.event_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. MEDIA ASSETS
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_key TEXT UNIQUE NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('video', 'image', 'banner', 'logo')),
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    poster_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participant_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can read basic profile info; users can update own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Teams: Team leaders can see their own team; Admins can see all
CREATE POLICY "Team leader can view own team" ON public.teams FOR SELECT USING (auth.uid() = leader_id);
CREATE POLICY "Admins full access to teams" ON public.teams FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Evaluations: Judges can access assigned submissions; Admins can access all
CREATE POLICY "Judges can view/update own evaluations" ON public.evaluations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.judges WHERE id = evaluations.judge_id AND user_id = auth.uid())
);
CREATE POLICY "Admins full access to evaluations" ON public.evaluations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Certificates: Public can read valid certificates (for QR code verification)
CREATE POLICY "Public read valid certificates" ON public.certificates FOR SELECT USING (is_valid = true);

-- Results: Public can read published results
CREATE POLICY "Public read published results" ON public.results FOR SELECT USING (is_published = true);
