"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Shield, Bell, Eye } from "lucide-react";
import { AdminUser } from "@/types";

interface AdminHeaderProps {
  currentUser: AdminUser | null;
}

export default function AdminHeader({ currentUser }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <header className="bg-white border-b border-stone-200 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          Management Section:
        </span>
        <span className="text-sm font-bold text-stone-900 capitalize">
          {pathname.replace("/admin", "").replace("/", "") || "Overview Dashboard"}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors"
        >
          <Eye className="w-3.5 h-3.5 text-stone-500" />
          <span>Live Site</span>
        </Link>

        {currentUser && (
          <div className="flex items-center gap-2.5 pl-2 border-l border-stone-200">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
              {currentUser.name ? currentUser.name[0] : "A"}
            </div>
            <div className="hidden md:block text-left text-xs">
              <div className="font-bold text-stone-900">{currentUser.name}</div>
              <div className="text-[10px] text-amber-800 font-semibold uppercase">
                {currentUser.role.replace("_", " ")}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-rose-50 text-xs font-semibold text-stone-600 hover:text-rose-700 transition-colors cursor-pointer"
          title="Sign Out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
