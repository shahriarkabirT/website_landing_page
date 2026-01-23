"use client"

import { ShieldCheck, Zap, Globe, MessageSquare, BarChart, Lock } from "lucide-react"
import Navbar from "../components/navbar"

const features = [
    {
        title: "Instant Setup",
        description: "Get your store up and running in minutes, not days.",
        icon: Zap,
        color: "text-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
        title: "Free Hosting & SSL",
        description: "Never worry about hosting charges or security certificates.",
        icon: ShieldCheck,
        color: "text-green-500",
        bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
        title: "Global Reach",
        description: "Sell anywhere with a fully responsive and optimized site.",
        icon: Globe,
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        title: "Customer Support",
        description: "24/7 dedicated support to help you grow your business.",
        icon: MessageSquare,
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
        title: "Dynamic Admin Panel",
        description: "Manage orders, users, and payments with ease.",
        icon: BarChart,
        color: "text-indigo-500",
        bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
        title: "Secure Payments",
        description: "Integrated secure payment gateways for your peace of mind.",
        icon: Lock,
        color: "text-red-500",
        bg: "bg-red-50 dark:bg-red-900/20",
    },
]

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950">
            <Navbar />
            <div className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white">
                            Our Premium Features
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Everything you need to launch and scale your e-commerce business in Bangladesh.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-10 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className={`p-4 rounded-2xl ${feature.bg} ${feature.color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 p-12 rounded-[3rem] bg-blue-600 text-center text-white">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to get started?</h2>
                        <p className="text-blue-100 mb-10 text-lg max-w-xl mx-auto">
                            Join 1500+ happy clients and build your dream store today.
                        </p>
                        <a
                            href="/#contact"
                            className="inline-block px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg hover:scale-105 transition-transform"
                        >
                            Claim Your Offer Now
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
