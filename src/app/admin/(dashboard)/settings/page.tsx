import React from 'react';
import { db } from '@/lib/db';
import AdminSettingsClient from '@/components/admin/AdminSettingsClient';

export const metadata = {
  title: 'Institute Settings & Statistics | YLCC Admin',
};

export default async function AdminSettingsPage() {
  const settings = await db.getSettings();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
          Configuration Center
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#192538]">
          Institute Settings & Statistics
        </h1>
        <p className="text-xs text-[#57534E] mt-0.5">
          Update full form, phone, WhatsApp, campus address, social links, and live homepage counter metrics.
        </p>
      </div>

      <AdminSettingsClient initialSettings={settings} />
    </div>
  );
}
