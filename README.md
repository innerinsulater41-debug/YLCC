# YLCC — Commerce & Professional Accounting Institute Web Platform

A production-ready full-stack web application built for **YLCC (Yukti Ledger & Commerce Centre)**, a specialized commerce, accounting, taxation, banking, costing, and corporate Excel training institute.

> **Important Institutional Context:**  
> YLCC is strictly a commerce and professional accounting training institute. It is **NOT** a technology or coding institute. The platform is grounded in real business documentation: sales billing, purchase registers, GST portals, TDS/TCS returns, commercial bank CC limits, corporate payroll, industrial costing, and Advanced Excel 365.

---

## 🎨 Design System: Cream & Beige Luxury

The website is crafted with a bespoke **Cream & Beige** financial palette tailored for commerce graduates, accountants, and finance professionals:
* **Backgrounds**: Ivory Cream (`#FAF7F0`), Alabaster Surface (`#FDFCF8`), Warm Beige (`#F3ECE0`)
* **Cards & Ledger Borders**: Clean white cards with ledger hairline borders (`#E5DCCB`, `#D4C5AD`)
* **Accents**: Polished Bronze Gold (`#8C6527`, `#74511D`) and Deep Corporate Navy (`#192538`)
* **Typography**: Elegant serif headings paired with clean legible sans-serif for numbers, financial vouchers, and data tables.

---

## 📚 Course Curriculum (Grounded in Authentic Course PDFs)

### 8 Core Professional Programs
1. **Accounts Operator Practical Training**: Live voucher entries, sales billing, purchase feeding, revenue vs capital expenditure, E-way bills, E-invoices, transportation entries, and party balance monitoring.
2. **Accounts Manager Professional Program**: Supervision of daily entries, monitoring books of accounts, debtor collection cycles, supplier payment cycles, firm legal matters, sales team targets, item/brand/category stock reports, monthly internal accounting audits, and annual Income Tax audit preparation.
3. **Banking Operations, CC Limits & CMA Preparation**: Cash Credit (CC) and Overdraft (OD) limit documentation, monthly Drawing Power (DP) maintenance, stock statements with margin deductions, and 12-page CMA data with projected balance sheets.
4. **GST Practitioner Masterclass**: GST Act transaction entries, E-way bills, E-invoicing, monthly GSTR-1, ITC reconciliation (GSTR-2B vs Book Milan), monthly GSTR-3B tax offset, and annual GSTR-9 audit preparation.
5. **TDS & TCS Practitioner Course**: Section-wise entries (194C, 194J, 194I, 194Q, 206C), Challan 281 tax portal e-payments, quarterly return filing (Form 24Q, 26Q, 27Q, 27EQ) via NSDL RPU/FVU utilities, and TRACES Form 16/16A certificate generation.
6. **Corporate Payroll Management & Statutory Compliance**: CTC structuring, biometric shift logs, overtime rates, statutory bonus, gratuity liabilities, Labour Law compliance, monthly EPF Electronic Challan-cum-Return (ECR), and ESIC returns.
7. **Cost Accounting & Industrial Inventory Control**: Perpetual inventory, negative stock alerts, automated purchase orders, manufacturing costing for own-brand products, builder site costing, government tender costing, thekedar road/bridge site costing, vendor contract costing (Britannia / Parle-G model), and job-worker material control.
8. **Advanced Excel & Corporate Excel 365 Mastery**: 250+ formulas (XLOOKUP, INDEX/MATCH, FILTER, UNIQUE, SORTBY, LET, LAMBDA), 500+ spreadsheet troubleshooting scenarios, 250+ corporate interview challenges, Power Query (ETL), and automated MIS dashboards.

---

## 🏢 The 30 Multi-Business Practical Projects Library

