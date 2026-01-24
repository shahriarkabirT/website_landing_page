"use client"

import { useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"

export default function Pricing() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/plans`)
        const data = await res.json()
        setPlans(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Failed to fetch plans", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (plans.length === 0) return null

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            Pricing and Subscriptions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the plan that fits your business needs. No hidden charges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl border-2 transition-all p-10 relative flex flex-col ${plan.highlight
                ? "border-blue-600 bg-blue-50/30 dark:bg-blue-900/10 shadow-2xl shadow-blue-500/10 scale-105 z-10"
                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
                    BEST VALUE
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {plan.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                {plan.description}
              </p>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-slate-500 font-medium">
                  {plan.period}
                </span>
              </div>

              <a
                href={`/checkout?planId=${plan._id}&planName=${encodeURIComponent(plan.name)}&planPrice=${encodeURIComponent(plan.price)}&planPeriod=${encodeURIComponent(plan.period)}`}
                className={`w-full py-4 rounded-xl text-center font-bold transition-all mb-10 ${plan.highlight
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/25"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
              >
                Order Now
              </a>

              <div className="space-y-4 mt-auto">
                {(plan.features || []).map((feature: string, j: number) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
