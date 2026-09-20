'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface QuickEnquiryFormProps {
  programsList?: { title: string; slug: string }[];
}

export default function QuickEnquiryForm({ programsList }: QuickEnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programOfInterest: 'Accounts Operator Practical Training',
    preferredBatch: 'Morning Batch (8:30 AM – 10:30 AM)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit enquiry');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        programOfInterest: 'Accounts Operator Practical Training',
        preferredBatch: 'Morning Batch (8:30 AM – 10:30 AM)',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#FAF6F0] border-2 border-[#8B5A2B] p-8 rounded-xl text-center space-y-4 shadow-sm animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h4 className="text-xl font-serif font-bold text-[#2A1810]">Enquiry Received Successfully!</h4>
        <p className="text-sm text-[#57534E] max-w-md mx-auto">
          Thank you for reaching out to YLCC. Our academic counseling coordinator will call or WhatsApp you within 2 business hours with course details and batch dates.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-semibold text-[#8B5A2B] hover:underline pt-2"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5D8CA] shadow-lg space-y-4">
      <div className="border-b border-[#EFE6DD] pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">Fast-Track Admission Desk</span>
        <h3 className="text-xl font-serif font-bold text-[#2A1810]">Request Course Syllabus & Fee Details</h3>
        <p className="text-xs text-[#6B584C] mt-1">Speak directly with an accounting faculty mentor.</p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Full Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Gaurav Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent text-[#2A1810]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Phone / WhatsApp *</label>
          <input
            type="tel"
            required
            placeholder="e.g. +91 98290 12345"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent text-[#2A1810]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#44403C] mb-1">Email Address *</label>
        <input
          type="email"
          required
          placeholder="e.g. gaurav@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent text-[#2A1810]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Program of Interest</label>
          <select
            value={formData.programOfInterest}
            onChange={(e) => setFormData({ ...formData, programOfInterest: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent text-[#2A1810]"
          >
            <option value="Accounts Operator Practical Training">Accounts Operator Practical Training</option>
            <option value="Accounts Manager Professional Program">Accounts Manager Professional Program</option>
            <option value="Banking Operations & CC Limits">Banking Operations & CC Limits</option>
            <option value="GST Practitioner Masterclass">GST Practitioner Masterclass</option>
            <option value="TDS & TCS Practitioner Course">TDS & TCS Practitioner Course</option>
            <option value="Corporate Payroll Management">Corporate Payroll Management</option>
            <option value="Cost Accounting & Industrial Inventory">Cost Accounting & Industrial Inventory</option>
            <option value="Advanced Excel & Corporate Excel 365">Advanced Excel & Corporate Excel 365</option>
            <option value="30 Multi-Business Practical Projects Module">30 Multi-Business Practical Projects</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#44403C] mb-1">Preferred Batch Timing</label>
          <select
            value={formData.preferredBatch}
            onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent text-[#2A1810]"
          >
            <option value="Morning Batch (8:30 AM – 10:30 AM)">Morning Batch (8:30 AM – 10:30 AM)</option>
            <option value="Mid-Day Batch (11:00 AM – 1:00 PM)">Mid-Day Batch (11:00 AM – 1:00 PM)</option>
            <option value="Evening Batch (5:00 PM – 7:00 PM)">Evening Batch (5:00 PM – 7:00 PM)</option>
            <option value="Late Evening (6:30 PM – 8:30 PM)">Late Evening (6:30 PM – 8:30 PM)</option>
            <option value="Weekend Executive Batch (Sat/Sun)">Weekend Executive Cohort (Sat/Sun)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#44403C] mb-1">Your Educational Background or Query</label>
        <textarea
          rows={2}
          placeholder="e.g. B.Com final year, looking for practical GST and live sales/purchase billing training."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-[#FAF6F0] border border-[#D8C5B2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] focus:border-transparent text-[#2A1810]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8B5A2B] hover:bg-[#70441E] text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow hover:shadow-md transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Enquiry & Get Syllabus</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-center text-[#78716C]">
        🔒 Your details are completely confidential. No spam or unsolicited marketing calls.
      </p>
    </form>
  );
}
