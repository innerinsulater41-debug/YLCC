import React from 'react';
import { db } from '@/lib/db';
import AdminEnquiriesListClient from '@/components/admin/AdminEnquiriesListClient';

export const metadata = {
  title: 'Manage Student Enquiries | YLCC Admin',
};

export default async function AdminEnquiriesPage() {
  const enquiries = await db.getEnquiries();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
          Admissions Pipeline
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#192538]">
          Student Course Enquiries
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Track leads, call students, deliver WhatsApp syllabi, and mark contact statuses.
        </p>
      </div>

      <AdminEnquiriesListClient initialEnquiries={enquiries} />
    </div>
  );
}
