"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Compass,
  FileCheck,
  Cpu,
  Code,
  Cloud,
  CheckCircle,
  Rocket,
  LineChart,
  ArrowRight,
  ShieldAlert,
  FolderGit2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Pause,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    step: "01",
    phase: "Discovery & Strategy",
    icon: Compass,
    title: "Ideation & Discovery",
    desc: "Deconstruct business challenges, identify bottlenecks, and determine if an AI or systems-based solution is warranted.",
    inputs: ["Executive requirements brief", "Domain workflow telemetry", "Cost-benefit analysis"],
    deliverables: ["Feasibility matrix", "SLA latency & uptime budgets", "Security threat analysis"],
    verification: "Return-on-investment validation & compute cost feasibility cutoff",
    tools: ["Miro", "Excalidraw", "Notion RFC", "Benchmark Scripts"],
  },
  {
    step: "02",
    phase: "System Specification",
    icon: FileCheck,
    title: "Requirements & System Design",
    desc: "Define technical specifications, data contracts, latency SLAs, user flows, and clear acceptance criteria.",
    inputs: ["Stakeholder user journeys", "Latency & throughput constraints", "Compliance requirements"],
    deliverables: ["OpenAPI 3.1 specification", "Protobuf contracts", "Database schema DDL"],
    verification: "Schema contract compilation & security threat modeling review",
    tools: ["OpenAPI", "Zod", "Prisma/Drizzle DDL", "Figma"],
  },
  {
    step: "03",
    phase: "Architecture Selection",
    icon: Cpu,
    title: "Architecture & Tech Selection",
    desc: "Select optimal model architectures, vector retrieval strategies, database schemas, and cloud topology.",
    inputs: ["Model benchmark results", "Estimated QPS curves", "High-availability targets"],
    deliverables: ["System topology diagram", "Hybrid caching blueprint", "Vector index configuration"],
    verification: "Component failure-mode analysis & disaster recovery matrix",
    tools: ["LangGraph", "Qdrant", "Redis Semantic Cache", "PostgreSQL"],
  },
  {
    step: "04",
    phase: "Core Implementation",
    icon: Code,
    title: "Full-Stack & AI Development",
    desc: "Implement stateful agent graphs, asynchronous REST microservices, and responsive client user interfaces.",
    inputs: ["Contract specifications", "UI design components", "Evaluation test sets"],
    deliverables: ["Asynchronous FastAPI services", "Next.js App Router client", "LangGraph orchestrator"],
    verification: "Comprehensive unit & integration test suite with >85% branch coverage",
    tools: ["FastAPI", "Next.js 16", "TypeScript", "Python 3.12", "Tailwind CSS"],
  },
  {
    step: "05",
    phase: "Cloud Infrastructure",
    icon: Cloud,
    title: "Cloud & Infrastructure as Code",
    desc: "Provision AWS VPCs, EKS clusters, and IAM permissions using modular, declarative Terraform scripts.",
    inputs: ["Cloud architecture requirements", "VPC CIDR allocations", "Least-privilege policies"],
    deliverables: ["Modular Terraform plans", "Kubernetes Helm charts", "AWS IAM role bindings"],
    verification: "Tfsec & Checkov security scans with 0 critical policy violations",
    tools: ["AWS EKS", "Terraform", "Helm", "AWS KMS", "Docker"],
  },
  {
    step: "06",
    phase: "Automation & Quality Gates",
    icon: CheckCircle,
    title: "CI/CD & Automated Testing",
    desc: "Build automated test suites, container vulnerability scans, and GitHub Actions build-and-publish workflows.",
    inputs: ["Git repository triggers", "Container build definitions", "Semantic test datasets"],
    deliverables: ["GitHub Actions workflow pipelines", "Trivy vulnerability reports", "Container registry artifacts"],
    verification: "Deterministic build pipeline gate with mandatory automated security sign-off",
    tools: ["GitHub Actions", "Trivy", "Pytest", "Jest", "Docker Buildx"],
  },
  {
    step: "07",
    phase: "Production Delivery",
    icon: Rocket,
    title: "Deployment & Release",
    desc: "Execute progressive canary rollouts via ArgoCD GitOps and Istio traffic shifting with automated rollback.",
    inputs: ["Release git tags", "K8s manifest changes", "Canary traffic step configurations"],
    deliverables: ["ArgoCD sync application", "Istio VirtualService routing", "Release audit log"],
    verification: "Canary error-rate gate (<0.01% HTTP 5xx error rate threshold before promotion)",
    tools: ["ArgoCD", "Istio Service Mesh", "Kubernetes", "Prometheus Alertmanager"],
  },
  {
    step: "08",
    phase: "Operational Observability",
    icon: LineChart,
    title: "Telemetry & Maintenance",
    desc: "Monitor runtime performance, token budgets, error rates, and model drift using Prometheus and Grafana.",
    inputs: ["OpenTelemetry traces", "Prometheus scrape metrics", "Structured JSON access logs"],
    deliverables: ["Executive Grafana dashboard", "PagerDuty alerting policies", "Weekly cost & SLA report"],
    verification: "Automated anomaly detection triggers and SLA compliance verification",
    tools: ["Prometheus", "Grafana", "OpenTelemetry", "Loki", "Vector"],
  },
];

