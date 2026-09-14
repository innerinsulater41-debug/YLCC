import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import { Sparkles, Users, Award, BookOpen, Mail } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/BrandIcons";

export default async function FacultyPage() {
  const faculty = await DataStore.getFaculty();

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Distinguished Faculty Council</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Learn From Senior Practitioners & Architects
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Our mentors don&apos;t just teach—they lead distributed systems at top tech firms, publish research at leading ML conferences, and actively architect production systems.
          </p>
        </div>
      </section>

      {/* Faculty Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 card-hover flex flex-col sm:flex-row gap-6 items-start justify-between"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{member.name}</h2>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {member.designation}
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {member.qualifications} • {member.experienceYears}+ Years Industry Experience
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Courses Taught */}
                {member.coursesTaught.length > 0 && (
                  <div className="pt-2 text-xs text-slate-500 border-t border-slate-100 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Courses: <strong>{member.coursesTaught.join(", ")}</strong></span>
                  </div>
                )}

                {/* Social links */}
                <div className="flex items-center gap-3 pt-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-400 hover:text-blue-600 text-xs flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-blue-600 text-xs flex items-center gap-1"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {member.socialLinks?.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-slate-800 text-xs flex items-center gap-1"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
