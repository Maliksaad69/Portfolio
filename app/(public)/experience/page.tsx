import React from "react";
import type { Metadata } from "next";
import { getExperiences, getEducation } from "@/lib/data/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard, FadeIn } from "@/components/motion/MotionComponents";
import { GraduationCap } from "lucide-react";
import { ExperienceTree } from "@/components/experience/ExperienceTree";

export const metadata: Metadata = {
  title: "Professional Experience — Malik Saad Awan",
  description:
    "Chronological engineering history, technical responsibilities, and quantified production achievements of Malik Saad Awan in AI, DevOps, and Full-Stack Web Development.",
};

export default async function ExperiencePage() {
  const experiences = await getExperiences({ publishedOnly: true });
  const education = await getEducation();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <FadeIn direction="up">
          <SectionHeader
            badge="Engineering Trajectory"
            title="Professional Experience Tree"
            description="An organic branching record of designing intelligent AI systems, scaling cloud Kubernetes infrastructure, and shipping modern full-stack web applications."
          />
        </FadeIn>

        {/* Tree-structured experience with Show More for > 4 items */}
        <ExperienceTree experiences={experiences} initialDisplayCount={4} />

        {/* Education Section */}
        <section className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Academic Background
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {education.map((edu) => (
              <SpotlightCard
                key={edu.id}
                spotlightColor="rgba(59, 130, 246, 0.06)"
                className="p-6 sm:p-8 space-y-3 bg-white border-2 border-slate-200/90 rounded-2xl shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                      {edu.degree} in {edu.field_of_study}
                    </h3>
                    <div className="text-sm font-bold text-blue-700 mt-0.5">
                      {edu.institution}
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 self-start sm:self-auto">
                    {edu.start_date} — {edu.end_date}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {edu.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
