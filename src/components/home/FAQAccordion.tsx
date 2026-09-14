'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ } from '@/types';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.id}
            className={`rounded-xl border transition-all ${
              isOpen
                ? 'bg-white border-[#8C6527] shadow-sm'
                : 'bg-[#FAF7F0] border-[#E2D7C3] hover:border-[#D4C5AD]'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm text-[#192538]"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ECE4D4] text-[#8C6527] text-xs flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-base font-serif">{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#8C6527] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-[#57534E] leading-relaxed border-t border-[#F3ECE0] mt-1 pl-14">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
