"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface Demo {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[];
    link?: string;
}

interface DemoOverlayProps {
    selectedDemo: Demo | null;
    setSelectedDemo: (demo: Demo | null) => void;
    isZoomed: boolean;
    setIsZoomed: (isZoomed: boolean) => void;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
    getImageUrl: (url: string) => string;
}

export function DemoOverlay({
    selectedDemo,
    setSelectedDemo,
    isZoomed,
    setIsZoomed,
    currentImageIndex,
    setCurrentImageIndex,
    getImageUrl
}: DemoOverlayProps) {
    if (!selectedDemo) return null;

    return (
        <AnimatePresence>
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
                    className="absolute top-6 right-6 z-[60] p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-md border border-white/20 shadow-xl"
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
                                align: (selectedDemo.imageUrls?.length || 0) <= 2 ? "center" : "start",
                                loop: (selectedDemo.imageUrls?.length || 0) > 2,
                                containScroll: "trimSnaps",
                            }}
                            className="w-full max-w-[1400px] h-full mx-auto group/carousel"
                        >
                            <CarouselContent className={cn(
                                "h-[90vh] -ml-8",
                                (selectedDemo.imageUrls?.length || 0) <= 2 && "justify-center"
                            )}>
                                {(selectedDemo.imageUrls && selectedDemo.imageUrls.length > 0 ? selectedDemo.imageUrls : [""]).map((url, idx) => (
                                    <CarouselItem
                                        key={idx}
                                        className={cn(
                                            "h-full flex items-center justify-center basis-auto pl-8 py-8",
                                            (selectedDemo.imageUrls?.length || 0) === 1 && "basis-full"
                                        )}
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
                                                    setCurrentImageIndex(idx);
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

                            {(selectedDemo.imageUrls?.length || 0) > 1 && (
                                <>
                                    <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-md shadow-xl" />
                                    <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 z-20 h-14 w-14 bg-black/50 hover:bg-black/70 text-white border-white/20 backdrop-blur-md shadow-xl" />
                                </>
                            )}
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
                                src={getImageUrl(selectedDemo.imageUrls[currentImageIndex])}
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
        </AnimatePresence>
    );
}
