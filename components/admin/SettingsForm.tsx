"use client";

import React, { useState } from "react";
import { Profile, SiteSettings } from "@/types";
import { Button } from "@/components/ui/Button";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

interface SettingsFormProps {
  initialProfile: Profile;
  initialSettings: SiteSettings;
}

export function SettingsForm({
  initialProfile,
  initialSettings,
}: SettingsFormProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, settings }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Profile & Global Site Settings
          </h2>
          <p className="text-xs text-slate-500">
            Control branding, headline copy, contact information, and biography.
          </p>
        </div>

        <Button type="submit" disabled={loading} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save All Settings</span>
        </Button>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>All settings updated successfully!</span>
        </div>
      )}

      {/* Hero Content Settings */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-950 border-b border-slate-100 pb-3">
          Homepage Hero & Messaging
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700">Hero Headline</label>
          <input
            type="text"
            value={settings.hero_headline}
            onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700">Hero Subheadline</label>
          <textarea
            rows={2}
            value={settings.hero_subheadline}
            onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700">Hero Concise Intro</label>
          <textarea
            rows={2}
            value={settings.hero_intro}
            onChange={(e) => setSettings({ ...settings, hero_intro: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
          />
        </div>
      </div>

      {/* Personal Profile Details */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-950 border-b border-slate-100 pb-3">
          Personal Information & Biography
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">Full Name</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">Professional Title</label>
            <input
              type="text"
              value={profile.professional_title}
              onChange={(e) => setProfile({ ...profile, professional_title: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700">About Narrative</label>
          <textarea
            rows={6}
            value={profile.about_narrative}
            onChange={(e) => setProfile({ ...profile, about_narrative: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">Avatar Image URL</label>
            <input
              type="url"
              value={profile.avatar_url}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">Resume URL</label>
            <input
              type="text"
              value={profile.resume_url}
              onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">GitHub Profile URL</label>
            <input
              type="url"
              value={profile.github_url}
              onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700">LinkedIn Profile URL</label>
            <input
              type="url"
              value={profile.linkedin_url}
              onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded border border-slate-200 bg-slate-50"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
