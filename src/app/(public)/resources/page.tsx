import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import ResourcesClient from '@/components/resources/ResourcesClient';

export const metadata = {
  title: 'Commerce Resources & Accounting Practice Files | YLCC',
  description:
    'View and explore course brochures, sample accounting formats, GST compliance guides, TDS rate charts, and Excel practice worksheets online at YLCC.',
};

export default async function ResourcesPage() {
  const resources = await db.getResources('public');

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-16 border-b border-[#E5D8CA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Commerce Reference Library
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1810]">
            Resources & Practice Files
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            Instant online access to official YLCC course brochures, sample commercial vouchers, banking stock statement formats, and GST compliance checklists.
          </p>
        </div>
      </section>

      {/* Resources Interactive Client (with In-Website PDF Viewer) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ResourcesClient resources={resources} />

        {/* Student Notice */}
        <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#E5D8CA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-serif font-bold text-[#2A1810]">
              Looking for Specialized Multi-Business Practice Ledgers?
            </h4>
            <p className="text-xs text-[#57534E]">
              Registered students receive encrypted access to full 1-year transaction datasets for all 30 businesses.
            </p>
          </div>
          <Link
            href="/apply"
            className="bg-[#2A1810] hover:bg-[#1F120A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Enroll as Student
          </Link>
        </div>
      </section>
    </div>
  );
}
