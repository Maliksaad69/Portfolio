import React from "react";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-200/90 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Identity column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="font-semibold text-slate-900 tracking-tight">
                Malik Saad Awan
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md">
              AI Engineer, DevOps Engineer, and Full-Stack Web Application Developer. Designing and building intelligent multi-agent systems and modern web applications backed by resilient cloud infrastructure.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/Maliksaad69"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/malik-saad-ahmed-93404a318/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:saadawan.eng@gmail.com"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition-all"
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Selected Projects
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Professional Experience
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Technical Expertise
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  About & Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Admin */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900">
              Direct Contact
            </h3>
            <p className="text-sm text-slate-600">
              Available for full-time roles, contracts, and strategic systems engineering consulting.
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:underline"
              >
                <span>Initiate conversation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Malik Saad Awan. Built with Next.js, TypeScript, Tailwind CSS & Supabase.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Systems Operational</span>
            </span>
            <a href="#top" className="hover:text-slate-900 transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
