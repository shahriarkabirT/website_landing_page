"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Loader2, Info, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

interface Demo {
    _id: string
    title: string
    imageUrls: string[]
}

interface OrderModalProps {
    planName: string
    planPrice: string
    isOpen: boolean
    onClose: () => void
    initialTemplateId?: string | null
    initialData?: {
        name?: string
        phone?: string
        email?: string
        businessName?: string
        address?: string
    }
}

export default function OrderModal({ planName, planPrice, isOpen, onClose, initialData, initialTemplateId }: OrderModalProps) {
    const [step, setStep] = useState(1) // 1: Template, 2: Details, 3: Payment
    const [demos, setDemos] = useState<Demo[]>([])
    const [loadingDemos, setLoadingDemos] = useState(true)
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        businessName: "",
        transactionId: ""
    })

    const { user } = useAuth() // Use auth context

    useEffect(() => {
        if (isOpen) {
            if (initialTemplateId) {
                setStep(2)
                setSelectedTemplate(initialTemplateId)
            } else {
                setStep(1)
                setPage(1)
                fetchDemos(1)
            }

            // Prioritize initialData, then user data, then empty
            setFormData(prev => ({
                ...prev,
                name: initialData?.name || user?.name || "",
                phone: initialData?.phone || user?.phone || "",
                email: initialData?.email || user?.email || "",
                businessName: initialData?.businessName || "",
            }))
        }
    }, [isOpen, initialData, user, initialTemplateId])

    const fetchDemos = async (pageToFetch: number) => {
        setLoadingDemos(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo?page=${pageToFetch}&limit=6`)
            const result = await res.json()
            if (Array.isArray(result.demos)) {
                setDemos(result.demos)
                setTotalPages(result.pages || 1)
            } else if (Array.isArray(result)) {
                setDemos(result)
            }
        } catch (error) {
            console.error("Failed to fetch demos:", error)
        } finally {
            setLoadingDemos(false)
        }
    }

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return
        setPage(newPage)
        fetchDemos(newPage)
    }

    const handleNext = () => {
        if (step === 1 && !selectedTemplate) {
            toast.error("অনুগ্রহ করে একটি টেমপ্লেট নির্বাচন করুন") // Please select a template
            return
        }
        if (step === 2) {
            if (!formData.name.trim()) {
                toast.error("অনুগ্রহ করে আপনার নাম দিন")
                return
            }
            const phoneRegex = /^01[3-9]\d{8}$/
            if (!phoneRegex.test(formData.phone)) {
                toast.error("অনুগ্রহ করে সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)")
                return
            }
            if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                toast.error("অনুগ্রহ করে সঠিক ইমেইল দিন")
                return
            }
        }
        setStep(step + 1)
    }

    const handleSubmit = async () => {
        if (!formData.transactionId || formData.transactionId.length < 8) {
            toast.error("সঠিক ট্রানজ্যাকশন আইডি দিন (কমপক্ষে ৮ অক্ষর)")
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    subscriptionType: planName,
                    amount: planPrice,
                    templateId: selectedTemplate,
                    paymentMethod: "Manual/Bkash/Nagad"
                })
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("অর্ডার সফলভাবে জমা দেওয়া হয়েছে!") // Order submitted successfully
                onClose()
            } else {
                toast.error(data.message || "অর্ডার জমা দিতে ব্যর্থ হয়েছে") // Failed to submit order
            }
        } catch (error) {
            toast.error("ত্রুটি ঘটেছে") // Error occurred
        } finally {
            setSubmitting(false)
        }
    }

    // Helper for image URL
    const getImageUrl = (url: string) => {
        if (!url) return ""
        if (url.startsWith("http")) return url
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        return `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${url.startsWith('/') ? url : '/' + url}`;
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[1400px] w-[95vw] max-h-[96vh] md:max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                {/* Header */}
                <div className="p-4 md:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
                    <div>
                        <h2 className="text-lg md:text-2xl font-black font-bangla text-slate-900 dark:text-white">
                            {step === 1 ? "পছন্দের টেমপ্লেট" : step === 2 ? "আপনার তথ্য" : "পেমেন্ট সম্পন্ন করুন"}
                        </h2>
                        <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest mt-0.5 md:mt-1">
                            Step {step} of 3
                        </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black border border-indigo-100 dark:border-indigo-800/50">
                        {planName}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/30 dark:bg-slate-900/30">
                    {step === 1 && (
                        <div className="space-y-8">
                            {loadingDemos ? (
                                <div className="flex flex-col items-center justify-center py-32 gap-4">
                                    <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
                                    <p className="text-slate-400 font-bold animate-pulse">টেমপ্লেটগুলো লোড হচ্ছে...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                        {demos.map((demo) => (
                                            <div
                                                key={demo._id}
                                                onClick={() => setSelectedTemplate(demo._id)}
                                                className={`group cursor-pointer rounded-2xl border-2 overflow-hidden transition-all relative aspect-[3/4] bg-white dark:bg-slate-950 ${selectedTemplate === demo._id
                                                    ? "border-indigo-600 ring-4 ring-indigo-600/10 shadow-2xl scale-[1.02]"
                                                    : "border-transparent hover:border-indigo-300 dark:hover:border-indigo-800 shadow-sm"
                                                    }`}
                                            >
                                                <Image
                                                    src={getImageUrl(demo.imageUrls?.[0])}
                                                    alt={demo.title}
                                                    fill
                                                    className={`object-cover object-top transition-all duration-700 ${selectedTemplate === demo._id ? "scale-105" : "group-hover:scale-105"}`}
                                                    unoptimized
                                                />

                                                {/* Selection Overlay */}
                                                <div className={`absolute inset-0 transition-opacity duration-300 ${selectedTemplate === demo._id ? "bg-indigo-600/10" : "bg-black/0 group-hover:bg-black/5"}`} />

                                                {/* Selected Badge */}
                                                {selectedTemplate === demo._id && (
                                                    <div className="absolute top-3 right-3 bg-indigo-600 text-white p-2 rounded-full shadow-xl animate-in zoom-in-50 duration-300">
                                                        <Check className="w-4 h-4" />
                                                    </div>
                                                )}

                                                {/* Hover Visuals (Optional subtle title) */}
                                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <p className="text-white text-[10px] font-black uppercase tracking-widest truncate">{demo.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination UI for Templates */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-6 mt-12 py-6 border-t border-slate-100 dark:border-slate-800">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(page - 1)}
                                                disabled={page === 1}
                                                className="rounded-xl px-6 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all gap-2"
                                            >
                                                <ChevronLeft className="w-4 h-4" /> আগের গুলো
                                            </Button>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-black text-indigo-600">{page}</span>
                                                <span className="text-sm font-bold text-slate-300">/</span>
                                                <span className="text-sm font-bold text-slate-500">{totalPages}</span>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handlePageChange(page + 1)}
                                                disabled={page === totalPages}
                                                className="rounded-xl px-6 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all gap-2"
                                            >
                                                পরের গুলো <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="max-w-md mx-auto space-y-4 py-4">
                            <div className="space-y-2">
                                <Label className="font-bangla">আপনার নাম (আবশ্যক)</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="আপনার পুরো নাম"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bangla">ফোন নম্বর (আবশ্যক)</Label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="017..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bangla">ইমেইল (ঐচ্ছিক)</Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="example@mail.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="font-bangla">ব্র্যান্ড নেম (ঐচ্ছিক)</Label>
                                <Input
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    placeholder="আপনার ব্যবসার নাম"
                                />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="max-w-lg mx-auto space-y-6 py-4">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
                                <h3 className="font-bold text-lg font-bangla">নিচের নম্বরে পেমেন্ট করুন</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border">
                                        <span className="font-bold text-pink-600">bKash Personal</span>
                                        <span className="font-mono font-bold text-lg">01795148792</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border">
                                        <span className="font-bold text-orange-600">Nagad Personal</span>
                                        <span className="font-mono font-bold text-lg">01795148792</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="font-bangla">TrxID (ট্রানজ্যাকশন আইডি)</Label>
                                <Input
                                    value={formData.transactionId}
                                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                    placeholder="Example: 9G7F4..."
                                    className="uppercase font-mono text-center tracking-widest text-lg h-12"
                                />
                            </div>

                            <div className="flex justify-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="link" className="text-blue-600 font-bangla gap-2">
                                            <Info className="w-4 h-4" /> সাহায্য প্রয়োজন?
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <div className="text-center py-6 space-y-4">
                                            <h3 className="font-bold text-xl font-bangla">আমাদের কল করুন</h3>
                                            <p className="text-slate-500 font-bangla">যেকোনো সমস্যায় আমাদের সাপোর্ট নাম্বারে কল করুন।</p>
                                            <a href="tel:01795148792" className="block p-4 bg-green-50 text-green-700 font-bold text-xl rounded-xl">
                                                01795148792
                                            </a>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 md:p-8 border-t border-slate-100 dark:border-slate-800 flex justify-between bg-white dark:bg-slate-900">
                    <Button
                        variant="ghost"
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className="font-bangla text-xs md:text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> ফিরে যান
                    </Button>

                    {step < 3 ? (
                        <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 font-bangla text-xs md:text-sm px-6 md:px-8">
                            পরবর্তী ধাপ <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={submitting} className="bg-emerald-600 hover:bg-emerald-700 font-bangla text-xs md:text-sm px-6 md:px-8">
                            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            অর্ডার নিশ্চিত করুন
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
