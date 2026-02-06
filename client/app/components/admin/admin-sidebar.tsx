"use client"

import { useAuth } from "@/context/AuthContext"
import { CreditCard, Layers, LayoutDashboard, LogOut, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
    activeView?: string;
    onChangeView?: (view: string) => void;
}

export default function AdminSidebar({ activeView, onChangeView }: AdminSidebarProps) {
    const { user, logout } = useAuth()
    const router = useRouter()
    const handleNavigation = (view: string) => {
        if (onChangeView) {
            onChangeView(view)
        } else {
            router.push("/admin/dashboard")
        }
    }

    const isActive = (view: string) => {
        if (activeView) return activeView === view
        return false
    }

    return (
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col fixed h-full z-10">
            <div className="mb-10">
                <h2 className="text-2xl font-black text-blue-600">AdminPanel</h2>
                <p className="text-xs text-slate-400 mt-1 font-bold truncate">{user?.email}</p>
            </div>

            <nav className="flex-1 space-y-2">
                <button
                    onClick={() => handleNavigation("orders")}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${isActive("orders") ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                >
                    <LayoutDashboard className="w-5 h-5" /> Orders
                </button>
                <button
                    onClick={() => handleNavigation("consultations")}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${isActive("consultations") ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                >
                    <MessageSquare className="w-5 h-5" /> Consultations
                </button>
                <button
                    onClick={() => handleNavigation("demos")}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${isActive("demos") ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                >
                    <Layers className="w-5 h-5" /> Demos
                </button>
                <button
                    onClick={() => handleNavigation("pricing")}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-bold ${isActive("pricing") ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                >
                    <CreditCard className="w-5 h-5" /> Pricing Plans
                </button>
            </nav>

            <button onClick={logout} className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-auto font-medium">
                <LogOut className="w-5 h-5" /> Logout
            </button>
        </aside>
    )
}
