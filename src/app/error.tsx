"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
        Something Went Wrong
      </h1>

      <p className="text-stone-600 text-sm max-w-md mt-3 leading-relaxed">
        An unexpected error occurred while processing your request. Please try refreshing or return to the main homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-amber-50 hover:bg-stone-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-amber-400" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold text-xs transition-colors"
        >
          <Home className="w-4 h-4 text-amber-800" />
          <span>Go to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
