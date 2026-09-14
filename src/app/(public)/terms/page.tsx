import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | YLCC',
  description: 'Terms and conditions for enrollment and training at YLCC.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-[#E8DFC8] pb-4">
        <h1 className="text-3xl font-serif font-bold text-[#192538]">Terms & Conditions</h1>
        <p className="text-xs text-[#78716C] mt-1">Effective: March 2026 • YLCC Commerce Centre</p>
      </div>

      <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">1. Educational Nature of Institute</h2>
          <p>
            YLCC is exclusively an independent professional skills and commerce training institute. We provide vocational and practical training in commercial accounting, taxation, banking documentation, and Advanced Excel.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">2. Attendance & Lab Requirements</h2>
          <p>
            Because training is document-driven and sequential, students are expected to maintain at least 85% attendance and complete all mandatory practical vouchers. Missed lab classes must be compensated during weekend revision cohorts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">3. Intellectual Property</h2>
          <p>
            All custom course materials, Excel MIS automation templates, and case study dossiers developed by YLCC are protected intellectual property. Redistribution, commercial resale, or unauthorized sharing is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">4. Code of Conduct</h2>
          <p>
            Students must observe strict professional discipline within campus accounting labs and maintain the integrity of licensed software and computing hardware.
          </p>
        </section>
      </div>
    </div>
  );
}
