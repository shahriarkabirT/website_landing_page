"use client"

import { Laptop, ShoppingCart, CreditCard, LayoutDashboard, BarChart3, Search, Zap, Headphones, Settings, ShieldCheck, Box, Users, Repeat, Truck, MessageSquare, Tag, FileText, Share2, Globe, Database, Lock, Cloud } from "lucide-react"
import Navbar from "../components/navbar"
import { motion } from "framer-motion"

const featureCategories = [
    {
        title: "কোর প্ল্যাটফর্ম ফিচার",
        description: "আপনার ব্যবসার ভিত্তি মজবুত করতে প্রয়োজনীয় সব টুলস।",
        features: [
            {
                title: "প্রোডাক্ট ভেরিয়েন্ট",
                description: "কালার, সাইজ, ওজনসহ বিভিন্ন ভেরিয়েন্ট ম্যানেজ করার সুবিধা।",
                icon: Tag,
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
                title: "অ্যাডভান্সড ইনভেন্টরি",
                description: "স্টক ট্র্যাকিং এবং অটোমেটেড স্টক অ্যালার্ট সিস্টেম।",
                icon: Box,
                color: "text-purple-600",
                bg: "bg-purple-50 dark:bg-purple-900/20",
            },
            {
                title: "মাল্টি-লেভেল ক্যাটাগরি",
                description: "পণ্য সাজাতে ক্যাটাগরি, সাব-ক্যাটাগরি এবং ব্র্যান্ড ম্যানেজমেন্ট।",
                icon: LayoutDashboard,
                color: "text-pink-600",
                bg: "bg-pink-50 dark:bg-pink-900/20",
            },
            {
                title: "কাস্টমার অ্যাকাউন্ট",
                description: "কাস্টমার প্রোফাইল, অর্ডার হিস্ট্রি এবং উইশলিস্ট সুবিধা।",
                icon: Users,
                color: "text-orange-600",
                bg: "bg-orange-50 dark:bg-orange-900/20",
            },
        ]
    },
    {
        title: "অর্ডার ও ডেলিভারি",
        description: "অর্ডার প্রসেসিং এবং ডেলিভারি ম্যানেজমেন্ট এখন আরও সহজ।",
        features: [
            {
                title: "অটোমেটেড ইনভয়েস",
                description: "অর্ডার প্লেস হওয়ার সাথে সাথে অটো-জেনারেটেড পিডিএফ ইনভয়েস।",
                icon: FileText,
                color: "text-green-600",
                bg: "bg-green-50 dark:bg-green-900/20",
            },
            {
                title: "কুরিয়ার ইন্টিগ্রেশন",
                description: "পাঠাও, রেডএক্স এবং স্টেডফাস্ট কুরিয়ার এপিআই সাপোর্ট।",
                icon: Truck,
                color: "text-cyan-600",
                bg: "bg-cyan-50 dark:bg-cyan-900/20",
            },
            {
                title: "অর্ডার ট্র্যাকিং",
                description: "কাস্টমাররা তাদের অর্ডারের বর্তমান অবস্থা ট্র্যাক করতে পারবে।",
                icon: Search,
                color: "text-yellow-600",
                bg: "bg-yellow-50 dark:bg-yellow-900/20",
            },
            {
                title: "SMS নোটিফিকেশন",
                description: "অর্ডার স্ট্যাটাস আপডেটের সাথে সাথে কাস্টমার পাবে SMS।",
                icon: MessageSquare,
                color: "text-indigo-600",
                bg: "bg-indigo-50 dark:bg-indigo-900/20",
            },
        ]
    },
    {
        title: "মার্কেটিং ও গ্রোথ",
        description: "বিক্রয় বৃদ্ধিতে সহায়ক অত্যাধুনিক মার্কেটিং টুলস।",
        features: [
            {
                title: "কুপন ও ডিসকাউন্ট",
                description: "প্রোমো কোড, ফ্ল্যাশ সেল এবং ডিসকাউন্ট ক্যাম্পেইন তৈরি করুন।",
                icon: Tag,
                color: "text-red-600",
                bg: "bg-red-50 dark:bg-red-900/20",
            },
            {
                title: "ফেইসবুক পিক্সেল",
                description: "ফেসবুক অ্যাডের জন্য পিক্সেল এবং কনভার্সন এপিআই সেটআপ।",
                icon: Share2,
                color: "text-blue-600",
                bg: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
                title: "সোশ্যাল শেয়ার",
                description: "প্রোডাক্ট এবং পেজ শেয়ার করার জন্য বিল্ট-ইন বাটন।",
                icon: Globe,
                color: "text-sky-600",
                bg: "bg-sky-50 dark:bg-sky-900/20",
            },
            {
                title: "রিভিউ ও রেটিং",
                description: "প্রোডাক্ট রিভিউ এবং রেটিং সিস্টেম কাস্টমার ট্রাস্ট বাড়ায়।",
                icon: MessageSquare,
                color: "text-emerald-600",
                bg: "bg-emerald-50 dark:bg-emerald-900/20",
            },
        ]
    },
    {
        title: "টেকনিক্যাল ও সিকিউরিটি",
        description: "আপনার ব্যবসার নিরাপত্তা এবং পারফরম্যান্স আমাদের দায়িত্ব।",
        features: [
            {
                title: "কাস্টম ডোমেইন",
                description: "আপনার নিজের ডোমেইন (.com/.com.bd) কানেক্ট করার সুবিধা।",
                icon: Globe,
                color: "text-violet-600",
                bg: "bg-violet-50 dark:bg-violet-900/20",
            },
            {
                title: "SSL সিকিউরিটি",
                description: "কাস্টমার ডাটা সুরক্ষিত রাখতে ফ্রি SSL সার্টিফিকেট।",
                icon: Lock,
                color: "text-rose-600",
                bg: "bg-rose-50 dark:bg-rose-900/20",
            },
            {
                title: "ডেইলি ব্যাকআপ",
                description: "আপনার ডাটা হারানোর ভয় নেই, থাকছে অটোমেটেড ব্যাকআপ।",
                icon: Database,
                color: "text-teal-600",
                bg: "bg-teal-50 dark:bg-teal-900/20",
            },
            {
                title: "সুপার ফাস্ট CDN",
                description: "বিশ্বের যেকোনো প্রান্ত থেকে দ্রুততম লোডিং স্পিড।",
                icon: Cloud,
                color: "text-amber-600",
                bg: "bg-amber-50 dark:bg-amber-900/20",
            },
        ]
    }
]

