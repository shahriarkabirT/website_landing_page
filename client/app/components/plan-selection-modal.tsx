"use client"

import { useEffect, useState } from "react"
import { Check, Loader2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Plan {
    _id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlight?: boolean;
}

interface PlanSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectPlan: (plan: Plan) => void;
}

export function PlanSelectionModal({ isOpen, onClose, onSelectPlan }: PlanSelectionModalProps) {
    const [plans, setPlans] = useState<Plan[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isOpen) return;

        const fetchPlans = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/plans`)
                const data = await res.json()
                setPlans(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error("Failed to fetch plans", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPlans()
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[1200px] w-[95vw] max-h-[95vh] overflow-y-auto p-4 md:p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl">
                <DialogHeader className="mb-4 md:mb-8">
                    <DialogTitle className="text-xl md:text-3xl font-black text-center text-slate-900 dark:text-white">
                        আপনার প্যাকেজটি নির্বাচন করুন
                    </DialogTitle>
                    <p className="text-center text-slate-500 dark:text-slate-400 mt-1 md:mt-2 text-xs md:text-base">
                        আপনার ব্যবসার জন্য সঠিক সাবস্ক্রিপশন প্ল্যানটি বেছে নিন
                    </p>
                </DialogHeader>

                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                        <p className="text-slate-400 font-bold animate-pulse">প্যাকেজগুলো লোড হচ্ছে...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {plans.map((plan) => (
                            <div
                                key={plan._id}
                                onClick={() => onSelectPlan(plan)}
                                className={cn(
                                    "relative p-5 md:p-6 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col h-full",
                                    plan.highlight
                                        ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/10 shadow-xl shadow-indigo-500/10"
                                        : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700"
                                )}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                                        Best Value
                                    </div>
                                )}

                                <div className="mb-3 md:mb-4">
                                    <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                        {plan.name}
                                    </h3>
                                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-4 md:mb-6 flex items-baseline gap-1">
                                    <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                                    <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">/ {plan.period}</span>
                                </div>

                                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1">
                                    {plan.features.slice(0, 5).map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-0.5 shrink-0">
                                                <Check className="w-2 md:w-2.5 h-2 md:h-2.5 text-emerald-600" />
                                            </div>
                                            <span className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400 font-medium leading-tight">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button className={cn(
                                    "w-full py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg",
                                    plan.highlight
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20"
                                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-slate-200 dark:shadow-none"
                                )}>
                                    প্যাকেজটি বেছে নিন
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && plans.length === 0 && (
                    <div className="py-12 text-center text-slate-400 font-medium italic">
                        প্যাকেজ তথ্য খুঁজে পাওয়া যায়নি। অনুগ্রহ করে পরে চেষ্টা করুন।
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
