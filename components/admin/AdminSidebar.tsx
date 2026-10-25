"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Briefcase,
  Wrench,
  GraduationCap,
  Image as ImageIcon,
  Settings,
  Mail,
  ExternalLink,
  LogOut,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PulseBeacon } from "@/components/motion/MotionComponents";

const contentNav = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Case Studies", href: "/admin/case-studies", icon: BookOpen },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
];

const systemNav = [
  { name: "Messages & Leads", href: "/admin/messages", icon: Mail },
  { name: "Media Assets", href: "/admin/media", icon: ImageIcon },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show the full admin sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_authenticated");
      sessionStorage.removeItem("admin_user");
      document.cookie = "admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col justify-between shrink-0 border-r border-slate-800/80 min-h-screen">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-850 border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-600/30">
            M
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>Admin Console</span>
              <Shield className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-[11px] font-mono text-slate-400 truncate">
              Malik Saad Awan CMS
            </div>
          </div>
        </div>

        {/* Content Navigation Section */}
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-3 block mb-1.5">
            Content Architecture
          </span>
          <nav className="space-y-0.5">
            {contentNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System & Telemetry Navigation */}
        <div className="space-y-1 pt-2 border-t border-slate-900">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-3 block mb-1.5">
            System & Operations
          </span>
          <nav className="space-y-0.5">
            {systemNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Profile & Actions */}
      <div className="p-4 border-t border-slate-850 border-slate-800/80 space-y-3 bg-slate-950/60">
        {/* Administrator Profile Card */}
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
            <img
              src="/saad.png"
              alt="Malik Saad Awan"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
              <span>Malik Saad</span>
              <PulseBeacon color="bg-emerald-500" pulseColor="bg-emerald-400" size="w-1.5 h-1.5" />
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate">
              awansaad6927@gmail.com
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 pt-1">
          <Link
            href="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors border border-slate-850 border-slate-800/50"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors border border-rose-900/40"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
