"use client";

import React, { useState } from "react";
import { Upload, Copy, Check, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  created_at: string;
}

const initialMedia: MediaItem[] = [
  {
    id: "med-1",
    name: "Multi-Agent Architecture Overview",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    size: "1.2 MB",
    created_at: "2026-10-20",
  },
  {
    id: "med-2",
    name: "Kubernetes Topology Diagram",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    size: "850 KB",
    created_at: "2026-10-21",
  },
  {
    id: "med-3",
    name: "RAG Gateway Ingestion Benchmark",
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    size: "940 KB",
    created_at: "2026-10-22",
  },
  {
    id: "med-4",
    name: "GitOps Continuous Delivery Pipeline",
    url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200",
    size: "1.4 MB",
    created_at: "2026-10-23",
  },
  {
    id: "med-5",
    name: "LLM Observability Streaming Dashboard",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    size: "720 KB",
    created_at: "2026-10-24",
  },
];

export function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = media.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl || !uploadName) return;

    const newItem: MediaItem = {
      id: `med-${Date.now()}`,
      name: uploadName,
      url: uploadUrl,
      size: "External",
      created_at: "2026-10-24",
    };

    setMedia([newItem, ...media]);
    setUploadUrl("");
    setUploadName("");
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white"
          />
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          size="sm"
          className="bg-blue-600 hover:bg-blue-500 text-white"
        >
          <Upload className="w-4 h-4" />
          <span>Add Media Asset</span>
        </Button>
      </div>

      {showAddModal && (
        <form onSubmit={handleAddMedia} className="p-6 rounded-2xl bg-white border border-blue-200 shadow-md space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Register Media Asset / Image URL
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Asset Name</label>
              <input
                type="text"
                required
                placeholder="Architecture Diagram v2"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase text-slate-700">Image / Asset URL</label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded border border-slate-200"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 text-xs border rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <Button type="submit" size="sm" className="bg-blue-600 text-white">
              Add to Library
            </Button>
          </div>
        </form>
      )}

      {/* Grid of media items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative border-b border-slate-100">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <div className="font-semibold text-xs text-slate-900 truncate">
                  {item.name}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {item.size} • {item.created_at}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
              <button
                onClick={() => copyUrl(item.url, item.id)}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 hover:text-blue-600"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Delete"
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
