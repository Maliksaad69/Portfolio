import React from "react";
import { getAllAdminProjects } from "@/lib/data/store";
import { ProjectListTable } from "@/components/admin/ProjectListTable";

export default async function AdminProjectsPage() {
  const projects = await getAllAdminProjects();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Projects Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Create, edit, feature, and manage detailed engineering portfolio systems.
        </p>
      </div>

      <ProjectListTable initialProjects={projects} />
    </div>
  );
}
