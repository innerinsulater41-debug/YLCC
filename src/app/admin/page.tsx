import { DataStore } from "@/lib/db/store";
import Link from "next/link";
import {
  Code2,
  BookOpen,
  Mail,
  FileCheck2,
  Users2,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Plus,
  Clock,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [courses, projects, enquiries, applications, consultations, faculty, logs] =
    await Promise.all([
      DataStore.getCourses(true),
      DataStore.getProjects(true),
      DataStore.getEnquiries(),
      DataStore.getApplications(),
      DataStore.getConsultations(),
      DataStore.getFaculty(),
      DataStore.getActivityLogs(),
    ]);

  const newEnquiries = enquiries.filter((e) => e.status === "New").length;
  const pendingApps = applications.filter((a) => a.status === "Pending").length;
  const newConsultations = consultations.filter((c) => c.status === "New" || c.status === "Meeting Scheduled").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Institutional Control Center
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time management of student cohorts, enterprise consultations, and capstone projects.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Course</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Projects</span>
            <Code2 className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{projects.length}</div>
          <div className="text-[11px] text-stone-500">
            {projects.filter((p) => p.isPublished).length} Published
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Courses</span>
            <BookOpen className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{courses.length}</div>
          <div className="text-[11px] text-stone-500">
            {courses.filter((c) => c.isPublished).length} Active
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Corporate</span>
            <Briefcase className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{consultations.length}</div>
          <div className="text-[11px] text-amber-800 font-semibold">
            {newConsultations} Active Meetings
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Enquiries</span>
            <Mail className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{enquiries.length}</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {newEnquiries} New Leads
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Admissions</span>
            <FileCheck2 className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{applications.length}</div>
          <div className="text-[11px] text-amber-800 font-semibold">
            {pendingApps} Pending
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Faculty</span>
            <Users2 className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-stone-900">{faculty.length}</div>
          <div className="text-[11px] text-stone-500">Mentors on roster</div>
        </div>
      </div>

      {/* Two Column Section: Corporate Consultations & Admissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Corporate Consultations Quick View */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Business &amp; Corporate Consultations
              </h2>
              <p className="text-xs text-stone-500">Inquiries from enterprises &amp; founders</p>
            </div>
            <Link
              href="/admin/consultations"
              className="text-xs font-bold text-amber-800 hover:underline inline-flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {consultations.slice(0, 4).map((cons) => (
              <div key={cons.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-900">{cons.companyName}</div>
                  <div className="text-[11px] text-stone-500">
                    {cons.contactPerson} • {cons.designation}
                  </div>
                  <div className="text-[10px] text-amber-800 font-medium mt-0.5">
                    {cons.consultationType}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                  {cons.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Applications Quick View */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">
                Recent Admission Applications
              </h2>
              <p className="text-xs text-stone-500">Student applications submitted online</p>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-bold text-amber-800 hover:underline inline-flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-stone-100">
            {applications.slice(0, 4).map((app) => (
              <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-stone-900">{app.fullName}</div>
                  <div className="text-[11px] text-stone-500 truncate max-w-xs">
                    {app.selectedCourse}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    Mode: {app.preferredMode} • Batch: {app.preferredBatch}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-stone-100 text-stone-800">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Logs */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">
            System &amp; Administrator Activity Audit Trail
          </h2>
          <span className="text-xs text-stone-400">Latest 10 actions</span>
        </div>

        <div className="divide-y divide-stone-100">
          {logs.slice(0, 6).map((log) => (
            <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-stone-700 uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-stone-100">
                  {log.action}
                </span>
                <span className="text-stone-800 font-medium">{log.details}</span>
              </div>
              <span className="text-stone-400 shrink-0 text-[11px]">
                {formatDate(log.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
