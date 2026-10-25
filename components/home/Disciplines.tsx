"use client";

import React from "react";
import { Cpu, Server, Layers, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpotlightCard, FadeIn } from "@/components/motion/MotionComponents";
import Link from "next/link";
import { motion } from "framer-motion";

const disciplines = [
  {
    icon: Cpu,
    title: "AI Engineering",
    subtitle: "Intelligence & Reasoning",
    description:
      "Building intelligent applications using machine learning, deep neural networks, LLMs, NLP pipelines, autonomous AI agents, retrieval-augmented generation (RAG), and AI-driven automation.",
    capabilities: [
      "Autonomous Multi-Agent Systems (LangGraph)",
      "Hybrid RAG Pipelines & Semantic Reranking",
      "Vector Embeddings & Vector Stores (Qdrant, Pinecone)",
      "Deep Learning, PyTorch & Model Fine-Tuning",
      "LLMOps, Token Optimization & Output Validation",
    ],
    accent: "text-blue-600 bg-blue-50 border-blue-200/80",
    spotlight: "rgba(37, 99, 235, 0.08)",
    badge: "Reasoning Layer",
  },
  {
    icon: Server,
    title: "DevOps & Cloud Engineering",
    subtitle: "Infrastructure & Reliability",
    description:
      "Designing resilient cloud infrastructure, automated CI/CD pipelines, containerized environments, infrastructure-as-code, real-time observability, and production release strategies.",
    capabilities: [
      "Kubernetes (EKS) & Microservices Orchestration",
      "Declarative Infrastructure as Code (Terraform)",
      "Continuous Delivery & GitOps (ArgoCD)",
      "Hardened Multi-Stage Docker Containers",
      "Telemetry, Alerting & SLOs (Prometheus, Grafana)",
    ],
    accent: "text-indigo-600 bg-indigo-50 border-indigo-200/80",
    spotlight: "rgba(79, 70, 229, 0.08)",
    badge: "Infrastructure Layer",
  },
  {
    icon: Layers,
    title: "Full-Stack & Web Applications",
    subtitle: "Production Web Apps & Systems",
    description:
      "Engineering complete, end-to-end web applications and SaaS platforms — pairing high-responsiveness frontend architectures with resilient asynchronous backend APIs, secure multi-tenant data layers, and automated cloud deployments.",
    capabilities: [
      "Next.js 16 App Router, React 19 & TypeScript",
      "Full-Stack Web App Architecture & SaaS Platforms",
      "FastAPI & Node.js Asynchronous Microservices",
      "PostgreSQL, Supabase RLS & Redis Caching",
      "Responsive, Modern Design Systems & State Machines",
      "Responsive, Accessible Editorial UI Design",
    ],
    accent: "text-emerald-600 bg-emerald-50 border-emerald-200/80",
    spotlight: "rgba(16, 185, 129, 0.08)",
    badge: "Application Layer",
  },
];

export function Disciplines() {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeader
            badge="Core Competencies"
            title="Interconnected Engineering Disciplines"
            description="I do not treat modeling, software engineering, and infrastructure as isolated siloes. The value lies in connecting them into resilient, cohesive systems that solve real problems in production."
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {disciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={idx * 0.12}>
                <SpotlightCard
                  spotlightColor={item.spotlight}
                  className="p-8 h-full flex flex-col justify-between group border-2 border-slate-200/80 hover:border-blue-500/60 transition-all rounded-2xl"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className={`p-3.5 rounded-xl border ${item.accent} transition-shadow shadow-xs`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>
                      <span className="text-xs font-black uppercase tracking-wider text-slate-700 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <h4 className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-2.5">
                        Key Technical Focus:
                      </h4>
                      <ul className="space-y-2">
                        {item.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5"
                          >
                            <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href="/skills"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors group/link"
                    >
                      <span>Explore all technologies</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
