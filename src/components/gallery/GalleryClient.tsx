'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Eye, X, Calendar, Filter } from 'lucide-react';
import { GalleryItem } from '@/types';

interface GalleryClientProps {
  items: GalleryItem[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Classroom & Accounting Lab',
    'GST & Taxation Workshops',
    'Advanced Excel Masterclass',
    'Project Presentations',
    'Seminars & Guest Lectures',
  ];

  const filtered =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.albumCategory === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#8B5A2B] text-white shadow-sm'
                : 'bg-white text-[#57534E] hover:bg-[#EFE6DD] border border-[#E5D8CA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group bg-white rounded-2xl border border-[#E5D8CA] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#8B5A2B] transition-all cursor-pointer flex flex-col"
          >
            <div className="relative h-56 bg-[#FAF6F0] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2A1810]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-[#2A1810] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B5A2B] block">
                  {item.albumCategory}
                </span>
                <h3 className="text-base font-serif font-bold text-[#2A1810] mt-1 group-hover:text-[#8B5A2B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#57534E] mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EFE6DD] text-[11px] text-[#78716C] flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#8B5A2B]" />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
                {activeImage.albumCategory} • {activeImage.date}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2A1810]">{activeImage.title}</h3>
              <p className="text-sm text-[#57534E] leading-relaxed">{activeImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
