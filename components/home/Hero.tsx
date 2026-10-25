"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Activity,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { Profile, SiteSettings } from "@/types";
import { PulseBeacon } from "@/components/motion/MotionComponents";

interface HeroProps {
  profile: Profile;
  settings: SiteSettings;
}

export function Hero({ profile, settings }: HeroProps) {
  const [liveLatency, setLiveLatency] = useState(38);

  // Subtle live latency jitter to simulate real production telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLatency((prev) => {
        const jitter = Math.floor(Math.random() * 5) - 2;
        const next = prev + jitter;
        return next >= 34 && next <= 44 ? next : 38;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/70">
      {/* Subtle dynamic background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f00a_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f00a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Subtle ambient light gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-100/40 via-indigo-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Headline & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Status Beacon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs hover:border-emerald-300 transition-colors">
                <PulseBeacon color="bg-emerald-600" pulseColor="bg-emerald-400" size="w-2 h-2" />
                <span>Available for AI, DevOps & Full-Stack Web Application Projects</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]"
            >
              I Build Intelligent Systems.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400">
                I Engineer Them for Production.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed max-w-2xl"
            >
              {settings.hero_subheadline ||
                "I'm an AI & DevOps Engineer who turns ideas into production-ready products — from intelligent AI systems and full-stack applications to cloud infrastructure, automation, and deployment."}
            </motion.p>

            {/* Intro Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200/90 max-w-2xl text-sm sm:text-base text-slate-700 leading-relaxed shadow-xs backdrop-blur-xs"
            >
              {settings.hero_intro ||
                "I work across the entire software development lifecycle, combining AI engineering, software development, cloud infrastructure, and DevOps to build systems that solve real-world problems."}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Button href="/projects" size="lg" className="shadow-md hover:shadow-lg group">
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Let&apos;s Work Together
              </Button>
              <Button
                href={profile.resume_url || "/resume.pdf"}
                external
                variant="ghost"
                size="md"
                className="text-slate-600 hover:text-slate-900"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </Button>
            </motion.div>

            {/* Socials & Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-4 pt-4 border-t border-slate-200/60 text-xs text-slate-500 font-mono"
            >
              <span className="uppercase tracking-wider">Connect:</span>
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 flex items-center gap-1.5 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{profile.location}</span>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition: Malik Saad Awan Portrait & System Telemetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

              {/* Portrait Frame */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative rounded-3xl p-2.5 sm:p-3 bg-white/95 border border-slate-200/90 shadow-2xl backdrop-blur-md overflow-hidden group"
              >
                {/* Photo Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100">
                  <img
                    src="/saad.png"
                    alt={profile.full_name || "Malik Saad Awan"}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Vignette gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top Floating Telemetry Status Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono shadow-md">
                      <PulseBeacon color="bg-emerald-500" pulseColor="bg-emerald-400" size="w-2 h-2" />
                      <span>Operational & Available</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono shadow-md">
                      <Activity className="w-3.5 h-3.5 text-blue-400" />
                      <span>{liveLatency}ms P95</span>
                    </div>
                  </div>

                  {/* Bottom Technical Identity Card */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white space-y-2.5 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-base text-white tracking-tight flex items-center gap-2">
                          <span>{profile.full_name}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        </div>
                        <div className="text-xs text-slate-300 font-mono">
                          AI, DevOps & Full-Stack Web Developer
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/25 text-blue-300 border border-blue-400/30">
                          Production Ready
                        </span>
                      </div>
                    </div>

                    {/* Quick Core Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-white/10">
                      {["Full-Stack Web Apps", "LangGraph AI", "Next.js 16", "AWS EKS", "FastAPI"].map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 border border-white/10 text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative accent card behind portrait */}
              <div className="absolute -z-10 -bottom-3 -right-3 w-full h-full rounded-3xl bg-slate-100 border border-slate-200/60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
