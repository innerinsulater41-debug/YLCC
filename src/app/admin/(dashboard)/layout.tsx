import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminSession();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen flex bg-[#FAF7F0]">
      {/* Sidebar */}
      <AdminSidebar user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-[#E2D7C3] px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h1 className="text-sm font-bold text-[#192538]">YLCC Administration Suite</h1>
            <p className="text-[11px] text-[#78716C]">Commerce & Practical Accounting Management</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#57534E] font-medium">Database Synchronized</span>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
