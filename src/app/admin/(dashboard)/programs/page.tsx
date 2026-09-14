import React from 'react';
import { db } from '@/lib/db';
import AdminProgramsListClient from '@/components/admin/AdminProgramsListClient';

export const metadata = {
  title: 'Manage Training Programs | YLCC Admin',
};

export default async function AdminProgramsPage() {
  const programs = await db.getPrograms();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
          Curriculum Management
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#192538]">
          Training Programs & Syllabi
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Edit fee structures, batch schedules, seat quotas, and draft/published statuses for all 8 programs.
        </p>
      </div>

      <AdminProgramsListClient initialPrograms={programs} />
    </div>
  );
}
