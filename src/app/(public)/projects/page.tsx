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
      <section className="bg-gradient-to-b from-[#F6EFE6] to-[#FAF6F0] pt-12 pb-16 border-b border-[#E5D8CA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#EFE6DD] px-3 py-1 rounded-full border border-[#D8C5B2]">
            Multi-Business Practice Arena
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1810]">
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
