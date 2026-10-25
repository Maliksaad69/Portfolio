"use client";

import React from "react";
import { Check, ShieldCheck, Zap, Activity, Repeat, Code2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionComponents";

const challenges = [
  {
    icon: Zap,
    metric: "< 120ms P99 Latency",
    title: "Bridging the Prototype-to-Production Gap",
    narrative:
      "A machine learning model running in a Jupyter notebook is not a product. I transform experimental prototypes into containerized, autoscaling microservices with strict schema validation, latency budgets, and structured logging.",
  },
  {
    icon: Activity,
    metric: "99.9% Uptime on AWS EKS",
    title: "Deploying AI Workloads Reliably on Cloud Infrastructure",
    narrative:
      "GPU instances and LLM APIs are expensive and volatile. I architect hybrid caching layers, asynchronous worker queues, and dynamic node autoscaling on AWS EKS to maintain predictable cost and high availability.",
  },
  {
    icon: Repeat,
    metric: "100% Declarative GitOps",
    title: "Eliminating Human Bottlenecks with Automated CI/CD",
    narrative:
      "Manual deployment procedures invite human error and production downtime. I design declarative GitOps pipelines with ArgoCD and automated canary gates that allow engineering teams to release multiple times daily with instant rollback.",
  },
  {
    icon: ShieldCheck,
    metric: "OWASP Top 10 Hardened",
    title: "Hardening LLM Security & Data Privacy",
    narrative:
      "Enterprise AI adoption requires defense against prompt injection, PII exfiltration, and non-deterministic failures. I build guardrail proxies and deterministic validation nodes that inspect inputs and outputs before persistence.",
  },
  {
    icon: Code2,
    metric: "10k+ Burst Req/sec",
    title: "Designing Maintainable, High-Concurrency Backends",
    narrative:
      "From asynchronous FastAPI endpoints to PostgreSQL Row Level Security and Redis semantic caching, I build data layers that handle burst traffic without degrading user experience or data integrity.",
  },
  {
    icon: Check,
    metric: "Zero Handoff Friction",
    title: "Building Holistic, End-to-End Solutions",
    narrative:
      "By mastering both the front-of-house user experience and the back-of-house cloud infrastructure, I eliminate handoff friction and deliver complete, cohesive digital products from inception to continuous maintenance.",
  },
];

export function EngineeringImpact() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Problem Solving"
          title="Engineering for Production Realities"
          description="How cross-disciplinary expertise across AI, cloud infrastructure, and full-stack engineering translates into high-reliability systems."
        />

        <StaggerContainer
          staggerDelay={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {challenges.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <SpotlightCard
                  spotlightColor="rgba(59, 130, 246, 0.12)"
                  className="p-7 space-y-5 h-full flex flex-col justify-between group border-2 border-slate-200/80 hover:border-blue-500/60 rounded-2xl transition-all shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-800 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300">
                        <Icon className="w-5 h-5 transition-transform" />
                      </div>
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 group-hover:border-blue-300 transition-colors">
                        {item.metric}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {item.narrative}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-400 group-hover:text-slate-600 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                    <span>Production Architecture Pattern</span>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
