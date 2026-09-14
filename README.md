# 🏛️ YLCC (Youth Leadership & Career Campus)
### *Premier Higher Technical Education & Leadership Institute — Bengaluru, India*

A production-ready, full-stack web application and institutional Content Management System (CMS) designed for **YLCC (Youth Leadership & Career Campus)**, Bengaluru.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and a dual-tier data persistence layer (Automated Local JSON Store + Supabase PostgreSQL & Storage).

---

## 🎨 Design Theme: Luxury Beige & White Aesthetic

The application is styled with a warm, minimalist **Beige & White** palette tailored for modern academia and tech leadership:
- **Canvas / Background**: Warm Creamy Beige (`#FAF7F2`)
- **Cards & Surfaces**: Pure Elevated White (`#FFFFFF`)
- **Borders & Dividers**: Warm Sand (`#E8E2D8`)
- **Typography / Text**: Deep Espresso Charcoal (`#1C1917`) & Muted Warm Slate (`#78716C`)
- **Highlights & Accents**: Refined Warm Bronze & Amber (`#A16207` / `#B45309`)
- **Subtle Glassmorphism**: Translucent ivory navigation headers with backdrop blur (`.glass-nav`)

---

## 🚀 Key Highlights & Architectural Features

### 1. 🎓 Dedicated Student Learning & Admissions Track
- **Interactive Course Catalog (`/courses`)**: Live multi-criteria filtering by category (*Software Engineering, AI & Machine Learning, Cloud & DevOps, Data Science & Analytics, Product & Design*), mode (*In-Person, Online, Hybrid*), and level (*Beginner, Intermediate, Advanced*).
- **Curriculum Deep Dive (`/courses/[slug]`)**: Week-by-week syllabus modules accordion, instructor pedigree, tools & technologies badges, fee breakdown with EMI options, and syllabus brochure download.
- **Admission Application Engine (`/apply`)**: Multi-step validated application form with drag-and-drop resume upload (`.pdf`), batch selection, and database persistence.

### 2. 💼 Dedicated Corporate & Business Consultation Track (`/business`)
- **Corporate Upskilling & Enterprise Training**: Custom tech stack workshops for engineering teams.
- **AI Architecture & Digital Advisory**: Strategic consulting by senior principal architects.
- **Campus Hiring & Talent Pipeline**: Direct access to top-tier graduates and pre-screened developers.
- **Interactive Consultation Booking**: Working inquiry form with budget range selection, company size selector, and administrative status tracking.

### 3. 👤 User & Student Authentication Portal (`/login` & `/portal`)
- **Student Sign In & Registration (`/login`)**: Role-based access with 1-click test fill button.
- **Student Dashboard (`/portal`)**: Enrolled courses overview, live classroom links, syllabus milestone progress bars, capstone repository links, and 1-on-1 mentor booking scheduling.

### 4. 💻 Capstone Projects Showcase with File Persistence (`/projects`)
- **Filterable Project Portfolio (`/projects`)**: Filter by category (*Full-Stack Web, AI & Machine Learning, Mobile Application, Cloud Architecture, IoT*).
- **Interactive Project Deep Dive (`/projects/[slug]`)**: Live demo link, GitHub source code repository link, verified PDF project report download, and downloadable ZIP source code package.

