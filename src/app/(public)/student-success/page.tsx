import React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  GraduationCap,
  Quote,
  Star,
  ArrowRight,
  Briefcase,
  FileCheck,
} from 'lucide-react';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Student Success Stories & Practical Achievements | YLCC',
  description:
    'Read genuine reviews and career transformations from commerce graduates and junior accountants who mastered practical ledgers at YLCC Jaipur.',
};

export default async function StudentSuccessPage() {
  const testimonials = await db.getTestimonials();

  const skillJourneys = [
    {
      student: 'Gaurav Agarwal',
      background: 'Fresh B.Com Graduate (No Prior Office Experience)',
      afterTraining: 'Independent Junior Tax Accountant at Regional Textile Mill',
      skillsAcquired: [
        'Live sales billing with multi-tier GST rates',
        'Generating and canceling E-way bills on live portal',
        'Reconciling monthly purchase registers with GSTR-2B',
      ],
      quote:
        'College gave me a degree, but YLCC gave me the confidence to handle an actual accounts desk from 9 AM to 6 PM without fear of making statutory tax blunders.',
    },
    {
      student: 'Deepak Sain',
      background: 'Billing Clerk (Stuck with Basic Data Entry)',
      afterTraining: 'Promoted to Accounts Manager at Automobile Dealership',
      skillsAcquired: [
        'Debtors collection aging analysis and credit terms enforcement',
        'Scrutinizing negative cash ledgers and bank reconciliation',
        'Preparing books for annual Form 3CD Income Tax Audit',
      ],
      quote:
        'Learning how to run monthly internal audits and manage debtor collection cycles allowed me to transition from a ₹15,000 billing clerk into a department manager role.',
    },
    {
      student: 'Sunita Jain',
      background: 'CA Inter Aspirant Needing Industry Exposure',
      afterTraining: 'Tax & Compliance Associate at Mid-Tier CA Firm',
      skillsAcquired: [
        'Quarterly Form 26Q & Form 24Q TDS filing using NSDL RPU',
        'TRACES portal Form 16/16A certificate generation',
        'Monthly Drawing Power calculations for commercial bank CC limits',
      ],
      quote:
        'The depth of training in banking stock statements and TDS correction returns made me immediately productive during my articleship interviews.',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F7F3E9] to-[#FAF7F0] pt-12 pb-16 border-b border-[#E8DFC8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527] bg-[#ECE4D4] px-3 py-1 rounded-full border border-[#D4C5AD]">
            Practical Competence in Action
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#192538]">
            Student Success & Skill Journeys
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-3xl mx-auto leading-relaxed">
            We do not make exaggerated, unverified placement percentage claims. Instead, we let our students' practical ledger competence and genuine career transitions speak for themselves.
          </p>
        </div>
      </section>

      {/* Before-and-After Skill Transformations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#192538]">
            Real Before-and-After Skill Progression
          </h2>
          <p className="text-xs text-[#57534E]">
            How working on 16 multi-business projects transforms an individual’s professional value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillJourneys.map((journey, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E2D7C3] p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="border-b border-[#EFE8DD] pb-3">
                  <h3 className="text-lg font-serif font-bold text-[#192538]">{journey.student}</h3>
                  <p className="text-xs text-[#78716C] mt-0.5">{journey.background}</p>
                  <p className="text-xs font-bold text-[#8C6527] mt-1 flex items-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>{journey.afterTraining}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#192538] block">Practical Competencies Mastered:</span>
                  <ul className="space-y-1.5 text-xs text-[#57534E]">
                    {journey.skillsAcquired.map((skill, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#EFE8DD]">
                  <p className="text-xs text-[#57534E] italic leading-relaxed">
                    "{journey.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Testimonials */}
      <section className="bg-[#FAF7F0] py-16 border-y border-[#E2D7C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
              Verified Feedback
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#192538]">
              What Our Alumni Say About YLCC
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4"
              >
                <div className="flex items-center gap-1 text-[#8C6527]">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#57534E] leading-relaxed italic">
                  "{test.quote}"
                </p>

                <div className="pt-4 border-t border-[#EFE8DD] flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#192538]">{test.studentName}</h4>
                    <p className="text-xs text-[#8C6527] font-semibold">{test.currentRole}</p>
                    <p className="text-[11px] text-[#78716C]">{test.company}</p>
                  </div>
                  <span className="text-[11px] bg-[#FAF7F0] border border-[#E2D7C3] px-2.5 py-1 rounded-md text-[#57534E] font-medium">
                    {test.courseTaken}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Verification Information */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border-2 border-[#8C6527] p-8 sm:p-10 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#EFE8DD] pb-4">
            <Award className="w-8 h-8 text-[#8C6527]" />
            <div>
              <h2 className="text-xl font-serif font-bold text-[#192538]">
                YLCC Practical Skill Certification Standards
              </h2>
              <p className="text-xs text-[#78716C]">
                Rigorous project-based ledger evaluation by practicing Chartered Accountants
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-[#57534E] leading-relaxed">
            <p>
              Unlike conventional institutes that hand out attendance-based diplomas, a YLCC certificate is awarded ONLY upon satisfactory completion and verification of your practical ledgers, tax filings, and case study worksheets.
            </p>
            <p>
              Every student must submit completed books for at least 6 multi-business projects (including GST 2B reconciliation, Form 26Q return files, and Excel MIS models). This ensures that any employer or hiring CA who sees a YLCC credential knows the candidate possesses verified, desk-tested competence.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/apply"
              className="bg-[#8C6527] hover:bg-[#74511D] text-white px-6 py-2.5 rounded-lg text-xs font-semibold shadow transition-all"
            >
              Enroll for Practical Certification
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
