"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Plus, Trash2, Edit2, CreditCard, LayoutDashboard, LogOut, Check, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function PricingAdminPage() {
    const [plans, setPlans] = useState([])
    const [fetching, setFetching] = useState(true)
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        period: "",
        description: "",
        features: "",
        highlight: false,
    })
    const [editingId, setEditingId] = useState(null)
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== "admin") {
                router.push("/login")
                return
            }
            fetchPlans()
        }
    }, [user, loading, router])

    const fetchPlans = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/plans`)
            const data = await res.json()
            setPlans(data)
        } finally {
            setFetching(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            ...formData,
            features: formData.features.split(",").map(f => f.trim()).filter(f => f !== ""),
        }

        const url = editingId
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/plans/${editingId}`
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/plans`

        const method = editingId ? "PUT" : "POST"

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            })

            if (res.ok) {
                toast.success(editingId ? "Plan updated" : "Plan created")
                setFormData({ name: "", price: "", period: "", description: "", features: "", highlight: false })
                setEditingId(null)
                fetchPlans()
            } else {
                toast.error("Failed to save plan")
            }
        } catch (error) {
            toast.error("Error saving plan")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/plans/${id}`, {
                method: "DELETE",
                credentials: "include",
            })

            if (res.ok) {
                toast.success("Plan deleted")
                fetchPlans()
            }
        } catch (error) {
            toast.error("Error deleting plan")
        }
    }

    const handleEdit = (plan: any) => {
        setEditingId(plan._id)
        setFormData({
            name: plan.name,
            price: plan.price,
            period: plan.period,
            description: plan.description || "",
            features: plan.features.join(", "),
            highlight: plan.highlight || false,
        })
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
            <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col">
                <div className="mb-10">
                    <h2 className="text-2xl font-black text-blue-600">AdminPanel</h2>
                    <p className="text-xs text-slate-400 mt-1 font-bold truncate">{user.email}</p>
                </div>
                <nav className="flex-1 space-y-2">
                    <a href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </a>
                    <a href="/admin/pricing" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold">
                        <CreditCard className="w-5 h-5" /> Pricing Plans
                    </a>
                </nav>
                <button onClick={logout} className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all mt-auto font-medium">
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </aside>

            <main className="flex-1 p-10 overflow-y-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Pricing</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm sticky top-10">
                            <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
                                {editingId ? "Edit Plan" : "Add New Plan"}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input placeholder="Plan Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="rounded-xl h-12" />
                                <Input placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required className="rounded-xl h-12" />
                                <Input placeholder="Period" value={formData.period} onChange={e => setFormData({ ...formData, period: e.target.value })} required className="rounded-xl h-12" />
                                <Input placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="rounded-xl h-12" />
                                <textarea
                                    placeholder="Features (comma separated)"
                                    value={formData.features}
                                    onChange={e => setFormData({ ...formData, features: e.target.value })}
                                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none min-h-[100px] text-sm focus:ring-2 focus:ring-blue-500"
                                />
                                <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <input type="checkbox" checked={formData.highlight} onChange={e => setFormData({ ...formData, highlight: e.target.checked })} className="w-4 h-4 rounded accent-blue-600" />
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Highlight this plan</span>
                                </label>
                                <div className="flex gap-3 pt-4">
                                    <Button type="submit" className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold">
                                        {editingId ? "Update Plan" : "Create Plan"}
                                    </Button>
                                    {editingId && (
                                        <Button type="button" variant="outline" onClick={() => { setEditingId(null); setFormData({ name: "", price: "", period: "", description: "", features: "", highlight: false }) }} className="h-12 rounded-xl">
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {plans.map((plan: any) => (
                            <div key={plan._id} className={`bg-white dark:bg-slate-900 p-8 rounded-[2rem] border-2 shadow-sm transition-all hover:shadow-md flex justify-between items-center ${plan.highlight ? 'border-blue-600' : 'border-slate-100 dark:border-slate-800'}`}>
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                                        {plan.highlight && <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded uppercase tracking-wider">Highlighted</span>}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                                        <span className="text-slate-500 text-sm">{plan.period}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {plan.features.map((f: string, i: number) => (
                                            <span key={i} className="flex items-center gap-1 text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full font-medium">
                                                <Check className="w-2.5 h-2.5 text-green-500" /> {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button onClick={() => handleEdit(plan)} variant="outline" size="icon" className="w-10 h-10 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600">
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button onClick={() => handleDelete(plan._id)} variant="outline" size="icon" className="w-10 h-10 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
