import {
  initialProfile,
  initialSiteSettings,
  initialSkillCategories,
  initialSkills,
  initialProjects,
  initialCaseStudies,
  initialExperiences,
  initialEducation,
} from "./initial-data";
import {
  Profile,
  SiteSettings,
  SkillCategory,
  Skill,
  Project,
  CaseStudy,
  Experience,
  Education,
  ContactSubmission,
} from "@/types";

// In-memory persistent state during server runtime
let currentProfile: Profile = { ...initialProfile };
let currentSettings: SiteSettings = { ...initialSiteSettings };
const currentCategories: SkillCategory[] = [...initialSkillCategories];
let currentSkills: Skill[] = [...initialSkills];
let currentProjects: Project[] = [...initialProjects];
let currentCaseStudies: CaseStudy[] = [...initialCaseStudies];
let currentExperiences: Experience[] = [...initialExperiences];
const currentEducation: Education[] = [...initialEducation];
const currentSubmissions: ContactSubmission[] = [
  {
    id: "sub-1",
    name: "Alex Vance",
    email: "alex.vance@techcorp.io",
    subject: "Multi-Agent System Consultation",
    message: "We are building an internal devops intelligence assistant and were impressed by your LangGraph architecture. Would love to discuss a 3-month consulting engagement.",
    project_type: "AI Consulting / Architecture",
    status: "unread",
    created_at: "2026-10-24T01:30:00.000Z",
  },
  {
    id: "sub-2",
    name: "Sarah Jenkins",
    email: "s.jenkins@cloudscale.net",
    subject: "GitOps Infrastructure Overhaul",
    message: "Looking for an expert to help our team transition from manual ECS deployments to automated EKS with ArgoCD.",
    project_type: "DevOps & Cloud",
    status: "reviewed",
    created_at: "2026-10-23T10:15:00.000Z",
  },
];

export async function getProfile(): Promise<Profile> {
  return currentProfile;
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  currentProfile = { ...currentProfile, ...data, updated_at: new Date().toISOString() };
  return currentProfile;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return currentSettings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  currentSettings = { ...currentSettings, ...data };
  return currentSettings;
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
  return [...currentCategories].sort((a, b) => a.display_order - b.display_order);
}

export async function getSkills(): Promise<Skill[]> {
  const categories = await getSkillCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  return [...currentSkills]
    .map((s) => ({
      ...s,
      category: categoryMap.get(s.category_id),
    }))
    .sort((a, b) => a.display_order - b.display_order);
}

