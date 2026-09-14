"use client";

import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, UserCheck } from "lucide-react";
import { EventItem } from "@/types";
import { formatDate } from "@/lib/utils";

interface EventsPreviewProps {
  events: EventItem[];
}

export default function EventsPreview({ events }: EventsPreviewProps) {
  const displayEvents = events.slice(0, 3);

  return (
    <section className="py-24 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Campus Events & Summits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Upcoming Workshops & Hackathons
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Open masterclasses, architecture teardowns, and competitive hackathons hosted by YLCC mentors.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={evt.bannerUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold text-xs">
                    {evt.type}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-white font-medium text-xs">
                    {evt.mode}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-blue-700 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(evt.eventDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {evt.startTime}
                    </span>
                  </div>

                  <Link href={`/events/${evt.slug}`}>
                    <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {evt.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {evt.shortDescription}
                  </p>

                  <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 border-t border-slate-200/80">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/events/${evt.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
                >
                  <span>Register for Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
