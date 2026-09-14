import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, UserCheck } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function EventsPage() {
  const events = await DataStore.getEvents(false);
  const currentDate = new Date().toISOString().split("T")[0];

  const upcomingEvents = events.filter((e) => e.eventDate >= currentDate);
  const pastEvents = events.filter((e) => e.eventDate < currentDate);

  return (
    <PublicLayout>
      {/* Header */}
      <section className="py-16 bg-[#1c1917] text-stone-200 border-b border-stone-800 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/40 text-amber-300 border border-amber-800/60 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Masterclasses, Summits & Hackathons</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Upcoming Events & Announcements
          </h1>
          <p className="text-stone-400 text-base leading-relaxed">
            Join live hands-on architecture teardowns, participate in our annual 48-hour hackathon, or attend faculty open houses.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Upcoming Workshops & Webinars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(upcomingEvents.length > 0 ? upcomingEvents : events).map((evt) => (
              <div
                key={evt.id}
                className="rounded-3xl bg-white border border-stone-200 overflow-hidden card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={evt.bannerUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-stone-900 text-amber-50 font-bold text-xs">
                      {evt.type}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/90 text-stone-800 font-semibold text-xs">
                      {evt.mode}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                      <span className="flex items-center gap-1 text-amber-800 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(evt.eventDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {evt.startTime}
                      </span>
                    </div>

                    <Link href={`/events/${evt.slug}`}>
                      <h3 className="text-base font-bold text-stone-900 hover:text-amber-800 transition-colors line-clamp-2">
                        {evt.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {evt.shortDescription}
                    </p>

                    <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5 border-t border-stone-100">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/events/${evt.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-semibold text-xs transition-colors"
                  >
                    <span>Register for Event</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices & Announcements Bar */}
        <div className="p-8 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Important Campus Notice</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            All prospective applicants for the Summer 2026 Batch are encouraged to register early as batch sizes are strictly capped at 30 seats per cohort to preserve student-to-mentor ratios.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
