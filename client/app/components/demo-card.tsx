"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Demo {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[];
    link?: string;
}

interface DemoCardProps {
    demo: Demo;
    isActive?: boolean;
    onClick: () => void;
    onReadMore: (e: React.MouseEvent) => void;
    getImageUrl: (url: string) => string;
}

export function DemoCard({ demo, isActive = true, onClick, onReadMore, getImageUrl }: DemoCardProps) {
    return (
        <motion.div
            layoutId={`demo-card-${demo._id}`}
            className={cn(
                "group relative bg-white dark:bg-slate-950 rounded-[1.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer flex flex-col transition-all duration-500",
                isActive ? "opacity-100 z-10" : "opacity-40 grayscale-[0.5] z-0",
                "md:opacity-100 md:grayscale-0",
                "hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-500/30"
            )}
            onClick={onClick}
        >
            {/* Image Container with Inner Shadow Effect */}
            <div className="relative aspect-[3/4] overflow-hidden w-full bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <Image
                    src={getImageUrl(demo.imageUrls?.[0])}
                    alt={demo.title}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                />

                {/* Internal Shadow Overlays for Depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Professional Hover Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100">
                    <div className="px-5 py-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20 flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">টেমপ্লেট দেখুন</span>
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-1 bg-white dark:bg-slate-950">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {demo.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {demo.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                    {demo.link ? (
                        <a
                            href={demo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                        </a>
                    ) : (
                        <div />
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onReadMore(e);
                        }}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 pb-0.5"
                    >
                        Read More
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
