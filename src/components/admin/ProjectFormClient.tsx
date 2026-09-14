'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  Upload,
  FileText,
  FileSpreadsheet,
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  X,
  FileArchive,
  Image as ImageIcon,
} from 'lucide-react';
import { Project, ProjectResource, ProjectMedia } from '@/types';

interface ProjectFormClientProps {
  initialProject?: Project;
  isEditing?: boolean;
}

export default function ProjectFormClient({ initialProject, isEditing = false }: ProjectFormClientProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Project>>(
    initialProject || {
      title: '',
      slug: '',
      shortDescription: '',
      detailedDescription: '',
      industryCategory: 'Manufacturing & Industrial',
      accountingCategory: 'Cost & Management Accounting',
      difficultyLevel: 'Intermediate',
      skillsCovered: ['Voucher Feeding', 'GST Compliance', 'Ledger Reconciliation'],
      softwareUsed: ['Tally Prime 4.0', 'Microsoft Excel 365'],
      learningObjectives: ['Understand real transaction cycles', 'Maintain books per statutory requirements'],
      businessScenario: '',
      tasksToComplete: ['Record sales and purchase entries', 'Perform bank reconciliation', 'Compute taxes'],
      expectedOutcomes: ['Reconciled trial balance', 'Filed return summaries'],
      coverImageUrl: '/images/ylcc_tds_brochure_slate_copper.png',
      media: [],
      resources: [],
      videoUrl: '',
      practiceTimeHours: 20,
      academicYear: '2025-26',
      facultyMentor: 'CA Alok Maheshwari',
      isFeatured: false,
      status: 'published',
      displayOrder: 1,
    }
  );

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper to add skill tag
  const [newSkill, setNewSkill] = useState('');
  const addSkill = () => {
    if (newSkill.trim() && formData.skillsCovered) {
      setFormData({
        ...formData,
        skillsCovered: [...formData.skillsCovered, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    if (formData.skillsCovered) {
      setFormData({
        ...formData,
        skillsCovered: formData.skillsCovered.filter((_, i) => i !== index),
      });
    }
  };

  // Helper to add task
  const [newTask, setNewTask] = useState('');
  const addTask = () => {
    if (newTask.trim() && formData.tasksToComplete) {
      setFormData({
        ...formData,
        tasksToComplete: [...formData.tasksToComplete, newTask.trim()],
      });
      setNewTask('');
    }
  };

  const removeTask = (index: number) => {
    if (formData.tasksToComplete) {
      setFormData({
        ...formData,
        tasksToComplete: formData.tasksToComplete.filter((_, i) => i !== index),
      });
    }
  };

  // Multi-File Upload Handler (Drag & Drop or Input)
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    setUploadProgress(10);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append('file', file);

      try {
        setUploadProgress(30 + Math.floor((i / files.length) * 50));
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || `Failed to upload ${file.name}`);
        }

        const ext = json.type.toLowerCase();

        // Check if image or document
        if (['png', 'jpg', 'jpeg', 'webp'].includes(ext)) {
          const newMedia: ProjectMedia = {
            id: `med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            url: json.url,
            name: json.name,
            type: ext,
            size: json.size,
            caption: json.name,
          };
          setFormData((prev) => ({
            ...prev,
            media: [...(prev.media || []), newMedia],
            coverImageUrl: prev.coverImageUrl || json.url,
          }));
        } else {
          // Document / Resource (PDF, XLSX, DOCX, PPTX, ZIP)
          let fileType: ProjectResource['fileType'] = 'pdf';
          if (ext.includes('xls')) fileType = 'xlsx';
          else if (ext.includes('doc')) fileType = 'docx';
          else if (ext.includes('ppt')) fileType = 'pptx';
          else if (ext.includes('zip')) fileType = 'zip';

          const newRes: ProjectResource = {
            id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            title: json.name,
            url: json.url,
            fileType,
            fileSize: json.size,
            isDownloadable: true,
          };

          setFormData((prev) => ({
            ...prev,
            resources: [...(prev.resources || []), newRes],
          }));
        }
      } catch (err: any) {
        setError(err.message || 'Error during file upload');
      }
    }

    setUploadProgress(100);
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 500);
  };

  const removeResource = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      resources: (prev.resources || []).filter((r) => r.id !== id),
    }));
  };

  const removeMedia = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      media: (prev.media || []).filter((m) => m.id !== id),
    }));
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const url = isEditing && initialProject ? `/api/projects/${initialProject.id}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to save project');
      }

      setSuccess('Project saved successfully!');
      setTimeout(() => {
        router.push('/admin/projects');
        router.refresh();
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#E2D7C3] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-lg bg-white border border-[#D4C5AD] text-[#192538] hover:bg-[#FAF7F0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
              Case Study Editor
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#192538]">
              {isEditing ? `Edit: ${formData.title}` : 'Create & Upload Practical Project'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                status: prev.status === 'published' ? 'draft' : 'published',
              }))
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              formData.status === 'published'
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-amber-100 border-amber-300 text-amber-800'
            }`}
          >
            Status: {formData.status === 'published' ? '● Published' : '○ Draft (Hidden)'}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#8C6527] hover:bg-[#74511D] text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Project</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* 1. Basic Metadata */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-6">
        <h2 className="text-base font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
          1. Project Details & Classification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Project Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Hospital Business Accounting & Patient Billing System"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Unique URL Slug</label>
            <input
              type="text"
              placeholder="leave blank to auto-generate from title"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Industry Category *</label>
            <input
              type="text"
              required
              placeholder="e.g. Healthcare, Hotels, Logistics, Builders"
              value={formData.industryCategory}
              onChange={(e) => setFormData({ ...formData, industryCategory: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Accounting Discipline</label>
            <input
              type="text"
              placeholder="e.g. Statutory Taxation, Cost Accounting"
              value={formData.accountingCategory}
              onChange={(e) => setFormData({ ...formData, accountingCategory: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Difficulty Level</label>
            <select
              value={formData.difficultyLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficultyLevel: e.target.value as any,
                })
              }
              className="w-full px-3 py-2 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
            >
              <option value="Foundational">Foundational</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Short Description (Summary Card) *</label>
          <textarea
            rows={2}
            required
            placeholder="Brief 2-line summary for project cards"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Real Business Scenario Narrative *</label>
          <textarea
            rows={3}
            required
            placeholder="Describe the company scenario, operations, turnover, and accounting challenges"
            value={formData.businessScenario}
            onChange={(e) => setFormData({ ...formData, businessScenario: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF7F0] border border-[#D4C5AD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C6527] text-[#192538]"
          />
        </div>
      </div>

      {/* 2. File & Document Upload System (Drag & Drop + Multi-Format) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#8C6527] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#EFE8DD] pb-3">
          <div>
            <h2 className="text-base font-serif font-bold text-[#192538]">
              2. Upload Project Documents, PDFs & Spreadsheets
            </h2>
            <p className="text-xs text-[#78716C]">
              Upload PDF reports, Excel models (.xlsx), Word docs (.docx), presentations (.pptx), or ZIP packs
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#8C6527] uppercase bg-[#FAF7F0] px-2.5 py-1 rounded border border-[#E2D7C3]">
            Max 50MB per file
          </span>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-[#D4C5AD] hover:border-[#8C6527] bg-[#FAF7F0] p-8 rounded-2xl text-center space-y-3 transition-colors cursor-pointer"
        >
          <Upload className="w-10 h-10 text-[#8C6527] mx-auto" />
          <div className="text-xs text-[#57534E]">
            <label className="font-bold text-[#8C6527] hover:underline cursor-pointer">
              <span>Choose files to upload</span>
              <input
                type="file"
                multiple
                accept=".pdf,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.zip,.png,.jpg,.jpeg,.webp"
                onChange={(e) => handleFileUpload(e.target.files)}
                disabled={uploading}
                className="hidden"
              />
            </label>{' '}
            <span>or drag and drop here</span>
          </div>
          <p className="text-[11px] text-[#A89577]">
            Supported formats: PDF, Excel, Word, PowerPoint, ZIP, PNG, JPG
          </p>

          {uploading && (
            <div className="max-w-xs mx-auto space-y-2 pt-2">
              <div className="w-full bg-[#E2D7C3] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#8C6527] h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-[#8C6527] flex items-center justify-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Uploading files ({uploadProgress}%)...</span>
              </span>
            </div>
          )}
        </div>

        {/* Attached Documents List */}
        {formData.resources && formData.resources.length > 0 && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#192538] block">
              Attached Project Resources ({formData.resources.length}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {formData.resources.map((res) => (
                <div
                  key={res.id}
                  className="p-3 bg-[#FAF7F0] border border-[#E2D7C3] rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {res.fileType === 'xlsx' ? (
                      <FileSpreadsheet className="w-4 h-4 text-emerald-700 shrink-0" />
                    ) : res.fileType === 'zip' ? (
                      <FileArchive className="w-4 h-4 text-amber-700 shrink-0" />
                    ) : (
                      <FileText className="w-4 h-4 text-red-700 shrink-0" />
                    )}
                    <div className="overflow-hidden">
                      <p className="font-bold text-[#192538] truncate">{res.title}</p>
                      <p className="text-[10px] text-[#78716C]">
                        {res.fileType.toUpperCase()} • {res.fileSize}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeResource(res.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors shrink-0"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Images / Media */}
        {formData.media && formData.media.length > 0 && (
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#192538] block">
              Project Media & Screenshots ({formData.media.length}):
            </span>
            <div className="flex flex-wrap gap-3">
              {formData.media.map((med) => (
                <div
                  key={med.id}
                  className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#D4C5AD] group"
                >
                  <img src={med.url} alt={med.name} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeMedia(med.id)}
                    className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Skills, Tasks & Deliverables */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-6">
        <h2 className="text-base font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
          3. Skills & Execution Tasks
        </h2>

        {/* Skills Covered Tags */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-[#44403C]">Skills Covered (Tags)</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {formData.skillsCovered?.map((sk, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] border border-[#E2D7C3] text-xs text-[#192538] flex items-center gap-1.5"
              >
                <span>{sk}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. TDS Section 194J"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#FAF7F0] border border-[#D4C5AD] rounded-lg text-[#192538] w-64"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-3 py-1.5 rounded-lg bg-[#ECE4D4] hover:bg-[#E2D7C3] text-xs font-bold text-[#192538]"
            >
              Add Skill
            </button>
          </div>
        </div>

        {/* Tasks to Complete */}
        <div className="space-y-2 pt-2 border-t border-[#EFE8DD]">
          <label className="block text-xs font-semibold text-[#44403C]">Student Tasks to Execute</label>
          <div className="space-y-1.5 mb-2">
            {formData.tasksToComplete?.map((t, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-[#FAF7F0] border border-[#E2D7C3] flex items-center justify-between text-xs text-[#57534E]"
              >
                <span>{idx + 1}. {t}</span>
                <button
                  type="button"
                  onClick={() => removeTask(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Reconcile Fastag toll charges with transport bilties"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#FAF7F0] border border-[#D4C5AD] rounded-lg text-[#192538] flex-1"
            />
            <button
              type="button"
              onClick={addTask}
              className="px-3 py-1.5 rounded-lg bg-[#ECE4D4] hover:bg-[#E2D7C3] text-xs font-bold text-[#192538]"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3 pt-2">
        <Link
          href="/admin/projects"
          className="px-6 py-2.5 rounded-xl border border-[#D4C5AD] bg-white hover:bg-[#FAF7F0] text-xs font-semibold text-[#192538] transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#8C6527] hover:bg-[#74511D] text-white px-8 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save & Publish Project</span>
        </button>
      </div>
    </form>
  );
}
