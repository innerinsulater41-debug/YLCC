import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Award,
  BookOpen,
  Lock,
} from 'lucide-react';
import { InstituteSettings } from '@/types';

interface FooterProps {
  settings?: InstituteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const phone = settings?.phone || '+91 90059 00123';
  const email = settings?.email || 'admissions@ylcccommerce.in';
  const address =
    settings?.address ||
    'Barra-4, L.I.G-20, Kanpur, Uttar Pradesh, India';
  const officeHours =
    settings?.officeHours || 'Monday – Saturday: 8:30 AM – 7:30 PM (Sunday Closed)';

  return (
    <footer className="bg-[#2A1810] text-[#E5D8CA] border-t-4 border-[#8B5A2B] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3D2314]">
          {/* Col 1: Institute Identity & Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B5A2B] text-white flex flex-col items-center justify-center font-serif shadow-sm">
                <span className="text-lg font-bold leading-none">YL</span>
                <span className="text-[8px] uppercase tracking-widest font-sans font-semibold">CC</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white tracking-tight">YLCC</h3>
                <p className="text-xs text-[#C4AE96] font-medium">Commerce & Accounting Institute</p>
              </div>
            </div>

            <p className="text-xs text-[#D8C5B2] leading-relaxed">
              A premier commerce, accounting, and professional skills training institute. We bridge the gap
              between textbook theory and actual corporate desk work through multi-business live accounting,
              GST, TDS/TCS, Banking CC limits, and Advanced Excel 365.
            </p>

            <div className="pt-2 text-xs space-y-2 text-[#EFE6DD]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C4AE96] shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C4AE96] shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C4AE96] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C4AE96] shrink-0" />
                <span>{officeHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Training Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[#3D2314] pb-2">
              Training Programs
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C5B2]">
              <li>
                <Link
                  href="/programs/accounts-operator"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Accounts Operator (Live Entries)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/accounts-manager"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Accounts Manager & Audit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/banking-operations-credit-limits"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Banking CC Limits & CMA Data</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/gst-practitioner"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>GST Practitioner Masterclass</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/tds-tcs-practitioner"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>TDS & TCS Practitioner Course</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/corporate-payroll-management"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Payroll Management & PF/ESIC</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/cost-accounting-industrial-inventory"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Cost Accounting & BOM Costing</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/advanced-excel"
                  className="hover:text-white transition-colors flex items-center justify-between text-[#E8DCCF] font-semibold"
                >
                  <span>Corporate Excel 365 (250+ Formulas)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Practical Projects & Case Studies */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[#3D2314] pb-2">
              30 Practical Projects
            </h4>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-[#D8C5B2]">
              <Link href="/projects" className="hover:text-white transition-colors">
                • Hospital Patient Billing System
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • College Accounting & Fees
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • Freight Logistics & RCM on GTA
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • Automobile Service Centre Jobs
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • Hotel & Banquet Operations
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • FMCG Wholesale Beat Distributorship
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • Real Estate Builder Site Costing
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • Govt Thekedar (Roads & Bridges)
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                • Franchise Retail Chain (Javed Habib Model)
              </Link>
              <div className="pt-1">
                <Link
                  href="/projects"
                  className="text-xs font-semibold text-[#C4AE96] hover:text-white flex items-center gap-1"
                >
                  <span>View all 16 business projects →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Navigation & Admissions */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[#3D2314] pb-2">
              Admissions & Resources
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C5B2]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About YLCC & Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-white transition-colors">
                  Chartered Accountants & Faculty
                </Link>
              </li>
              <li>
                <Link href="/student-success" className="hover:text-white transition-colors">
                  Student Success Stories
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Download Practice Files & Formats
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Accounting Lab & Workshop Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Campus Visit
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-white transition-colors font-semibold text-[#E8DCCF]">
                  Online Admission Application
                </Link>
              </li>
            </ul>

            <div className="bg-[#362013] p-3 rounded-lg border border-[#4E2F1D] text-xs">
              <span className="font-semibold text-white block mb-1">Commerce Notice</span>
              <p className="text-[11px] text-[#C4AE96] leading-normal">
                YLCC is strictly a commerce & professional accounting institute. We do not provide computer
                science or coding education.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A68A70] gap-4">
          <p>© {currentYear} YLCC — Commerce & Accounting Institute. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <Link
              href="/admin/login"
              className="hover:text-white transition-colors flex items-center gap-1 text-[#C4AE96]"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
