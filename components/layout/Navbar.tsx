"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Projects", href: "/projects" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/skills" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full border-b",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-slate-200/80 shadow-xs"
          : "bg-white/70 backdrop-blur-xs border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs"
            >
              M
            </motion.div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 tracking-tight text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                Malik Saad Awan
              </span>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
                AI, DevOps & Full-Stack Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with floating hover pill */}
          <nav
            onMouseLeave={() => setHoveredIdx(null)}
            className="hidden md:flex items-center gap-1 relative"
          >
            {navLinks.map((link, idx) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const isHovered = hoveredIdx === idx;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors z-10",
                    isActive
                      ? "text-slate-950 font-semibold"
                      : "text-slate-600 hover:text-slate-950"
                  )}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="navbarHoverPill"
                      className="absolute inset-0 bg-slate-100/90 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="navbarActiveIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-slate-900 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xs group"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-1 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, i) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "block px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "text-slate-900 bg-slate-100 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full text-center py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
                >
                  Let&apos;s Work Together
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
