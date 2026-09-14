'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MessageCircle,
  Menu,
  X,
  FileSpreadsheet,
  ChevronDown,
  BookOpen,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { InstituteSettings } from '@/types';

interface HeaderProps {
  settings?: InstituteSettings;
}

export default function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const phone = settings?.phone || '+91 98290 12345';
  const email = settings?.email || 'admissions@ylcccommerce.in';
  const whatsapp = settings?.whatsapp || '+91 98290 12345';
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About YLCC', href: '/about' },
    { name: 'Training Programs', href: '/programs' },
    { name: 'Practical Projects', href: '/projects' },
    { name: 'Advanced Excel', href: '/advanced-excel' },
    { name: 'Faculty', href: '/faculty' },
    { name: 'Student Success', href: '/student-success' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* 1. Admission / Announcement Top Bar */}
      <div className="bg-[#192538] text-[#F5EFEB] text-xs py-2 px-4 border-b border-[#2C3E5A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="bg-[#8C6527] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase">
              Notice
            </span>
            <span className="font-medium text-[#E8DEC8]">
              {settings?.announcementBarText ||
                '📢 Admissions Open for Upcoming Practical Batches — Limited to 20 Students per Cohort!'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-normal">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 hover:text-[#D4C5AD] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C4B496]" />
              <span>{phone}</span>
            </a>
            <span className="text-[#3E5274]">|</span>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Hi%20YLCC,%20I%20am%20interested%20in%20commerce%20and%20accounting%20practical%20training.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="text-[#3E5274]">|</span>
            <Link
              href="/admin/login"
              className="text-[#A89577] hover:text-[#F5EFEB] transition-colors flex items-center gap-1"
            >
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <nav
        className={`w-full transition-all duration-200 ${
          scrolled
            ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-md py-3 border-b border-[#E2D7C3]'
            : 'bg-[#FAF7F0] py-4 border-b border-[#E8DFC8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Institute Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-[#192538] text-[#FDFCF8] flex flex-col items-center justify-center font-serif shadow-sm border border-[#C1AF93] group-hover:bg-[#8C6527] transition-colors">
              <span className="text-xl font-bold tracking-tighter leading-none">YL</span>
              <span className="text-[9px] uppercase tracking-widest text-[#E8DEC8] font-sans font-semibold">CC</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-serif font-extrabold tracking-tight text-[#192538]">
                  YLCC
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6527] bg-[#ECE4D4] px-1.5 py-0.5 rounded border border-[#D4C5AD]">
                  Commerce Institute
                </span>
              </div>
              <span className="text-[11px] text-[#57534E] font-medium hidden sm:inline-block">
                {settings?.fullForm || 'Yukti Ledger & Commerce Centre'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    active
                      ? 'bg-[#E2D7C3] text-[#192538] font-semibold shadow-xs'
                      : 'text-[#44403C] hover:text-[#192538] hover:bg-[#ECE4D4]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/apply"
              className="hidden sm:inline-flex items-center gap-2 bg-[#8C6527] hover:bg-[#74511D] text-white px-4 py-2 rounded-lg text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all duration-150"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply Now</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#192538] bg-[#ECE4D4] hover:bg-[#E2D7C3] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 3. Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF7F0] border-b border-[#E2D7C3] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      active
                        ? 'bg-[#E2D7C3] text-[#192538] font-bold'
                        : 'text-[#44403C] hover:bg-[#ECE4D4] hover:text-[#192538]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#E8DFC8] flex flex-col gap-3">
              <Link
                href="/apply"
                className="w-full text-center bg-[#8C6527] hover:bg-[#74511D] text-white py-3 rounded-lg font-semibold tracking-wide shadow"
              >
                Apply for Admission
              </Link>
              <div className="flex justify-between items-center text-xs text-[#57534E] px-1">
                <span>{settings?.location || 'Jaipur, Rajasthan'}</span>
                <a href={`tel:${phone}`} className="font-semibold text-[#8C6527]">
                  Call: {phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
