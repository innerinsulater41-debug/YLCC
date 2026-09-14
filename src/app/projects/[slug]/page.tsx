import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import { formatDate } from "@/lib/utils";
import {
  ExternalLink,
  Calendar,
  FileText,
  FileArchive,
  PlayCircle,
  Sparkles,
  ArrowRight,
  User,
  Users,
  Shield,
  Layers,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await DataStore.getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found | YLCC" };

  return {
    title: project.seoTitle || `${project.title} | YLCC Student Showcase`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await DataStore.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Get related projects
  const allProjects = await DataStore.getProjects(false);
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <PublicLayout>
      <div className="bg-[#faf7f2] min-h-screen">
        {/* Project Header Banner - Luxury Beige & White Aesthetic */}
        <section className="bg-white border-b border-[#e8e2d8] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#faf7f2] rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="max-w-7xl mx-auto space-y-6 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#faf7f2] text-[#a16207] border border-[#e8e2d8] text-xs font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#faf7f2] text-[#78716c] border border-[#e8e2d8] text-xs font-semibold">
                {project.academicBatch}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#faf7f2] text-[#78716c] border border-[#e8e2d8] text-xs font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#a16207]" />
                Completed {formatDate(project.completionDate)}
              </span>
            </div>

            {/* HEADING: PROJECT NAME */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1c1917] tracking-tight leading-tight max-w-4xl">
              {project.title}
            </h1>

            <p className="text-[#57534e] text-base sm:text-lg leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>

            {/* POINTS UNDER HEADING: PROJECT TOPICS */}
            {project.topics && project.topics.length > 0 && (
              <div className="bg-[#faf7f2] p-6 rounded-2xl border border-[#e8e2d8] max-w-4xl space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#a16207]" />
                  <span className="text-xs font-bold text-[#a16207] uppercase tracking-wider">
                    Core Project Topics & Architectural Highlights
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {project.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#1c1917] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#a16207] shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Links (Live demo, Github, PDF, Zip) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a16207] hover:bg-[#854d0e] text-white font-semibold text-xs shadow-sm transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#faf7f2] text-[#1c1917] font-semibold text-xs border border-[#e8e2d8] shadow-sm transition"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.pdfReportUrl && (
                <a
                  href={project.pdfReportUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#faf7f2] text-[#1c1917] font-semibold text-xs border border-[#e8e2d8] shadow-sm transition"
                >
                  <FileText className="w-4 h-4 text-[#a16207]" />
                  <span>Architecture PDF</span>
                </a>
              )}

              {project.zipSourceUrl && (
                <a
                  href={project.zipSourceUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#faf7f2] text-[#1c1917] font-semibold text-xs border border-[#e8e2d8] shadow-sm transition"
                >
                  <FileArchive className="w-4 h-4 text-[#a16207]" />
                  <span>Source Archive ZIP</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Media & Full Description */}
            <div className="lg:col-span-8 space-y-10">
              {/* Cover Image Showcase */}
              <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#e8e2d8] shadow-sm bg-white">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Gallery Screenshots */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#1c1917] tracking-tight">
                    System Architecture & Interface Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.galleryImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative h-52 rounded-2xl overflow-hidden border border-[#e8e2d8] bg-white group shadow-sm"
                      >
                        <Image
                          src={imgUrl}
                          alt={`Screenshot ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-[#1c1917] tracking-tight">
                  Project Overview & Technical Engineering
                </h2>
                <div className="p-8 rounded-3xl bg-white border border-[#e8e2d8] text-[#57534e] leading-relaxed text-sm sm:text-base space-y-4 shadow-sm">
                  <p className="whitespace-pre-line">{project.fullDescription}</p>
                  <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8e2d8] text-xs text-[#78716c] font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#a16207] shrink-0" />
                    <span>
                      <strong className="text-[#1c1917]">Engineering Verification:</strong> Reviewed, defended, and validated by the YLCC Academic Mentorship Council under strict production deployment standards.
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Demo Embed if present */}
              {project.demoVideoUrl && (
                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold text-[#1c1917] tracking-tight">
                    Live Demonstration Video
                  </h3>
                  <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <PlayCircle className="w-8 h-8 text-[#a16207] shrink-0" />
                      <div>
                        <div className="font-bold text-[#1c1917] text-sm">
                          Watch Live Walkthrough & Code Defense
                        </div>
                        <div className="text-xs text-[#78716c]">Recorded technical demo session</div>
                      </div>
                    </div>
                    <a
                      href={project.demoVideoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#faf7f2] text-[#a16207] hover:bg-[#f5f2eb] border border-[#e8e2d8] font-semibold text-xs transition"
                    >
                      Open Video
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Metadata, Tech Stack, Contributors, Mentor */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tech Stack Box */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm space-y-4">
                <h3 className="text-sm font-serif font-bold text-[#1c1917]">
                  Technologies & Architecture Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-[#faf7f2] text-[#78716c] text-xs font-semibold border border-[#e8e2d8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentor Credit Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#a16207]">
                  Supervising Faculty Mentor
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#faf7f2] border border-[#e8e2d8] text-[#a16207] flex items-center justify-center font-bold shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-[#1c1917] text-sm">{project.mentorName}</div>
                    <div className="text-xs text-[#78716c]">{project.mentorDesignation}</div>
                  </div>
                </div>
              </div>

              {/* Student Contributors Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-serif font-bold text-[#1c1917]">
                    Student Engineers
                  </h3>
                  <span className="text-xs text-[#78716c]">
                    {project.contributors.length} Contributors
                  </span>
                </div>

                <div className="space-y-2.5">
                  {project.contributors.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#faf7f2] border border-[#e8e2d8]"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#1c1917]">{c.name}</div>
                        <div className="text-[11px] text-[#78716c]">{c.role}</div>
                      </div>
                      {c.linkedinUrl && (
                        <a
                          href={c.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#78716c] hover:text-[#0077b5] transition"
                          title="LinkedIn Profile"
                        >
                          <LinkedInIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-[#e8e2d8] shadow-sm space-y-4">
                  <h3 className="text-sm font-serif font-bold text-[#1c1917]">
                    More in {project.category}
                  </h3>
                  <div className="space-y-3">
                    {relatedProjects.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/projects/${rel.slug}`}
                        className="block p-3 rounded-2xl hover:bg-[#faf7f2] border border-[#e8e2d8] transition"
                      >
                        <div className="text-xs font-bold text-[#1c1917] line-clamp-1">
                          {rel.title}
                        </div>
                        <div className="text-[11px] text-[#78716c] mt-0.5">
                          {rel.academicBatch}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
