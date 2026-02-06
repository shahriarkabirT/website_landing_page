"use client"

import { useEffect, useState } from "react"
import { Check, Loader2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

import OrderModal from "./order-modal"

export default function Pricing() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlanForOrder, setSelectedPlanForOrder] = useState<{ name: string, price: string } | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

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

  const bgElement = (
    <div className="w-full h-full relative opacity-40 dark:opacity-20 pointer-events-none">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-100 dark:bg-green-900/30 rounded-full mix-blend-multiply filter blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-[100px]" />
    </div>
  )




  const openOrderModal = (plan: any) => {
    setSelectedPlanForOrder({ name: plan.name, price: plan.price })
    setIsModalOpen(true)
  }

  const processedPlans = plans.map((plan) => ({ ...plan }));
  const highlightedCount = processedPlans.filter((p) => p.highlight).length;

  if (highlightedCount > 1) {
    // If multiple plans are highlighted, prioritize "Yearly" or the middle one
    const yearlyIndex = processedPlans.findIndex((p) => p.name.toLowerCase().includes("yearly"));
    processedPlans.forEach((p, idx) => {
      if (yearlyIndex !== -1) {
        p.highlight = idx === yearlyIndex;
      } else {
        // Default to middle element if no "Yearly" found
        p.highlight = idx === Math.floor(processedPlans.length / 2);
      }
    });
  }

  return (
    <>
      <section
        className="py-12 md:py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden"
        id="pricing"
      >
        {bgElement}
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Pricing and Subscriptions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your business needs. No hidden charges.
            </p>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              setApi={setApi}
              className="w-full max-w-[95vw] md:max-w-7xl mx-auto"
            >
              <CarouselContent className="-ml-4 py-8">
                {processedPlans.map((plan, i) => {
                  const isActive = current === i;
                  return (
                    <CarouselItem key={i} className="pl-4 basis-[65%] md:basis-1/3 h-auto">
                      <div
                        className={cn(
                          "rounded-[2rem] border-2 transition-all p-5 md:p-10 relative flex flex-col h-full duration-500",
                          // Mobile: Highlight center item, shrink others
                          isActive ? "scale-100 opacity-100 z-10" : "scale-90 opacity-60 z-0",
                          // Desktop: Uniform size
                          "md:scale-100 md:opacity-100 md:z-0",
                          plan.highlight
                            ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-2xl shadow-blue-500/10"
                            : "border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-600",
                          "backdrop-blur-sm"
                        )}
                      >
                        {plan.highlight && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">
                              BEST VALUE
                            </span>
                          </div>
                        )}

                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4">
                          {plan.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8 text-xs md:text-sm leading-relaxed">
                          {plan.description}
                        </p>

                        <div className="mb-6 md:mb-8 flex items-baseline gap-1">
                          <span className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
                            {plan.price}
                          </span>
                          {/* Removed period or kept it small?? The original had plan.period. Assuming keep it but maybe smaller */}
                          <span className="text-slate-500 font-medium text-xs md:text-base">
                            {plan.period}
                          </span>
                        </div>

                        <button
                          onClick={() => openOrderModal(plan)}
                          className="w-full py-3 md:py-4 rounded-xl text-center font-bold transition-all mb-6 md:mb-10 text-sm md:text-base bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 cursor-pointer"
                        >
                          অর্ডার করুন
                        </button>

                        <div className="space-y-3 md:space-y-4 mt-auto">
                          {(plan.features || []).map((feature: string, j: number) => (
                            <div key={j} className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600" />
                              </div>
                              <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-4 lg:-left-12" />
                <CarouselNext className="-right-4 lg:-right-12" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {selectedPlanForOrder && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName={selectedPlanForOrder.name}
          planPrice={selectedPlanForOrder.price}
        />
      )}
    </>
  )
}
