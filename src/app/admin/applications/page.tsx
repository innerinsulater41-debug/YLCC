"use client";

import { useState, useEffect } from "react";
import { FileCheck2, Search, Trash2, FileText, X, CheckCircle2 } from "lucide-react";
import { AdmissionApplication } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      if (data.success && data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: AdmissionApplication["status"],
    adminNotes?: string
  ) => {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, adminNotes }),
      });
      if (res.ok) {
        fetchApps();
        if (selectedApp?.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status, adminNotes } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete admission application for "${name}"?`)) return;
    try {
      await fetch(`/api/applications?id=${id}`, { method: "DELETE" });
      fetchApps();
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = applications.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.selectedCourse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Cohort Admission Applications
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Review student background submissions, download resumes, and manage admissions workflow.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search applicants by name, email, or course..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-amber-700"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Accepted">Accepted</option>
          <option value="Waitlisted">Waitlisted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Applicant Name</th>
                <th className="py-3.5 px-4">Selected Program</th>
                <th className="py-3.5 px-4">Mode / Batch</th>
                <th className="py-3.5 px-4">Resume Document</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">Loading applications...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">No applications found.</td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-stone-50/50">
                    <td className="py-4 px-6">
                      <div className="font-bold text-stone-900">{app.fullName}</div>
                      <div className="text-[11px] text-stone-500">{app.email}</div>
                      <div className="text-[10px] text-amber-800">{app.phone}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-stone-800 max-w-xs truncate">
                      {app.selectedCourse}
                    </td>
                    <td className="py-4 px-4">
                      <div>{app.preferredMode}</div>
                      <div className="text-[11px] text-stone-400">{app.preferredBatch} Batch</div>
                    </td>
                    <td className="py-4 px-4">
                      {app.documentUrl ? (
                        <a
                          href={app.documentUrl}
                          download
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Resume</span>
                        </a>
                      ) : (
                        <span className="text-stone-400 text-[11px]">None</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={app.status}
                        onChange={(e: any) => handleUpdateStatus(app.id, e.target.value)}
                        className="px-2 py-1 rounded-md text-[11px] font-bold border border-stone-200 bg-stone-50 text-stone-800"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Waitlisted">Waitlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleDelete(app.id, app.fullName)}
                          className="p-1 text-stone-400 hover:text-rose-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-stone-900">{selectedApp.fullName}</h3>
                <p className="text-xs text-stone-500">Applicant Reference ID: {selectedApp.id}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div><strong>Qualification:</strong> {selectedApp.qualification}</div>
                <div><strong>DOB:</strong> {selectedApp.dateOfBirth}</div>
                <div><strong>Phone:</strong> {selectedApp.phone}</div>
                <div><strong>Email:</strong> {selectedApp.email}</div>
                <div className="col-span-2"><strong>Address:</strong> {selectedApp.address}</div>
              </div>

              <div>
                <strong>Program Selection:</strong>
                <p className="mt-0.5 text-stone-900 font-semibold">{selectedApp.selectedCourse} ({selectedApp.preferredMode} • {selectedApp.preferredBatch})</p>
              </div>

              {selectedApp.documentUrl && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-800" />
                    <span className="font-semibold text-amber-900">Uploaded Student Document</span>
                  </div>
                  <a href={selectedApp.documentUrl} download className="text-amber-800 font-bold hover:underline">
                    Download File
                  </a>
                </div>
              )}

              <div>
                <strong className="block mb-1">Admissions Committee Notes:</strong>
                <textarea
                  rows={3}
                  defaultValue={selectedApp.adminNotes || ""}
                  onBlur={(e) => handleUpdateStatus(selectedApp.id, selectedApp.status, e.target.value)}
                  placeholder="Evaluation score, scholarship grants, cohort allotment notes..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-stone-900 text-amber-50 rounded-xl font-bold">
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
