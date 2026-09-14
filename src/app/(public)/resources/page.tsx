import React from 'react';
import Link from 'next/link';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Lock,
  Search,
  Filter,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Commerce Resources & Accounting Practice Files | YLCC',
  description:
    'Download course brochures, sample accounting formats, GST compliance guides, TDS rate charts, and Excel practice worksheets from YLCC.',
};

export default async function ResourcesPage() {
  const resources = await db.getResources('public');

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F7F3E9] to-[#FAF7F0] pt-12 pb-16 border-b border-[#E8DFC8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527] bg-[#ECE4D4] px-3 py-1 rounded-full border border-[#D4C5AD]">
            Commerce Reference Library
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#192538]">
            Resources & Practice Files
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            Free access to official YLCC course brochures, sample commercial vouchers, banking stock statement formats, and GST compliance checklists.
          </p>
        </div>
      </section>

      {/* Resources Table / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E2D7C3] p-6 shadow-xs hover:shadow-md hover:border-[#8C6527] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6527] bg-[#FAF7F0] px-2.5 py-0.5 rounded border border-[#E2D7C3]">
                    {item.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.accessLevel === 'public' ? 'Free Download' : 'Student Access'}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-3 bg-[#FAF7F0] rounded-xl text-[#8C6527] shrink-0 border border-[#E2D7C3]">
                    {item.fileType === 'xlsx' ? (
                      <FileSpreadsheet className="w-6 h-6" />
                    ) : (
                      <FileText className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-[#192538] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#57534E] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE8DD] flex items-center justify-between text-xs">
                <span className="text-[#78716C] text-[11px]">
                  {item.fileType.toUpperCase()} • {item.fileSize} • {item.downloadCount} Downloads
                </span>

                <a
                  href={item.fileUrl}
                  download
                  className="bg-[#8C6527] hover:bg-[#74511D] text-white px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Student Notice */}
        <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E2D7C3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-serif font-bold text-[#192538]">
              Looking for Specialized Multi-Business Practice Ledgers?
            </h4>
            <p className="text-xs text-[#57534E]">
              Registered students receive encrypted access to full 1-year transaction datasets for all 16 businesses.
            </p>
          </div>
          <Link
            href="/apply"
            className="bg-[#192538] hover:bg-[#0F172A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Enroll as Student
          </Link>
        </div>
      </section>
    </div>
  );
}
