import React from "react";
import { getProfile, getSiteSettings } from "@/lib/data/store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const profile = await getProfile();
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Global Site Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize website identity, hero typography, contact endpoints, and biographical narrative.
        </p>
      </div>

      <SettingsForm initialProfile={profile} initialSettings={settings} />
    </div>
  );
}
