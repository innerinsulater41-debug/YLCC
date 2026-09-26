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
import ProgramBrochureButton from '@/components/programs/ProgramBrochureButton';

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
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-14 border-b border-[#E5D8CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
            <Link href="/" className="hover:text-[#2A1810]">
              Home
            </Link>
            <span>/</span>
            <Link href="/programs" className="hover:text-[#2A1810]">
              Training Programs
            </Link>
            <span>/</span>
            <span className="text-[#8B5A2B] font-semibold">{program.category}</span>
          </div>

          <div className="space-y-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-xs inline-block transition-colors ${
                program.category === 'Tally Prime' || program.id === 'prog-1'
                  ? 'bg-[#8B5A2B] text-white border-[#7A4E24]'
                  : 'text-[#8B5A2B] bg-[#EFE6DD] border-[#D8C5B2]'
              }`}
            >
              {program.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1810] leading-tight max-w-4xl">
              {program.title}
            </h1>
            <p className="text-sm sm:text-base text-[#57534E] max-w-3xl leading-relaxed">
              {program.shortDescription}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            <div className="bg-white p-3 rounded-xl border border-[#E5D8CA]">
              <span className="text-[10px] uppercase font-bold text-[#78716C] block">Learning Mode</span>
              <span className="text-sm font-bold text-emerald-800 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Offline Classroom Lab
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E5D8CA]">
              <span className="text-[10px] uppercase font-bold text-[#78716C] block">Batch Timing</span>
              <span className="text-xs font-bold text-[#2A1810] truncate block mt-0.5">
                {program.batchTiming.split('|')[0] || program.batchTiming}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E5D8CA]">
              <span className="text-[10px] uppercase font-bold text-[#78716C] block">Batch Capacity</span>
              <span className="text-sm font-bold text-[#2A1810] block mt-0.5">
                {program.availableSeats} Seats Available
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
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#2A1810] border-b border-[#EFE6DD] pb-3">
                Program Overview & Desk Simulation
              </h2>
              <div className="text-sm text-[#57534E] leading-relaxed whitespace-pre-line space-y-3">
                {program.detailedDescription}
              </div>
            </div>

            {/* Core Operational Capabilities & Skills */}
            {program.coreCompetencies && program.coreCompetencies.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-6">
                <div className="border-b border-[#EFE6DD] pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#FAF6F0] px-2.5 py-1 rounded border border-[#E5D8CA] inline-block mb-2">
                    Core Operational Curriculum
                  </span>
                  <h2 className="text-xl font-serif font-bold text-[#2A1810]">
                    {program.coreCompetenciesHeading || `${program.coreCompetencies.length} Essential Practical Skills You Master`}
                  </h2>
                  <p className="text-xs text-[#78716C] mt-1">
                    {program.coreCompetenciesSubheading || 'Hands-on practical execution covering the complete operational curriculum and desk workflows.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {program.coreCompetencies.map((comp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E5D8CA] hover:border-[#8B5A2B] hover:shadow-xs transition-all space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-[#2A1810] uppercase tracking-wide">
                          {comp.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#57534E] leading-relaxed pl-7">
                        {comp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modules & Topics Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-4">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#2A1810]">Detailed Syllabus Breakdown</h2>
                  <p className="text-xs text-[#78716C] mt-0.5">Step-by-step practical modules</p>
                </div>
                {program.brochureUrl && (
                  <ProgramBrochureButton
                    title={`${program.title} - Official Syllabus Guide`}
                    fileUrl={program.brochureUrl}
                    variant="inline"
                    label="View Syllabus PDF"
                  />
                )}
              </div>

              <div className="space-y-6">
                {program.modules.map((module, idx) => (
                  <div key={module.id} className="p-5 rounded-xl bg-[#FAF6F0] border border-[#E5D8CA] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h3 className="text-base font-serif font-bold text-[#2A1810]">
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
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#2A1810] border-b border-[#EFE6DD] pb-3">
                Practical Learning Outcomes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {program.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF6F0] border border-[#E5D8CA]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#44403C] font-medium leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools, Software & Eligibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] space-y-3">
                <h3 className="text-base font-serif font-bold text-[#2A1810]">Tools & Portals Mastered</h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {program.softwareTools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-[#EFE6DD] text-[#2A1810] font-semibold text-xs border border-[#D8C5B2]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] space-y-3">
                <h3 className="text-base font-serif font-bold text-[#2A1810]">Eligibility Criteria</h3>
                <p className="text-xs text-[#57534E] leading-relaxed pt-1">
                  {program.eligibility}
                </p>
                <div className="text-[11px] text-[#78716C] border-t border-[#EFE6DD] pt-2">
                  Certification: {program.certificateInfo}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Card & Fast Enquiry Form */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            {/* Admission Action Card */}
            <div className="bg-white p-6 rounded-2xl border-2 border-[#8B5A2B] shadow-lg space-y-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B5A2B] tracking-wider block">
                  Batch Enrollment
                </span>
                <h4 className="text-lg font-serif font-bold text-[#2A1810] mt-1">
                  Offline Classroom Cohort
                </h4>
                <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                  Only {program.availableSeats} Seats Remaining for This Cohort
                </p>
              </div>

              <div className="space-y-2 text-xs text-[#57534E] border-t border-b border-[#EFE6DD] py-3">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Training Mode:</span>
                  <span className="font-semibold text-emerald-800">100% Offline Lab</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Start Date:</span>
                  <span className="font-semibold text-[#2A1810]">{program.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Schedule:</span>
                  <span className="font-semibold text-[#2A1810]">{program.batchTiming}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Lead Faculty:</span>
                  <span className="font-semibold text-[#2A1810]">{program.facultyName}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={`/apply?program=${program.slug}`}
                  className="w-full bg-[#8B5A2B] hover:bg-[#70441E] text-white py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Apply for Admission in This Batch</span>
                </Link>

                {program.brochureUrl && (
                  <ProgramBrochureButton
                    title={`${program.title} - Official Syllabus Guide`}
                    fileUrl={program.brochureUrl}
                    variant="full"
                    label="View Official Syllabus PDF"
                  />
                )}
              </div>
            </div>

            {/* Fast Enquiry Widget */}
            <QuickEnquiryForm />
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E5D8CA] space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#2A1810]">Other Practical Programs You May Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPrograms.map((rp) => (
            <div
              key={rp.id}
              className="bg-white p-5 rounded-xl border border-[#E5D8CA] flex flex-col justify-between hover:border-[#8B5A2B] transition-all"
            >
              <div>
                <span className="text-[10px] font-bold text-[#8B5A2B] uppercase">{rp.category}</span>
                <h3 className="text-base font-serif font-bold text-[#2A1810] mt-1">
                  <Link href={`/programs/${rp.slug}`}>{rp.title}</Link>
                </h3>
                <p className="text-xs text-[#6B584C] mt-1 line-clamp-2">{rp.shortDescription}</p>
              </div>
              <div className="pt-4 mt-3 border-t border-[#EFE6DD] flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-800 text-[11px]">
                  Offline Classroom
                </span>
                <Link href={`/programs/${rp.slug}`} className="font-semibold text-[#8B5A2B] flex items-center gap-1">
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
