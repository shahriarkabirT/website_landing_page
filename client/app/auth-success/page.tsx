"use client"

import { useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

function AuthSuccessContent() {
    const router = useRouter()
    const { login } = useAuth()

    useEffect(() => {
        // Since we are using cookies now, we just need to fetch profile to confirm and get user data
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`, {
                    credentials: "include"
                })

                if (res.ok) {
                    const userData = await res.json()
                    login(userData)
                    toast.success("Google login successful")
                    if (userData.role === "admin") {
                        router.push("/admin/dashboard")
                    } else {
                        router.push("/dashboard")
                    }
                } else {
                    toast.error("Failed to authenticate")
                    router.push("/login")
                }
            } catch (error) {
                toast.error("Auth error")
                router.push("/login")
            }
        }

        // Small delay to ensure cookie is set/ready if client side is fast
        setTimeout(fetchProfile, 1500)

    }, [login, router])

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
