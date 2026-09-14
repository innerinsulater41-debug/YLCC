'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Inbox,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Trash2,
  MessageSquare,
  Clock,
  Search,
} from 'lucide-react';
import { Enquiry } from '@/types';

interface AdminEnquiriesListClientProps {
  initialEnquiries: Enquiry[];
}

export default function AdminEnquiriesListClient({ initialEnquiries }: AdminEnquiriesListClientProps) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'resolved'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState('');

  const updateStatus = async (id: string, newStatus: Enquiry['status']) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      // Update local state directly
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = enquiries.filter((e) => {
    return statusFilter === 'all' || e.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filter Chips */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E2D7C3] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(['all', 'new', 'contacted', 'resolved'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                statusFilter === st
                  ? 'bg-[#8C6527] text-white'
                  : 'bg-[#FAF7F0] text-[#57534E] hover:bg-[#ECE4D4] border border-[#E2D7C3]'
              }`}
            >
              {st} ({st === 'all' ? enquiries.length : enquiries.filter((e) => e.status === st).length})
            </button>
          ))}
        </div>

        <span className="text-xs text-[#78716C]">
          Showing {filtered.length} leads
        </span>
      </div>

      {/* Enquiries Grid */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-[#E2D7C3] text-xs text-[#78716C]">
            No enquiries found under status "{statusFilter}".
          </div>
        ) : (
          filtered.map((enq) => (
            <div
              key={enq.id}
              className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs hover:border-[#8C6527] transition-all flex flex-col sm:flex-row items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-serif font-bold text-[#192538]">{enq.name}</h3>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
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

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#57534E]">
                  <a href={`tel:${enq.phone}`} className="flex items-center gap-1.5 font-bold text-[#8C6527]">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{enq.phone}</span>
                  </a>
                  <a href={`mailto:${enq.email}`} className="flex items-center gap-1.5 hover:underline">
                    <Mail className="w-3.5 h-3.5 text-[#78716C]" />
                    <span>{enq.email}</span>
                  </a>
                  <span className="text-[#78716C] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E2D7C3] text-xs space-y-1">
                  <span className="font-bold text-[#192538]">Program: {enq.programOfInterest}</span>
                  <span className="text-[#78716C] block">Preferred Schedule: {enq.preferredBatch}</span>
                  {enq.message && (
                    <p className="text-[#57534E] italic pt-1 border-t border-[#EFE8DD] mt-1">
                      "{enq.message}"
                    </p>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex sm:flex-col items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                <select
                  value={enq.status}
                  onChange={(e) => updateStatus(enq.id, e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#D4C5AD] rounded-lg text-[#192538] font-semibold"
                >
                  <option value="new">Mark as New</option>
                  <option value="contacted">Mark as Contacted</option>
                  <option value="resolved">Mark as Resolved</option>
                </select>

                <button
                  type="button"
                  onClick={() => deleteEnquiry(enq.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
