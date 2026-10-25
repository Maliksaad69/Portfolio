"use client";

import React, { useState } from "react";
import { Experience } from "@/types";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ExperienceManagerProps {
  initialExperiences: Experience[];
}

export function ExperienceManager({ initialExperiences }: ExperienceManagerProps) {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState<Partial<Experience>>({
    company: "",
    job_title: "",
    employment_type: "Full-Time",
    location: "Remote",
    start_date: "2026-01-01",
    is_current: false,
    description: "",
    responsibilities: [],
    achievements: [],
    technologies: [],
  });

  const [respInput, setRespInput] = useState("");
  const [achInput, setAchInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const startEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setIsCreating(false);
    setForm({ ...exp });
    setRespInput(exp.responsibilities?.join("\n") || "");
    setAchInput(exp.achievements?.join("\n") || "");
    setTechInput(exp.technologies?.join(", ") || "");
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setForm({
      company: "",
      job_title: "",
      employment_type: "Full-Time",
      location: "Remote",
      start_date: "2026-01-01",
      is_current: false,
      description: "",
      responsibilities: [],
      achievements: [],
      technologies: [],
    });
    setRespInput("");
    setAchInput("");
    setTechInput("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      id: editingId || undefined,
      responsibilities: respInput.split("\n").map((s) => s.trim()).filter(Boolean),
      achievements: achInput.split("\n").map((s) => s.trim()).filter(Boolean),
      technologies: techInput.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        if (editingId) {
          setExperiences((prev) =>
            prev.map((item) => (item.id === editingId ? data.experience : item))
          );
        } else {
          setExperiences((prev) => [data.experience, ...prev]);
        }
        cancelEdit();
      }
    } catch {
      alert("Failed to save experience");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete experience "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExperiences((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      alert("Failed to delete experience");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-slate-900">
          Career Timeline Entries ({experiences.length})
        </h2>
        {!isCreating && !editingId && (
          <Button onClick={startCreate} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </Button>
        )}
      </div>

      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-blue-200 shadow-md space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">
              {editingId ? "Edit Position" : "Add New Position"}
            </h3>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Company *</label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Role Title *</label>
              <input
                type="text"
                required
                value={form.job_title}
                onChange={(e) => setForm({ ...form, job_title: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Start Date</label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">End Date</label>
              <input
                type="date"
                disabled={form.is_current}
                value={form.end_date || ""}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 disabled:opacity-40"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={form.is_current}
                  onChange={(e) => setForm({ ...form, is_current: e.target.checked, end_date: null })}
                  className="rounded text-blue-600"
                />
                <span>Current Role</span>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-700">Description</label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Responsibilities (One Per Line)</label>
              <textarea
                rows={3}
                value={respInput}
                onChange={(e) => setRespInput(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono rounded border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Achievements (One Per Line)</label>
              <textarea
                rows={3}
                value={achInput}
                onChange={(e) => setAchInput(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono rounded border border-slate-200"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono uppercase text-slate-700">Technologies (Comma Separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <Button type="submit" size="sm" className="bg-blue-600 text-white">
              <Save className="w-3.5 h-3.5" />
              <span>Save Entry</span>
            </Button>
          </div>
        </form>
      )}

      {/* Experience list */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{exp.job_title}</span>
                <span className="text-slate-400 font-mono text-xs">•</span>
                <span className="font-semibold text-blue-700 text-xs">{exp.company}</span>
                {exp.is_current && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Current
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {exp.start_date} — {exp.is_current ? "Present" : exp.end_date} • {exp.location}
              </div>
              <p className="text-xs text-slate-600 line-clamp-1 max-w-xl mt-1">
                {exp.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => startEdit(exp)}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(exp.id, exp.company)}
                className="p-2 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
