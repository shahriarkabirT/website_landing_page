"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, CheckCircle2, XCircle, Coins, User, Phone, Banknote, Edit3 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const WithdrawalManager = () => {
    const [requests, setRequests] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState<string | null>(null)
    const [editingRequest, setEditingRequest] = useState<any>(null)
    const [editForm, setEditForm] = useState({
        coins: 0,
        adminNote: ""
    })

    const fetchRequests = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/withdraw/admin/all`, { credentials: "include" })
            if (res.ok) {
                setRequests(await res.json())
            }
        } catch (error) {
            console.error("Fetch error:", error)
            toast.error("Failed to load requests")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected', adjustedCoins?: number, note?: string) => {
        setProcessing(id)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/withdraw/admin/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, coins: adjustedCoins, adminNote: note }),
                credentials: "include"
            })

            if (res.ok) {
                toast.success(`Request ${status} successfully`)
                setEditingRequest(null)
                fetchRequests()
            } else {
                const data = await res.json()
                toast.error(data.message || "Failed to update")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setProcessing(null)
        }
    }

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-600 w-10 h-10" /></div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Withdrawal Requests</h2>
                    <p className="text-sm text-slate-500">Manage user cash-out requests and approve payouts.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Pending: {requests.filter(r => r.status === 'pending').length}</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Coins & Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {requests.map((request) => (
                                <tr key={request._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{request.user?.name}</p>
                                                <p className="text-[10px] text-slate-400 font-mono">{request.user?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-blue-600 font-black">
                                                <Coins className="w-3 h-3" />
                                                <span>{request.coins} Coins</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">≈ {request.amount} BDT</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded text-[10px] font-bold uppercase tracking-wide">
                                                {request.paymentMethod}
                                            </span>
                                            <p className="font-mono text-xs font-bold">{request.accountNumber}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${request.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                request.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {request.status === 'pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <Dialog open={editingRequest?._id === request._id} onOpenChange={(open) => {
                                                    if (open) {
                                                        setEditingRequest(request)
                                                        setEditForm({ coins: request.coins, adminNote: "" })
                                                    } else {
                                                        setEditingRequest(null)
                                                    }
                                                }}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="h-8 bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100">
                                                            Approve
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px] rounded-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-xl font-black">Approve Withdrawal</DialogTitle>
                                                            <DialogDescription>
                                                                Confirm payment to {request.user?.name}. You can adjust the coin amount if needed.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            <div className="space-y-2">
                                                                <Label className="text-sm font-bold">Adjust Coins (Optional)</Label>
                                                                <Input
                                                                    type="number"
                                                                    value={editForm.coins}
                                                                    onChange={(e) => setEditForm({ ...editForm, coins: Number(e.target.value) })}
                                                                    className="h-11 rounded-xl"
                                                                />
                                                                <p className="text-[10px] text-slate-400">Original request: {request.coins} coins.</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label className="text-sm font-bold">Admin Note (Internal/User)</Label>
                                                                <Textarea
                                                                    placeholder="e.g., Transaction ID or reason for adjustment"
                                                                    value={editForm.adminNote}
                                                                    onChange={(e) => setEditForm({ ...editForm, adminNote: e.target.value })}
                                                                    className="rounded-xl min-h-[80px]"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button
                                                                onClick={() => handleUpdateStatus(request._id, 'approved', editForm.coins, editForm.adminNote)}
                                                                disabled={processing === request._id}
                                                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-11 rounded-xl shadow-lg shadow-green-500/20"
                                                            >
                                                                {processing === request._id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Approval"}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                                                    disabled={processing === request._id}
                                                    onClick={() => handleUpdateStatus(request._id, 'rejected')}
                                                >
                                                    {processing === request._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                                                </Button>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-slate-400 italic">
                                                Processed on {new Date(request.updatedAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {requests.length === 0 && (
                    <div className="p-12 text-center">
                        <Banknote className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">No withdrawal requests yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WithdrawalManager
