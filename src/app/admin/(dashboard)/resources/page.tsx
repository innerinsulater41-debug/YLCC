import React from 'react';
import { db } from '@/lib/db';
import AdminResourcesListClient from '@/components/admin/AdminResourcesListClient';

export const metadata = {
  title: 'Manage Resources & Downloads | YLCC Admin',
};

export default async function AdminResourcesPage() {
  const resources = await db.getResources('admin');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
          Document Repository
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#2A1810]">
          Downloadable Resources & Practice Files
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Upload course brochures, sample accounting formats, GST compliance guides, and practice worksheets.
        </p>
      </div>

      <AdminResourcesListClient initialResources={resources} />
    </div>
  );
}
