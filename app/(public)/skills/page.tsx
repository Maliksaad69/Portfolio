import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getSkills, getSkillCategories, getProjects } from "@/lib/data/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/motion/MotionComponents";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Skills & Repertoire — Malik Saad Awan",
  description:
    "Comprehensive overview of technical capabilities across AI engineering, LLM systems, cloud infrastructure, and full-stack software development.",
};

export default async function SkillsPage() {
  const categories = await getSkillCategories();
  const allSkills = await getSkills();
  const projects = await getProjects();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <FadeIn direction="up">
          <SectionHeader
            badge="Technical Competencies"
            title="Skills & Engineering Repertoire"
            description="A structured breakdown of technologies, frameworks, and architectural principles I use in production. Grouped by discipline with contextual descriptions rather than arbitrary percentage bars."
          />
        </FadeIn>

        <div className="space-y-14">
          {categories.map((category) => {
            const categorySkills = allSkills.filter(
              (s) => s.category_id === category.id
            );

            if (categorySkills.length === 0) return null;

            return (
              <section key={category.id} className="space-y-6">
                <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                    {category.name}
                  </h2>
                  {category.description && (
                    <span className="text-xs font-mono text-slate-500">
                      {category.description}
                    </span>
                  )}
                </div>

                <StaggerContainer
                  staggerDelay={0.06}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {categorySkills.map((skill) => {
                    const matchingProjects = projects.filter((p) =>
                      p.technologies.some(
                        (t) =>
                          t.toLowerCase().includes(skill.name.toLowerCase()) ||
                          skill.name.toLowerCase().includes(t.toLowerCase())
                      )
                    );

                    return (
                      <StaggerItem key={skill.id}>
                        <SpotlightCard
                          spotlightColor="rgba(59, 130, 246, 0.1)"
                          className="p-6 h-full flex flex-col justify-between space-y-4 group"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-base text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                                {skill.name}
                              </h3>
                              {skill.featured && (
                                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  Featured
                                </span>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                              {skill.description}
                            </p>
                          </div>

                          {/* Associated Projects if any */}
                          {matchingProjects.length > 0 && (
                            <div className="pt-3 border-t border-slate-100 space-y-1.5">
                              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                                Applied In:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {matchingProjects.slice(0, 2).map((mp) => (
                                  <Link
                                    key={mp.id}
                                    href={`/projects/${mp.slug}`}
                                    className="text-[11px] font-medium text-slate-700 hover:text-blue-600 truncate max-w-[200px] flex items-center gap-1 group/link"
                                  >
                                    <span>{mp.title}</span>
                                    <ArrowRight className="w-2.5 h-2.5 shrink-0 group-hover/link:translate-x-0.5 transition-transform" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </SpotlightCard>
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
