"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Shield,
} from "lucide-react";
import { InstituteSettings } from "@/types";

interface FooterProps {
  settings?: InstituteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const address = settings?.address || "YLCC Campus, 4th Block, 80 Feet Road, Koramangala, Bengaluru, Karnataka 560034, India";
  const phone = settings?.phone || "+91 98765 43210";
  const whatsapp = settings?.whatsapp || "+91 98765 43210";
  const email = settings?.email || "contact@ylcc.edu.in";
  const officeHours = settings?.officeHours || "Mon - Sat: 8:30 AM - 7:30 PM (IST)";

  return (
    <footer className="bg-[#171412] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  {settings?.name || "YLCC"}
                </span>
                <span className="text-[10px] tracking-widest text-stone-400 font-semibold uppercase">
                  {settings?.fullForm || "Youth Leadership & Career Campus"}
                </span>
              </div>
            </Link>

            <p className="text-stone-400 text-sm leading-relaxed pr-4">
              {settings?.tagline ||
                "Empowering next-generation tech leaders, software architects, and AI pioneers through industry-immersive cohorts and production capstones."}
            </p>

            <div className="space-y-2.5 text-sm text-stone-400 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{officeHours}</span>
              </div>
            </div>

            {settings?.mapEmbedUrl && (
              <a
                href={settings.mapEmbedUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>View Campus on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Col 2: Core Programs */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              Flagship Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/courses/full-stack-software-engineering"
                  className="hover:text-blue-400 transition-colors"
                >
                  Full-Stack Software Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/applied-generative-ai-and-machine-learning"
                  className="hover:text-blue-400 transition-colors"
                >
                  Applied Generative AI & ML
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/cloud-infrastructure-and-devops"
                  className="hover:text-blue-400 transition-colors"
                >
                  Cloud Architecture & DevOps
                </Link>
              </li>
              <li>
                <Link
                  href="/courses/data-analytics-and-business-intelligence"
                  className="hover:text-blue-400 transition-colors"
                >
                  Data Analytics & PowerBI
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium pt-1"
                >
                  <span>Explore All Cohorts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institute & Community */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              Institute
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About YLCC & Pedagogy
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-blue-400 transition-colors">
                  Student Capstone Projects
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-blue-400 transition-colors">
                  Distinguished Faculty
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-blue-400 transition-colors">
                  Student Placements & Awards
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-blue-400 transition-colors">
                  Workshops & Hackathons
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400 transition-colors">
                  Campus Life Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Admissions Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Quick Connect */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              Stay Connected
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to YLCC Tech Briefing for monthly tech deep-dives, free open workshops, and early admissions access.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are subscribed to updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Join Newsletter
                </button>
              </form>
            )}

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/40 text-xs font-semibold w-full justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Admissions Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings?.name || "YLCC"} (Youth Leadership & Career Campus). All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund" className="hover:text-slate-400 transition-colors">
              Refund Policy
            </Link>
            <Link href="/admin/login" className="hover:text-slate-400 transition-colors flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
