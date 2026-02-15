"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Package, Clock, CheckCircle2, ChevronRight, Loader2, Home, User as UserIcon, Camera, Save, Sparkles } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserDashboard() {
    const [orders, setOrders] = useState([])
    const [consultations, setConsultations] = useState([])
    const [fetching, setFetching] = useState(true)
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (loading) return

        if (!user) {
            router.push("/")
            return
        }

        const fetchData = async () => {
            try {
                const [ordersRes, consultationsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/orders`, { credentials: "include" }),
                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/consultations`, { credentials: "include" })
                ])

                if (ordersRes.status === 401 || consultationsRes.status === 401) {
                    logout()
                    return
                }

                if (ordersRes.ok) {
                    setOrders(await ordersRes.json())
                }

                if (consultationsRes.ok) {
                    setConsultations(await consultationsRes.json())
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error)
                toast.error("Failed to load dashboard data")
            } finally {
                setFetching(false)
            }
        }

        fetchData()
    }, [user, loading, router, logout])

    // Profile State
    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        password: ""
    })
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    console.log("Render: avatarFile is", avatarFile)
    console.log("Current user state:", user)
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (user) {
            setProfileForm(prev => ({ ...prev, name: user.name || "", phone: user.phone || "" }))
            setAvatarPreview(user.avatar || "")
        }
    }, [user])

    const handleAvatarClick = () => {
        console.log("handleAvatarClick: Triggering input click", fileInputRef.current)
        if (fileInputRef.current) {
            fileInputRef.current.value = "" // Reset value to allow selecting the same file
            fileInputRef.current.click()
        }
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleAvatarChange: Event triggered", e)
        const file = e.target.files?.[0]
        console.log("handleAvatarChange: Selected file", file)

        if (file) {
            setAvatarFile(file)
            // Create preview immediately
            const objectUrl = URL.createObjectURL(file)
            setAvatarPreview(objectUrl)
            console.log("handleAvatarChange: Set preview to", objectUrl)
        }
    }

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const formData = new FormData()
        formData.append("name", profileForm.name)
        formData.append("phone", profileForm.phone)
        if (profileForm.password) formData.append("password", profileForm.password)
        if (avatarFile) formData.append("avatar", avatarFile)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`, {
                method: "PUT",
                headers: {
                    // Content-Type is auto-set by browser for FormData
                },
                credentials: "include",
                body: formData
            })

            if (res.ok) {
                toast.success("Profile updated successfully")
                // Ideally update context, but reload for now or rely on next fetch
                window.location.reload()
            } else {
                const errorData = await res.json()
                console.error("Profile update failed:", errorData)
                toast.error(errorData.message || "Failed to update profile")
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred")
        } finally {
            setSaving(false)
        }
    }

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
            <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 shadow-sm h-16">
                <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href="/" className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <Home className="w-4 h-4 text-slate-500" />
                        </a>
                        <span className="font-bold text-slate-900 dark:text-white">Dashboard</span>
                    </div>
                    <Button onClick={logout} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                        Logout
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl w-full px-6 py-12">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {user.name}</h2>
                </div>

                <Tabs defaultValue="orders" className="w-full">
                    <TabsList className="flex flex-col h-auto md:grid w-full md:grid-cols-3 max-w-[500px] mb-8 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl md:h-12 gap-1 md:gap-0">
                        <TabsTrigger
                            value="orders"
                            className="w-full rounded-lg text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all py-2 md:py-0"
                        >
                            Your Orders ({orders.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="consultations"
                            className="w-full rounded-lg text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all py-2 md:py-0"
                        >
                            Consultations ({consultations.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="profile"
                            className="w-full rounded-lg text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all py-2 md:py-0"
                        >
                            Profile
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="orders" className="space-y-4 animate-in fade-in-50 duration-300">
                        {orders.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                <p className="text-slate-500 mb-4 text-sm">No active orders found.</p>
                                <a href="/#pricing">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-medium rounded-lg">
                                        Browse Plans
                                    </Button>
                                </a>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {orders.map((order: any) => (
                                    <div key={order._id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 flex-shrink-0">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-0.5 truncate">{order.businessName}</h4>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{order.subscriptionType} Plan</span>
                                                    <span className="text-[10px] text-slate-300 hidden sm:inline">•</span>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${order.status === 'pending' ? 'text-orange-600' :
                                                        order.status === 'completed' ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="consultations" className="space-y-4 animate-in fade-in-50 duration-300">
                        {consultations.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                <p className="text-slate-500 text-sm">No consultation requests.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {consultations.map((consultation: any) => (
                                    <div key={consultation._id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 flex-shrink-0">
                                                <Sparkles className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">{consultation.name}</h4>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${consultation.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                                        consultation.status === 'handled' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                        }`}>
                                                        {consultation.status === 'handled' ? 'পর্যবেক্ষণ করা হয়েছে' : consultation.status === 'pending' ? 'অপেক্ষা করছে' : consultation.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
                                                    {consultation.phone} • {new Date(consultation.createdAt).toLocaleDateString("bn-BD")}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 ml-2" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="profile" className="max-w-xl mx-auto animate-in fade-in-50 duration-300">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex-shrink-0">
                                        {avatarPreview ? (
                                            <Image
                                                src={avatarPreview.startsWith("blob:") ? avatarPreview : `${process.env.NEXT_PUBLIC_BACKEND_URL}${avatarPreview}`}
                                                alt="Profile"
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                <UserIcon className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={handleAvatarClick}>
                                            <Camera className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                        <Button type="button" variant="outline" size="sm" onClick={handleAvatarClick} className="h-8 text-xs">
                                            Change Photo
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name" className="text-xs font-semibold text-slate-500">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profileForm.name}
                                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email" className="text-xs font-semibold text-slate-500">Email</Label>
                                        <Input
                                            id="email"
                                            value={user.email}
                                            disabled
                                            className="bg-slate-50 dark:bg-slate-800 text-slate-500 h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="phone" className="text-xs font-semibold text-slate-500">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={profileForm.phone}
                                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                            placeholder="+880..."
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="password" className="text-xs font-semibold text-slate-500">New Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Optional"
                                            value={profileForm.password}
                                            onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                                            className="h-9"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 w-full sm:w-auto px-6 rounded-lg text-sm">
                                        {saving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </TabsContent>
                </Tabs>
            </main >
        </div >
    )
}
