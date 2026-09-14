"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/components/layout/PublicLayout";
import {
  Search,
  Clock,
  Users,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Course } from "@/types";
import { formatCurrency } from "@/lib/utils";

export default function CoursesCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        if (data.success && data.courses) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const categories = [
    "All",
    "Software Engineering",
    "Data & AI",
    "Cloud & DevOps",
    "Cybersecurity",
    "Product & Leadership",
  ];

  const modes = ["All", "In-Person", "Online", "Hybrid"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.toolsAndTech.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "All" || course.category === categoryFilter;
    const matchesMode = modeFilter === "All" || course.mode === modeFilter;
    const matchesLevel = levelFilter === "All" || course.level === levelFilter;

    return matchesSearch && matchesCategory && matchesMode && matchesLevel;
  });

  return (
    <PublicLayout>
      <div className="bg-[#faf7f2] min-h-screen">
        {/* Header Banner */}
        <section className="bg-white border-b border-[#e8e2d8] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf7f2] text-[#a16207] border border-[#e8e2d8] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Academic Programs &amp; Engineering Cohorts</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight">
              Production-Ready Cohorts for Ambitious Engineers
            </h1>
            <p className="text-[#78716c] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Hands-on technical curricula, live code reviews from ex-FAANG Principal Architects, and capstones deployed into production.
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-6 rounded-3xl border border-[#e8e2d8] shadow-sm space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#a8a29e] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by keyword, technology (e.g. Next.js, PyTorch, Docker, Kubernetes)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] text-[#1c1917] placeholder-[#a8a29e] text-sm focus:outline-none focus:border-[#a16207]"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1c1917] uppercase tracking-wider mb-1.5">
                  Domain / Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] text-[#1c1917] text-xs font-medium focus:outline-none focus:border-[#a16207]"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1c1917] uppercase tracking-wider mb-1.5">
                  Learning Mode
                </label>
                <select
                  value={modeFilter}
                  onChange={(e) => setModeFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] text-[#1c1917] text-xs font-medium focus:outline-none focus:border-[#a16207]"
                >
                  {modes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1c1917] uppercase tracking-wider mb-1.5">
                  Target Proficiency
                </label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] text-[#1c1917] text-xs font-medium focus:outline-none focus:border-[#a16207]"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(categoryFilter !== "All" ||
              modeFilter !== "All" ||
              levelFilter !== "All" ||
              searchTerm) && (
              <div className="flex items-center justify-between pt-2 border-t border-[#f5f2eb]">
                <span className="text-xs text-[#78716c]">Active filters applied</span>
                <button
                  onClick={() => {
                    setCategoryFilter("All");
                    setModeFilter("All");
                    setLevelFilter("All");
                    setSearchTerm("");
                  }}
                  className="text-xs font-semibold text-[#a16207] hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Grid */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold text-[#78716c]">
                Showing <strong className="text-[#1c1917]">{filteredCourses.length}</strong> academic programs
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-3xl bg-white border border-[#e8e2d8] h-96 animate-pulse p-6"
                  />
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="p-16 text-center bg-white rounded-3xl border border-[#e8e2d8] space-y-4 shadow-sm">
                <BookOpen className="w-12 h-12 text-[#a8a29e] mx-auto" />
                <h3 className="text-lg font-serif font-bold text-[#1c1917]">No programs match your criteria</h3>
                <p className="text-xs text-[#78716c] max-w-sm mx-auto">
                  Try adjusting the domain or mode filter to view upcoming cohorts.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-3xl bg-white border border-[#e8e2d8] overflow-hidden card-hover flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-[#faf7f2] overflow-hidden group">
                        <Image
                          src={course.thumbnailUrl}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1c1917]/85 backdrop-blur-md text-white font-semibold text-[10px]">
                          {course.category}
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#1c1917] font-semibold text-[10px] border border-[#e8e2d8]">
                          {course.mode}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-xs text-[#78716c] font-medium">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#a16207]" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#a16207]" />
                              {course.availableSeats} seats left
                            </span>
                          </div>

                          <Link href={`/courses/${course.slug}`}>
                            <h3 className="text-lg font-serif font-bold text-[#1c1917] hover:text-[#a16207] transition line-clamp-2">
                              {course.title}
                            </h3>
                          </Link>

                          <p className="text-xs text-[#78716c] line-clamp-2 leading-relaxed">
                            {course.shortDescription}
                          </p>
                        </div>

                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {course.toolsAndTech.slice(0, 4).map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-0.5 rounded-md bg-[#faf7f2] text-[#78716c] text-[10px] font-semibold border border-[#e8e2d8]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing and Action */}
                    <div className="p-6 pt-0 border-t border-[#f5f2eb] mt-4 pt-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#a8a29e]">Tuition Fee</div>
                        <div className="text-base font-serif font-bold text-[#1c1917]">
                          {formatCurrency(course.discountedFees || course.fees)}
                        </div>
                      </div>

                      <Link
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#a16207] hover:bg-[#854d0e] text-white font-semibold text-xs transition shadow-sm"
                      >
                        <span>View Syllabus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
