import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'YLCC | Business & Skill Accelerator',
    template: '%s | YLCC Business & Skill Accelerator',
  },
  description:
    'YLCC offers real-world practical training in Accounting Operations, GST, TDS/TCS, Banking CC Limits, Corporate Payroll, Cost Accounting, and Corporate Excel 365 through multi-business projects in Kanpur.',
  keywords: [
    'YLCC',
    'Business & Skill Accelerator',
    'Commerce Institute',
    'Accounting Course Kanpur',
    'Practical GST Training',
    'TDS TCS Course',
    'Banking CC Limit Documentation',
    'CMA Preparation',
    'Corporate Payroll Training',
    'Cost Accounting',
    'Advanced Excel 365',
    'Accounts Manager Training',
    'Tally Prime Course',
  ],
  authors: [{ name: 'YLCC Business & Skill Accelerator' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'YLCC | Business & Skill Accelerator',
    description:
      'Master live day-to-day accounting, taxation, banking documentation, and Advanced Excel through multi-business practical projects.',
    url: 'https://ylcccommerce.in',
    siteName: 'YLCC Business & Skill Accelerator',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#1C1917] antialiased selection:bg-[#E5D8CA] selection:text-[#2A1810]">
        {children}
      </body>
    </html>
  );
}
