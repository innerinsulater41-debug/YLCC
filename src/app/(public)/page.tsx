import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileSpreadsheet,
  Building2,
  Scale,
  Award,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Receipt,
  Landmark,
  Layers,
  Users,
  Clock,
  Download,
  Calendar,
  ShieldCheck,
  ChevronRight,
  DollarSign,
  GraduationCap,
} from 'lucide-react';
import { db } from '@/lib/db';
import QuickEnquiryForm from '@/components/home/QuickEnquiryForm';
import FAQAccordion from '@/components/home/FAQAccordion';

export default async function HomePage() {
  const [settings, programs, projects, faculty, testimonials, faqs] = await Promise.all([
    db.getSettings(),
    db.getPrograms(true),
    db.getProjects(true),
    db.getFaculty(),
    db.getTestimonials(),
    db.getFAQs(),
  ]);

  const stats = settings.stats || {
    studentsTrained: 76,
    practicalProjectsCount: 30,
    trainingModulesCount: 48,
    yearsExperience: 20,
    practicalLabHours: 350,
    partnerEnterprises: 120,
  };

  const featuredProjects = projects.slice(0, 6);
  const featuredFaculty = faculty.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Cream & Beige Luxury with Real Commerce Badges) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F6EFE6] via-[#FAF6F0] to-[#FAF6F0] pt-12 pb-20 border-b border-[#E5D8CA]">
        {/* Subtle Ledger Grid Background */}
        <div className="absolute inset-0 ledger-grid opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Main Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFE6DD] border border-[#D8C5B2] text-xs font-semibold text-[#8B5A2B]">
                <ShieldCheck className="w-4 h-4 text-[#8B5A2B]" />
                <span>100% Practical Commerce Training • Not a Coding or Tech Institute</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#2A1810] tracking-tight leading-[1.18]">
                {settings.heroTitle ||
                  'Master Real-World Accounting & Taxation with Multi-Business Practical Projects'}
              </h1>

              <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {settings.heroSubtitle ||
                  'Bridge the gap between commerce theory and actual corporate desk work. Get hands-on training in Live Accounting, GST, TDS/TCS, Banking CC Limits, Payroll, Cost Accounting, and Advanced Excel 365.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/programs"
                  className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore 8 Training Programs</span>
                </Link>

                <Link
                  href="/projects"
                  className="bg-[#EFE6DD] hover:bg-[#E5D8CA] text-[#2A1810] border border-[#D8C5B2] px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-[#8B5A2B]" />
                  <span>View 30 Industrial Training Projects</span>
                </Link>

                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8B5A2B] hover:text-[#70441E] hover:underline px-2 py-2"
                >
                  <span>Apply Online →</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E5D8CA] max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#57534E] font-medium">Real business invoices & bills</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#57534E] font-medium">1-on-1 Practical Ledger Guidance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-xs text-[#57534E] font-medium">Live GST & Income Tax Portals</span>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Visual Mockup / Ledger Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-2xl border-2 border-[#D8C5B2] shadow-xl p-6 space-y-5">
                {/* Ledger Header Badge */}
                <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    <span className="text-xs font-serif font-bold text-[#2A1810] ml-2">
                      Live Corporate Accounting Desk
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Live Active Mode
                  </span>
                </div>

                {/* Simulated Business Modules */}
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#FAF6F0] border border-[#E5D8CA] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-[#EFE6DD] text-[#8B5A2B]">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#2A1810]">Accounts Operator Desk</div>
                        <div className="text-[11px] text-[#78716C]">Sales Billing • E-way • E-invoicing</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#8B5A2B]">Daily Live</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF6F0] border border-[#E5D8CA] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-[#EFE6DD] text-[#8B5A2B]">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#2A1810]">GST & TDS/TCS Portals</div>
                        <div className="text-[11px] text-[#78716C]">GSTR-1 • 3B • 2B Milan • Form 26Q</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#8B5A2B]">Monthly</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF6F0] border border-[#E5D8CA] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-[#EFE6DD] text-[#8B5A2B]">
                        <Landmark className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#2A1810]">Banking CC Limits & CMA</div>
                        <div className="text-[11px] text-[#78716C]">Drawing Power • Projected Balance Sheets</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#8B5A2B]">Quarterly</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FAF6F0] border border-[#E5D8CA] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-[#EFE6DD] text-[#8B5A2B]">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#2A1810]">Corporate Excel 365</div>
                        <div className="text-[11px] text-[#78716C]">250+ Formulas • Power Query • Dashboards</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#8B5A2B]">MIS Hub</span>
                  </div>
                </div>

                {/* Practical Projects Callout */}
                <div className="p-3.5 rounded-xl bg-[#2A1810] text-[#E5D8CA] text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#C4AE96] tracking-wider">
                      Live Business Case Studies
                    </span>
                    <p className="font-medium text-white">30 Multi-Business Projects</p>
                  </div>
                  <Link
                    href="/projects"
                    className="px-2.5 py-1 rounded bg-[#8B5A2B] hover:bg-[#70441E] text-white text-[11px] font-bold transition-colors"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS COUNTER BAR (Editable through Admin Panel) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl border border-[#E5D8CA] shadow-lg p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#EFE6DD]">
          <div className="space-y-1 pt-3 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2A1810]">
              {stats.studentsTrained}+
            </p>
            <p className="text-xs font-semibold text-[#8B5A2B] uppercase tracking-wider">Commerce Students Trained</p>
            <p className="text-[11px] text-[#78716C]">Graduates, Accountants & CA Inters</p>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2A1810]">
              {stats.practicalProjectsCount}
            </p>
            <p className="text-xs font-semibold text-[#8B5A2B] uppercase tracking-wider">Multi-Business Projects</p>
            <p className="text-[11px] text-[#78716C]">Hospitals, Hotels, Logistics, Builders</p>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2A1810]">
              {stats.trainingModulesCount}+
            </p>
            <p className="text-xs font-semibold text-[#8B5A2B] uppercase tracking-wider">Hands-on Modules</p>
            <p className="text-[11px] text-[#78716C]">Voucher Feeding to Income Tax Audits</p>
          </div>

          <div className="space-y-1 pt-3 sm:pt-0">
            <p className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2A1810]">
              {stats.yearsExperience}+
            </p>
            <p className="text-xs font-semibold text-[#8B5A2B] uppercase tracking-wider">Years of Excellence</p>
            <p className="text-[11px] text-[#78716C]">Dedicated to Commerce & Accounts</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OVERVIEW OF 8 CORE TRAINING PROGRAMS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Curriculum & Specializations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1810]">
            Practical Commerce & Accounting Programs
          </h2>
          <p className="text-sm text-[#57534E] leading-relaxed">
            Every course is directly mapped to the real requirements of commercial enterprises, CA offices, and corporate accounts departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-[#E5D8CA] p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#8B5A2B] transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Offline Classroom
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border transition-colors ${
                      prog.category === 'Tally Prime' ||
                      prog.id === 'prog-1' ||
                      prog.category === 'Accounts Manager & Audit' ||
                      prog.id === 'prog-2'
                        ? 'bg-[#8B5A2B] text-white border-[#7A4E24]'
                        : 'text-[#8B5A2B] bg-[#FAF6F0] border-[#E5D8CA]'
                    }`}
                  >
                    {prog.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-[#2A1810] group-hover:text-[#8B5A2B] transition-colors leading-snug">
                    <Link href={`/programs/${prog.slug}`}>{prog.title}</Link>
                  </h3>
                  <p className="text-xs text-[#6B584C] mt-2 line-clamp-3 leading-relaxed">
                    {prog.shortDescription}
                  </p>
                </div>

                {/* Key Topics Highlights */}
                <div className="space-y-1.5 pt-2 border-t border-[#EFE6DD]">
                  <span className="text-[11px] font-bold text-[#2A1810] block">Key Training Areas:</span>
                  {prog.modules.slice(0, 2).map((m) => (
                    <div key={m.id} className="text-[11px] text-[#57534E] flex items-center gap-1.5 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B] shrink-0" />
                      <span className="truncate">{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EFE6DD] flex items-center justify-end">
                <Link
                  href={`/programs/${prog.slug}`}
                  className="text-xs font-bold text-[#8B5A2B] group-hover:text-[#70441E] flex items-center gap-1"
                >
                  <span>Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2A1810] bg-[#EFE6DD] hover:bg-[#E5D8CA] px-6 py-3 rounded-xl border border-[#D8C5B2] transition-all"
          >
            <span>View Complete Syllabus for All 8 Training Programs →</span>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRACTICAL LEARNING METHODOLOGY */}
      {/* ========================================================================= */}
      <section className="bg-[#F5EFEB] py-16 border-y border-[#E5D8CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
              Our Proven 4-Step Pedagogy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1810]">
              How You Learn at YLCC
            </h2>
            <p className="text-sm text-[#57534E]">
              We eliminate theoretical cramming. Students work directly on original business documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-serif font-bold text-[#2A1810]">Raw Business Invoices</h3>
              <p className="text-xs text-[#6B584C] leading-relaxed">
                Receive physical files of actual sales bills, purchase registers, debit notes, transport bilties, and bank statements from real businesses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-serif font-bold text-[#2A1810]">Live Voucher Feeding</h3>
              <p className="text-xs text-[#6B584C] leading-relaxed">
                Feed transactions on Tally Prime and Busy accounting software. Generate E-way bills, E-invoices, and verify party ledger balances.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-serif font-bold text-[#2A1810]">Statutory Compliance</h3>
              <p className="text-xs text-[#6B584C] leading-relaxed">
                Execute monthly GSTR-1, GSTR-3B offsets, GSTR-2B ITC reconciliations, quarterly TDS 24Q/26Q returns, and EPF/ESIC portal returns.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-3 relative">
              <div className="w-9 h-9 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-serif font-bold text-[#2A1810]">Audits & MIS Reporting</h3>
              <p className="text-xs text-[#6B584C] leading-relaxed">
                Finalize financial statements, prepare CMA data for commercial bank limits, prepare for Income Tax audit, and build Excel 365 MIS dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURED PRACTICAL PROJECTS (The 30 Multi-Business Library) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5D8CA] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
              Multi-Business Experience
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2A1810]">
              The 30 Multi-Business Industrial Training Projects
            </h2>
            <p className="text-sm text-[#57534E] max-w-2xl">
              Gain the equivalent of 2 years of industry experience across hospitals, hotels, freight logistics, real estate, government thekedars, and franchise chains.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 bg-[#8B5A2B] hover:bg-[#70441E] text-white px-5 py-2.5 rounded-xl font-semibold text-xs transition-colors shrink-0 shadow-xs"
          >
            <span>Browse All 30 Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-[#E5D8CA] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#8B5A2B] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Project Header Banner */}
                <div className="bg-[#2A1810] text-white p-5 border-b border-[#3D2314] relative">
                  <div className="flex items-center justify-between text-[11px] text-[#C4AE96] mb-2">
                    <span className="uppercase font-bold tracking-wider">{proj.industryCategory}</span>
                    <span className="bg-[#8B5A2B] text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                      {proj.difficultyLevel}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white leading-snug">
                    <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                  </h3>
                </div>

                {/* Project Content */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
                    {proj.shortDescription}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#EFE6DD]">
                    <span className="text-[11px] font-bold text-[#2A1810] block">Practical Skills Covered:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.skillsCovered.slice(0, 3).map((sk, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#FAF6F0] text-[#57534E] border border-[#E5D8CA] px-2 py-0.5 rounded"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EFE6DD] mt-4 pt-4">
                <span className="text-xs text-[#78716C] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>{proj.practiceTimeHours} Hours Practice</span>
                </span>

                <Link
                  href={`/projects/${proj.slug}`}
                  className="text-xs font-bold text-[#8B5A2B] hover:underline flex items-center gap-1"
                >
                  <span>Explore Case Study →</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. DEDICATED ADVANCED EXCEL 365 HIGHLIGHT */}
      {/* ========================================================================= */}
      <section className="bg-[#2A1810] text-white py-16 border-y-4 border-[#8B5A2B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#362013] border border-[#4E2F1D] text-xs font-semibold text-[#E8DCCF]">
                <FileSpreadsheet className="w-4 h-4 text-[#C4AE96]" />
                <span>Corporate Excel 365 Mastery</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Corporate Excel 365: 250+ Formulas, 500+ Troubleshooting & Automated MIS Dashboards
              </h2>

              <p className="text-sm text-[#D8C5B2] leading-relaxed">
                Modern accountants cannot survive on basic SUM and AVERAGE. At YLCC, learn the modern dynamic array formulas (XLOOKUP, FILTER, UNIQUE, SORTBY, LET, LAMBDA) used by corporate finance desks to automate recurring reports and build executive dashboards.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="bg-[#362013] p-3 rounded-xl border border-[#4E2F1D] text-center">
                  <span className="text-2xl font-serif font-bold text-[#E8DCCF]">250+</span>
                  <span className="text-[11px] text-[#A68A70] block mt-1">Excel 365 Formulas</span>
                </div>

                <div className="bg-[#362013] p-3 rounded-xl border border-[#4E2F1D] text-center">
                  <span className="text-2xl font-serif font-bold text-[#E8DCCF]">500+</span>
                  <span className="text-[11px] text-[#A68A70] block mt-1">Error Troubleshooting</span>
                </div>

                <div className="bg-[#362013] p-3 rounded-xl border border-[#4E2F1D] text-center">
                  <span className="text-2xl font-serif font-bold text-[#E8DCCF]">250+</span>
                  <span className="text-[11px] text-[#A68A70] block mt-1">Interview Questions</span>
                </div>

                <div className="bg-[#362013] p-3 rounded-xl border border-[#4E2F1D] text-center">
                  <span className="text-2xl font-serif font-bold text-[#E8DCCF]">10+</span>
                  <span className="text-[11px] text-[#A68A70] block mt-1">Live MIS Dashboards</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/advanced-excel"
                  className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all inline-flex items-center gap-2 shadow-md"
                >
                  <span>Explore Dedicated Advanced Excel Syllabus</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side Callout Card */}
            <div className="lg:col-span-5 bg-[#362013] p-6 sm:p-8 rounded-2xl border border-[#4E2F1D] space-y-4">
              <h3 className="text-lg font-serif font-bold text-white border-b border-[#4E2F1D] pb-3">
                Key Excel 365 Competencies Taught:
              </h3>
              <ul className="space-y-2.5 text-xs text-[#D8C5B2]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>XLOOKUP 2-way reverse lookups & wildcard matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dynamic arrays: FILTER, UNIQUE, SORT, CHOOSEROWS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Power Query (ETL) automated monthly data imports</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-table Pivot Tables & interactive slicer dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Resolving #CALC!, #SPILL!, #N/A and circular references</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/resources"
                  className="text-xs font-semibold text-[#E8DCCF] hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sample Excel MIS Formats →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FACULTY PREVIEW */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
            Mentorship by Practicing Professionals
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1810]">
            Learn Directly from Chartered Accountants & Practitioners
          </h2>
          <p className="text-sm text-[#57534E]">
            Our mentors are seasoned Chartered Accountants, Company Secretaries, and Corporate Accounts Heads with decades of live industry experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFaculty.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-[#E5D8CA] p-6 text-center space-y-4 hover:shadow-md hover:border-[#8B5A2B] transition-all"
            >
              <div className="w-20 h-20 rounded-full bg-[#2A1810] text-[#E5D8CA] mx-auto flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#C4AE96]">
                {fac.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-[#2A1810]">{fac.name}</h3>
                <p className="text-xs font-semibold text-[#8B5A2B]">{fac.designation}</p>
                <p className="text-[11px] text-[#78716C] mt-0.5">{fac.qualifications}</p>
              </div>

              <p className="text-xs text-[#57534E] line-clamp-3 leading-relaxed">
                {fac.bio}
              </p>

              <div className="pt-2 border-t border-[#EFE6DD] text-[11px] text-[#8B5A2B] font-semibold">
                {fac.experienceYears}+ Years Practical Experience
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/faculty"
            className="text-xs font-bold text-[#2A1810] hover:text-[#8B5A2B] underline"
          >
            Read Complete Profiles of Our Accounting Faculty Panel →
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. STUDENT TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="bg-[#FAF6F0] py-16 border-y border-[#E5D8CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
              Student Journeys
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1810]">
              Commerce Graduates Transformed into Confident Accountants
            </h2>
            <p className="text-sm text-[#57534E]">
              Hear from students who stepped directly from textbook learning into corporate accounts and taxation desks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#8B5A2B]">
                    {[...Array(test.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EFE6DD]">
                  <p className="text-sm font-serif font-bold text-[#2A1810]">{test.studentName}</p>
                  <p className="text-[11px] font-semibold text-[#8B5A2B]">{test.currentRole}</p>
                  <p className="text-[10px] text-[#78716C]">{test.company}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/student-success"
              className="text-xs font-bold text-[#8B5A2B] hover:underline"
            >
              View More Verified Student Reviews & Certificates →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FAST-TRACK ADMISSION ENQUIRY & FAQS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Col: Frequently Asked Questions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
                Clarifications & Admissions
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#2A1810]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#57534E]">
                Have questions about our practical batches, course eligibility, software used, or batch timings?
              </p>
            </div>

            <FAQAccordion faqs={faqs} />
          </div>

          {/* Right Col: Interactive Quick Enquiry Form */}
          <div className="lg:col-span-5">
            <QuickEnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
