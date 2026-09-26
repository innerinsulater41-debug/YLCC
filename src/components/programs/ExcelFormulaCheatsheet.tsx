'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  FileSpreadsheet,
  Copy,
  Check,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
} from 'lucide-react';
import { EXCEL_FORMULAS_250, ExcelFormulaItem } from '@/data/excel-250-formulas';

export default function ExcelFormulaCheatsheet() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(30);

  const categories = useMemo(() => {
    const set = new Set(EXCEL_FORMULAS_250.map((f) => f.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return EXCEL_FORMULAS_250.filter((item) => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.syntax.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [search, selectedCategory]);

  const handleCopy = (item: ExcelFormulaItem) => {
    navigator.clipboard.writeText(item.syntax);
    setCopiedId(item.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const displayedFormulas = filtered.slice(0, visibleCount);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#8B5A2B]/30 shadow-md space-y-6">
      {/* Section Header */}
      <div className="text-center sm:text-left border-b border-[#EFE6DD] pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE6DD] border border-[#D8C5B2] text-[#8B5A2B] text-xs font-bold uppercase tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>Corporate Excel 365 Desk Reference</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>250 Formulas Loaded</span>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1810] tracking-tight">
            250+ Advanced Excel Formula Cheats
          </h2>
          <p className="text-xs sm:text-sm text-[#57534E] max-w-3xl leading-relaxed">
            Essential desk reference covering 250+ dynamic Excel 365 functions, modern array lookups, financial EMI/CMA modeling, text cleanup, date intelligence, and calculation speed engines.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search across 250+ formulas (e.g. XLOOKUP, PMT, LET, FILTER, TEXTSPLIT, EOMONTH)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(30);
            }}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? EXCEL_FORMULAS_250.length
                : EXCEL_FORMULAS_250.filter((f) => f.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(30);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#8B5A2B] text-white shadow-xs'
                    : 'bg-[#FAF6F0] text-[#57534E] hover:bg-[#EFE6DD] border border-[#E5D8CA]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#E5D8CA] text-[#2A1810]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs text-[#78716C] pt-1">
        <span>
          Showing <strong className="text-[#2A1810]">{displayedFormulas.length}</strong> of{' '}
          <strong className="text-[#2A1810]">{filtered.length}</strong> matching formulas
        </span>

        {filtered.length > displayedFormulas.length && (
          <button
            type="button"
            onClick={() => setVisibleCount(filtered.length)}
            className="text-[11px] font-bold text-[#8B5A2B] hover:underline"
          >
            Show All {filtered.length} Formulas
          </button>
        )}
      </div>

      {/* Formulas Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-[#FAF6F0] rounded-xl border border-[#E5D8CA] p-6 space-y-2">
          <p className="text-sm font-semibold text-[#2A1810]">No formulas match your search.</p>
          <p className="text-xs text-[#57534E]">Try searching for another keyword or reset the category filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="text-xs font-bold text-[#8B5A2B] hover:underline pt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {displayedFormulas.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E5D8CA] hover:border-[#8B5A2B] hover:shadow-xs transition-all flex flex-col justify-between space-y-2.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#E8DCCF] text-[#2A1810]">
                      #{String(item.id).padStart(3, '0')}
                    </span>
                    <h3 className="text-sm font-bold font-mono text-[#8B5A2B]">
                      ={item.name}()
                    </h3>
                  </div>

                  <span className="text-[10px] font-semibold text-[#78716C] bg-white px-2 py-0.5 rounded border border-[#E5D8CA] truncate max-w-[150px]">
                    {item.category}
                  </span>
                </div>

                {/* Syntax Container */}
                <div className="bg-[#2A1810] text-[#E8DCCF] p-2 rounded-lg font-mono text-[11px] leading-relaxed break-all relative group flex items-start justify-between gap-2">
                  <span className="select-all">{item.syntax}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    title="Copy Syntax"
                    className="p-1 rounded bg-[#3D2314] hover:bg-[#8B5A2B] text-white shrink-0 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Description / Use Case */}
                <p className="text-[11px] text-[#57534E] leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filtered.length > displayedFormulas.length && (
        <div className="text-center pt-4 border-t border-[#EFE6DD] space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => Math.min(prev + 30, filtered.length))}
              className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Load Next 30 Formulas</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setVisibleCount(filtered.length)}
              className="bg-white hover:bg-[#FAF6F0] text-[#2A1810] border border-[#D8C5B2] px-5 py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              Show All ({filtered.length})
            </button>
          </div>
          <p className="text-[11px] text-[#78716C]">
            Showing {displayedFormulas.length} of {filtered.length} corporate formulas
          </p>
        </div>
      )}
    </div>
  );
}
