"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { Mail } from "lucide-react"

interface LoginViewProps {
    onSuccess?: () => void
}

export default function LoginView({ onSuccess }: LoginViewProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [magicLinkSent, setMagicLinkSent] = useState(false)
    const [authMode, setAuthMode] = useState<"password" | "magic-link" | "forgot-password" | "reset-password">("password")
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { login } = useAuth()

    const getReturnUrl = () => {
        const queryRedirect = searchParams.get("redirect")
        if (queryRedirect) return queryRedirect

        const storedRedirect = localStorage.getItem("returnTo")
        if (storedRedirect) {
            localStorage.removeItem("returnTo")
            return storedRedirect
        }

        return null
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const endpoint = authMode === "password" ? "/api/auth/login" : "/api/auth/magic-link"
        const body = authMode === "password" ? { email, password } : { email }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            })

            const data = await res.json()

            if (res.ok) {
                if (authMode === "magic-link") {
                    setMagicLinkSent(true)
                    toast.success("Magic link sent! Check your email.")
                } else {
                    login(data)
                    toast.success("Login successful")
                    if (onSuccess) {
                        onSuccess()
                    } else {
                        const returnUrl = getReturnUrl()
                        if (returnUrl) {
                            router.push(returnUrl)
                        } else if (data.role === "admin") {
                            router.push("/admin/dashboard")
                        } else {
                            router.push("/dashboard")
                        }
                    }
                }
            } else {
                if (res.status === 404) {
                    toast.error("User not found. Please register first.")
                } else {
                    toast.error(data.message || "Authentication failed")
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (res.ok) {
                toast.success("Password reset code sent to your email")
                setAuthMode("reset-password")
            } else {
                toast.error(data.message || "Failed to send reset code")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            })
            if (res.ok) {
                toast.success("Password reset successful. Please login.")
                setAuthMode("password")
                setPassword("")
                setOtp("")
                setNewPassword("")
            } else {
                const data = await res.json()
                toast.error(data.message || "Invalid or expired code")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        // Save current path if not already on a login page
        if (!pathname.includes("/login")) {
            localStorage.setItem("returnTo", pathname + (window.location.hash || ""))
        } else if (searchParams.get("redirect")) {
            localStorage.setItem("returnTo", searchParams.get("redirect")!)
        }
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`
    }

    if (magicLinkSent) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Check your inbox</h2>
                <p className="text-slate-500 mb-8">We sent a login link to <strong>{email}</strong></p>
                <Button
                    onClick={() => setMagicLinkSent(false)}
                    variant="ghost"
                    className="text-blue-600 font-bold hover:text-blue-700"
                >
                    Use a different email
                </Button>
            </div>
        )
    }

    if (authMode === "forgot-password") {
        return (
            <div className="w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Forgot Password</h1>
                    <p className="text-slate-500">Enter your email to receive a reset code</p>
                </div>
                <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/20 transition-all"
                    >
                        {loading ? <span className="animate-pulse">Sending...</span> : "Send Reset Code"}
                    </Button>
                    <button
                        type="button"
                        onClick={() => setAuthMode("password")}
                        className="w-full text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        )
    }

    if (authMode === "reset-password") {
        return (
            <div className="w-full">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Reset Password</h1>
                    <p className="text-slate-500">Enter the code sent to your email</p>
                </div>
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Verification Code</label>
                        <Input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            required
                            className="h-14 text-center text-2xl font-black tracking-[10px] rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">New Password</label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/20 transition-all"
                    >
                        {loading ? <span className="animate-pulse">Resetting...</span> : "Reset Password"}
                    </Button>
                </form>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 underline decoration-blue-500 decoration-4 underline-offset-4 font-bangla">স্বাগতম</h1>
                <p className="text-slate-500 font-bangla">আপনার ড্যাশবোর্ডে লগইন করুন।</p>
            </div>

            <div className="space-y-4 mb-8">
                <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border-slate-200 dark:border-slate-700 text-base text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google দিয়ে লগইন করুন
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold">অথবা</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-bangla">ইমেল অ্যাড্রেস</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {authMode === "password" && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 font-bangla">পাসওয়ার্ড</label>
                            <button
                                type="button"
                                onClick={() => setAuthMode("forgot-password")}
                                className="text-xs font-bold text-blue-600 hover:underline font-bangla"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </button>
                        </div>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/20 transition-all font-bangla"
                >
                    {loading ? <span className="animate-pulse">প্রসেস হচ্ছে...</span> : (authMode === "magic-link" ? "ম্যাজিক লিঙ্ক পাঠান" : "লগইন করুন")}
                </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
                {authMode === "password" ? (
                    <button
                        type="button"
                        onClick={() => setAuthMode("magic-link")}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors font-bangla"
                    >
                        ম্যাজিক লিঙ্ক দিয়ে লগইন করুন
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setAuthMode("password")}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors font-bangla"
                    >
                        পাসওয়ার্ড দিয়ে লগইন করুন
                    </button>
                )}

                {authMode === "password" && (
                    <p className="text-sm text-slate-500 font-bangla">
                        অ্যাকাউন্ট নেই?{" "}
                        <a href="/register" className="text-blue-600 font-bold hover:underline">
                            নতুন অ্যাকাউন্ট খুলুন
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}
