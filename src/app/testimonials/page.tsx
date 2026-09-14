import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import { Star, Building2, PlayCircle, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function TestimonialsPage() {
  const testimonials = await DataStore.getTestimonials(true);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 bg-[#1c1917] text-stone-200 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-800/60 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alumni Verification & Stories</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            What Our Graduates Say About YLCC
          </h1>
          <p className="text-stone-400 text-base leading-relaxed">
            Read real, unfiltered experiences from our alumni who made successful career transitions into leading tech enterprises and startups.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-white border border-stone-200 card-hover flex flex-col justify-between space-y-6 shadow-2xs"
            >
              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                <p className="text-stone-700 text-sm leading-relaxed italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.photoUrl}
                    alt={review.studentName}
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">{review.studentName}</h3>
                    <div className="flex items-center gap-1 text-xs text-amber-800 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-stone-400" />
                      <span>{review.currentRole}, {review.company}</span>
                    </div>
                    <div className="text-[11px] text-stone-400">{review.courseName} • {review.batch}</div>
                  </div>
                </div>

                {review.videoUrl && (
                  <a
                    href={review.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-stone-400 hover:text-amber-700 transition-colors"
                    title="Watch Video Review"
                  >
                    <PlayCircle className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 rounded-3xl bg-white border border-stone-200 shadow-sm max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-stone-900">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-stone-600 text-sm">
            Speak with an admissions counselor and start your cohort journey at YLCC today.
          </p>
          <div className="pt-2">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>Apply for Summer 2026 Batch</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
