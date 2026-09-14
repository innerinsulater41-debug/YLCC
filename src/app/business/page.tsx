"use client";

import { useState } from "react";
import Link from "next/link";
import PublicLayout from "@/components/layout/PublicLayout";
import {
  Building2,
  Users2,
  Cpu,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Send,
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    designation: "",
    email: "",
    phone: "",
    companySize: "11-50" as const,
    consultationType: "Corporate Training & Upskilling" as const,
    budgetRange: "₹2,00,000 - ₹5,00,000",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to schedule consultation");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const corporateServices = [
    {
      icon: Users2,
      title: "Corporate Engineering Upskilling",
      description:
        "Tailored 4 to 12-week intensive bootcamps in Generative AI, Next.js, Cloud Kubernetes, and Microservices designed specifically to transition your existing teams to high-productivity modern stacks.",
      metrics: "Trained 3,500+ corporate engineers across 40+ organizations",
    },
    {
      icon: Cpu,
      title: "AI Strategy & Technical Advisory",
      description:
        "Collaborate with our PhD researchers and ex-FAANG Principal Architects to audit your technology stack, design enterprise RAG systems, and validate generative AI feasibility.",
      metrics: "Custom proof-of-concepts & architecture blueprint delivery",
    },
    {
      icon: GraduationCap,
      title: "Campus & Lateral Talent Recruitment",
      description:
        "Hire pre-assessed, production-tested software engineers, data scientists, and DevOps specialists. Skip 3 rounds of basic screening—our graduates have already shipped real microservices.",
      metrics: "Zero recruitment agency commission fees for partner firms",
    },
    {
      icon: Layers,
      title: "Bespoke Enterprise Software Builds",
      description:
        "Engage our senior faculty-led labs to construct high-performance MVPs, internal tooling, and algorithmic prototypes with full intellectual property transfer.",
      metrics: "Shipped 25+ client enterprise prototypes with 99.9% reliability",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Enterprise Header / Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>YLCC For Business & Founders</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Enterprise Tech Solutions, Corporate Upskilling & Elite Talent.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Empower your enterprise with world-class technical workforce training, strategic GenAI consulting, and direct access to India&apos;s most rigorously tested software engineering graduates.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#consultation-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-base shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>Book a Business Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 transition-colors"
              >
                <span>Browse Student Cohorts</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Pillars */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How YLCC Partners With Leading Businesses
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            From Fortune 500 multinationals to fast-scaling Series A unicorns, we craft custom technical partnerships that drive engineering velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {corporateServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 card-hover space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{service.metrics}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form and Contact Grid */}
        <div id="consultation-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-24">
          {/* Left: Contact Info & Value Prop */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Corporate Advisory Desk
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Schedule a Strategic Discovery Call
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect with our Enterprise Director to tailor a program matching your organizational milestones, engineering tech stack, and budget.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Enterprise Hotline</div>
                  <a href="tel:+919876543210" className="text-blue-600 hover:underline">
                    +91 98765 43210 (Ext. 402)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Corporate Email</div>
                  <a href="mailto:enterprise@ylcc.edu.in" className="text-blue-600 hover:underline">
                    enterprise@ylcc.edu.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Consultation Turnaround</div>
                  <p className="text-xs text-slate-500">
                    Discovery meetings scheduled within 24 hours of form submission.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Proof Pills */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white space-y-3">
              <h3 className="text-sm font-bold tracking-wide uppercase text-cyan-300">
                Why Hiring Managers Trust YLCC
              </h3>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% verified GitHub repos & Dockerized portfolios</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero onboarding lag: trained on modern monorepos & CI/CD</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pre-evaluated on algorithmic reasoning and system design</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Working Consultation Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Consultation Scheduled!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you for reaching out, <strong>{formData.contactPerson}</strong>. Our Enterprise Advisory team will contact you at <strong>{formData.email}</strong> within 1 business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase"
                  >
                    Submit Another Consultation Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-900">Enterprise Inquiry Form</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Tell us about your organization and requirements.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Acme Technologies Ltd."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="e.g. Rajesh Malhotra"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Designation / Role *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="e.g. VP of Engineering / HR Director"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="r.malhotra@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Size
                      </label>
                      <select
                        value={formData.companySize}
                        onChange={(e: any) => setFormData({ ...formData, companySize: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option value="1-10">1 - 10 Employees (Early Startup)</option>
                        <option value="11-50">11 - 50 Employees (Growth Stage)</option>
                        <option value="51-200">51 - 200 Employees (Mid-Market)</option>
                        <option value="201-500">201 - 500 Employees</option>
                        <option value="500+">500+ Employees (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Consultation Area *
                      </label>
                      <select
                        value={formData.consultationType}
                        onChange={(e: any) => setFormData({ ...formData, consultationType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option value="Corporate Training & Upskilling">
                          Corporate Training & Upskilling
                        </option>
                        <option value="Tech Architecture & AI Consulting">
                          Tech Architecture & AI Consulting
                        </option>
                        <option value="Campus Recruitment & Hiring">
                          Campus Recruitment & Hiring
                        </option>
                        <option value="Custom Project Development">
                          Custom Project Development
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Estimated Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                      >
                        <option value="Under ₹2,00,000">Under ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                        <option value="₹5,00,000 - ₹15,00,000">₹5,00,000 - ₹15,00,000</option>
                        <option value="₹15,00,000+">₹15,00,000+ (Enterprise Retainer)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project or Training Scope Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline team size, tech stack (e.g. Next.js, PyTorch, Kubernetes), and your target timeline..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-hidden focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Scheduling Consultation...</span>
                    ) : (
                      <>
                        <span>Submit Corporate Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
