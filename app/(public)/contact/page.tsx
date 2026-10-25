import React from "react";
import type { Metadata } from "next";
import { getProfile } from "@/lib/data/store";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/Card";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Malik Saad Awan | AI & DevOps Engineer",
  description:
    "Initiate an engineering consultation, project inquiry, or senior full-time role discussion with Malik Saad Awan.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          badge="Direct Inquiries"
          title="Let's Build Something Production-Ready"
          description="Have an ambitious AI product, cloud infrastructure challenge, or senior engineering role? Reach out directly or submit your project details below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Details & Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 space-y-6">
              <h3 className="font-bold text-lg text-slate-950 tracking-tight">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                      Email
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-medium text-slate-900 hover:text-blue-600 underline"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="font-medium text-slate-900">
                      {profile.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                      Response SLA
                    </span>
                    <span className="font-medium text-slate-900">
                      Within 24 to 48 hours
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  Connect On Professional Networks:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-400 bg-slate-50 flex items-center justify-center gap-2 text-xs font-medium text-slate-800 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:border-slate-400 bg-slate-50 flex items-center justify-center gap-2 text-xs font-medium text-slate-800 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </Card>

            {/* Engagement Types */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Typical Engagements</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Full-Time Senior Roles:</strong> Staff AI Engineer, Lead DevOps Engineer, Senior Full-Stack Architect.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Production Architecture Sprints:</strong> Designing LLM multi-agent systems and high-throughput RAG pipelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Infrastructure Modernization:</strong> Migrating legacy servers to AWS EKS with automated ArgoCD GitOps.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
