"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
} from "lucide-react";
import { InstituteSettings } from "@/types";

interface HeroSectionProps {
  heroConfig?: InstituteSettings["heroConfig"];
}

export default function HeroSection({ heroConfig }: HeroSectionProps) {
  const badge = heroConfig?.badge || "Transforming Engineering & Leadership Potential";
  const titleLine1 = heroConfig?.titleLine1 || "Build Real Systems.";
  const titleHighlight = heroConfig?.titleHighlight || "Master Deep Tech.";
  const titleLine2 = heroConfig?.titleLine2 || "Accelerate Your Future.";
  const description =
    heroConfig?.description ||
    "At YLCC, we bridge the gap between academic theory and high-impact industry engineering. Learn from senior architects, ship production-grade systems, and fast-track your journey into global technology roles.";

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 gradient-hero border-b border-slate-200/60">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
              <span>{titleLine1} </span>
              <span className="gradient-text">{titleHighlight} </span>
              <br className="hidden sm:inline" />
              <span>{titleLine2}</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all active:scale-98"
              >
                <span>Explore Cohorts</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                <Code2 className="w-5 h-5 text-blue-600" />
                <span>View Student Projects</span>
              </Link>
            </div>

            {/* Micro value badges */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Production Capstones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ex-FAANG Architect Mentors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>180+ Active Hiring Partners</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Code Card and Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Code Terminal Card */}
              <div className="rounded-2xl bg-slate-900 text-slate-200 p-5 shadow-2xl border border-slate-800 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-slate-400 text-xs font-sans font-medium flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    ylcc-student-pipeline.ts
                  </span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <p className="text-slate-400">// Learn by engineering production software</p>
                  <p>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-300">ylccCohort</span> ={" "}
                    <span className="text-purple-400">await</span>{" "}
                    <span className="text-yellow-300">enroll</span>&#40;&#123;
                  </p>
                  <p className="pl-4 text-slate-300">
                    track: <span className="text-emerald-300">&apos;FullStack_AI_Engineering&apos;</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    mode: <span className="text-emerald-300">&apos;HandsOn_Production&apos;</span>,
                  </p>
                  <p className="pl-4 text-slate-300">
                    capstones: [<span className="text-emerald-300">&apos;RAG_System&apos;</span>, <span className="text-emerald-300">&apos;Distributed_Engine&apos;</span>],
                  </p>
                  <p className="pl-4 text-slate-300">
                    mentor: <span className="text-cyan-300">&apos;Ex-FAANG Principal Architect&apos;</span>,
                  </p>
                  <p>&#125;&#41;;</p>
                  <p className="pt-2 text-emerald-400 font-semibold">
                    &gt; Build status: 100% Ready for Global Roles
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Live Project Metric */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 animate-bounce-subtle">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">450+ Shipped</div>
                  <div className="text-xs text-slate-500 font-medium">Production Capstones</div>
                </div>
              </div>

              {/* Floating Badge 2: Placement Rating */}
              <div className="absolute -top-6 -right-4 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">94.8%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Placement Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
