import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { db } from '@/lib/db';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await db.getSettings();

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF6F0]">
      <Header settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
