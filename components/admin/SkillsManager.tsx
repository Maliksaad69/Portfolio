"use client";

import React, { useState } from "react";
import { Skill, SkillCategory } from "@/types";
import { Plus, Edit2, Trash2, Save, X, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SkillsManagerProps {
  initialSkills: Skill[];
  categories: SkillCategory[];
}

export function SkillsManager({ initialSkills, categories }: SkillsManagerProps) {
  const [skills, setSkills] = useState(initialSkills);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [form, setForm] = useState<Partial<Skill>>({
    name: "",
    category_id: categories[0]?.id || "",
    description: "",
    featured: false,
  });

  const filtered = skills.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setIsCreating(false);
    setForm({ ...skill });
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setForm({
      name: "",
      category_id: categories[0]?.id || "",
      description: "",
      featured: false,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId || undefined }),
      });
      const data = await res.json();
      if (res.ok) {
        if (editingId) {
          setSkills((prev) =>
            prev.map((s) => (s.id === editingId ? data.skill : s))
          );
        } else {
          setSkills((prev) => [...prev, data.skill]);
        }
        cancelEdit();
      }
    } catch {
      alert("Failed to save skill");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
      }
    } catch {
      alert("Failed to delete skill");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white"
          />
        </div>

        {!isCreating && !editingId && (
          <Button onClick={startCreate} size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </Button>
        )}
      </div>

      {(isCreating || editingId) && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-blue-200 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">
              {editingId ? "Edit Skill" : "New Technical Skill"}
            </h3>
            <button type="button" onClick={cancelEdit} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Skill Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
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

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-800">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span>Featured Skill</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <Button type="submit" size="sm" className="bg-blue-600 text-white">
              <Save className="w-3.5 h-3.5" />
              <span>Save Skill</span>
            </Button>
          </div>
        </form>
      )}

      {/* Skills Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3.5">Skill Name</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Description</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((skill) => {
              const cat = categories.find((c) => c.id === skill.category_id);
              return (
                <tr key={skill.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <span>{skill.name}</span>
                    {skill.featured && (
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 font-mono text-[11px]">
                    {cat?.name || "General"}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 max-w-sm truncate">
                    {skill.description}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(skill)}
                        className="p-1.5 rounded-lg border border-slate-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id, skill.name)}
                        className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
