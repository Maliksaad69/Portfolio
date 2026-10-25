"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectChallenge } from "@/types";
import { AlertCircle, CheckCircle2, HelpCircle, ChevronDown } from "lucide-react";

interface ChallengeCardProps {
  challenge: ProjectChallenge;
  index: number;
}

export function ChallengeCard({ challenge, index }: ChallengeCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-all duration-300 hover:border-slate-300">
      {/* Header bar - clickable to toggle */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left border-b border-slate-100 hover:bg-slate-50/50 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-md bg-slate-950 text-white shadow-xs">
            CHALLENGE 0{index + 1}
          </span>
          <h4 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
            {challenge.title}
          </h4>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Expandable Body */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-7 pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              {/* Why it was difficult */}
              <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-300 space-y-2.5 hover:bg-amber-50 transition-colors">
                <div className="flex items-center gap-2 font-black text-amber-950 text-sm tracking-tight">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Why It Was Difficult</span>
                </div>
                <p className="text-amber-950/90 leading-relaxed text-sm font-medium">
                  {challenge.difficulty}
                </p>
              </div>

              {/* Approach */}
              <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-300 space-y-2.5 hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-2 font-black text-blue-950 text-sm tracking-tight">
                  <HelpCircle className="w-4 h-4 text-blue-700" />
                  <span>Engineering Approach</span>
                </div>
                <p className="text-blue-950/90 leading-relaxed text-sm font-medium">
                  {challenge.approach}
                </p>
              </div>

              {/* Solution Implemented */}
              <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-300 space-y-2.5 hover:bg-emerald-50 transition-colors">
                <div className="flex items-center gap-2 font-black text-emerald-950 text-sm tracking-tight">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Solution & Outcome</span>
                </div>
                <p className="text-emerald-950/90 leading-relaxed text-sm font-medium">
                  {challenge.solution}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
