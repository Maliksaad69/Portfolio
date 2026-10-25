import React from "react";
import { getSkillCategories } from "@/lib/data/store";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function AdminNewProjectPage() {
  const categories = await getSkillCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Create New Project
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Add an engineered system with architecture diagrams, challenges, and measured outcomes.
        </p>
      </div>

      <ProjectForm categories={categories} />
    </div>
  );
}
