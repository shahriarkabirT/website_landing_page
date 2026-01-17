export default function ValueProposition() {
  const benefits = [
    {
      icon: "24/7",
      title: "24/7 Online Presence",
      description: "আপনার ব্যবসা সবসময় অনলাইনে থাকবে",
    },
    {
      icon: "🔐",
      title: "More Customer Trust",
      description: "প্রফেশনাল ওয়েবসাইট বিশ্বাস তৈরি করে",
    },
    {
      icon: "📈",
      title: "Easy to Grow Your Business",
      description: "সহজেই নতুন কাস্টমার পাবেন",
    },
    {
      icon: "⚡",
      title: "Beat Your Competitors",
      description: "প্রতিযোগীদের থেকে এগিয়ে থাকুন",
    },
  ];

  return (
    <section className="py-20 border-b border-border/50 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Your Business Needs a Website Today?
          </h2>
          <p className="text-lg text-muted-foreground">
            কেন আপনার ব্যবসার ওয়েবসাইট দরকার
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border/50 bg-secondary/30 hover:border-border transition-colors"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-xl border border-border/50 bg-secondary/20">
          <p className="text-center text-lg text-foreground font-semibold">
            বাংলাদেশের যে কোনো ব্যবসার জন্য গুরুত্বপূর্ণ
          </p>
        </div>
      </div>
    </section>
  );
}
