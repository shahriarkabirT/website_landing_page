"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Package, Clock, CheckCircle2, ChevronRight, Loader2, Home } from "lucide-react"

export default function UserDashboard() {
    const [orders, setOrders] = useState([])
    const [fetching, setFetching] = useState(true)
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login")
                return
            }

            const fetchOrders = async () => {
                try {
                    const token = localStorage.getItem("token")
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/orders`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    if (res.ok) {
                        const data = await res.json()
                        setOrders(data)
                    } else if (res.status === 401) {
                        logout()
                    }
                } catch (error) {
                    toast.error("Failed to fetch dashboard data")
                } finally {
                    setFetching(false)
                }
            }

            fetchOrders()
        }
    }, [user, loading, router, logout])

    if (loading || (fetching && user)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <Home className="w-5 h-5 text-slate-500" />
                        </a>
                        <h1 className="text-xl font-black text-slate-900 dark:text-white">Customer Dashboard</h1>
                    </div>
                    <Button onClick={logout} variant="ghost" className="text-red-600 font-bold hover:bg-red-50">
                        Logout
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-4xl w-full px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Hello, {user.name}!</h2>
                    <p className="text-slate-500">Track your e-commerce store setup requests below.</p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Your Orders</h3>

                    {orders.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 p-20 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                            <Package className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Orders Yet</h4>
                            <p className="text-slate-500 mb-8 max-w-xs mx-auto">You haven't requested a website setup yet. Check our templates and place an order!</p>
                            <a href="/#pricing">
                                <Button className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl px-8 h-12 shadow-xl shadow-blue-500/20">
                                    Browse Plans
                                </Button>
                            </a>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order: any) => (
                                <div key={order._id} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${order.status === 'pending' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20' :
                                                        order.status === 'completed' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' :
                                                            'bg-red-50 text-red-600 dark:bg-red-900/20'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">Ordered on {new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>

                                            <div>
                                                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{order.businessName}</h4>
                                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{order.subscriptionType}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="hidden md:block text-right">
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Status Tracking</p>
                                                <p className="text-xs text-slate-400">Step 1: Configuration</p>
                                            </div>
                                            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer">
                                                <ChevronRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
