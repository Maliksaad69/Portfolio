"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { Project } from "@/types";
import { SpotlightCard } from "@/components/motion/MotionComponents";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const primaryOutcome = project.outcomes && project.outcomes.length > 0 ? project.outcomes[0] : null;

  const statusVariantMap: Record<string, "success" | "warning" | "default" | "neutral" | "info"> = {
    Live: "success",
    "Private Deployment": "info",
    Development: "warning",
    Archived: "default",
    "Not Deployed": "default",
  };

  return (
    <SpotlightCard
      spotlightColor="rgba(59, 130, 246, 0.08)"
      className="flex flex-col justify-between group h-full border-2 border-slate-200/90 hover:border-blue-500/60 rounded-2xl transition-all shadow-xs"
    >
      <div>
        {/* Thumbnail Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-200/80">
          <img
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wide bg-slate-950 text-white shadow-xs">
              {project.category_name || "Engineering"}
            </span>
            <Badge
              variant={statusVariantMap[project.deployment_status] || "default"}
              size="sm"
              className="backdrop-blur-xs shadow-xs"
            >
              {project.deployment_status}
            </Badge>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
              {project.short_description}
            </p>
          </div>

          {/* Key Outcome / Metric Highlight */}
          {primaryOutcome && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between transition-colors group-hover:border-blue-200/60"
            >
              <div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  Impact Highlight
                </div>
                <div className="text-xs font-medium text-slate-800 mt-0.5 line-clamp-1">
                  {primaryOutcome.title}
                </div>
              </div>
              {primaryOutcome.metric_value && (
                <div className="text-right pl-3">
                  <span className="text-sm font-bold font-mono text-slate-900 group-hover:text-blue-600 transition-colors">
                    {primaryOutcome.metric_value}
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-1.5 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200/60 group-hover:bg-slate-50 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-50 text-slate-500">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <Link
          href={`/projects/${project.slug}`}
          className="font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 group/btn transition-colors"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.live_url && (
            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
          {project.github_url && (
            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
