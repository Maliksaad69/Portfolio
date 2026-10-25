export type DeploymentStatus = "Live" | "Private Deployment" | "Development" | "Archived" | "Not Deployed";

export interface Profile {
  id: string;
  full_name: string;
  professional_title: string;
  bio: string;
  about_narrative: string;
  email: string;
  location: string;
  avatar_url: string;
  resume_url: string;
  github_url: string;
  linkedin_url: string;
  website_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  display_order: number;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category?: SkillCategory;
  description: string;
  icon?: string;
  featured: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectChallenge {
  id: string;
  project_id?: string;
  title: string;
  difficulty: string;
  approach: string;
  solution: string;
  display_order: number;
}

export interface ProjectOutcome {
  id: string;
  project_id?: string;
  title: string;
  description: string;
  metric_value?: string;
  metric_label?: string;
  outcome_type: "quantitative" | "qualitative";
  display_order: number;
}

export interface ArchitectureComponent {
  name: string;
  role: string;
  description: string;
}

export interface ProjectArchitecture {
  id: string;
  project_id?: string;
  title: string;
  description: string;
  image_url?: string;
  data_flow: string[];
  components: ArchitectureComponent[];
  display_order: number;
}

export interface ProjectMedia {
  id: string;
  project_id?: string;
  storage_path: string;
  media_type: "image" | "video" | "diagram";
  alt_text: string;
  caption?: string;
  display_order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  overview: string;
  problem_statement: string;
  solution: string;
  category_id: string;
  category_name?: string;
  role: string;
  team_size?: string;
  duration: string;
  status: "Completed" | "In Progress" | "Maintained";
  deployment_status: DeploymentStatus;
  live_url?: string;
  github_url?: string;
  demo_video_url?: string;
  documentation_url?: string;
  thumbnail_url: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  contributions: string[];
  technologies: string[];
  challenges?: ProjectChallenge[];
  outcomes?: ProjectOutcome[];
  architecture?: ProjectArchitecture;
  media?: ProjectMedia[];
  related_project_slugs?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CaseStudy {
  id: string;
  project_id?: string;
  project_slug?: string;
  title: string;
  slug: string;
  summary: string;
  featured_image: string;
  executive_summary: string;
  background: string;
  problem_statement: string;
  goals: string[];
  constraints: string[];
  requirements: string[];
  architecture_details: string;
  technical_decisions: { decision: string; justification: string; alternative_considered: string }[];
  implementation_details: string;
  challenges_and_solutions: { challenge: string; solution: string }[];
  testing_and_validation: string;
  deployment_strategy: string;
  results: string[];
  lessons_learned: string[];
  future_improvements: string[];
  published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  job_title: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  company_logo_url?: string;
  published: boolean;
  display_order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  description: string;
  display_order: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  project_type?: string;
  status: "unread" | "reviewed" | "archived";
  created_at: string;
}

export interface SiteSettings {
  site_title: string;
  site_tagline: string;
  contact_email: string;
  github_url: string;
  linkedin_url: string;
  resume_url: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_intro: string;
}
