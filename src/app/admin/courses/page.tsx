"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  ExternalLink,
  Users,
  Clock,
} from "lucide-react";
import { Course } from "@/types";
import { formatCurrency, slugify } from "@/lib/utils";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    category: "Software Engineering" as Course["category"],
    level: "All Levels" as Course["level"],
    mode: "Hybrid" as Course["mode"],
    duration: "16 Weeks",
    durationWeeks: 16,
    fees: 55000,
    discountedFees: 45000,
    instructorName: "Arjun Venkataraman",
    instructorRole: "Principal Architect, ex-Amazon",
    batchTiming: "Weekends (10 AM - 4 PM)",
    startDate: new Date().toISOString().split("T")[0],
    availableSeats: 15,
    totalSeats: 30,
    isFeatured: true,
    isPublished: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    toolsAndTech: ["TypeScript", "Next.js", "Docker", "PostgreSQL"],
    learningOutcomes: ["Architect distributed full-stack applications", "Model scalable databases"],
    eligibility: ["Basic programming familiarity in any language"],
    modules: [
      {
        id: "mod-1",
        title: "Foundations & Core Architecture",
        durationWeeks: 4,
        description: "Core asynchronous JavaScript and system design.",
        topics: ["Event Loop", "Closures", "TypeScript generics"],
      },
    ],
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/courses?all=true");
      const data = await res.json();
      if (data.success && data.courses) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      category: "Software Engineering",
      level: "All Levels",
      mode: "Hybrid",
      duration: "16 Weeks",
      durationWeeks: 16,
      fees: 55000,
      discountedFees: 45000,
      instructorName: "Arjun Venkataraman",
      instructorRole: "Principal Architect, ex-Amazon",
      batchTiming: "Weekends (10 AM - 4 PM)",
      startDate: new Date().toISOString().split("T")[0],
      availableSeats: 15,
      totalSeats: 30,
      isFeatured: true,
      isPublished: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      toolsAndTech: ["TypeScript", "Next.js", "Docker", "PostgreSQL"],
      learningOutcomes: ["Architect distributed full-stack applications", "Model scalable databases"],
      eligibility: ["Basic programming familiarity in any language"],
      modules: [
        {
          id: "mod-1",
          title: "Foundations & Core Architecture",
          durationWeeks: 4,
          description: "Core asynchronous JavaScript and system design.",
          topics: ["Event Loop", "Closures", "TypeScript generics"],
        },
      ],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setEditingCourse(c);
    setFormData({
      title: c.title,
      slug: c.slug,
      shortDescription: c.shortDescription,
      fullDescription: c.fullDescription,
      category: c.category,
      level: c.level,
      mode: c.mode,
      duration: c.duration,
      durationWeeks: c.durationWeeks,
      fees: c.fees,
      discountedFees: c.discountedFees || c.fees,
      instructorName: c.instructorName,
      instructorRole: c.instructorRole,
      batchTiming: c.batchTiming,
      startDate: c.startDate,
      availableSeats: c.availableSeats,
      totalSeats: c.totalSeats,
      isFeatured: c.isFeatured,
      isPublished: c.isPublished,
      thumbnailUrl: c.thumbnailUrl,
      toolsAndTech: c.toolsAndTech,
      learningOutcomes: c.learningOutcomes,
      eligibility: c.eligibility,
      modules: c.modules,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug ? slugify(formData.slug) : slugify(formData.title),
    };

    try {
      if (editingCourse) {
        const res = await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCourse.id, ...payload }),
        });
        if (!res.ok) throw new Error("Failed to update course");
      } else {
        const res = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create course");
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete course "${title}"?`)) return;
    try {
      await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Academic Courses &amp; Cohorts
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Manage course curriculum, batch schedules, fees, and publishing status.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Create New Course</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Course</th>
                <th className="py-3.5 px-4">Mode / Level</th>
                <th className="py-3.5 px-4">Fees</th>
                <th className="py-3.5 px-4">Seats Remaining</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">Loading courses...</td>
                </tr>
              ) : (
                courses.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={c.thumbnailUrl} alt={c.title} className="w-10 h-10 rounded-xl object-cover border border-stone-200" />
                        <div>
                          <Link href={`/courses/${c.slug}`} target="_blank" className="font-bold text-stone-900 hover:text-amber-800 text-xs flex items-center gap-1">
                            <span>{c.title}</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </Link>
                          <div className="text-[11px] text-stone-400">{c.category} • {c.duration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-stone-700">{c.mode} • {c.level}</td>
                    <td className="py-4 px-4 font-bold text-stone-900">{formatCurrency(c.discountedFees || c.fees)}</td>
                    <td className="py-4 px-4">{c.availableSeats} of {c.totalSeats}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${c.isPublished ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-stone-100 text-stone-600 border-stone-200"}`}>
                        {c.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => handleOpenEdit(c)} className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(c.id, c.title)} className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h2 className="text-xl font-bold text-stone-900">{editingCourse ? "Edit Course" : "Create New Course"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: slugify(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data & AI">Data &amp; AI</option>
                    <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Product & Leadership">Product &amp; Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mode</label>
                  <select
                    value={formData.mode}
                    onChange={(e: any) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Tuition Fees (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.fees}
                    onChange={(e) => setFormData({ ...formData, fees: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-amber-700 focus:ring-amber-700"
                  />
                  <span className="font-bold text-stone-800">Published to Catalog</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-stone-900 text-amber-50 rounded-xl font-bold uppercase">
                  {editingCourse ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
