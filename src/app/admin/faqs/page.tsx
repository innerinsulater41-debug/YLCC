"use client";

import { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Search,
  X,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";
import { FAQItem } from "@/types";

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General" as FAQItem["category"],
    order: 1,
    isPublished: true,
  });

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      if (data.success && data.faqs) {
        setFaqs(data.faqs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleOpenCreate = () => {
    setEditingFAQ(null);
    setFormData({
      question: "",
      answer: "",
      category: "General",
      order: faqs.length + 1,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: FAQItem) => {
    setEditingFAQ(item);
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category,
      order: item.order || 1,
      isPublished: item.isPublished,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const url = "/api/faqs";
      const method = editingFAQ ? "PUT" : "POST";
      const payload = editingFAQ ? { id: editingFAQ.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: "success",
          text: editingFAQ ? "FAQ updated successfully!" : "New FAQ created!",
        });
        setIsModalOpen(false);
        fetchFaqs();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Submission failed" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (item: FAQItem) => {
    try {
      const res = await fetch("/api/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, isPublished: !item.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setFaqs((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, isPublished: !f.isPublished } : f))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ question?")) return;

    try {
      const res = await fetch(`/api/faqs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Request failed");
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Frequently Asked Questions</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Answer applicant queries regarding curriculum, cohort batches, scholarships, and placements.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add FAQ
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

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8e2d8] shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#a8a29e] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {["All", "Admissions", "Courses", "Placements", "General"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? "bg-[#1c1917] text-white border-[#1c1917]"
                  : "bg-[#faf7f2] text-[#78716c] border-[#e8e2d8] hover:text-[#1c1917]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-white border border-[#e8e2d8] animate-pulse" />
          ))}
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center">
          <HelpCircle className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-[#1c1917]">No FAQ questions found</h3>
          <p className="text-sm text-[#78716c] mt-1">Create helpful answers to assist prospective students.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8e2d8] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#faf7f2] border border-[#e8e2d8] text-[#a16207]">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-[#a8a29e] font-mono">Order: #{item.order}</span>
                  {!item.isPublished && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-600">
                      Draft / Hidden
                    </span>
                  )}
                </div>

                <h3 className="text-base font-serif font-bold text-[#1c1917] mb-2">{item.question}</h3>
                <p className="text-xs text-[#57534e] leading-relaxed whitespace-pre-line">{item.answer}</p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#f5f2eb]">
                <button
                  onClick={() => handleTogglePublish(item)}
                  className={`p-2 rounded-xl border transition ${
                    item.isPublished
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100"
                  }`}
                  title={item.isPublished ? "Visible (Click to hide)" : "Hidden (Click to publish)"}
                >
                  {item.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 rounded-xl text-[#78716c] hover:bg-[#faf7f2] hover:text-[#1c1917] border border-[#e8e2d8] transition"
                  title="Edit FAQ"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 border border-rose-200 transition"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
                  {editingFAQ ? "Edit FAQ" : "Add Frequently Asked Question"}
                </h2>
                <p className="text-xs text-[#78716c] mt-0.5">Provide clear answers to candidate inquiries</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-[#78716c] hover:text-[#1c1917] rounded-xl hover:bg-[#faf7f2] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as FAQItem["category"] })}
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                >
                  <option value="General">General Inquiries</option>
                  <option value="Admissions">Admissions & Eligibility</option>
                  <option value="Courses">Courses & Curriculum</option>
                  <option value="Placements">Placements & Hiring Partners</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. Do I need prior coding experience to join the Full-Stack track?"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Comprehensive response..."
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                    />
                    Published on Website
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e8e2d8]">
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
                  {submitting ? "Saving..." : editingFAQ ? "Update FAQ" : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
