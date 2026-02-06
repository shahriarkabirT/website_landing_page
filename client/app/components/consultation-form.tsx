"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Sparkles, Send, Loader2, MapPin, Phone, User, Mail } from "lucide-react"


export default function ConsultationForm() {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/consultation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("Request sent! We'll call you soon.")
                setForm({ name: "", phone: "", email: "", address: "" })
            } else {
                toast.error(data.error || "Failed to send request")
            }
        } catch (error) {
            toast.error("Network error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const bgElement = (
        <div className="w-full h-full relative opacity-50 dark:opacity-30 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/40 rounded-full mix-blend-multiply filter blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-100 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
    )

    return (
        <section
            className="py-12 md:py-24 bg-slate-50 dark:bg-slate-950/50 relative overflow-hidden"
            id="consultation"
        >
            {bgElement}
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-black uppercase tracking-wider">Expert Advice</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1]">
                            Get a Free <br />
                            <span className="text-blue-600">Consultation</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                            Confused about where to start? Speak with our experts and get a customized roadmap for your e-commerce journey.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-blue-600">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Call us</p>
                                    <p className="text-lg font-black text-slate-900 dark:text-white">+880 1XXX XXXXXX</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-[100px]" />

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        name="name"
                                        placeholder="e.g. Abir Khan"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        className="h-14 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        name="phone"
                                        placeholder="+880 1XXX XXXXXX"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        required
                                        className="h-14 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email (Optional)</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="you@email.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="h-14 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Address (Optional)</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input
                                            name="address"
                                            placeholder="e.g. Dhaka, BD"
                                            value={form.address}
                                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                                            className="h-14 pl-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-16 text-lg font-black rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-95 mt-4"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <span className="flex items-center gap-3">
                                        Submit Request <Send className="w-5 h-5" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
