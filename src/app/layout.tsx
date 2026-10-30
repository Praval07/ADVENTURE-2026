import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADVENTURE 2026 | The Entrepreneurship Ad Film Challenge",
  description: "Official National Student Entrepreneurship Ad Film Challenge organized by Institution's Innovation Council (IIC) × Skill Development Cell (SDC), Bharat Ratna Babasaheb Bhimrao Ambedkar Rajkiya Engineering College, Pratapgarh, Uttar Pradesh, India.",
  keywords: [
    "ADVENTURE 2026",
    "Entrepreneurship Ad Film Challenge",
    "IIC REC Pratapgarh",
    "Skill Development Cell",
    "BRBBARECP",
    "Student Innovation",
    "Ad Film Competition",
    "National Hackathon",
  ],
  authors: [{ name: "IIC & SDC, BRBBA REC Pratapgarh" }],
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#0d0f12] text-zinc-100 font-sans selection:bg-[#ff5b26] selection:text-white">
        <AppProvider>
          <Suspense fallback={<div className="h-20 bg-[#0d0f12]" />}>
            <Navbar />
          </Suspense>
          <div className="flex-1 w-full flex flex-col">
            {children}
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

