import React, { Suspense } from 'react';
import { db } from '@/lib/db';
import AdmissionFormClient from '@/components/admission/AdmissionFormClient';

export const metadata = {
  title: 'Apply for Admission | YLCC Practical Commerce Institute',
  description:
    'Submit your admission application for practical accounting, GST, TDS/TCS, Banking CC Limits, or Corporate Excel 365 batches at YLCC Jaipur.',
};

export default async function ApplyPage() {
  const programs = await db.getPrograms(true);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-16 border-b border-[#E5D8CA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Practical Cohort Admissions
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1810]">
            Apply for YLCC Practical Training
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
            Take the first step toward career-ready accounting competence. Select your course, preferred batch timing, and reserve your seat for the upcoming practical cohort.
          </p>
        </div>
      </section>

      {/* Form Section Wrapped in Suspense */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-20 text-sm text-[#78716C]">Loading admission form...</div>}>
          <AdmissionFormClient programs={programs} />
        </Suspense>
      </section>
    </div>
  );
}
