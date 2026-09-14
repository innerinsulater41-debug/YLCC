import PublicLayout from "@/components/layout/PublicLayout";

export default function RefundPolicyPage() {
  return (
    <PublicLayout>
      <section className="py-16 bg-[#1c1917] text-white border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black">Refund &amp; Cancellation Policy</h1>
          <p className="text-stone-400 text-sm">Last Updated: May 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-8 text-stone-700 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">1. 7-Day Money Back Trial</h2>
            <p>
              We believe strongly in our curriculum intensity and mentorship quality. Enrolled students may request a 100% full refund within the first 7 calendar days from the cohort start date with zero questions asked.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">2. Cohort Deferrals</h2>
            <p>
              If unforeseen medical, personal, or professional emergencies arise during the program, students can defer their enrollment once to the next upcoming cohort without paying any re-enrollment penalties.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">3. Refund Processing</h2>
            <p>
              Approved refunds are credited back to the original payment method within 5-7 banking days. To initiate a refund or deferral, email <a href="mailto:finance@ylcc.edu.in" className="text-amber-800 font-semibold underline">finance@ylcc.edu.in</a> with your student admission reference ID.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
