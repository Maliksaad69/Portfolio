"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Project, SkillCategory } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFiltersProps {
  initialProjects: Project[];
  categories: SkillCategory[];
}

export function ProjectFilters({
  initialProjects,
  categories,
}: ProjectFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (
          project.category_id !== selectedCategory &&
          project.category_name?.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }
      }

      // Status filter
      if (selectedStatus !== "all") {
        if (project.deployment_status !== selectedStatus) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.short_description.toLowerCase().includes(query);
        const matchesTech = project.technologies.some((t) =>
          t.toLowerCase().includes(query)
        );
        if (!matchesTitle && !matchesDesc && !matchesTech) {
          return false;
        }
      }

      return true;
    });
  }, [initialProjects, selectedCategory, selectedStatus, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== "all" || selectedStatus !== "all" || searchQuery !== "";

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, technology, or problem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-slate-50/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Deployment Status dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="status-filter" className="text-xs font-mono text-slate-500 uppercase tracking-wider whitespace-nowrap">
              Deployment:
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all cursor-pointer"
            >
              <option value="all">All Deployments</option>
              <option value="Live">Live</option>
              <option value="Private Deployment">Private Deployment</option>
              <option value="Development">Development</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Category Pills with smooth layoutId animation */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
            Category:
          </span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              selectedCategory === "all"
                ? "text-white"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
            }`}
          >
            {selectedCategory === "all" && (
              <motion.div
                layoutId="activeCategoryPill"
                className="absolute inset-0 bg-slate-900 rounded-lg shadow-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10">All Projects ({initialProjects.length})</span>
          </button>

          {categories.map((cat) => {
            const count = initialProjects.filter(
              (p) =>
                p.category_id === cat.id ||
                p.category_name?.toLowerCase() === cat.name.toLowerCase()
            ).length;
            if (count === 0) return null;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-slate-900 rounded-lg shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  {cat.name} ({count})
                </span>
              </button>
            );
          })}

          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="ml-auto text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Projects Grid with Animated Layout */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No projects matched your criteria
            </h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, selecting another category, or resetting all filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
