"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { Chrome } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { login } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (res.ok) {
                login(data)
                toast.success("Login successful")
                if (data.role === "admin") {
                    router.push("/admin/dashboard")
                } else {
                    router.push("/")
                }
            } else {
                toast.error(data.message || "Invalid credentials")
            }
        } catch (error) {
            toast.error("An error occurred during login")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-20">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-500">Log in to your account</p>
                </div>

                <div className="space-y-4 mb-8">
                    <Button
                        onClick={handleGoogleLogin}
                        variant="outline"
                        className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border-slate-200 dark:border-slate-700"
                    >
                        <Chrome className="w-6 h-6 text-red-500" />
                        Continue with Google
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold">Or with email</span>
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

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/20 transition-all transform hover:scale-[1.02]"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 font-bold hover:underline">
                        Register now
                    </a>
                </p>
            </div>
        </main>
    )
}
