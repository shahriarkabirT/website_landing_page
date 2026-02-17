"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CreditCard, LogOut, Package, Loader2, MessageSquare, User, Calendar, CheckSquare, Layers, Plus, Trash2, Edit, Eye, Archive, RotateCcw } from "lucide-react"
import AdminSidebar from "../../components/admin/admin-sidebar"
import PricingManager from "../../components/admin/pricing-manager"
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
    const [showArchived, setShowArchived] = useState(false)

    // Demo Form State
    const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false)
    const [demoForm, setDemoForm] = useState<{ title: string; description: string; imageUrls: string[]; order: number }>({ title: "", description: "", imageUrls: [], order: 0 })
    const [editingDemoId, setEditingDemoId] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)

    // Order Details State
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)

    const { user, loading, logout } = useAuth()
    const router = useRouter()

    const fetchData = async () => {
        try {
            const [orderRes, consultRes, demoRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders?archived=${showArchived}`, { credentials: "include" }),
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
                router.push("/")
                return
            }
            fetchData()
        }
    }, [user, loading, router, logout, showArchived])

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

    const handleToggleArchive = async (id: string, currentlyActive: boolean) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders/${id}/archive`, {
                method: "PUT",
                credentials: "include"
            })

            if (res.ok) {
                toast.success(`Order ${currentlyActive ? 'archived' : 'restored'}`)
                fetchData()
            } else {
                toast.error("Failed to archive order")
            }
        } catch (error) {
            toast.error("Error archiving order")
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
                setDemoForm({ title: "", description: "", imageUrls: [], order: 0 })
                fetchData()
            } else {
                toast.error("Failed to save demo")
            }
        } catch (error) {
            toast.error("Error saving demo")
        }
    }

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        const uploadedUrls: string[] = []

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData()
                formData.append("image", files[i])

                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`, {
                    method: "POST",
                    body: formData,
                })
                const data = await res.json()
                if (data.image) {
                    uploadedUrls.push(data.image)
                }
            }

            setDemoForm({ ...demoForm, imageUrls: [...demoForm.imageUrls, ...uploadedUrls] })
            toast.success(`${uploadedUrls.length} image(s) uploaded`)
        } catch (error) {
            console.error(error)
            toast.error("Image upload failed")
        } finally {
            setUploading(false)
        }
    }

    const openEditDemo = (demo: any) => {
        setEditingDemoId(demo._id)
        setDemoForm({
            title: demo.title,
            description: demo.description,
            imageUrls: demo.imageUrls || [],
            order: demo.order
        })
        setIsDemoDialogOpen(true)
    }

    // Helper to get full image URL
    const getImageUrl = (url: string) => {
        if (!url) return ""
        if (url.startsWith("http")) return url
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        return `${baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl}${url.startsWith('/') ? url : '/' + url}`;
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
            <AdminSidebar activeView={view} onChangeView={setView} />

            {/* Main Content - Single Page Application View Switching */}
            <main className="flex-1 ml-64 p-10 overflow-y-auto">
                {view === "pricing" ? (
                    <PricingManager />
                ) : (
                    <>
                        <header className="mb-10 flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                {view === "orders" ? "Recent Orders" : view === "consultations" ? "Consultation Requests" : "Demos"}
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium">
                                    Total {view === "orders" ? `Orders: ${orders.length}` : view === "consultations" ? `Requests: ${consultations.length}` : `Demos: ${demos.length}`}
                                </span>
                                {view === "orders" && (
                                    <Button
                                        variant={showArchived ? "default" : "outline"}
                                        onClick={() => setShowArchived(!showArchived)}
                                        className={`rounded-xl gap-2 font-bold ${showArchived ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                                    >
                                        <Archive className="w-4 h-4" />
                                        {showArchived ? "Show Active" : "Archive"}
                                    </Button>
                                )}
                                {view === "demos" && (
                                    <Button onClick={() => {
                                        setEditingDemoId(null)
                                        setDemoForm({ title: "", description: "", imageUrls: [], order: 0 })
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
                                                        <img src={getImageUrl(demo.imageUrls?.[0])} alt="" className="object-cover w-full h-full" />
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
                                            <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {orders.map((order: any) => (
                                            <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all">
                                                <td className="px-6 py-4 align-top">
                                                    {order.templateId ? (
                                                        <div className="flex items-start gap-3 w-48">
                                                            <div className="w-12 h-16 bg-slate-100 rounded-md overflow-hidden relative flex-shrink-0 border">
                                                                <img src={getImageUrl(order.templateId.imageUrls?.[0])} alt="" className="object-cover w-full h-full" />
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
                                                <td className="px-6 py-4 align-top text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                setSelectedOrder(order)
                                                                setIsOrderDetailsOpen(true)
                                                            }}
                                                        >
                                                            <Eye className="w-4 h-4 text-slate-600" />
                                                        </Button>
                                                        {showArchived ? (
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={() => handleToggleArchive(order._id, false)}
                                                                title="Restore Order"
                                                            >
                                                                <RotateCcw className="w-4 h-4 text-green-600" />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={() => handleToggleArchive(order._id, true)}
                                                                title="Archive Order"
                                                            >
                                                                <Trash2 className="w-4 h-4 text-red-600" />
                                                            </Button>
                                                        )}
                                                    </div>
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
                    </>
                )
                }
            </main >
            {/* Demo Dialog */}
            < Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen} >
                <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
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
                            <Label>Images</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {demoForm.imageUrls.map((url, idx) => (
                                    <div key={idx} className="relative aspect-[3/4] rounded-md overflow-hidden border group">
                                        <img src={getImageUrl(url)} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newUrls = [...demoForm.imageUrls];
                                                newUrls.splice(idx, 1);
                                                setDemoForm({ ...demoForm, imageUrls: newUrls });
                                            }}
                                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                <label className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                                    <Plus className="w-6 h-6 text-slate-400" />
                                    <span className="text-[10px] text-slate-400 mt-1">Add</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={uploadFileHandler}
                                        disabled={uploading}
                                        multiple
                                    />
                                </label>
                            </div>
                            {uploading && <div className="flex items-center gap-2 text-xs text-blue-600 mt-2"><Loader2 className="animate-spin w-3 h-3" /> Uploading...</div>}
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
            </Dialog >

            {/* Order Details Dialog */}
            < Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen} >
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Full information for Order #{selectedOrder?._id?.slice(-6).toUpperCase()}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                            {/* Left Col: Template Image */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Selected Template</h3>
                                {selectedOrder.templateId ? (
                                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-900">
                                        <div className="aspect-[3/4] relative">
                                            <img
                                                src={getImageUrl(selectedOrder.templateId.imageUrls?.[0])}
                                                alt={selectedOrder.templateId.title}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                                            <p className="font-bold text-lg">{selectedOrder.templateId.title}</p>
                                            <p className="text-sm text-slate-500">{selectedOrder.templateId.description}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 text-center bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 italic">
                                        Template information missing
                                    </div>
                                )}
                            </div>

                            {/* Right Col: Order Info */}
                            <div className="space-y-6">
                                {/* Status */}
                                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                    <span className="font-bold text-slate-600 dark:text-slate-400">Current Status</span>
                                    <Select
                                        defaultValue={selectedOrder.status}
                                        onValueChange={(val) => handleUpdateStatus(selectedOrder._id, val, "orders")}
                                    >
                                        <SelectTrigger className={`w-[140px] font-bold border-none ${selectedOrder.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            selectedOrder.status === 'canceled' ? 'bg-red-100 text-red-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="canceled">Canceled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Customer Info */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider border-b pb-2">Customer Information</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500">Full Name</p>
                                            <p className="font-bold">{selectedOrder.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Phone Number</p>
                                            <p className="font-mono">{selectedOrder.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Email Address</p>
                                            <p className="">{selectedOrder.email || "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Business/Brand</p>
                                            <p className="font-bold text-blue-600">{selectedOrder.businessName || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider border-b pb-2">Payment Details</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-slate-500">Plan / Subscription</p>
                                            <p className="font-black text-lg text-blue-600">{selectedOrder.subscriptionType}</p>
                                        </div>
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                                            <p className="text-xs text-slate-500 mb-1">Transaction ID</p>
                                            {selectedOrder.transactionId ? (
                                                <p className="font-mono font-bold text-lg tracking-wider select-all">
                                                    {selectedOrder.transactionId}
                                                </p>
                                            ) : (
                                                <p className="text-red-500 italic text-sm">No transaction ID provided</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Timestamps */}
                                <div className="pt-4 text-xs text-slate-400 flex justify-between border-t">
                                    <span>Ordered: {new Date(selectedOrder.createdAt).toLocaleString()}</span>
                                    <span>Last Updated: {new Date(selectedOrder.updatedAt).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button onClick={() => setIsOrderDetailsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div >
    )
}
