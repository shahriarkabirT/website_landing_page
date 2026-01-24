import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import type React from "react";
import MetaPixel from "./components/meta-pixel";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const bengaliFont = localFont({
  src: "../fonts/Li Shohid Tahmid Tamin Unicode.ttf",
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "Professional Website Development for Your Business | BD Web Services",
  description:
    "Professional website development service in Bangladesh. We create modern, fast & SEO-optimized business websites. Affordable packages for startups. Contact us today. | বাংলাদেশে প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস — দ্রুত, নিরাপদ, SEO রেডি ওয়েবসাইট।",
  keywords:
    "website development Bangladesh, web design company Bangladesh, affordable website design BD, ecommerce development BD, landing page design BD, ব্যবসার ওয়েবসাইট, ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস, ডোমেইন হোস্টিং সহ ওয়েবসাইট",
  openGraph: {
    title: "Professional Website Development for Your Business",
    description:
      "Get a fast, modern, mobile-friendly website built for growth. আধুনিক ও প্রফেশনাল ওয়েবসাইট ডেভেলপমেন্ট সার্ভিস",
    type: "website",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${bengaliFont.variable}`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}
