"use client";

import { useState, useEffect } from "react";
import { Mail, Search, Trash2, CheckCircle2, X } from "lucide-react";
import { Enquiry } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success && data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: Enquiry["status"],
    adminNotes?: string
  ) => {
    try {
      const res = await fetch("/api/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, adminNotes }),
      });
      if (res.ok) {
        fetchEnquiries();
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status, adminNotes } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete enquiry from "${name}"?`)) return;
    try {
      await fetch(`/api/enquiries?id=${id}`, { method: "DELETE" });
      fetchEnquiries();
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.courseInterest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          Admissions Enquiries &amp; Leads
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Review candidate questions, update counselor follow-up statuses, and track enrollment conversions.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search enquiries by candidate name, email, or course..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-hidden focus:border-amber-700"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Converted">Converted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Candidate</th>
                <th className="py-3.5 px-4">Program Interest</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">Loading enquiries...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">No enquiries found.</td>
                </tr>
              ) : (
                filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-stone-50/50">
                    <td className="py-4 px-6">
                      <div className="font-bold text-stone-900">{e.fullName}</div>
                      <div className="text-[11px] text-stone-500">{e.phone}</div>
                      <div className="text-[10px] text-amber-800">{e.email}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-stone-800">{e.courseInterest}</td>
                    <td className="py-4 px-4 truncate max-w-xs">{e.subject}</td>
                    <td className="py-4 px-4 text-stone-400">{formatDate(e.createdAt)}</td>
                    <td className="py-4 px-4">
                      <select
                        value={e.status}
                        onChange={(ev: any) => handleUpdateStatus(e.id, ev.target.value)}
                        className="px-2 py-1 rounded-md text-[11px] font-bold border border-stone-200 bg-stone-50 text-stone-800"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEnquiry(e)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(e.id, e.fullName)}
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

      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-stone-900">{selectedEnquiry.fullName}</h3>
              <button onClick={() => setSelectedEnquiry(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div><strong>Email:</strong> {selectedEnquiry.email}</div>
                <div><strong>Phone:</strong> {selectedEnquiry.phone}</div>
                <div><strong>Program:</strong> {selectedEnquiry.courseInterest}</div>
                <div><strong>Subject:</strong> {selectedEnquiry.subject}</div>
              </div>

              <div>
                <strong className="block mb-1">Message:</strong>
                <p className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 leading-relaxed">
                  {selectedEnquiry.message}
                </p>
              </div>

              <div>
                <strong className="block mb-1">Counselor Notes:</strong>
                <textarea
                  rows={3}
                  defaultValue={selectedEnquiry.adminNotes || ""}
                  onBlur={(ev) => handleUpdateStatus(selectedEnquiry.id, selectedEnquiry.status, ev.target.value)}
                  placeholder="Notes from telephone counseling discussion..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button onClick={() => setSelectedEnquiry(null)} className="px-4 py-2 bg-stone-900 text-amber-50 rounded-xl font-bold">
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
