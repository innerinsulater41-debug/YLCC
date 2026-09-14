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
      <section className="bg-gradient-to-b from-[#F7F3E9] to-[#FAF7F0] pt-12 pb-16 border-b border-[#E8DFC8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527] bg-[#ECE4D4] px-3 py-1 rounded-full border border-[#D4C5AD]">
            Practical Commerce Mentorship
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#192538]">
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
              className="bg-white rounded-2xl border border-[#E2D7C3] p-6 sm:p-8 shadow-xs hover:shadow-lg hover:border-[#8C6527] transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#192538] text-[#E8DEC8] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#C1AF93] shrink-0">
                    {fac.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-serif font-bold text-[#192538]">{fac.name}</h2>
                    <p className="text-xs font-semibold text-[#8C6527]">{fac.designation}</p>
                    <p className="text-[11px] text-[#78716C]">{fac.qualifications}</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-[#FAF7F0] border border-[#E2D7C3] text-[10px] font-bold text-[#57534E]">
                      {fac.experienceYears}+ Years Industry Practice
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {fac.bio}
                </p>

                {/* Areas of Expertise */}
                <div className="space-y-2 pt-2 border-t border-[#EFE8DD]">
                  <span className="text-xs font-bold text-[#192538] block">Specialization Areas:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {fac.expertiseAreas.map((exp, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-[#FAF7F0] text-[#57534E] border border-[#E2D7C3] px-2.5 py-0.5 rounded-md"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Programs Taught */}
                <div className="space-y-1 pt-2 border-t border-[#EFE8DD] text-xs">
                  <span className="font-bold text-[#192538]">Programs Mentored:</span>{' '}
                  <span className="text-[#8C6527] font-medium">{fac.programsTaught.join(' • ')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE8DD] flex items-center justify-between text-xs">
                {fac.email && (
                  <a
                    href={`mailto:${fac.email}`}
                    className="text-[#78716C] hover:text-[#192538] flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#8C6527]" />
                    <span>{fac.email}</span>
                  </a>
                )}

                <Link
                  href="/apply"
                  className="bg-[#8C6527] hover:bg-[#74511D] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
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
