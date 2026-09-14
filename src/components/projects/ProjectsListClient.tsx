'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Briefcase,
  Clock,
  Laptop,
  CheckCircle2,
  ArrowRight,
  Filter,
  FileText,
  FileSpreadsheet,
  Download,
} from 'lucide-react';
import { Project } from '@/types';

interface ProjectsListClientProps {
  projects: Project[];
}

export default function ProjectsListClient({ projects }: ProjectsListClientProps) {
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const industries = useMemo(() => {
    const set = new Set(projects.map((p) => p.industryCategory));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const difficulties = ['All', 'Foundational', 'Intermediate', 'Advanced', 'Executive'];

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        p.industryCategory.toLowerCase().includes(search.toLowerCase()) ||
        p.skillsCovered.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        p.softwareUsed.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchIndustry = selectedIndustry === 'All' || p.industryCategory === selectedIndustry;
      const matchDifficulty = selectedDifficulty === 'All' || p.difficultyLevel === selectedDifficulty;

      return matchSearch && matchIndustry && matchDifficulty;
    });
  }, [projects, search, selectedIndustry, selectedDifficulty]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8C6527] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by industry, e.g. 'Hospital', 'Hotel', 'Builder', 'Thekedar', 'Logistics'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Foundational">Foundational</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className="md:col-span-3 text-right text-xs text-[#78716C]">
            Showing <strong className="text-[#192538]">{filtered.length}</strong> of{' '}
            {projects.length} Practical Projects
          </div>
        </div>

        {/* Industry Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EFE8DD]">
          {industries.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedIndustry === ind
                  ? 'bg-[#8C6527] text-white shadow-xs'
                  : 'bg-[#FAF7F0] text-[#57534E] hover:bg-[#ECE4D4] border border-[#E2D7C3]'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E2D7C3] p-8 space-y-3">
          <Briefcase className="w-10 h-10 text-[#C1AF93] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-[#192538]">No matching projects found</h3>
          <p className="text-xs text-[#57534E]">Try a different search keyword or industry filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedIndustry('All');
              setSelectedDifficulty('All');
            }}
            className="text-xs font-bold text-[#8C6527] hover:underline pt-2"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-[#E2D7C3] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#8C6527] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Banner */}
                <div className="bg-[#192538] text-white p-5 border-b border-[#2C3E5A]">
                  <div className="flex items-center justify-between text-[11px] text-[#C1AF93] mb-2">
                    <span className="uppercase font-bold tracking-wider">{proj.industryCategory}</span>
                    <span className="bg-[#8C6527] text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                      {proj.difficultyLevel}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white leading-snug">
                    <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
                  </h3>
                </div>

                <div className="p-5 space-y-4">
                  <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
                    {proj.shortDescription}
                  </p>

                  {/* Skills tags */}
                  <div className="space-y-1.5 pt-2 border-t border-[#EFE8DD]">
                    <span className="text-[11px] font-bold text-[#192538] block">Practical Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.skillsCovered.slice(0, 3).map((sk, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#FAF7F0] text-[#57534E] border border-[#E2D7C3] px-2 py-0.5 rounded"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Software & Mentor */}
                  <div className="text-[11px] text-[#78716C] flex items-center justify-between pt-1">
                    <span>
                      <strong className="text-[#192538]">Tools:</strong> {proj.softwareUsed[0] || 'Tally Prime'}
                    </span>
                    <span className="font-semibold text-[#8C6527]">{proj.facultyMentor}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EFE8DD] mt-3 pt-4 bg-[#FAF7F0]/50">
                <span className="text-xs text-[#78716C] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#8C6527]" />
                  <span>{proj.practiceTimeHours} Hours</span>
                </span>

                <Link
                  href={`/projects/${proj.slug}`}
                  className="text-xs font-bold text-[#8C6527] hover:text-[#74511D] flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
