import React from 'react';

export const metadata = {
  title: 'Institutional Disclaimer | YLCC',
  description: 'Legal disclaimer and regulatory disclosures for YLCC training programs.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-[#E5D8CA] pb-4">
        <h1 className="text-3xl font-serif font-bold text-[#2A1810]">Institutional Disclaimer</h1>
        <p className="text-xs text-[#78716C] mt-1">Regulatory Notice • YLCC Commerce Training</p>
      </div>

      <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#2A1810]">1. Nature of Institute & Programs</h2>
          <p>
            Yukti Ledger & Commerce Centre (YLCC) is an independent vocational skill development institute providing practical training in accounting, taxation procedures, banking documentation, and corporate spreadsheets. YLCC is NOT a degree-granting college or university.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#2A1810]">2. No Statutory Professional Authorization</h2>
          <p>
            Completing any YLCC training course (such as the GST Practitioner or TDS/TCS Practitioner course) does not automatically confer statutory government licenses or enrollment under statutory professional bodies (such as the ICAI, ICSI, or Bar Council). Government-authorized practice is governed by the respective statutory acts and state or central regulatory bodies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#2A1810]">3. Employment & Placement Assistance</h2>
          <p>
            YLCC provides rigorous career guidance, resume structuring, interview preparation, and corporate job board references. However, YLCC does not offer unconditional employment guarantees. Final recruitment and salary packages are determined solely by employer assessment of individual student capability and performance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#2A1810]">4. Educational Case Studies</h2>
          <p>
            Business scenarios and case study names used in training projects (e.g. Jeevandhara Hospital, Speedways Logistics, Radhe Krishna FMCG) are simulated models created purely for educational instruction and practical skill building.
          </p>
        </section>
      </div>
    </div>
  );
}
