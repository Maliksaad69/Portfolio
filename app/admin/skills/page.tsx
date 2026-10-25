import React from "react";
import { getSkills, getSkillCategories } from "@/lib/data/store";
import { SkillsManager } from "@/components/admin/SkillsManager";

export default async function AdminSkillsPage() {
  const skills = await getSkills();
  const categories = await getSkillCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Skills Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage technical capabilities, categorizations, featured tags, and descriptions.
        </p>
      </div>

      <SkillsManager initialSkills={skills} categories={categories} />
    </div>
  );
}
