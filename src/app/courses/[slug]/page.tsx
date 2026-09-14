import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Clock,
  Users,
  CheckCircle2,
  FileDown,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await DataStore.getCourseBySlug(slug);

  if (!course) return { title: "Course Not Found | YLCC" };

  return {
    title: `${course.title} | YLCC Academic Curriculum`,
    description: course.shortDescription,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      images: [course.thumbnailUrl],
    },
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;
  const course = await DataStore.getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <PublicLayout>
      <div className="bg-[#faf7f2] min-h-screen">
        {/* Course Hero Header - Beige and White Aesthetic */}
        <section className="bg-white border-b border-[#e8e2d8] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#faf7f2] rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#faf7f2] text-[#a16207] border border-[#e8e2d8] text-xs font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#faf7f2] text-[#78716c] border border-[#e8e2d8] text-xs font-semibold">
                  {course.mode} Learning Mode
                </span>
                <span className="px-3 py-1 rounded-full bg-[#faf7f2] text-[#78716c] border border-[#e8e2d8] text-xs font-semibold">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1c1917] tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-[#57534e] text-base sm:text-lg leading-relaxed max-w-3xl">
                {course.shortDescription}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8e2d8]">
                  <div className="text-[#a8a29e] text-xs font-medium">Duration</div>
                  <div className="font-serif font-bold text-[#1c1917] mt-0.5">{course.duration}</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8e2d8]">
                  <div className="text-[#a8a29e] text-xs font-medium">Batch Timing</div>
                  <div className="font-serif font-bold text-[#1c1917] mt-0.5">{course.batchTiming}</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8e2d8]">
                  <div className="text-[#a8a29e] text-xs font-medium">Start Date</div>
                  <div className="font-serif font-bold text-[#1c1917] mt-0.5">{formatDate(course.startDate)}</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8e2d8]">
                  <div className="text-[#a8a29e] text-xs font-medium">Seats Remaining</div>
                  <div className="font-serif font-bold text-[#a16207] mt-0.5">{course.availableSeats} of {course.totalSeats}</div>
                </div>
              </div>
            </div>

            {/* Pricing & Application Card */}
            <div className="lg:col-span-4">
              <div className="p-8 rounded-3xl bg-white text-[#1c1917] border border-[#e8e2d8] shadow-lg space-y-6">
                <div>
                  <div className="text-xs text-[#a8a29e] font-bold uppercase tracking-wider">
                    Program Investment
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-serif font-bold text-[#1c1917]">
                      {formatCurrency(course.discountedFees || course.fees)}
                    </span>
                    {course.discountedFees && (
                      <span className="text-sm text-[#a8a29e] line-through font-medium">
                        {formatCurrency(course.fees)}
                      </span>
                    )}
                  </div>
                  {course.discountedFees && (
                    <div className="text-xs font-semibold text-emerald-700 mt-1">
                      Merit scholarship applied
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/apply?course=${encodeURIComponent(course.title)}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#a16207] hover:bg-[#854d0e] text-white font-semibold text-sm shadow-sm transition"
                  >
                    <span>Apply for This Cohort</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={course.brochureUrl || "/uploads/sample-resume.pdf"}
                    download
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#e8e2d8] text-[#1c1917] hover:bg-[#faf7f2] font-semibold text-xs transition"
                  >
                    <FileDown className="w-4 h-4 text-[#a16207]" />
                    <span>Download Curriculum PDF</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#f5f2eb] space-y-2 text-xs text-[#78716c]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verifiable Cryptographic Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1-on-1 Mock Interviews &amp; Career Placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complimentary Cloud Sandbox Environment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Details Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Syllabus & Details */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#1c1917] tracking-tight">
                  About the Cohort
                </h2>
                <p className="text-[#57534e] leading-relaxed text-sm sm:text-base">
                  {course.fullDescription}
                </p>
              </div>

              {/* Tools and Technologies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#1c1917] tracking-tight">
                  Tools, Frameworks &amp; Stacks Mastered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {course.toolsAndTech.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 rounded-xl bg-white border border-[#e8e2d8] text-[#1c1917] text-xs font-semibold shadow-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Syllabus Modules */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold text-[#1c1917] tracking-tight">
                    Detailed Syllabus &amp; Learning Roadmap
                  </h2>
                  <span className="text-xs font-semibold text-[#a16207]">
                    {course.modules.length} Intensive Modules
                  </span>
                </div>

                <div className="space-y-4">
                  {course.modules.map((module, idx) => (
                    <div
                      key={module.id || idx}
                      className="p-6 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-[#faf7f2] text-[#a16207] border border-[#e8e2d8] font-bold text-xs">
                          Module {idx + 1} • {module.durationWeeks} Weeks
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-[#1c1917]">
                        {module.title}
                      </h3>
                      <p className="text-[#78716c] text-xs leading-relaxed">
                        {module.description}
                      </p>

                      <div className="pt-3 border-t border-[#f5f2eb]">
                        <div className="text-[11px] font-bold uppercase text-[#a8a29e] mb-2">
                          Core Concepts Covered:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {module.topics.map((topic, tIdx) => (
                            <div
                              key={tIdx}
                              className="flex items-center gap-2 text-xs text-[#57534e]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#a16207] shrink-0" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#1c1917] tracking-tight">
                  Verified Learning Outcomes
                </h2>
                <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] space-y-3 shadow-sm">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#57534e]">
                      <CheckCircle2 className="w-4 h-4 text-[#a16207] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#1c1917] tracking-tight">
                  Eligibility &amp; Prerequisites
                </h2>
                <div className="p-6 rounded-3xl bg-[#faf7f2] border border-[#e8e2d8] space-y-3">
                  {course.eligibility.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#57534e]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#a16207] mt-2 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Instructor & Sidebar CTAs */}
            <div className="lg:col-span-4 space-y-6">
              {/* Instructor Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm space-y-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#a16207]">
                  Lead Cohort Instructor
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[#e8e2d8] shrink-0 bg-[#faf7f2]">
                    <Image
                      src={course.instructorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                      alt={course.instructorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#1c1917]">
                      {course.instructorName}
                    </h3>
                    <p className="text-xs font-semibold text-[#a16207]">
                      {course.instructorRole}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#78716c] leading-relaxed border-t border-[#f5f2eb] pt-3">
                  Conducts live code reviews, holds weekly 1-on-1 architectural office hours, and provides senior referrals to hiring partners.
                </p>
              </div>

              {/* Ready to apply box */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a16207] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Academic Counseling</span>
                </div>
                <h3 className="text-base font-serif font-bold text-[#1c1917]">Have Questions About This Track?</h3>
                <p className="text-xs text-[#78716c] leading-relaxed">
                  Speak directly with an academic counselor to clarify syllabus topics, scholarship options, and batch timings.
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#a16207] hover:bg-[#854d0e] text-white font-semibold text-xs transition shadow-sm"
                >
                  <span>Request Academic Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
