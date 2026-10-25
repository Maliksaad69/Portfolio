import React from "react";
import { notFound } from "next/navigation";
import { getCaseStudyById, getAllAdminProjects, getAllAdminCaseStudies } from "@/lib/data/store";
import { CaseStudy } from "@/types";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";

interface EditCaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const caseStudies = await getAllAdminCaseStudies();
  return caseStudies.map((cs: CaseStudy) => ({ id: cs.id }));
}

export default async function AdminEditCaseStudyPage({ params }: EditCaseStudyPageProps) {
  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);
  const projects = await getAllAdminProjects();

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Edit Case Study: {caseStudy.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Modify architectural details, technical decisions, or results.
        </p>
      </div>

      <CaseStudyForm initialData={caseStudy} projects={projects} />
    </div>
  );
}
