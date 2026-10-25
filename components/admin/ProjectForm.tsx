"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Project, SkillCategory, DeploymentStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, ArrowLeft, Save, Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";

interface ProjectFormProps {
  initialData?: Project | null;
  categories: SkillCategory[];
}

export function ProjectForm({ initialData, categories }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState<Partial<Project>>({
    id: initialData?.id,
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    short_description: initialData?.short_description || "",
    overview: initialData?.overview || "",
    problem_statement: initialData?.problem_statement || "",
    solution: initialData?.solution || "",
    category_id: initialData?.category_id || (categories[0]?.id ?? "cat-ai"),
    category_name: initialData?.category_name || (categories[0]?.name ?? "AI & Machine Learning"),
    role: initialData?.role || "Lead AI & DevOps Engineer",
    team_size: initialData?.team_size || "Solo Engineer",
    duration: initialData?.duration || "3 Months",
    status: initialData?.status || "Completed",
    deployment_status: initialData?.deployment_status || "Live",
    live_url: initialData?.live_url || "",
    github_url: initialData?.github_url || "",
    documentation_url: initialData?.documentation_url || "",
    thumbnail_url: initialData?.thumbnail_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    featured: initialData?.featured || false,
    published: initialData?.published !== undefined ? initialData.published : true,
    technologies: initialData?.technologies || ["Python", "FastAPI", "Docker", "AWS", "Next.js"],
    contributions: initialData?.contributions || [
      "Architected the system end-to-end.",
      "Built containerized microservices and automated CI/CD pipeline.",
    ],
    challenges: initialData?.challenges || [
      {
        id: "ch-1",
        title: "Latency Optimization Under Concurrent Requests",
        difficulty: "Un-cached model inference caused response spikes.",
        approach: "Implemented semantic caching in Redis with cosine similarity thresholding.",
        solution: "Dropped P95 latency by 85%.",
        display_order: 1,
      },
    ],
    outcomes: initialData?.outcomes || [
      {
        id: "out-1",
        title: "Latency Reduction",
        description: "Achieved sub-50ms query responses across 500k documents.",
        metric_value: "38ms",
        metric_label: "P95 Query Latency",
        outcome_type: "quantitative",
        display_order: 1,
      },
    ],
  });

  const [techInput, setTechInput] = useState(formData.technologies?.join(", ") || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.id ? prev.slug : slugify(title),
    }));
  };

  const handleAddChallenge = () => {
    setFormData((prev) => ({
      ...prev,
      challenges: [
        ...(prev.challenges || []),
        {
          id: `ch-${Date.now()}`,
          title: "",
          difficulty: "",
          approach: "",
          solution: "",
          display_order: (prev.challenges?.length || 0) + 1,
        },
      ],
    }));
  };

  const handleRemoveChallenge = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges?.filter((_, i) => i !== index),
    }));
  };

  const handleAddOutcome = () => {
    setFormData((prev) => ({
      ...prev,
      outcomes: [
        ...(prev.outcomes || []),
        {
          id: `out-${Date.now()}`,
          title: "",
          description: "",
          metric_value: "",
          metric_label: "",
          outcome_type: "quantitative",
          display_order: (prev.outcomes?.length || 0) + 1,
        },
      ],
    }));
  };

  const handleRemoveOutcome = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      outcomes: prev.outcomes?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const parsedTechs = techInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...formData,
      technologies: parsedTechs,
    };

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save project");
      }

      setMessage({ type: "success", text: "Project saved successfully!" });
      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred while saving.";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center gap-3">
          <Button
            type="submit"
            disabled={loading}
            size="md"
            className="bg-blue-600 hover:bg-blue-500 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Project</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-medium ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Section 1: Basic Information */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          1. General Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="e.g. Autonomous Multi-Agent Platform"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => {
                const cat = categories.find((c) => c.id === e.target.value);
                setFormData({
                  ...formData,
                  category_id: e.target.value,
                  category_name: cat?.name || formData.category_name,
                });
              }}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
              Deployment Status
            </label>
            <select
              value={formData.deployment_status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, deployment_status: e.target.value as DeploymentStatus })
              }
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Live">Live</option>
              <option value="Private Deployment">Private Deployment</option>
              <option value="Development">Development</option>
              <option value="Archived">Archived</option>
              <option value="Not Deployed">Not Deployed</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
              My Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span className="text-xs font-medium text-slate-800">
              Feature on Homepage
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span className="text-xs font-medium text-slate-800">
              Published (Publicly Visible)
            </span>
          </label>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
            Short Description (Card Summary) *
          </label>
          <textarea
            required
            rows={2}
            value={formData.short_description}
            onChange={(e) =>
              setFormData({ ...formData, short_description: e.target.value })
            }
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
            Thumbnail Image URL *
          </label>
          <input
            type="url"
            required
            value={formData.thumbnail_url}
            onChange={(e) =>
              setFormData({ ...formData, thumbnail_url: e.target.value })
            }
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Section 2: Narrative - Problem & Solution */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          2. Problem & Solution Narrative
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
            The Problem Statement *
          </label>
          <textarea
            required
            rows={4}
            value={formData.problem_statement}
            onChange={(e) =>
              setFormData({ ...formData, problem_statement: e.target.value })
            }
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
            The Engineered Solution *
          </label>
          <textarea
            required
            rows={4}
            value={formData.solution}
            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Section 3: Tech Stack & Links */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          3. Tech Stack & Deployment Links
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
            Technologies (Comma Separated)
          </label>
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Python, LangGraph, AWS EKS, Terraform, Next.js"
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
              Live URL (Optional)
            </label>
            <input
              type="url"
              value={formData.live_url || ""}
              onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block">
              GitHub URL (Optional)
            </label>
            <input
              type="url"
              value={formData.github_url || ""}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Engineering Challenges */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base text-slate-950">
            4. Engineering Challenges
          </h3>
          <Button
            type="button"
            onClick={handleAddChallenge}
            variant="outline"
            size="sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Challenge</span>
          </Button>
        </div>

        <div className="space-y-6">
          {formData.challenges?.map((challenge, idx) => (
            <div
              key={challenge.id || idx}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-600">
                  Challenge #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveChallenge(idx)}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-700 block">
                  Challenge Title
                </label>
                <input
                  type="text"
                  value={challenge.title}
                  onChange={(e) => {
                    const list = [...(formData.challenges || [])];
                    list[idx].title = e.target.value;
                    setFormData({ ...formData, challenges: list });
                  }}
                  className="w-full px-3 py-1.5 text-sm rounded border border-slate-200 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-700 block">
                    Why It Was Difficult
                  </label>
                  <textarea
                    rows={3}
                    value={challenge.difficulty}
                    onChange={(e) => {
                      const list = [...(formData.challenges || [])];
                      list[idx].difficulty = e.target.value;
                      setFormData({ ...formData, challenges: list });
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-700 block">
                    Approach
                  </label>
                  <textarea
                    rows={3}
                    value={challenge.approach}
                    onChange={(e) => {
                      const list = [...(formData.challenges || [])];
                      list[idx].approach = e.target.value;
                      setFormData({ ...formData, challenges: list });
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-700 block">
                    Solution Implemented
                  </label>
                  <textarea
                    rows={3}
                    value={challenge.solution}
                    onChange={(e) => {
                      const list = [...(formData.challenges || [])];
                      list[idx].solution = e.target.value;
                      setFormData({ ...formData, challenges: list });
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Measurable Outcomes */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base text-slate-950">
            5. Outcomes & Metrics
          </h3>
          <Button
            type="button"
            onClick={handleAddOutcome}
            variant="outline"
            size="sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Outcome</span>
          </Button>
        </div>

        <div className="space-y-4">
          {formData.outcomes?.map((outcome, idx) => (
            <div
              key={outcome.id || idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-600">
                  Outcome #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveOutcome(idx)}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-700 block">
                    Title
                  </label>
                  <input
                    type="text"
                    value={outcome.title}
                    onChange={(e) => {
                      const list = [...(formData.outcomes || [])];
                      list[idx].title = e.target.value;
                      setFormData({ ...formData, outcomes: list });
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-700 block">
                    Metric Value (e.g. 92.4% or -68%)
                  </label>
                  <input
                    type="text"
                    value={outcome.metric_value || ""}
                    onChange={(e) => {
                      const list = [...(formData.outcomes || [])];
                      list[idx].metric_value = e.target.value;
                      setFormData({ ...formData, outcomes: list });
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-700 block">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    value={outcome.metric_label || ""}
                    onChange={(e) => {
                      const list = [...(formData.outcomes || [])];
                      list[idx].metric_label = e.target.value;
                      setFormData({ ...formData, outcomes: list });
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-700 block">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={outcome.description}
                  onChange={(e) => {
                    const list = [...(formData.outcomes || [])];
                    list[idx].description = e.target.value;
                    setFormData({ ...formData, outcomes: list });
                  }}
                  className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="bg-blue-600 hover:bg-blue-500 text-white"
        >
          {loading ? "Saving Project..." : "Save and Commit Project"}
        </Button>
      </div>
    </form>
  );
}
