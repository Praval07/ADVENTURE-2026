import { CompetitionCategory, EvaluationCriterion, EventSettings, EventTimelineItem } from '@/types';

export const OFFICIAL_SETTINGS: EventSettings = {
  eventName: 'ADVENTURE 2026',
  eventHeadline: 'Turn Ideas Into Stories. Turn Stories Into Impact.',
  eventSubtitle: 'The Entrepreneurship Ad Film Challenge',
  institutionName: 'Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College, Pratapgarh, Uttar Pradesh, India',
  organizers: "Institution's Innovation Council (IIC) × Skill Development Cell (SDC)",
  officialEmail: 'iic.recpratapgarh@gmail.com',
  registrationOpenDate: '2026-10-29',
  registrationCloseDate: '2026-11-05',
  videoDeadlineDate: '2026-11-12',
  judgingDates: '2026-11-13 to 2026-11-14',
  resultAnnouncementDate: '2026-11-16',
  isRegistrationOpen: true,
  isVideoSubmissionOpen: true,
  areResultsPublished: true, // Configurable in admin
  areCertificatesAvailable: true,
  minTeamSize: 2,
  maxTeamSize: 4,
  minVideoDurationSeconds: 30,
  maxVideoDurationSeconds: 90,
  maxUploadSizeBytes: 100 * 1024 * 1024, // 100 MB
  heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-coworkers-having-a-brainstorming-meeting-43339-large.mp4',
  heroPosterUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
};

export const COMPETITION_CATEGORIES: CompetitionCategory[] = [
  {
    id: 'cat-1',
    slug: 'local-business',
    name: 'Local Business',
    tagline: 'Empower grassroots enterprises with modern creative marketing',
    description: 'Promote local neighborhood craftsmen, retail stores, local produce, artisanal services, or regional commerce using compelling cinematic narrative.',
    examples: ['Handloom weavers', 'Artisan potteries', 'Local bakeries', 'Neighborhood repair services'],
    icon: 'Store',
    color: '#FF5B26',
    isActive: true,
  },
  {
    id: 'cat-2',
    slug: 'startups-entrepreneurs',
    name: 'Startups & Entrepreneurs',
    tagline: 'High-energy branding for tech, direct-to-consumer and modern ventures',
    description: 'Craft a punchy commercial highlighting a disruptive product, scalable tech service, SaaS platform, or breakthrough direct-to-consumer brand.',
    examples: ['AI tools for productivity', 'D2C eco-packaging', 'EV charging solutions', 'Fintech micro-savings'],
    icon: 'Rocket',
    color: '#F59E0B',
    isActive: true,
  },
  {
    id: 'cat-3',
    slug: 'traditional-business',
    name: 'Traditional Business',
    tagline: 'Bridging heritage craftsmanship and timeless trade with modern digital audiences',
    description: 'Tell the story of timeless legacy businesses, multi-generational family trades, indigenous ayurveda, handcrafts, or heritage agriculture.',
    examples: ['Generational sweets & spices', 'Handmade brass craft', 'Organic jaggery mills', 'Heritage textiles'],
    icon: 'Landmark',
    color: '#10B981',
    isActive: true,
  },
  {
    id: 'cat-4',
    slug: 'cafe-food-business',
    name: 'Café & Food Business',
    tagline: 'Mouth-watering sensory storytelling and food culture marketing',
    description: 'Create an irresistible ad film for street kitchens, contemporary bistros, cloud kitchens, specialized coffee houses, or healthy culinary startups.',
    examples: ['Artisanal roastery', 'Regional street food revamp', 'Healthy millets bistro', 'Gourmet dessert brand'],
    icon: 'UtensilsCrossed',
    color: '#EC4899',
    isActive: true,
  },
  {
    id: 'cat-5',
    slug: 'educational-innovation',
    name: 'Educational Innovation',
    tagline: 'Transforming skill discovery, learning methods, and classroom engagement',
    description: 'Produce an ad highlighting transformative ed-tech platforms, hands-on science kits, vocational tutoring hubs, or peer-learning ecosystems.',
    examples: ['Robotics DIY kits for rural schools', 'Vernacular language learning apps', 'Affordable lab kits'],
    icon: 'GraduationCap',
    color: '#6366F1',
    isActive: true,
  },
  {
    id: 'cat-6',
    slug: 'social-entrepreneurship',
    name: 'Social Entrepreneurship',
    tagline: 'Creativity for community impact, circular economy, and ecological stewardship',
    description: 'Spotlight purposeful businesses solving plastic waste, clean water scarcity, women empowerment, renewable micro-grids, or rural livelihoods.',
    examples: ['Upcycled fashion collectives', 'Solar irrigation cooperatives', 'Zero-waste grocery delivery'],
    icon: 'HeartHandshake',
    color: '#14B8A6',
    isActive: true,
  },
  {
    id: 'cat-7',
    slug: 'student-startup-ideas',
    name: 'Student Startup Ideas',
    tagline: 'Fresh ideas born in college dorms, makerspaces, and incubation labs',
    description: 'Bring an early-stage student campus startup or prototype alive through high-voltage viral advertising that captivates potential investors and customers.',
    examples: ['Campus book barter platform', 'Student gig marketplace', 'Affordable smart IoT dorm security'],
    icon: 'Lightbulb',
    color: '#8B5CF6',
    isActive: true,
  },
  {
    id: 'cat-8',
    slug: 'problem-to-business',
    name: 'Problem to Business',
    tagline: 'Spot an everyday friction, create a venture, and advertise the solution',
    description: 'Highlight a relatable everyday headache, introduce an innovative commercial solution, and demonstrate immediate user delight and business viability.',
    examples: ['Urban parking hassle solved', 'Hostel laundry turnaround', 'Farm-to-fork spoilage prevention'],
    icon: 'Target',
    color: '#EF4444',
    isActive: true,
  },
];

