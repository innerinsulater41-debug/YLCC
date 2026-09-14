"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  UploadCloud,
  FileText,
  ArrowRight,
  Shield,
  Clock,
  Calendar,
} from "lucide-react";

export default function AdmissionApplyPage() {
  const searchParams = useSearchParams();
  const preselectedCourse = searchParams.get("course") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    qualification: "B.Tech / B.E. in Computer Science or IT",
    selectedCourse:
      preselectedCourse || "Full-Stack Software Engineering & Microservices",
    preferredMode: "Hybrid" as const,
    preferredBatch: "Weekend" as const,
    documentUrl: "",
    consentAgreed: true,
  });

  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [docName, setDocName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    setErrorMessage("");

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "File upload failed");

      setFormData((prev) => ({ ...prev, documentUrl: json.url }));
      setDocName(file.name);
    } catch (err: any) {
      setErrorMessage(err.message || "Document upload failed");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentAgreed) {
      setErrorMessage("Please accept the terms and conditions to proceed");
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit application");

      setAppId(json.application.id);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* Header */}
      <section className="py-16 bg-[#1c1917] text-stone-200 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-800/60 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Admissions Portal • Summer 2026 Cohorts</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Apply for YLCC Cohort Admission
          </h1>
          <p className="text-stone-400 text-base leading-relaxed">
            Take the first step toward master-level software engineering. Cohorts are limited to 30 engineers to ensure intensive mentorship.
          </p>
        </div>
      </section>

      {/* Main Form Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-stone-900">
                  Application Successfully Submitted!
                </h2>
                <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  Application Reference ID: {appId}
                </p>
              </div>

              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for applying to YLCC, <strong>{formData.fullName}</strong>. Our Admissions Committee will review your academic background and email you regarding diagnostic counseling within 2 business days.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/portal"
                  className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Go to Student Portal
                </Link>
                <Link
                  href="/courses"
                  className="px-6 py-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs"
                >
                  Browse More Programs
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-stone-200 pb-4">
                <h2 className="text-2xl font-black text-stone-900">
                  Student Candidate Information
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Please provide accurate details as they will appear on your official transcripts and verifiable certificates.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Section 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800">
                  1. Personal & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Anandita Sen"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="anandita@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Phone Number (WhatsApp Active) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Current Residential Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street, City, State, Pin Code"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* Section 2: Program & Batch Preferences */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800">
                  2. Academic Selection & Cohort Mode
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Selected Program *
                  </label>
                  <select
                    value={formData.selectedCourse}
                    onChange={(e) => setFormData({ ...formData, selectedCourse: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                  >
                    <option value="Full-Stack Software Engineering & Microservices">
                      Full-Stack Software Engineering & Microservices (20 Weeks)
                    </option>
                    <option value="Applied Generative AI, LLMs & Machine Learning">
                      Applied Generative AI, LLMs & Machine Learning (18 Weeks)
                    </option>
                    <option value="Cloud Infrastructure, Kubernetes & DevOps">
                      Cloud Infrastructure, Kubernetes & DevOps (16 Weeks)
                    </option>
                    <option value="Data Analytics, SQL & Business Intelligence">
                      Data Analytics, SQL & Business Intelligence (14 Weeks)
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Preferred Mode *
                    </label>
                    <select
                      value={formData.preferredMode}
                      onChange={(e: any) => setFormData({ ...formData, preferredMode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    >
                      <option value="Hybrid">Hybrid (Classroom + Cloud Sandboxes)</option>
                      <option value="Online">Online Interactive Live</option>
                      <option value="Offline">Offline Immersion (Bengaluru Campus)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Preferred Batch Timing *
                    </label>
                    <select
                      value={formData.preferredBatch}
                      onChange={(e: any) => setFormData({ ...formData, preferredBatch: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    >
                      <option value="Weekend">Weekend Track (Sat & Sun: 10 AM - 4 PM)</option>
                      <option value="Evening">Evening Professional Track (Mon-Thu: 7-9:30 PM)</option>
                      <option value="Morning">Morning Immersion Track (Mon-Fri: 9 AM - 1 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Highest Educational Qualification *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. B.Tech in CSE / BCA / MCA / Working Professional"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                  />
                </div>
              </div>

              {/* Section 3: Document Upload */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800">
                  3. Resume or Supporting Document Upload
                </h3>
                <p className="text-xs text-stone-500">
                  Upload your CV, academic transcript, or GitHub portfolio summary (PDF, max 25MB).
                </p>

                <div className="border-2 border-dashed border-stone-300 hover:border-amber-700/60 rounded-2xl p-6 text-center transition-colors">
                  <UploadCloud className="w-10 h-10 text-stone-400 mx-auto mb-2" />
                  <div className="text-xs text-stone-700">
                    <label className="cursor-pointer font-bold text-amber-800 hover:underline">
                      <span>Click to upload document</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>{" "}
                    or drag and drop
                  </div>
                  <div className="text-[11px] text-stone-400 mt-1">
                    PDF up to 25MB supported
                  </div>

                  {uploadingDoc && (
                    <div className="mt-3 text-xs text-amber-800 font-semibold animate-pulse">
                      Uploading document to secure storage...
                    </div>
                  )}

                  {docName && !uploadingDoc && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                      <FileText className="w-4 h-4" />
                      <span>{docName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Consent and Submit */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentAgreed}
                    onChange={(e) => setFormData({ ...formData, consentAgreed: e.target.checked })}
                    className="mt-1 rounded border-stone-300 text-stone-900 focus:ring-amber-700"
                  />
                  <span className="text-xs text-stone-600 leading-relaxed">
                    I declare that all information provided is accurate to the best of my knowledge. I agree to abide by the academic code of conduct and cohort milestone requirements of YLCC Institute.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting || uploadingDoc}
                  className="w-full py-4 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Complete &amp; Submit Application</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
