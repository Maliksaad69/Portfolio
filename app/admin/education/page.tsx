import React from "react";
import { getEducation } from "@/lib/data/store";
import { Card } from "@/components/ui/Card";
import { GraduationCap } from "lucide-react";

export default async function AdminEducationPage() {
  const education = await getEducation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Academic Foundations & Education
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review and manage degrees, institutions, and core fields of study.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {education.map((edu) => (
          <Card key={edu.id} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {edu.degree} in {edu.field_of_study}
                  </h3>
                  <div className="text-xs text-blue-700 font-medium">
                    {edu.institution}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                {edu.start_date} — {edu.end_date}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-11">
              {edu.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
