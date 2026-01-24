"use client"

import { useEffect, useState, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

function VerifyMagicLinkContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth()
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying")
    const verifiedRef = useRef(false)

    useEffect(() => {
        const token = searchParams.get("token")
        const email = searchParams.get("email")

        if (token && email) {
            if (verifiedRef.current) return
            verifiedRef.current = true

            const verify = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify-magic-link`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token, email }),
                        credentials: "include",
                    })

                    if (res.ok) {
                        const data = await res.json()
                        login(data)
                        setStatus("success")
                        toast.success("Login successful")

                        setTimeout(() => {
                            if (data.role === "admin") {
                                router.push("/admin/dashboard")
                            } else {
                                router.push("/dashboard")
                            }
                        }, 1000)
                    } else {
                        setStatus("error")
                        toast.error("Invalid or expired login link")
                    }
                } catch (error) {
                    setStatus("error")
                    toast.error("An error occurred")
                }
            }
            verify()
        } else {
            setStatus("error")
        }
    }, [searchParams, login, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <div className="w-full max-w-sm bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center">
                {status === "verifying" && (
                    <>
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Verifying Link...</h2>
                        <p className="text-slate-500 text-sm">Please wait while we log you in</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Success!</h2>
                        <p className="text-slate-500 text-sm">Redirecting to dashboard...</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">Login Failed</h2>
                        <p className="text-slate-500 text-sm mb-6">This link is invalid or has expired.</p>
                        <button
                            onClick={() => router.push("/login")}
                            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                        >
                            Back to Login
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default function VerifyMagicLinkPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>}>
            <VerifyMagicLinkContent />
        </Suspense>
    )
}
