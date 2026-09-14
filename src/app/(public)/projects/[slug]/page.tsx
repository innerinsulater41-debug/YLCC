import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  Clock,
  Laptop,
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  FileText,
  FileSpreadsheet,
  Building2,
  User,
} from 'lucide-react';
import { db } from '@/lib/db';
import QuickEnquiryForm from '@/components/home/QuickEnquiryForm';

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await db.getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | YLCC Practical Accounting Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailProps) {
  const { slug } = await params;
  const project = await db.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await db.getProjects(true);
  const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-[#192538] text-white pt-12 pb-16 border-b-4 border-[#8C6527]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#C1AF93]">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-white">
              Practical Projects
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{project.industryCategory}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#192538] bg-[#E8DEC8] px-3 py-1 rounded-full">
                {project.industryCategory}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#8C6527] px-2.5 py-1 rounded-full">
                {project.difficultyLevel} Level
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight max-w-4xl">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-[#D4C5AD] max-w-3xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Key Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            <div className="bg-[#24334D] p-3 rounded-xl border border-[#3E5274]">
              <span className="text-[10px] uppercase font-bold text-[#A89577] block">Category</span>
              <span className="text-xs font-semibold text-white truncate block mt-0.5">
                {project.accountingCategory}
              </span>
            </div>

            <div className="bg-[#24334D] p-3 rounded-xl border border-[#3E5274]">
              <span className="text-[10px] uppercase font-bold text-[#A89577] block">Practice Time</span>
              <span className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#C1AF93]" />
                {project.practiceTimeHours} Hours Desk Lab
              </span>
            </div>

            <div className="bg-[#24334D] p-3 rounded-xl border border-[#3E5274]">
              <span className="text-[10px] uppercase font-bold text-[#A89577] block">Academic Batch</span>
              <span className="text-xs font-semibold text-white block mt-0.5">
                {project.academicYear} Live Cases
              </span>
            </div>

            <div className="bg-[#24334D] p-3 rounded-xl border border-[#3E5274]">
              <span className="text-[10px] uppercase font-bold text-[#A89577] block">Faculty Mentor</span>
              <span className="text-xs font-semibold text-[#E8DEC8] block mt-0.5">
                {project.facultyMentor}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Case Narrative & Execution Steps */}
          <div className="lg:col-span-8 space-y-10">
            {/* Business Scenario Narrative */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                1. The Real Business Scenario
              </h2>
              <div className="text-sm text-[#57534E] leading-relaxed space-y-3">
                <p>{project.businessScenario}</p>
                <p>{project.detailedDescription}</p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                2. Practical Learning Objectives
              </h2>
              <div className="space-y-2.5 pt-1">
                {project.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3]">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6527] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#192538] font-medium leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Tasks to Complete */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-6">
              <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                3. Student Practical Tasks to Execute
              </h2>
              <div className="space-y-4">
                {project.tasksToComplete.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3]">
                    <span className="w-6 h-6 rounded-full bg-[#192538] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {task}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Outcomes & Deliverables */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                4. Final Deliverables Evaluated by CA Mentor
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {project.expectedOutcomes.map((outcome, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#192538] font-medium leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloadable Project Files */}
            {project.resources && project.resources.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#8C6527] shadow-sm space-y-4">
                <h2 className="text-xl font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                  Downloadable Project Worksheets & Briefs
                </h2>
                <div className="space-y-3 pt-1">
                  {project.resources.map((res) => (
                    <div
                      key={res.id}
                      className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3] flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-[#ECE4D4] text-[#8C6527]">
                          {res.fileType === 'xlsx' ? (
                            <FileSpreadsheet className="w-5 h-5" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#192538]">{res.title}</p>
                          <p className="text-[11px] text-[#78716C]">
                            {res.fileType.toUpperCase()} • {res.fileSize}
                          </p>
                        </div>
                      </div>

                      <a
                        href={res.url}
                        download
                        className="inline-flex items-center gap-1.5 bg-[#8C6527] hover:bg-[#74511D] text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Case Summary & Quick Enquiry */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-md space-y-4">
              <h3 className="text-base font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                Project Information Card
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#78716C] block">Industry:</span>
                  <span className="font-semibold text-[#192538]">{project.industryCategory}</span>
                </div>

                <div>
                  <span className="text-[#78716C] block">Accounting Discipline:</span>
                  <span className="font-semibold text-[#192538]">{project.accountingCategory}</span>
                </div>

                <div>
                  <span className="text-[#78716C] block">Software Used:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.softwareUsed.map((s, i) => (
                      <span key={i} className="bg-[#FAF7F0] text-[#192538] px-2 py-0.5 rounded border text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[#78716C] block">Evaluation Mentor:</span>
                  <span className="font-semibold text-[#8C6527]">{project.facultyMentor}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EFE8DD]">
                <Link
                  href="/apply"
                  className="w-full text-center bg-[#8C6527] hover:bg-[#74511D] text-white py-2.5 rounded-lg text-xs font-semibold block shadow-xs transition-colors"
                >
                  Enroll to Practice This Case Study
                </Link>
              </div>
            </div>

            <QuickEnquiryForm />
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#E8DFC8] space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#192538]">Other Business Projects in the Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProjects.map((rp) => (
            <div
              key={rp.id}
              className="bg-white p-5 rounded-xl border border-[#E2D7C3] flex flex-col justify-between hover:border-[#8C6527] transition-all"
            >
              <div>
                <span className="text-[10px] font-bold text-[#8C6527] uppercase">{rp.industryCategory}</span>
                <h3 className="text-base font-serif font-bold text-[#192538] mt-1">
                  <Link href={`/projects/${rp.slug}`}>{rp.title}</Link>
                </h3>
                <p className="text-xs text-[#6B6357] mt-1 line-clamp-2">{rp.shortDescription}</p>
              </div>
              <div className="pt-4 mt-3 border-t border-[#EFE8DD] flex items-center justify-between text-xs">
                <span className="text-[#78716C]">{rp.practiceTimeHours} Hours</span>
                <Link href={`/projects/${rp.slug}`} className="font-semibold text-[#8C6527] flex items-center gap-1">
                  <span>View Case Study</span>
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
