'use client';

import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import DocumentViewerModal from '@/components/common/DocumentViewerModal';

interface ProgramBrochureButtonProps {
  title: string;
  fileUrl: string;
  variant?: 'inline' | 'full';
  label?: string;
}

export default function ProgramBrochureButton({
  title,
  fileUrl,
  variant = 'inline',
  label,
}: ProgramBrochureButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {variant === 'inline' ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B5A2B] bg-[#FAF6F0] border border-[#D8C5B2] px-3 py-1.5 rounded-lg hover:bg-[#E5D8CA] transition-colors"
          title="View Syllabus PDF online"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{label || 'View Syllabus PDF'}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="w-full bg-[#FAF6F0] hover:bg-[#EFE6DD] text-[#2A1810] border border-[#D8C5B2] py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
          title="Open official syllabus brochure on the website"
        >
          <Eye className="w-4 h-4 text-[#8B5A2B]" />
          <span>{label || 'View Official Syllabus PDF'}</span>
        </button>
      )}

      {isOpen && (
        <DocumentViewerModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={title}
          fileUrl={fileUrl}
          category="Official Syllabus Guide"
        />
      )}
    </>
  );
}
