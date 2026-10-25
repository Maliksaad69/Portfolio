# Malik Saad Awan — AI & DevOps Engineer Portfolio Website

A production-ready, editorial-grade multi-page personal portfolio and dynamic Content Management System (CMS) engineered for **Malik Saad Awan**, an AI Engineer, DevOps Engineer, and Full-Stack Developer.

> *"I Build Intelligent Systems. I Engineer Them for Production."*

---

## 🏛 System Architecture & Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components, Streaming SSR)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Editorial design system, typography hierarchy, neutral warm palette)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Supabase Auth, Storage)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand vector primitives
- **Validation**: [Zod](https://zod.dev/)

---

## 🚀 Key Features

### 1. Public Portfolio
- **Homepage (`/`)**:
  - High-impact Hero section with professional value proposition, availability badge, and system topology indicator.
  - Three interconnected engineering disciplines: **AI Engineering**, **DevOps & Cloud Engineering**, and **Full-Stack Development**.
  - Selected featured projects with outcomes, architecture previews, and deployment badges.
  - Engineering Impact section highlighting real-world production problem solving.
  - 8-stage End-to-End Software Development Lifecycle timeline.
  - Career experience and technical expertise snapshots.
  - Direct inquiry CTA block.
- **Projects System (`/projects` & `/projects/[slug]`)**:
  - Full-text search and client-side filtering by category and deployment status (*Live, Private Deployment, Development, Archived*).
  - Detailed project pages with **Problem Statement**, **Engineered Solution**, **Technical Architecture diagram & data flow**, **Engineering Challenges** (*Problem, Difficulty, Approach, Solution*), **Individual Contributions**, **Quantified Outcomes**, and **Related Systems**.
- **Case Studies System (`/case-studies` & `/case-studies/[slug]`)**:
  - Detailed 16-point technical retrospective breakdowns:
    1. Executive Summary
    2. Background Context
    3. Core Problem Statement
    4. Project Goals
    5. Constraints
    6. Requirements
    7. System Architecture
    8. Architectural Decisions & Trade-Offs
    9. Implementation Details
    10. Critical Roadblocks
    11. Engineering Solutions
    12. Testing & Validation
    13. Deployment Strategy
    14. Measured Results
    15. Lessons Learned
    16. Future Roadmap
- **Professional Experience (`/experience`)**:
  - Chronological career timeline detailing positions, employment types, locations, responsibilities, quantified achievements, and technologies.
  - Academic foundations section.
- **Technical Skills (`/skills`)**:
  - Structured categorical display across 8 domains (AI & ML, Generative AI & LLMs, DevOps & Cloud, Backend, Full-Stack, Databases, Automation, Tools).
  - Concrete contextual descriptions and project associations instead of arbitrary percentage bars.
- **About (`/about`)**:
  - Engineering philosophy, background in Artificial Intelligence, systems-first mindset, and downloadable resume.
- **Contact (`/contact`)**:
  - Fully validated inquiry form (Zod validation, error handling, status tracking).
  - Server API endpoint (`/api/contact`) persisting submissions to Supabase.
- **SEO & Search Indexing**:
  - Dynamic `sitemap.xml` (`/sitemap.xml`) covering all static routes, project slugs, and case study slugs.
  - `robots.txt` (`/robots.txt`) with crawler rules and admin disallow headers.
  - OpenGraph and Twitter card metadata.

### 2. Admin Content Management System (CMS)
- Protected administrative dashboard (`/admin`):
  - **Overview**: Real-time counters for projects, published vs. drafts, case studies, experiences, skills, and unread client inquiries.
  - **Project Management (`/admin/projects`)**: Create, edit, publish/draft toggle, feature on home toggle, and delete projects.
  - **Case Study Management (`/admin/case-studies`)**: Full rich editor for in-depth technical retrospectives.
  - **Experience Management (`/admin/experience`)**: Add/edit roles, responsibilities, and achievements.
  - **Skills Management (`/admin/skills`)**: Manage competencies, categories, descriptions, and featured flags.
  - **Inquiries Inbox (`/admin/messages`)**: Review contact submissions, mark as reviewed, archive, or reply directly.
  - **Media Library (`/admin/media`)**: Preview, manage, and copy URLs of architecture diagrams and project screenshots.
  - **Site Settings (`/admin/settings`)**: Live modification of headlines, bio narrative, contact email, and resume URLs.

---

## 🛠 Local Setup & Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/malik-saad-ahmed/malik-saad-ahmed.git
cd malik-saad-ahmed
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_EMAIL=saadawan.eng@gmail.com
```

> **Note**: The application includes a resilient data layer with preloaded seed data. Even before connecting your live Supabase database, the public portfolio and admin CMS run seamlessly in local preview mode.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄 Database & Supabase Configuration

### 1. Execute SQL Migration
Execute the SQL migration located at `supabase/migrations/20261024000000_initial_schema.sql` inside the Supabase SQL Editor:
- Creates all 15 relational tables (`profiles`, `skill_categories`, `skills`, `projects`, `project_challenges`, `project_outcomes`, `project_architecture`, `project_media`, `case_studies`, `experiences`, `project_skills`, `experience_skills`, `education`, `contact_submissions`, `site_settings`).
- Sets up Row Level Security (RLS) policies allowing public read access to published content and write access to contact submissions, while restricting modifications to authenticated users.
- Creates storage buckets (`portfolio-media`, `resumes`) with appropriate access policies.

### 2. Seed Database
Execute `supabase/seed.sql` to populate initial production data for Malik Saad Awan.

### 3. Admin Authentication
- Sign up your admin user in Supabase Authentication (`Authentication > Users`).
- Log into the CMS at `/admin/login`.

---

## 🚢 Production Build & Deployment

### Build Locally
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Import the repository into [Vercel](https://vercel.com/).
2. Add the environment variables defined in `.env.example`.
3. Deploy! Next.js will automatically prerender static routes and deploy serverless Route Handlers for the API.

---

## 📄 License
MIT License. Created for **Malik Saad Awan**.
