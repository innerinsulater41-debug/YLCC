'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
} from 'lucide-react';
import { Project } from '@/types';

interface AdminProjectsListClientProps {
  initialProjects: Project[];
}

export default function AdminProjectsListClient({ initialProjects }: AdminProjectsListClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Toggle status
  const handleToggleStatus = async (project: Project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
        );
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  // Delete project
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this practical project? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      }
    } catch (err) {
      console.error('Failed to delete project', err);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.industryCategory.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E5D8CA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title or industry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-xs bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
          >
            <option value="all">All Statuses ({projects.length})</option>
            <option value="published">Published ({projects.filter((p) => p.status === 'published').length})</option>
            <option value="draft">Drafts ({projects.filter((p) => p.status === 'draft').length})</option>
          </select>

          <Link
            href="/admin/projects/new"
            className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-[#E5D8CA] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF6F0] border-b border-[#E5D8CA] text-[#78716C] uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4">Project Title</th>
                <th className="p-4">Industry / Track</th>
                <th className="p-4">Level</th>
                <th className="p-4">Resources</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6DD]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#78716C]">
                    No practical projects found matching your query.
                  </td>
                </tr>
              ) : (
                filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-[#FAF6F0]/60 transition-colors">
                    <td className="p-4 font-semibold text-[#2A1810] max-w-xs truncate">
                      <Link
                        href={`/admin/projects/${proj.id}/edit`}
                        className="hover:text-[#8B5A2B] transition-colors"
                      >
                        {proj.title}
                      </Link>
                      <span className="block text-[10px] text-[#78716C] font-normal mt-0.5">
                        {proj.practiceTimeHours} Hours • {proj.accountingCategory}
                      </span>
                    </td>

                    <td className="p-4 text-[#57534E]">
                      <span className="bg-[#FAF6F0] border border-[#E5D8CA] px-2 py-0.5 rounded text-[11px]">
                        {proj.industryCategory}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-[#2A1810]">{proj.difficultyLevel}</span>
                    </td>

                    <td className="p-4 text-[#78716C]">
                      {proj.resources?.length || 0} Files ({proj.media?.length || 0} Media)
                    </td>

                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(proj)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          proj.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {proj.status === 'published' ? '● Published' : '○ Draft'}
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-[#78716C] hover:text-[#2A1810] hover:bg-[#FAF6F0]"
                          title="Preview public case study"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/admin/projects/${proj.id}/edit`}
                          className="p-1.5 rounded-lg text-[#8B5A2B] hover:bg-[#EFE6DD]"
                          title="Edit project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(proj.id)}
                          disabled={deletingId === proj.id}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 disabled:opacity-50"
                          title="Delete project"
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
    </div>
  );
}
