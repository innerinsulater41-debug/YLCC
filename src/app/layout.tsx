import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'YLCC | Commerce, Accounting & Professional Skills Training Institute',
    template: '%s | YLCC Commerce Institute',
  },
  description:
    'Yukti Ledger & Commerce Centre (YLCC) offers real-world practical training in Accounting Operations, GST, TDS/TCS, Banking CC Limits, Corporate Payroll, Cost Accounting, and Corporate Excel 365 through 16 multi-business projects in Jaipur.',
  keywords: [
    'YLCC',
    'Commerce Institute',
    'Accounting Course Jaipur',
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
  authors: [{ name: 'YLCC - Yukti Ledger & Commerce Centre' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'YLCC | Commerce & Professional Accounting Institute',
    description:
      'Master live day-to-day accounting, taxation, banking documentation, and Advanced Excel through 16 multi-business practical projects.',
    url: 'https://ylcccommerce.in',
    siteName: 'YLCC Commerce Institute',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
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
      <body className="min-h-full flex flex-col bg-[#FAF7F0] text-[#1C1917] antialiased selection:bg-[#E2D7C3] selection:text-[#192538]">
        {children}
      </body>
    </html>
  );
}
