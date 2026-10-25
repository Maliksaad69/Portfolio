import React from "react";
import { getAllAdminCaseStudies } from "@/lib/data/store";
import { CaseStudyListTable } from "@/components/admin/CaseStudyListTable";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await getAllAdminCaseStudies();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Case Studies Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Publish, edit, and maintain detailed technical analyses with 16-point retrospective breakdowns.
        </p>
      </div>

      <CaseStudyListTable initialCaseStudies={caseStudies} />
    </div>
  );
}
