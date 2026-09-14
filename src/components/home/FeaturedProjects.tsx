"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  ExternalLink,
  ArrowRight,
  User,
  CheckCircle2,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.isFeatured).slice(0, 3);
  const displayList = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section className="py-24 bg-[#faf7f2] border-b border-[#e8e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#a16207] border border-[#e8e2d8] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Code2 className="w-3.5 h-3.5" />
              <span>Real Student Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c1917] tracking-tight">
              Featured Capstone Projects
            </h2>
            <p className="text-[#78716c] text-sm sm:text-base leading-relaxed">
              Every project is deployed, open-sourced, and rigorously defended in front of industry juries and hiring partners.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#a16207] hover:text-[#854d0e] transition shrink-0"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayList.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white border border-[#e8e2d8] overflow-hidden card-hover flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Project Banner */}
                <div className="relative h-52 w-full bg-[#faf7f2] overflow-hidden group">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1c1917]/85 backdrop-blur-md text-white font-semibold text-[10px]">
                    {project.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#1c1917] font-semibold text-[10px] border border-[#e8e2d8]">
                    {project.academicBatch}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* HEADING: PROJECT NAME */}
                  <div>
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-lg font-serif font-bold text-[#1c1917] hover:text-[#a16207] transition line-clamp-2">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#78716c] mt-2 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* POINTS UNDER HEADING: PROJECT TOPICS */}
                  {project.topics && project.topics.length > 0 && (
                    <div className="pt-2 border-t border-[#f5f2eb]">
                      <span className="text-[10px] font-bold text-[#a16207] uppercase tracking-wider block mb-1.5">
                        Project Topics & Highlights:
                      </span>
                      <ul className="space-y-1">
                        {project.topics.slice(0, 3).map((topic, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-[#57534e]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#a16207] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-[#faf7f2] text-[#78716c] text-[10px] font-semibold border border-[#e8e2d8]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] text-[#a8a29e] font-medium self-center">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Mentor Credit */}
                  <div className="flex items-center gap-2 pt-2 text-xs text-[#78716c] border-t border-[#f5f2eb]">
                    <User className="w-3.5 h-3.5 text-[#a16207] shrink-0" />
                    <span>Mentor: <strong className="text-[#1c1917] font-semibold">{project.mentorName}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#f5f2eb] mt-4 pt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#a16207] hover:bg-[#854d0e] text-white font-semibold text-xs transition shadow-sm"
                >
                  <span>Project Deep Dive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1.5">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl border border-[#e8e2d8] text-[#78716c] hover:text-[#1c1917] hover:bg-[#faf7f2] transition"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl border border-[#e8e2d8] text-[#78716c] hover:text-[#1c1917] hover:bg-[#faf7f2] transition"
                      title="GitHub Repository"
                    >
                      <GitHubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
