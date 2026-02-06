"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Loader2, Info, ArrowLeft, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

interface Demo {
    _id: string
    title: string
    imageUrl: string
}

interface OrderModalProps {
    planName: string
    planPrice: string
    isOpen: boolean
    onClose: () => void
    initialData?: {
        name?: string
        phone?: string
        email?: string
        businessName?: string
        address?: string
    }
}

export default function OrderModal({ planName, planPrice, isOpen, onClose, initialData }: OrderModalProps) {
    const [step, setStep] = useState(1) // 1: Template, 2: Details, 3: Payment
    const [demos, setDemos] = useState<Demo[]>([])
    const [loadingDemos, setLoadingDemos] = useState(true)
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

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
            setStep(1)
            fetchDemos()
            // Prioritize initialData, then user data, then empty
            setFormData(prev => ({
                ...prev,
                name: initialData?.name || user?.name || "",
                phone: initialData?.phone || "",
                email: initialData?.email || user?.email || "",
                businessName: initialData?.businessName || "",
            }))
        }
    }, [isOpen, initialData, user])

    const fetchDemos = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo`)
            const data = await res.json()
            setDemos(data)
        } catch (error) {
            console.error("Failed to fetch demos")
        } finally {
            setLoadingDemos(false)
        }
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
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 bg-white dark:bg-slate-900 w-[95vw] rounded-xl">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold font-bangla text-slate-900 dark:text-white">
                            {step === 1 ? "টেমপ্লেট নির্বাচন করুন" : step === 2 ? "আপনার তথ্য দিন" : "পেমেন্ট সম্পন্ন করুন"}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-500 font-bangla">
                            ধাপ {step} / ৩
                        </p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                        {planName} - {planPrice}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            {loadingDemos ? (
                                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                    {demos.map((demo) => (
                                        <div
                                            key={demo._id}
                                            onClick={() => setSelectedTemplate(demo._id)}
                                            className={`cursor-pointer rounded-lg md:rounded-xl border-2 overflow-hidden transition-all relative group ${selectedTemplate === demo._id
                                                ? "border-blue-600 ring-2 md:ring-4 ring-blue-600/10"
                                                : "border-slate-200 dark:border-slate-800 hover:border-blue-400"
                                                }`}
                                        >
                                            <div className="aspect-[3/4] relative bg-slate-100">
                                                <Image
                                                    src={getImageUrl(demo.imageUrl)}
                                                    alt={demo.title}
                                                    fill
                                                    className="object-cover object-top"
                                                    unoptimized
                                                />
                                                {selectedTemplate === demo._id && (
                                                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                                                        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                                                            <Check className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-2 md:p-3 bg-white dark:bg-slate-950">
                                                <p className="font-bold text-xs md:text-sm truncate">{demo.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                                        <span className="font-mono font-bold text-lg">01744496737</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border">
                                        <span className="font-bold text-orange-600">Nagad Personal</span>
                                        <span className="font-mono font-bold text-lg">01744496737</span>
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
                                            <a href="tel:01744496737" className="block p-4 bg-green-50 text-green-700 font-bold text-xl rounded-xl">
                                                01744496737
                                            </a>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between bg-slate-50/50 dark:bg-slate-900/50">
                    <Button
                        variant="ghost"
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className="font-bangla"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> ফিরে যান
                    </Button>

                    {step < 3 ? (
                        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 font-bangla">
                            পরবর্তী ধাপ <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={submitting} className="bg-green-600 hover:bg-green-700 font-bangla">
                            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            অর্ডার নিশ্চিত করুন
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
