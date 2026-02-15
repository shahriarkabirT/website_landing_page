"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import OrderModal from "./order-modal"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, AlertCircle, Send, Loader2, UserPlus, Lock } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"

type FormStatus = "idle" | "loading" | "success" | "error"

export default function ContactForm() {
  const { user, login } = useAuth()
  const router = useRouter()
  const [plans, setPlans] = useState<any[]>([])
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    subscriptionType: "",
    message: "",
    email: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/plans`)
        const data = await res.json()
        setPlans(data)
        if (data.length > 0) {
          setForm(prev => ({ ...prev, subscriptionType: data[0].name }))
        }
      } catch (err) {
        console.error("Failed to fetch plans", err)
      } finally {
        setLoadingPlans(false)
      }
    }
    fetchPlans()

  }, [])

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [user])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setForm({ ...form, subscriptionType: value })
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error("Please fill in required fields")
      return
    }
    setIsModalOpen(true)
  }

  const selectedPlan = plans.find(p => p.name === form.subscriptionType)
  const planPrice = selectedPlan ? `${selectedPlan.price} ${selectedPlan.period}` : "Custom Price"

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
          Order Now / অর্ডার করুন
        </h2>
        <p className="text-slate-500 font-medium">Fill out the form below and we'll get started immediately.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Your Name / আপনার নাম
            </label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Abir Khan"
              value={form.name}
              onChange={handleChange}
              required
              className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
              Phone Number / ফোন নম্বর
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+880 1XXX XXXXXX"
              value={form.phone}
              onChange={handleChange}
              required
              className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        {!user && (
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required={!user}
              className="h-14 rounded-2xl bg-white dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="businessName" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            Business Name / ব্যবসার নাম
          </label>
          <Input
            id="businessName"
            name="businessName"
            placeholder="e.g. My E-commerce Store"
            value={form.businessName}
            onChange={handleChange}
            required
            className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            Subscription Type / সাবস্ক্রিপশন ধরণ
          </label>
          <Select
            value={form.subscriptionType}
            onValueChange={handleSelectChange}
            disabled={loadingPlans}
          >
            <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-blue-500 w-full">
              {loadingPlans ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading plans...
                </div>
              ) : (
                <SelectValue placeholder="Select a plan" />
              )}
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              {plans.map((plan) => (
                <SelectItem key={plan._id} value={plan.name} className="rounded-xl">
                  {plan.name} - {plan.price} {plan.period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
            Special Requirements / বিশেষ চাহিদা (Optional)
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your business or specific features you need..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-none p-4"
          />
        </div>

        <Button
          type="submit"
          disabled={status === "loading" || loadingPlans}
          className="w-full h-16 text-xl font-black rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95"
        >
          {status === "loading" ? (
            <div className="flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin" /> Processing...
            </div>
          ) : (
            <span className="flex items-center gap-2">
              Confirm Order <Send className="w-6 h-6" />
            </span>
          )}
        </Button>

        {status === "success" && (
          <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-4 text-green-700 dark:text-green-400 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-black">অর্ডার সফল হয়েছে!</p>
              <p className="text-sm">Account created and logged in. Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-4 text-red-700 dark:text-red-400 animate-shake">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}
      </form>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName={form.subscriptionType || "Custom Plan"}
        planPrice={planPrice}
        initialData={form}
      />
    </div>
  )
}
