'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Eye,
  Download,
  FileText,
  FileSpreadsheet,
  Search,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { ResourceItem } from '@/types';
import DocumentViewerModal from '@/components/common/DocumentViewerModal';

interface ResourcesClientProps {
  resources: ResourceItem[];
}

export default function ResourcesClient({ resources }: ResourcesClientProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<ResourceItem | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(resources.map((r) => r.category));
    return ['All', ...Array.from(cats)];
  }, [resources]);

  const filtered = useMemo(() => {
    return resources.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [resources, search, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search brochures and resources by name or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>

          <div className="md:col-span-4 flex items-center justify-end gap-2 text-xs text-[#78716C]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs">
              <Eye className="w-3.5 h-3.5 text-emerald-700" />
              <span>Instant Online View</span>
            </span>
            <span>
              Showing <strong className="text-[#2A1810]">{filtered.length}</strong> Resources
            </span>
          </div>
        </div>

        {/* Category Pills */}
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

      {/* Resource Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5D8CA] p-8 space-y-3">
          <BookOpen className="w-10 h-10 text-[#C4AE96] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-[#2A1810]">No resources found</h3>
          <p className="text-xs text-[#57534E]">Try adjusting your search query or filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="text-xs font-bold text-[#8B5A2B] hover:underline pt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E5D8CA] p-6 shadow-xs hover:shadow-md hover:border-[#8B5A2B] transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#FAF6F0] px-2.5 py-0.5 rounded border border-[#E5D8CA]">
                    {item.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>Instant View</span>
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-3 bg-[#FAF6F0] rounded-xl text-[#8B5A2B] shrink-0 border border-[#E5D8CA] group-hover:bg-[#EFE6DD] transition-colors">
                    {item.fileType === 'xlsx' ? (
                      <FileSpreadsheet className="w-6 h-6 text-emerald-700" />
                    ) : (
                      <FileText className="w-6 h-6 text-[#8B5A2B]" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-[#2A1810] leading-snug group-hover:text-[#8B5A2B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#57534E] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Online View + Optional Download */}
              <div className="pt-4 border-t border-[#EFE6DD] flex items-center justify-between text-xs">
                <span className="text-[#78716C] text-[11px]">
                  {item.fileType.toUpperCase()} • {item.fileSize} • Online View
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(item)}
                    className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-3.5 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                    title="Open brochure directly on the website"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Brochure</span>
                  </button>

                  <a
                    href={item.fileUrl}
                    download
                    className="p-1.5 rounded-lg border border-[#D8C5B2] hover:bg-[#E5D8CA] text-[#78716C] hover:text-[#2A1810] transition-colors"
                    title="Download local copy to device"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* In-Website Document Viewer Modal */}
      {selectedDoc && (
        <DocumentViewerModal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc.title}
          fileUrl={selectedDoc.fileUrl}
          fileType={selectedDoc.fileType}
          category={selectedDoc.category}
        />
      )}
    </div>
  );
}