### 5. 🛠️ Complete Institutional Admin CMS (`/admin`)
Full administrative control with session protection and audit logging:
| Admin Module | Path | Description |
| :--- | :--- | :--- |
| **Control Center** | `/admin` | Key metrics, admissions conversion, inquiries, quick actions, and audit logs |
| **Projects Manager** | `/admin/projects` | Full CRUD for student capstones with cover photo, gallery, PDF, and ZIP uploads |
| **Courses Manager** | `/admin/courses` | Course catalog, syllabus module editor, fee pricing, and seating capacity |
| **Business Clients** | `/admin/consultations` | Corporate leads CRM with status workflows (*New, Contacted, Meeting Scheduled, Proposal Sent, Closed*) and counselor notes |
| **Enquiries** | `/admin/enquiries` | General public inquiries with contact follow-up workflows |
| **Applications** | `/admin/applications` | Review student admissions, verify uploaded resumes/documents, and accept/reject applicants |
| **Faculty & Mentors** | `/admin/faculty` | Manage mentors, credentials, photos, expertise tags, and social profiles |
| **Achievements** | `/admin/achievements` | Placement hall of fame, salaries, packages, and competition awards |
| **Campus Gallery** | `/admin/gallery` | Photo albums of classrooms, labs, hackathons, and convocations with full-screen lightbox |
| **Events & Calendar** | `/admin/events` | Schedule upcoming workshops, guest lectures, hackathons, and seat bookings |
| **Testimonials** | `/admin/testimonials` | Moderate student reviews, star ratings, and video review URLs |
| **FAQs** | `/admin/faqs` | Categorized accordion questions and answers |
| **Statistics** | `/admin/stats` | Live editor for homepage milestone counter values and labels |
| **Settings** | `/admin/settings` | Institutional identity, official contacts, announcement bar, hero section copy, and social links |

---

## 🔐 Credentials for Immediate Testing

### Administrative Access (`/admin/login`):
- **Super Administrator**:
  - Email: `admin@ylcc.edu.in`
  - Password: `Admin@YLCC2026!`
- **Content Editor**:
  - Email: `editor@ylcc.edu.in`
  - Password: `Editor@YLCC2026!`

*(Click the **"Fill Admin Credentials"** button on the login screen for instant 1-click authentication!)*

### Student / User Access (`/login`):
- **Student User**:
  - Email: `student@ylcc.edu.in`
  - Password: `Student@YLCC2026!`

*(Click the **"Fill Demo Student Credentials"** button on the login screen for instant 1-click authentication!)*

---

## 📁 Repository Directory Structure

