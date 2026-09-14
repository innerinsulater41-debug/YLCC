"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Phone, Mail, Send } from "lucide-react";

export default function EnquiryCTA() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseInterest: "Full-Stack Software Engineering & Microservices",
    subject: "Admissions Consultation Request",
    message: "I would like to speak with an academic counselor regarding cohort syllabus, fee structure, and upcoming batch timings.",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Accelerate Your Engineering Career?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Speak directly with our senior academic counseling team. Discuss curriculum pathways, scholarship eligibility, and placement outcomes tailored to your background.
            </p>

            <div className="space-y-3 pt-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-300 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span>Direct Counselor Helpline: <strong>+91 98765 43210</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-cyan-300 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Admissions Desk: <strong>admissions@ylcc.edu.in</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-2xl">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Enquiry Received!</h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto">
                    Thank you for your interest in YLCC. One of our senior counselors will get in touch with you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-2">Request Course Counseling</h3>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-hidden focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Program of Interest
                    </label>
                    <select
                      value={formData.courseInterest}
                      onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/20 text-white text-sm focus:outline-hidden focus:border-cyan-400"
                    >
                      <option value="Full-Stack Software Engineering & Microservices">
                        Full-Stack Software Engineering & Microservices
                      </option>
                      <option value="Applied Generative AI, LLMs & Machine Learning">
                        Applied Generative AI, LLMs & Machine Learning
                      </option>
                      <option value="Cloud Infrastructure, Kubernetes & DevOps">
                        Cloud Infrastructure, Kubernetes & DevOps
                      </option>
                      <option value="Data Analytics, SQL & Business Intelligence">
                        Data Analytics, SQL & Business Intelligence
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
