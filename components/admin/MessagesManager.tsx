"use client";

import React, { useState } from "react";
import { ContactSubmission } from "@/types";
import { Check, Archive, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MessagesManagerProps {
  initialSubmissions: ContactSubmission[];
}

export function MessagesManager({ initialSubmissions }: MessagesManagerProps) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSub, setSelectedSub] = useState<ContactSubmission | null>(
    submissions[0] || null
  );

  const handleStatusChange = async (id: string, status: "unread" | "reviewed" | "archived") => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status } : s))
        );
        if (selectedSub?.id === id) {
          setSelectedSub((prev) => (prev ? { ...prev, status } : null));
        }
      }
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* List */}
      <div className="lg:col-span-5 space-y-3">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSub(sub)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedSub?.id === sub.id
                ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-900">{sub.name}</span>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                  sub.status === "unread"
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {sub.status}
              </span>
            </div>
            <div className="text-xs font-medium text-slate-800 truncate">
              {sub.subject}
            </div>
            <p className="text-xs text-slate-500 truncate mt-1">
              {sub.message}
            </p>
          </div>
        ))}
      </div>

      {/* Detail Pane */}
      <div className="lg:col-span-7">
        {selectedSub ? (
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  {selectedSub.subject}
                </h3>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                  <span>From: <strong>{selectedSub.name}</strong> ({selectedSub.email})</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedSub.id, "reviewed")}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark Reviewed</span>
                </button>
                <button
                  onClick={() => handleStatusChange(selectedSub.id, "archived")}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive</span>
                </button>
              </div>
            </div>

            {selectedSub.project_type && (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-mono">
                Project Category: <strong>{selectedSub.project_type}</strong>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {selectedSub.message}
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <span className="text-xs font-mono text-slate-400">
                Received: {formatDate(selectedSub.created_at)}
              </span>
              <a
                href={`mailto:${selectedSub.email}?subject=Re: ${encodeURIComponent(selectedSub.subject)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
              >
                <span>Reply directly via email</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 text-slate-400 text-sm">
            Select a message to view its full details
          </div>
        )}
      </div>
    </div>
  );
}