```
├── data/
│   └── store.json               # Persistent local JSON datastore (auto-seeded)
├── public/
│   ├── images/
│   │   └── ylcc-logo.svg        # Institutional vector logo
│   └── uploads/                 # Local uploaded images, PDFs, and ZIP archives
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── about/           # About YLCC, mission, leadership, infrastructure
│   │   │   ├── achievements/    # Placement hall of fame & awards
│   │   │   ├── apply/           # Student admission application with resume upload
│   │   │   ├── business/        # Corporate training & business consultation track
│   │   │   ├── contact/         # Contact inquiries, campus map, phone & WhatsApp
│   │   │   ├── courses/         # Course catalog & dynamic [slug] curriculum pages
│   │   │   ├── events/          # Events calendar & dynamic [slug] registration
│   │   │   ├── faculty/         # Faculty mentors & industry leaders
│   │   │   ├── gallery/         # Campus photo albums with interactive lightbox
│   │   │   ├── login/           # Student / User authentication portal
│   │   │   ├── portal/          # Authenticated student dashboard
│   │   │   ├── privacy/         # Privacy Policy
│   │   │   ├── projects/        # Capstone project showcase & [slug] deep dive
│   │   │   ├── refund/          # Fee Refund & Cancellation Policy
│   │   │   ├── terms/           # Terms & Conditions
│   │   │   ├── testimonials/    # Student reviews & video testimonials
│   │   │   └── page.tsx         # Institutional Homepage
│   │   ├── admin/
│   │   │   ├── achievements/    # Placements & awards CMS
│   │   │   ├── applications/    # Admission applications evaluator
│   │   │   ├── consultations/   # Corporate client consultations CRM
│   │   │   ├── courses/         # Course curriculum CMS
│   │   │   ├── enquiries/       # Lead inquiries CMS
│   │   │   ├── events/          # Hackathons & workshops CMS
│   │   │   ├── faculty/         # Faculty mentors CMS
│   │   │   ├── gallery/         # Campus photo albums CMS
│   │   │   ├── login/           # Admin authentication
│   │   │   ├── projects/        # Project showcase CMS with file upload
│   │   │   ├── settings/        # Institutional contacts & hero copy CMS
│   │   │   ├── stats/           # Homepage milestone metrics CMS
│   │   │   ├── testimonials/    # Reviews moderator CMS
│   │   │   └── page.tsx         # Admin Control Center overview
│   │   ├── api/
│   │   │   ├── achievements/    # Achievements REST endpoint
│   │   │   ├── applications/    # Admission applications REST endpoint
│   │   │   ├── auth/            # Admin & student session authentication
│   │   │   ├── consultations/   # Business consultations REST endpoint
│   │   │   ├── courses/         # Courses REST endpoint
│   │   │   ├── enquiries/       # Enquiries REST endpoint
│   │   │   ├── events/          # Events REST endpoint
│   │   │   ├── faculty/         # Faculty REST endpoint
│   │   │   ├── faqs/            # FAQs REST endpoint
│   │   │   ├── gallery/         # Gallery albums REST endpoint
│   │   │   ├── projects/        # Projects REST endpoint
│   │   │   ├── settings/        # Institute settings REST endpoint
│   │   │   ├── stats/           # Site statistics REST endpoint
│   │   │   ├── testimonials/    # Testimonials REST endpoint
│   │   │   └── upload/          # Multi-part file upload handler (images, PDFs, ZIPs)
│   │   ├── globals.css          # Beige & White design system & custom scrollbars
│   │   ├── layout.tsx           # Root layout with SEO metadata & OpenGraph
│   │   ├── sitemap.ts           # Dynamic XML sitemap generator
│   │   └── robots.ts            # Robots.txt handler
│   ├── components/
│   │   ├── admin/               # Admin sidebar, header, and metrics components
│   │   ├── home/                # Homepage sections (Hero, Stats, Featured, Journey)
│   │   ├── layout/              # Navbar, Footer, AnnouncementBar, PublicLayout
│   │   └── ui/                  # BrandIcons (GitHub, LinkedIn, Twitter, YouTube)
│   ├── lib/
│   │   ├── auth/session.ts      # HMAC signed cookie session management
│   │   ├── db/
│   │   │   ├── initial-data.ts  # Rich seed data for instant realism
│   │   │   └── store.ts         # Persistent Data Access Layer (JSON + Supabase)
│   │   ├── supabase.ts          # Supabase client & fallback detector
│   │   ├── utils.ts             # Currency formatter (INR), slugify, date formatting
│   │   └── validations.ts       # Zod schemas for all models & form inputs
│   └── types/
│       └── index.ts             # Complete TypeScript interfaces
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql # PostgreSQL schema with indexes and RLS policies
```

---

## 🛠️ Getting Started Locally

### 1. Prerequisites
- Node.js (version 18.18 or newer; recommended v20+)
- npm or pnpm or yarn

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd IDE
npm install
```

### 3. Environment Setup
A `.env.local` file is already created. For custom deployments, copy the example:
```bash
cp .env.example .env.local
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the public institutional website, or navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to manage content.

---

## 🗄️ Database & Persistence Architecture

The platform is designed with a **Dual-Mode Data Access Layer**:

1. **Local Mode (Zero Setup Required)**:
   - All models automatically persist to `data/store.json`.
   - File uploads (images, PDF documents, ZIP code archives) are stored in `public/uploads/`.
   - Realistic seed data is populated on first load.
2. **Supabase PostgreSQL & Cloud Storage (Production Ready)**:
   - When `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided, the system seamlessly interfaces with Supabase.
   - Run the provided SQL migration in `supabase/migrations/001_initial_schema.sql` to provision all PostgreSQL tables, indexes, and Row-Level Security (RLS) policies.

---

## 🚀 Building for Production

Compile and validate the production bundle:
```bash
npm run build
npm run start
```

---

## 📍 Institute Information
- **Name**: YLCC (Youth Leadership & Career Campus)
- **Tagline**: Empowering Next-Gen Leaders & Engineering Champions
- **Location**: 4th Block, 80 Feet Road, Koramangala, Bengaluru, Karnataka 560034, India
- **Primary Contact**: +91 98765 43210
- **WhatsApp**: +91 98765 43210
- **Email**: contact@ylcc.edu.in / admissions@ylcc.edu.in
