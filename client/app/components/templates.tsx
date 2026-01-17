import Image from "next/image";

export default function Templates() {
  const templates = [
    {
      name: "ফ্যাশন স্টোর",
      category: "পোশাক ও অ্যাক্সেসরিজ",
      icon: "👔",
      features: ["অনলাইন পেমেন্ট", "প্রোডাক্ট ক্যাটালগ"],
    },
    {
      name: "কসমেটিক্স শপ",
      category: "সৌন্দর্য পণ্য",
      icon: "💄",
      features: ["স্টক ম্যানেজমেন্ট", "কাস্টমার রিভিউ"],
    },
    {
      name: "ইলেকট্রনিক্স",
      category: "গ্যাজেট ও ডিভাইস",
      icon: "📱",
      features: ["ওয়ারেন্টি ট্র্যাকিং", "স্পেক কম্পেয়ার"],
    },
    {
      name: "জেনারেল স্টোর",
      category: "সব ধরণের পণ্য",
      icon: "🏪",
      features: ["মাল্টি-ভেন্ডর", "ডেলিভারি ট্র্যাকিং"],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-black dark:bg-white border border-black dark:border-white mb-4">
            <span className="text-sm font-semibold text-white dark:text-black">
              ✨ প্রিমিয়াম টেম্পলেট
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
            আপনার ব্যবসার জন্য
            <br />
            <span className="text-black dark:text-white font-black">
              পারফেক্ট টেম্পলেট
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            রেডি-টু-ইউজ প্রফেশনাল ডিজাইন। আপনার ব্র্যান্ড অনুযায়ী ১০০%
            কাস্টমাইজ করুন
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {templates.map((template, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 hover:border-black dark:hover:border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              {/* Template Preview with placeholder image */}
              <div className="aspect-[4/5] bg-gray-100 dark:bg-slate-800 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src="/placeholder.svg"
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Icon Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                    <div className="text-8xl mb-4 drop-shadow-2xl">
                      {template.icon}
                    </div>
                    {/* Preview Badge */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="inline-block px-4 py-2 rounded-full bg-black dark:bg-white backdrop-blur-sm text-sm font-semibold text-white dark:text-black">
                        প্রিভিউ দেখুন
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Badge */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {template.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-medium text-slate-700 dark:text-slate-300 shadow-md"
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6 bg-white dark:bg-slate-900">
                <h3 className="font-bold text-xl text-foreground mb-2 transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {template.category}
                </p>
                <button className="w-full px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-200">
                  এটি ব্যবহার করুন
                </button>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="relative text-center bg-black dark:bg-white rounded-3xl p-10 sm:p-16 border-2 border-black dark:border-white shadow-2xl overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl sm:text-5xl font-bold text-white dark:text-black mb-8 leading-tight">
              এক বার সাবস্ক্রিপশন বহুর পার!
            </h3>

            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-4xl sm:text-5xl font-bold text-gray-400 dark:text-gray-600 line-through opacity-60">
                ২৮,০০০ টাকা
              </span>
            </div>

            <div className="inline-block px-8 py-4 bg-white dark:bg-black rounded-2xl mb-10 border-2 border-white dark:border-black">
              <div className="text-5xl sm:text-6xl font-black text-black dark:text-white">
                মাত্র ৫,০০০ টাকা বছরে
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-white dark:bg-black text-black dark:text-white text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white dark:border-black"
            >
              <span>অর্ডার করুন এখনই</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
