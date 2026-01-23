"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { LayoutDashboard, CreditCard, LogOut, Package, Loader2, MessageSquare, User, Calendar, CheckSquare } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function DashboardPage() {
    const [orders, setOrders] = useState([])
    const [consultations, setConsultations] = useState([])
    const [view, setView] = useState("orders") // "orders" or "consultations"
    const [fetching, setFetching] = useState(true)
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    const fetchData = async () => {
        try {
            const [orderRes, consultRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`, { credentials: "include" }),
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/consultation`, { credentials: "include" })
            ])

            if (orderRes.ok) setOrders(await orderRes.json())
            if (consultRes.ok) setConsultations(await consultRes.json())

            if (!orderRes.ok && orderRes.status === 401) {
                toast.error("Session expired")
                logout()
            }
        } catch (error) {
            toast.error("Failed to fetch dashboard data")
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== "admin") {
                router.push("/login")
                return
            }
            fetchData()
        }
    }, [user, loading, router, logout])

    const handleUpdateStatus = async (id: string, newStatus: string, type: "orders" | "consultations") => {
        try {
            const url = type === "orders"
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders/${id}/status`
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/consultation/${id}/status`

            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ status: newStatus })
            })

            if (res.ok) {
                toast.success(`${type === "orders" ? "Order" : "Consultation"} status updated`)
                fetchData()
            } else {
                toast.error("Failed to update status")
            }
        } catch (error) {
            toast.error("Error updating status")
        }
    }

    if (loading || (fetching && user?.role === "admin")) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        )
    }

    if (!user || user.role !== "admin") return null

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col fixed h-full">
                <div className="mb-10">
                    <h2 className="text-2xl font-black text-blue-600">AdminPanel</h2>
                    <p className="text-xs text-slate-400 mt-1 font-bold truncate">{user.email}</p>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setView("orders")}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === "orders" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                        <LayoutDashboard className="w-5 h-5" /> Orders
                    </button>
                    <button
                        onClick={() => setView("consultations")}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === "consultations" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                        <MessageSquare className="w-5 h-5" /> Consultations
                    </button>
                    <a href="/admin/pricing" className="flex items-center gap-3 p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium">
                        <CreditCard className="w-5 h-5" /> Pricing Plans
                    </a>
                </nav>

                <button onClick={logout} className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-auto font-medium">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10 overflow-y-auto">
                <header className="mb-10 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        {view === "orders" ? "Recent Orders" : "Consultation Requests"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium">
                            Total {view === "orders" ? `Orders: ${orders.length}` : `Requests: ${consultations.length}`}
                        </span>
                    </div>
                </header>

                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    {view === "orders" ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Customer</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Business</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Subscription</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {orders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900 dark:text-white">{order.name}</p>
                                            <p className="text-xs text-slate-500">{order.phone}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{order.businessName}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase">
                                                {order.subscriptionType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Select
                                                defaultValue={order.status}
                                                onValueChange={(val) => handleUpdateStatus(order._id, val, "orders")}
                                            >
                                                <SelectTrigger className="w-[130px] h-9 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-800 border-none">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="pending" className="text-orange-600 font-bold">Pending</SelectItem>
                                                    <SelectItem value="completed" className="text-green-600 font-bold">Completed</SelectItem>
                                                    <SelectItem value="canceled" className="text-red-600 font-bold">Canceled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Prospective Client</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Contact Info</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Address</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {consultations.map((c: any) => (
                                    <tr key={c._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{c.phone}</p>
                                            <p className="text-xs text-slate-500">{c.email || "No Email"}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                            {c.address || "Not provided"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(c.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Select
                                                defaultValue={c.status}
                                                onValueChange={(val) => handleUpdateStatus(c._id, val, "consultations")}
                                            >
                                                <SelectTrigger className="w-[130px] h-9 rounded-lg text-xs font-bold bg-slate-50 dark:bg-slate-800 border-none">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="pending" className="text-orange-600 font-bold">Pending</SelectItem>
                                                    <SelectItem value="handled" className="text-green-600 font-bold">Handled</SelectItem>
                                                    <SelectItem value="canceled" className="text-red-600 font-bold">Canceled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {((view === "orders" && orders.length === 0) || (view === "consultations" && consultations.length === 0)) && (
                        <div className="p-20 text-center">
                            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No {view} found yet</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
