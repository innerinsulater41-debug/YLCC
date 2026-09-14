'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Download,
  Plus,
  Trash2,
  FileText,
  FileSpreadsheet,
  Upload,
  Loader2,
  X,
} from 'lucide-react';
import { ResourceItem } from '@/types';

interface AdminResourcesListClientProps {
  initialResources: ResourceItem[];
}

export default function AdminResourcesListClient({
  initialResources,
}: AdminResourcesListClientProps) {
  const router = useRouter();
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newRes, setNewRes] = useState({
    title: '',
    category: 'Course Brochures' as ResourceItem['category'],
    description: '',
    fileUrl: '',
    fileType: 'pdf',
    fileSize: '100 KB',
    accessLevel: 'public' as ResourceItem['accessLevel'],
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', files[0]);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (json.success) {
        setNewRes((prev) => ({
          ...prev,
          title: prev.title || json.name,
          fileUrl: json.url,
          fileType: json.type,
          fileSize: json.size,
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRes),
      });

      const json = await res.json();
      if (json.success) {
        setResources((prev) => [json.data, ...prev]);
        setShowAddModal(false);
        setNewRes({
          title: '',
          category: 'Course Brochures',
          description: '',
          fileUrl: '',
          fileType: 'pdf',
          fileSize: '100 KB',
          accessLevel: 'public',
        });
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this resource?')) return;
    try {
      await fetch(`/api/resources/${id}`, { method: 'DELETE' });
      setResources((prev) => prev.filter((r) => r.id !== id));
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-[#8C6527] hover:bg-[#74511D] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Resource File</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2D7C3] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F0] border-b border-[#E2D7C3] text-[#78716C] uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4">Title & Description</th>
                <th className="p-4">Category</th>
                <th className="p-4">Format / Size</th>
                <th className="p-4">Access Tier</th>
                <th className="p-4">Downloads</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE8DD]">
              {resources.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF7F0]/60 transition-colors">
                  <td className="p-4 font-semibold text-[#192538] max-w-xs">
                    <span className="block truncate">{item.title}</span>
                    <span className="text-[10px] text-[#78716C] font-normal block truncate mt-0.5">
                      {item.description}
                    </span>
                  </td>

                  <td className="p-4 text-[#57534E]">
                    <span className="bg-[#FAF7F0] border border-[#E2D7C3] px-2 py-0.5 rounded text-[11px]">
                      {item.category}
                    </span>
                  </td>

                  <td className="p-4 text-[#57534E]">
                    <span>{item.fileType.toUpperCase()}</span>
                    <span className="block text-[10px] text-[#78716C]">{item.fileSize}</span>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      {item.accessLevel}
                    </span>
                  </td>

                  <td className="p-4 font-semibold text-[#192538]">
                    {item.downloadCount}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={item.fileUrl}
                        download
                        className="p-1.5 rounded-lg text-[#8C6527] hover:bg-[#ECE4D4]"
                        title="Download file"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="Delete resource"
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

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveResource}
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-[#D4C5AD]"
          >
            <div className="flex items-center justify-between border-b border-[#EFE8DD] pb-3">
              <h3 className="text-base font-serif font-bold text-[#192538]">
                Upload Resource File
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#78716C] hover:text-[#192538]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#44403C] mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank Stock Statement & Drawing Power Format"
                  value={newRes.title}
                  onChange={(e) => setNewRes({ ...newRes, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">Category</label>
                  <select
                    value={newRes.category}
                    onChange={(e) => setNewRes({ ...newRes, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                  >
                    <option value="Course Brochures">Course Brochures</option>
                    <option value="Sample Accounting Formats">Sample Accounting Formats</option>
                    <option value="Practice Worksheets">Practice Worksheets</option>
                    <option value="GST Compliance">GST Compliance</option>
                    <option value="TDS/TCS Resources">TDS/TCS Resources</option>
                    <option value="Payroll Templates">Payroll Templates</option>
                    <option value="Excel Practice Files">Excel Practice Files</option>
                    <option value="MIS Reports">MIS Reports</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#44403C] mb-1">Access Level</label>
                  <select
                    value={newRes.accessLevel}
                    onChange={(e) => setNewRes({ ...newRes, accessLevel: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                  >
                    <option value="public">Public (Everyone)</option>
                    <option value="student">Student Only</option>
                    <option value="admin">Admin Internal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#44403C] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newRes.description}
                  onChange={(e) => setNewRes({ ...newRes, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl text-[#192538]"
                />
              </div>

              {/* File Uploader */}
              <div className="border-2 border-dashed border-[#D4C5AD] p-4 rounded-xl text-center space-y-2 bg-[#FAF7F0]">
                <Upload className="w-6 h-6 text-[#8C6527] mx-auto" />
                <label className="text-xs font-bold text-[#8C6527] hover:underline cursor-pointer block">
                  <span>Browse PDF, Excel, Word, or ZIP file</span>
                  <input
                    type="file"
                    required={!newRes.fileUrl}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {uploading && <p className="text-[11px] text-[#8C6527]">Uploading...</p>}
                {newRes.fileUrl && (
                  <p className="text-[11px] text-emerald-700 font-bold">
                    ✓ File uploaded: {newRes.fileType.toUpperCase()} ({newRes.fileSize})
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EFE8DD]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-[#D4C5AD] text-xs font-semibold text-[#192538]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newRes.fileUrl}
                className="bg-[#8C6527] hover:bg-[#74511D] text-white px-6 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
              >
                Save Resource
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
