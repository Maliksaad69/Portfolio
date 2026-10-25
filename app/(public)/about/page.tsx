import React from "react";
import type { Metadata } from "next";
import { getProfile, getEducation } from "@/lib/data/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  SpotlightCard,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionComponents";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  FileText,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Malik Saad Awan — AI, DevOps & Full-Stack Web Developer",
  description:
    "Engineering philosophy, background in Artificial Intelligence, cloud infrastructure, and end-to-end full-stack web application development.",
};

export default async function AboutPage() {
  const profile = await getProfile();
  const education = await getEducation();

  const principles = [
    {
      title: "Production Over Prototypes",
      desc: "An AI model that works in a local notebook but fails under concurrent traffic or without automated tests is unfinished. Engineering excellence means building systems that operate reliably in the real world.",
    },
    {
      title: "Declarative, Self-Healing Infrastructure",
      desc: "Manual server adjustments inevitably degrade into configuration drift and production panic. I enforce infrastructure-as-code and GitOps so every release is version-controlled, reproducible, and easily rolled back.",
    },
    {
      title: "Holistic Systems Thinking",
      desc: "Software architecture, database schemas, model inference latency, and frontend state machines are deeply interdependent. Bridging these domains produces faster products with lower operational overhead.",
    },
    {
      title: "Observability as a First-Class Citizen",
      desc: "You cannot optimize or debug what you cannot measure. Every service I build incorporates structured telemetry, distributed tracing, and automated alerting thresholds from day one.",
    },
  ];

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <FadeIn direction="up">
          <SectionHeader
            badge="Engineering Philosophy"
            title="About Me"
            description="Bridging the gap between artificial intelligence modeling, cloud infrastructure, and full-stack product execution."
          />
        </FadeIn>

        {/* Narrative & Profile Overview */}
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <FadeIn direction="right" className="md:col-span-4 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200/90 aspect-square bg-slate-100 shadow-sm group">
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-slate-900 underline truncate"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button
                  href={profile.resume_url || "/resume.pdf"}
                  external
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </Button>
                <Button href="/contact" size="md" className="w-full">
                  <span>Contact Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="md:col-span-8 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.08)"
                className="p-6 sm:p-8 space-y-4 border-2 border-slate-200/90 rounded-2xl bg-white shadow-xs"
              >
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Who I Am as an Engineer
                </h2>
                <div className="space-y-4 whitespace-pre-line text-slate-800 font-normal leading-relaxed">
                  {profile.about_narrative}
                </div>
              </SpotlightCard>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <span className="font-black text-slate-950 block text-base font-sans">
                    End-to-End
                  </span>
                  <span className="text-slate-500 font-semibold">Lifecycle Scope</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <span className="font-black text-slate-950 block text-base font-sans">
                    Cloud-Native
                  </span>
                  <span className="text-slate-500 font-semibold">AWS & Kubernetes</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
                  <span className="font-black text-slate-950 block text-base font-sans">
                    Zero-Downtime
                  </span>
                  <span className="text-slate-500 font-semibold">GitOps Delivery</span>
                </div>
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 hover:bg-blue-100/70 transition-colors">
                  <span className="font-black text-blue-950 block text-base font-sans">
                    Full-Stack
                  </span>
                  <span className="text-blue-700 font-semibold">Web Apps & SaaS</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Engineering Principles */}
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Operating Principles
            </span>
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight mt-1">
              How I Approach Complex Engineering Challenges
            </h2>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <SpotlightCard
                  spotlightColor="rgba(59, 130, 246, 0.08)"
                  className="p-6 sm:p-7 space-y-3 h-full group border-2 border-slate-200/90 hover:border-blue-500/60 rounded-2xl transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform shrink-0" />
                    <h3 className="font-black text-lg sm:text-xl text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Education & Academic Rigor */}
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
            Education & Academic Foundations
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <SpotlightCard
                key={edu.id}
                spotlightColor="rgba(59, 130, 246, 0.06)"
                className="p-6 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {edu.degree} in {edu.field_of_study}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    {edu.start_date} — {edu.end_date}
                  </span>
                </div>
                <div className="text-sm font-medium text-blue-700">
                  {edu.institution}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  {edu.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Socials & Resume CTA */}
        <FadeIn direction="up">
          <section className="p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Looking for full credentials?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Download my complete technical resume or connect on professional platforms.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                href={profile.resume_url || "/resume.pdf"}
                external
                className="bg-white text-slate-950 hover:bg-slate-100"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </Button>
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
