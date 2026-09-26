'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Inbox,
  GraduationCap,
  Download,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { SessionUser } from '@/lib/auth';

interface AdminSidebarProps {
  user: SessionUser;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { name: 'Dashboard Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Industrial Training', href: '/admin/projects', icon: Briefcase },
    { name: 'Training Programs', href: '/admin/programs', icon: BookOpen },
    { name: 'Student Enquiries', href: '/admin/enquiries', icon: Inbox },
    { name: 'Admissions', href: '/admin/applications', icon: GraduationCap },
    { name: 'Resources & Downloads', href: '/admin/resources', icon: Download },
    { name: 'Faculty Mentors', href: '/admin/faculty', icon: Users },
    { name: 'Institute Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#2A1810] text-[#E5D8CA] flex flex-col justify-between border-r border-[#3D2314] min-h-screen shrink-0">
      <div className="p-5 space-y-6">
        {/* Emblem & Identity */}
        <div className="flex items-center gap-3 border-b border-[#3D2314] pb-4">
          <div className="w-9 h-9 rounded-lg bg-[#8B5A2B] text-white flex items-center justify-center font-serif font-bold text-lg">
            YL
          </div>
          <div>
            <span className="font-serif font-bold text-white text-base block leading-none">YLCC Admin</span>
            <span className="text-[10px] text-[#C4AE96] uppercase tracking-wider font-semibold">
              Control Suite
            </span>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-[#362013] p-3 rounded-xl border border-[#4E2F1D] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#8B5A2B] text-white flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-white block truncate">{user.name}</span>
            <span className="text-[10px] text-[#E8DCCF] font-mono uppercase bg-[#2A1810] px-1.5 py-0.2 rounded border border-[#4E2F1D]">
              {user.role}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#8B5A2B] text-white shadow-xs'
                    : 'text-[#D8C5B2] hover:bg-[#362013] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-5 border-t border-[#3D2314] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-[#C4AE96] hover:text-white hover:bg-[#362013] transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
