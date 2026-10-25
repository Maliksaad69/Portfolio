import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  getProjects,
  getCaseStudies,
} from "@/lib/data/store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ChallengeCard } from "@/components/projects/ChallengeCard";
import { OutcomesList } from "@/components/projects/OutcomesList";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { GithubIcon } from "@/components/ui/Icons";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

import { Project } from "@/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects({ publishedOnly: false });
  return projects.map((p: Project) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Malik Saad Awan`,
    description: project.short_description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Related projects
  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  // Check if there is an associated case study
  const caseStudies = await getCaseStudies();
  const associatedCaseStudy = caseStudies.find(
    (cs) => cs.project_id === project.id || cs.project_slug === project.slug
  );

  const statusVariantMap: Record<string, "success" | "warning" | "default" | "neutral" | "info"> = {
    Live: "success",
    "Private Deployment": "info",
    Development: "warning",
    Archived: "default",
    "Not Deployed": "default",
  };

  return (
    <article className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Section A: Project Header & Overview */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 text-white">
              {project.category_name || "Engineering"}
            </span>
            <Badge
              variant={statusVariantMap[project.deployment_status] || "default"}
              size="md"
            >
              {project.deployment_status}
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Status: {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-4xl">
            {project.short_description}
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
            <div>
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                My Role
              </span>
              <span className="font-semibold text-slate-900 mt-1 block">
                {project.role}
              </span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                Duration
              </span>
              <span className="font-semibold text-slate-900 mt-1 block">
                {project.duration}
              </span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                Team Size
              </span>
              <span className="font-semibold text-slate-900 mt-1 block">
                {project.team_size || "Solo Engineer"}
              </span>
            </div>
            <div>
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                Deployment
              </span>
              <span className="font-semibold text-slate-900 mt-1 block">
                {project.deployment_status}
              </span>
            </div>
          </div>

          {/* Primary Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.live_url && (
              <Button href={project.live_url} external size="md">
                <span>View Live Deployment</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
            {project.github_url && (
              <Button href={project.github_url} external variant="outline" size="md">
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </Button>
            )}
            {associatedCaseStudy && (
              <Button
                href={`/case-studies/${associatedCaseStudy.slug}`}
                variant="secondary"
                size="md"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Read Full Engineering Case Study</span>
              </Button>
            )}
          </div>

          {/* Featured Thumbnail Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-100 aspect-[16/9] shadow-sm">
            <img
              src={project.thumbnail_url}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Section B & C: Problem and Solution Narrative */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                The Problem
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.problem_statement}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                The Engineered Solution
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* Section D: Technical Architecture */}
        {project.architecture && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                System Design
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
                Technical Architecture
              </h2>
            </div>
            <ArchitectureDiagram architecture={project.architecture} />
          </section>
        )}

        {/* Section E: Engineering Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Deep Dive
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
                Engineering Challenges & Resolution
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Every serious engineering effort confronts unexpected technical friction. Here is how I approached and resolved the most complex roadblocks.
              </p>
            </div>
            <div className="space-y-6">
              {project.challenges.map((challenge, index) => (
                <ChallengeCard
                  key={challenge.id || challenge.title}
                  challenge={challenge}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section F: My Individual Contribution */}
        {project.contributions && project.contributions.length > 0 && (
          <section className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Accountability
              </span>
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight mt-1">
                My Direct Contributions
              </h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.contributions.map((contribution, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-3"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{contribution}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Section G: Results & Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                Verification & Business Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mt-1">
                Measurable Results & Outcomes
              </h2>
            </div>
            <OutcomesList outcomes={project.outcomes} />
          </section>
        )}

        {/* Section J: Technologies Used */}
        <section className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Technology Stack & Tooling
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white border border-slate-200 text-slate-800 shadow-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Section K: Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="pt-12 border-t border-slate-200/80 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                Explore Related Systems
              </h3>
              <Link
                href="/projects"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rel) => (
                <ProjectCard key={rel.id} project={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
