"use client";

import { Star, Quote, Sparkles, Building2, PlayCircle } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  const approved = testimonials.filter((t) => t.isApproved).slice(0, 3);

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Alumni Verification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Transformed Careers. Proven Outcomes.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Read authentic stories from our graduates thriving at premier tech companies worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approved.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-2xl bg-white border border-slate-200 card-hover flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Author details */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.photoUrl}
                    alt={review.studentName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {review.studentName}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                      <Building2 className="w-3 h-3" />
                      <span>{review.currentRole}, {review.company}</span>
                    </div>
                  </div>
                </div>

                {review.videoUrl && (
                  <a
                    href={review.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    title="Watch Video Review"
                  >
                    <PlayCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
