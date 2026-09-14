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
} from 'lucide-react';
import { Program } from '@/types';

interface ProgramsListClientProps {
  programs: Program[];
}

export default function ProgramsListClient({ programs }: ProgramsListClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');

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
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8C6527] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, e.g. 'GST', 'TDS', 'Banking', 'Payroll', 'Excel'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            />
          </div>

          {/* Mode Selector */}
          <div className="md:col-span-3">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            >
              <option value="All">All Learning Modes</option>
              <option value="Offline Classroom">Offline Classroom Lab</option>
              <option value="Online Live">Online Live Interactive</option>
              <option value="Hybrid">Hybrid (Classroom + Online)</option>
            </select>
          </div>

          <div className="md:col-span-3 text-right text-xs text-[#78716C]">
            Showing <strong className="text-[#192538]">{filtered.length}</strong> of{' '}
            {programs.length} Programs
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EFE8DD]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#8C6527] text-white shadow-xs'
                  : 'bg-[#FAF7F0] text-[#57534E] hover:bg-[#ECE4D4] border border-[#E2D7C3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Program Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E2D7C3] p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-[#C1AF93] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-[#192538]">No matching programs found</h3>
          <p className="text-xs text-[#57534E]">
            Try adjusting your search query or removing category filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedMode('All');
            }}
            className="text-xs font-bold text-[#8C6527] hover:underline pt-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-[#E2D7C3] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#8C6527] transition-all flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 space-y-5">
                {/* Header Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527] bg-[#FAF7F0] px-3 py-1 rounded-full border border-[#E2D7C3]">
                    {prog.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-[#78716C] font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8C6527]" />
                      <span>{prog.duration}</span>
                    </span>
                    <span>•</span>
                    <span>{prog.mode}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-[#192538] hover:text-[#8C6527] transition-colors">
                    <Link href={`/programs/${prog.slug}`}>{prog.title}</Link>
                  </h3>
                  <p className="text-xs text-[#57534E] leading-relaxed mt-2.5">
                    {prog.shortDescription}
                  </p>
                </div>

                {/* Modules breakdown */}
                <div className="space-y-2 pt-2 border-t border-[#EFE8DD]">
                  <span className="text-xs font-bold text-[#192538] block">Curriculum Modules:</span>
                  <div className="space-y-1.5">
                    {prog.modules.map((mod, i) => (
                      <div key={mod.id} className="text-xs text-[#57534E] flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#ECE4D4] text-[#8C6527] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="font-medium text-[#192538]">{mod.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Eligibility */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#78716C] border-t border-[#EFE8DD]">
                  <div>
                    <span className="font-semibold text-[#192538]">Tools:</span>{' '}
                    {prog.softwareTools.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-[#192538]">Seats:</span>{' '}
                    <span className="text-emerald-700 font-bold">{prog.availableSeats} Available</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 bg-[#FAF7F0] border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#78716C] block">
                    Course Fee
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[#192538]">
                      ₹{prog.discountedFees ? prog.discountedFees.toLocaleString('en-IN') : prog.fees.toLocaleString('en-IN')}
                    </span>
                    {prog.discountedFees && (
                      <span className="text-xs text-[#A89577] line-through">
                        ₹{prog.fees.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {prog.brochureUrl && (
                    <a
                      href={prog.brochureUrl}
                      download
                      className="p-2.5 rounded-lg border border-[#D4C5AD] hover:bg-[#E2D7C3] text-[#192538] transition-colors"
                      title="Download Course Brochure PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}

                  <Link
                    href={`/programs/${prog.slug}`}
                    className="bg-[#8C6527] hover:bg-[#74511D] text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Full Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/apply?program=${prog.slug}`}
                    className="bg-[#192538] hover:bg-[#0F172A] text-white px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <span>Apply</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
