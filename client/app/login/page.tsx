"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { Chrome, Mail, ArrowRight, CheckCircle } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [magicLinkSent, setMagicLinkSent] = useState(false)
    const [authMode, setAuthMode] = useState<"password" | "magic-link">("magic-link") // Default to magic link for "frictionless"
    const router = useRouter()
    const { login } = useAuth()

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
                    if (data.role === "admin") {
                        router.push("/admin/dashboard")
                    } else {
                        router.push("/dashboard")
                    }
                }
            } else {
                toast.error(data.message || "Authentication failed")
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`
    }

    if (magicLinkSent) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-20">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 text-center">
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
            </main>
        )
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-20">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Welcome</h1>
                    <p className="text-slate-500">Sign in to your dashboard</p>
                </div>

                <div className="space-y-4 mb-8">
                    <Button
                        onClick={handleGoogleLogin}
                        variant="outline"
                        className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border-slate-200 dark:border-slate-700 text-base"
                    >
                        <Chrome className="w-5 h-5 text-red-500" />
                        Continue with Google
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold">Or</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
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

                    {authMode === "password" && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                                <button
                                    type="button"
                                    onClick={() => setAuthMode("magic-link")}
                                    className="text-xs font-bold text-blue-600 hover:underline"
                                >
                                    Login without password
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
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02]"
                    >
                        {loading ? <span className="animate-pulse">Processing...</span> : (authMode === "magic-link" ? "Send Magic Link" : "Login")}
                    </Button>
                </form>

                {authMode === "magic-link" && (
                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => setAuthMode("password")}
                            className="text-sm font-bold text-slate-500 hover:text-slate-700"
                        >
                            I have a password
                        </button>
                    </div>
                )}
                {authMode === "password" && (
                    <p className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 font-bold hover:underline">
                            Register now
                        </a>
                    </p>
                )}
            </div>
        </main>
    )
}