export async function saveSkill(skillData: Partial<Skill>): Promise<Skill> {
  if (skillData.id) {
    const index = currentSkills.findIndex((s) => s.id === skillData.id);
    if (index !== -1) {
      currentSkills[index] = { ...currentSkills[index], ...skillData, updated_at: new Date().toISOString() } as Skill;
      return currentSkills[index];
    }
  }
  const newSkill: Skill = {
    id: `skill-${Date.now()}`,
    name: skillData.name || "New Skill",
    slug: skillData.slug || skillData.name?.toLowerCase().replace(/\s+/g, "-") || `skill-${Date.now()}`,
    category_id: skillData.category_id || currentCategories[0].id,
    description: skillData.description || "",
    icon: skillData.icon || "Code",
    featured: !!skillData.featured,
    display_order: skillData.display_order || currentSkills.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  currentSkills.push(newSkill);
  return newSkill;
}

export async function deleteSkill(id: string): Promise<boolean> {
  const initialLength = currentSkills.length;
  currentSkills = currentSkills.filter((s) => s.id !== id);
  return currentSkills.length < initialLength;
}

export async function getProjects(options?: {
  featuredOnly?: boolean;
  publishedOnly?: boolean;
  category?: string;
  limit?: number;
}): Promise<Project[]> {
  let list = [...currentProjects];

  if (options?.publishedOnly !== false) {
    list = list.filter((p) => p.published);
  }
  if (options?.featuredOnly) {
    list = list.filter((p) => p.featured);
  }
  const catFilter = options?.category;
  if (catFilter && catFilter !== "all") {
    list = list.filter((p) => p.category_id === catFilter || (p.category_name && p.category_name.toLowerCase().includes(catFilter.toLowerCase())));
  }

  list.sort((a, b) => a.display_order - b.display_order);

  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getAllAdminProjects(): Promise<Project[]> {
  return [...currentProjects].sort((a, b) => a.display_order - b.display_order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = currentProjects.find((p) => p.slug === slug);
  return project ? { ...project } : null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const project = currentProjects.find((p) => p.id === id);
  return project ? { ...project } : null;
}

export async function saveProject(projectData: Partial<Project>): Promise<Project> {
  if (projectData.id) {
    const index = currentProjects.findIndex((p) => p.id === projectData.id);
    if (index !== -1) {
      currentProjects[index] = {
        ...currentProjects[index],
        ...projectData,
        updated_at: new Date().toISOString(),
      } as Project;
      return currentProjects[index];
    }
  }

  const newProject: Project = {
    id: `proj-${Date.now()}`,
    title: projectData.title || "Untitled Project",
    slug: projectData.slug || (projectData.title ? projectData.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") : `project-${Date.now()}`),
    short_description: projectData.short_description || "",
    overview: projectData.overview || "",
    problem_statement: projectData.problem_statement || "",
    solution: projectData.solution || "",
    category_id: projectData.category_id || "cat-ai",
    category_name: projectData.category_name || "AI & Machine Learning",
    role: projectData.role || "Lead Engineer",
    duration: projectData.duration || "3 Months",
    status: projectData.status || "Completed",
    deployment_status: projectData.deployment_status || "Live",
    live_url: projectData.live_url || "",
    github_url: projectData.github_url || "",
    thumbnail_url: projectData.thumbnail_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    featured: !!projectData.featured,
    published: projectData.published !== undefined ? projectData.published : true,
    display_order: projectData.display_order || currentProjects.length + 1,
    contributions: projectData.contributions || [],
    technologies: projectData.technologies || [],
    challenges: projectData.challenges || [],
    outcomes: projectData.outcomes || [],
    architecture: projectData.architecture,
    related_project_slugs: projectData.related_project_slugs || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  currentProjects.unshift(newProject);
  return newProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  const initialLength = currentProjects.length;
  currentProjects = currentProjects.filter((p) => p.id !== id);
  return currentProjects.length < initialLength;
}

export async function getCaseStudies(options?: {
  publishedOnly?: boolean;
  limit?: number;
}): Promise<CaseStudy[]> {
  let list = [...currentCaseStudies];
  if (options?.publishedOnly !== false) {
    list = list.filter((cs) => cs.published);
  }
  list.sort((a, b) => a.display_order - b.display_order);
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }
  return list;
}

export async function getAllAdminCaseStudies(): Promise<CaseStudy[]> {
  return [...currentCaseStudies].sort((a, b) => a.display_order - b.display_order);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const cs = currentCaseStudies.find((c) => c.slug === slug);
  return cs ? { ...cs } : null;
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  const cs = currentCaseStudies.find((c) => c.id === id);
  return cs ? { ...cs } : null;
}

export async function saveCaseStudy(csData: Partial<CaseStudy>): Promise<CaseStudy> {
  if (csData.id) {
    const index = currentCaseStudies.findIndex((c) => c.id === csData.id);
    if (index !== -1) {
      currentCaseStudies[index] = {
        ...currentCaseStudies[index],
        ...csData,
        updated_at: new Date().toISOString(),
      } as CaseStudy;
      return currentCaseStudies[index];
    }
  }

  const newCs: CaseStudy = {
    id: `cs-${Date.now()}`,
    title: csData.title || "Untitled Case Study",
    slug: csData.slug || (csData.title ? csData.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") : `case-study-${Date.now()}`),
    summary: csData.summary || "",
    featured_image: csData.featured_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    executive_summary: csData.executive_summary || "",
    background: csData.background || "",
    problem_statement: csData.problem_statement || "",
    goals: csData.goals || [],
    constraints: csData.constraints || [],
    requirements: csData.requirements || [],
    architecture_details: csData.architecture_details || "",
    technical_decisions: csData.technical_decisions || [],
    implementation_details: csData.implementation_details || "",
    challenges_and_solutions: csData.challenges_and_solutions || [],
    testing_and_validation: csData.testing_and_validation || "",
    deployment_strategy: csData.deployment_strategy || "",
    results: csData.results || [],
    lessons_learned: csData.lessons_learned || [],
    future_improvements: csData.future_improvements || [],
    published: csData.published !== undefined ? csData.published : true,
    display_order: csData.display_order || currentCaseStudies.length + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  currentCaseStudies.unshift(newCs);
  return newCs;
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  const initialLength = currentCaseStudies.length;
  currentCaseStudies = currentCaseStudies.filter((c) => c.id !== id);
  return currentCaseStudies.length < initialLength;
}

export async function getExperiences(options?: { publishedOnly?: boolean }): Promise<Experience[]> {
  let list = [...currentExperiences];
  if (options?.publishedOnly !== false) {
    list = list.filter((e) => e.published);
  }
  return list.sort((a, b) => a.display_order - b.display_order);
}

export async function saveExperience(data: Partial<Experience>): Promise<Experience> {
  if (data.id) {
    const idx = currentExperiences.findIndex((e) => e.id === data.id);
    if (idx !== -1) {
      currentExperiences[idx] = { ...currentExperiences[idx], ...data } as Experience;
      return currentExperiences[idx];
    }
  }
  const newExp: Experience = {
    id: `exp-${Date.now()}`,
    company: data.company || "Company",
    job_title: data.job_title || "Engineer",
    employment_type: data.employment_type || "Full-Time",
    location: data.location || "Remote",
    start_date: data.start_date || new Date().toISOString().slice(0, 10),
    end_date: data.end_date,
    is_current: !!data.is_current,
    description: data.description || "",
    responsibilities: data.responsibilities || [],
    achievements: data.achievements || [],
    technologies: data.technologies || [],
    published: data.published !== undefined ? data.published : true,
    display_order: data.display_order || currentExperiences.length + 1,
  };
  currentExperiences.unshift(newExp);
  return newExp;
}

export async function deleteExperience(id: string): Promise<boolean> {
  const initialLength = currentExperiences.length;
  currentExperiences = currentExperiences.filter((e) => e.id !== id);
  return currentExperiences.length < initialLength;
}

export async function getEducation(): Promise<Education[]> {
  return [...currentEducation].sort((a, b) => a.display_order - b.display_order);
}

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  project_type?: string;
}): Promise<ContactSubmission> {
  const newSub: ContactSubmission = {
    id: `sub-${Date.now()}`,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    project_type: data.project_type,
    status: "unread",
    created_at: new Date().toISOString(),
  };
  currentSubmissions.unshift(newSub);
  return newSub;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  return [...currentSubmissions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function updateSubmissionStatus(id: string, status: "unread" | "reviewed" | "archived"): Promise<boolean> {
  const sub = currentSubmissions.find((s) => s.id === id);
  if (sub) {
    sub.status = status;
    return true;
  }
  return false;
}

export async function getAdminDashboardStats() {
  const totalProjects = currentProjects.length;
  const publishedProjects = currentProjects.filter((p) => p.published).length;
  const draftProjects = totalProjects - publishedProjects;
  const totalCaseStudies = currentCaseStudies.length;
  const totalExperiences = currentExperiences.length;
  const totalSkills = currentSkills.length;
  const unreadMessages = currentSubmissions.filter((s) => s.status === "unread").length;

  return {
    totalProjects,
    publishedProjects,
    draftProjects,
    totalCaseStudies,
    totalExperiences,
    totalSkills,
    unreadMessages,
  };
}
