-- ==============================================================================
-- YLCC (Youth Leadership & Career Campus) - Initial PostgreSQL Schema
-- Compatible with Supabase Database, RLS Policies, and UUIDs
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. INSTITUTE SETTINGS
CREATE TABLE IF NOT EXISTS public.institute_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'YLCC',
  full_form TEXT NOT NULL DEFAULT 'Youth Leadership & Career Campus',
  tagline TEXT NOT NULL DEFAULT 'Empowering Next-Generation Tech Leaders & Industry Innovators',
  institute_type TEXT NOT NULL DEFAULT 'Premier IT Training & Skill Development Institute',
  location TEXT NOT NULL DEFAULT 'Bengaluru, Karnataka, India',
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  admissions_email TEXT NOT NULL,
  office_hours TEXT NOT NULL,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  announcement_bar JSONB NOT NULL DEFAULT '{}'::jsonb,
  hero_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  logo_url TEXT,
  map_embed_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SITE STATISTICS
CREATE TABLE IF NOT EXISTS public.site_statistics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value INTEGER NOT NULL DEFAULT 0,
  suffix TEXT NOT NULL DEFAULT '+',
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'TrendingUp',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. COURSES & MODULES
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  mode TEXT NOT NULL CHECK (mode IN ('Offline', 'Online', 'Hybrid')),
  duration TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL DEFAULT 12,
  fees NUMERIC NOT NULL DEFAULT 0,
  discounted_fees NUMERIC,
  instructor_name TEXT NOT NULL,
  instructor_role TEXT NOT NULL,
  instructor_avatar TEXT,
  batch_timing TEXT NOT NULL,
  start_date DATE NOT NULL,
  available_seats INTEGER NOT NULL DEFAULT 20,
  total_seats INTEGER NOT NULL DEFAULT 30,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  has_certificate BOOLEAN NOT NULL DEFAULT TRUE,
  brochure_url TEXT,
  thumbnail_url TEXT NOT NULL,
  tools_and_tech JSONB NOT NULL DEFAULT '[]'::jsonb,
  learning_outcomes JSONB NOT NULL DEFAULT '[]'::jsonb,
  eligibility JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL DEFAULT 2,
  description TEXT NOT NULL,
  topics JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PROJECTS & CONTRIBUTORS
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  category TEXT NOT NULL,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  contributors JSONB NOT NULL DEFAULT '[]'::jsonb,
  mentor_name TEXT NOT NULL,
  mentor_designation TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  demo_video_url TEXT,
  live_demo_url TEXT,
  github_url TEXT,
  pdf_report_url TEXT,
  zip_source_url TEXT,
  completion_date DATE NOT NULL,
  academic_batch TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. FACULTY & MENTORS
CREATE TABLE IF NOT EXISTS public.faculty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  expertise JSONB NOT NULL DEFAULT '[]'::jsonb,
  experience_years INTEGER NOT NULL DEFAULT 0,
  bio TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  email TEXT,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  courses_taught JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. STUDENT ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  achievement_title TEXT NOT NULL,
  description TEXT NOT NULL,
  course_name TEXT NOT NULL,
  batch TEXT NOT NULL,
  company_or_organizer TEXT,
  achievement_date DATE NOT NULL,
  evidence_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. GALLERY ALBUMS & ITEMS
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id UUID NOT NULL REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  taken_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. EVENTS & ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Workshop', 'Seminar', 'Hackathon', 'Webinar', 'Announcement')),
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  banner_url TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  venue TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('In-Person', 'Online', 'Hybrid')),
  registration_url TEXT,
  is_registration_open BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  speaker_name TEXT,
  speaker_designation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  course_name TEXT NOT NULL,
  batch TEXT NOT NULL,
  current_role TEXT NOT NULL,
  company TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  video_url TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ENQUIRIES (Public leads)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_interest TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In-Progress', 'Converted', 'Closed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ADMISSION APPLICATIONS
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT NOT NULL,
  qualification TEXT NOT NULL,
  selected_course TEXT NOT NULL,
  preferred_mode TEXT NOT NULL CHECK (preferred_mode IN ('Offline', 'Online', 'Hybrid')),
  preferred_batch TEXT NOT NULL CHECK (preferred_batch IN ('Morning', 'Evening', 'Weekend')),
  document_url TEXT,
  consent_agreed BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Accepted', 'Waitlisted', 'Rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Admissions', 'Courses', 'Placements', 'General')),
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(is_published, is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(is_published, is_featured);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status, created_at DESC);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS FOR PUBLISHED CONTENT
CREATE POLICY "Public can view published courses" ON public.courses FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view course modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view faculty" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "Public can view achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public can view gallery albums" ON public.gallery_albums FOR SELECT USING (true);
CREATE POLICY "Public can view gallery items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public can view published events" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view approved testimonials" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can view faqs" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view site stats" ON public.site_statistics FOR SELECT USING (true);
CREATE POLICY "Public can view settings" ON public.institute_settings FOR SELECT USING (true);

-- PUBLIC INSERT ACCESS FOR ENQUIRIES AND APPLICATIONS
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit applications" ON public.applications FOR INSERT WITH CHECK (true);

-- ADMIN AUTHENTICATED ACCESS FOR ALL OPERATIONS
CREATE POLICY "Admins full access courses" ON public.courses FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access modules" ON public.course_modules FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access projects" ON public.projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access faculty" ON public.faculty FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access achievements" ON public.achievements FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access gallery_albums" ON public.gallery_albums FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access gallery_items" ON public.gallery_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access events" ON public.events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access enquiries" ON public.enquiries FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access applications" ON public.applications FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access faqs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access stats" ON public.site_statistics FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access settings" ON public.institute_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins full access activity_logs" ON public.activity_logs FOR ALL TO authenticated USING (true);
