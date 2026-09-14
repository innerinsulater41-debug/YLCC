"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone,
} from "lucide-react";

export default function StudentLoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/student-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/portal");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("student@ylcc.edu.in");
    setPassword("Student@YLCC2026!");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/student-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "student@ylcc.edu.in",
          password: "Student@YLCC2026!",
          fullName: "Karan Singhal",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Demo login failed");
      router.push("/portal");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900">
                YLCC
              </span>
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                Student & Learner Portal
              </span>
            </div>
          </Link>
        </div>

        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isRegister ? "Create Your Student Account" : "Sign In to Student Portal"}
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-600">
          Access your enrolled cohorts, course lectures, assignments, and certificates.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200 space-y-6">
          {/* Quick Demo Login Pill */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-between gap-3">
            <div className="text-xs text-blue-900">
              <span className="font-bold">Instant Demo:</span> Karan Singhal (Enrolled Student)
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              1-Click Login
            </button>
          </div>

          {/* Tab switch */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isRegister
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isRegister
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Register New
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Karan Singhal"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@ylcc.edu.in"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Please wait...</span>
              ) : (
                <>
                  <span>{isRegister ? "Complete Registration" : "Sign In to Portal"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              ← Back to Main Website
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 hover:text-slate-800 font-medium"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
