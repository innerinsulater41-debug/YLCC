import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ylcc.edu.in"),
  title: {
    default: "YLCC | Youth Leadership & Career Campus - Premier Tech & Leadership Institute",
    template: "%s | YLCC - Youth Leadership & Career Campus",
  },
  description:
    "YLCC is an elite engineering and leadership institute in Bengaluru, India. We offer production-focused cohorts in Full-Stack Software Engineering, Generative AI, Cloud Architecture, and Career Leadership.",
  keywords: [
    "YLCC",
    "Youth Leadership & Career Campus",
    "Full-Stack Software Engineering",
    "Generative AI Course",
    "Machine Learning Institute",
    "DevOps Cloud Training Bangalore",
    "Tech Institute Koramangala",
    "Coding Bootcamps India",
    "Student Projects Showcase",
  ],
  authors: [{ name: "YLCC Faculty & Academic Council" }],
  openGraph: {
    title: "YLCC | Youth Leadership & Career Campus",
    description: "Accelerate your software engineering and leadership future with real-world systems, industry mentors, and production capstones.",
    url: "https://ylcc.edu.in",
    siteName: "YLCC Campus",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/ylcc-logo.svg",
    shortcut: "/images/ylcc-logo.svg",
    apple: "/images/ylcc-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf7f2] text-[#1c1917] font-sans">
        {children}
      </body>
    </html>
  );
}
