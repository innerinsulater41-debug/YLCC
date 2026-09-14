"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { FAQItem } from "@/types";

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "General", "Courses", "Admissions", "Placements"];

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Everything you need to know about our cohort admissions, curriculum intensity, and career placement.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/60 transition-colors focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
