-- ============================================================
-- MASTER SEED DATA FOR MALIK SAAD AWAN PORTFOLIO
-- ============================================================

-- Profile
INSERT INTO public.profiles (
    id, full_name, professional_title, bio, about_narrative, email, location, avatar_url, resume_url, github_url, linkedin_url, website_url
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Malik Saad Awan',
    'AI Engineer | DevOps Engineer | Full-Stack Developer',
    'End-to-end engineer specializing in building intelligent AI systems, cloud-native infrastructure, automated CI/CD pipelines, and high-performance full-stack applications.',
    'I am an AI, DevOps, and Full-Stack Engineer who approaches software development holistically. I don''t treat modeling, application logic, and infrastructure as disconnected silos. Instead, I bridge them into cohesive, production-grade systems.',
    'awansaad6927@gmail.com',
    'Islamabad, Pakistan / Remote',
    '/saad.png',
    '/resume.pdf',
    'https://github.com/Maliksaad69',
    'https://www.linkedin.com/in/malik-saad-ahmed-93404a318/',
    'https://maliksaad.dev'
) ON CONFLICT (id) DO NOTHING;

-- Skill Categories
INSERT INTO public.skill_categories (id, name, slug, description, display_order) VALUES
('b0000000-0000-0000-0000-000000000001', 'AI & Machine Learning', 'ai-ml', 'Deep neural networks, PyTorch, predictive modeling, NLP pipelines', 1),
('b0000000-0000-0000-0000-000000000002', 'Generative AI & LLM Engineering', 'genai-llm', 'Autonomous agents, RAG, prompt engineering, vector search', 2),
('b0000000-0000-0000-0000-000000000003', 'DevOps & Cloud Infrastructure', 'devops-cloud', 'Kubernetes, AWS, Terraform, Docker, GitOps with ArgoCD', 3),
('b0000000-0000-0000-0000-000000000004', 'Backend Engineering', 'backend', 'FastAPI, Node.js, asynchronous APIs, microservices', 4),
('b0000000-0000-0000-0000-000000000005', 'Full-Stack Development', 'fullstack', 'Next.js App Router, React 19, TypeScript, Tailwind CSS', 5),
('b0000000-0000-0000-0000-000000000006', 'Databases & Data Engineering', 'databases-data', 'PostgreSQL, Supabase, Qdrant, Redis, data pipelines', 6),
('b0000000-0000-0000-0000-000000000007', 'Automation & Integrations', 'automation', 'n8n workflow orchestration, webhook bridges, event-driven tasks', 7),
('b0000000-0000-0000-0000-000000000008', 'Tools & Platforms', 'tools-platforms', 'Linux administration, Git, CI/CD runners, monitoring', 8)
ON CONFLICT (id) DO NOTHING;

-- Site Settings
INSERT INTO public.site_settings (key, value) VALUES
('general', '{"hero_headline": "I Build Intelligent Systems. I Engineer Them for Production.", "hero_subheadline": "AI & DevOps Engineer turning ideas into production-ready products — from autonomous agent workflows and resilient full-stack applications to cloud infrastructure and automated GitOps pipelines.", "contact_email": "awansaad6927@gmail.com"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
