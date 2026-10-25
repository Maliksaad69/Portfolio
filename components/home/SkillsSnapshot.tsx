"use client";

import React from "react";
import { ArrowRight, Cloud, Database, Terminal, Bot } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionComponents";
import { Skill } from "@/types";

interface SkillsSnapshotProps {
  skills: Skill[];
}

export function SkillsSnapshot({}: SkillsSnapshotProps) {
  const categories = [
    {
      title: "Generative AI & LLMs",
      icon: Bot,
      color: "rgba(59, 130, 246, 0.12)",
      items: ["Autonomous Agents (LangGraph)", "RAG Systems", "Vector Embeddings", "Prompt Engineering"],
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      color: "rgba(16, 185, 129, 0.12)",
      items: ["AWS (EKS, VPC, S3)", "Kubernetes & Helm", "Terraform IaC", "ArgoCD GitOps"],
    },
    {
      title: "Backend Engineering",
      icon: Terminal,
      color: "rgba(245, 158, 11, 0.12)",
      items: ["FastAPI", "Python Async", "Node.js", "RESTful Architecture"],
    },
    {
      title: "Full-Stack & Data",
      icon: Database,
      color: "rgba(139, 92, 246, 0.12)",
      items: ["Next.js App Router", "TypeScript & React", "PostgreSQL (Supabase)", "Qdrant / Redis"],
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            badge="Technical Repertoire"
            title="Technical Expertise"
            description="Deep technical capabilities across AI systems, infrastructure automation, and full-stack software development."
            className="mb-0"
          />
          <Button href="/skills" variant="outline" size="md">
            <span>Explore All Skills</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <StaggerItem key={cat.title}>
                <SpotlightCard
                  spotlightColor={cat.color}
                  className="p-6 space-y-4 h-full flex flex-col justify-between group border-2 border-slate-200/90 hover:border-blue-500/60 rounded-2xl transition-all shadow-xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:scale-105 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-black text-base sm:text-lg text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                        {cat.title}
                      </h3>
                    </div>

                    <ul className="space-y-2 pt-1">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-slate-600 flex items-center gap-2 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>4 Competencies</span>
                    <span className="text-slate-500 font-semibold group-hover:text-blue-600 transition-colors">
                      Production Ready
                    </span>
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
