"use client";

import { Users, TrendingUp, Building2, Code2, Award, Zap } from "lucide-react";
import { SiteStatistic } from "@/types";

interface StatsBarProps {
  statistics?: SiteStatistic[];
}

const iconMap: Record<string, any> = {
  Users,
  TrendingUp,
  Building2,
  Code2,
  Award,
  Zap,
};

export default function StatsBar({ statistics = [] }: StatsBarProps) {
  if (!statistics || statistics.length === 0) return null;

  return (
    <section className="bg-white py-12 border-b border-slate-200/80 shadow-xs relative z-20 -mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {statistics.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || TrendingUp;
            return (
              <div
                key={stat.id || idx}
                className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center">
                  <span>{stat.value.toLocaleString()}</span>
                  <span className="text-blue-600 ml-0.5">{stat.suffix}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1 uppercase tracking-wider text-center">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[200px] text-center">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
