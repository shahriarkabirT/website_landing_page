"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

interface Demo {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[];
}

export default function DemoSection() {
    const [demos, setDemos] = useState<Demo[]>([]);
    const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

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

    const getImageUrl = (url: string) => {
        if (!url) return "/placeholder.svg"; // Fallback placeholder
        if (url.startsWith("http")) return url;
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        return `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${url.startsWith('/') ? url : '/' + url}`;
    };

    if (loading) {
        return (
            <section id="demos" className="py-24 flex justify-center bg-slate-50 dark:bg-slate-900/50">
                <Loader2 className="animate-spin w-8 h-8 text-slate-400" />
            </section>
        )
    }

    return (
        <section id="demos" className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        টেমপ্লেট দেখুন
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground">
                        আপনার প্রকল্পের জন্য প্রিমিয়াম টেমপ্লেট দেখুন এবং সিলেক্ট করুন।
                    </p>
                </div>

                {/* Carousel Slider */}
                <div className="relative">
                    <Carousel
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        setApi={setApi}
                        className="w-full max-w-[95vw] md:max-w-6xl mx-auto"
                    >
                        <CarouselContent className="-ml-4 py-8">
                            {demos.length > 0 ? (
                                demos.map((demo, index) => {
                                    const isActive = current === index;
                                    return (
                                        <CarouselItem key={demo._id} className="pl-4 basis-[70%] md:basis-1/2 lg:basis-1/3">
                                            <motion.div
                                                layoutId={`demo-card-${demo._id}`}
                                                className={cn(
                                                    "group relative bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 cursor-pointer flex flex-col transition-all duration-500 h-full",
                                                    isActive ? "scale-100 opacity-100 ring-2 ring-blue-500/50 z-10" : "scale-90 opacity-60 z-0",
                                                    "md:scale-100 md:opacity-100 md:ring-0 md:z-0",
                                                    "hover:shadow-2xl hover:scale-[1.02] hover:opacity-100"
                                                )}
                                                onClick={() => setSelectedDemo(demo)}
                                            >
                                                <div className="relative aspect-[3/4] overflow-hidden w-full">
                                                    <Image
                                                        src={getImageUrl(demo.imageUrls?.[0])}
                                                        alt={demo.title}
                                                        fill
                                                        unoptimized
                                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                                                        <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-full font-medium text-sm flex items-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                            View Demo <ArrowRight className="ml-2 w-4 h-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800">
                                                    <h3 className="text-lg font-bold mb-1">{demo.title}</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {demo.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </CarouselItem>
                                    );
                                })
                            ) : (
                                <CarouselItem className="basis-full">
                                    <div className="py-12 text-center text-slate-500 bg-white dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                        টেমপ্লেটগুলো শীঘ্রই আসছে।
                                    </div>
                                </CarouselItem>
                            )}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-4 lg:-left-12" />
                            <CarouselNext className="-right-4 lg:-right-12" />
                        </div>
                    </Carousel>
                </div>
            </div>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {selectedDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={() => {
                            if (isZoomed) {
                                setIsZoomed(false);
                            } else {
                                setSelectedDemo(null);
                            }
                        }}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 z-[60] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md border border-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isZoomed) {
                                    setIsZoomed(false);
                                } else {
                                    setSelectedDemo(null);
                                }
                            }}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Gallery Mode (Carousel) */}
                        {!isZoomed && (
                            <motion.div
                                layoutId={`demo-card-${selectedDemo._id}`}
                                className="h-screen w-screen flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Carousel
                                    opts={{
                                        align: "center",
                                        loop: true,
                                    }}
                                    className="w-full max-w-[1400px] h-full mx-auto group/carousel"
                                >
                                    <CarouselContent className="h-[90vh] -ml-8">
                                        {(selectedDemo.imageUrls && selectedDemo.imageUrls.length > 0 ? selectedDemo.imageUrls : [""]).map((url, idx) => (
                                            <CarouselItem
                                                key={idx}
                                                className="h-full flex items-center justify-center basis-auto pl-8 py-8"
                                            >
                                                <div className="relative h-full flex items-center justify-center group/item">
                                                    <Image
                                                        src={getImageUrl(url)}
                                                        alt={`${selectedDemo.title} ${idx + 1}`}
                                                        width={1400}
                                                        height={4000}
                                                        priority
                                                        unoptimized
                                                        className="h-full w-auto object-contain shadow-2xl rounded-2xl cursor-zoom-in transition-transform duration-500 hover:scale-[1.02] bg-slate-100 dark:bg-slate-900"
                                                        onClick={() => {
                                                            setCurrent(idx); // Track which image we clicked
                                                            setIsZoomed(true);
                                                        }}
                                                    />
                                                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                        <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2">
                                                            <ZoomIn className="w-3 h-3" /> Click to View Full Site
                                                        </span>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md" />
                                    <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md" />
                                </Carousel>

                                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md pointer-events-none border border-white/10">
                                    Browse Templates
                                </div>
                            </motion.div>
                        )}

                        {/* Zoomed Mode (Website View) */}
                        {isZoomed && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-slate-950"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="w-full min-h-screen">
                                    <Image
                                        src={getImageUrl(selectedDemo.imageUrls[current])}
                                        alt={selectedDemo.title}
                                        width={1920}
                                        height={5000}
                                        priority
                                        unoptimized
                                        className="w-full h-auto cursor-zoom-out"
                                        onClick={() => setIsZoomed(false)}
                                    />
                                </div>
                                <button
                                    className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-2"
                                    onClick={() => setIsZoomed(false)}
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" /> Back to Gallery
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
