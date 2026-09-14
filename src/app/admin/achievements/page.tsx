"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Trophy,
  Plus,
  Trash2,
  Edit,
  Star,
  Search,
  Upload,
  X,
  ExternalLink,
  Building2,
  Calendar,
  BookOpen,
} from "lucide-react";
import { StudentAchievement } from "@/types";

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState<StudentAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<StudentAchievement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    achievementTitle: "",
    description: "",
    courseName: "Full-Stack Software Engineering",
    batch: "Cohort 2025-Q1",
    companyOrOrganizer: "Google Cloud",
    achievementDate: new Date().toISOString().split("T")[0],
    evidenceUrl: "",
    isFeatured: true,
  });

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/achievements");
      const data = await res.json();
      if (data.success && data.achievements) {
        setAchievements(data.achievements);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleOpenCreate = () => {
    setEditingAchievement(null);
    setFormData({
      studentName: "",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      achievementTitle: "",
      description: "",
      courseName: "Full-Stack Software Engineering",
      batch: "Cohort 2025-Q2",
      companyOrOrganizer: "",
      achievementDate: new Date().toISOString().split("T")[0],
      evidenceUrl: "",
      isFeatured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: StudentAchievement) => {
    setEditingAchievement(item);
    setFormData({
      studentName: item.studentName,
      photoUrl: item.photoUrl,
      achievementTitle: item.achievementTitle,
      description: item.description,
      courseName: item.courseName,
      batch: item.batch,
      companyOrOrganizer: item.companyOrOrganizer || "",
      achievementDate: item.achievementDate,
      evidenceUrl: item.evidenceUrl || "",
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
        setStatusMessage({ type: "success", text: "Student photo uploaded!" });
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
      const url = "/api/achievements";
      const method = editingAchievement ? "PUT" : "POST";
      const payload = editingAchievement ? { id: editingAchievement.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: "success",
          text: editingAchievement ? "Achievement updated!" : "New student achievement recorded!",
        });
        setIsModalOpen(false);
        fetchAchievements();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Submission failed" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete achievement: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/achievements?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAchievements((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Request failed");
    }
  };

  const filteredAchievements = achievements.filter(
    (a) =>
      a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.achievementTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.companyOrOrganizer && a.companyOrOrganizer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Student Achievements</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Showcase placement wins, hackathon victories, global fellowships, and industry accolades.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Achievement
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
            placeholder="Search by student, title, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
          />
        </div>
        <div className="text-xs text-[#78716c] font-medium">
          Showing <span className="text-[#1c1917] font-semibold">{filteredAchievements.length}</span> records
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-white border border-[#e8e2d8] animate-pulse p-6" />
          ))}
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center">
          <Trophy className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-[#1c1917]">No achievements found</h3>
          <p className="text-sm text-[#78716c] mt-1">Add student placement achievements or competition wins.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8e2d8] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#e8e2d8] shrink-0 bg-[#faf7f2]">
                    <Image src={item.photoUrl} alt={item.studentName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-serif font-bold text-[#1c1917] truncate">{item.studentName}</h3>
                      {item.isFeatured && (
                        <span className="shrink-0 text-amber-600" title="Featured Spotlight">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#78716c] truncate">{item.batch}</p>
                    <p className="text-xs font-semibold text-[#a16207] truncate mt-0.5">{item.achievementTitle}</p>
                  </div>
                </div>

                <p className="text-xs text-[#57534e] line-clamp-3 mb-4 leading-relaxed">{item.description}</p>

                <div className="space-y-1.5 text-xs text-[#78716c] pt-3 border-t border-[#f5f2eb]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#a16207]" />
                    <span className="truncate">{item.courseName}</span>
                  </div>
                  {item.companyOrOrganizer && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#a16207]" />
                      <span className="truncate">{item.companyOrOrganizer}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#a16207]" />
                    <span>{item.achievementDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#e8e2d8]">
                {item.evidenceUrl ? (
                  <a
                    href={item.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#a16207] font-semibold hover:underline"
                  >
                    Evidence <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-[#a8a29e]">No link</span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-[#78716c] hover:bg-[#faf7f2] hover:text-[#1c1917] transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.achievementTitle)}
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
                  {editingAchievement ? "Edit Achievement" : "Add Student Achievement"}
                </h2>
                <p className="text-xs text-[#78716c] mt-0.5">Celebrate alumni and student milestone successes</p>
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
                    placeholder="e.g. Rohan Nair"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>

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
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Achievement Headline *</label>
                <input
                  type="text"
                  required
                  value={formData.achievementTitle}
                  onChange={(e) => setFormData({ ...formData, achievementTitle: e.target.value })}
                  placeholder="e.g. Selected as Software Engineer at Google (34 LPA CTC)"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Course Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    placeholder="e.g. Full-Stack Software Engineering"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Company / Organizer</label>
                  <input
                    type="text"
                    value={formData.companyOrOrganizer}
                    onChange={(e) => setFormData({ ...formData, companyOrOrganizer: e.target.value })}
                    placeholder="e.g. Microsoft / Smart India Hackathon"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
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
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Description / Story *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share details of the interview rounds, offer package, or competition rank..."
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.achievementDate}
                    onChange={(e) => setFormData({ ...formData, achievementDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Offer Letter / Proof URL</label>
                  <input
                    type="url"
                    value={formData.evidenceUrl}
                    onChange={(e) => setFormData({ ...formData, evidenceUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                  />
                  Feature in Placement Hall of Fame
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
                  {submitting ? "Saving..." : editingAchievement ? "Update Record" : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
