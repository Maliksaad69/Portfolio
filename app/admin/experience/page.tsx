import React from "react";
import { getExperiences } from "@/lib/data/store";
import { ExperienceManager } from "@/components/admin/ExperienceManager";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences({ publishedOnly: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Experience Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Chronological roles, responsibilities, and quantified production achievements.
        </p>
      </div>

      <ExperienceManager initialExperiences={experiences} />
    </div>
  );
}
