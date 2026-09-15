'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  FileText,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Trash2,
  Download,
  X,
  Clock,
  User,
  ShieldCheck,
} from 'lucide-react';
import { AdmissionApplication } from '@/types';

interface AdminApplicationsListClientProps {
  initialApplications: AdmissionApplication[];
}

export default function AdminApplicationsListClient({
  initialApplications,
}: AdminApplicationsListClientProps) {
  const router = useRouter();
  const [applications, setApplications] = useState<AdmissionApplication[]>(initialApplications);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'under_review' | 'approved' | 'rejected'>('all');
  const [activeApp, setActiveApp] = useState<AdmissionApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const updateStatus = async (id: string, newStatus: AdmissionApplication['status']) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
      if (activeApp && activeApp.id === id) {
        setActiveApp((prev) => prev ? { ...prev, status: newStatus } : null);
      }
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const saveAdminNotes = async () => {
    if (!activeApp) return;
    setSavingNotes(true);
    try {
      await fetch(`/api/applications/${activeApp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes }),
      });

      setApplications((prev) =>
        prev.map((a) => (a.id === activeApp.id ? { ...a, adminNotes } : a))
      );
      setActiveApp((prev) => prev ? { ...prev, adminNotes } : null);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setSavingNotes(false);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this application record?')) return;
    try {
      await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (activeApp?.id === id) setActiveApp(null);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = applications.filter((a) => {
    return statusFilter === 'all' || a.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Status Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5D8CA] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'under_review', 'approved', 'rejected'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                statusFilter === st
                  ? 'bg-[#8B5A2B] text-white'
                  : 'bg-[#FAF6F0] text-[#57534E] hover:bg-[#EFE6DD] border border-[#E5D8CA]'
              }`}
            >
              {st.replace('_', ' ')} ({st === 'all' ? applications.length : applications.filter((a) => a.status === st).length})
            </button>
          ))}
        </div>

        <span className="text-xs text-[#78716C]">
          Total Applications: {filtered.length}
        </span>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-[#E5D8CA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#E5D8CA] text-[#78716C] uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4">Applicant Name</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Selected Program</th>
                <th className="p-4">Mode / Batch</th>
                <th className="p-4">Documents</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6DD]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#78716C]">
                    No applications found matching this status.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-[#FAF6F0]/60 transition-colors">
                    <td className="p-4 font-semibold text-[#2A1810]">
                      <span>{app.studentName}</span>
                      <span className="block text-[10px] text-[#78716C] font-normal mt-0.5">
                        {app.qualification}
                      </span>
                    </td>

                    <td className="p-4 text-[#57534E]">
                      <span className="font-semibold text-[#8B5A2B]">{app.phone}</span>
                      <span className="block text-[10px] text-[#78716C]">{app.email}</span>
                    </td>

                    <td className="p-4 text-[#2A1810] font-medium">
                      <span className="bg-[#FAF6F0] border border-[#E5D8CA] px-2 py-0.5 rounded text-[11px]">
                        {app.selectedProgram}
                      </span>
                    </td>

                    <td className="p-4 text-[#57534E]">
                      <span>{app.preferredMode}</span>
                      <span className="block text-[10px] text-[#78716C]">{app.preferredBatch}</span>
                    </td>

                    <td className="p-4">
                      {app.documentUrls && app.documentUrls.length > 0 ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{app.documentUrls.length} Files</span>
                        </span>
                      ) : (
                        <span className="text-[#A68A70]">None</span>
                      )}
                    </td>

                    <td className="p-4">
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value as any)}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          app.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : app.status === 'under_review'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="under_review">Under Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveApp(app);
                            setAdminNotes(app.adminNotes || '');
                          }}
                          className="px-2.5 py-1 rounded bg-[#8B5A2B] text-white hover:bg-[#70441E] font-bold text-[11px]"
                        >
                          Dossier
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteApplication(app.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Dossier Modal */}
      {activeApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[#D8C5B2]">
            <div className="flex items-center justify-between border-b border-[#EFE6DD] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">
                  Admission Dossier #{activeApp.id}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2A1810]">
                  {activeApp.studentName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveApp(null)}
                className="p-1 text-[#78716C] hover:text-[#2A1810]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#78716C] block">Phone:</span>
                <a href={`tel:${activeApp.phone}`} className="font-bold text-[#8B5A2B]">
                  {activeApp.phone}
                </a>
              </div>
              <div>
                <span className="text-[#78716C] block">Email:</span>
                <span className="font-semibold text-[#2A1810]">{activeApp.email}</span>
              </div>
              <div>
                <span className="text-[#78716C] block">Date of Birth:</span>
                <span className="font-semibold text-[#2A1810]">{activeApp.dob}</span>
              </div>
              <div>
                <span className="text-[#78716C] block">Qualification:</span>
                <span className="font-semibold text-[#2A1810]">{activeApp.qualification}</span>
              </div>
              <div>
                <span className="text-[#78716C] block">Selected Program:</span>
                <span className="font-bold text-[#8B5A2B]">{activeApp.selectedProgram}</span>
              </div>
              <div>
                <span className="text-[#78716C] block">Learning Mode & Batch:</span>
                <span className="font-semibold text-[#2A1810]">
                  {activeApp.preferredMode} ({activeApp.preferredBatch})
                </span>
              </div>
            </div>

            <div className="text-xs space-y-1 bg-[#FAF6F0] p-3 rounded-xl border border-[#E5D8CA]">
              <span className="font-bold text-[#2A1810]">Residential Address:</span>
              <p className="text-[#57534E]">{activeApp.address}</p>
            </div>

            {activeApp.careerGoal && (
              <div className="text-xs space-y-1 bg-[#FAF6F0] p-3 rounded-xl border border-[#E5D8CA]">
                <span className="font-bold text-[#2A1810]">Career Aspirations / Expectation:</span>
                <p className="text-[#57534E]">{activeApp.careerGoal}</p>
              </div>
            )}

            {/* Attached Files */}
            {activeApp.documentUrls && activeApp.documentUrls.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#2A1810] block">Attached Documents:</span>
                <div className="flex flex-wrap gap-2">
                  {activeApp.documentUrls.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#FAF6F0] border border-[#E5D8CA] text-xs font-semibold text-[#8B5A2B] flex items-center gap-1.5 hover:bg-[#EFE6DD]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Document #{i + 1}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Review Notes Editor */}
            <div className="space-y-2 pt-2 border-t border-[#EFE6DD]">
              <label className="block text-xs font-bold text-[#2A1810]">
                Admissions Committee Internal Notes:
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add review notes, batch allocation status, fee payment notes..."
                className="w-full px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl text-[#2A1810]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={saveAdminNotes}
                  disabled={savingNotes}
                  className="bg-[#2A1810] hover:bg-[#1F120A] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  {savingNotes ? 'Saving...' : 'Save Internal Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
