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

export const metadata: Metadata = {
  title: "Instant eCommerce Website Development | Starting @ 1000 BDT | No Hosting Fee",
  description:
    "Launch your online store in minutes! Professional eCommerce website service in Bangladesh starting from 1000 Taka. No hosting fees, free consultation. | মাত্র ১০০০ টাকায় আপনার ই-কমার্স ওয়েবসাইট - আজই ব্যবসা শুরু করুন।",
  keywords:
    "ecommerce website bangladesh, instant ecommerce site, low cost website bd, 1000 taka website, online store builder, no hosting fee website, ই-কমার্স ওয়েবসাইট তৈরি, কম খরচে ই-কমার্স, অনলাইন দোকান",
  openGraph: {
    title: "নিজের ই-কমার্স ওয়েবসাইট ১০০০ টাকায় | Instant eCommerce Development",
    description:
      "Get your fully functional eCommerce website in minutes. No hosting charges. Start selling today! মাত্র ১০০০ টাকায় ই-কমার্স ওয়েবসাইট।",
    type: "website",
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
          <Footer />
          <Toaster />
        </AuthProvider>
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}
