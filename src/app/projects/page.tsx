"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  ExternalLink,
  Search,
  Grid,
  List,
  Sparkles,
  ArrowRight,
  User,
  Calendar,
  Layers,
  CheckCircle2,
  FileText,
  FileArchive,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import PublicLayout from "@/components/layout/PublicLayout";

export default function ProjectsGalleryPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success && data.projects) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = [
    "All",
    "Full-Stack Web",
    "AI & Machine Learning",
    "Cloud Architecture",
    "IoT & Hardware",
  ];

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proj.topics && proj.topics.some((top) => top.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      proj.technologies.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      categoryFilter === "All" || proj.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      <div className="bg-[#faf7f2] min-h-screen">
        {/* Beige & White Header Banner */}
        <section className="bg-white border-b border-[#e8e2d8] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#f5f2eb] rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf7f2] border border-[#e8e2d8] text-[#a16207] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Open-Source Capstone Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight">
              Student & Faculty Engineering Gallery
            </h1>
            <p className="text-[#78716c] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Every system below is production-tested, peer-reviewed, and deployed by YLCC student cohorts under industry mentorship.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Controls: Search, Category, View toggle */}
          <div className="bg-white p-6 rounded-3xl border border-[#e8e2d8] shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#a8a29e] absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by project name, project topics, or tech stack..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e8e2d8] text-[#1c1917] placeholder-[#a8a29e] text-sm focus:outline-none focus:border-[#a16207]"
                />
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 bg-[#faf7f2] p-1.5 rounded-xl border border-[#e8e2d8] self-end md:self-auto">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition ${
                    viewMode === "grid"
                      ? "bg-white text-[#a16207] shadow-sm font-bold"
                      : "text-[#78716c] hover:text-[#1c1917]"
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition ${
                    viewMode === "list"
                      ? "bg-white text-[#a16207] shadow-sm font-bold"
                      : "text-[#78716c] hover:text-[#1c1917]"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer border ${
                    categoryFilter === cat
                      ? "bg-[#1c1917] text-white border-[#1c1917] shadow-sm"
                      : "bg-[#faf7f2] text-[#78716c] hover:text-[#1c1917] border-[#e8e2d8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between my-6">
            <span className="text-xs font-semibold text-[#78716c]">
              Showing <strong className="text-[#1c1917]">{filteredProjects.length}</strong> engineering projects
            </span>
          </div>

          {/* Project List / Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white border border-[#e8e2d8] h-96 animate-pulse p-6"
                />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-[#e8e2d8] space-y-4">
              <Code2 className="w-12 h-12 text-[#a8a29e] mx-auto" />
              <h3 className="text-lg font-serif font-bold text-[#1c1917]">No matching projects found</h3>
              <p className="text-xs text-[#78716c] max-w-sm mx-auto">
                Try modifying your search query or select another category filter.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl bg-white border border-[#e8e2d8] overflow-hidden card-hover flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Project Image */}
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
                          <h2 className="text-lg font-serif font-bold text-[#1c1917] hover:text-[#a16207] transition line-clamp-2">
                            {project.title}
                          </h2>
                        </Link>
                        <p className="text-xs text-[#78716c] mt-2 line-clamp-2 leading-relaxed">
                          {project.shortDescription}
                        </p>
                      </div>

                      {/* POINTS UNDER HEADING: PROJECT TOPICS */}
                      {project.topics && project.topics.length > 0 && (
                        <div className="pt-2 border-t border-[#f5f2eb]">
                          <span className="text-[11px] font-bold text-[#a16207] uppercase tracking-wider block mb-2">
                            Core Project Topics & Capabilities:
                          </span>
                          <ul className="space-y-1.5">
                            {project.topics.slice(0, 3).map((topic, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-[#57534e]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#a16207] shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{topic}</span>
                              </li>
                            ))}
                            {project.topics.length > 3 && (
                              <li className="text-[11px] text-[#a8a29e] pl-5">
                                +{project.topics.length - 3} more technical topics in deep dive
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md bg-[#faf7f2] text-[#78716c] text-[10px] font-semibold border border-[#e8e2d8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mentor */}
                      <div className="flex items-center gap-2 pt-3 text-xs text-[#78716c] border-t border-[#f5f2eb]">
                        <User className="w-3.5 h-3.5 text-[#a16207] shrink-0" />
                        <span>Mentor: <strong className="text-[#1c1917] font-semibold">{project.mentorName}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#f5f2eb] mt-4 pt-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#a16207] hover:bg-[#854d0e] text-white font-semibold text-xs transition shadow-sm"
                    >
                      <span>Explore Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-1.5">
                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl border border-[#e8e2d8] text-[#78716c] hover:text-[#1c1917] hover:bg-[#faf7f2] transition"
                          title="Launch Live Demo"
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
                          title="GitHub Source"
                        >
                          <GitHubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl bg-white border border-[#e8e2d8] p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-start justify-between shadow-sm card-hover"
                >
                  <div className="relative w-full lg:w-72 h-48 rounded-2xl overflow-hidden shrink-0 bg-[#faf7f2]">
                    <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#faf7f2] border border-[#e8e2d8] text-[#a16207] font-semibold text-[10px]">
                        {project.category}
                      </span>
                      <span className="text-xs text-[#78716c]">{project.academicBatch}</span>
                    </div>

                    {/* HEADING: PROJECT NAME */}
                    <div>
                      <Link href={`/projects/${project.slug}`}>
                        <h2 className="text-xl font-serif font-bold text-[#1c1917] hover:text-[#a16207] transition">
                          {project.title}
                        </h2>
                      </Link>
                      <p className="text-xs text-[#78716c] mt-1 leading-relaxed max-w-2xl">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* POINTS UNDER HEADING: PROJECT TOPICS */}
                    {project.topics && project.topics.length > 0 && (
                      <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#e8e2d8] space-y-1.5">
                        <span className="text-[11px] font-bold text-[#a16207] uppercase tracking-wider block">
                          Project Topics & Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.topics.map((topic, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#57534e]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#a16207] shrink-0" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white text-[#78716c] text-[10px] font-semibold border border-[#e8e2d8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 w-full lg:w-44 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#f5f2eb]">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#a16207] hover:bg-[#854d0e] text-white text-xs font-semibold transition"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#e8e2d8] text-[#1c1917] hover:bg-[#faf7f2] text-xs font-semibold transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#a16207]" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PublicLayout>
  );
}
