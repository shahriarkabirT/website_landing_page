"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { CreditCard, Lock, ShieldCheck, CheckCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

function CheckoutContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Plan details from URL
    const planId = searchParams.get("planId")
    const planName = searchParams.get("planName")
    const planPrice = searchParams.get("planPrice")
    const planPeriod = searchParams.get("planPeriod")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvc, setCvc] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            setName(prev => prev || user.name || "")
            setEmail(prev => prev || user.email || "")
        }
    }, [user])

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    planId,
                    planName,
                    planPrice,
                    planPeriod,
                    paymentDetails: {
                        toggle: "mock_token" // Don't send real card data
                    }
                }),
            })

            const data = await res.json()

            if (res.ok) {
                setSuccess(true)
                toast.success("Payment successful! Check your email.")
            } else {
                toast.error(data.message || "Payment failed")
            }
        } catch (error) {
            toast.error("An error occurred during checkout")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-20">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 text-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Payment Successful!</h2>
                    <p className="text-slate-500 mb-8 text-lg">
                        We've created your account and sent a login link to <strong>{email}</strong>.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl mb-8">
                        <p className="text-sm text-slate-500 mb-2">Order Summary</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">{planName || "Subscription"}</p>
                        <p className="text-blue-600 font-bold">{planPrice || "$0"} <span className="text-sm font-normal text-slate-400">/ {planPeriod || "month"}</span></p>
                    </div>
                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-all"
                    >
                        Go to Login
                    </Button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-20">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Secure Checkout</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Complete Order</h1>
                    <div className="flex items-center justify-between mt-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">{planName || "Selected Plan"}</p>
                            <p className="text-sm text-slate-500">{planPeriod || "Billing Cycle"}</p>
                        </div>
                        <p className="text-xl font-black text-blue-600">{planPrice || "-"}</p>
                    </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-8">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">1</span>
                            Contact Information
                        </h3>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    required
                                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">2</span>
                            Payment Details
                        </h3>
                        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                    Card Number
                                    <div className="flex gap-2 text-slate-400">
                                        <CreditCard className="w-4 h-4" />
                                    </div>
                                </label>
                                <Input
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    placeholder="0000 0000 0000 0000"
                                    // required // Mock - optional for now
                                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Expiry</label>
                                    <Input
                                        value={expiry}
                                        onChange={(e) => setExpiry(e.target.value)}
                                        placeholder="MM/YY"
                                        // required
                                        className="h-12 rounded-xl bg-white dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">CVC</label>
                                    <Input
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value)}
                                        placeholder="123"
                                        // required
                                        className="h-12 rounded-xl bg-white dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-2">
                            <Lock className="w-3 h-3" />
                            <span>Payments are secure and encrypted</span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02]"
                    >
                        {loading ? "Processing..." : `Pay ${planPrice || ""} & Subscribe`}
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
