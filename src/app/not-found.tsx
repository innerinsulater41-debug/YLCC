import Link from "next/link";
import { GraduationCap, ArrowLeft, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-stone-900 text-amber-400 flex items-center justify-center mb-6 shadow-md">
        <GraduationCap className="w-9 h-9" />
      </div>

      <span className="text-sm font-bold uppercase tracking-widest text-amber-800">
        404 • Page Not Found
      </span>

      <h1 className="text-4xl sm:text-5xl font-black text-stone-900 mt-2 tracking-tight">
        The Page You Are Looking For Does Not Exist
      </h1>

      <p className="text-stone-600 text-sm max-w-md mt-4 leading-relaxed">
        The link you followed may have been updated, moved, or retired. Explore our active programs or return to the campus homepage.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-amber-50 hover:bg-stone-800 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <Home className="w-4 h-4 text-amber-400" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold text-xs transition-colors"
        >
          <BookOpen className="w-4 h-4 text-amber-800" />
          <span>Browse Programs</span>
        </Link>
      </div>
    </div>
  );
}
