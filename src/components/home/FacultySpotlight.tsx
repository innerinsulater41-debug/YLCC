"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Award } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";
import { Faculty } from "@/types";

interface FacultySpotlightProps {
  faculty: Faculty[];
}

export default function FacultySpotlight({ faculty }: FacultySpotlightProps) {
  const displayFaculty = faculty.filter((f) => f.isFeatured).slice(0, 4);

  return (
    <section className="py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>World-Class Mentorship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Learn From Active Industry Leaders
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Our faculty members bring decades of real production experience from global tech leaders and elite academic institutions.
            </p>
          </div>

          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
          >
            <span>Meet All Mentors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayFaculty.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col items-center text-center card-hover justify-between"
            >
              <div className="space-y-4 flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600">
                    {member.designation}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {member.qualifications}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Social and Experience */}
              <div className="pt-4 mt-4 w-full border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  {member.experienceYears}+ Yrs Exp
                </span>
                <div className="flex items-center gap-2">
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-slate-900 transition-colors"
                      title="GitHub"
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
