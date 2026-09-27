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
  Factory,
  Building2,
  Sparkles,
  Scale,
  Store,
  Wrench,
  Landmark,
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
    const list = Array.from(set);
    // Position Manufacturing first, Legal second, Traders third, Service fourth, Account fifth
    const order = ['Manufacturing Industry', 'Legal & Taxation', 'Traders Industry', 'Service Industry', 'Account Industry'];
    list.sort((a, b) => {
      const idxA = order.indexOf(a);
      const idxB = order.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
    return ['All', ...list];
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

  const isDefaultView = selectedIndustry === 'All' && !search.trim() && selectedDifficulty === 'All';
  const isMfgOnlyView = selectedIndustry === 'Manufacturing Industry' && !search.trim() && selectedDifficulty === 'All';
  const isLegalOnlyView = selectedIndustry === 'Legal & Taxation' && !search.trim() && selectedDifficulty === 'All';
  const isTraderOnlyView = selectedIndustry === 'Traders Industry' && !search.trim() && selectedDifficulty === 'All';
  const isServiceOnlyView = selectedIndustry === 'Service Industry' && !search.trim() && selectedDifficulty === 'All';
  const isAccountOnlyView = selectedIndustry === 'Account Industry' && !search.trim() && selectedDifficulty === 'All';

  const manufacturingProjects = useMemo(() => {
    return filtered.filter((p) => p.industryCategory === 'Manufacturing Industry');
  }, [filtered]);

  const legalProjects = useMemo(() => {
    return filtered.filter((p) => p.industryCategory === 'Legal & Taxation');
  }, [filtered]);

  const traderProjects = useMemo(() => {
    return filtered.filter((p) => p.industryCategory === 'Traders Industry');
  }, [filtered]);

  const serviceProjects = useMemo(() => {
    return filtered.filter((p) => p.industryCategory === 'Service Industry');
  }, [filtered]);

  const accountProjects = useMemo(() => {
    return filtered.filter((p) => p.industryCategory === 'Account Industry');
  }, [filtered]);

  const renderProjectCard = (proj: Project) => {
    const isMfg = proj.industryCategory === 'Manufacturing Industry';
    const isLegal = proj.industryCategory === 'Legal & Taxation';
    const isTrader = proj.industryCategory === 'Traders Industry';
    const isService = proj.industryCategory === 'Service Industry';
    const isAccount = proj.industryCategory === 'Account Industry';
    return (
      <div
        key={proj.id}
        className="bg-white rounded-2xl border border-[#E5D8CA] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#8B5A2B] transition-all duration-300 flex flex-col justify-between group"
      >
        <div>
          {/* Header Banner */}
          <div className="bg-[#2A1810] text-white p-5 border-b border-[#3D2314]">
            <div className="flex items-center justify-between text-[11px] text-[#C4AE96] mb-2">
              <span className="uppercase font-bold tracking-wider flex items-center gap-1.5">
                {isMfg && <Factory className="w-3.5 h-3.5 text-[#C4AE96]" />}
                {isLegal && <Scale className="w-3.5 h-3.5 text-[#C4AE96]" />}
                {isTrader && <Store className="w-3.5 h-3.5 text-[#C4AE96]" />}
                {isService && <Wrench className="w-3.5 h-3.5 text-[#C4AE96]" />}
                {isAccount && <Landmark className="w-3.5 h-3.5 text-[#C4AE96]" />}
                {proj.industryCategory}
              </span>
              <span className="bg-[#8B5A2B] text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                {proj.difficultyLevel}
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white leading-snug group-hover:text-[#F3E8DB] transition-colors">
              <Link href={`/projects/${proj.slug}`}>{proj.title}</Link>
            </h3>
          </div>

          <div className="p-5 space-y-4">
            <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3">
              {proj.shortDescription}
            </p>

            {/* Skills tags */}
            <div className="space-y-1.5 pt-2 border-t border-[#EFE6DD]">
              <span className="text-[11px] font-bold text-[#2A1810] block">Practical Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {proj.skillsCovered.slice(0, 3).map((sk, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-[#FAF6F0] text-[#57534E] border border-[#E5D8CA] px-2 py-0.5 rounded"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Software & Mentor */}
            <div className="text-[11px] text-[#78716C] flex items-center justify-between pt-1">
              <span>
                <strong className="text-[#2A1810]">Tools:</strong> {proj.softwareUsed[0] || 'Tally Prime'}
              </span>
              <span className="font-semibold text-[#8B5A2B]">{proj.facultyMentor}</span>
            </div>
          </div>
        </div>

        <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EFE6DD] mt-3 pt-4 bg-[#FAF6F0]/50">
          <span className="text-xs text-[#78716C] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>{proj.practiceTimeHours} Hours</span>
          </span>

          <Link
            href={`/projects/${proj.slug}`}
            className="text-xs font-bold text-[#8B5A2B] hover:text-[#70441E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            <span>Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5D8CA] shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by industry, e.g. 'Manufacturing', 'Hospital', 'Hotel', 'Builder', 'Steel'..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Foundational">Foundational</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className="md:col-span-3 text-right text-xs text-[#78716C]">
            Showing <strong className="text-[#2A1810]">{filtered.length}</strong> of{' '}
            {projects.length} Industrial Training Projects
          </div>
        </div>

        {/* Industry Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EFE6DD]">
          {industries.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                selectedIndustry === ind
                  ? 'bg-[#8B5A2B] text-white shadow-xs'
                  : 'bg-[#FAF6F0] text-[#57534E] hover:bg-[#EFE6DD] border border-[#E5D8CA]'
              }`}
            >
              {ind === 'Manufacturing Industry' && <Factory className="w-3 h-3" />}
              {ind === 'Legal & Taxation' && <Scale className="w-3 h-3" />}
              {ind === 'Traders Industry' && <Store className="w-3 h-3" />}
              {ind === 'Service Industry' && <Wrench className="w-3 h-3" />}
              {ind === 'Account Industry' && <Landmark className="w-3 h-3" />}
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Display */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5D8CA] p-8 space-y-3">
          <Briefcase className="w-10 h-10 text-[#C4AE96] mx-auto" />
          <h3 className="text-lg font-serif font-bold text-[#2A1810]">No matching projects found</h3>
          <p className="text-xs text-[#57534E]">Try a different search keyword or industry filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedIndustry('All');
              setSelectedDifficulty('All');
            }}
            className="text-xs font-bold text-[#8B5A2B] hover:underline pt-2"
          >
            Reset all filters
          </button>
        </div>
      ) : isDefaultView || isMfgOnlyView || isLegalOnlyView || isTraderOnlyView || isServiceOnlyView || isAccountOnlyView ? (
        /* Sectioned View: MANUFACTURING, LEGAL & TAXATION, TRADERS, SERVICE, and ACCOUNT INDUSTRY */
        <div className="space-y-12">
          {/* Section 1: MANUFACTURING INDUSTRY */}
          {(isDefaultView || isMfgOnlyView) && (
            <>
              <div className="text-center py-6 sm:py-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE6DD] border border-[#D8C5B2] text-[#8B5A2B] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Factory className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Core Production, BOM & Plant Costing</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#2A1810] tracking-tight">
                  MANUFACTURING INDUSTRY
                </h2>

                <div className="w-24 h-1 bg-[#8B5A2B] mx-auto rounded-full" />

                <p className="text-sm sm:text-base text-[#57534E] max-w-3xl mx-auto leading-relaxed">
                  Complete practical factory accounting simulations across {manufacturingProjects.length} core manufacturing sectors — master Bill of Materials (BOM), Multi-Stage Production Journals, Job-Work (GST ITC-04), Scrap &amp; Wastage Control, and Finished Goods Unit Costing.
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B5A2B] bg-white px-3.5 py-1.5 rounded-full border border-[#E5D8CA] shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>{manufacturingProjects.length} Signature Manufacturing Projects</span>
                </div>
              </div>

              {/* Manufacturing Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {manufacturingProjects.map((proj) => renderProjectCard(proj))}
              </div>
            </>
          )}

          {/* Section 2: LEGAL & TAXATION */}
          {(isDefaultView || isLegalOnlyView) && legalProjects.length > 0 && (
            <div id="legal-taxation-section" className={isDefaultView ? "pt-12 space-y-8" : "space-y-8"}>
              <div className={`${isDefaultView ? "border-t-2 border-dashed border-[#D8C5B2] pt-12" : "py-6 sm:py-8"} text-center space-y-4`}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E5D8CA] text-[#78716C] text-xs font-bold uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Legal, Taxation & Corporate Compliance</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2A1810]">
                  LEGAL &amp; TAXATION
                </h2>

                <div className="w-20 h-0.5 bg-[#D8C5B2] mx-auto rounded-full" />

                <p className="text-xs sm:text-sm text-[#57534E] max-w-2xl mx-auto leading-relaxed">
                  Real-world GST, TDS/TCS, corporate taxation, statutory compliance, banking limits, and commercial practical cases across corporate sectors.
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#78716C] bg-white px-3 py-1 rounded-full border border-[#E5D8CA]">
                  <span>{legalProjects.length} Practical Projects</span>
                </div>
              </div>

              {/* Legal & Taxation Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legalProjects.map((proj) => renderProjectCard(proj))}
              </div>
            </div>
          )}

          {/* Section 3: TRADERS INDUSTRY */}
          {(isDefaultView || isTraderOnlyView) && traderProjects.length > 0 && (
            <div id="traders-industry-section" className={isDefaultView ? "pt-12 space-y-8" : "space-y-8"}>
              <div className={`${isDefaultView ? "border-t-2 border-dashed border-[#D8C5B2] pt-12" : "py-6 sm:py-8"} text-center space-y-4`}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E5D8CA] text-[#78716C] text-xs font-bold uppercase tracking-wider">
                  <Store className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Wholesale, Retail & Multi-Brand Distribution</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2A1810]">
                  TRADERS INDUSTRY
                </h2>

                <div className="w-20 h-0.5 bg-[#D8C5B2] mx-auto rounded-full" />

                <p className="text-xs sm:text-sm text-[#57534E] max-w-2xl mx-auto leading-relaxed">
                  Practical commercial trade accounting: Electronic Showroom serial number &amp; consumer EMI finance, Multi-Brand FMCG distribution with primary-secondary schemes, and Medicine Wholesale with batch &amp; expiry controls.
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#78716C] bg-white px-3 py-1 rounded-full border border-[#E5D8CA]">
                  <span>{traderProjects.length} Practical Projects</span>
                </div>
              </div>

              {/* Traders Industry Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {traderProjects.map((proj) => renderProjectCard(proj))}
              </div>
            </div>
          )}

          {/* Section 4: SERVICE INDUSTRY */}
          {(isDefaultView || isServiceOnlyView) && serviceProjects.length > 0 && (
            <div id="service-industry-section" className={isDefaultView ? "pt-12 space-y-8" : "space-y-8"}>
              <div className={`${isDefaultView ? "border-t-2 border-dashed border-[#D8C5B2] pt-12" : "py-6 sm:py-8"} text-center space-y-4`}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E5D8CA] text-[#78716C] text-xs font-bold uppercase tracking-wider">
                  <Wrench className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Professional, Commercial &amp; Hospitality Services</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2A1810]">
                  SERVICE INDUSTRY
                </h2>

                <div className="w-20 h-0.5 bg-[#D8C5B2] mx-auto rounded-full" />

                <p className="text-xs sm:text-sm text-[#57534E] max-w-2xl mx-auto leading-relaxed">
                  Real-world service sector accounting: Two-wheeler Activa &amp; mobile service centers, College fee reconciliations, Tour &amp; Travels, Salon chains, Hotel hospitality, Freight logistics, and Shatabdi passenger bus fleet trip costing.
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#78716C] bg-white px-3 py-1 rounded-full border border-[#E5D8CA]">
                  <span>{serviceProjects.length} Practical Projects</span>
                </div>
              </div>

              {/* Service Industry Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceProjects.map((proj) => renderProjectCard(proj))}
              </div>
            </div>
          )}

          {/* Section 5: ACCOUNT INDUSTRY */}
          {(isDefaultView || isAccountOnlyView) && accountProjects.length > 0 && (
            <div id="account-industry-section" className={isDefaultView ? "pt-12 space-y-8" : "space-y-8"}>
              <div className={`${isDefaultView ? "border-t-2 border-dashed border-[#D8C5B2] pt-12" : "py-6 sm:py-8"} text-center space-y-4`}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] border border-[#E5D8CA] text-[#78716C] text-xs font-bold uppercase tracking-wider">
                  <Landmark className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Auditing, Banking Controls &amp; Working Capital Treasury</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2A1810]">
                  ACCOUNT INDUSTRY
                </h2>

                <div className="w-20 h-0.5 bg-[#D8C5B2] mx-auto rounded-full" />

                <p className="text-xs sm:text-sm text-[#57534E] max-w-2xl mx-auto leading-relaxed">
                  Executive corporate accounting &amp; financial operations: Internal &amp; statutory year-end audit finalisation, automated purchase order procurement workflows, vendor payment aging &amp; cash flows, automated bank reconciliation (BRS), and banking CC limit drawing power statements.
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#78716C] bg-white px-3 py-1 rounded-full border border-[#E5D8CA]">
                  <span>{accountProjects.length} Practical Projects</span>
                </div>
              </div>

              {/* Account Industry Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accountProjects.map((proj) => renderProjectCard(proj))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Filtered/Search View */
        <div className="space-y-6">
          <div className="text-center py-4 space-y-2">
            <h2 className="text-2xl font-serif font-bold text-[#2A1810]">
              {selectedIndustry !== 'All' ? selectedIndustry.toUpperCase() : 'SEARCH RESULTS'}
            </h2>
            <p className="text-xs text-[#57534E]">
              Showing {filtered.length} matching industrial training {filtered.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((proj) => renderProjectCard(proj))}
          </div>
        </div>
      )}
    </div>
  );
}

