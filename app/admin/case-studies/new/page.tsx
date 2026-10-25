import React from "react";
import { getAllAdminProjects } from "@/lib/data/store";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";

export default async function AdminNewCaseStudyPage() {
  const projects = await getAllAdminProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Create Case Study
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Author an in-depth retrospective with goals, trade-offs, architecture, and verification.
        </p>
      </div>

      <CaseStudyForm projects={projects} />
    </div>
  );
}
