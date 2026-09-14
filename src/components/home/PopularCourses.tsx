"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Calendar,
  Users,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Course } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PopularCoursesProps {
  courses: Course[];
}

export default function PopularCourses({ courses }: PopularCoursesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Software Engineering",
    "Data & AI",
    "Cloud & DevOps",
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Career Acceleration Cohorts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Flagship Programs Designed for Industry Impact
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Curricula continuously refined with senior engineering leaders to ensure direct workplace relevance and high placement outcomes.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, 6).map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden card-hover flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden group">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white font-medium text-xs">
                    {course.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-semibold text-xs">
                    {course.mode}
                  </span>
                </div>

                {course.discountedFees && (
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold shadow-sm">
                    Save {Math.round(((course.fees - course.discountedFees) / course.fees) * 100)}%
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      {course.availableSeats} seats left
                    </span>
                  </div>

                  <Link href={`/courses/${course.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {course.toolsAndTech.slice(0, 4).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                  {course.toolsAndTech.length > 4 && (
                    <span className="text-[11px] text-slate-400 font-medium self-center">
                      +{course.toolsAndTech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Tuition Fee</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-slate-900">
                        {formatCurrency(course.discountedFees || course.fees)}
                      </span>
                      {course.discountedFees && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatCurrency(course.fees)}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs transition-colors"
                  >
                    <span>Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
