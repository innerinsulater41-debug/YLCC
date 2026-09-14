import React from 'react';
import { db } from '@/lib/db';
import ProjectsListClient from '@/components/projects/ProjectsListClient';

export const metadata = {
  title: '16 Multi-Business Practical Accounting Projects | YLCC',
  description:
    'Hands-on practical case studies across 16 Indian industries: Hospital patient billing, Hotel operations, Logistics freight, FMCG distributor networking, Builder site costing, and Govt contractor (Thekedar) tenders.',
};

export default async function ProjectsPage() {
  const projects = await db.getProjects(true);

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F7F3E9] to-[#FAF7F0] pt-12 pb-16 border-b border-[#E8DFC8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527] bg-[#ECE4D4] px-3 py-1 rounded-full border border-[#D4C5AD]">
            Multi-Business Practice Arena
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#192538]">
            The 16 Multi-Business Practical Projects
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-3xl mx-auto leading-relaxed">
            Every project simulates complete financial years for real-world businesses. You don’t just learn rules—you maintain ledgers, calculate taxes, reconcile vendor discrepancies, and finalize balance sheets.
          </p>
        </div>
      </section>

      {/* Projects Library Client Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsListClient projects={projects} />
      </section>
    </div>
  );
}
