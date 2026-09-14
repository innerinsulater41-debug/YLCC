"use client";

import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseInterest: "Full-Stack Software Engineering & Microservices",
    subject: "",
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
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const address = "YLCC Campus, 4th Block, 80 Feet Road, Koramangala, Bengaluru, Karnataka 560034, India";
  const phone = "+91 98765 43210";
  const whatsapp = "+91 98765 43210";
  const email = "contact@ylcc.edu.in";
  const officeHours = "Monday - Saturday: 8:30 AM - 7:30 PM (IST)";

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* Header */}
      <section className="py-16 bg-[#1c1917] text-stone-200 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-800/60 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Admissions & Campus Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Connect With YLCC Campus
          </h1>
          <p className="text-stone-400 text-base leading-relaxed">
            Have questions regarding batch schedules, merit scholarships, campus tours, or business partnerships? We are here to help.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-6">
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
                Campus Contact Information
              </h2>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">Campus Location</div>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">Admissions Helpline</div>
                    <a href={`tel:${phone}`} className="text-amber-800 font-semibold hover:underline">
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">Official Email</div>
                    <a href={`mailto:${email}`} className="text-amber-800 font-semibold hover:underline">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">Counseling Office Hours</div>
                    <p className="text-xs text-stone-500">{officeHours}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Admissions</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-xs h-64 bg-stone-100">
              <iframe
                title="YLCC Campus Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5835263625463!2d77.6253457759891!3d12.93448498737728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14436573c739%3A0xb35749f7065f4ff!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-lg">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900">Message Delivered!</h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">
                    Thank you, <strong>{formData.fullName}</strong>. Your enquiry has been routed to our academic counselors. We will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs tracking-wider uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-stone-900">Send an Inquiry</h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Fill out the form below to receive a direct response from our counseling team.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                      {errorMessage}
                    </div>
                  )}

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
                        placeholder="e.g. Rahul Sharma"
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
                        placeholder="rahul@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number *
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
                        Program of Interest
                      </label>
                      <select
                        value={formData.courseInterest}
                        onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
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
                        <option value="Corporate / Business Consultation">
                          Corporate / Business Consultation
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Inquiring about weekend cohort eligibility and fees"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details about your background and what you are looking to achieve..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry to Admissions</span>
                        <Send className="w-4 h-4 text-amber-400" />
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
