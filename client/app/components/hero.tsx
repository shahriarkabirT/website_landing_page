"use client"

import { ShieldCheck, Headphones, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-slate-950 flex items-center"
    >
      {/* Optimized Performance Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* SVG Dot Pattern - Efficient */}
        <div
          className="absolute inset-0 opacity-[0.12] dark:opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Optimized Radial Gradients - Concentrated on upper side */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 80% 10%, rgba(59, 130, 246, 0.15), transparent 45%),
              radial-gradient(circle at 20% 15%, rgba(79, 70, 229, 0.15), transparent 45%),
              radial-gradient(circle at 50% 5%, rgba(147, 51, 234, 0.08), transparent 35%),
              radial-gradient(circle at 60% 30%, rgba(20, 184, 166, 0.08), transparent 25%)
            `
          }}
        />

        {/* Simple Vertical Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-slate-950 dark:via-transparent dark:to-slate-950" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto max-w-7xl px-6 py-10 sm:py-16 w-full"
      >
        <div className="text-center space-y-8">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Trusted Ecommerce Partner
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight max-w-4xl mx-auto"
          >
            মাত্র কয়েক মিনিটে আপনার <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ই-কমার্স সাইট
            </span>{" "}
            বুঝে নিন
          </motion.h1>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
              শুরু মাত্র ১০০০ টাকা থেকে!
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              কোন হোস্টং চার্জ নেই, ফ্রি কন্সাল্টেশন! আপনি আপনার ব্যবসা দেখবেন আমরা দেখবো আপনার ই-কমার্স
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/25"
            >
              অর্ডার করুন
            </a>
            <a
              href="/features"
              className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg font-bold border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all duration-300"
            >
              ফিচার গুলো দেখুন
            </a>
          </motion.div>

          {/* Social Proof / Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-10 sm:pt-16 grid grid-cols-3 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-800 mt-10 sm:mt-16"
          >
            <div className="flex items-center justify-center gap-3 group">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">99.9%</p>
                <p className="text-xs text-slate-500">Uptime Guarantee</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 group">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:scale-110 transition-transform">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">24/7</p>
                <p className="text-xs text-slate-500">Support Available</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 group">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">১৫০০+</p>
                <p className="text-xs text-slate-500">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
