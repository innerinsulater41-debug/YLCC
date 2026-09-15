'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';

interface AdminAnalyticsChartsProps {
  programCounts: { name: string; count: number }[];
  projectIndustryDistribution: { name: string; value: number }[];
}

const COLORS = ['#8B5A2B', '#2A1810', '#2D6A4F', '#C4AE96', '#4A3E31', '#70441E'];

export default function AdminAnalyticsCharts({
  programCounts,
  projectIndustryDistribution,
}: AdminAnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Chart 1: Applications by Program */}
      <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-serif font-bold text-[#2A1810]">
            Admission Applications by Track
          </h3>
          <p className="text-xs text-[#78716C]">Current cohort registration distribution</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={programCounts} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE1" />
              <XAxis dataKey="name" stroke="#78716C" fontSize={11} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#78716C" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FAF6F0',
                  borderColor: '#D8C5B2',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="count" fill="#8B5A2B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Project Library by Industry */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-serif font-bold text-[#2A1810]">
            16 Projects by Industry Category
          </h3>
          <p className="text-xs text-[#78716C]">Real-world multi-business case studies</p>
        </div>

        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectIndustryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {projectIndustryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FAF6F0',
                  borderColor: '#D8C5B2',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-2 justify-center pt-1 text-[11px] text-[#57534E]">
          {projectIndustryDistribution.slice(0, 4).map((item, idx) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span>{item.name} ({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
