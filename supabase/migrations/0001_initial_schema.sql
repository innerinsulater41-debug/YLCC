-- ==============================================================================
-- YLCC (Yukti Ledger & Commerce Centre) Production Database Schema
-- Supabase / PostgreSQL Schema with Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & Roles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Institute Settings Table (Single-row or Key-Value)
CREATE TABLE IF NOT EXISTS public.institute_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institute_name TEXT NOT NULL DEFAULT 'YLCC',
  full_form TEXT NOT NULL DEFAULT 'Yukti Ledger & Commerce Centre',
  tagline TEXT NOT NULL,
  institute_type TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  office_hours TEXT NOT NULL,
  social_links JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  hero_title TEXT,
  hero_subtitle TEXT,
  announcement_bar_text TEXT,
  show_announcement_bar BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Program Categories
CREATE TABLE IF NOT EXISTS public.program_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INT DEFAULT 0
);

-- 4. Programs Table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  duration TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('Offline Classroom', 'Online Live', 'Hybrid')),
  fees NUMERIC NOT NULL,
  discounted_fees NUMERIC,
  eligibility TEXT NOT NULL,
  software_tools TEXT[] DEFAULT '{}',
  faculty_id TEXT,
  faculty_name TEXT,
  batch_timing TEXT NOT NULL,
  available_seats INT DEFAULT 15,
  start_date TEXT NOT NULL,
  brochure_url TEXT,
  certificate_info TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  display_order INT DEFAULT 0,
  modules JSONB DEFAULT '[]'::jsonb,
  learning_outcomes TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Practical Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  industry_category TEXT NOT NULL,
  accounting_category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Foundational', 'Intermediate', 'Advanced', 'Executive')),
  skills_covered TEXT[] DEFAULT '{}',
  software_used TEXT[] DEFAULT '{}',
  learning_objectives TEXT[] DEFAULT '{}',
  business_scenario TEXT NOT NULL,
  tasks_to_complete TEXT[] DEFAULT '{}',
  expected_outcomes TEXT[] DEFAULT '{}',
  cover_image_url TEXT NOT NULL,
  media JSONB DEFAULT '[]'::jsonb,
  resources JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  practice_time_hours INT DEFAULT 20,
  academic_year TEXT DEFAULT '2025-26',
  faculty_mentor TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  display_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Faculty Table
CREATE TABLE IF NOT EXISTS public.faculty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  qualifications TEXT NOT NULL,
  experience_years INT NOT NULL,
  expertise_areas TEXT[] DEFAULT '{}',
  programs_taught TEXT[] DEFAULT '{}',
  bio TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  linkedin_url TEXT,
  email TEXT,
  is_featured BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  course_taken TEXT NOT NULL,
  current_role TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Downloadable Resources Table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size TEXT NOT NULL,
  access_level TEXT NOT NULL DEFAULT 'public' CHECK (access_level IN ('public', 'student', 'admin')),
  download_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Gallery Items Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_category TEXT NOT NULL,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  image_url TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- 11. Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  program_of_interest TEXT NOT NULL,
  preferred_batch TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Admission Applications Table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  dob DATE NOT NULL,
  address TEXT NOT NULL,
  qualification TEXT NOT NULL,
  commerce_background BOOLEAN NOT NULL DEFAULT TRUE,
  selected_program TEXT NOT NULL,
  preferred_mode TEXT NOT NULL,
  preferred_batch TEXT NOT NULL,
  current_occupation TEXT NOT NULL,
  career_goal TEXT NOT NULL,
  document_urls TEXT[] DEFAULT '{}',
  consent BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_programs_slug ON public.programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_status ON public.programs(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_industry ON public.projects(industry_category);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institute_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies for published content
CREATE POLICY "Public can view published programs" ON public.programs FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view faculty" ON public.faculty FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view public resources" ON public.resources FOR SELECT USING (access_level IN ('public', 'student'));
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public can view faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public can view institute settings" ON public.institute_settings FOR SELECT USING (true);

-- 2. Public Insert Policies for Forms
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert applications" ON public.applications FOR INSERT WITH CHECK (true);

-- 3. Authenticated Admin Policies (Full Access)
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to settings" ON public.institute_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to programs" ON public.programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to faculty" ON public.faculty FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to resources" ON public.resources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to faqs" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to enquiries" ON public.enquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to applications" ON public.applications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to activity logs" ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated');
