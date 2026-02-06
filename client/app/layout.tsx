import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import type React from "react";
import MetaPixel from "./components/meta-pixel";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const bengaliFont = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bengali",
});

// Structured Data for Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "idokans.com",
  "url": "https://idokans.com",
  "logo": "https://idokans.com/logo.png",
  "sameAs": [
    "https://facebook.com/idokans",
    "https://twitter.com/idokans",
    "https://instagram.com/idokans"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+8801744496737",
    "contactType": "customer service",
    "areaServed": "BD",
    "availableLanguage": ["en", "bn"]
  }
}

export const metadata: Metadata = {
  metadataBase: new URL('https://idokans.com'),
  title: {
    default: "idokans.com | ১০ মিনিটে নিজের ই-কমার্স ওয়েবসাইট",
    template: "%s | idokans.com"
  },
  description: "১০০০ টাকায় ই-কমার্স ওয়েবসাইট। ডোমেইন, হোস্টিং ছাড়াই নিজের অনলাইন দোকান চালু করুন। কোন কোডিং দক্ষতা ছাড়াই সম্পূর্ণ ই-কমার্স সমাধান।",
  keywords: ["ecommerce website builder", "online store bd", "low cost ecommerce website", "create online shop", "ecommerce bangladesh", "idokans", "ই-কমার্স ওয়েবসাইট", "অনলাইন দোকান"],
  authors: [{ name: "idokans.com Team" }],
  creator: "idokans.com",
  publisher: "idokans.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "নিজের ই-কমার্স ওয়েবসাইট ১০০০ টাকায় | idokans.com",
    description: "Launch your own online store in minutes with idokans.com. No coding required. Start selling today! মাত্র ১০০০ টাকায় ই-কমার্স ওয়েবসাইট।",
    url: 'https://idokans.com',
    siteName: 'idokans.com',
    images: [
      {
        url: '/og-image.png', // Assuming you might have one, or use logo
        width: 1200,
        height: 630,
        alt: 'idokans.com - Instant eCommerce Builder',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'idokans.com | Instant eCommerce Website',
    description: 'Build your online store in minutes. No hosting fees. Start for just 1000 BDT.',
    images: ['/og-image.png'],
    creator: '@idokans',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'google-site-verification-code', // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`font-sans antialiased ${bengaliFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}
