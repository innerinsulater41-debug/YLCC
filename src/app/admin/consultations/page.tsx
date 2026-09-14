"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  CheckCircle2,
  Trash2,
  Calendar,
  Clock,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  X,
  ExternalLink,
} from "lucide-react";
import { CorporateConsultation } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminConsultationsPage() {
  const [consultations, setConsultations] = useState<CorporateConsultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<CorporateConsultation | null>(null);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/consultations");
      const data = await res.json();
      if (data.success && data.consultations) {
        setConsultations(data.consultations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const handleUpdateStatus = async (
    id: string,
    status: CorporateConsultation["status"],
    adminNotes?: string
  ) => {
    try {
      const res = await fetch("/api/consultations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, adminNotes }),
      });
      if (res.ok) {
        fetchConsultations();
        if (selectedItem && selectedItem.id === id) {
          setSelectedItem((prev) => (prev ? { ...prev, status, adminNotes } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete consultation record for "${name}"?`)) return;
    try {
      await fetch(`/api/consultations?id=${id}`, { method: "DELETE" });
      fetchConsultations();
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = consultations.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Corporate &amp; Business Consultations
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Review enterprise advisory requests, corporate upskilling proposals, and hiring partnerships.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name, contact person, or email..."
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
          <option value="Meeting Scheduled">Meeting Scheduled</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Consultations Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-600">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-6">Company &amp; Lead</th>
                <th className="py-3.5 px-4">Consultation Area</th>
                <th className="py-3.5 px-4">Size &amp; Budget</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">Loading consultations...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-stone-400">No corporate consultation requests found.</td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/50">
                    <td className="py-4 px-6">
                      <div className="font-bold text-stone-900 text-xs">{item.companyName}</div>
                      <div className="text-[11px] text-stone-500">
                        {item.contactPerson} • {item.designation}
                      </div>
                      <div className="text-[10px] text-amber-800 font-medium">{item.email}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-stone-800">{item.consultationType}</td>
                    <td className="py-4 px-4">
                      <div>{item.companySize} employees</div>
                      <div className="text-[11px] text-stone-400">{item.budgetRange || "Flexible"}</div>
                    </td>
                    <td className="py-4 px-4 text-stone-400">{formatDate(item.createdAt)}</td>
                    <td className="py-4 px-4">
                      <select
                        value={item.status}
                        onChange={(e: any) => handleUpdateStatus(item.id, e.target.value)}
                        className="px-2 py-1 rounded-md text-[11px] font-bold border border-stone-200 bg-stone-50 text-stone-800"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Meeting Scheduled">Meeting Scheduled</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.companyName)}
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

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-stone-900">{selectedItem.companyName}</h3>
                <p className="text-xs text-stone-500">Corporate Consultation Request</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200">
                <div>
                  <span className="text-stone-400 font-semibold block">Contact Person:</span>
                  <span className="font-bold text-stone-900">{selectedItem.contactPerson} ({selectedItem.designation})</span>
                </div>
                <div>
                  <span className="text-stone-400 font-semibold block">Phone:</span>
                  <span className="font-bold text-stone-900">{selectedItem.phone}</span>
                </div>
                <div className="mt-2">
                  <span className="text-stone-400 font-semibold block">Email:</span>
                  <a href={`mailto:${selectedItem.email}`} className="text-amber-800 font-bold hover:underline">
                    {selectedItem.email}
                  </a>
                </div>
                <div className="mt-2">
                  <span className="text-stone-400 font-semibold block">Company Scale:</span>
                  <span className="font-bold text-stone-900">{selectedItem.companySize} employees</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1">Requirement Scope:</span>
                <p className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 leading-relaxed">
                  {selectedItem.message}
                </p>
              </div>

              <div>
                <label className="font-bold text-stone-900 block mb-1">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  defaultValue={selectedItem.adminNotes || ""}
                  onBlur={(e) => handleUpdateStatus(selectedItem.id, selectedItem.status, e.target.value)}
                  placeholder="Add discovery meeting outcomes or proposal details..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-amber-50 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
