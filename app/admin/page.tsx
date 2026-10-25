import React from "react";
import Link from "next/link";
import {
  getAdminDashboardStats,
  getAllAdminProjects,
  getContactSubmissions,
} from "@/lib/data/store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  FolderGit2,
  BookOpen,
  Briefcase,
  Wrench,
  Mail,
  Plus,
  ArrowUpRight,
  Database,
  ShieldCheck,
  Server,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();
  const projects = await getAllAdminProjects();
  const submissions = await getContactSubmissions();

  const metricCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      subtext: `${stats.publishedProjects} published • ${stats.draftProjects} drafts`,
      icon: FolderGit2,
      href: "/admin/projects",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Case Studies",
      value: stats.totalCaseStudies,
      subtext: "In-depth engineering analyses",
      icon: BookOpen,
      href: "/admin/case-studies",
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      title: "Work Experiences",
      value: stats.totalExperiences,
      subtext: "Chronological career history",
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      title: "Active Skills",
      value: stats.totalSkills,
      subtext: "Categorized competencies",
      icon: Wrench,
      href: "/admin/skills",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Inquiries & Leads",
      value: submissions.length,
      subtext: `${stats.unreadMessages} unread message${stats.unreadMessages === 1 ? "" : "s"}`,
      icon: Mail,
      href: "/admin/messages",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Executive Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-medium">
              Administrator
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back, Malik Saad. Manage your portfolio projects, engineering case studies, and incoming inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button href="/admin/projects/new" size="sm" className="bg-slate-900 shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Button>
          <Button href="/admin/case-studies/new" variant="outline" size="sm">
            <Plus className="w-3.5 h-3.5" />
            <span>New Case Study</span>
          </Button>
        </div>
      </div>

      {/* System Infrastructure Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Database Architecture</div>
            <div className="text-xs font-bold text-slate-800">PostgreSQL (15 Tables)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Framework Runtime</div>
            <div className="text-xs font-bold text-slate-800">Next.js 16 (App Router)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Administrator Role</div>
            <div className="text-xs font-bold text-slate-800 truncate max-w-[150px]">awansaad6927@gmail.com</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Service Health</div>
            <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metricCards.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.title} href={m.href} className="group">
              <Card hoverEffect className="p-5 space-y-3 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">
                    {m.title}
                  </span>
                  <div className={`p-2 rounded-lg border ${m.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black font-mono tracking-tight text-slate-900">
                    {m.value}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {m.subtext}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Two-Column Recent Activity & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Projects List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-950 tracking-tight">
              Production Portfolio Systems
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 truncate">
                      {p.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                        p.published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {p.published ? "Live" : "Draft"}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200/60 hidden sm:inline">
                      {p.category_name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate max-w-md">
                    {p.short_description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/projects/${p.id}/edit`}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-950 tracking-tight">
              Recent Inquiries & Leads
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View inbox</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {submissions.slice(0, 5).map((sub) => (
              <div
                key={sub.id}
                className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-xs space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    {sub.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      sub.status === "unread"
                        ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-800">
                  {sub.subject}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {sub.message}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{sub.project_type || "General Inquiry"}</span>
                  <a
                    href={`mailto:${sub.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {sub.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
