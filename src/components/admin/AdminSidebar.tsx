"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Briefcase,
  Mail,
  FileCheck2,
  Users2,
  Award,
  Image as ImageIcon,
  Calendar,
  Star,
  HelpCircle,
  TrendingUp,
  Settings,
  Shield,
  ExternalLink,
} from "lucide-react";
import { AdminUser } from "@/types";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  currentUser: AdminUser | null;
}

export default function AdminSidebar({ currentUser }: AdminSidebarProps) {
  const pathname = usePathname();

  // If on login page, hide the sidebar
  if (pathname === "/admin/login") return null;

  const menuItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: Code2, badge: "Core" },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Business Clients", href: "/admin/consultations", icon: Briefcase, badge: "New" },
    { label: "Enquiries", href: "/admin/enquiries", icon: Mail },
    { label: "Applications", href: "/admin/applications", icon: FileCheck2 },
    { label: "Faculty", href: "/admin/faculty", icon: Users2 },
    { label: "Achievements", href: "/admin/achievements", icon: Award },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Events", href: "/admin/events", icon: Calendar },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star },
    { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Statistics", href: "/admin/stats", icon: TrendingUp },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-stone-200 shrink-0 flex flex-col justify-between">
      <div>
        {/* Brand */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-amber-400 font-bold shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-stone-900 tracking-tight text-lg">
                YLCC Admin
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-800">
                Institutional CMS
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all",
                  isActive
                    ? "bg-stone-900 text-amber-50 shadow-xs"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/70"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", isActive ? "text-amber-400" : "text-stone-400")} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0.2 rounded-md",
                      isActive
                        ? "bg-stone-800 text-amber-400"
                        : "bg-stone-100 text-stone-600"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Public Link Shortcut */}
      <div className="p-4 border-t border-stone-100">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors border border-stone-200"
        >
          <span>View Live Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
        </Link>
      </div>
    </aside>
  );
}
