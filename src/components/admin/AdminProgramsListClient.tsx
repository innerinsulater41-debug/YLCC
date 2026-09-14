'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  Save,
  X,
  Laptop,
} from 'lucide-react';
import { Program } from '@/types';

interface AdminProgramsListClientProps {
  initialPrograms: Program[];
}

export default function AdminProgramsListClient({ initialPrograms }: AdminProgramsListClientProps) {
  const router = useRouter();
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [saving, setSaving] = useState(false);

  // Toggle publish status
  const handleToggleStatus = async (program: Program) => {
    const newStatus = program.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/programs/${program.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setPrograms((prev) =>
          prev.map((p) => (p.id === program.id ? { ...p, status: newStatus } : p))
        );
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Quick edit modal save
  const handleSaveEdit = async () => {
    if (!editingProgram) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/programs/${editingProgram.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProgram),
      });

      if (res.ok) {
        setPrograms((prev) =>
          prev.map((p) => (p.id === editingProgram.id ? editingProgram : p))
        );
        setEditingProgram(null);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Delete program
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this training program?')) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPrograms((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E2D7C3] shadow-xs flex items-center justify-between">
        <span className="text-xs text-[#57534E]">
          Total Programs Managed: <strong className="text-[#192538]">{programs.length}</strong>
        </span>
        <button
          type="button"
          onClick={() => {
            const newProg: Program = {
              id: `prog-${Date.now()}`,
              slug: `custom-program-${Date.now()}`,
              title: 'New Specialized Training Track',
              category: 'Accounting Operations',
              shortDescription: 'Comprehensive practical training for commerce professionals.',
              detailedDescription: 'In-depth desk work simulation.',
              duration: '2 Months',
              mode: 'Offline Classroom',
              fees: 15000,
              discountedFees: 12000,
              eligibility: 'Class 12th Commerce or B.Com',
              softwareTools: ['Tally Prime 4.0', 'Excel 365'],
              facultyName: 'CA Alok Maheshwari',
              batchTiming: 'Morning / Evening Batches',
              availableSeats: 15,
              startDate: '1st of Every Month',
              certificateInfo: 'YLCC Verified Practical Certification',
              isFeatured: false,
              status: 'draft',
              displayOrder: programs.length + 1,
              modules: [],
              learningOutcomes: ['Maintain complete books of accounts'],
            };
            setEditingProgram(newProg);
          }}
          className="bg-[#8C6527] hover:bg-[#74511D] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Program</span>
        </button>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-2xl border border-[#E2D7C3] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F0] border-b border-[#E2D7C3] text-[#78716C] uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4">Program Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Duration & Mode</th>
                <th className="p-4">Fee Structure</th>
                <th className="p-4">Seats</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE8DD]">
              {programs.map((prog) => (
                <tr key={prog.id} className="hover:bg-[#FAF7F0]/60 transition-colors">
                  <td className="p-4 font-semibold text-[#192538] max-w-xs">
                    <span className="block truncate">{prog.title}</span>
                    <span className="text-[10px] text-[#78716C] font-normal block mt-0.5">
                      {prog.modules.length} Modules • {prog.softwareTools.join(', ')}
                    </span>
                  </td>

                  <td className="p-4 text-[#57534E]">
                    <span className="bg-[#FAF7F0] border border-[#E2D7C3] px-2 py-0.5 rounded text-[11px]">
                      {prog.category}
                    </span>
                  </td>

                  <td className="p-4 text-[#57534E]">
                    <span>{prog.duration}</span>
                    <span className="block text-[10px] text-[#78716C]">{prog.mode}</span>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-[#192538]">
                      ₹{prog.discountedFees ? prog.discountedFees.toLocaleString('en-IN') : prog.fees.toLocaleString('en-IN')}
                    </span>
                    {prog.discountedFees && (
                      <span className="block text-[10px] text-[#A89577] line-through">
                        ₹{prog.fees.toLocaleString('en-IN')}
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-semibold text-emerald-700">
                    {prog.availableSeats} Available
                  </td>

                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(prog)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        prog.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      }`}
                    >
                      {prog.status === 'published' ? '● Published' : '○ Draft'}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProgram(prog)}
                        className="p-1.5 rounded-lg text-[#8C6527] hover:bg-[#ECE4D4]"
                        title="Edit program details"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(prog.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="Delete program"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Program Modal */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-[#D4C5AD]">
            <div className="flex items-center justify-between border-b border-[#EFE8DD] pb-3">
              <h3 className="text-lg font-serif font-bold text-[#192538]">
                Edit Program: {editingProgram.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProgram(null)}
                className="p-1 text-[#78716C] hover:text-[#192538]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#44403C] mb-1">Program Title</label>
                <input
                  type="text"
                  value={editingProgram.title}
                  onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">Standard Fees (₹)</label>
                  <input
                    type="number"
                    value={editingProgram.fees}
                    onChange={(e) => setEditingProgram({ ...editingProgram, fees: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">Discounted Fees (₹)</label>
                  <input
                    type="number"
                    value={editingProgram.discountedFees || ''}
                    onChange={(e) =>
                      setEditingProgram({
                        ...editingProgram,
                        discountedFees: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingProgram.duration}
                    onChange={(e) => setEditingProgram({ ...editingProgram, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">Available Seats</label>
                  <input
                    type="number"
                    value={editingProgram.availableSeats}
                    onChange={(e) =>
                      setEditingProgram({ ...editingProgram, availableSeats: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#44403C] mb-1">Batch Schedule</label>
                <input
                  type="text"
                  value={editingProgram.batchTiming}
                  onChange={(e) => setEditingProgram({ ...editingProgram, batchTiming: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#44403C] mb-1">Short Description</label>
                <textarea
                  rows={3}
                  value={editingProgram.shortDescription}
                  onChange={(e) =>
                    setEditingProgram({ ...editingProgram, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EFE8DD]">
              <button
                type="button"
                onClick={() => setEditingProgram(null)}
                className="px-4 py-2 rounded-xl border border-[#D4C5AD] text-xs font-semibold text-[#192538]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
                className="bg-[#8C6527] hover:bg-[#74511D] text-white px-6 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
