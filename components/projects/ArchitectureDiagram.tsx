"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ProjectArchitecture } from "@/types";
import { Layers, Play, Pause, ChevronRight, Activity, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  architecture: ProjectArchitecture;
}

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-step timer
  React.useEffect(() => {
    if (!isPlaying || !architecture.data_flow || architecture.data_flow.length <= 1) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (architecture.data_flow?.length || 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, architecture.data_flow]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>System Topology & Specifications</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              {architecture.title}
            </h3>
          </div>

          {architecture.data_flow && architecture.data_flow.length > 0 && (
            <button
              onClick={togglePlay}
              className={cn(
                "inline-flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-lg border transition-all self-start sm:self-auto",
                isPlaying
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              )}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Execution Trace</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Data Flow</span>
                </>
              )}
            </button>
          )}
        </div>

        <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {architecture.description}
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Architecture Image if available */}
        {architecture.image_url && (
          <div className="rounded-xl overflow-hidden border border-slate-200/90 bg-slate-100 aspect-[16/9] max-h-[440px] relative group">
            <img
              src={architecture.image_url}
              alt={architecture.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        )}

        {/* Step-by-Step Interactive Data Flow */}
        {architecture.data_flow && architecture.data_flow.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span>Data Flow & Execution Pipeline</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-500">
                Step 0{activeStep + 1} of 0{architecture.data_flow.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {architecture.data_flow.map((step, index) => {
                const isActive = activeStep === index;
                return (
                  <motion.div
                    key={index}
                    onClick={() => {
                      setActiveStep(index);
                      setIsPlaying(false);
                    }}
                    whileHover={{ x: 2 }}
                    className={cn(
                      "cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 relative overflow-hidden",
                      isActive
                        ? "bg-blue-50/70 border-blue-300 shadow-xs"
                        : "bg-slate-50/60 border-slate-200/70 hover:bg-slate-100/70"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFlowIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <span
                      className={cn(
                        "font-mono font-bold text-xs px-2 py-0.5 rounded shrink-0 mt-0.5 transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200/80 text-slate-700"
                      )}
                    >
                      0{index + 1}
                    </span>

                    <div className="flex-1 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {step}
                    </div>

                    {isActive && (
                      <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-blue-700 shrink-0 font-medium">
                        <span>Active Trace</span>
                        <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* System Components Breakdown */}
        {architecture.components && architecture.components.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-700" />
              <span>Component Architecture & Responsibilities</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {architecture.components.map((comp) => (
                <motion.div
                  key={comp.name}
                  whileHover={{ y: -2 }}
                  className="p-5 rounded-xl border border-slate-200/80 bg-white space-y-2 hover:border-slate-300 hover:shadow-xs transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">
                      {comp.name}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {comp.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {comp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
