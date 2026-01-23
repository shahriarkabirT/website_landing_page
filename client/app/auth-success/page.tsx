"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

function AuthSuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth()

    useEffect(() => {
        const token = searchParams.get("token")
        if (token) {
            const fetchProfile = async () => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    if (res.ok) {
                        const userData = await res.json()
                        login({ ...userData, token })
                        toast.success("Google login successful")
                        if (userData.role === "admin") {
                            router.push("/admin/dashboard")
                        } else {
                            router.push("/")
                        }
                    } else {
                        toast.error("Failed to fetch profile")
                        router.push("/login")
                    }
                } catch (error) {
                    toast.error("Auth error")
                    router.push("/login")
                }
            }
            fetchProfile()
        } else {
            router.push("/login")
        }
    }, [searchParams, login, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Authenticating...</h1>
                <p className="text-slate-500">Completing your login with Google</p>
            </div>
        </div>
    )
}

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        }>
            <AuthSuccessContent />
        </Suspense>
    )
}
