import React from "react";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Media & Architecture Diagram Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Store, copy URLs, and reuse screenshots, diagrams, and project banners.
        </p>
      </div>

      <MediaLibrary />
    </div>
  );
}
