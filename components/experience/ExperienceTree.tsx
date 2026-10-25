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
  const [showAll, setShowAll] = useState(false);

  const hasMore = experiences.length > initialDisplayCount;
  const displayedExperiences = showAll
    ? experiences
    : experiences.slice(0, initialDisplayCount);
  const remainingCount = experiences.length - initialDisplayCount;

  return (
    <div className="relative py-8">
      {/* Central Trunk Line for Desktop, Left-aligned for Mobile */}
      <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 via-indigo-500 to-emerald-500 rounded-full opacity-80" />

      {/* Tree Nodes & Cards */}
      <div className="space-y-12 md:space-y-16 relative">
        <AnimatePresence initial={false}>
          {displayedExperiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.08, 0.4) }}
                className="relative flex flex-col md:flex-row items-center w-full"
              >
                {/* Desktop Left Column (Card if Even, Spacer if Odd) */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    isEven ? "md:pr-12 md:text-right" : "md:hidden"
                  }`}
                >
                  {isEven && (
                    <ExperienceCard
                      exp={exp}
                      idx={idx}
                      align="right"
                    />
                  )}
                </div>

                {/* Central Trunk Node / Branch Point */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-8 z-10 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Glowing outer halo if current role */}
                    {exp.is_current && (
                      <span className="absolute -inset-1.5 rounded-full bg-emerald-400/40 animate-ping" />
                    )}

                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${
                        exp.is_current
                          ? "bg-slate-950 border-emerald-400 text-emerald-400"
                          : "bg-white border-blue-600 text-blue-600"
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>

                    {/* Step indicator pill beside trunk node on desktop */}
                    <span
                      className={`hidden md:block absolute text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full border whitespace-nowrap ${
                        isEven
                          ? "left-full ml-3 bg-blue-50 text-blue-700 border-blue-200"
                          : "right-full mr-3 bg-slate-900 text-slate-200 border-slate-700"
                      }`}
                    >
                      Branch #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Desktop Right Column (Card if Odd, Spacer if Even) */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-12 ${
                    isEven ? "md:hidden" : "md:text-left"
                  }`}
                >
                  <ExperienceCard
                    exp={exp}
                    idx={idx}
                    align={isEven ? "left" : "left"}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less Branch Expander */}
      {hasMore && (
        <div className="relative pt-12 md:pt-16 flex flex-col items-center justify-center">
          {/* Connector line down to button */}
          <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-500 to-blue-600 mb-2" />

          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative z-10 flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border-2 border-blue-600 text-slate-900 shadow-md hover:bg-blue-50/50 hover:shadow-lg transition-all"
          >
            <GitBranch className="w-4 h-4 text-blue-600 group-hover:rotate-45 transition-transform" />
            <span className="text-sm font-extrabold tracking-tight text-slate-950">
              {showAll
                ? "Show Less Experience"
                : `Show More Experience (+${remainingCount} Roles)`}
            </span>
            {showAll ? (
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
  align,
}: {
  exp: Experience;
  idx: number;
  align: "left" | "right";
}) {
  return (
    <div className="relative group text-left">
      {/* Branch Connector Line (Desktop) */}
      <div
        className={`hidden md:block absolute top-12 w-10 h-0.5 bg-blue-400/60 pointer-events-none group-hover:bg-blue-600 transition-colors ${
          align === "right" ? "-right-10" : "-left-10"
        }`}
      />

      <SpotlightCard
        spotlightColor="rgba(37, 99, 235, 0.08)"
        className="p-6 sm:p-8 space-y-6 bg-white border-2 border-slate-200/90 hover:border-blue-500/60 transition-all rounded-2xl shadow-sm hover:shadow-md"
      >
        {/* Header Section */}
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 group-hover:text-blue-600 transition-colors">
              {exp.job_title}
            </h3>

            {exp.is_current ? (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold font-sans bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Current Role</span>
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200">
                {exp.employment_type}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-extrabold text-blue-700 text-base">
              {exp.company}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">{exp.location}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 pt-1">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {formatDate(exp.start_date)} —{" "}
                {exp.is_current ? "Present" : formatDate(exp.end_date)}
              </span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>{exp.location}</span>
            </span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          {exp.description}
        </p>

        {/* Responsibilities */}
        {exp.responsibilities && exp.responsibilities.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-sm font-extrabold tracking-tight text-slate-900 uppercase">
              Core Responsibilities:
            </h4>
            <ul className="space-y-2">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quantified Achievements */}
        {exp.achievements && exp.achievements.length > 0 && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-200/70 space-y-2.5">
            <h4 className="text-sm font-extrabold tracking-tight text-blue-950 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Key Impact & Quantified Achievements:</span>
            </h4>
            <ul className="space-y-2">
              {exp.achievements.map((item, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-slate-800 flex items-start gap-2 font-medium"
                >
                  <span className="text-blue-600 font-extrabold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {exp.technologies && exp.technologies.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-300 text-slate-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </SpotlightCard>
    </div>
  );
}
