-- =============================================================
-- ADPRENURE 2026 – Complete Database Schema
-- Organized by: IIC × SDC, BRBBA REC Pratapgarh
-- =============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================
-- TABLE: profiles (linked to auth.users)
-- =============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  full_name     TEXT NOT NULL,
  mobile_number TEXT,
  role          TEXT NOT NULL DEFAULT 'participant' 
                  CHECK (role IN ('participant', 'team_leader', 'team_member', 'judge', 'admin', 'super_admin')),
  college_name  TEXT,
  avatar_url    TEXT,
  enrollment_number TEXT,
  department    TEXT,
  year_semester TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLE: teams
-- =============================================================
CREATE TABLE IF NOT EXISTS public.teams (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_reg_id               TEXT NOT NULL UNIQUE,  -- e.g. ADV26-TM-1042
  team_name                 TEXT NOT NULL,
  leader_id                 UUID NOT NULL REFERENCES public.profiles(id),
  leader_name               TEXT NOT NULL,
  leader_email              TEXT NOT NULL,
  team_size                 INT NOT NULL DEFAULT 3 CHECK (team_size BETWEEN 2 AND 4),
  category_id               TEXT NOT NULL,
  category_name             TEXT NOT NULL,
  idea_title                TEXT,
  idea_description          TEXT,
  registration_status       TEXT NOT NULL DEFAULT 'pending'
                              CHECK (registration_status IN ('pending', 'approved', 'rejected', 'under_review')),
  photo_verification_status TEXT NOT NULL DEFAULT 'Photo Pending'
                              CHECK (photo_verification_status IN (
                                'Photo Pending', 'Photo Uploaded', 'Under Verification',
                                'Verified', 'Rejected – Retake Required'
                              )),
  video_submission_status   TEXT NOT NULL DEFAULT 'not_submitted'
                              CHECK (video_submission_status IN (
                                'not_submitted', 'submitted', 'under_review', 'evaluated'
                              )),
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLE: team_members
-- =============================================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id              UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  profile_id           UUID REFERENCES public.profiles(id),
  full_name            TEXT NOT NULL,
  enrollment_number    TEXT NOT NULL,
  department           TEXT NOT NULL,
  year_semester        TEXT NOT NULL,
  college_email        TEXT NOT NULL,
  mobile_number        TEXT NOT NULL,
  is_leader            BOOLEAN NOT NULL DEFAULT FALSE,
  photo_url            TEXT,
  photo_storage_path   TEXT,
  photo_status         TEXT NOT NULL DEFAULT 'Photo Pending'
                         CHECK (photo_status IN (
                           'Photo Pending', 'Photo Uploaded', 'Under Verification',
                           'Verified', 'Rejected – Retake Required'
                         )),
  photo_rejection_reason TEXT,
  photo_verified_at    TIMESTAMPTZ,
  photo_verified_by    UUID REFERENCES public.profiles(id),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLE: video_submissions
-- =============================================================
CREATE TABLE IF NOT EXISTS public.video_submissions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id       TEXT NOT NULL UNIQUE,  -- ADV26-VID-XXXX
  team_id             UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  team_name           TEXT NOT NULL,
  team_reg_id         TEXT NOT NULL,
  category_id         TEXT NOT NULL,
  category_name       TEXT NOT NULL,
  video_title         TEXT NOT NULL,
  startup_name        TEXT NOT NULL,
  description         TEXT NOT NULL,
  problem_addressed   TEXT NOT NULL,
  product_description TEXT NOT NULL,
  video_url           TEXT,
  storage_path        TEXT,
  duration_seconds    INT,
  file_size_bytes     BIGINT,
  thumbnail_url       TEXT,
  status              TEXT NOT NULL DEFAULT 'submitted'
                        CHECK (status IN ('draft', 'submitted', 'under_review', 'evaluated', 'approved', 'rejected')),
  submitted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  replaced_at         TIMESTAMPTZ,
  evaluations_count   INT NOT NULL DEFAULT 0,
  average_score       NUMERIC(5,2) NOT NULL DEFAULT 0,
  admin_notes         TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLE: evaluation_scores
-- =============================================================
CREATE TABLE IF NOT EXISTS public.evaluation_scores (
  id                           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id                UUID NOT NULL REFERENCES public.video_submissions(id) ON DELETE CASCADE,
  judge_id                     UUID NOT NULL REFERENCES public.profiles(id),
  judge_name                   TEXT NOT NULL,
  creativity_score             INT NOT NULL CHECK (creativity_score BETWEEN 0 AND 20),
  marketing_score              INT NOT NULL CHECK (marketing_score BETWEEN 0 AND 20),
  ad_quality_score             INT NOT NULL CHECK (ad_quality_score BETWEEN 0 AND 20),
  business_understanding_score INT NOT NULL CHECK (business_understanding_score BETWEEN 0 AND 15),
  innovation_score             INT NOT NULL CHECK (innovation_score BETWEEN 0 AND 15),
  presentation_score           INT NOT NULL CHECK (presentation_score BETWEEN 0 AND 10),
  total_score                  INT NOT NULL CHECK (total_score BETWEEN 0 AND 100),
  feedback                     TEXT,
  is_draft                     BOOLEAN NOT NULL DEFAULT TRUE,
  evaluated_at                 TIMESTAMPTZ,
  created_at                   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (submission_id, judge_id)
);

-- =============================================================
-- TABLE: certificates
-- =============================================================
CREATE TABLE IF NOT EXISTS public.certificates (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id    TEXT NOT NULL UNIQUE,  -- ADV26-CERT-2026-XXXX
  participant_id    UUID REFERENCES public.profiles(id),
  participant_name  TEXT NOT NULL,
  team_id           UUID REFERENCES public.teams(id),
  team_name         TEXT NOT NULL,
  team_reg_id       TEXT NOT NULL,
  role_in_team      TEXT NOT NULL,
  category_name     TEXT NOT NULL,
  award_title       TEXT NOT NULL
                      CHECK (award_title IN (
                        'Winner', 'Runner-Up', 'Second Runner-Up',
                        'Special Recognition', 'Participant'
                      )),
  issue_date        DATE NOT NULL,
  is_valid          BOOLEAN NOT NULL DEFAULT TRUE,
  revoked_reason    TEXT,
  qr_code_url       TEXT,
  pdf_url           TEXT,
  verification_hash TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLE: announcements
-- =============================================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  content    TEXT NOT NULL,
  date       DATE NOT NULL DEFAULT CURRENT_DATE,
  priority   TEXT NOT NULL DEFAULT 'normal'
               CHECK (priority IN ('normal', 'high', 'urgent')),
  target     TEXT NOT NULL DEFAULT 'all'
               CHECK (target IN ('all', 'participants', 'judges', 'admins')),
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLE: notifications
-- =============================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  type       TEXT NOT NULL DEFAULT 'info'
               CHECK (type IN ('info', 'success', 'warning', 'alert')),
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,
  link       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- TABLE: event_settings
-- =============================================================
CREATE TABLE IF NOT EXISTS public.event_settings (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key                         TEXT NOT NULL UNIQUE,
  value                       TEXT NOT NULL,
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- INDEXES for performance
-- =============================================================
CREATE INDEX IF NOT EXISTS idx_teams_leader ON public.teams(leader_id);
CREATE INDEX IF NOT EXISTS idx_teams_status ON public.teams(registration_status);
CREATE INDEX IF NOT EXISTS idx_team_members_team ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_submissions_team ON public.video_submissions(team_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.video_submissions(status);
CREATE INDEX IF NOT EXISTS idx_evaluations_submission ON public.evaluation_scores(submission_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_judge ON public.evaluation_scores(judge_id);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_id ON public.certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- TEAMS policies
CREATE POLICY "Anyone can view approved teams"
  ON public.teams FOR SELECT USING (registration_status = 'approved');

CREATE POLICY "Leaders can update their own team"
  ON public.teams FOR UPDATE USING (leader_id = auth.uid());

CREATE POLICY "Authenticated users can create teams"
  ON public.teams FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage all teams"
  ON public.teams FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- VIDEO SUBMISSIONS policies
CREATE POLICY "Team leaders can manage their submissions"
  ON public.video_submissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_id AND t.leader_id = auth.uid()
    )
  );

CREATE POLICY "Judges can view all approved submissions"
  ON public.video_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('judge', 'admin', 'super_admin')
    )
  );

-- EVALUATIONS policies
CREATE POLICY "Judges can manage their own evaluations"
  ON public.evaluation_scores FOR ALL USING (judge_id = auth.uid());

CREATE POLICY "Admins can view all evaluations"
  ON public.evaluation_scores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- CERTIFICATES policies  
CREATE POLICY "Public can verify certificates"
  ON public.certificates FOR SELECT USING (TRUE);

-- NOTIFICATIONS policies
CREATE POLICY "Users see own notifications"
  ON public.notifications FOR ALL USING (user_id = auth.uid());

-- ANNOUNCEMENTS policies
CREATE POLICY "Anyone can view active announcements"
  ON public.announcements FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage announcements"
  ON public.announcements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- =============================================================
-- TRIGGER: update updated_at automatically
-- =============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_submissions_updated_at
  BEFORE UPDATE ON public.video_submissions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================================
-- FUNCTION: Auto-create profile on new user signup
-- =============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'participant')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================
-- SEED: Default Event Settings
-- =============================================================
INSERT INTO public.event_settings (key, value) VALUES
  ('event_name', 'ADPRENURE 2026'),
  ('event_subtitle', 'The Entrepreneurship Ad Film Challenge'),
  ('organizers', 'IIC × SDC, BRBBA REC Pratapgarh'),
  ('official_email', 'iic@recp.ac.in'),
  ('registration_open_date', '2026-10-29'),
  ('registration_close_date', '2026-11-05'),
  ('video_deadline_date', '2026-11-12'),
  ('judging_dates', '2026-11-13 to 2026-11-14'),
  ('result_announcement_date', '2026-11-16'),
  ('is_registration_open', 'true'),
  ('is_video_submission_open', 'true'),
  ('are_results_published', 'false'),
  ('are_certificates_available', 'false'),
  ('min_team_size', '2'),
  ('max_team_size', '4'),
  ('min_video_duration_seconds', '30'),
  ('max_video_duration_seconds', '90'),
  ('max_upload_size_bytes', '104857600')
ON CONFLICT (key) DO NOTHING;

-- =============================================================
-- SEED: Default Announcements
-- =============================================================
INSERT INTO public.announcements (title, content, date, priority, target) VALUES
(
  'Welcome to ADPRENURE 2026! Registration & Idea Discovery is Live',
  'All student teams across India can now form teams of 2–4 members, complete mandatory live photo verification, and select from 7 dynamic categories.',
  '2026-10-29', 'high', 'all'
),
(
  'Masterclass Webinar: Cinematic Storytelling for Student Ventures',
  'Join top industry ad filmmakers this weekend on YouTube Live for technical tips on audio capture, scripting hooks, and grading within 30–90 seconds.',
  '2026-10-31', 'normal', 'participants'
),
(
  'Reminder: Strict 30–90s Duration and MP4 Container Policy',
  'Please ensure your final video export conforms strictly between 30 and 90 seconds. Submissions violating duration limits cannot be reviewed.',
  '2026-11-02', 'urgent', 'participants'
)
ON CONFLICT DO NOTHING;
