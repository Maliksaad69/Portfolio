import React from "react";
import { notFound } from "next/navigation";
import { getProjectById, getSkillCategories, getAllAdminProjects } from "@/lib/data/store";
import { Project } from "@/types";
import { ProjectForm } from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllAdminProjects();
  return projects.map((p: Project) => ({ id: p.id }));
}

export default async function AdminEditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);
  const categories = await getSkillCategories();

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Edit Project: {project.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update system architecture, challenges, metrics, or publication status.
        </p>
      </div>

      <ProjectForm initialData={project} categories={categories} />
    </div>
  );
}
