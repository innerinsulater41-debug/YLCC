'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileText,
  Loader2,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { Program } from '@/types';

interface AdmissionFormClientProps {
  programs: Program[];
}

export default function AdmissionFormClient({ programs }: AdmissionFormClientProps) {
  const searchParams = useSearchParams();
  const preselectedProgram = searchParams.get('program') || '';

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    qualification: 'B.Com (Commerce Graduate)',
    commerceBackground: true,
    selectedProgram: preselectedProgram || (programs[0]?.slug ?? 'accounts-operator'),
    preferredMode: 'Offline Classroom' as 'Offline Classroom' | 'Online Live' | 'Hybrid',
    preferredBatch: 'Morning Batch (8:30 AM – 10:30 AM)',
    currentOccupation: 'Student / Seeking Job',
    careerGoal: 'To master real-world accounting, GST, and Excel to secure an Accounts Manager or Executive role.',
    documentUrls: [] as string[],
    consent: true,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<any | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preselectedProgram) {
      setFormData((prev) => ({ ...prev, selectedProgram: preselectedProgram }));
    }
  }, [preselectedProgram]);

  // Handle Document Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      const file = files[0];
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'File upload failed');
      }

      setUploadedFiles((prev) => [...prev, { name: json.name, url: json.url }]);
      setFormData((prev) => ({
        ...prev,
        documentUrls: [...prev.documentUrls, json.url],
      }));
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to submit application');
      }

      setSubmitted(json.data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your form details.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-[#8B5A2B] p-8 sm:p-12 text-center space-y-5 shadow-xl max-w-2xl mx-auto animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
          Application Received
        </span>
        <h2 className="text-2xl font-serif font-bold text-[#2A1810]">
          Congratulations, {submitted.studentName}!
        </h2>
        <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#E5D8CA] inline-block text-xs text-[#57534E]">
          <span>Your Application Tracking ID: </span>
          <strong className="text-[#2A1810] font-mono text-sm ml-1">{submitted.id}</strong>
        </div>
        <p className="text-sm text-[#57534E] leading-relaxed">
          Your admission dossier has been submitted to the academic admissions committee. Our admissions coordinator will review your educational background and contact you on <strong>{submitted.phone}</strong> within 4 business hours to finalize your batch seat and schedule.
        </p>
        <div className="pt-4 border-t border-[#EFE6DD] flex items-center justify-center gap-4">
          <a
            href="/"
            className="bg-[#8B5A2B] hover:bg-[#70441E] text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5D8CA] shadow-lg space-y-8 max-w-4xl mx-auto">
      <div className="border-b border-[#EFE6DD] pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
          Official Enrollment
        </span>
        <h2 className="text-2xl font-serif font-bold text-[#2A1810]">
          Admission Application Form
        </h2>
        <p className="text-xs text-[#6B584C] mt-1">
          Please fill your authentic details. Batches are limited to 20 seats to preserve 1-on-1 practical ledger guidance.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Personal & Contact Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A1810] border-b border-[#EFE6DD] pb-2">
          1. Student Personal & Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Full Name (As on Marksheet) *</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="e.g. rahul.sharma@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Phone / WhatsApp Number *</label>
            <input
              type="tel"
              required
              placeholder="e.g. +91 98290 12345"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Date of Birth *</label>
            <input
              type="date"
              required
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Full Residential Address *</label>
          <input
            type="text"
            required
            placeholder="e.g. 42, Civil Lines, Jaipur, Rajasthan 302006"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
          />
        </div>
      </div>

      {/* 2. Educational & Commerce Background */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A1810] border-b border-[#EFE6DD] pb-2">
          2. Educational Qualification & Commerce Background
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Highest Educational Qualification *</label>
            <select
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            >
              <option value="Class 12th Commerce">Class 12th Commerce</option>
              <option value="B.Com (Commerce Graduate)">B.Com (Commerce Graduate)</option>
              <option value="B.Com (Pursuing / Final Year)">B.Com (Pursuing / Final Year)</option>
              <option value="M.Com / MBA Finance">M.Com / MBA Finance</option>
              <option value="BBA / BMS">BBA / BMS</option>
              <option value="CA / CS / CMA Intermediate">CA / CS / CMA Intermediate</option>
              <option value="Working Professional (Non-Commerce Background)">Non-Commerce Background (Seeking Accounting Career)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Current Occupation</label>
            <input
              type="text"
              placeholder="e.g. Student, Junior Billing Clerk, Job Seeker"
              value={formData.currentOccupation}
              onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E5D8CA] flex items-center justify-between">
          <span className="text-xs text-[#2A1810] font-semibold">
            Do you have prior familiarity with basic debits and credits?
          </span>
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="commerceBackground"
                checked={formData.commerceBackground === true}
                onChange={() => setFormData({ ...formData, commerceBackground: true })}
                className="text-[#8B5A2B] focus:ring-[#8B5A2B]"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="commerceBackground"
                checked={formData.commerceBackground === false}
                onChange={() => setFormData({ ...formData, commerceBackground: false })}
                className="text-[#8B5A2B] focus:ring-[#8B5A2B]"
              />
              <span>No / Beginner</span>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Program & Batch Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A1810] border-b border-[#EFE6DD] pb-2">
          3. Program & Batch Timing Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Desired Program *</label>
            <select
              value={formData.selectedProgram}
              onChange={(e) => setFormData({ ...formData, selectedProgram: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            >
              {programs.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Learning Mode *</label>
            <select
              value={formData.preferredMode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferredMode: e.target.value as 'Offline Classroom',
                })
              }
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            >
              <option value="Offline Classroom">Offline Classroom (In-Person Jaipur Accounting Lab)</option>
            </select>
            <p className="text-[10px] text-[#8B5A2B] mt-1 font-medium">
              All batches are conducted 100% offline in our practical accounting lab.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">Preferred Batch Timing *</label>
            <select
              value={formData.preferredBatch}
              onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
            >
              <option value="Morning Batch (8:30 AM – 10:30 AM)">Morning: 8:30 AM – 10:30 AM</option>
              <option value="Mid-Day Batch (10:30 AM – 12:30 PM)">Mid-Day: 10:30 AM – 12:30 PM</option>
              <option value="Evening Batch (5:00 PM – 7:00 PM)">Evening: 5:00 PM – 7:00 PM</option>
              <option value="Late Evening (6:30 PM – 8:30 PM)">Late Evening: 6:30 PM – 8:30 PM</option>
              <option value="Weekend Executive (Saturday & Sunday)">Weekend Executive (Sat & Sun)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Primary Career Goal / Expectation</label>
          <textarea
            rows={2}
            value={formData.careerGoal}
            onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2A1810]"
          />
        </div>
      </div>

      {/* 4. Supporting Document Upload (Optional) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#2A1810] border-b border-[#EFE6DD] pb-2">
          4. Supporting Document (Marksheet or Resume - Optional)
        </h3>

        <div className="p-5 rounded-xl border-2 border-dashed border-[#D8C5B2] bg-[#FAF6F0] text-center space-y-3">
          <Upload className="w-8 h-8 text-[#8B5A2B] mx-auto" />
          <div className="text-xs text-[#57534E]">
            <label className="font-bold text-[#8B5A2B] hover:underline cursor-pointer">
              <span>Click to browse and upload</span>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.docx"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>{' '}
            <span>supporting document (PDF or Image, max 10MB)</span>
          </div>

          {uploading && (
            <div className="flex items-center justify-center gap-2 text-xs text-[#8B5A2B]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading document securely...</span>
            </div>
          )}

          {uploadedFiles.length > 0 && (
            <div className="pt-2 space-y-1 text-left max-w-sm mx-auto">
              <span className="text-[11px] font-bold text-emerald-800">Attached Documents:</span>
              {uploadedFiles.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#2A1810] bg-white p-2 rounded border border-[#E5D8CA]">
                  <FileText className="w-4 h-4 text-[#8B5A2B]" />
                  <span className="truncate">{f.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Consent & Submit */}
      <div className="space-y-4 pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#57534E]">
          <input
            type="checkbox"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-0.5 text-[#8B5A2B] focus:ring-[#8B5A2B] rounded"
          />
          <span>
            I certify that the information provided is accurate and true. I understand that YLCC provides practical commerce and accounting skills training and that final batch seat allocation is subject to faculty counseling.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#8B5A2B] hover:bg-[#70441E] text-white py-3.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <>
              <GraduationCap className="w-4 h-4" />
              <span>Submit Admission Application</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
