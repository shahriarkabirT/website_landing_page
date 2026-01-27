"use client"

import { useRef } from "react"
import { ShieldCheck, Headphones, Users } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white dark:bg-slate-950 min-h-[90vh] flex items-center"
    >
      {/* Background with Parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-32 w-full"
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
            className="text-5xl sm:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight max-w-4xl mx-auto"
          >
            মাত্র কয়েক মিনিটে আপনার <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent italic">
              ই-কমার্স সাইট
            </span>{" "}
            বুঝে নিন
          </motion.h1>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">
              শুরু মাত্র ১০০০ টাকা থেকে!
            </p>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
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
              href="#contact"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/25"
            >
              অর্ডার করুন
            </a>
            <a
              href="/features"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-lg font-bold border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all duration-300"
            >
              ফিচার গুলো দেখুন
            </a>
          </motion.div>

          {/* Social Proof / Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-800 mt-16"
          >
            <div className="flex items-center justify-center gap-3 group">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-slate-900 dark:text-white">99.9%</p>
                <p className="text-sm text-slate-500">Uptime Guarantee</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 group">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-slate-900 dark:text-white">24/7</p>
                <p className="text-sm text-slate-500">Support Available</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 group">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-slate-900 dark:text-white">১৫০০+</p>
                <p className="text-sm text-slate-500">Happy Clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
