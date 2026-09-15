import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Target,
  Compass,
  CheckCircle2,
  Building2,
  Users,
  GraduationCap,
  Scale,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import { db } from '@/lib/db';

export const metadata = {
  title: 'About YLCC | Premier Commerce & Accounting Training Institute',
  description:
    'Discover YLCC: our history, practical learning philosophy, chartered accountant mentorship, and commitment to real commerce skills without coding or tech distractions.',
};

export default async function AboutPage() {
  const settings = await db.getSettings();

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-16 border-b border-[#E5D8CA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Institutional Profile
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1810] leading-tight">
            About YLCC
          </h1>
          <p className="text-sm sm:text-base text-[#8B5A2B] font-semibold">
            {settings.fullForm} • {settings.location}
          </p>
          <p className="text-base text-[#57534E] max-w-3xl mx-auto leading-relaxed">
            YLCC is an exclusive commerce, accounting, taxation, and financial skills institute. We are NOT a coding or technical institute. Our singular mission is to transform commerce students and graduates into proficient, desk-ready accounting professionals through authentic practical projects.
          </p>
        </div>
      </section>

      {/* Director / Founder Message */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border-2 border-[#D8C5B2] shadow-md p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-3 border-b border-[#EFE6DD] pb-4">
            <div className="w-12 h-12 rounded-full bg-[#2A1810] text-[#E8DCCF] flex items-center justify-center font-serif text-xl font-bold">
              CA
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2A1810]">
                Director’s Message to Commerce Students
              </h2>
              <p className="text-xs text-[#8B5A2B] font-semibold">
                Bridging the Chasm Between Commerce Degrees and Corporate Realities
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-[#57534E] leading-relaxed">
            <p>
              "Every year, thousands of students graduate with B.Com, M.Com, or BBA degrees. Yet, when they walk into a CA firm or corporate accounts department for their first job interview, they freeze when handed a real GST tax invoice, a consignment note (Bilty), or an inter-state purchase register.
            </p>
            <p>
              Why? Because conventional universities teach abstract debits and credits from textbook questions that have remained unchanged for forty years. They don’t teach how to reconcile GSTR-2B with purchase ledgers, how to calculate Drawing Power for a bank CC limit, or how to write an XLOOKUP formula to catch invoice duplicates in Excel 365.
            </p>
            <p>
              YLCC was established specifically to solve this problem. When you sit in our accounting lab, you don’t open a theoretical textbook. You open physical files of actual invoices from hospitals, logistics companies, hotels, and construction sites. You feed live vouchers, generate statutory E-way bills, file portal returns, and defend your numbers before seasoned Chartered Accountants."
            </p>
          </div>

          <div className="pt-4 border-t border-[#EFE6DD] flex items-center justify-between text-xs text-[#78716C]">
            <span className="font-serif font-bold text-[#2A1810]">CA Alok Maheshwari & Rajesh Soni</span>
            <span>Founder & Academic Directors, YLCC</span>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFE6DD] text-[#8B5A2B] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2A1810]">Our Mission</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              To empower every commerce student with authentic, desk-ready accounting, taxation, and reporting competencies through intensive hands-on multi-business practice, ensuring immediate corporate employability without requiring on-the-job hand-holding.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFE6DD] text-[#8B5A2B] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2A1810]">Our Vision</h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              To be India’s benchmark practical commerce academy—recognized by enterprises, CA firms, and corporate employers as the gold standard for producing rigorous, ethically grounded, and technologically adept accounting talent.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#EFE6DD] text-[#8B5A2B] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#2A1810]">Core Values</h3>
            <ul className="text-xs text-[#57534E] space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <span>Zero Theory Fluff — 100% Practical Documents</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <span>Statutory Precision with Indian Tax Laws</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <span>Strict 1-on-1 Faculty Ledger Scrutiny</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
                <span>Complete Professional Integrity & Confidentiality</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="bg-[#F5EFEB] py-16 border-y border-[#E5D8CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
              Campus Infrastructure
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2A1810]">
              Purpose-Built for Commerce Practice
            </h2>
            <p className="text-xs text-[#57534E]">
              Every workstation is equipped with licensed accounting software and simulated government portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] space-y-3">
              <div className="p-3 bg-[#FAF6F0] rounded-xl inline-block text-[#8B5A2B]">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2A1810]">Dedicated Accounting Lab</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                40 high-performance workstations configured with Tally Prime 4.0 Multi-User, Busy Accounting Software, and official GST Offline Tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] space-y-3">
              <div className="p-3 bg-[#FAF6F0] rounded-xl inline-block text-[#8B5A2B]">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2A1810]">Excel 365 Financial Modeling Desk</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Dual-monitor workstations designed for complex multi-workbook data modeling, Power Query transformations, and real-time MIS dashboard testing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] space-y-3">
              <div className="p-3 bg-[#FAF6F0] rounded-xl inline-block text-[#8B5A2B]">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2A1810]">Physical Invoice Archive</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Over 10,000 anonymized physical business documents: sales registers, bills of lading, bank sanction letters, PWD measurement books, and challans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1810]">
          Ready to Build Practical Commerce Competence?
        </h2>
        <p className="text-sm text-[#57534E]">
          Explore our 8 specialized programs or schedule a personalized counseling visit to our Jaipur campus.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/programs"
            className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow transition-all"
          >
            Explore Training Programs
          </Link>
          <Link
            href="/apply"
            className="bg-white hover:bg-[#FAF6F0] text-[#2A1810] border border-[#D8C5B2] px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            Apply for Admission
          </Link>
        </div>
      </section>
    </div>
  );
}
