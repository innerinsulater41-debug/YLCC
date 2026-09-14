import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | YLCC',
  description: 'Privacy policy and data protection terms of Yukti Ledger & Commerce Centre (YLCC).',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-[#E8DFC8] pb-4">
        <h1 className="text-3xl font-serif font-bold text-[#192538]">Privacy Policy</h1>
        <p className="text-xs text-[#78716C] mt-1">Last Updated: March 2026 • YLCC Commerce Centre</p>
      </div>

      <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">1. Information We Collect</h2>
          <p>
            Yukti Ledger & Commerce Centre (YLCC) collects student contact details (name, email address, telephone number, residential address) and educational qualifications when you submit an enquiry, download brochures, or file an admission application.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">2. Use of Information</h2>
          <p>
            Your information is strictly utilized to process your course admissions, provide academic counseling, deliver course syllabi, verify student ledgers, and issue verifiable course completion certificates. We never sell, rent, or lease student personal data to third-party marketing companies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">3. Educational Data & Practice Books</h2>
          <p>
            Worksheets and case study datasets provided to students during their training are based on sanitized, anonymized business models to ensure complete compliance with Indian data protection laws and commercial confidentiality norms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">4. Contact Us</h2>
          <p>
            If you have any questions regarding our privacy practices, you may reach our compliance office at{' '}
            <a href="mailto:privacy@ylcccommerce.in" className="text-[#8C6527] font-semibold underline">
              privacy@ylcccommerce.in
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
