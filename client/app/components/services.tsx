export default function Services() {
  const services = [
    {
      title: "Business Website",
      description: "আপনার ব্যবসার জন্য প্রফেশনাল ওয়েবসাইট",
    },
    {
      title: "E-Commerce Website",
      description: "অনলাইন স্টোর সেটআপ এবং পেমেন্ট ইন্টিগ্রেশন",
    },
    {
      title: "Portfolio Website",
      description: "আপনার কাজ প্রদর্শনের জন্য পোর্টফোলিও সাইট",
    },
    {
      title: "Company Profile Site",
      description: "কোম্পানির তথ্য এবং সেবা প্রদর্শন",
    },
    {
      title: "Landing Page",
      description: "বিক্রয়ের জন্য উচ্চ-কনভার্সন ল্যান্ডিং পেজ",
    },
    {
      title: "Custom Web Application",
      description: "বিশেষ প্রয়োজন অনুযায়ী কাস্টম ওয়েব অ্যাপ",
    },
    {
      title: "SEO & Speed Optimization",
      description: "সার্চ ইঞ্জিন অপ্টিমাইজেশন এবং দ্রুততা",
    },
    {
      title: "Website Redesign",
      description: "পুরাতন ওয়েবসাইট আধুনিকীকরণ এবং আপগ্রেড",
    },
  ];

  return (
    <section className="py-20 border-b border-border/50 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Complete Web Development Solutions — সম্পূর্ণ ওয়েব ডেভেলপমেন্ট
            সার্ভিস
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border/50 bg-background hover:border-border transition-all hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
