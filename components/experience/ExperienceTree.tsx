"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  GitBranch,
  Layers,
} from "lucide-react";
import { SpotlightCard } from "@/components/motion/MotionComponents";

interface ExperienceTreeProps {
  experiences: Experience[];
  initialDisplayCount?: number;
}

export function ExperienceTree({
  experiences,
  initialDisplayCount = 4,
}: ExperienceTreeProps) {
  const [showAllCards, setShowAllCards] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const hasMoreCards = experiences.length > initialDisplayCount;
  const displayedExperiences = showAllCards
    ? experiences
    : experiences.slice(0, initialDisplayCount);
  const remainingCount = experiences.length - initialDisplayCount;

  const allAreExpanded =
    displayedExperiences.length > 0 &&
    displayedExperiences.every((exp) => expandedIds[exp.id]);

  const handleToggleCard = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAll = () => {
    const nextState = !allAreExpanded;
    const nextMap: Record<string, boolean> = {};
    displayedExperiences.forEach((exp) => {
      nextMap[exp.id] = nextState;
    });
    setExpandedIds(nextMap);
  };

  return (
    <div className="space-y-8 relative">
      {/* Top Controls: Trajectory Information & Quick Expand All Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <GitBranch className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-800">
            Chronological Trajectory ({experiences.length} Roles)
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-700 font-bold">Latest On Top</span>
        </div>

        <button
          type="button"
          onClick={handleToggleAll}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-slate-200/80 transition-colors"
        >
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>{allAreExpanded ? "Collapse All Cards" : "Expand All Responsibilities"}</span>
        </button>
      </div>

      {/* Side-by-Side 2-Column Grid: Left & Right cards, Latest on top, Others below */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        <AnimatePresence initial={false}>
          {displayedExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="w-full"
            >
              <ExperienceCard
                exp={exp}
                index={idx}
                isExpanded={Boolean(expandedIds[exp.id])}
                onToggle={() => handleToggleCard(exp.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More Cards Toggle for > 4 items */}
      {hasMoreCards && (
        <div className="pt-6 flex flex-col items-center justify-center">
          <motion.button
            onClick={() => setShowAllCards(!showAllCards)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border-2 border-blue-600 text-slate-950 shadow-sm hover:bg-blue-50/50 hover:shadow-md transition-all"
          >
            <GitBranch className="w-4 h-4 text-blue-600 group-hover:rotate-45 transition-transform" />
            <span className="text-sm font-black tracking-tight">
              {showAllCards
                ? "Show Less Roles"
                : `Show More Experience (+${remainingCount} More Roles)`}
            </span>
            {showAllCards ? (
              <ChevronUp className="w-4 h-4 text-blue-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-blue-600" />
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
  isExpanded,
  onToggle,
}: {
  exp: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <SpotlightCard
      spotlightColor="rgba(37, 99, 235, 0.08)"
      className="p-6 sm:p-7 space-y-4 bg-white border-2 border-slate-200/90 hover:border-blue-500/60 rounded-2xl transition-all shadow-xs hover:shadow-md group flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Top Header: Branch Step & Employment Status */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-black uppercase tracking-wider text-blue-600 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200/80">
              Branch #{String(index + 1).padStart(2, "0")}
            </span>
            {exp.is_current ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-sans bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Current Role</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200">
                {exp.employment_type}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {formatDate(exp.start_date)} —{" "}
              {exp.is_current ? "Present" : formatDate(exp.end_date)}
            </span>
          </div>
        </div>

        {/* Role Title & Company */}
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
            {exp.job_title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-extrabold text-blue-700">{exp.company}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium flex items-center gap-1 text-xs">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{exp.location}</span>
            </span>
          </div>
        </div>

        {/* Compact Narrative Summary (Shorter card height) */}
        <p className="text-sm text-slate-700 leading-relaxed font-normal line-clamp-2">
          {exp.description}
        </p>

        {/* Quick Tech Preview (first 3-4 pills) */}
        {!isExpanded && exp.technologies && exp.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
              >
                {tech}
              </span>
            ))}
            {exp.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-200/60">
                +{exp.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Expandable Section: Core Responsibilities & Quantified Impact */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="space-y-4 pt-3 border-t border-slate-100 overflow-hidden"
            >
              {/* Core Responsibilities */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>Core Responsibilities:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 font-normal"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantified Achievements & Impact */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Key Quantified Impact:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-800 flex items-start gap-2 font-medium"
                      >
                        <span className="text-blue-600 font-extrabold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Technology Stack */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    Complete Technology Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-slate-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expand / Collapse Button inside Card */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onToggle}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-xs font-black tracking-tight flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>
            {isExpanded ? "Collapse Details" : "More Core Responsibilities & Impact"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
          )}
        </button>
      </div>
    </SpotlightCard>
  );
}
