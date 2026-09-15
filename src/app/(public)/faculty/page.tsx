import React from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Mail,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Faculty & Mentors | Chartered Accountants & Industry Practitioners | YLCC',
  description:
    'Learn directly from seasoned Chartered Accountants, Company Secretaries, and Corporate Accounts Heads with extensive practical experience in taxation, banking, and audits.',
};

export default async function FacultyPage() {
  const faculty = await db.getFaculty();

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-16 border-b border-[#E5D8CA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Practical Commerce Mentorship
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1810]">
            Our Faculty Panel
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-3xl mx-auto leading-relaxed">
            At YLCC, classes are never taught by fresh college graduates reading from slides. Every session is led by practicing Chartered Accountants, Company Secretaries, and Corporate Accounts Directors who scrutinize your work as if it were being submitted to statutory auditors or tax authorities.
          </p>
        </div>
      </section>

      {/* Faculty Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faculty.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-[#E5D8CA] p-6 sm:p-8 shadow-xs hover:shadow-lg hover:border-[#8B5A2B] transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#2A1810] text-[#E8DCCF] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#C4AE96] shrink-0">
                    {fac.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-serif font-bold text-[#2A1810]">{fac.name}</h2>
                    <p className="text-xs font-semibold text-[#8B5A2B]">{fac.designation}</p>
                    <p className="text-[11px] text-[#78716C]">{fac.qualifications}</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-[#FAF6F0] border border-[#E5D8CA] text-[10px] font-bold text-[#57534E]">
                      {fac.experienceYears}+ Years Industry Practice
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {fac.bio}
                </p>

                {/* Areas of Expertise */}
                <div className="space-y-2 pt-2 border-t border-[#EFE6DD]">
                  <span className="text-xs font-bold text-[#2A1810] block">Specialization Areas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.expertiseAreas.map((exp, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#FAF6F0] text-[#57534E] border border-[#E5D8CA] px-2.5 py-0.5 rounded-md"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Programs Taught */}
                <div className="space-y-1 pt-2 border-t border-[#EFE6DD] text-xs">
                  <span className="font-bold text-[#2A1810]">Programs Mentored:</span>{' '}
                  <span className="text-[#8B5A2B] font-medium">{fac.programsTaught.join(' • ')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE6DD] flex items-center justify-between text-xs">
                {fac.email && (
                  <a
                    href={`mailto:${fac.email}`}
                    className="text-[#78716C] hover:text-[#2A1810] flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#8B5A2B]" />
                    <span>{fac.email}</span>
                  </a>
                )}

                <Link
                  href="/apply"
                  className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                  Join Mentorship Cohort
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
