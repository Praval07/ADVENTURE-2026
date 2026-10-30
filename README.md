# ADVENTURE 2026 – The Entrepreneurship Ad Film Challenge
### Official Event Registration, Management & Evaluation Platform

**Organized by:** Institution's Innovation Council (IIC) × Skill Development Cell (SDC)  
**Host Institution:** Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College, Pratapgarh, Uttar Pradesh, India  
**Official Email:** [iic.recpratapgarh@gmail.com](mailto:iic.recpratapgarh@gmail.com)  
**Reference Benchmark:** Inspired by [Hack2Skill](https://hack2skill.com/event/bah2026/) for national-level event workflows.

---

## 1. Project Overview & Features

ADVENTURE 2026 is a full-stack, production-grade event platform engineered for a national-level student entrepreneurship ad film competition. 

### Key Capabilities
- **Cinematic Homepage Hero**: Full-width background video with muted autoplay, loop, playsinline, dark gradient overlay, poster fallback, and live countdown timer.
- **8 Competition Tracks**:
  1. Local Business
  2. Startups & Entrepreneurs
  3. Traditional Business
  4. Café & Food Business
  5. Educational Innovation
  6. Social Entrepreneurship
  7. Student Startup Ideas
  8. Problem to Business
- **7-Step Participant Registration**:
  - Step 1: Account Creation & Validation
  - Step 2: Team Creation (2–4 Students) with automatic ID generation
  - Step 3: Additional Team Member Profiles with duplicate enrollment prevention
  - Step 4: **Mandatory Browser Live Photo Capture** using `navigator.mediaDevices.getUserMedia` with face-position guide and consent recording
  - Step 5: Commercial Pitch & Storyboard Details
  - Step 6: 6 Mandatory Legal & Originality Declarations
  - Step 7: Confirmation Slip Download & Dashboard Redirect
- **Participant Dashboard**:
  - Live status tracking (Registration, Identity Photo Verification, Video Submission)
  - 30–90 second MP4 video uploader with client-side metadata and duration validation
  - Photo retake submission with admin feedback display
  - Team member roster management enforcing 2–4 student limits
  - Official PDF certificate download with embedded cryptographic QR codes
- **Organizer Admin Console**:
  - 10 live event metrics
  - Photo verification desk with Approve, Reject, and mandatory retake reason modal
  - Video screening workbench
  - Real-time event parameters & deadline management
  - CSV & Excel export of all team registrations
- **Jury Evaluation Workbench**:
  - Video playback inspection with synchronized storyboard
  - 6-criterion rubric totaling **100 marks**:
    - Creativity & Originality: 20
    - Marketing Strategy: 20
    - Advertisement Quality: 20
    - Business Understanding: 15
    - Problem Identification & Innovation: 15
    - Overall Presentation: 10
  - Draft saving and final submission lock
- **Public Leaderboard & Hall of Fame**:
  - Top 3 Podium (Gold, Silver, Bronze)
  - Confidentiality lock toggle (controllable from Admin)
  - Track-wise search and filters
- **Public Certificate Verification Portal**:
  - QR-code verifiable certificates with institutional signatures and tamper-evident status.

---

## 2. Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, Custom Design System tokens
- **Icons**: Lucide React
- **Validation**: Zod & React Hook Form
- **Database & Auth**: Supabase PostgreSQL, Row Level Security (RLS) policies, Supabase Storage
- **PDF & QR Generation**: `pdf-lib` & `qrcode`
- **Analytics & Data**: Recharts & date-fns
- **Email Notifications**: Resend integration structure with HTML templates

---

## 3. Getting Started Locally

### Prerequisites
- Node.js 18+ (Tested on v24.18.0)
- npm 10+

### Installation
```bash
# Clone the repository and navigate to root
cd "ADVENTURE 2026"

# Install all dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 4. One-Click Persona Switcher for Testing

In the top navigation bar, click the **Role Selector** button to switch instantly between personas:
1. **Participant / Team Leader** (`Arjun Mehta` - Team *CineCraft Innovators*)
   - Access: `/dashboard`, `/dashboard/video`, `/dashboard/photo`, `/dashboard/team`
2. **Evaluation Judge** (`Dr. Kavita Verma` - Senior Venture Partner & Jury)
   - Access: `/judge`
3. **Organizer / Admin** (`Prof. R. K. Srivastava` - President, IIC BRBBARECP)
   - Access: `/admin`, `/admin/photos`, `/admin/videos`, `/admin/settings`

---

## 5. Supabase Database Setup

Complete PostgreSQL migrations are located in `supabase/migrations/20261029000000_adventure2026_init.sql`.

To link your remote Supabase project:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the keys from your Supabase Dashboard:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Run the SQL migration in the Supabase SQL Editor.

---

## 6. Official Competition Dates

- **Registration Opens**: 29 October 2026
- **Registration & Idea Discovery**: 29 October – 5 November 2026
- **Video Submission Deadline**: 12 November 2026 (23:59 IST)
- **Screening & Judging**: 13–14 November 2026
- **Result Announcement**: 16 November 2026

---

## 7. License & Rights

Organized under the mandate of the **Ministry of Education Innovation Cell (MIC)** by:
**Institution's Innovation Council (IIC) × Skill Development Cell (SDC)**  
Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College, Pratapgarh, Uttar Pradesh, India.
