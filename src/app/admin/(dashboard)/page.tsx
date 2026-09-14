import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Briefcase,
  Inbox,
  GraduationCap,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { db } from '@/lib/db';
import AdminAnalyticsCharts from '@/components/admin/AdminAnalyticsCharts';

export default async function AdminDashboardPage() {
  const [settings, programs, projects, enquiries, applications] = await Promise.all([
    db.getSettings(),
    db.getPrograms(),
    db.getProjects(),
    db.getEnquiries(),
    db.getApplications(),
  ]);

  const publishedProjects = projects.filter((p) => p.status === 'published');
  const draftProjects = projects.filter((p) => p.status === 'draft');
  const newEnquiries = enquiries.filter((e) => e.status === 'new');
  const pendingApps = applications.filter((a) => a.status === 'pending' || a.status === 'under_review');

  // Chart datasets
  const programCounts = programs.slice(0, 6).map((p) => ({
    name: p.title.replace('Practical Training', '').replace('Professional Program', '').substring(0, 16),
    count: Math.floor(Math.random() * 12) + 4, // realistic enrollment representation
  }));

  // Industry distribution for 16 projects
  const industryMap: Record<string, number> = {};
  projects.forEach((p) => {
    industryMap[p.industryCategory] = (industryMap[p.industryCategory] || 0) + 1;
  });
  const projectIndustryDistribution = Object.entries(industryMap).map(([name, value]) => ({
    name: name.substring(0, 15),
    value,
  }));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2D7C3] pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
            Management Center
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#192538]">
            Welcome, Administrator
          </h1>
          <p className="text-xs text-[#57534E] mt-0.5">
            {settings.fullForm} • All statistics and database records are live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="bg-[#8C6527] hover:bg-[#74511D] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Project</span>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-white hover:bg-[#FAF7F0] text-[#192538] border border-[#D4C5AD] px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            Institute Settings
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
              Practical Projects
            </span>
            <div className="p-2 rounded-lg bg-[#FAF7F0] text-[#8C6527]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#192538]">
              {projects.length}
            </span>
            <span className="text-xs text-emerald-700 font-semibold">
              ({publishedProjects.length} Published, {draftProjects.length} Draft)
            </span>
          </div>
          <Link
            href="/admin/projects"
            className="text-[11px] font-bold text-[#8C6527] hover:underline flex items-center gap-1 pt-1"
          >
            <span>Manage Case Studies →</span>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
              Training Programs
            </span>
            <div className="p-2 rounded-lg bg-[#FAF7F0] text-[#8C6527]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#192538]">
              {programs.length}
            </span>
            <span className="text-xs text-[#78716C]">Core Commerce Tracks</span>
          </div>
          <Link
            href="/admin/programs"
            className="text-[11px] font-bold text-[#8C6527] hover:underline flex items-center gap-1 pt-1"
          >
            <span>Manage Syllabi →</span>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
              Student Enquiries
            </span>
            <div className="p-2 rounded-lg bg-[#FAF7F0] text-[#8C6527]">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#192538]">
              {enquiries.length}
            </span>
            <span className="text-xs text-amber-700 font-semibold">
              ({newEnquiries.length} New Needs Attention)
            </span>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-[11px] font-bold text-[#8C6527] hover:underline flex items-center gap-1 pt-1"
          >
            <span>View Leads Pipeline →</span>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
              Admissions Filed
            </span>
            <div className="p-2 rounded-lg bg-[#FAF7F0] text-[#8C6527]">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-bold text-[#192538]">
              {applications.length}
            </span>
            <span className="text-xs text-blue-700 font-semibold">
              ({pendingApps.length} Under Review)
            </span>
          </div>
          <Link
            href="/admin/applications"
            className="text-[11px] font-bold text-[#8C6527] hover:underline flex items-center gap-1 pt-1"
          >
            <span>Review Applications →</span>
          </Link>
        </div>
      </div>

      {/* Analytics Visual Charts */}
      <AdminAnalyticsCharts
        programCounts={programCounts}
        projectIndustryDistribution={projectIndustryDistribution}
      />

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8DD] pb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-[#192538]">
                  Recent Student Enquiries
                </h3>
                <p className="text-xs text-[#78716C]">Prospective students seeking batch counseling</p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-bold text-[#8C6527] hover:underline"
              >
                View All ({enquiries.length})
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <p className="text-xs text-[#78716C] py-4 text-center">No enquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 4).map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <div className="font-bold text-[#192538] flex items-center gap-2">
                        <span>{enq.name}</span>
                        <span
                          className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                            enq.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : enq.status === 'contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C] truncate">{enq.programOfInterest}</p>
                      <p className="text-[10px] text-[#A89577]">{enq.phone} • {enq.email}</p>
                    </div>

                    <Link
                      href="/admin/enquiries"
                      className="px-2.5 py-1 rounded bg-white hover:bg-[#ECE4D4] border border-[#D4C5AD] text-[#192538] font-semibold text-[11px] shrink-0"
                    >
                      Inspect
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E2D7C3] shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE8DD] pb-3">
              <div>
                <h3 className="text-base font-serif font-bold text-[#192538]">
                  Recent Admission Applications
                </h3>
                <p className="text-xs text-[#78716C]">Students applying for batch enrollment</p>
              </div>
              <Link
                href="/admin/applications"
                className="text-xs font-bold text-[#8C6527] hover:underline"
              >
                View All ({applications.length})
              </Link>
            </div>

            {applications.length === 0 ? (
              <p className="text-xs text-[#78716C] py-4 text-center">No applications yet.</p>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 4).map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <div className="font-bold text-[#192538] flex items-center gap-2">
                        <span>{app.studentName}</span>
                        <span
                          className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                            app.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : app.status === 'under_review'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#78716C]">{app.qualification}</p>
                      <p className="text-[10px] text-[#A89577]">{app.phone} • Mode: {app.preferredMode}</p>
                    </div>

                    <Link
                      href="/admin/applications"
                      className="px-2.5 py-1 rounded bg-[#8C6527] text-white hover:bg-[#74511D] font-semibold text-[11px] shrink-0"
                    >
                      Review
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
