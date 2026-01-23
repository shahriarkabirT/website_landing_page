"use client"

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
import Navbar from "../components/navbar"

const demos = [
    { name: "Consumer Electronics", icon: Laptop, text: "Phones, laptops, gadgets & more. Optimized for specs and comparisons." },
    { name: "Fashion & Apparel", icon: Shirt, text: "Premium clothing store with size guides and variant selections." },
    { name: "Food & Grocery", icon: ShoppingBasket, text: "Fast delivery focused setup for daily essentials." },
    { name: "Beverages", icon: Wine, text: "Elegant presentation for drinks and premium beverages." },
    { name: "DIY, Hardware & Tools", icon: Hammer, text: "Sturdy layout for tools and home improvement supplies." },
    { name: "Furniture & Home Decor", icon: Sofa, text: "Visual-first design for home furniture and décor items." },
    { name: "Beauty & Personal Care", icon: Sparkles, text: "Glamorous design for skincare, makeup, and toiletries." },
    { name: "Toys & Hobby Products", icon: Gamepad2, text: "Playful interface for games, hobbies & entertainment." },
    { name: "Media & Entertainment", icon: Library, text: "Clean layout for books, music, movies, and digital products." },
    { name: "Luxury Goods", icon: Gem, text: "High-end aesthetic for premium products and fashion." },
]

export default function DemosPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white">
                            Explore All Demos
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Find the perfect layout for your niche. All demos are fully customizable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {demos.map((demo, index) => (
                            <div
                                key={index}
                                className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                                    <div className="p-6 rounded-[1.5rem] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                        <demo.icon className="w-12 h-12" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                                            {demo.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                            {demo.text}
                                        </p>
                                        <a
                                            href="#contact"
                                            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all"
                                        >
                                            Select this demo <ArrowRight className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
