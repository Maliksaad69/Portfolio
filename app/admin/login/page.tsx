"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("awansaad6927@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabaseConfigured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      // Check against configured secure administrator credentials
      const isValidAdmin =
        normalizedEmail === "awansaad6927@gmail.com" &&
        (normalizedPassword === "<P@r@d0x224>" ||
          normalizedPassword === "P@r@d0x224" ||
          normalizedPassword === "<Parad0x224>" ||
          normalizedPassword === "Parad0x224");

      if (supabaseConfigured) {
        const supabase = createClient();
        if (supabase) {
          const { error: authError } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: normalizedPassword,
          });
          // If Supabase rejected but it matches authorized administrator credentials, allow fallback
          if (authError && !isValidAdmin) {
            throw authError;
          }
        }
      } else if (!isValidAdmin) {
        throw new Error("Invalid administrative credentials. Access restricted to authorized administrator.");
      }

      // Successful auth: record session & administrative identity
      sessionStorage.setItem("admin_authenticated", "true");
      sessionStorage.setItem(
        "admin_user",
        JSON.stringify({
          email: "awansaad6927@gmail.com",
          name: "Malik Saad Awan",
          role: "Super Administrator",
          authenticated_at: new Date().toISOString(),
        })
      );
      document.cookie = "admin_authenticated=true; path=/; max-age=86400; SameSite=Lax";

      router.push("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid authentication credentials";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-600/25 border border-blue-400/30">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Executive CMS Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Restricted management portal for Malik Saad Awan&apos;s portfolio.
          </p>
        </div>

        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Admin Identity Badge */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Profile:</span>
            </div>
            <span className="text-blue-400 font-semibold truncate max-w-[200px]">
              awansaad6927@gmail.com
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="awansaad6927@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  Access Key / Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      <span>Show</span>
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-4 shadow-lg shadow-blue-600/30"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing Session...</span>
                </>
              ) : (
                <>
                  <span>Authenticate to Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Security footnote */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>TLS 1.3 Encrypted</span>
            </span>
            <span>RLS Protected</span>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Return to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
