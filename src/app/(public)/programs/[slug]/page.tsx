import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  Laptop,
  CheckCircle2,
  GraduationCap,
  Download,
  ArrowRight,
  ShieldCheck,
  User,
  Users,
  Award,
} from 'lucide-react';
import { db } from '@/lib/db';
import QuickEnquiryForm from '@/components/home/QuickEnquiryForm';

interface ProgramDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProgramDetailProps) {
  const { slug } = await params;
  const program = await db.getProgramBySlug(slug);
  if (!program) return { title: 'Program Not Found' };
  return {
    title: `${program.title} | YLCC Commerce Training`,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({ params }: ProgramDetailProps) {
  const { slug } = await params;
  const program = await db.getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const allPrograms = await db.getPrograms(true);
  const relatedPrograms = allPrograms.filter((p) => p.id !== program.id).slice(0, 3);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F7F3E9] to-[#FAF7F0] pt-12 pb-14 border-b border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
            <Link href="/" className="hover:text-[#192538]">
              Home
            </Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-[#192538]">
              Training Programs
            </Link>
            <span>/</span>
            <span className="text-[#8C6527] font-semibold">{program.category}</span>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527] bg-[#ECE4D4] px-3 py-1 rounded-full border border-[#D4C5AD]">
              {program.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#192538] leading-tight max-w-4xl">
              {program.title}
            </h1>
            <p className="text-sm sm:text-base text-[#57534E] max-w-3xl leading-relaxed">
              {program.shortDescription}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="bg-white p-3 rounded-xl border border-[#E2D7C3]">
              <span className="text-[10px] uppercase font-bold text-[#78716C] block">Duration</span>
              <span className="text-sm font-bold text-[#192538] flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-[#8C6527]" />
                {program.duration}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E2D7C3]">
              <span className="text-[10px] uppercase font-bold text-[#78716C] block">Learning Mode</span>
              <span className="text-sm font-bold text-[#192538] flex items-center gap-1.5 mt-0.5">
                <Laptop className="w-4 h-4 text-[#8C6527]" />
                {program.mode}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E2D7C3]">
              <span className="text-[10px] uppercase font-bold text-[#78716C] block">Batch Timing</span>
              <span className="text-xs font-bold text-[#192538] truncate block mt-0.5">
                {program.batchTiming.split('|')[0] || program.batchTiming}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E2D7C3]">
              <span className="text-[10px] uppercase font-bold text-[#78716C] block">Course Fee</span>
              <span className="text-sm font-bold text-[#8C6527] block mt-0.5">
                ₹
                {program.discountedFees
                  ? program.discountedFees.toLocaleString('en-IN')
                  : program.fees.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Syllabus & Learning Outcomes */}
          <div className="lg:col-span-8 space-y-10">
            {/* Detailed Description */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                Program Overview & Desk Simulation
              </h2>
              <div className="text-sm text-[#57534E] leading-relaxed whitespace-pre-line space-y-3">
                {program.detailedDescription}
              </div>
            </div>

            {/* Modules & Topics Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#EFE8DD] pb-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#192538]">Detailed Syllabus Breakdown</h2>
                  <p className="text-xs text-[#78716C] mt-0.5">Step-by-step practical modules</p>
                </div>
                {program.brochureUrl && (
                  <a
                    href={program.brochureUrl}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6527] bg-[#FAF7F0] border border-[#D4C5AD] px-3 py-1.5 rounded-lg hover:bg-[#E2D7C3] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>

              <div className="space-y-6">
                {program.modules.map((module, idx) => (
                  <div key={module.id} className="p-5 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#8C6527] text-white flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h3 className="text-base font-serif font-bold text-[#192538]">
                          {module.title}
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-[#78716C]">
                        {module.durationHours} Hours Lab
                      </span>
                    </div>

                    <ul className="space-y-2 pl-10 text-xs text-[#57534E]">
                      {module.topics.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                Practical Learning Outcomes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {program.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#44403C] font-medium leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools, Software & Eligibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] space-y-3">
                <h3 className="text-base font-serif font-bold text-[#192538]">Tools & Portals Mastered</h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {program.softwareTools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#ECE4D4] text-[#192538] font-semibold text-xs border border-[#D4C5AD]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] space-y-3">
                <h3 className="text-base font-serif font-bold text-[#192538]">Eligibility Criteria</h3>
                <p className="text-xs text-[#57534E] leading-relaxed pt-1">
                  {program.eligibility}
                </p>
                <div className="text-[11px] text-[#78716C] border-t border-[#EFE8DD] pt-2">
                  Certification: {program.certificateInfo}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Card & Fast Enquiry Form */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Admission Action Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#8C6527] shadow-lg space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8C6527] tracking-wider block">
                  Batch Enrollment
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-serif font-extrabold text-[#192538]">
                    ₹
                    {program.discountedFees
                      ? program.discountedFees.toLocaleString('en-IN')
                      : program.fees.toLocaleString('en-IN')}
                  </span>
                  {program.discountedFees && (
                    <span className="text-sm text-[#A89577] line-through">
                      ₹{program.fees.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                  Only {program.availableSeats} Seats Remaining for This Cohort
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#57534E] border-t border-b border-[#EFE8DD] py-3">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Start Date:</span>
                  <span className="font-semibold text-[#192538]">{program.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Schedule:</span>
                  <span className="font-semibold text-[#192538]">{program.batchTiming}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Lead Faculty:</span>
                  <span className="font-semibold text-[#192538]">{program.facultyName}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/apply?program=${program.slug}`}
                  className="w-full bg-[#8C6527] hover:bg-[#74511D] text-white py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply for Admission in This Batch</span>
                </Link>

                {program.brochureUrl && (
                  <a
                    href={program.brochureUrl}
                    download
                    className="w-full bg-[#FAF7F0] hover:bg-[#ECE4D4] text-[#192538] border border-[#D4C5AD] py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4 text-[#8C6527]" />
                    <span>Download Official Syllabus PDF</span>
                  </a>
                )}
              </div>
            </div>

            {/* Fast Enquiry Widget */}
            <QuickEnquiryForm />
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E8DFC8] space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#192538]">Other Practical Programs You May Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPrograms.map((rp) => (
            <div
              key={rp.id}
              className="bg-white p-5 rounded-xl border border-[#E2D7C3] flex flex-col justify-between hover:border-[#8C6527] transition-all"
            >
              <div>
                <span className="text-[10px] font-bold text-[#8C6527] uppercase">{rp.category}</span>
                <h3 className="text-base font-serif font-bold text-[#192538] mt-1">
                  <Link href={`/programs/${rp.slug}`}>{rp.title}</Link>
                </h3>
                <p className="text-xs text-[#6B6357] mt-1 line-clamp-2">{rp.shortDescription}</p>
              </div>
              <div className="pt-4 mt-3 border-t border-[#EFE8DD] flex items-center justify-between text-xs">
                <span className="font-bold text-[#192538]">
                  ₹{rp.discountedFees ? rp.discountedFees.toLocaleString('en-IN') : rp.fees.toLocaleString('en-IN')}
                </span>
                <Link href={`/programs/${rp.slug}`} className="font-semibold text-[#8C6527] flex items-center gap-1">
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
