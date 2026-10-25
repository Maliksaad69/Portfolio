"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Experience } from "@/types";
import { ExperienceTree } from "@/components/experience/ExperienceTree";

interface ExperienceSnapshotProps {
  experiences: Experience[];
}

export function ExperienceSnapshot({ experiences }: ExperienceSnapshotProps) {
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <SectionHeader
            badge="Career Trajectory"
            title="Professional Experience"
            description="Proven track record engineering AI workflows, orchestrating cloud infrastructure, and building scalable full-stack web applications."
            className="mb-0"
          />
          <Button href="/experience" variant="outline" size="md">
            <span>View Full Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <ExperienceTree experiences={experiences} initialDisplayCount={4} />
      </div>
    </section>
  );
}
