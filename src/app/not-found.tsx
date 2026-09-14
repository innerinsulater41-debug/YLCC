import React from 'react';
import Link from 'next/link';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2D7C3] p-8 sm:p-10 text-center shadow-lg space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#ECE4D4] text-[#8C6527] flex items-center justify-center mx-auto">
          <span className="font-serif text-2xl font-bold">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-[#192538]">Page Not Found</h1>
          <p className="text-xs text-[#57534E] leading-relaxed">
            The accounting ledger or page you are looking for has been moved, archived, or does not exist.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/"
            className="w-full bg-[#8C6527] hover:bg-[#74511D] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/programs"
            className="w-full bg-[#FAF7F0] hover:bg-[#ECE4D4] text-[#192538] border border-[#D4C5AD] py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#8C6527]" />
            <span>Explore Training Programs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