export function LifecycleTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const activeStage = stages[selectedIdx];

  // Map vertical scroll progress across the container to stage 0 through 7
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine which stage should be active based on scroll depth
    const calculatedIdx = Math.min(
      stages.length - 1,
      Math.max(0, Math.floor(latest * stages.length))
    );
    setSelectedIdx(calculatedIdx);
  });

  // Auto-play interval: If user rests on screen, auto-cycle through stages
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % stages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handleNext = () => {
    setSelectedIdx((prev) => (prev + 1) % stages.length);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev - 1 + stages.length) % stages.length);
  };

  const handleScrollToNextSection = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: bottom + 10, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[350vh] lg:min-h-[400vh] bg-slate-50/50"
    >
      {/* Sticky Viewport Container: Locks in view while scrolling advances stages */}
      <div className="sticky top-16 min-h-[calc(100vh-4rem)] flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white/95 backdrop-blur-md z-10 shadow-xs">
        <div className="max-w-7xl mx-auto w-full space-y-8">
          {/* Section Header & Interactive Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <SectionHeader
              badge="Engineering Methodology"
              title="End-to-End Systems Lifecycle"
              description="Scroll down to advance through all 8 engineering lifecycle stages. Every system is conceived, specified, developed, and monitored under rigorous production standards."
              className="mb-0"
            />

            {/* Stepper Controls & Auto-cycle Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-extrabold text-blue-900 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                <span>
                  Stage {stages[selectedIdx].step} of 08
                </span>
                <span className="text-blue-300 mx-1">•</span>
                <button
                  type="button"
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  title={autoPlay ? "Pause auto-advance" : "Resume auto-advance"}
                >
                  {autoPlay ? (
                    <>
                      <Pause className="w-3 h-3 text-blue-700" />
                      <span className="text-[11px] font-bold">Auto-cycling</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-blue-700" />
                      <span className="text-[11px] font-bold">Paused</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                <button
                  onClick={handlePrev}
                  aria-label="Previous step"
                  className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs font-black text-slate-900 px-2 min-w-[65px] text-center">
                  0{selectedIdx + 1} / 0{stages.length}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next step"
                  className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleScrollToNextSection}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
              >
                <span>Skip to Next Section</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 8-Stage Interactive Stepper Track */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = selectedIdx === idx;

              return (
                <motion.button
                  key={stage.step}
                  type="button"
                  onClick={() => {
                    setSelectedIdx(idx);
                    setAutoPlay(false);
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative p-3 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between h-28 group focus:outline-none",
                    isSelected
                      ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-500/25"
                      : "bg-slate-50/80 border-slate-200/90 hover:bg-white hover:border-slate-300 shadow-xs"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeLifecyclePill"
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-blue-600 text-[9px] font-mono font-black text-white uppercase tracking-wider shadow-xs whitespace-nowrap"
                    >
                      Active Stage
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between w-full">
                    <span
                      className={cn(
                        "font-mono text-xs font-black transition-colors",
                        isSelected ? "text-blue-600" : "text-slate-500 group-hover:text-slate-800"
                      )}
                    >
                      {stage.step}
                    </span>
                    <div
                      className={cn(
                        "p-1.5 rounded-lg transition-colors",
                        isSelected
                          ? "bg-blue-100 text-blue-700"
                          : "bg-white text-slate-600 group-hover:text-slate-900 border border-slate-200/60"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div>
                    <h4
                      className={cn(
                        "text-xs sm:text-sm font-extrabold tracking-tight line-clamp-2 transition-colors",
                        isSelected ? "text-slate-950 font-black" : "text-slate-800 group-hover:text-slate-950"
                      )}
                    >
                      {stage.title}
                    </h4>
                    <div
                      className={cn(
                        "h-1 rounded-full mt-1.5 transition-all duration-300",
                        isSelected ? "bg-blue-600 w-10" : "bg-slate-200 group-hover:bg-slate-300 w-5"
                      )}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Selected Stage Deep-Dive Inspector Card with High-Visibility Headings */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-white border-2 border-slate-200 shadow-sm space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      PHASE {activeStage.step}: {activeStage.phase.toUpperCase()}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-600 font-bold">Standard Operating Procedure</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight flex items-center gap-3">
                    <span>{activeStage.title}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <span>Next Stage ({stages[(selectedIdx + 1) % stages.length].step})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
                {activeStage.desc}
              </p>

              {/* Structured 3-Column Inspector Grid with Large, Prominent Headings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {/* Input Artifacts Box */}
                <div className="p-5 sm:p-6 rounded-xl bg-slate-50/90 border border-slate-200 space-y-3.5">
                  <div className="flex items-center gap-2 text-slate-950">
                    <FolderGit2 className="w-5 h-5 text-blue-600" />
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-slate-950">
                      Input Artifacts
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {activeStage.inputs.map((inp, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start gap-2.5 font-medium">
                        <span className="text-blue-600 font-black">•</span>
                        <span>{inp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concrete Deliverables Box */}
                <div className="p-5 sm:p-6 rounded-xl bg-slate-50/90 border border-slate-200 space-y-3.5">
                  <div className="flex items-center gap-2 text-slate-950">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-slate-950">
                      Production Deliverables
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {activeStage.deliverables.map((del, i) => (
                      <li key={i} className="text-sm text-slate-700 flex items-start gap-2.5 font-medium">
                        <span className="text-emerald-600 font-black">•</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Automated Verification Gate Box */}
                <div className="p-5 sm:p-6 rounded-xl bg-amber-50/70 border border-amber-300 space-y-3.5">
                  <div className="flex items-center gap-2 text-amber-950">
                    <ShieldAlert className="w-5 h-5 text-amber-700" />
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-amber-950">
                      Quality Verification Gate
                    </h4>
                  </div>
                  <p className="text-sm text-amber-950 font-medium leading-relaxed">
                    {activeStage.verification}
                  </p>
                  <div className="pt-2.5 border-t border-amber-200/80">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-950 block mb-1.5">
                      Core Tooling:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeStage.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-950 shadow-2xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
