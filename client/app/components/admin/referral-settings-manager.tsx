"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save, Coins, Percent, Gift } from "lucide-react"

export default function ReferralSettingsManager() {
    const [settings, setSettings] = useState({
        coinValue: 1,
        discountPercentage: 5,
        rewardCoins: 100,
        signupBonus: 10
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referral/settings`, { credentials: "include" })
                if (res.ok) {
                    setSettings(await res.json())
                }
            } catch (error) {
                console.error("Failed to fetch referral settings:", error)
                toast.error("Failed to load settings")
            } finally {
                setLoading(false)
            }
        }
        fetchSettings()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/referral/settings`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
                credentials: "include"
            })
            if (res.ok) {
                toast.success("Referral settings updated")
            } else {
                toast.error("Failed to update settings")
            }
        } catch (error) {
            toast.error("Error saving settings")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>

    return (
        <div className="max-w-2xl">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Referral System Settings</h2>
                <p className="text-slate-500 text-sm">Configure how rewards and discounts work for your referral system.</p>
            </header>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-yellow-600">
                                <Coins className="w-4 h-4" />
                            </div>
                            <Label className="font-bold">Coin Value (BDT)</Label>
                        </div>
                        <Input
                            type="number"
                            value={settings.coinValue}
                            onChange={(e) => setSettings({ ...settings, coinValue: Number(e.target.value) })}
                            placeholder="1"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">How much BDT one coin is worth. Default is 1.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                                <Percent className="w-4 h-4" />
                            </div>
                            <Label className="font-bold">User Discount (%)</Label>
                        </div>
                        <Input
                            type="number"
                            value={settings.discountPercentage}
                            onChange={(e) => setSettings({ ...settings, discountPercentage: Number(e.target.value) })}
                            placeholder="5"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">Instant discount for the person using a referral code.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
                                <Gift className="w-4 h-4" />
                            </div>
                            <Label className="font-bold">Referrer Reward (Coins)</Label>
                        </div>
                        <Input
                            type="number"
                            value={settings.rewardCoins}
                            onChange={(e) => setSettings({ ...settings, rewardCoins: Number(e.target.value) })}
                            placeholder="100"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">Coins awarded to the person who shared the code after a successful order.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600">
                                <Coins className="w-4 h-4" />
                            </div>
                            <Label className="font-bold">New User Bonus (Coins)</Label>
                        </div>
                        <Input
                            type="number"
                            value={settings.signupBonus}
                            onChange={(e) => setSettings({ ...settings, signupBonus: Number(e.target.value) })}
                            placeholder="10"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">Instantly award coins to a new user when they register with a referral code.</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Referral Settings
                    </Button>
                </div>
            </div>
        </div>
    )
}
