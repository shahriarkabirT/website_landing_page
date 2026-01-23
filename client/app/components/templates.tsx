"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  Laptop,
  Shirt,
  ShoppingBasket,
  Wine,
  Hammer,
  Sofa,
  Sparkles,
  Gamepad2,
  Library,
  Gem,
  ArrowRight
} from "lucide-react"

const categories = [
  { name: "Consumer Electronics", icon: Laptop, text: "Largest online revenue category (phones, laptops, gadgets) 🌐" },
  { name: "Fashion & Apparel", icon: Shirt, text: "Clothes, shoes, accessories 📦" },
  { name: "Food & Grocery", icon: ShoppingBasket, text: "Online grocery & food delivery demand 📦" },
  { name: "Beverages", icon: Wine, text: "Drinks, premium beverages 📦" },
  { name: "DIY, Hardware & Tools", icon: Hammer, text: "Home improvement supplies 📦" },
  { name: "Furniture & Home Decor", icon: Sofa, text: "Home furniture, décor items 📦" },
  { name: "Beauty & Personal Care", icon: Sparkles, text: "Skincare, makeup, toiletries 📦" },
  { name: "Toys & Hobby Products", icon: Gamepad2, text: "Games, hobbies & entertainment 📦" },
  { name: "Media & Entertainment", icon: Library, text: "Books, music, movies, games 📦" },
  { name: "Luxury Goods", icon: Gem, text: "Premium fashion & high-end products 📦" },
]

export default function Templates() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Demo Section
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose your category and see how your professional e-commerce store could look.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="flex animate-scroll hover:[animation-play-state:paused] gap-6 py-4">
            {[...categories, ...categories].map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 w-fit group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {category.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {category.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Full View Demo Integration */}
        <div className="mt-24 text-center">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative px-8 py-10 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Full View Landing Demo
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Explore our full library of high-converting e-commerce templates.
              </p>
              <a
                href="/demos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:gap-4 transition-all"
              >
                See more demos <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * 10 - 24px * 10)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: calc(320px * 20 + 24px * 20);
        }
      `}</style>
    </section>
  )
}
