import React from "react";
import type { Metadata } from "next";
import { getProjects, getSkillCategories } from "@/lib/data/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectFilters } from "@/components/projects/ProjectFilters";

export const metadata: Metadata = {
  title: "Projects — Malik Saad Awan | AI & DevOps Engineer",
  description:
    "Comprehensive directory of production AI systems, cloud infrastructure architectures, and full-stack applications engineered by Malik Saad Awan.",
};

export default async function ProjectsPage() {
  const projects = await getProjects({ publishedOnly: true });
  const categories = await getSkillCategories();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          badge="Engineering Portfolio"
          title="Engineered Systems & Projects"
          description="Explore real-world applications spanning autonomous multi-agent systems, high-throughput RAG search engines, Kubernetes GitOps infrastructure, and full-stack software products."
        />

        <ProjectFilters
          initialProjects={projects}
          categories={categories}
        />
      </div>
    </div>
  );
}
