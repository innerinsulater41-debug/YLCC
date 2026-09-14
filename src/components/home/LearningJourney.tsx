"use client";

import { Terminal, GitPullRequest, Rocket, Award, Sparkles } from "lucide-react";

export default function LearningJourney() {
  const steps = [
    {
      step: "01",
      icon: Terminal,
      title: "Foundations & System Design",
      description:
        "Master foundational language semantics, strict typing, data modeling, and distributed system trade-offs through live code teardowns.",
    },
    {
      step: "02",
      icon: GitPullRequest,
      title: "Agile Sprints & PR Reviews",
      description:
        "Work in collaborative squads simulating real engineering team dynamics. Receive rigorous code reviews on readability, performance, and security.",
    },
    {
      step: "03",
      icon: Rocket,
      title: "Production Capstone Deployment",
      description:
        "Ship multi-service systems into live cloud environments with CI/CD automation, telemetry observability, and public demonstration URLs.",
    },
    {
      step: "04",
      icon: Award,
      title: "Placement Drives & Career Launch",
      description:
        "Participate in dedicated hiring drives, 1-on-1 mentor referral recommendations, and technical mock rounds to secure high-growth engineering roles.",
    },
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Structured Pedagogy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            The 4-Stage Student Engineering Journey
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            From first architectural principles to shipping scalable systems and landing your dream role at top technology companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm space-y-4 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <span className="text-3xl font-black text-slate-700 select-none">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
