"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { LayoutDashboard, CreditCard, LogOut, Package, Loader2, MessageSquare, User, Calendar, CheckSquare, Layers, Plus, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export default function DashboardPage() {
    const [orders, setOrders] = useState([])
    const [consultations, setConsultations] = useState([])
    const [demos, setDemos] = useState([])
    const [view, setView] = useState("orders") // "orders", "consultations", "demos"
    const [fetching, setFetching] = useState(true)

    // Demo Form State
    const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false)
    const [demoForm, setDemoForm] = useState({ title: "", description: "", imageUrl: "", order: 0 })
    const [editingDemoId, setEditingDemoId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    const fetchData = async () => {
        try {
            const [orderRes, consultRes, demoRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`, { credentials: "include" }),
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/consultation`, { credentials: "include" }),
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo/admin`, { credentials: "include" })
            ])

            if (orderRes.ok) setOrders(await orderRes.json())
            if (consultRes.ok) setConsultations(await consultRes.json())
            if (demoRes.ok) setDemos(await demoRes.json())

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

    const handleDeleteDemo = async (id: string) => {
        if (!confirm("Are you sure you want to delete this demo?")) return

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            if (res.ok) {
                toast.success("Demo deleted")
                fetchData()
            } else {
                toast.error("Failed to delete demo")
            }
        } catch (error) {
            toast.error("Error deleting demo")
        }
    }

    const handleSaveDemo = async () => {
        try {
            const url = editingDemoId
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo/${editingDemoId}`
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demo`

            const method = editingDemoId ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(demoForm),
                credentials: "include"
            })

            if (res.ok) {
                toast.success(`Demo ${editingDemoId ? 'updated' : 'created'}`)
                setIsDemoDialogOpen(false)
                setEditingDemoId(null)
                setDemoForm({ title: "", description: "", imageUrl: "", order: 0 })
                fetchData()
            } else {
                toast.error("Failed to save demo")
            }
        } catch (error) {
            toast.error("Error saving demo")
        }
    }

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
                method: "POST",
                body: formData,
            })
            const data = await res.json()
            // Save only the relative path
            setDemoForm({ ...demoForm, imageUrl: data.image })
            setUploading(false)
            toast.success("Image uploaded")
        } catch (error) {
            console.error(error)
            setUploading(false)
            toast.error("Image upload failed")
        }
    }

    const openEditDemo = (demo: any) => {
        setEditingDemoId(demo._id)
        setDemoForm({
            title: demo.title,
            description: demo.description,
            imageUrl: demo.imageUrl,
            order: demo.order
        })
        setIsDemoDialogOpen(true)
    }

    // Helper to get full image URL
    const getImageUrl = (url: string) => {
        if (!url) return ""
        if (url.startsWith("http")) return url
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`
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
                    <button
                        onClick={() => setView("demos")}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${view === "demos" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                    >
                        <Layers className="w-5 h-5" /> Demos
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
                            Total {view === "orders" ? `Orders: ${orders.length}` : view === "consultations" ? `Requests: ${consultations.length}` : `Demos: ${demos.length}`}
                        </span>
                        {view === "demos" && (
                            <Button onClick={() => {
                                setEditingDemoId(null)
                                setDemoForm({ title: "", description: "", imageUrl: "", order: 0 })
                                setIsDemoDialogOpen(true)
                            }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl gap-2">
                                <Plus className="w-4 h-4" /> Add Demo
                            </Button>
                        )}
                    </div>
                </header>

                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    {view === "demos" && (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Image</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Details</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Order</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {demos.map((demo: any) => (
                                    <tr key={demo._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-20 bg-slate-100 rounded-lg overflow-hidden relative">
                                                <img src={getImageUrl(demo.imageUrl)} alt="" className="object-cover w-full h-full" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-900 dark:text-white">{demo.title}</p>
                                            <p className="text-xs text-slate-500 max-w-xs">{demo.description}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {demo.order}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button size="icon" variant="ghost" onClick={() => openEditDemo(demo)}>
                                                    <Edit className="w-4 h-4 text-slate-600" />
                                                </Button>
                                                <Button size="icon" variant="ghost" onClick={() => handleDeleteDemo(demo._id)}>
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {view === "orders" ? (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Template</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Customer</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Order Info</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Payment</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {orders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                        <td className="px-6 py-4 align-top">
                                            {order.templateId ? (
                                                <div className="flex items-start gap-3 w-48">
                                                    <div className="w-12 h-16 bg-slate-100 rounded-md overflow-hidden relative flex-shrink-0 border">
                                                        <img src={getImageUrl(order.templateId.imageUrl)} alt="" className="object-cover w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">{order.templateId.title}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">No Template</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="space-y-1">
                                                <p className="font-bold text-slate-900 dark:text-white">{order.name}</p>
                                                <p className="text-xs text-slate-500 font-mono">{order.phone}</p>
                                                {order.email && <p className="text-xs text-slate-500">{order.email}</p>}
                                                {order.businessName && (
                                                    <p className="text-xs font-bold text-blue-600 mt-1">{order.businessName}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="space-y-1">
                                                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-[10px] font-bold uppercase tracking-wide">
                                                    {order.subscriptionType}
                                                </span>
                                                <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            {order.transactionId ? (
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Trx ID</span>
                                                    <p className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300 select-all bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded w-fit">
                                                        {order.transactionId}
                                                    </p>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <Select
                                                defaultValue={order.status}
                                                onValueChange={(val) => handleUpdateStatus(order._id, val, "orders")}
                                            >
                                                <SelectTrigger className={`w-[120px] h-8 rounded-lg text-xs font-bold border-none ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'canceled' ? 'bg-red-100 text-red-700' :
                                                            'bg-orange-100 text-orange-700'
                                                    }`}>
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
                    ) : view === "consultations" ? (
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
                    ) : null}

                    {((view === "orders" && orders.length === 0) || (view === "consultations" && consultations.length === 0) || (view === "demos" && demos.length === 0)) && (
                        <div className="p-20 text-center">
                            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500">No {view} found yet</p>
                        </div>
                    )}
                </div>
            </main>
            {/* Demo Dialog */}
            <Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingDemoId ? "Edit Demo" : "Add New Demo"}</DialogTitle>
                        <DialogDescription>
                            Create or update a specific template demo card.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                value={demoForm.title}
                                onChange={(e) => setDemoForm({ ...demoForm, title: e.target.value })}
                                placeholder="e.g. SaaS Marketing Pro"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={demoForm.description}
                                onChange={(e) => setDemoForm({ ...demoForm, description: e.target.value })}
                                placeholder="Short description..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Image</Label>
                            <Input
                                type="file"
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader2 className="animate-spin w-4 h-4 text-blue-600" />}
                            {demoForm.imageUrl && (
                                <div className="mt-2 relative h-32 w-full rounded-md overflow-hidden border">
                                    <img src={getImageUrl(demoForm.imageUrl)} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            {/* Hidden input to store URL if manually edited (optional) */}
                            {/* <Input
                                value={demoForm.imageUrl}
                                onChange={(e) => setDemoForm({ ...demoForm, imageUrl: e.target.value })}
                                placeholder="/images/..."
                                className="hidden"
                            /> */}
                        </div>
                        <div className="space-y-2">
                            <Label>Order</Label>
                            <Input
                                type="number"
                                value={demoForm.order}
                                onChange={(e) => setDemoForm({ ...demoForm, order: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSaveDemo}>Save Demo</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
