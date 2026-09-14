import React from 'react';

export const metadata = {
  title: 'Refund & Cancellation Policy | YLCC',
  description: 'Course fee refund and batch transfer policies of YLCC.',
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="border-b border-[#E8DFC8] pb-4">
        <h1 className="text-3xl font-serif font-bold text-[#192538]">Refund & Cancellation Policy</h1>
        <p className="text-xs text-[#78716C] mt-1">YLCC Professional Commerce Training Institute</p>
      </div>

      <div className="space-y-6 text-sm text-[#57534E] leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">1. Seat Reservation Fee</h2>
          <p>
            Admission registration fees are utilized to prepare customized physical practice dossiers and allocate workstation software licenses.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">2. Cancellation Prior to Batch Commencement</h2>
          <p>
            If a student cancels their admission at least 7 days before the formal start date of the batch, the course tuition fee paid is refundable after deducting a 10% administrative processing fee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-serif font-bold text-[#192538]">3. Batch Transfer Flexibility</h2>
          <p>
            In the event of illness, college exams, or personal emergencies, students are permitted one free batch transfer to any subsequent cohort within 6 months without financial penalty.
          </p>
        </section>
      </div>
    </div>
  );
}
