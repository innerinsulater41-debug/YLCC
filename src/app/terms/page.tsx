import PublicLayout from "@/components/layout/PublicLayout";

export default function TermsPage() {
  return (
    <PublicLayout>
      <section className="py-16 bg-[#1c1917] text-white border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black">Terms &amp; Conditions</h1>
          <p className="text-stone-400 text-sm">Last Updated: May 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-8 text-stone-700 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the YLCC website, admissions portal, or enrolled educational cohort sandboxes, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">2. Academic Code of Conduct</h2>
            <p>
              Students are expected to uphold the highest standards of engineering integrity. Plagiarism of peer assignments, uncredited code theft, or harassment within student community channels will result in immediate disqualification and revocation of certification eligibility.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">3. Intellectual Property</h2>
            <p>
              Students retain 100% intellectual property ownership of their custom open-source capstone projects built during the program. YLCC course materials, lecture slides, and sandbox infrastructures are protected institutional copyright.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">4. Inquiries</h2>
            <p>
              For legal inquiries regarding these terms, contact <a href="mailto:legal@ylcc.edu.in" className="text-amber-800 font-semibold underline">legal@ylcc.edu.in</a>.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
