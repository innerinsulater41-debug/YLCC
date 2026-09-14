"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { InstituteSettings } from "@/types";

interface AnnouncementBarProps {
  settings?: InstituteSettings["announcementBar"];
}

export default function AnnouncementBar({ settings }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !settings?.enabled) return null;

  return (
    <div className="bg-[#1c1917] text-stone-200 text-xs sm:text-sm py-2 px-4 relative z-50 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex items-center justify-center sm:justify-start gap-2 text-center sm:text-left flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/50 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {settings.badge || "Announcement"}
          </span>
          <span className="text-stone-300 font-medium line-clamp-1 sm:line-clamp-none">
            {settings.text}
          </span>
          {settings.linkUrl && (
            <Link
              href={settings.linkUrl}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 ml-1"
            >
              {settings.linkText || "Learn More"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
