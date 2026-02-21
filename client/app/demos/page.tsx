"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowLeft, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { DemoCard } from "../components/demo-card";
import { DemoOverlay } from "../components/demo-overlay";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Demo {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[];
    link?: string;
}

interface PaginatedResponse {
    demos: Demo[];
    page: number;
    pages: number;
    total: number;
}

export default function DemosPage() {
    const [data, setData] = useState<PaginatedResponse | null>(null);
    const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchDemos = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo?page=${page}&limit=12`);
                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                }
            } catch (error) {
                console.error("Failed to fetch demos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDemos();
    }, [page]);

    // Reset zoom when closing
    useEffect(() => {
        if (!selectedDemo) setIsZoomed(false);
    }, [selectedDemo]);

    // Lock body scroll when fullscreen
    useEffect(() => {
        if (selectedDemo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedDemo]);

    const getImageUrl = (url: string) => {
        if (!url) return "/placeholder.svg";
        if (url.startsWith("http")) return url;
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        return `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${url.startsWith('/') ? url : '/' + url}`;
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <div className="py-10">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            href="/"
                            className="p-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                সকল টেমপ্লেট
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                আমাদের সকল প্রিমিয়াম ডিজাইনের সংগ্রহ ({data?.total || 0} টি)
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {data && data.demos.length > 0 ? (
                                    data.demos.map((demo) => (
                                        <DemoCard
                                            key={demo._id}
                                            demo={demo}
                                            onClick={() => {
                                                setSelectedDemo(demo);
                                                setCurrentImageIndex(0);
                                            }}
                                            getImageUrl={getImageUrl}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center text-slate-500 bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-200 dark:border-slate-800 border-dashed">
                                        কোন টেমপ্লেট পাওয়া যায়নি।
                                    </div>
                                )}
                            </div>

                            {data && data.pages > 1 && (
                                <div className="mt-12">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (page > 1) setPage(page - 1);
                                                    }}
                                                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                />
                                            </PaginationItem>

                                            {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
                                                <PaginationItem key={p}>
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={page === p}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setPage(p);
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        {p}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}

                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (page < data.pages) setPage(page + 1);
                                                    }}
                                                    className={page === data.pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </>
                    )}

                    {/* Influence/CTA Section */}
                    {!loading && data && data.demos.length > 0 && (
                        <div className="mt-24 relative overflow-hidden rounded-[2.5rem] bg-slate-900 dark:bg-black p-8 md:p-16 text-center text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
                            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 backdrop-blur-md text-sm font-bold border border-slate-700 italic text-slate-300">
                                    <Sparkles className="w-4 h-4 text-emerald-400" /> আপনার পছন্দের টেমপ্লেটটি খুঁজে পেয়েছেন?
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                    আপনার স্বপ্নের ওয়েবসাইটটি <span className="text-blue-500">আজই শুরু করুন!</span>
                                </h2>
                                <p className="text-slate-400 text-lg md:text-xl font-medium">
                                    আমরা আপনার ব্যবসাকে অনলাইনে নিতে এবং প্রিমিয়াম ডিজাইনের মাধ্যমে গ্রাহকদের আকৃষ্ট করতে সাহায্য করতে প্রস্তুত।
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                    <Link
                                        href="/#contact"
                                        className="group relative flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl"
                                    >
                                        অর্ডার করতে যোগাযোগ করুন
                                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                    <Link
                                        href="/#consultation"
                                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full font-bold text-lg transition-all"
                                    >
                                        ফ্রি কনসালটেশন নিন
                                    </Link>
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-slate-500 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ৩ দিনে ডেলিভারি
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ২৪/৭ সাপোর্ট
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ১০০% স্যাটিসফ্যাকশন
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <DemoOverlay
                selectedDemo={selectedDemo}
                setSelectedDemo={setSelectedDemo}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
                getImageUrl={getImageUrl}
            />
        </main>
    );
}
