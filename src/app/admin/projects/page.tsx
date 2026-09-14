"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Code2,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  UploadCloud,
  X,
  Sparkles,
  ExternalLink,
  FileText,
  FileArchive,
  Star,
  Search,
} from "lucide-react";
import { Project } from "@/types";
import { slugify, formatDate } from "@/lib/utils";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    category: "Full-Stack Web" as Project["category"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    newTech: "",
    topics: ["System Architecture & Core APIs", "Distributed Database Modeling"],
    newTopic: "",
    contributors: [{ name: "Student Engineer", role: "Full-Stack Developer", linkedinUrl: "" }],
    mentorName: "Arjun Venkataraman",
    mentorDesignation: "Principal Architect, ex-Amazon",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [] as string[],
    demoVideoUrl: "",
    liveDemoUrl: "",
    githubUrl: "",
    pdfReportUrl: "",
    zipSourceUrl: "",
    completionDate: new Date().toISOString().split("T")[0],
    academicBatch: "Winter Cohort 2025-26",
    isFeatured: false,
    isPublished: true,
  });

  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingZip, setUploadingZip] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects?all=true");
      const data = await res.json();
      if (data.success && data.projects) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to fetch admin projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFileUpload = async (file: File, type: "cover" | "gallery" | "pdf" | "zip") => {
    const data = new FormData();
    data.append("file", file);

    if (type === "cover") setUploadingCover(true);
    if (type === "gallery") setUploadingGallery(true);
    if (type === "pdf") setUploadingPdf(true);
    if (type === "zip") setUploadingZip(true);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");

      if (type === "cover") {
        setFormData((prev) => ({ ...prev, coverImage: json.url }));
      } else if (type === "gallery") {
        setFormData((prev) => ({ ...prev, galleryImages: [...prev.galleryImages, json.url] }));
      } else if (type === "pdf") {
        setFormData((prev) => ({ ...prev, pdfReportUrl: json.url }));
      } else if (type === "zip") {
        setFormData((prev) => ({ ...prev, zipSourceUrl: json.url }));
      }
    } catch (err: any) {
      alert("File upload error: " + err.message);
    } finally {
      if (type === "cover") setUploadingCover(false);
      if (type === "gallery") setUploadingGallery(false);
      if (type === "pdf") setUploadingPdf(false);
      if (type === "zip") setUploadingZip(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      category: "Full-Stack Web",
      technologies: ["Next.js", "TypeScript", "PostgreSQL"],
      newTech: "",
      topics: [],
      newTopic: "",
      contributors: [{ name: "", role: "Full-Stack Developer", linkedinUrl: "" }],
      mentorName: "Arjun Venkataraman",
      mentorDesignation: "Principal Architect, ex-Amazon",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      galleryImages: [],
      demoVideoUrl: "",
      liveDemoUrl: "",
      githubUrl: "",
      pdfReportUrl: "",
      zipSourceUrl: "",
      completionDate: new Date().toISOString().split("T")[0],
      academicBatch: "Winter Cohort 2025-26",
      isFeatured: false,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      shortDescription: proj.shortDescription,
      fullDescription: proj.fullDescription,
      category: proj.category,
      technologies: proj.technologies,
      newTech: "",
      topics: proj.topics || [],
      newTopic: "",
      contributors:
        proj.contributors.length > 0
          ? proj.contributors.map((c) => ({
              name: c.name,
              role: c.role,
              linkedinUrl: c.linkedinUrl || "",
            }))
          : [{ name: "", role: "", linkedinUrl: "" }],
      mentorName: proj.mentorName,
      mentorDesignation: proj.mentorDesignation,
      coverImage: proj.coverImage,
      galleryImages: proj.galleryImages || [],
      demoVideoUrl: proj.demoVideoUrl || "",
      liveDemoUrl: proj.liveDemoUrl || "",
      githubUrl: proj.githubUrl || "",
      pdfReportUrl: proj.pdfReportUrl || "",
      zipSourceUrl: proj.zipSourceUrl || "",
      completionDate: proj.completionDate,
      academicBatch: proj.academicBatch,
      isFeatured: proj.isFeatured,
      isPublished: proj.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      slug: formData.slug ? slugify(formData.slug) : slugify(formData.title),
      contributors: formData.contributors.filter((c) => c.name.trim()),
    };

    try {
      if (editingProject) {
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingProject.id, ...payload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setFeedback({ type: "success", message: "Project updated successfully!" });
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setFeedback({ type: "success", message: "New project created and published!" });
      }

      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      alert("Submission failed: " + err.message);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setFeedback({ type: "success", message: "Project deleted successfully" });
      fetchProjects();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleTogglePublish = async (proj: Project) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: proj.id, isPublished: !proj.isPublished }),
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (proj: Project) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: proj.id, isFeatured: !proj.isFeatured }),
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Student &amp; Faculty Projects Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Upload new capstones, manage gallery media, attach architecture PDFs, and toggle live visibility.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Upload New Project</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-2xl flex items-center justify-between text-xs font-semibold ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="text-stone-400 hover:text-stone-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by title or technology..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-amber-700"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Full-Stack Web">Full-Stack Web</option>
            <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
            <option value="Cloud Architecture">Cloud Architecture</option>
            <option value="IoT & Hardware">IoT &amp; Hardware</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Project Title &amp; Category</th>
                <th className="py-3.5 px-4">Batch</th>
                <th className="py-3.5 px-4">Mentor</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400 font-medium">
                    Loading projects...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400 font-medium">
                    No projects found. Click &ldquo;Upload New Project&rdquo; to add one.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          className="w-10 h-10 rounded-xl object-cover border border-stone-200"
                        />
                        <div>
                          <Link
                            href={`/projects/${p.slug}`}
                            target="_blank"
                            className="font-bold text-stone-900 hover:text-amber-800 text-xs flex items-center gap-1"
                          >
                            <span>{p.title}</span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </Link>
                          <div className="text-[11px] text-stone-400 mt-0.5">{p.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-stone-700">{p.academicBatch}</td>
                    <td className="py-4 px-4">{p.mentorName}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeatured(p)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          p.isFeatured
                            ? "bg-amber-100 border-amber-300 text-amber-900"
                            : "bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-700"
                        }`}
                        title={p.isFeatured ? "Unset Featured" : "Set Featured"}
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTogglePublish(p)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                          p.isPublished
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-stone-100 text-stone-600 border-stone-200"
                        }`}
                      >
                        {p.isPublished ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-stone-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 text-stone-400 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Project"
                        >
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

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  {editingProject ? "Edit Capstone Project" : "Upload New Capstone Project"}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Uploaded files persist in storage and display on the live projects showcase.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({
                        ...formData,
                        title: val,
                        slug: slugify(val),
                      });
                    }}
                    placeholder="e.g. MediSync AI Triage Assistant"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Unique URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                    placeholder="medisync-ai-triage"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-amber-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-amber-700"
                  >
                    <option value="Full-Stack Web">Full-Stack Web</option>
                    <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="IoT & Hardware">IoT &amp; Hardware</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Academic Batch *</label>
                  <input
                    type="text"
                    required
                    value={formData.academicBatch}
                    onChange={(e) => setFormData({ ...formData, academicBatch: e.target.value })}
                    placeholder="Winter Cohort 2025-26"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Completion Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Concise overview for cards and listings..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-amber-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Technical Description *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed engineering breakdown, architecture decisions, load tests, and outcomes..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden focus:border-amber-700"
                />
              </div>

              {/* Technologies Stack */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">Technologies &amp; Architecture Stack</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.newTech}
                    onChange={(e) => setFormData({ ...formData, newTech: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (formData.newTech.trim() && !formData.technologies.includes(formData.newTech.trim())) {
                          setFormData({
                            ...formData,
                            technologies: [...formData.technologies, formData.newTech.trim()],
                            newTech: "",
                          });
                        }
                      }
                    }}
                    placeholder="e.g. Next.js, PyTorch, Go (Press Enter or Add)"
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.newTech.trim() && !formData.technologies.includes(formData.newTech.trim())) {
                        setFormData({
                          ...formData,
                          technologies: [...formData.technologies, formData.newTech.trim()],
                          newTech: "",
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 border border-stone-300 font-semibold hover:bg-stone-200 text-stone-800"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            technologies: formData.technologies.filter((tech) => tech !== t),
                          })
                        }
                        className="text-stone-400 hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Topics / Key Deliverables */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Project Topics &amp; Core Architectural Highlights
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.newTopic}
                    onChange={(e) => setFormData({ ...formData, newTopic: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (formData.newTopic.trim() && !formData.topics.includes(formData.newTopic.trim())) {
                          setFormData({
                            ...formData,
                            topics: [...formData.topics, formData.newTopic.trim()],
                            newTopic: "",
                          });
                        }
                      }
                    }}
                    placeholder="e.g. Sub-millisecond tick ingestion, Distributed Redis caching (Press Enter or Add)"
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (formData.newTopic.trim() && !formData.topics.includes(formData.newTopic.trim())) {
                        setFormData({
                          ...formData,
                          topics: [...formData.topics, formData.newTopic.trim()],
                          newTopic: "",
                        });
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 border border-stone-300 font-semibold hover:bg-stone-200 text-stone-800"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  {formData.topics.map((top, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-900 text-xs font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>{top}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            topics: formData.topics.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-stone-400 hover:text-rose-600 ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cover Image & File Attachments */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px]">
                  Media &amp; File Attachments
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Cover Image */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Cover Image</label>
                    <div className="flex items-center gap-3">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-14 h-14 rounded-xl object-cover border border-stone-300 shrink-0"
                      />
                      <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 transition-colors">
                        <span>{uploadingCover ? "Uploading..." : "Upload Cover"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "cover");
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Architecture PDF */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Architecture Report (PDF)</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 transition-colors">
                        <span>{uploadingPdf ? "Uploading..." : "Upload PDF"}</span>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "pdf");
                          }}
                          className="hidden"
                        />
                      </label>
                      {formData.pdfReportUrl && (
                        <span className="text-[11px] text-emerald-700 font-medium truncate">
                          PDF Attached
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* ZIP Source Code */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Source Code Archive (ZIP)</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 transition-colors">
                        <span>{uploadingZip ? "Uploading..." : "Upload ZIP"}</span>
                        <input
                          type="file"
                          accept=".zip"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "zip");
                          }}
                          className="hidden"
                        />
                      </label>
                      {formData.zipSourceUrl && (
                        <span className="text-[11px] text-emerald-700 font-medium truncate">
                          ZIP Attached
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Additional Gallery Image */}
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Gallery Screenshots</label>
                    <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 transition-colors inline-block">
                      <span>{uploadingGallery ? "Adding image..." : "+ Add Screenshot"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "gallery");
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {formData.galleryImages.length > 0 && (
                  <div className="flex gap-2 pt-2 overflow-x-auto">
                    {formData.galleryImages.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-12 rounded-lg overflow-hidden border border-stone-300 shrink-0">
                        <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              galleryImages: prev.galleryImages.filter((_, i) => i !== idx),
                            }))
                          }
                          className="absolute top-0 right-0 bg-rose-600 text-white p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* URLs: Demo, Github, Video */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    placeholder="https://medisync.ylcc.edu.in"
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Demo Video / YouTube</label>
                  <input
                    type="url"
                    value={formData.demoVideoUrl}
                    onChange={(e) => setFormData({ ...formData, demoVideoUrl: e.target.value })}
                    placeholder="https://youtube.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              {/* Mentor and Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mentor Name</label>
                  <input
                    type="text"
                    required
                    value={formData.mentorName}
                    onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mentor Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.mentorDesignation}
                    onChange={(e) => setFormData({ ...formData, mentorDesignation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="rounded text-amber-700 focus:ring-amber-700"
                  />
                  <span className="font-bold text-stone-800">Publish to Public Gallery</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-amber-700 focus:ring-amber-700"
                  />
                  <span className="font-bold text-stone-800">Featured Highlight</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-xs uppercase tracking-wider"
                >
                  {editingProject ? "Update Project" : "Create & Publish Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
