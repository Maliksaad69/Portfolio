import React from "react";
import type { Metadata } from "next";
import {
  getProfile,
  getSiteSettings,
  getProjects,
  getExperiences,
  getSkills,
} from "@/lib/data/store";
import { Hero } from "@/components/home/Hero";
import { Disciplines } from "@/components/home/Disciplines";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { EngineeringImpact } from "@/components/home/EngineeringImpact";
import { LifecycleTimeline } from "@/components/home/LifecycleTimeline";
import { ExperienceSnapshot } from "@/components/home/ExperienceSnapshot";
import { SkillsSnapshot } from "@/components/home/SkillsSnapshot";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Malik Saad Awan — AI & DevOps Engineer | Full-Stack Developer",
  description:
    "End-to-end AI and DevOps engineer building intelligent multi-agent systems, GitOps Kubernetes infrastructure, and high-performance full-stack web platforms.",
  openGraph: {
    title: "Malik Saad Awan — AI & DevOps Engineer",
    description:
      "I Build Intelligent Systems. I Engineer Them for Production.",
    type: "website",
  },
};

export default async function HomePage() {
  const profile = await getProfile();
  const settings = await getSiteSettings();
  const projects = await getProjects({ featuredOnly: true, limit: 3 });
  const experiences = await getExperiences();
  const skills = await getSkills();

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <Hero profile={profile} settings={settings} />

      {/* 2. Professional Identity */}
      <Disciplines />

      {/* 3. Selected Projects */}
      <FeaturedProjects projects={projects} />

      {/* 4. Engineering Impact */}
      <EngineeringImpact />

      {/* 5. End-to-End Engineering Lifecycle */}
      <LifecycleTimeline />

      {/* 6. Experience Snapshot */}
      <ExperienceSnapshot experiences={experiences} />

      {/* 7. Technical Expertise Snapshot */}
      <SkillsSnapshot skills={skills} />

      {/* 8. Contact CTA */}
      <ContactCTA
        email={profile.email}
        githubUrl={profile.github_url}
        linkedinUrl={profile.linkedin_url}
      />
    </div>
  );
}
