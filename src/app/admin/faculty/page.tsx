"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit,
  Star,
  Search,
  Upload,
  CheckCircle2,
  X,
  ExternalLink,
  Mail,
  Award,
  Briefcase,
} from "lucide-react";
import { Faculty } from "@/types";
import { LinkedInIcon, GitHubIcon, TwitterIcon } from "@/components/ui/BrandIcons";

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    qualifications: "",
    expertise: ["Full-Stack Architecture", "Distributed Systems"],
    experienceYears: 10,
    bio: "",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    email: "",
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "",
      website: "",
    },
    coursesTaught: ["Full-Stack Software Engineering"],
    isFeatured: true,
    order: 1,
  });

  const [expertiseInput, setExpertiseInput] = useState("");
  const [coursesInput, setCoursesInput] = useState("");

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faculty");
      const data = await res.json();
      if (data.success && data.faculty) {
        setFaculty(data.faculty);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleOpenCreate = () => {
    setEditingFaculty(null);
    setFormData({
      name: "",
      designation: "",
      qualifications: "",
      expertise: ["Full-Stack Architecture", "Distributed Systems"],
      experienceYears: 8,
      bio: "",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      email: "",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "",
        website: "",
      },
      coursesTaught: ["Full-Stack Software Engineering"],
      isFeatured: true,
      order: faculty.length + 1,
    });
    setExpertiseInput("");
    setCoursesInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Faculty) => {
    setEditingFaculty(item);
    setFormData({
      name: item.name,
      designation: item.designation,
      qualifications: item.qualifications,
      expertise: item.expertise || [],
      experienceYears: item.experienceYears || 5,
      bio: item.bio || "",
      photoUrl: item.photoUrl,
      email: item.email || "",
      socialLinks: {
        linkedin: item.socialLinks?.linkedin || "",
        github: item.socialLinks?.github || "",
        twitter: item.socialLinks?.twitter || "",
        website: item.socialLinks?.website || "",
      },
      coursesTaught: item.coursesTaught || [],
      isFeatured: item.isFeatured,
      order: item.order || 1,
    });
    setExpertiseInput("");
    setCoursesInput("");
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

  const addExpertise = () => {
    if (!expertiseInput.trim()) return;
    if (!formData.expertise.includes(expertiseInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        expertise: [...prev.expertise, expertiseInput.trim()],
      }));
    }
    setExpertiseInput("");
  };

  const removeExpertise = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.filter((t) => t !== tag),
    }));
  };

  const addCourseTaught = () => {
    if (!coursesInput.trim()) return;
    if (!formData.coursesTaught.includes(coursesInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        coursesTaught: [...prev.coursesTaught, coursesInput.trim()],
      }));
    }
    setCoursesInput("");
  };

  const removeCourseTaught = (course: string) => {
    setFormData((prev) => ({
      ...prev,
      coursesTaught: prev.coursesTaught.filter((c) => c !== course),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const url = "/api/faculty";
      const method = editingFaculty ? "PUT" : "POST";
      const payload = editingFaculty ? { id: editingFaculty.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: "success",
          text: editingFaculty ? "Faculty mentor updated!" : "Faculty mentor created successfully!",
        });
        setIsModalOpen(false);
        fetchFaculty();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Submission failed" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from faculty directory?`)) return;

    try {
      const res = await fetch(`/api/faculty?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setFaculty((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Request failed");
    }
  };

  const filteredFaculty = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Faculty & Mentors</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Manage your institute's distinguished professors, industry advisors, and curriculum leaders.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Faculty Mentor
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

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8e2d8] shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#a8a29e] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, designation, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
          />
        </div>
        <div className="text-xs text-[#78716c] font-medium">
          Showing <span className="text-[#1c1917] font-semibold">{filteredFaculty.length}</span> faculty members
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-white border border-[#e8e2d8] animate-pulse p-6" />
          ))}
        </div>
      ) : filteredFaculty.length === 0 ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center">
          <GraduationCap className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-[#1c1917]">No faculty members found</h3>
          <p className="text-sm text-[#78716c] mt-1">Try refining your search terms or add a new faculty mentor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8e2d8] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#e8e2d8] shrink-0 bg-[#faf7f2]">
                    <Image src={item.photoUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-serif font-bold text-[#1c1917] truncate">{item.name}</h3>
                      {item.isFeatured && (
                        <span className="shrink-0 text-amber-600" title="Featured Spotlight">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#a16207] truncate">{item.designation}</p>
                    <p className="text-xs text-[#78716c] mt-0.5 truncate">{item.qualifications}</p>
                  </div>
                </div>

                <p className="text-xs text-[#57534e] line-clamp-3 mb-4 leading-relaxed">{item.bio}</p>

                <div className="space-y-2 mb-4 pt-3 border-t border-[#f5f2eb]">
                  <div className="flex items-center gap-2 text-xs text-[#78716c]">
                    <Briefcase className="w-3.5 h-3.5 text-[#a16207]" />
                    <span>{item.experienceYears} Years Industry Experience</span>
                  </div>
                  {item.email && (
                    <div className="flex items-center gap-2 text-xs text-[#78716c] truncate">
                      <Mail className="w-3.5 h-3.5 text-[#a16207]" />
                      <span className="truncate">{item.email}</span>
                    </div>
                  )}
                </div>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.expertise?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[#faf7f2] border border-[#e8e2d8] text-[#78716c]"
                    >
                      {tag}
                    </span>
                  ))}
                  {item.expertise?.length > 3 && (
                    <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[#faf7f2] text-[#78716c]">
                      +{item.expertise.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#e8e2d8]">
                <div className="flex items-center gap-2">
                  {item.socialLinks?.linkedin && (
                    <a
                      href={item.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#78716c] hover:text-[#0077b5] transition"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {item.socialLinks?.github && (
                    <a
                      href={item.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#78716c] hover:text-[#1c1917] transition"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-[#78716c] hover:bg-[#faf7f2] hover:text-[#1c1917] transition"
                    title="Edit Profile"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                    title="Delete Mentor"
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
          <div className="bg-white rounded-3xl border border-[#e8e2d8] shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d8] mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1c1917]">
                  {editingFaculty ? "Edit Faculty Mentor" : "Add New Faculty Mentor"}
                </h2>
                <p className="text-xs text-[#78716c] mt-0.5">Fill in mentor credentials and professional expertise</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#78716c] hover:text-[#1c1917] rounded-xl hover:bg-[#faf7f2] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Priya Ramamurthy"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Head of AI Systems, ex-Google"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Qualifications *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    placeholder="e.g. Ph.D. Computer Science (IISc)"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Years of Experience</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              {/* Photo Upload & URL */}
              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Mentor Photo *</label>
                <div className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#e8e2d8] shrink-0 bg-[#faf7f2]">
                    {formData.photoUrl && (
                      <Image src={formData.photoUrl} alt="Preview" fill className="object-cover" />
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    placeholder="Image URL or upload below"
                    className="flex-1 px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                  <label className="cursor-pointer px-3 py-2 bg-white border border-[#e8e2d8] hover:bg-[#faf7f2] rounded-xl text-xs font-semibold text-[#1c1917] inline-flex items-center gap-1.5 shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-[#a16207]" />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Professional Bio *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Detail academic pedigree, industry leadership, research patents, and teaching philosophy..."
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              {/* Expertise Tags */}
              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Domain Expertise Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addExpertise();
                      }
                    }}
                    placeholder="Type skill & press Add (e.g. Distributed SQL)"
                    className="flex-1 px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                  <button
                    type="button"
                    onClick={addExpertise}
                    className="px-3.5 py-2 bg-white border border-[#e8e2d8] rounded-xl text-xs font-semibold hover:bg-[#faf7f2] transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.expertise.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#faf7f2] border border-[#e8e2d8] text-xs text-[#1c1917]"
                    >
                      {tag}
                      <button type="button" onClick={() => removeExpertise(tag)} className="text-[#a8a29e] hover:text-rose-500">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="mentor@ylcc.edu.in"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                  />
                  Feature on Homepage Spotlight
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
                  {submitting ? "Saving..." : editingFaculty ? "Update Faculty" : "Add Faculty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
