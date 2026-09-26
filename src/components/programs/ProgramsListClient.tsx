'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Clock,
  Laptop,
  GraduationCap,
  ArrowRight,
  Download,
  Filter,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { Program } from '@/types';
import DocumentViewerModal from '@/components/common/DocumentViewerModal';

interface ProgramsListClientProps {
  programs: Program[];
}

export default function ProgramsListClient({ programs }: ProgramsListClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [selectedBrochure, setSelectedBrochure] = useState<{ title: string; url: string } | null>(null);

  const categories = useMemo(() => {
    const set = new Set(programs.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [programs]);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.softwareTools.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchMode = selectedMode === 'All' || p.mode.toLowerCase().includes(selectedMode.toLowerCase());

      return matchSearch && matchCategory && matchMode;
    });
  }, [programs, search, selectedCategory, selectedMode]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, e.g. 'GST', 'TDS', 'Banking', 'Payroll', 'Excel'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-3 text-xs text-[#78716C]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              100% Offline Practical Lab
            </span>
            <span>
              Showing <strong className="text-[#2A1810]">{filtered.length}</strong> Programs
            </span>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EFE6DD]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#8B5A2B] text-white shadow-xs'
                  : 'bg-[#FAF6F0] text-[#57534E] hover:bg-[#EFE6DD] border border-[#E5D8CA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Program Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5D8CA] p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-[#C4AE96] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-[#2A1810]">No matching programs found</h3>
          <p className="text-xs text-[#57534E]">
            Try adjusting your search query or removing category filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedMode('All');
            }}
            className="text-xs font-bold text-[#8B5A2B] hover:underline pt-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((prog) => {
            const isExecutiveTrack =
              prog.id === 'prog-1' ||
              prog.id === 'prog-2' ||
              prog.id === 'prog-3' ||
              prog.id === 'prog-10' ||
              prog.id === 'prog-11' ||
              prog.id === 'prog-12';

            const isPrimaryTheme =
              isExecutiveTrack ||
              prog.category === 'Tally Prime' ||
              prog.category === 'Accounts Manager & Audit';

            const isFullWidth =
              isExecutiveTrack &&
              selectedCategory === 'All' &&
              !search.trim();

            return (
              <React.Fragment key={prog.id}>
                <div
                  className={`bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between ${
                    isFullWidth ? 'md:col-span-2' : ''
                  } ${
                    isPrimaryTheme
                      ? 'border-2 border-[#8B5A2B]/40 hover:border-[#8B5A2B]'
                      : 'border border-[#E5D8CA] hover:border-[#8B5A2B]'
                  }`}
                >
                  <div className="p-6 sm:p-8 space-y-5">
                    {/* Header Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE6DD] pb-3">
                      <span
                        className={`text-xs font-bold uppercase rounded-full border shadow-xs transition-all inline-flex items-center justify-center ${
                          isPrimaryTheme
                            ? 'bg-[#8B5A2B] text-white border-[#7A4E24] px-5 py-1.5 min-w-[135px] tracking-widest shadow-sm'
                            : 'text-[#8B5A2B] bg-[#FAF6F0] border-[#E5D8CA] px-3.5 py-1 tracking-wider'
                        }`}
                      >
                        {prog.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>Offline Classroom Lab</span>
                      </div>
                    </div>

                    {isFullWidth ? (
                      /* Spacious 2-Column Interior for Flagship Single Programs */
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-5 space-y-4">
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1810] hover:text-[#8B5A2B] transition-colors leading-tight">
                            <Link href={`/programs/${prog.slug}`}>{prog.title}</Link>
                          </h3>
                          <p className="text-sm text-[#57534E] leading-relaxed">
                            {prog.shortDescription}
                          </p>

                          <div className="pt-3 space-y-2 text-xs text-[#78716C] border-t border-[#EFE6DD]">
                            <div>
                              <span className="font-semibold text-[#2A1810]">Tools:</span>{' '}
                              {prog.softwareTools.join(', ')}
                            </div>
                            <div>
                              <span className="font-semibold text-[#2A1810]">Seats:</span>{' '}
                              <span className="text-emerald-700 font-bold">{prog.availableSeats} Available</span>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-7 bg-[#FAF6F0] p-5 rounded-xl border border-[#E5D8CA] space-y-3">
                          <div className="flex items-center justify-between border-b border-[#E5D8CA] pb-2">
                            <span className="text-xs font-bold text-[#2A1810] uppercase tracking-wider">
                              Curriculum Modules ({prog.modules.length} Core Practical Units)
                            </span>
                            <span className="text-[11px] font-semibold text-[#8B5A2B]">100% Live Ledgers</span>
                          </div>
                          <div
                            className={
                              prog.modules.length <= 4
                                ? 'grid grid-cols-1 gap-y-2.5'
                                : 'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5'
                            }
                          >
                            {prog.modules.map((mod, i) => (
                              <div key={mod.id} className="text-xs text-[#57534E] flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 bg-[#8B5A2B] text-white">
                                  {i + 1}
                                </span>
                                <span className="font-medium text-[#2A1810] leading-snug">{mod.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Standard Vertical Layout for Grid Programs */
                      <>
                        <div>
                          <h3 className="text-xl font-serif font-bold text-[#2A1810] hover:text-[#8B5A2B] transition-colors">
                            <Link href={`/programs/${prog.slug}`}>{prog.title}</Link>
                          </h3>
                          <p className="text-xs text-[#57534E] leading-relaxed mt-2.5">
                            {prog.shortDescription}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-[#EFE6DD]">
                          <span className="text-xs font-bold text-[#2A1810] block">Curriculum Modules:</span>
                          <div className="space-y-1.5">
                            {prog.modules.map((mod, i) => (
                              <div key={mod.id} className="text-xs text-[#57534E] flex items-start gap-2">
                                <span
                                  className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                                    isPrimaryTheme
                                      ? 'bg-[#8B5A2B] text-white'
                                      : 'bg-[#EFE6DD] text-[#8B5A2B]'
                                  }`}
                                >
                                  {i + 1}
                                </span>
                                <span className="font-medium text-[#2A1810]">{mod.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#78716C] border-t border-[#EFE6DD]">
                          <div>
                            <span className="font-semibold text-[#2A1810]">Tools:</span>{' '}
                            {prog.softwareTools.join(', ')}
                          </div>
                          <div>
                            <span className="font-semibold text-[#2A1810]">Seats:</span>{' '}
                            <span className="text-emerald-700 font-bold">{prog.availableSeats} Available</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 bg-[#FAF6F0] border-t border-[#E5D8CA] flex items-center justify-end gap-3">
                    {prog.brochureUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedBrochure({
                            title: `${prog.title} - Official Syllabus Brochure`,
                            url: prog.brochureUrl!,
                          })
                        }
                        className="p-2.5 rounded-lg border border-[#D8C5B2] hover:bg-[#E5D8CA] text-[#8B5A2B] hover:text-[#2A1810] transition-colors"
                        title="View Course Brochure PDF online"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}

                    <Link
                      href={`/programs/${prog.slug}`}
                      className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Full Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/apply?program=${prog.slug}`}
                      className="bg-[#2A1810] hover:bg-[#1F120A] text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <span>Apply</span>
                    </Link>
                  </div>
                </div>

                {/* Partition Divider after Tally Prime */}
                {prog.id === 'prog-1' && selectedCategory === 'All' && !search.trim() && (
                  <div className="md:col-span-2 py-4">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-[#D8C5B2] border-dashed" />
                      </div>
                      <div className="relative bg-[#FAF6F0] px-5 py-2 rounded-full border border-[#D8C5B2] flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5A2B] shadow-2xs">
                        <ShieldCheck className="w-4 h-4 text-[#8B5A2B]" />
                        <span>Executive Management & Supervisory Program</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Partition Divider after Executive Track (SALES ANALYSIS) */}
                {prog.id === 'prog-12' && selectedCategory === 'All' && !search.trim() && (
                  <div className="md:col-span-2 py-4">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-[#D8C5B2] border-dashed" />
                      </div>
                      <div className="relative bg-[#FAF6F0] px-5 py-2 rounded-full border border-[#D8C5B2] flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5A2B] shadow-2xs">
                        <Layers className="w-4 h-4 text-[#8B5A2B]" />
                        <span>Specialized Professional Tracks (Taxation, Banking, MIS & Operations)</span>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Online Brochure Viewer Modal */}
      {selectedBrochure && (
        <DocumentViewerModal
          isOpen={!!selectedBrochure}
          onClose={() => setSelectedBrochure(null)}
          title={selectedBrochure.title}
          fileUrl={selectedBrochure.url}
          category="Official Program Brochure"
        />
      )}
    </div>
  );
}
