import React from 'react';
import { db } from '@/lib/db';
import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata = {
  title: 'Campus & Lab Gallery | Accounting Workshops & Masterclasses | YLCC',
  description:
    'Visual glimpse of practical accounting labs, GST workshops, Excel 365 masterclasses, and project presentation days at YLCC Jaipur.',
};

export default async function GalleryPage() {
  const gallery = await db.getGallery();

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-16 border-b border-[#E5D8CA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Inside YLCC
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1810]">
            Accounting Lab & Activity Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
            See our students in action: live voucher feeding, GST reconciliation workshops, Excel masterclasses, and project presentations before CA panels.
          </p>
        </div>
      </section>

      {/* Gallery Client */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryClient items={gallery} />
      </section>
    </div>
  );
}
