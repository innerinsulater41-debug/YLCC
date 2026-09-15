import React from 'react';
import { db } from '@/lib/db';
import ProgramsListClient from '@/components/programs/ProgramsListClient';

export const metadata = {
  title: 'Training Programs | Practical Accounting, GST, TDS & Banking Courses',
  description:
    'Explore YLCC practical commerce programs: Accounts Operator, Accounts Manager, GST Practitioner, TDS/TCS, Corporate Payroll, Banking CC Limits, Cost Accounting, and Corporate Excel 365.',
};

export default async function ProgramsPage() {
  const programs = await db.getPrograms(true);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-16 border-b border-[#E5D8CA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Commerce Specialization Tracks
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1810]">
            Practical Training Programs
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-3xl mx-auto leading-relaxed">
            Every program is designed around physical business vouchers, live government portals, and 1-on-1 practical ledger guidance. No coding. No theoretical fluff.
          </p>
        </div>
      </section>

      {/* Interactive Program List with Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProgramsListClient programs={programs} />
      </section>
    </div>
  );
}
