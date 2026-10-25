"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CaseStudy } from "@/types";
import { Edit2, Trash2, Eye, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CaseStudyListTableProps {
  initialCaseStudies: CaseStudy[];
}

export function CaseStudyListTable({ initialCaseStudies }: CaseStudyListTableProps) {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = caseStudies.filter((cs) =>
    cs.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete case study "${title}"?`)) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/case-studies?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      }
    } catch {
      alert("Failed to delete case study");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search case studies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white"
          />
        </div>

        <Button href="/admin/case-studies/new" size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
          <Plus className="w-4 h-4" />
          <span>Write Case Study</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3.5">Title & Slug</th>
              <th className="px-5 py-3.5">Summary</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((cs) => (
              <tr key={cs.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-5 py-4">
                  <div className="font-bold text-slate-900 text-sm">
                    {cs.title}
                  </div>
                  <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                    /case-studies/{cs.slug}
                  </div>
                </td>
                <td className="px-5 py-4 max-w-xs text-slate-600 line-clamp-2">
                  {cs.summary}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      cs.published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {cs.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      title="View Public Page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/case-studies/${cs.id}/edit`}
                      className="p-1.5 rounded-lg border border-slate-200 text-blue-600 hover:bg-blue-50"
                      title="Edit Case Study"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(cs.id, cs.title)}
                      disabled={deletingId === cs.id}
                      className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                      title="Delete Case Study"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
