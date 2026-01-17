import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter Plan",
      price: "9,999",
      period: "BDT",
      description: "Perfect for small businesses",
      features: [
        "3-5 pages",
        "Responsive design",
        "Basic SEO",
        "Contact form",
        "Free consultation",
        "বাংলা + English website",
      ],
      highlight: false,
    },
    {
      name: "Business Plan",
      price: "19,999",
      period: "BDT",
      description: "Best for growing businesses",
      features: [
        "6-10 pages",
        "Premium design",
        "Speed optimization",
        "WhatsApp chat",
        "Google Map integration",
        "Free 1-month support",
      ],
      highlight: true,
    },
    {
      name: "E-Commerce Plan",
      price: "29,999",
      period: "BDT",
      description: "Complete online store",
      features: [
        "Add to Cart system",
        "Payment gateway ready",
        "Product management",
        "Category management",
        "Delivery system",
        "Admin dashboard",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 border-b border-border/50 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Pricing Plans
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent & Affordable
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all ${
                plan.highlight
                  ? "border-primary/50 bg-primary/5 ring-2 ring-primary/10"
                  : "border-border/50 bg-secondary/30"
              } p-8 relative`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h3>
              <p className="text-muted-foreground mb-6 text-sm">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground ml-2">
                  {plan.period}
                </span>
              </div>

              <Button
                className="w-full mb-8"
                variant={plan.highlight ? "default" : "outline"}
              >
                Get Started
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
