import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "success" | "warning" | "info" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full tracking-wide transition-colors";

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  const variantStyles = {
    default: "bg-slate-100 text-slate-800 border border-slate-200/80",
    outline: "border border-slate-300 text-slate-700 bg-transparent",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/80",
    info: "bg-blue-50 text-blue-700 border border-blue-200/80",
    neutral: "bg-slate-900 text-white border border-slate-900",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {children}
    </span>
  );
}
