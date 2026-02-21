"use client";

import { useState, useEffect } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import Link from "next/link";
import { DemoCard } from "./demo-card";
import { DemoOverlay } from "./demo-overlay";

interface Demo {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[];
    link?: string;
}

export default function DemoSection() {
    const [demos, setDemos] = useState<Demo[]>([]);
    const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    useEffect(() => {
        const fetchDemos = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo?limit=6`);
                if (res.ok) {
                    const result = await res.json();
                    setDemos(result.demos || []);
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
        if (!url) return "/placeholder.svg";
        if (url.startsWith("http")) return url;
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        return `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${url.startsWith('/') ? url : '/' + url}`;
    };

    if (loading) {
        return (
            <section id="demos" className="py-10 flex justify-center bg-slate-50 dark:bg-slate-900/50">
                <Loader2 className="animate-spin w-8 h-8 text-slate-400" />
            </section>
        )
    }

    return (
        <section id="demos" className="py-6 md:py-10 bg-slate-50 dark:bg-slate-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                        টেমপ্লেট দেখুন
                    </h2>
                    <p className="mt-4 text-sm text-muted-foreground">
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
                                demos.map((demo, index) => (
                                    <CarouselItem key={demo._id} className="pl-4 basis-[70%] md:basis-1/2 lg:basis-1/3">
                                        <DemoCard
                                            demo={demo}
                                            isActive={current === index}
                                            onClick={() => setSelectedDemo(demo)}
                                            getImageUrl={getImageUrl}
                                        />
                                    </CarouselItem>
                                ))
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

                <div className="mt-12 text-center">
                    <Link
                        href="/demos"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white font-bold transition-all hover:gap-4 shadow-xl hover:shadow-2xl"
                    >
                        অন্যান্য সকল টেমপ্লেট দেখুন <ArrowRight className="w-5 h-5 text-blue-500" />
                    </Link>
                </div>
            </div>

            <DemoOverlay
                selectedDemo={selectedDemo}
                setSelectedDemo={setSelectedDemo}
                isZoomed={isZoomed}
                setIsZoomed={setIsZoomed}
                currentImageIndex={current}
                setCurrentImageIndex={setCurrent}
                getImageUrl={getImageUrl}
            />
        </section>
    );
}
