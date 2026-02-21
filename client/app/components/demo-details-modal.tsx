"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { ExternalLink, ShoppingCart } from "lucide-react";

interface Demo {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[];
    link?: string;
}

interface DemoDetailsModalProps {
    demo: Demo | null;
    isOpen: boolean;
    onClose: () => void;
    getImageUrl: (url: string) => string;
    onOrder?: (demo: Demo) => void;
}

export function DemoDetailsModal({ demo, isOpen, onClose, getImageUrl, onOrder }: DemoDetailsModalProps) {
    if (!demo) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[1000px] w-[95vw] max-h-[95vh] md:max-h-[90vh] overflow-y-auto p-0 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl">
                <div className="flex flex-col md:flex-row min-h-full">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative aspect-video md:aspect-auto h-auto md:h-full min-h-[200px] md:min-h-[400px] bg-slate-100 dark:bg-slate-900">
                        <Image
                            src={getImageUrl(demo.imageUrls?.[0])}
                            alt={demo.title}
                            fill
                            className="object-cover object-top"
                            unoptimized
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.1)] pointer-events-none" />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white dark:bg-slate-950">
                        <div className="space-y-6">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                                    {demo.title}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                    Project Description
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    {demo.description}
                                </p>
                            </div>

                            {demo.link && (
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                                        Live Preview
                                    </h4>
                                    <a
                                        href={demo.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                                    >
                                        Visit Website
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => {
                                    onClose();
                                    if (onOrder) onOrder(demo);
                                }}
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                অর্ডার করুন
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
