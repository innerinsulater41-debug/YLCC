import React from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  CheckCircle2,
  Download,
  ArrowRight,
  TrendingUp,
  Cpu,
  HelpCircle,
  BarChart3,
  Layers,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import QuickEnquiryForm from '@/components/home/QuickEnquiryForm';

export const metadata = {
  title: 'Advanced Excel & Corporate Excel 365 Mastery | YLCC',
  description:
    'Master 250+ Excel 365 formulas, Power Query, 500+ troubleshooting scenarios, 250+ interview questions, and dynamic MIS dashboards at YLCC Jaipur.',
};

export default function AdvancedExcelPage() {
  const formulaCategories = [
    {
      title: 'Modern Lookups & Dynamic Arrays',
      formulas: ['XLOOKUP (Reverse & 2-Way)', 'INDEX & MATCH (Multi-Criteria)', 'FILTER', 'UNIQUE', 'SORT & SORTBY', 'CHOOSEROWS / CHOOSECOLS'],
      description: 'Replace antiquated VLOOKUPs with instantaneous dynamic array lookups that spill results automatically.',
    },
    {
      title: 'Advanced Speed & Optimization (LET & LAMBDA)',
      formulas: ['LET (Variable Assignment & Calculation Speedup)', 'LAMBDA (Custom Reusable Functions)', 'MAP', 'SCAN', 'BYROW', 'BYCOL'],
      description: 'Write elegant, modular formulas that eliminate redundant calculations in heavy financial models.',
    },
    {
      title: 'Corporate Financial & Banking Functions',
      formulas: ['PMT / IPMT / PPMT (Loan Amortization)', 'XIRR (Irregular Cash Flow Return)', 'XNPV', 'CUMIPMT', 'RATE', 'EFFECT'],
      description: 'Formulas required for bank loan repayment schedules, investment appraisals, and CMA data verification.',
    },
    {
      title: 'Data Cleaning & Date Intelligence',
      formulas: ['TEXTSPLIT / TEXTBEFORE / TEXTAFTER', 'EDATE & EOMONTH', 'NETWORKDAYS.INTL', 'TRIM & CLEAN', 'VALUE & NUMBERVALUE', 'CONCAT & TEXTJOIN'],
      description: 'Automate messy ERP bank statement dumps into standardized ledger records without manual editing.',
    },
  ];

  const dashboardModules = [
    {
      title: 'Executive Sales vs Collection MIS Dashboard',
      description: 'Interactive tracker showing target vs actual sales, salesperson beat collections, and overdue payment alerts with slicers.',
      icon: TrendingUp,
    },
    {
      title: 'Debtors & Inventory Age-Wise Aging Analyzer',
      description: 'Bucket receivables and stock into <30, 31-60, 61-90, and >90 days to identify non-moving items and bad-debt risks.',
      icon: BarChart3,
    },
    {
      title: 'Hospital / Hotel Departmental Revenue Tracker',
      description: 'Department-by-department revenue consolidation with daily night-audit reconciliations and food cost percentage metrics.',
      icon: Layers,
    },
    {
      title: 'Commercial Bank CC Limit Drawing Power Model',
      description: 'Dynamic spreadsheet that deducts margins from eligible paid stock and <90-day book debts to compute monthly Drawing Power.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="bg-[#192538] text-white pt-14 pb-20 border-b-4 border-[#8C6527] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24334D] border border-[#3E5274] text-xs font-semibold text-[#E8DEC8]">
            <FileSpreadsheet className="w-4 h-4 text-[#C1AF93]" />
            <span>Corporate Excel 365 & Financial MIS Track</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight max-w-4xl leading-tight">
            Corporate Excel 365 & Automated MIS Masterclass
          </h1>

          <p className="text-base sm:text-lg text-[#D4C5AD] max-w-3xl leading-relaxed">
            Move beyond basic spreadsheets. Master 250+ modern Excel 365 formulas, solve 500+ workplace troubleshooting challenges, practice 250+ real accounting interview questions, and build automated MIS dashboards that refresh with a single click.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/apply?program=advanced-excel-corporate-excel-365"
              className="bg-[#8C6527] hover:bg-[#74511D] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enroll for Upcoming Batch</span>
            </Link>

            <a
              href="/sample-docs/YLCC-Course-Costing-Excel.pdf"
              download
              className="bg-[#24334D] hover:bg-[#2C3E5A] text-white border border-[#3E5274] px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#C1AF93]" />
              <span>Download Excel Syllabus PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
            <span className="text-4xl font-serif font-extrabold text-[#8C6527]">250+</span>
            <h3 className="text-sm font-bold text-[#192538] uppercase">Formulas Mastered</h3>
            <p className="text-xs text-[#57534E]">
              Dynamic arrays, modern lookups, text manipulation, and finance equations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
            <span className="text-4xl font-serif font-extrabold text-[#8C6527]">500+</span>
            <h3 className="text-sm font-bold text-[#192538] uppercase">Troubleshooting Cases</h3>
            <p className="text-xs text-[#57534E]">
              Fixing broken lookups, corrupt dumps, SPILL errors, and circular references.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
            <span className="text-4xl font-serif font-extrabold text-[#8C6527]">250+</span>
            <h3 className="text-sm font-bold text-[#192538] uppercase">Interview Questions</h3>
            <p className="text-xs text-[#57534E]">
              Actual machine tests from top CA firms, corporate accounts, and MNCs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-2">
            <span className="text-4xl font-serif font-extrabold text-[#8C6527]">100%</span>
            <h3 className="text-sm font-bold text-[#192538] uppercase">Practical Worksheets</h3>
            <p className="text-xs text-[#57534E]">
              Students build actual corporate dashboards using multi-table datasets.
            </p>
          </div>
        </div>
      </section>

      {/* Formula Curriculum Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
            Comprehensive Formula Training
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#192538]">
            Mastering Modern Excel 365 Architecture
          </h2>
          <p className="text-sm text-[#57534E]">
            We don’t just teach formula syntax. We teach you how to choose the fastest, most reliable formula for any commercial calculation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formulaCategories.map((cat, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#192538] border-b border-[#EFE8DD] pb-3">
                {cat.title}
              </h3>
              <p className="text-xs text-[#6B6357]">{cat.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {cat.formulas.map((f, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[#FAF7F0] border border-[#E2D7C3] text-[11px] font-mono text-[#192538]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 500+ Troubleshooting Scenarios Highlight */}
      <section className="bg-[#F3ECE0] py-16 border-y border-[#E2D7C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
              The 500+ Error Recovery Engine
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#192538]">
              Excel Troubleshooting & Data Recovery
            </h2>
            <p className="text-sm text-[#57534E]">
              What separates a junior data entry clerk from an Advanced Excel specialist is the ability to instantly diagnose and repair broken spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] space-y-3">
              <h3 className="text-base font-serif font-bold text-[#192538]">Formula Error Diagnostics</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Step-by-step techniques to isolate #N/A (unmatched lookup), #VALUE! (data type mismatch), #REF! (deleted reference), and #SPILL! (blocked range).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] space-y-3">
              <h3 className="text-base font-serif font-bold text-[#192538]">Corrupt Data & Text Inconsistencies</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Cleaning non-breaking spaces (CHAR 160), numbers stored as text from banking portals, inconsistent date formats (DD/MM vs MM/DD), and leading apostrophes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2D7C3] space-y-3">
              <h3 className="text-base font-serif font-bold text-[#192538]">Formula Auditing & Trace Precedents</h3>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Using Evaluate Formula, Trace Precedents, Trace Dependents, and Watch Window to audit complex 50-sheet corporate financial models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Dashboards Created */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
            Executive Reporting
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#192538]">
            Automated Corporate MIS Dashboards
          </h2>
          <p className="text-sm text-[#57534E]">
            Build dashboards that update instantly when new monthly sales or purchase data is dropped into the folder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dashboardModules.map((dash, i) => {
            const Icon = dash.icon;
            return (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E2D7C3] shadow-xs flex items-start gap-4">
                <div className="p-3 bg-[#FAF7F0] text-[#8C6527] rounded-xl shrink-0 border border-[#E2D7C3]">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-serif font-bold text-[#192538]">{dash.title}</h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">{dash.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interview Preparation & Admission CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6527]">
              Career & Placement
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#192538]">
              250+ Accounting & Finance Excel Interview Questions
            </h2>
            <p className="text-sm text-[#57534E] leading-relaxed">
              Every student completes a dedicated 2-week interview sprint. You solve the exact machine tests administered by senior CA firms, commercial banks, and corporate hiring managers.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E2D7C3] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-[#192538] space-y-1">
                  <strong>Reconciliation Challenge:</strong> Match 2,000 bank ledger entries with company cash books using single dynamic formula.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2D7C3] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-[#192538] space-y-1">
                  <strong>Tax Deduction Automation:</strong> Auto-calculate TDS under 194C vs 194J based on PAN validity and transaction thresholds.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E2D7C3] flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-[#192538] space-y-1">
                  <strong>Executive Dashboard Build:</strong> Transform 12 raw CSV sales sheets into a one-page interactive board report in 30 minutes.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <QuickEnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
