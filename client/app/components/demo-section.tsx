"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Demo {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export default function DemoSection() {
    const [demos, setDemos] = useState<Demo[]>([]);
    const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDemos = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo`);
                if (res.ok) {
                    const data = await res.json();
                    setDemos(data);
                }
            } catch (error) {
                console.error("Failed to fetch demos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDemos();
    }, []);

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

    if (loading) {
        return <div className="py-24 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-slate-400" /></div>
    }

    if (demos.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        টেমপ্লেট দেখুন
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        আপনার প্রকল্পের জন্য প্রিমিয়াম টেমপ্লেট দেখুন এবং সিলেক্ট করুন।
                    </p>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {demos.map((demo) => (
                        <motion.div
                            key={demo._id}
                            layoutId={`demo-card-${demo._id}`}
                            className="group relative bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800 cursor-pointer flex flex-col"
                            onClick={() => setSelectedDemo(demo)}
                        >
                            {/* Image Preview */}
                            <div className="relative aspect-[3/4] overflow-hidden w-full">
                                <Image
                                    src={demo.imageUrl.startsWith("http") ? demo.imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${demo.imageUrl}`}
                                    alt={demo.title}
                                    fill
                                    unoptimized
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay Hint */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                                    <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-full font-medium text-sm flex items-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        View Demo <ArrowRight className="ml-2 w-4 h-4" />
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800">
                                <h3 className="text-lg font-bold mb-1">{demo.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {demo.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {selectedDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedDemo(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm border border-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDemo(null);
                            }}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Viewer Container */}
                        <motion.div
                            layoutId={`demo-card-${selectedDemo._id}`}
                            className={cn(
                                "relative transition-all duration-500 ease-in-out bg-white dark:bg-slate-950 overflow-hidden",
                                isZoomed
                                    ? "w-full h-full overflow-y-auto" // Zoom Mode: Full Width, Scrollable
                                    : "h-[85vh] aspect-[9/16] rounded-lg shadow-2xl overflow-hidden" // Fit Mode: Fits Height, Fixed Aspect
                            )}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent closing
                                setIsZoomed(!isZoomed); // Toggle Zoom
                            }}
                        >
                            {/* Controls Hint (only visible in Fit Mode) */}
                            {!isZoomed && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md pointer-events-none flex items-center gap-2">
                                    <ZoomIn className="w-3 h-3" /> Click to Zoom
                                </div>
                            )}

                            <div className={cn(
                                "relative w-full h-full",
                                isZoomed ? "" : "flex items-center justify-center p-0"
                            )}>
                                <Image
                                    src={selectedDemo.imageUrl.startsWith("http") ? selectedDemo.imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${selectedDemo.imageUrl}`}
                                    alt={selectedDemo.title}
                                    width={1400}
                                    height={4000} // This is arbitrary aspect for sizing, actual image aspect matters more
                                    priority
                                    unoptimized
                                    className={cn(
                                        "transition-all duration-500",
                                        isZoomed
                                            ? "w-full h-auto" // Full Width
                                            : "h-full w-auto object-contain" // Fit Height
                                    )}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
