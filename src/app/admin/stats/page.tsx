"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  TrendingUp,
  Award,
  Users,
  Briefcase,
  Layers,
} from "lucide-react";
import { SiteStatistic } from "@/types";

const ICON_OPTIONS = [
  { label: "Trending / Career", value: "TrendingUp" },
  { label: "Award / Success", value: "Award" },
  { label: "Students / Community", value: "Users" },
  { label: "Industry / Partners", value: "Briefcase" },
  { label: "Curriculum / Tracks", value: "Layers" },
];

export default function AdminStatsPage() {
  const [stats, setStats] = useState<SiteStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<SiteStatistic | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    label: "",
    value: 100,
    suffix: "+",
    description: "",
    iconName: "TrendingUp",
    order: 1,
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success && data.statistics) {
        setStats(data.statistics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleOpenCreate = () => {
    setEditingStat(null);
    setFormData({
      label: "",
      value: 100,
      suffix: "+",
      description: "",
      iconName: "TrendingUp",
      order: stats.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: SiteStatistic) => {
    setEditingStat(item);
    setFormData({
      label: item.label,
      value: item.value,
      suffix: item.suffix,
      description: item.description,
      iconName: item.iconName,
      order: item.order || 1,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const url = "/api/stats";
      const method = editingStat ? "PUT" : "POST";
      const payload = editingStat ? { id: editingStat.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: "success",
          text: editingStat ? "Statistic counter updated!" : "New metric counter added!",
        });
        setIsModalOpen(false);
        fetchStats();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Submission failed" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Are you sure you want to delete statistic "${label}"?`)) return;

    try {
      const res = await fetch(`/api/stats?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setStats((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Request failed");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Public Metric Counters</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Update institutional milestones displayed on homepage banners (alumni placed, average CTC, hiring partners).
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Metric Counter
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

      {/* Stats Counter Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 rounded-2xl bg-white border border-[#e8e2d8] animate-pulse p-6" />
          ))}
        </div>
      ) : stats.length === 0 ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center">
          <BarChart3 className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-[#1c1917]">No metrics configured</h3>
          <p className="text-sm text-[#78716c] mt-1">Add milestone counters to feature on your homepage banner.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8e2d8] rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-[#faf7f2] border border-[#e8e2d8] flex items-center justify-center text-[#a16207]">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono text-[#a8a29e]">Order: #{item.order}</span>
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-serif font-bold text-[#1c1917] tracking-tight">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-xl font-bold text-[#a16207]">{item.suffix}</span>
                </div>

                <h3 className="text-sm font-semibold text-[#1c1917]">{item.label}</h3>
                <p className="text-xs text-[#78716c] mt-1 line-clamp-2">{item.description}</p>
              </div>

              <div className="flex items-center justify-end gap-1.5 pt-4 mt-4 border-t border-[#e8e2d8]">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg text-[#78716c] hover:bg-[#faf7f2] hover:text-[#1c1917] transition"
                  title="Edit metric"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.label)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                  title="Delete metric"
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
          <div className="bg-white rounded-3xl border border-[#e8e2d8] shadow-2xl max-w-lg w-full p-6 sm:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d8] mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1c1917]">
                  {editingStat ? "Edit Metric Counter" : "Add Metric Counter"}
                </h2>
                <p className="text-xs text-[#78716c] mt-0.5">Showcase verified statistics to visitors</p>
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
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Metric Title / Label *</label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Careers Launched"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Numeric Value *</label>
                  <input
                    type="number"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    placeholder="e.g. 4500"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Suffix (e.g. +, %, LPA)</label>
                  <input
                    type="text"
                    value={formData.suffix}
                    onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                    placeholder="e.g. +"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Sub-label / Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Across Tier-1 tech giants"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Display Icon</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {submitting ? "Saving..." : editingStat ? "Update Metric" : "Save Metric"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
