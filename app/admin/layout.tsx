import React, { Suspense } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { PulseBeacon } from "@/components/motion/MotionComponents";
import { ExternalLink, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard — Malik Saad Awan Portfolio CMS",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Suspense fallback={<aside className="w-64 bg-slate-950 shrink-0 min-h-screen" />}>
        <AdminSidebar />
      </Suspense>

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Executive Admin Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 sm:px-10 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              CMS Console
            </span>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Production Mode</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800">
              <PulseBeacon color="bg-emerald-600" pulseColor="bg-emerald-400" size="w-1.5 h-1.5" />
              <span>Systems Operational</span>
            </div>

            <div className="text-xs font-mono text-slate-500 hidden md:block">
              awansaad6927@gmail.com
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
