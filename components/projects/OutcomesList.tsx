"use client";

import React from "react";
import { ProjectOutcome } from "@/types";
import { SpotlightCard } from "@/components/motion/MotionComponents";
import { TrendingUp, Sparkles } from "lucide-react";

interface OutcomesListProps {
  outcomes: ProjectOutcome[];
}

export function OutcomesList({ outcomes }: OutcomesListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {outcomes.map((outcome) => (
        <SpotlightCard
          key={outcome.id || outcome.title}
          spotlightColor="rgba(59, 130, 246, 0.1)"
          className="p-6 flex flex-col justify-between space-y-4 group border-2 border-slate-200/90 hover:border-blue-500/60 rounded-2xl transition-all shadow-xs"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                {outcome.metric_label ||
                  (outcome.outcome_type === "quantitative"
                    ? "Metric Result"
                    : "Qualitative Impact")}
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {outcome.outcome_type === "quantitative" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>
            </div>
            <h4 className="font-black text-slate-950 text-lg tracking-tight group-hover:text-blue-600 transition-colors">
              {outcome.title}
            </h4>
          </div>

          {outcome.metric_value && (
            <div className="py-1">
              <span className="text-3xl font-black font-mono tracking-tight text-slate-950 block">
                {outcome.metric_value}
              </span>
            </div>
          )}

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
            {outcome.description}
          </p>
        </SpotlightCard>
      ))}
    </div>
  );
}
