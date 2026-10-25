-- ============================================================
-- MASTER SUPABASE DATABASE MIGRATION FOR MALIK SAAD AWAN
-- Portfolio & Admin Content Management System
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    professional_title TEXT NOT NULL,
    bio TEXT NOT NULL,
    about_narrative TEXT,
    email TEXT NOT NULL,
    location TEXT,
    avatar_url TEXT,
    resume_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Skill Categories Table
CREATE TABLE IF NOT EXISTS public.skill_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INT DEFAULT 0
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES public.skill_categories(id) ON DELETE SET NULL,
    description TEXT,
    icon TEXT,
    featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    overview TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    solution TEXT NOT NULL,
    category_id UUID REFERENCES public.skill_categories(id) ON DELETE SET NULL,
    role TEXT NOT NULL,
    team_size TEXT,
    duration TEXT,
    status TEXT DEFAULT 'Completed',
    deployment_status TEXT DEFAULT 'Live',
    live_url TEXT,
    github_url TEXT,
    demo_video_url TEXT,
    documentation_url TEXT,
    thumbnail_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    contributions TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    related_project_slugs TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Project Challenges Table
CREATE TABLE IF NOT EXISTS public.project_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    approach TEXT NOT NULL,
    solution TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 6. Project Outcomes Table
CREATE TABLE IF NOT EXISTS public.project_outcomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    metric_value TEXT,
    metric_label TEXT,
    outcome_type TEXT DEFAULT 'quantitative',
    display_order INT DEFAULT 0
);

-- 7. Project Architecture Table
CREATE TABLE IF NOT EXISTS public.project_architecture (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    data_flow JSONB DEFAULT '[]'::jsonb,
    components JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0
);

-- 8. Project Media Table
CREATE TABLE IF NOT EXISTS public.project_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    media_type TEXT DEFAULT 'image',
    alt_text TEXT,
    caption TEXT,
    display_order INT DEFAULT 0
);

-- 9. Case Studies Table
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    project_slug TEXT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    featured_image TEXT,
    executive_summary TEXT,
    background TEXT,
    problem_statement TEXT,
    goals JSONB DEFAULT '[]'::jsonb,
    constraints JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    architecture_details TEXT,
    technical_decisions JSONB DEFAULT '[]'::jsonb,
    implementation_details TEXT,
    challenges_and_solutions JSONB DEFAULT '[]'::jsonb,
    testing_and_validation TEXT,
    deployment_strategy TEXT,
    results JSONB DEFAULT '[]'::jsonb,
    lessons_learned JSONB DEFAULT '[]'::jsonb,
    future_improvements JSONB DEFAULT '[]'::jsonb,
    published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Experiences Table
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company TEXT NOT NULL,
    job_title TEXT NOT NULL,
    employment_type TEXT DEFAULT 'Full-Time',
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    responsibilities TEXT[] DEFAULT '{}',
    achievements TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    company_logo_url TEXT,
    published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Project-Skills Junction Table
CREATE TABLE IF NOT EXISTS public.project_skills (
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);

-- 12. Experience-Skills Junction Table
CREATE TABLE IF NOT EXISTS public.experience_skills (
    experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
    skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
    PRIMARY KEY (experience_id, skill_id)
);

-- 13. Education Table
CREATE TABLE IF NOT EXISTS public.education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0
);

-- 14. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    project_type TEXT,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_architecture ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ policies for published portfolio content
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read skill categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public read project challenges" ON public.project_challenges FOR SELECT USING (true);
CREATE POLICY "Public read project outcomes" ON public.project_outcomes FOR SELECT USING (true);
CREATE POLICY "Public read project architecture" ON public.project_architecture FOR SELECT USING (true);
CREATE POLICY "Public read project media" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Public read published case studies" ON public.case_studies FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public read published experiences" ON public.experiences FOR SELECT USING (published = true OR auth.role() = 'authenticated');
CREATE POLICY "Public read project_skills" ON public.project_skills FOR SELECT USING (true);
CREATE POLICY "Public read experience_skills" ON public.experience_skills FOR SELECT USING (true);
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Public INSERT for contact submissions (Rate limited & validated at application layer)
CREATE POLICY "Public insert contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Admin FULL ACCESS policies for authenticated users
CREATE POLICY "Admin all profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all skill categories" ON public.skill_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all project challenges" ON public.project_challenges FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all project outcomes" ON public.project_outcomes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all project architecture" ON public.project_architecture FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all project media" ON public.project_media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all case studies" ON public.case_studies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all experiences" ON public.experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all project_skills" ON public.project_skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all experience_skills" ON public.experience_skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all education" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all contact submissions" ON public.contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS (If using Supabase Storage)
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-media', 'portfolio-media', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true) ON CONFLICT (id) DO NOTHING;

-- Public read for media & resume buckets
CREATE POLICY "Public read storage media" ON storage.objects FOR SELECT USING (bucket_id IN ('portfolio-media', 'resumes'));
CREATE POLICY "Admin manage storage media" ON storage.objects FOR ALL USING (auth.role() = 'authenticated');
