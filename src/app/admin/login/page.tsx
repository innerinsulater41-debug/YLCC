"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@ylcc.edu.in");
  const [password, setPassword] = useState("Admin@YLCC2026!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = (role: "admin" | "editor") => {
    if (role === "admin") {
      setEmail("admin@ylcc.edu.in");
      setPassword("Admin@YLCC2026!");
    } else {
      setEmail("editor@ylcc.edu.in");
      setPassword("Editor@YLCC2026!");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-3xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 shadow-xl">
            <Shield className="w-8 h-8" />
          </div>
        </div>
        <h1 className="mt-6 text-center text-3xl font-black tracking-tight text-stone-900">
          YLCC Administration
        </h1>
        <p className="mt-2 text-center text-xs text-stone-500">
          Protected portal for institutional management and content administration.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-stone-200 space-y-6">
          {/* Quick Credential Fill Helpers */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
              <span>Development Test Credentials</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillTestCredentials("admin")}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-white border border-amber-300 text-[11px] font-semibold text-amber-900 hover:bg-amber-100/50 transition-colors cursor-pointer"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillTestCredentials("editor")}
                className="flex-1 py-1.5 px-2.5 rounded-xl bg-white border border-amber-300 text-[11px] font-semibold text-amber-900 hover:bg-amber-100/50 transition-colors cursor-pointer"
              >
                Academics Editor
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-stone-100 text-center">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors font-medium"
            >
              ← Return to Public Institute Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