export const EVALUATION_CRITERIA: EvaluationCriterion[] = [
  {
    id: 'crit-1',
    title: 'Creativity & Originality',
    description: 'Novelty of the concept, storytelling hook, uniqueness of narrative angle, and fresh cinematic imagination.',
    maxScore: 20,
  },
  {
    id: 'crit-2',
    title: 'Marketing Strategy',
    description: 'Clear value proposition, target customer resonance, strong call to action, and effective commercial messaging.',
    maxScore: 20,
  },
  {
    id: 'crit-3',
    title: 'Advertisement Quality',
    description: 'Cinematography, framing, audio clarity, editing rhythm, visual pacing, color harmony, and overall technical polish.',
    maxScore: 20,
  },
  {
    id: 'crit-4',
    title: 'Business Understanding',
    description: 'Grasp of market reality, customer pain-point empathy, economic feasibility, and product/service positioning.',
    maxScore: 15,
  },
  {
    id: 'crit-5',
    title: 'Problem Identification & Innovation',
    description: 'Significance of the challenge addressed and the ingeniousness of the proposed enterprise solution.',
    maxScore: 15,
  },
  {
    id: 'crit-6',
    title: 'Overall Presentation',
    description: 'Holistic emotional appeal, brand memorable recall, pacing within 30–90 seconds, and persuasive punch.',
    maxScore: 10,
  },
];

export const OFFICIAL_TIMELINE: EventTimelineItem[] = [
  {
    id: 'time-1',
    activity: 'Registration Opens',
    date: '29 October 2026',
    status: 'active',
    description: 'Portal opens for team formation (2–4 students), live photo verification, and concept selection across 8 categories.',
  },
  {
    id: 'time-2',
    activity: 'Registration & Idea Discovery',
    date: '29 October – 5 November 2026',
    status: 'active',
    description: 'Teams finalize their business model, identify enterprise storyboards, and secure filming permissions.',
  },
  {
    id: 'time-3',
    activity: 'Video Submission Deadline',
    date: '12 November 2026 (23:59 IST)',
    status: 'upcoming',
    description: 'Submit final high-definition ad film (MP4 format, 30–90 seconds) with pitch synopsis in the participant dashboard.',
  },
  {
    id: 'time-4',
    activity: 'Screening & Jury Judging',
    date: '13 – 14 November 2026',
    status: 'upcoming',
    description: 'Distinguished panel of startup founders, film directors, and marketing leaders evaluate submissions across 6 criteria (100 marks).',
  },
  {
    id: 'time-5',
    activity: 'Result Announcement & Grand Felicitation',
    date: '16 November 2026',
    status: 'upcoming',
    description: 'Public leaderboard release, winner showcase, and issuance of cryptographically verifiable digital certificates.',
  },
];

export const PARTICIPATION_RULES = [
  {
    title: 'Team Size',
    detail: 'Teams must consist of 2 to 4 student members. Cross-department collaborations are enthusiastically encouraged.',
    badge: '2–4 Students',
  },
  {
    title: 'Video Duration',
    detail: 'Exact video run time must be strictly between 30 and 90 seconds. Submissions outside this limit will be flagged.',
    badge: '30–90 Seconds',
  },
  {
    title: 'File Format',
    detail: 'Standard MP4 container with H.264 video codec and AAC stereo audio. Maximum upload file size is 100 MB.',
    badge: 'MP4 Only',
  },
  {
    title: 'Languages',
    detail: 'Hindi, English, or any Indian regional language. English subtitles are mandatory if regional dialects are used.',
    badge: 'Hindi / English / Regional',
  },
  {
    title: '100% Original Content',
    detail: 'Plagiarism, uncredited copyrighted footage, or unauthorized music is strictly prohibited and subject to disqualification.',
    badge: 'Strictly Original',
  },
  {
    title: 'Mandatory Live Photo',
    detail: 'Each team leader must capture a live photo using the browser camera during registration for verified identity validation.',
    badge: 'Live Capture Required',
  },
];

export const FAQS = [
  {
    q: 'Who is eligible to participate in ADVENTURE 2026?',
    a: 'Any regular enrolled student from recognized undergraduate, postgraduate, polytechnic, or engineering institutions across India can participate. Teams must consist of 2 to 4 members.',
  },
  {
    q: 'Do we need a registered company or startup to create an ad film?',
    a: 'No! You can pick an existing local business in your hometown, a traditional heritage trade, a neighborhood café, an early-stage student prototype, or invent a creative solution for an everyday problem under "Problem to Business".',
  },
  {
    q: 'Why is live camera photo capture mandatory during registration?',
    a: 'To maintain the highest integrity for this national challenge and verify legitimate student participants. The live photo is securely stored, reviewed by authorized administrators, and never published publicly.',
  },
  {
    q: 'Can we replace our video after submitting?',
    a: 'Yes, teams can replace their video submission at any time before the deadline of 12 November 2026 (23:59 IST) directly through the participant dashboard.',
  },
  {
    q: 'What are the judging criteria and how are marks calculated?',
    a: 'Evaluations are scored out of 100 total marks across 6 defined criteria: Creativity & Originality (20), Marketing Strategy (20), Advertisement Quality (20), Business Understanding (15), Problem Identification & Innovation (15), and Overall Presentation (10).',
  },
  {
    q: 'Are certificates provided to all participants?',
    a: 'Yes! Every verified team member who successfully submits an approved ad film receives an official, cryptographically verified digital PDF certificate featuring a unique QR code and signed by the leadership of IIC and SDC, BRBBARECP.',
  },
];
