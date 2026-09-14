import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Share2,
} from "lucide-react";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await DataStore.getEventBySlug(slug);

  if (!event) return { title: "Event Not Found | YLCC" };

  return {
    title: `${event.title} | YLCC Events`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: [event.bannerUrl],
    },
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const event = await DataStore.getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <PublicLayout>
      {/* Event Header */}
      <section className="bg-[#1c1917] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/50 text-xs font-bold uppercase tracking-wider">
              {event.type}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-semibold">
              {event.mode} Format
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-4xl">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-stone-300 pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{formatDate(event.eventDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{event.startTime} - {event.endTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Registration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-10">
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src={event.bannerUrl}
                alt={event.title}
                className="w-full max-h-[450px] object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
                About this Masterclass & Agenda
              </h2>
              <div className="p-8 rounded-3xl bg-white border border-stone-200 text-stone-700 leading-relaxed text-base space-y-4 shadow-2xs">
                <p>{event.fullDescription}</p>
              </div>
            </div>

            {event.speakerName && (
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Featured Session Speaker
                  </div>
                  <h3 className="text-base font-bold text-stone-900">{event.speakerName}</h3>
                  <p className="text-xs text-stone-500">{event.speakerDesignation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Registration Box */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Complimentary Admission
                </span>
                <h3 className="text-2xl font-black text-stone-900">
                  Reserve Your Seat
                </h3>
                <p className="text-xs text-stone-500">
                  Interactive Q&amp;A with faculty and live certification of participation.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/apply"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
                >
                  <span>Register Free Online</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold text-xs transition-colors"
                >
                  <span>Contact Event Coordinator</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive Live Code Demos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hands-on Architecture Slide Deck Provided</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct 1-on-1 Q&A with Lead Speakers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
