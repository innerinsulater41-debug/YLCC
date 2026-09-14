"use client";

import {
  Code,
  Users2,
  Briefcase,
  ShieldCheck,
  Server,
  Network,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function WhyChooseYLCC() {
  const pillars = [
    {
      icon: Code,
      title: "Real Production Systems",
      description:
        "No trivial todo lists or toy calculators. Build high-throughput microservices, vector search engines, and multi-cloud infrastructure designed for scale.",
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: Users2,
      title: "Senior Architect Mentorship",
      description:
        "Learn directly from engineering leaders from Amazon, Cisco, and Tier-1 research labs who review your PRs, teach system design, and impart deep technical taste.",
      color: "from-indigo-600 to-purple-600",
    },
    {
      icon: Briefcase,
      title: "Active Placement Council",
      description:
        "1-on-1 technical mock interviews, resume refactoring tailored for ATS, and direct placement drives across our network of 180+ verified enterprise hiring partners.",
      color: "from-emerald-600 to-teal-600",
    },
    {
      icon: ShieldCheck,
      title: "Verifiable Credentialing",
      description:
        "Every certificate comes with cryptographic verification showcasing exact capstone architectures built, hours of engineering, and validated competencies.",
      color: "from-amber-600 to-orange-600",
    },
    {
      icon: Server,
      title: "Modern Labs & Sandboxes",
      description:
        "Access dual-monitor workstations, GPU clusters for deep learning, high-speed fiber connectivity, and complimentary cloud credits on AWS.",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: Network,
      title: "Lifelong Alumni Network",
      description:
        "Join a vibrant community of over 12,500 YLCC alumni working across global tech hubs in Bengaluru, Singapore, London, and Silicon Valley.",
      color: "from-rose-600 to-pink-600",
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>The YLCC Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Engineered Differently from Traditional Institutes
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We built YLCC to solve the fundamental mismatch between conventional computer science education and the demanding realities of production software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white card-hover space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pillar.color} text-white flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
