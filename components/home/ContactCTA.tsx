"use client";

import React from "react";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/MotionComponents";

interface ContactCTAProps {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

export function ContactCTA({ email, githubUrl, linkedinUrl }: ContactCTAProps) {
  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <FadeIn direction="up" distance={20} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-slate-900 border border-slate-800 text-slate-300">
          <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
          <span>Strategic Collaborations & Senior Roles</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
          Have a Problem Worth Solving? Let&apos;s Build Something.
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Whether you&apos;re architecting an autonomous AI agent system, modernizing cloud infrastructure with GitOps, or bringing a complex full-stack product to production, let&apos;s discuss how I can help.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              href="/contact"
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-100 hover:text-black font-semibold shadow-lg group"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              href={`mailto:${email}`}
              variant="outline"
              size="lg"
              className="border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </Button>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex items-center justify-center gap-8 text-xs font-mono text-slate-500">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>
          <span className="text-slate-800">•</span>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
