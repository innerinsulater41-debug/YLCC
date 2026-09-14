"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Calendar,
  FileText,
  Award,
  Video,
  LogOut,
  ExternalLink,
  Sparkles,
  Layers,
  User,
  ArrowRight,
} from "lucide-react";

export default function StudentPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/student-login");
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          // If not logged in, redirect to student login
          router.push("/login");
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/student-login", { method: "DELETE" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 font-medium">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading student portal...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Portal Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-slate-900">YLCC</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Student Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                {user.fullName ? user.fullName[0] : "S"}
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-slate-900">{user.fullName}</div>
                <div className="text-slate-500">{user.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cohort 2026 Live Session Active</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome Back, {user.fullName}!
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Track your weekly sprint milestones, access your cloud lab sandboxes, submit code reviews, and prepare for your upcoming capstone defense.
            </p>
          </div>
        </div>

        {/* 3 Overview Quick Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Track</span>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-slate-900">
              Full-Stack Software Engineering
            </div>
            <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sprint 6 of 12: In Progress</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Attendance & Labs</span>
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">96.4%</div>
            <div className="text-xs text-slate-500">
              18 of 19 lab modules completed
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Next Live Class</span>
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">
              Today at 7:00 PM IST
            </div>
            <div className="text-xs text-slate-500">
              Topic: Distributed PostgreSQL Transactions
            </div>
          </div>
        </div>

        {/* Active Cohorts & Live Lecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Enrolled Program details */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                    Enrolled Program
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Full-Stack Software Engineering & Microservices
                  </h2>
                </div>

                <a
                  href="https://zoom.us"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 shrink-0"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Live Lecture Room</span>
                </a>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">Course Completion</span>
                  <span className="text-blue-600">50% Completed</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="w-1/2 h-full bg-blue-600 rounded-full" />
                </div>
              </div>

              {/* Modules list */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900">Syllabus Milestones</h3>
                <div className="space-y-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          Module 1: Strict TypeScript & Modern Asynchronous JS
                        </div>
                        <div className="text-xs text-slate-500">Completed with Grade A+</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">Done</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          Module 2: React 19 & Next.js App Router Architecture
                        </div>
                        <div className="text-xs text-slate-500">Completed with Grade A</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">Done</span>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          Module 3: PostgreSQL Optimization, Caching & Microservices
                        </div>
                        <div className="text-xs text-blue-700 font-medium">Currently in Progress (Week 6)</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-700">Active</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200/60 opacity-60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-700">
                          Module 4: Docker, Kubernetes & Production CI/CD
                        </div>
                        <div className="text-xs text-slate-500">Unlocks on June 1st</div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Locked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Links & Resources */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Resources */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Learning Resources & Sandboxes
              </h3>

              <div className="space-y-2 text-sm">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <span className="font-medium text-slate-700">Cohort GitHub Classroom</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <span className="font-medium text-slate-700">YLCC Student Discord Community</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>

                <Link
                  href="/projects"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <span className="font-medium text-slate-700">Capstone Gallery & Inspiration</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <span className="font-medium text-slate-700">Academic Counselor Helpdesk</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Mentor Office Hours */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Book 1-on-1 Mentor Office Hours
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Need debugging assistance or an architectural review? Book a 30-minute slot with Arjun Venkataraman or Dr. Rohini.
              </p>
              <button
                onClick={() => alert("Mentor scheduling calendar opening: select a 30-min slot with Arjun Venkataraman (Fridays 4-6 PM).")}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
