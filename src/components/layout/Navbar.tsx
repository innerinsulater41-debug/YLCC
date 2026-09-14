"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Users,
  Award,
  Calendar,
  Image as ImageIcon,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  instituteName?: string;
}

export default function Navbar({ instituteName = "YLCC" }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "For Business", href: "/business", badge: "Corporate" },
    { label: "Projects", href: "/projects", badge: "Live" },
    { label: "About", href: "/about" },
    { label: "Faculty", href: "/faculty" },
    { label: "Achievements", href: "/achievements" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "glass-nav border-b border-slate-200/80 shadow-xs"
          : "bg-white/95 border-b border-slate-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-hidden">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {instituteName}
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 hidden sm:inline-block">
                  CAMPUS
                </span>
              </div>
              <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                Institute of Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-medium transition-all relative flex items-center gap-1.5",
                    isActive
                      ? "text-stone-900 bg-stone-200/70 font-bold shadow-2xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/40"
                  )}
                >
                  {link.label}
                  {link.badge && (
                    <span className={cn(
                      "text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full",
                      link.badge === "Corporate"
                        ? "bg-amber-100 text-amber-900 border border-amber-300/60"
                        : "bg-stone-200 text-stone-800"
                    )}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs & Student Portal & Admin Shortcut */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-200/50 border border-stone-300 text-xs font-semibold transition-all bg-white"
            >
              <Users className="w-3.5 h-3.5 text-stone-600" />
              <span>Student Portal</span>
            </Link>

            <Link
              href="/admin/login"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200/40 transition-colors"
              title="Admin Console"
            >
              <Shield className="w-4 h-4" />
            </Link>

            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-50 font-semibold text-xs shadow-sm transition-all active:scale-95"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/apply"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-medium text-xs shadow-xs"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-50 bg-slate-900/40 backdrop-blur-xs flex flex-col">
          <div className="bg-white border-b border-slate-200 p-6 max-h-[calc(100vh-5rem)] overflow-y-auto space-y-4 shadow-2xl">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/apply"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-center shadow-md shadow-blue-500/25"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link
                href="/admin/login"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Portal Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
