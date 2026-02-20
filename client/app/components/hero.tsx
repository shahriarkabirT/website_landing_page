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
        className="relative z-10 mx-auto max-w-7xl px-6 py-10 sm:py-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column (Text Content) */}
          <div className="text-center lg:text-left space-y-7">
            {/* Price Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
            >
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                🔥 শুরু মাত্র <span className="text-yellow-300 font-black">৯৯০/-</span> টাকা থেকে!
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-black text-slate-900 dark:text-white leading-[1.3] tracking-tight max-w-3xl mx-auto lg:mx-0 break-words"
            >
              মাত্র কয়েক মিনিটের মধ্যে আপনার{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                ই-কমার্স সাইট
              </span>{" "}
              <br className="hidden lg:block" />
              বানিয়ে নিন
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0"
            >
              কোন হোস্টং চার্জ নেই, ফ্রি কন্সাল্টেশন! আপনি আপনার ব্যবসা দেখবেন আমরা দেখবো আপনার ই-কমার্স।
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4"
            >
              <a
                href="#pricing"
                className="flex-1 sm:flex-none text-center px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20"
              >
                অর্ডার করুন
              </a>
              <a
                href="/features"
                className="flex-1 sm:flex-none text-center px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-bold border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all duration-300"
              >
                ফিচার গুলো দেখুন
              </a>
            </motion.div>

            {/* Social Proof / Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 sm:pt-10 grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto lg:mx-0 border-t border-slate-100 dark:border-slate-800/60 mt-8"
            >
              <div className="flex flex-col gap-1 items-center lg:items-start group">
                <p className="text-lg font-black text-slate-900 dark:text-white">99.9%</p>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">Uptime</p>
              </div>
              <div className="flex flex-col gap-1 items-center lg:items-start group">
                <p className="text-lg font-black text-slate-900 dark:text-white">24/7</p>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">Support</p>
              </div>
              <div className="flex flex-col gap-1 items-center lg:items-start group">
                <p className="text-lg font-black text-slate-900 dark:text-white">১৫০০+</p>
                <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider">Clients</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Video Thumbnail) */}
          <div className="flex w-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-lg lg:max-w-xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-slate-900/10 dark:bg-slate-900/40 mix-blend-multiply pointer-events-none transition-opacity group-hover:opacity-60 z-10" />
              <img
                src="/thumb.png"
                alt="Video Thumbnail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white text-blue-600">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 pl-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
