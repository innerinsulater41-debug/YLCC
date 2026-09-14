import PublicLayout from "@/components/layout/PublicLayout";
import { DataStore } from "@/lib/db/store";
import {
  GraduationCap,
  Target,
  Compass,
  HeartHandshake,
  CheckCircle2,
  Users,
  Award,
  Layers,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default async function AboutPage() {
  const [settings, faculty] = await Promise.all([
    DataStore.getSettings(),
    DataStore.getFaculty(),
  ]);

  const milestones = [
    {
      year: "2020",
      title: "Founding YLCC Campus",
      description:
        "Started with a visionary cohort of 40 software engineers and senior architects in Koramangala, Bengaluru.",
    },
    {
      year: "2022",
      title: "Generative AI & Cloud Expansion",
      description:
        "Inaugurated advanced AI research sandboxes and established hiring partnerships with over 80 global tech firms.",
    },
    {
      year: "2024",
      title: "10,000+ Alumni Milestone",
      description:
        "Crossed 10,000 engineers placed globally with average salary uplifts exceeding 160% across cohorts.",
    },
    {
      year: "2026",
      title: "Autonomous Systems & Enterprise Hub",
      description:
        "Launched enterprise engineering consulting division and high-throughput production lab facilities.",
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Institutional Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Bridging Academic Theory and Industry Engineering Excellence.
          </h1>
          <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed">
            YLCC was born out of an urgent need: traditional colleges teach syntax, but global engineering teams require software architects who design scalable, reliable distributed systems.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-hover space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Our Mission</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                To equip ambitious developers and leaders with cutting-edge production engineering skills through intensive hands-on code development, high-caliber mentorship, and rigorous capstone systems.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-hover space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Our Vision</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                To become the premier global benchmark in technology education where every graduate possesses the technical depth, architectural clarity, and leadership confidence to invent tomorrow&apos;s software.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 card-hover space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Core Values</h2>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pragmatic Engineering Realism</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Obsession with Student Outcomes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Uncompromising Technical Taste</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Director / Founder Desk Message */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 lg:p-16 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-4 border-white shadow-xl mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  alt="Director Arjun Venkataraman"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Arjun Venkataraman</h3>
              <p className="text-xs font-semibold text-blue-600">Director of Academic & Technical Affairs</p>
              <p className="text-xs text-slate-500">M.Tech (IISc Bangalore), ex-Principal Architect Amazon</p>
            </div>

            <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Message from Director&apos;s Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                &ldquo;We don&apos;t prepare you for easy tutorials. We train you for high-stakes production systems.&rdquo;
              </h2>
              <p>
                When I hired engineers at Amazon, I consistently observed candidates who knew syntax but struggled with concurrency, database locking, telemetry, and system reliability. That realization sparked YLCC.
              </p>
              <p>
                Here, our students build real microservices, debug production bottlenecks, review each other&apos;s pull requests, and defend their code in front of staff engineers. When you graduate from YLCC, you walk into any engineering room ready to deliver on day one.
              </p>
              <div className="pt-2">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors"
                >
                  <span>Explore Academic Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Evolution & Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              A Journey of Relentless Focus on Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative"
              >
                <span className="text-3xl font-black text-blue-600">{item.year}</span>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
