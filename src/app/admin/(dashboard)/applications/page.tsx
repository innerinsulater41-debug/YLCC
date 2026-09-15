import React from 'react';
import { db } from '@/lib/db';
import AdminApplicationsListClient from '@/components/admin/AdminApplicationsListClient';

export const metadata = {
  title: 'Manage Admission Applications | YLCC Admin',
};

export default async function AdminApplicationsPage() {
  const applications = await db.getApplications();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
          Admissions Desk
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#2A1810]">
          Student Admission Applications
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Review candidate qualifications, commerce backgrounds, attached documents, and assign batch statuses.
        </p>
      </div>

      <AdminApplicationsListClient initialApplications={applications} />
    </div>
  );
}
