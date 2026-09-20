'use client';

import React, { useEffect } from 'react';
import { X, ExternalLink, Download, FileText, FileSpreadsheet, Eye } from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileUrl: string;
  fileType?: string;
  category?: string;
}

export default function DocumentViewerModal({
  isOpen,
  onClose,
  title,
  fileUrl,
  fileType = 'pdf',
  category,
}: DocumentViewerModalProps) {
  // Close on Escape key and prevent background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !fileUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#D8C5B2] flex flex-col overflow-hidden z-10">
        {/* Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#2A1810] text-white flex items-center justify-between gap-3 border-b-2 border-[#8B5A2B] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-[#3D2517] text-[#C4AE96] shrink-0">
              {fileType === 'xlsx' ? (
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              ) : (
                <FileText className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D8C5B2] bg-[#3D2517] px-2 py-0.5 rounded border border-[#523320]">
                  {category || 'Brochure Viewer'}
                </span>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  Online View
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white truncate mt-0.5">
                {title}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D8C5B2] hover:text-white bg-[#3D2517] hover:bg-[#4E2F1D] border border-[#523320] rounded-lg transition-colors"
              title="Open brochure in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <a
              href={fileUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#D8C5B2] hover:text-white bg-[#3D2517] hover:bg-[#4E2F1D] border border-[#523320] rounded-lg transition-colors"
              title="Download local copy to device"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#D8C5B2] hover:text-white hover:bg-[#3D2517] rounded-lg transition-colors ml-1"
              title="Close brochure preview (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Viewport */}
        <div className="flex-1 w-full bg-[#FAF6F0] relative overflow-hidden flex flex-col">
          <iframe
            src={`${fileUrl}#toolbar=1&navpanes=0`}
            className="w-full flex-1 border-0"
            title={title}
          />

          {/* Fallback Notice Bar */}
          <div className="px-4 py-2 bg-[#F0E6DA] border-t border-[#E5D8CA] text-[11px] text-[#57534E] flex items-center justify-between">
            <span>
              Viewing online document. You can scroll, zoom, and print directly within this window.
            </span>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B5A2B] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Full Screen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
