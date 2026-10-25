import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCaseStudyBySlug, getProjectById, getCaseStudies } from "@/lib/data/store";
import { CaseStudy } from "@/types";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  ShieldAlert,
  Target,
} from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies({ publishedOnly: false });
  return caseStudies.map((cs: CaseStudy) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: `${cs.title} — Engineering Case Study`,
    description: cs.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);

  if (!cs) {
    notFound();
  }

  const project = cs.project_id ? await getProjectById(cs.project_id) : null;

  return (
    <article className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back navigation */}
        <div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="space-y-6 border-b border-slate-200 pb-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 text-white">
              Engineering Case Study
            </span>
            {project && (
              <Link
                href={`/projects/${project.slug}`}
                className="text-xs font-mono text-blue-600 hover:underline"
              >
                Associated Project: {project.title} →
              </Link>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]">
            {cs.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            {cs.summary}
          </p>

          <div className="rounded-2xl overflow-hidden border border-slate-200/90 aspect-[16/9] bg-slate-100 shadow-sm">
            <img
              src={cs.featured_image}
              alt={cs.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* 1. Executive Summary */}
        <section className="p-8 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
            01. Executive Summary
          </div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            {cs.executive_summary}
          </p>
        </section>

        {/* 2 & 3. Background & Problem Statement */}
        <section className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              02. Background Context
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {cs.background}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>03. The Core Engineering Problem</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {cs.problem_statement}
            </p>
          </div>
        </section>

        {/* 4, 5, 6. Goals, Constraints & Requirements */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>04. Project Goals</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {cs.goals.map((g, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>05. Constraints</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {cs.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>06. Requirements</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {cs.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Architecture Details */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            07. System Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Architectural Strategy & Component Topology
          </h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {cs.architecture_details}
          </div>
        </section>

        {/* 8. Technical Decisions & Justifications */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            08. Architectural Trade-Offs
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Key Technical Decisions
          </h2>
          <div className="space-y-4">
            {cs.technical_decisions.map((td, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900">
                    {td.decision}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Decision #{index + 1}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900">Justification: </strong>
                  {td.justification}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200/60 font-mono">
                  <strong className="text-slate-700">Alternative Rejected: </strong>
                  {td.alternative_considered}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Implementation Details */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            09. Implementation
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Engineering Execution & Code Mechanics
          </h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {cs.implementation_details}
          </div>
        </section>

        {/* 10 & 11. Engineering Challenges & Solutions */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            10 & 11. Critical Roadblocks
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Engineering Challenges & Resolution
          </h2>
          <div className="space-y-4">
            {cs.challenges_and_solutions.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-start gap-2.5 text-sm font-semibold text-rose-900 bg-rose-50/70 p-3 rounded-lg border border-rose-200/70">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                  <span>{item.challenge}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm font-normal text-emerald-950 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200/70">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span>{item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12 & 13. Testing, Validation & Deployment */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              12. Testing & Validation
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {cs.testing_and_validation}
            </p>
          </div>
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              13. Deployment Strategy
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {cs.deployment_strategy}
            </p>
          </div>
        </section>

        {/* 14. Measured Results */}
        <section className="p-8 rounded-2xl bg-slate-900 text-white space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              14. Verification
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
              Measured Production Results
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cs.results.map((res, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {res}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 15 & 16. Lessons Learned & Future Improvements */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>15. Lessons Learned</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {cs.lessons_learned.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>16. Future Roadmap</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {cs.future_improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-blue-500 font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
