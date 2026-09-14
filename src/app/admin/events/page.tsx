"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Search,
  Upload,
  X,
  ExternalLink,
  MapPin,
  Clock,
  User,
  CheckCircle2,
} from "lucide-react";
import { EventItem } from "@/types";
import { slugify } from "@/lib/utils";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    type: "Workshop" as EventItem["type"],
    shortDescription: "",
    fullDescription: "",
    bannerUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
    startTime: "10:00 AM",
    endTime: "01:00 PM",
    venue: "Auditorium Hall A, YLCC Bengaluru Campus",
    mode: "Hybrid" as EventItem["mode"],
    registrationUrl: "/events/register",
    isRegistrationOpen: true,
    isFeatured: true,
    isPublished: true,
    speakerName: "Dr. Arvind Shenoy",
    speakerDesignation: "Chief AI Scientist, NextGen Labs",
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events?all=true");
      const data = await res.json();
      if (data.success && data.events) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      slug: "",
      type: "Workshop",
      shortDescription: "",
      fullDescription: "",
      bannerUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      eventDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
      startTime: "10:00 AM",
      endTime: "01:00 PM",
      venue: "Auditorium Hall A, YLCC Bengaluru Campus",
      mode: "Hybrid",
      registrationUrl: "/contact",
      isRegistrationOpen: true,
      isFeatured: true,
      isPublished: true,
      speakerName: "",
      speakerDesignation: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: EventItem) => {
    setEditingEvent(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      type: item.type,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      bannerUrl: item.bannerUrl,
      eventDate: item.eventDate,
      startTime: item.startTime,
      endTime: item.endTime,
      venue: item.venue,
      mode: item.mode,
      registrationUrl: item.registrationUrl || "",
      isRegistrationOpen: item.isRegistrationOpen,
      isFeatured: item.isFeatured,
      isPublished: item.isPublished,
      speakerName: item.speakerName || "",
      speakerDesignation: item.speakerDesignation || "",
    });
    setIsModalOpen(true);
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormData((prev) => ({ ...prev, bannerUrl: data.fileUrl }));
        setStatusMessage({ type: "success", text: "Event banner uploaded!" });
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
      const url = "/api/events";
      const method = editingEvent ? "PUT" : "POST";
      const payload = editingEvent ? { id: editingEvent.id, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({
          type: "success",
          text: editingEvent ? "Event updated successfully!" : "New event published!",
        });
        setIsModalOpen(false);
        fetchEvents();
      } else {
        setStatusMessage({ type: "error", text: data.error || "Submission failed" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (event: EventItem) => {
    try {
      const res = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event.id, isPublished: !event.isPublished }),
      });
      const data = await res.json();
      if (data.success) {
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? { ...e, isPublished: !e.isPublished } : e))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete event "${title}"?`)) return;

    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Request failed");
    }
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Events & Announcements</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Publish hackathons, masterclasses, webinars, guest lectures, and campus notices.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Event
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

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e8e2d8] shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#a8a29e] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by title or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
          />
        </div>
        <div className="text-xs text-[#78716c] font-medium">
          Total: <span className="text-[#1c1917] font-semibold">{filteredEvents.length}</span> events listed
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 rounded-2xl bg-white border border-[#e8e2d8] animate-pulse p-6" />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white border border-[#e8e2d8] rounded-2xl p-12 text-center">
          <Calendar className="w-12 h-12 text-[#a8a29e] mx-auto mb-3" />
          <h3 className="text-base font-serif font-bold text-[#1c1917]">No events scheduled</h3>
          <p className="text-sm text-[#78716c] mt-1">Add upcoming campus events, technical summits, or webinars.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8e2d8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-[#faf7f2]">
                  <Image src={item.bannerUrl} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#1c1917]/80 backdrop-blur-md text-white border border-white/20">
                      {item.type}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-[#1c1917] border border-[#e8e2d8]">
                      {item.mode}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleTogglePublish(item)}
                      className={`p-1.5 rounded-full shadow-sm ${
                        item.isPublished
                          ? "bg-emerald-500 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                      title={item.isPublished ? "Published (Click to unpublish)" : "Draft (Click to publish)"}
                    >
                      {item.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#a16207] mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.eventDate}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.startTime}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#1c1917] line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-[#57534e] line-clamp-2 mt-1.5 leading-relaxed">{item.shortDescription}</p>

                  <div className="mt-4 pt-3 border-t border-[#f5f2eb] space-y-1.5 text-xs text-[#78716c]">
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#a16207] shrink-0" />
                      <span className="truncate">{item.venue}</span>
                    </div>
                    {item.speakerName && (
                      <div className="flex items-center gap-2 truncate">
                        <User className="w-3.5 h-3.5 text-[#a16207] shrink-0" />
                        <span className="truncate font-medium text-[#1c1917]">{item.speakerName}</span>
                        {item.speakerDesignation && <span className="truncate">({item.speakerDesignation})</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-[#e8e2d8] mt-4 pt-3">
                <Link
                  href={`/events/${item.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-[#a16207] hover:underline inline-flex items-center gap-1"
                >
                  View Page <ExternalLink className="w-3 h-3" />
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-[#78716c] hover:bg-[#faf7f2] hover:text-[#1c1917] transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
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
          <div className="bg-white rounded-3xl border border-[#e8e2d8] shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8e2d8] mb-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1c1917]">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <p className="text-xs text-[#78716c] mt-0.5">Announce campus workshops, hackathons, and webinars</p>
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
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: slugify(e.target.value),
                    })
                  }
                  placeholder="e.g. National Generative AI Hackathon 2026"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as EventItem["type"] })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Announcement">Announcement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Mode *</label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value as EventItem["mode"] })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Start Time</label>
                  <input
                    type="text"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    placeholder="e.g. 10:00 AM"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">End Time</label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="e.g. 02:00 PM"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Venue / Platform *</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g. Main Auditorium, YLCC Bengaluru or Zoom Link"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              {/* Banner Upload */}
              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Event Banner *</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    required
                    value={formData.bannerUrl}
                    onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                  <label className="cursor-pointer px-3 py-2 bg-white border border-[#e8e2d8] hover:bg-[#faf7f2] rounded-xl text-xs font-semibold text-[#1c1917] inline-flex items-center gap-1.5 shadow-sm transition">
                    <Upload className="w-3.5 h-3.5 text-[#a16207]" />
                    <span>{uploading ? "..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-line summary for cards"
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1c1917] mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed schedule, prerequisites, agenda, and outcomes..."
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Keynote Speaker</label>
                  <input
                    type="text"
                    value={formData.speakerName}
                    onChange={(e) => setFormData({ ...formData, speakerName: e.target.value })}
                    placeholder="e.g. Dr. Arvind Shenoy"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1c1917] mb-1">Speaker Designation</label>
                  <input
                    type="text"
                    value={formData.speakerDesignation}
                    onChange={(e) => setFormData({ ...formData, speakerDesignation: e.target.value })}
                    placeholder="e.g. AI Research Lead"
                    className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                  <input
                    type="checkbox"
                    checked={formData.isRegistrationOpen}
                    onChange={(e) => setFormData({ ...formData, isRegistrationOpen: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                  />
                  Registrations Open
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                  />
                  Feature on Homepage
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
                  />
                  Publish Immediately
                </label>
              </div>

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
                  {submitting ? "Saving..." : editingEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
