"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Building,
  Phone,
  Mail,
  MapPin,
  Megaphone,
  Sparkles,
  Share2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { InstituteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [settings, setSettings] = useState<InstituteSettings>({
    id: "institute-settings-001",
    name: "YLCC",
    fullForm: "Youth Leadership & Career Campus",
    tagline: "Empowering Next-Gen Leaders & Engineering Champions",
    instituteType: "Skill Development & Higher Technical Training Institute",
    location: "Bengaluru, Karnataka, India",
    address: "YLCC Campus, 4th Block, 80 Feet Road, Koramangala, Bengaluru, Karnataka 560034, India",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "contact@ylcc.edu.in",
    admissionsEmail: "admissions@ylcc.edu.in",
    officeHours: "Monday - Saturday: 8:30 AM - 7:30 PM (IST)",
    socialLinks: {
      instagram: "https://instagram.com/ylcc_campus",
      linkedin: "https://linkedin.com/school/ylcc-campus",
      youtube: "https://youtube.com/@ylcc_campus",
      facebook: "https://facebook.com/ylcccampus",
      github: "https://github.com/ylcc-campus",
      twitter: "https://twitter.com/ylcc_campus",
    },
    announcementBar: {
      enabled: true,
      badge: "Fall 2026 Admissions Open",
      text: "Limited seats available for AI Systems & Distributed Architecture cohorts.",
      linkUrl: "/apply",
      linkText: "Apply Online",
    },
    heroConfig: {
      badge: "Bengaluru's Premier Engineering & Leadership Campus",
      titleLine1: "Architect Your Future.",
      titleHighlight: "Lead the Industry.",
      titleLine2: "Build Without Limits.",
      description:
        "Rigorous full-stack computer science, machine learning, and leadership mentorship designed by Silicon Valley veterans.",
    },
    mapEmbedUrl: "https://maps.google.com/?q=Koramangala,Bengaluru",
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: "success", text: "Institute configuration saved successfully!" });
        setSettings(data.settings);
      } else {
        setStatusMessage({ type: "error", text: data.error || "Failed to update settings" });
      }
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message || "Request failed" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 bg-white rounded-3xl border border-[#e8e2d8] animate-pulse" />
        <div className="h-96 bg-white rounded-3xl border border-[#e8e2d8] animate-pulse" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#e8e2d8] pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">Institute Settings & Configuration</h1>
          <p className="text-sm text-[#78716c] mt-1">
            Configure institutional identity, official contacts, announcement marquee, hero headlines, and social presence.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Changes"}
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
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* 1. Identity & Overview */}
      <div className="bg-white border border-[#e8e2d8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#f5f2eb]">
          <span className="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] flex items-center justify-center text-[#a16207]">
            <Building className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-base font-serif font-bold text-[#1c1917]">Institutional Identity</h2>
            <p className="text-xs text-[#78716c]">Campus name, full legal form, and official positioning</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Brand Name / Acronym *</label>
            <input
              type="text"
              required
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Full Name / Legal Form *</label>
            <input
              type="text"
              required
              value={settings.fullForm}
              onChange={(e) => setSettings({ ...settings, fullForm: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Tagline *</label>
            <input
              type="text"
              required
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Institute Type</label>
            <input
              type="text"
              value={settings.instituteType}
              onChange={(e) => setSettings({ ...settings, instituteType: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Location (City, State, Country)</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => setSettings({ ...settings, location: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>
        </div>
      </div>

      {/* 2. Official Contact Information */}
      <div className="bg-white border border-[#e8e2d8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#f5f2eb]">
          <span className="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] flex items-center justify-center text-[#a16207]">
            <Phone className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-base font-serif font-bold text-[#1c1917]">Contact & Campus Location</h2>
            <p className="text-xs text-[#78716c]">Official phone numbers, emails, physical campus address</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Primary Contact Number *</label>
            <input
              type="text"
              required
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">WhatsApp Number *</label>
            <input
              type="text"
              required
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">General Inquiries Email *</label>
            <input
              type="email"
              required
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Admissions Desk Email *</label>
            <input
              type="email"
              required
              value={settings.admissionsEmail}
              onChange={(e) => setSettings({ ...settings, admissionsEmail: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Complete Campus Address *</label>
            <textarea
              rows={2}
              required
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Office Hours</label>
            <input
              type="text"
              value={settings.officeHours}
              onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Google Maps Link</label>
            <input
              type="url"
              value={settings.mapEmbedUrl || ""}
              onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>
        </div>
      </div>

      {/* 3. Announcement Banner */}
      <div className="bg-white border border-[#e8e2d8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#f5f2eb]">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] flex items-center justify-center text-[#a16207]">
              <Megaphone className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-serif font-bold text-[#1c1917]">Top Announcement Bar</h2>
              <p className="text-xs text-[#78716c]">Alert visitors regarding cohort batches, scholarships, or deadlines</p>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1c1917]">
            <input
              type="checkbox"
              checked={settings.announcementBar?.enabled ?? true}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: {
                    ...settings.announcementBar,
                    enabled: e.target.checked,
                  },
                })
              }
              className="w-4 h-4 rounded text-[#a16207] focus:ring-[#a16207]"
            />
            Show Banner
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Badge Tag</label>
            <input
              type="text"
              value={settings.announcementBar?.badge || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, badge: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={settings.announcementBar?.text || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, text: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Action Button Text</label>
            <input
              type="text"
              value={settings.announcementBar?.linkText || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, linkText: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Action URL</label>
            <input
              type="text"
              value={settings.announcementBar?.linkUrl || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, linkUrl: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>
        </div>
      </div>

      {/* 4. Homepage Hero Headline */}
      <div className="bg-white border border-[#e8e2d8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#f5f2eb]">
          <span className="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] flex items-center justify-center text-[#a16207]">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-base font-serif font-bold text-[#1c1917]">Homepage Hero Section Copy</h2>
            <p className="text-xs text-[#78716c]">Craft the punchy first impression displayed to all website visitors</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Top Hero Badge</label>
            <input
              type="text"
              value={settings.heroConfig?.badge || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroConfig: { ...settings.heroConfig, badge: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1c1917] mb-1">Title Line 1</label>
              <input
                type="text"
                value={settings.heroConfig?.titleLine1 || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    heroConfig: { ...settings.heroConfig, titleLine1: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c1917] mb-1">Highlight Phrase (Bronze Gradient)</label>
              <input
                type="text"
                value={settings.heroConfig?.titleHighlight || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    heroConfig: { ...settings.heroConfig, titleHighlight: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1c1917] mb-1">Title Line 2</label>
              <input
                type="text"
                value={settings.heroConfig?.titleLine2 || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    heroConfig: { ...settings.heroConfig, titleLine2: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Hero Subtitle / Description</label>
            <textarea
              rows={2}
              value={settings.heroConfig?.description || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  heroConfig: { ...settings.heroConfig, description: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>
        </div>
      </div>

      {/* 5. Social Media Presence */}
      <div className="bg-white border border-[#e8e2d8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-[#f5f2eb]">
          <span className="w-9 h-9 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] flex items-center justify-center text-[#a16207]">
            <Share2 className="w-4 h-4" />
          </span>
          <div>
            <h2 className="text-base font-serif font-bold text-[#1c1917]">Social Media Handles</h2>
            <p className="text-xs text-[#78716c]">Linked across the footer, navigation drawer, and contact pages</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">LinkedIn Profile / Page</label>
            <input
              type="url"
              value={settings.socialLinks?.linkedin || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">Instagram URL</label>
            <input
              type="url"
              value={settings.socialLinks?.instagram || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">YouTube Channel URL</label>
            <input
              type="url"
              value={settings.socialLinks?.youtube || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1c1917] mb-1">GitHub Organization URL</label>
            <input
              type="url"
              value={settings.socialLinks?.github || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, github: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#e8e2d8] rounded-xl focus:outline-none focus:border-[#a16207]"
            />
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#e8e2d8]">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#a16207] text-white text-sm font-semibold hover:bg-[#854d0e] transition shadow-md disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Institute Settings"}
        </button>
      </div>
    </form>
  );
}
