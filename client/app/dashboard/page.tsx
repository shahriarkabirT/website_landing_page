"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Package, Clock, CheckCircle2, ChevronRight, Loader2, Home, User as UserIcon, Camera, Save, Sparkles, Megaphone, Copy, Coins, Users } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const ReferralSection = () => {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [withdrawHistory, setWithdrawHistory] = useState<any[]>([])
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
    const [withdrawForm, setWithdrawForm] = useState({
        coins: "",
        paymentMethod: "Bkash",
        accountNumber: ""
    })
    const [submitting, setSubmitting] = useState(false)

    const fetchData = async () => {
        try {
            const [statsRes, historyRes] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referral/my-stats`, { credentials: "include" }),
                fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/withdraw/my-requests`, { credentials: "include" })
            ])
            if (statsRes.ok) setStats(await statsRes.json())
            if (historyRes.ok) setWithdrawHistory(await historyRes.json())
        } catch (error) {
            console.error("Fetch error:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const copyCode = () => {
        if (stats?.referralCode) {
            navigator.clipboard.writeText(stats.referralCode)
            toast.success("Referral code copied!")
        }
    }

    const copyLink = () => {
        if (stats?.referralCode) {
            const link = `${window.location.origin}/register?ref=${stats.referralCode}`
            navigator.clipboard.writeText(link)
            toast.success("Referral link copied!")
        }
    }

    const handleWithdrawSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!withdrawForm.coins || !withdrawForm.accountNumber) {
            toast.error("সবগুলো তথ্য পূরণ করুন")
            return
        }

        const coinsNum = Number(withdrawForm.coins)
        if (coinsNum > (stats?.coins || 0)) {
            toast.error("আপনার যথেষ্ট কয়েন নেই")
            return
        }

        setSubmitting(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/withdraw/request`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    coins: coinsNum,
                    paymentMethod: withdrawForm.paymentMethod,
                    accountNumber: withdrawForm.accountNumber
                }),
                credentials: "include"
            })

            if (res.ok) {
                toast.success("উইথড্র রিকোয়েস্ট সফল হয়েছে")
                setIsWithdrawModalOpen(false)
                setWithdrawForm({ coins: "", paymentMethod: "Bkash", accountNumber: "" })
                fetchData() // Refresh
            } else {
                const data = await res.json()
                toast.error(data.message || "ব্যর্থ হয়েছে")
            }
        } catch (error) {
            toast.error("একটি সমস্যা হয়েছে")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-blue-600" /></div>

    return (
        <div className="space-y-6 px-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-600 mb-4">
                        <Coins className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-bangla">আপনার মোট আয়</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white font-bangla">{stats?.coins || 0} <span className="text-sm font-bold text-slate-400">কয়েন</span></h3>
                    <p className="text-xs text-slate-400 mt-2 font-bangla">≈ {stats?.totalEarnings || 0} টাকা</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4">
                        <Users className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-bangla">সফল রেফারেল</p>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white font-bangla">{stats?.successfulReferrals || 0}</h3>
                    <p className="text-xs text-slate-400 mt-2 font-bangla">{stats?.pendingReferrals || 0} জন অপেক্ষায়</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 mb-4">
                        <Megaphone className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-bangla">আপনার রেফারেল কোড</p>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 w-full mb-2">
                        <span className="font-mono text-xl font-black text-slate-900 dark:text-white">{stats?.referralCode}</span>
                        <button onClick={copyCode} className="ml-auto p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <Copy className="w-4 h-4 text-slate-500" />
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bangla mb-4">কয়েন আয় করতে এই কোডটি শেয়ার করুন!</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={copyLink}
                        className="w-full rounded-xl border-purple-100 hover:bg-purple-50 hover:text-purple-600 text-purple-600 font-black gap-2 h-10 font-bangla"
                    >
                        <Megaphone className="w-3.5 h-3.5" />
                        লিঙ্ক কপি করুন
                    </Button>
                </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2rem] text-white shadow-xl font-bangla relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Coins className="w-32 h-32 rotate-12" />
                </div>
                <div className="max-w-2xl relative z-10">
                    <h4 className="text-xl font-bold mb-4 underline decoration-white/30 underline-offset-8">এটি কীভাবে কাজ করে?</h4>
                    <ul className="space-y-4 opacity-95 text-base">
                        <li className="flex gap-4 items-start">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold text-xs ring-4 ring-white/5">১</div>
                            <p className="leading-relaxed">আপনার ইউনিক রেফারেল কোডটি বন্ধু বা ব্যবসায়িক পার্টনারদের সাথে শেয়ার করুন।</p>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold text-xs ring-4 ring-white/5">২</div>
                            <p className="leading-relaxed">তারা যখন একাউন্ট খুলবে, তারা সাথে সাথে <strong>{stats?.signupBonus || 10} কয়েন</strong> বোনাস পাবে এবং চেকআউটের সময় আপনার কোডটি ব্যবহার করলে আরও <strong>৫% ইনস্ট্যান্ট ডিসকাউন্ট</strong> পাবে।</p>
                        </li>
                        <li className="flex gap-4 items-start">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold text-xs ring-4 ring-white/5">৩</div>
                            <p className="leading-relaxed">যখন তাদের অর্ডারটি অ্যাপ্রুভ হয়ে যাবে, আপনি পাবেন <strong>{stats?.rewardCoins || 100} কয়েন</strong> (যা {(stats?.rewardCoins || 100) * (stats?.coinValue || 1)} টাকার সমান)।</p>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <Dialog open={isWithdrawModalOpen} onOpenChange={setIsWithdrawModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-white text-blue-600 hover:bg-blue-50 font-black rounded-xl px-8 shadow-xl">
                                    টাকা উইথড্র করুন
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] font-bangla rounded-3xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black">উইথড্র রিকোয়েস্ট</DialogTitle>
                                    <DialogDescription className="font-medium text-slate-500">
                                        আপনার আয় করা কয়েনগুলো সরাসরি বিকাশ বা নগদে নিন।
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleWithdrawSubmit} className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold ml-1">কত কয়েন উইথড্র করবেন?</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                placeholder="উদা: ১০০"
                                                className="h-12 rounded-xl bg-slate-50 font-bold"
                                                value={withdrawForm.coins}
                                                onChange={(e) => setWithdrawForm({ ...withdrawForm, coins: e.target.value })}
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                                                ≈ {Number(withdrawForm.coins) * (stats?.coinValue || 1)} টাকা
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-slate-400 ml-1">আপনার বর্তমান ব্যালেন্স: {stats?.coins} কয়েন</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold ml-1">পেমেন্ট মেথড</Label>
                                            <Select
                                                value={withdrawForm.paymentMethod}
                                                onValueChange={(v) => setWithdrawForm({ ...withdrawForm, paymentMethod: v })}
                                            >
                                                <SelectTrigger className="h-12 rounded-xl bg-slate-50 font-bold">
                                                    <SelectValue placeholder="সিলেক্ট করুন" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl">
                                                    <SelectItem value="Bkash">বিকাশ (Bkash)</SelectItem>
                                                    <SelectItem value="Nagad">নগদ (Nagad)</SelectItem>
                                                    <SelectItem value="Upay">উপায় (Upay)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold ml-1">একাউন্ট নাম্বার</Label>
                                            <Input
                                                placeholder="017..."
                                                className="h-12 rounded-xl bg-slate-50 font-bold"
                                                value={withdrawForm.accountNumber}
                                                onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={submitting} className="w-full h-12 bg-blue-600 hover:bg-blue-700 font-black rounded-xl text-lg shadow-xl shadow-blue-500/20">
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "রিকোয়েস্ট পাঠান"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* Withdrawal History */}
            {withdrawHistory.length > 0 && (
                <div className="space-y-4 font-bangla">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white ml-2">উইথড্র ইতিহাস</h4>
                    <div className="grid gap-4">
                        {withdrawHistory.map((req) => (
                            <div key={req._id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${req.status === 'approved' ? 'bg-green-50 text-green-600' :
                                        req.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        <Coins className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-black text-slate-900 dark:text-white">{req.amount} টাকা</span>
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${req.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                req.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {req.status === 'approved' ? 'সফল' : req.status === 'pending' ? 'অপেক্ষমান' : 'বাতিল'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400">{req.paymentMethod} • {req.accountNumber} • {new Date(req.createdAt).toLocaleDateString("bn-BD")}</p>
                                    </div>
                                </div>
                                {req.adminNote && (
                                    <div className="text-[10px] text-slate-400 italic max-w-[150px] text-right">
                                        নোট: {req.adminNote}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default function UserDashboard() {
    const [orders, setOrders] = useState([])
    const [consultations, setConsultations] = useState([])
    const [fetching, setFetching] = useState(true)
    const { user, loading, logout } = useAuth()
    const router = useRouter()

    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        password: ""
    })
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (user) {
            setProfileForm(prev => ({ ...prev, name: user.name || "", phone: user.phone || "" }))
            setAvatarPreview(user.avatar || "")
        }
    }, [user])

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

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
            fileInputRef.current.click()
        }
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            const objectUrl = URL.createObjectURL(file)
            setAvatarPreview(objectUrl)
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
                credentials: "include",
                body: formData
            })

            if (res.ok) {
                toast.success("Profile updated successfully")
                window.location.reload()
            } else {
                const errorData = await res.json()
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
            <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10 shadow-sm h-16">
                <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <a href="/" className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <Home className="w-4 h-4 text-slate-500" />
                        </a>
                        <span className="font-bold text-slate-900 dark:text-white">Dashboard</span>
                    </div>
                    <Button onClick={logout} variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 font-bold">
                        Logout
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl w-full px-6 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white font-bangla">স্বাগতম, {user.name}</h2>
                </div>

                <Tabs defaultValue="orders" className="w-full">
                    <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-10 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl h-auto lg:h-14 gap-1.5 shadow-inner">
                        <TabsTrigger value="orders" className="rounded-xl text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-lg transition-all py-3">
                            Your Orders ({orders.length})
                        </TabsTrigger>
                        <TabsTrigger value="consultations" className="rounded-xl text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-lg transition-all py-3">
                            Consultations ({consultations.length})
                        </TabsTrigger>
                        <TabsTrigger value="referrals" className="rounded-xl text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-lg transition-all py-3">
                            Earnings & Referrals
                        </TabsTrigger>
                        <TabsTrigger value="profile" className="rounded-xl text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-blue-600 data-[state=active]:shadow-lg transition-all py-3">
                            Profile Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="referrals" className="animate-in fade-in-50 duration-500">
                        <ReferralSection />
                    </TabsContent>

                    <TabsContent value="orders" className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        {orders.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center shadow-lg">
                                <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-500 mb-6 text-sm font-medium italic">You haven't placed any orders yet.</p>
                                <a href="/#pricing">
                                    <Button className="bg-blue-600 hover:bg-blue-700 font-black rounded-xl px-8 shadow-xl shadow-blue-500/20">
                                        Explore Solutions
                                    </Button>
                                </a>
                            </div>
                        ) : (
                            <div className="grid gap-5">
                                {orders.map((order: any) => (
                                    <div key={order._id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 hover:shadow-xl transition-all flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-5 min-w-0">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1 truncate">{order.businessName || "Marketing Order"}</h4>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="text-xs text-slate-500 font-bold bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md">{order.subscriptionType} Plan</span>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${order.status === 'pending' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                                        order.status === 'completed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="consultations" className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        {consultations.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center">
                                <Sparkles className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-500 text-sm font-medium">No consultation requests found.</p>
                            </div>
                        ) : (
                            <div className="grid gap-5">
                                {consultations.map((consultation: any) => (
                                    <div key={consultation._id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 hover:shadow-xl transition-all flex items-center justify-between group">
                                        <div className="flex items-center gap-5 min-w-0">
                                            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 flex-shrink-0">
                                                <Sparkles className="w-6 h-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-3 mb-1.5 text-bangla">
                                                    <h4 className="font-bold text-slate-900 dark:text-white text-lg truncate">{consultation.name}</h4>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${consultation.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                                                        consultation.status === 'handled' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                        }`}>
                                                        {consultation.status === 'handled' ? 'সফল' : consultation.status === 'pending' ? 'অপেক্ষমান' : consultation.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-500 font-bold font-mono">
                                                    {consultation.phone} • {new Date(consultation.createdAt).toLocaleDateString("bn-BD")}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="profile" className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
                            <form onSubmit={handleProfileUpdate} className="space-y-8">
                                <div className="flex items-center gap-8 border-b border-slate-50 dark:border-slate-800 pb-8">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden border-4 border-white dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex-shrink-0 shadow-2xl relative">
                                            {avatarPreview ? (
                                                <Image
                                                    src={avatarPreview.startsWith("blob:") ? avatarPreview : `${process.env.NEXT_PUBLIC_BACKEND_URL}${avatarPreview}`}
                                                    alt="Profile"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={true}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <UserIcon className="w-10 h-10" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all" onClick={handleAvatarClick}>
                                            <Camera className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Update Profile Photo</h3>
                                        <p className="text-sm text-slate-500 mb-4">Click the camera icon to select a new image.</p>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 underline decoration-blue-500/30">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profileForm.name}
                                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email (Locked)</Label>
                                        <Input
                                            id="email"
                                            value={user.email}
                                            disabled
                                            className="h-12 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 font-medium border-none opacity-80"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 underline decoration-blue-500/30">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={profileForm.phone}
                                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                            placeholder="+880..."
                                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 underline decoration-blue-500/30">New Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Leave blank to keep current"
                                            value={profileForm.password}
                                            onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                                            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                                    <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white font-black h-12 w-full rounded-xl text-base shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all">
                                        {saving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Save className="w-5 h-5 mr-3" />}
                                        Save Profile Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