export default function FeaturesContent() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-12 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs font-bold mb-4">
                            🚀 সম্পূর্ণ ফিচার লিস্ট
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                            একটি পরিপূর্ণ ই-কমার্স সলিউশন <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                আপনার ব্যবসার জন্য
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
                            ছোট উদ্যোগ থেকে বড় ব্র্যান্ড - সবার জন্যই আমাদের আছে প্রয়োজনীয় সব ফিচার। বিস্তারিত দেখে নিন নিচে।
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Feature Categories */}
            <div className="py-8 bg-white dark:bg-slate-900 rounded-t-[2.5rem] border-t border-slate-200 dark:border-slate-800 relative z-20">
                <div className="mx-auto max-w-7xl px-4 pt-8 space-y-12">
                    {featureCategories.map((category, catIndex) => (
                        <div key={catIndex}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-8"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{category.title}</h2>
                                <p className="text-base text-slate-500 dark:text-slate-400">{category.description}</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {category.features.map((feature, featureIndex) => (
                                    <motion.div
                                        key={featureIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: featureIndex * 0.05 }}
                                        whileHover={{ y: -5 }}
                                        className="group p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                                    >
                                        <div className={`w-10 h-10 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-12 p-8 rounded-[2rem] bg-gradient-to-br from-blue-600 to-purple-700 text-center text-white relative overflow-hidden shadow-xl"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-black mb-4">ব্যবসা শুরু করতে প্রস্তুত?</h2>
                            <p className="text-blue-100 mb-6 text-lg max-w-xl mx-auto">
                                মাত্র ১০০০ টাকায় আজই আপনার ই-কমার্স ওয়েবসাইট তৈরি করুন।
                            </p>
                            <a
                                href="/#contact"
                                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
                            >
                                অর্ডার করুন
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
