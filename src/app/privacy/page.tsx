import PublicLayout from "@/components/layout/PublicLayout";

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <section className="py-16 bg-[#1c1917] text-white border-b border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black">Privacy Policy</h1>
          <p className="text-stone-400 text-sm">Last Updated: May 2026</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-8 text-stone-700 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">1. Information Collection</h2>
            <p>
              YLCC (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects personal information that you provide when submitting enquiries, registering for events, applying for cohort admissions, or booking enterprise consultations. This information includes your name, email address, phone number, academic background, and any uploaded resumes or project files.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">2. Use of Information</h2>
            <p>
              We use your data solely to evaluate course admission eligibility, provide educational services, issue verifiable certificates, facilitate hiring interviews with enterprise partners, and communicate critical schedule updates.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">3. Data Security & Storage</h2>
            <p>
              Your personal information is stored securely on encrypted relational databases and certified cloud storage with restricted access controls. We never sell or license student or client data to third-party marketing entities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-stone-900">4. Contacting Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to request data correction, please email our Data Privacy Officer at <a href="mailto:privacy@ylcc.edu.in" className="text-amber-800 font-semibold underline">privacy@ylcc.edu.in</a>.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
