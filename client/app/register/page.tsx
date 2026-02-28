"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

function RegisterForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [referralCode, setReferralCode] = useState("")
    const [otp, setOtp] = useState("")
    const [step, setStep] = useState(1) // 1: Info, 2: OTP
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth()

    useEffect(() => {
        const ref = searchParams.get("ref")
        if (ref) {
            setReferralCode(ref)
            toast.success("Referral code applied!", {
                description: "You'll receive a signup bonus after registration."
            })
        }
    }, [searchParams])

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, referralCode }),
            })

            const data = await res.json()

            if (res.ok) {
                toast.success("Verification code sent to your email")
                setStep(2)
            } else {
                toast.error(data.message || "Failed to send OTP")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            })

            const data = await res.json()

            if (res.ok) {
                login(data)
                toast.success("Registration successful")
                router.push("/")
            } else {
                toast.error(data.message || "Invalid or expired OTP")
            }
        } catch (error) {
            toast.error("An error occurred during verification")
        } finally {
            setLoading(false)
        }
    }

    if (step === 2) {
        return (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="text-center space-y-2 mb-4">
                    <p className="text-sm text-slate-500 font-bangla">আপনার ইমেল <strong>{email}</strong> এ একটি ভেরিফিকেশন কোড পাঠানো হয়েছে।</p>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-bangla">ভেরিফিকেশন কোড</label>
                    <Input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        required
                        className="h-14 text-center text-2xl font-black tracking-[10px] rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-lg shadow-blue-500/20 transition-all font-bangla"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {loading ? "ভেরিফাই হচ্ছে..." : "অ্যাকাউন্ট ভেরিফাই করুন"}
                </Button>
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-xs text-slate-400 font-bangla hover:text-blue-600 transition-colors"
                >
                    ভুল ইমেল? পুনরায় চেষ্টা করুন
                </button>
            </form>
        )
    }

    return (
        <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Abir Khan"
                    required
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Referral Code (Optional)</label>
                <Input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 text-sm uppercase"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-lg shadow-blue-500/20 transition-all font-bangla mt-4"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {loading ? "কোড পাঠানো হচ্ছে..." : "কোড পাঠান"}
            </Button>
        </form>
    )
}

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-20">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 underline decoration-blue-500 decoration-4 underline-offset-4 font-bangla">নতুন অ্যাকাউন্ট</h1>
                    <p className="text-slate-500 text-sm font-bangla">সফটওয়্যার এবং ই-কমার্স সলিউশন পেতে জয়েন করুন।</p>
                </div>

                <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-600" /></div>}>
                    <RegisterForm />
                </Suspense>

                <p className="mt-8 text-center text-sm text-slate-500 font-bangla">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                    <a href="/login" className="text-blue-600 font-black hover:underline">
                        লগইন করুন
                    </a>
                </p>
            </div>
        </main>
    )
}
