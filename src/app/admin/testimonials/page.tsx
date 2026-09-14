"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  Star,
  Search,
  Upload,
  X,
  CheckCircle,
  XCircle,
  ExternalLink,
  Building2,
  Video,
} from "lucide-react";
import { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    courseName: "Full-Stack Software Engineering",
    batch: "Cohort 2025-Q1",
    currentRole: "Software Development Engineer",
    company: "Amazon Web Services",
    rating: 5,
    content: "",
    videoUrl: "",
    isApproved: true,
    isFeatured: true,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      if (data.success && data.testimonials) {
        setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setFormData({
      studentName: "",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      courseName: "Full-Stack Software Engineering",
      batch: "Cohort 2025-Q1",
      currentRole: "Software Engineer",
      company: "Microsoft",
      rating: 5,
      content: "",
      videoUrl: "",
      isApproved: true,
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setEditingTestimonial(item);
    setFormData({
      studentName: item.studentName,
      photoUrl: item.photoUrl,
      courseName: item.courseName,
      batch: item.batch,
      currentRole: item.currentRole,
      company: item.company,
      rating: item.rating,
      content: item.content,
      videoUrl: item.videoUrl || "",
      isApproved: item.isApproved,
      isFeatured: item.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("type", "image");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success && data.fileUrl) {
        setFormData((prev) => ({ ...prev, photoUrl: data.fileUrl }));
        setStatusMessage({ type: "success", text: "Photo uploaded successfully!" });
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const url = "/api/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";
      const payload = editingTestimonial ? { id: editingTestimonial.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: "success",
          text: editingTestimonial ? "Testimonial updated!" : "New review submitted and approved!",
        });
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Submission failed" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleApproved = async (item: Testimonial) => {
    try {
      const res = await fetch("/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isApproved: !item.isApproved }),
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, isApproved: !t.isApproved } : t))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from ${name}?`)) return;

    try {
      const res = await fetch(`/api/testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Request failed");
    }
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Student Reviews & Testimonials</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Curate authentic student experiences, ratings, career transformations, and video reviews.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter / Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8e2d8] shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#a8a29e] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, company, or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
          />
        </div>
        <div className="text-xs text-[#78716c] font-medium">
          Showing <span className="text-[#1c1917] font-semibold">{filteredTestimonials.length}</span> reviews
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-white border border-[#e8e2d8] animate-pulse p-6" />
          ))}
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center">
          <MessageSquare className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-[#1c1917]">No reviews found</h3>
          <p className="text-sm text-[#78716c] mt-1">Add student testimonials or approve pending student feedback.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8e2d8] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#e8e2d8] shrink-0 bg-[#faf7f2]">
                      <Image src={item.photoUrl} alt={item.studentName} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-serif font-bold text-[#1c1917]">{item.studentName}</h3>
                      <p className="text-xs text-[#78716c]">{item.currentRole}</p>
                      <p className="text-xs font-semibold text-[#a16207]">{item.company}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleApproved(item)}
                    className={`px-2 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 border transition ${
                      item.isApproved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {item.isApproved ? (
                      <>
                        <CheckCircle className="w-3 h-3" /> Approved
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Pending
                      </>
                    )}
                  </button>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < item.rating ? "fill-amber-500 text-amber-500" : "text-zinc-200"
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-semibold text-[#78716c] ml-1">{item.rating}.0</span>
                </div>

                <p className="text-xs text-[#57534e] line-clamp-4 mb-4 leading-relaxed italic">
                  "{item.content}"
                </p>

                <div className="space-y-1 text-[11px] text-[#78716c] pt-3 border-t border-[#f5f2eb]">
                  <div>
                    <span className="font-medium text-[#1c1917]">Course:</span> {item.courseName}
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1917]">Batch:</span> {item.batch}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#e8e2d8]">
                {item.videoUrl ? (
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#a16207] font-semibold hover:underline"
                  >
                    <Video className="w-3.5 h-3.5" /> Video Review
                  </a>
                ) : (
                  <span className="text-xs text-[#a8a29e]">Text only</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-[#78716c] hover:bg-[#faf7f2] hover:text-[#1c1917] transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.studentName)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl border border-[#e8e2d8] shadow-2xl max-w-xl w-full p-6 sm:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d8] mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1c1917]">
                  {editingTestimonial ? "Edit Testimonial" : "Add Student Testimonial"}
                </h2>
                <p className="text-xs text-[#78716c] mt-0.5">Publish student career transformation reviews</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#78716c] hover:text-[#1c1917] rounded-xl hover:bg-[#faf7f2] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Current Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.currentRole}
                    onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                    placeholder="e.g. SDE-2"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Hiring Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Amazon Web Services"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Course Completed *</label>
                  <input
                    type="text"
                    required
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    placeholder="e.g. Full-Stack Software Engineering"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Batch / Cohort *</label>
                  <input
                    type="text"
                    required
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    placeholder="e.g. Cohort 2025-Q1"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Rating (1 to 5 Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>

              {/* Photo */}
              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Student Photo *</label>
                <div className="flex gap-3 items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#e8e2d8] shrink-0 bg-[#faf7f2]">
                    {formData.photoUrl && (
                      <Image src={formData.photoUrl} alt="Preview" fill className="object-cover" />
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                  <label className="cursor-pointer px-3 py-2 bg-white border border-[#e8e2d8] hover:bg-[#faf7f2] rounded-xl text-xs font-semibold text-[#1c1917] inline-flex items-center gap-1.5 shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-[#a16207]" />
                    <span>{uploading ? "..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Review Content *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What was the learning journey like? How did the mentors and capstone projects assist in clearing technical interviews?"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Video Testimonial URL (YouTube / Drive)</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                  <input
                    type="checkbox"
                    checked={formData.isApproved}
                    onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                  />
                  Approved for Public Website
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                  />
                  Feature on Homepage Carousel
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#e8e2d8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#78716c] hover:text-[#1c1917] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingTestimonial ? "Update Review" : "Save Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