Every student practices complete financial years across 30 authentic Indian industries:
1. **Hospital Business Accounting & Patient Billing System** (IPD/OPD, Doctor 194J shares, TPA mediclaim reconciliation)
2. **College Accounting & Student Fee Reconciliation System** (Installment fees, scholarship grants, hostel/mess ledgers)
3. **Freight Logistics & Fleet Transport Management Accounting** (Trip sheets, Fastag, diesel cards, GTA RCM on freight)
4. **Automobile & Electronics Service Centre Multi-Job Accounting** (Job Cards, spare parts inventory, OEM warranty claims)
5. **Hotel & Hospitality Multi-Revenue Accounting** (Guest folios, night audit, restaurant POS, OTA commission 194O reconciliations)
6. **FMCG Wholesale & Multi-Tier Distributor Network Accounting** (Primary vs secondary sales, manufacturer scheme claims, beat collections)
7. **Comprehensive GST Business Practice Project** (B2B, B2C, SEZ, RCM, monthly GSTR-2B Milan and GSTR-3B offset)
8. **Corporate TDS/TCS Multi-Section Compliance Project** (Withholding vouchers, RPU compilation, TRACES Form 16A generation)
9. **Banking Cash Credit (CC) / OD Limit & CMA Proposal Project** (Drawing power verification, margin deductions, 12-page CMA report)
10. **Multi-Department Corporate Payroll System** (120 employees, overtime, statutory bonus, gratuity, EPF ECR, ESIC portal)
11. **Furniture Showroom Custom Product Manufacturing & Costing** (Bill of Materials, timber cutting wastage, carpenter piece-rates)
12. **Architect & Interior Decorator Project Accounting** (Milestone billing, 3D renderer vendor TDS, Form 26AS tax credit tracking)
13. **Real Estate Builder & Multi-Site Construction Costing** (Civil contractor RA bills, retention money, RERA 70% escrow accounts)
14. **Job-Worker Inventory & Multi-Stage Processing Cost Control** (Rule 55 delivery challans, cutting loss, quarterly Form ITC-04)
15. **Government Contractor (Thekedar) Road, Bridge & Bhavan Site Costing** (PWD tenders, measurement books, double TDS: 194C & GST-TDS Sec 51)
16. **Multi-Branch & Multi-Chain Franchise Accounting** (Javed Habib model, inter-branch stock transfers, franchise royalty billing)

---

## ⚡ Architecture & Dual-Mode Persistence

1. **Zero-Config Local Fallback Engine**:
   - Out of the box, the application operates using a resilient JSON-backed persistent store in `data/ylcc_database.json` and local file storage in `public/uploads/`.
   - Seed data includes all 8 programs, 16 projects, faculty profiles, testimonials, FAQs, and settings.
   - Any edits made through the Admin Portal immediately persist to disk across server restarts.
2. **Supabase Production Engine**:
   - Ready for PostgreSQL database and Supabase Storage.
   - Full SQL migration script provided in `supabase/migrations/0001_initial_schema.sql` with complete Row Level Security (RLS) policies.
   - Simply populate `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` to switch to Supabase.

---

## 🔐 Administrative Suite (`/admin`)

Access the comprehensive admin suite at: **`http://localhost:3000/admin`**

### Default Administrative Credentials
* **Admin Email**: `admin@ylcccommerce.in`
* **Admin Password**: `YLCCAdmin#2026!`

### Admin Modules
* **Dashboard Analytics**: KPI cards, Recharts admission track trends, and project industry distribution.
* **Practical Projects Manager**: Upload new projects, attach multiple files (PDF, XLSX, DOCX, PPTX, ZIP), toggle Draft / Published status, edit descriptions, delete.
* **Training Programs Manager**: Edit fee structures, seat allocations, batch schedules, and draft/published visibility.
* **Student Enquiries**: Manage incoming student leads with status pipeline (`new`, `contacted`, `resolved`).
* **Admission Applications**: Review complete student dossiers (DOB, qualification, commerce background, career goals, download attached documents) and save internal committee notes.
* **Resources Repository**: Upload course brochures and practice formats, manage access tiers (`public`, `student`, `admin`).
* **Faculty Directory**: Manage mentor profiles and expertise areas.
* **Institute Settings**: Edit institute full name, tagline, address, phone, WhatsApp, email, and live website counter statistics.

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
# Clone or enter project directory
cd /path/to/project

# Install dependencies
npm install
```

### 2. Environment Setup
The repository includes `.env.example` and `.env.local` pre-configured for local execution:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🗄️ Supabase PostgreSQL Setup (Optional for Cloud Deployment)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Paste and run the complete migration script from `supabase/migrations/0001_initial_schema.sql`.
4. In Supabase Storage, create a public bucket named `ylcc-files`.
5. Add your project credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the environment variables from `.env.local` in Vercel Project Settings.
4. Deploy! Next.js 15+ App Router builds and deploys automatically.
