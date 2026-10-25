"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CaseStudy, Project } from "@/types";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";

interface CaseStudyFormProps {
  initialData?: CaseStudy | null;
  projects: Project[];
}

export function CaseStudyForm({ initialData, projects }: CaseStudyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState<Partial<CaseStudy>>({
    id: initialData?.id,
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    summary: initialData?.summary || "",
    featured_image: initialData?.featured_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    project_id: initialData?.project_id || (projects[0]?.id || ""),
    executive_summary: initialData?.executive_summary || "",
    background: initialData?.background || "",
    problem_statement: initialData?.problem_statement || "",
    goals: initialData?.goals || ["Achieve >90% task completion rate", "Enforce transactional checkpointing"],
    constraints: initialData?.constraints || ["Human approval required before destructive actions"],
    requirements: initialData?.requirements || ["State-machine graph execution", "Distributed telemetry"],
    architecture_details: initialData?.architecture_details || "",
    implementation_details: initialData?.implementation_details || "",
    testing_and_validation: initialData?.testing_and_validation || "Validated across synthetic test suites.",
    deployment_strategy: initialData?.deployment_strategy || "Canary rollouts via ArgoCD and Istio.",
    results: initialData?.results || ["92.4% task completion", "68% token reduction"],
    lessons_learned: initialData?.lessons_learned || ["Fewer well-documented tools produce higher reliability."],
    future_improvements: initialData?.future_improvements || ["Incorporate small quantized local models."],
    published: initialData?.published !== undefined ? initialData.published : true,
    technical_decisions: initialData?.technical_decisions || [
      {
        decision: "LangGraph state machine",
        justification: "Cyclical execution with checkpointing",
        alternative_considered: "Custom while-loops",
      },
    ],
    challenges_and_solutions: initialData?.challenges_and_solutions || [
      {
        challenge: "Sub-agents stuck in loops",
        solution: "Epoch counters forcing fallback",
      },
    ],
  });

  const [goalsInput, setGoalsInput] = useState(formData.goals?.join("\n") || "");
  const [constraintsInput, setConstraintsInput] = useState(formData.constraints?.join("\n") || "");
  const [requirementsInput, setRequirementsInput] = useState(formData.requirements?.join("\n") || "");
  const [resultsInput, setResultsInput] = useState(formData.results?.join("\n") || "");
  const [lessonsInput, setLessonsInput] = useState(formData.lessons_learned?.join("\n") || "");
  const [improvementsInput, setImprovementsInput] = useState(formData.future_improvements?.join("\n") || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.id ? prev.slug : slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...formData,
      goals: goalsInput.split("\n").map((s) => s.trim()).filter(Boolean),
      constraints: constraintsInput.split("\n").map((s) => s.trim()).filter(Boolean),
      requirements: requirementsInput.split("\n").map((s) => s.trim()).filter(Boolean),
      results: resultsInput.split("\n").map((s) => s.trim()).filter(Boolean),
      lessons_learned: lessonsInput.split("\n").map((s) => s.trim()).filter(Boolean),
      future_improvements: improvementsInput.split("\n").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch("/api/admin/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save case study");

      setMessage({ type: "success", text: "Case study saved successfully!" });
      setTimeout(() => {
        router.push("/admin/case-studies");
        router.refresh();
      }, 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save";
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
          <span>Back to Case Studies</span>
        </button>

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
              <span>Save Case Study</span>
            </>
          )}
        </Button>
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

      {/* General */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          1. General Case Study Info
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3.5 py-2 text-sm font-mono rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Associated Project
            </label>
            <select
              value={formData.project_id || ""}
              onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
            >
              <option value="">None / Standalone</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Featured Image URL
            </label>
            <input
              type="url"
              value={formData.featured_image}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700 block">
            Executive Summary *
          </label>
          <textarea
            required
            rows={3}
            value={formData.executive_summary}
            onChange={(e) => setFormData({ ...formData, executive_summary: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>
      </div>

      {/* Problem & Background */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          2. Background & Problem Statement
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700 block">
            Background
          </label>
          <textarea
            rows={3}
            value={formData.background}
            onChange={(e) => setFormData({ ...formData, background: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700 block">
            Problem Statement *
          </label>
          <textarea
            required
            rows={3}
            value={formData.problem_statement}
            onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>
      </div>

      {/* Lists: Goals, Constraints, Requirements */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          3. Goals, Constraints & Requirements (One Per Line)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Goals
            </label>
            <textarea
              rows={4}
              value={goalsInput}
              onChange={(e) => setGoalsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Constraints
            </label>
            <textarea
              rows={4}
              value={constraintsInput}
              onChange={(e) => setConstraintsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Requirements
            </label>
            <textarea
              rows={4}
              value={requirementsInput}
              onChange={(e) => setRequirementsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Architecture & Implementation */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          4. Architecture & Implementation
        </h3>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700 block">
            Architecture Details
          </label>
          <textarea
            rows={5}
            value={formData.architecture_details}
            onChange={(e) => setFormData({ ...formData, architecture_details: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase text-slate-700 block">
            Implementation Details
          </label>
          <textarea
            rows={5}
            value={formData.implementation_details}
            onChange={(e) => setFormData({ ...formData, implementation_details: e.target.value })}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50"
          />
        </div>
      </div>

      {/* Results & Lessons */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-base text-slate-950 border-b border-slate-100 pb-3">
          5. Measured Results & Retrospective (One Per Line)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Results
            </label>
            <textarea
              rows={4}
              value={resultsInput}
              onChange={(e) => setResultsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Lessons Learned
            </label>
            <textarea
              rows={4}
              value={lessonsInput}
              onChange={(e) => setLessonsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-700 block">
              Future Improvements
            </label>
            <textarea
              rows={4}
              value={improvementsInput}
              onChange={(e) => setImprovementsInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono rounded-lg border border-slate-200 bg-slate-50"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={loading} size="lg" className="bg-blue-600 hover:bg-blue-500 text-white">
          {loading ? "Saving Case Study..." : "Commit Case Study"}
        </Button>
      </div>
    </form>
  );
}
