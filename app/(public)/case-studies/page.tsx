import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/data/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/motion/MotionComponents";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies — Malik Saad Awan | AI & DevOps Engineer",
  description:
    "Comprehensive engineering case studies detailing system architecture, trade-offs, technical decisions, and production outcomes.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies({ publishedOnly: true });

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <FadeIn direction="up">
          <SectionHeader
            badge="In-Depth Technical Analysis"
            title="Engineering Case Studies"
            description="Detailed retrospectives into non-trivial production challenges — dissecting architectural decisions, trade-offs, constraints, implementation details, and measured results."
          />
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {caseStudies.map((cs) => (
            <StaggerItem key={cs.id}>
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.1)"
                className="overflow-hidden flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 border-b border-slate-200/80">
                    <img
                      src={cs.featured_image}
                      alt={cs.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-slate-900/90 text-white backdrop-blur-xs">
                        Deep Dive
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                      <Link href={`/case-studies/${cs.slug}`}>{cs.title}</Link>
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {cs.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                        Key Takeaways:
                      </span>
                      <ul className="space-y-1.5">
                        {cs.results.slice(0, 2).map((res, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-700 flex items-start gap-2"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    16 In-Depth Sections
                  </span>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="font-bold text-slate-900 group-hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
