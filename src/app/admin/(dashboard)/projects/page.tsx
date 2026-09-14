import React from 'react';
import { db } from '@/lib/db';
import AdminProjectsListClient from '@/components/admin/AdminProjectsListClient';

export const metadata = {
  title: 'Manage Practical Projects | YLCC Admin',
};

export default async function AdminProjectsPage() {
  const projects = await db.getProjects();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
          Case Studies Library
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#192538]">
          Practical Projects Management
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Manage, upload, edit, and publish the 16 multi-business commerce practice projects.
        </p>
      </div>

      <AdminProjectsListClient initialProjects={projects} />
    </div>
  );
}
