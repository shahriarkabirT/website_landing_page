export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Darker Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]" />

        {/* Enhanced Blur Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-blue-600/20 rounded-full blur-[150px]" />

        {/* You can add a background image here */}
        {/* <img src="/banner.jpg" alt="Banner" className="w-full h-full object-cover opacity-20" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 text-left">
            {/* Brand */}
            <div className="inline-block">
              <span className="text-sm font-semibold tracking-widest text-purple-400 uppercase">
                Collaborative Cloud
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                শুধুমাত্র ৫,০০০ টাকায়
              </h1>
              <h2 className="text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                  নিজের ই-কমার্স স্টোর!
                </span>
                <span className="ml-3 inline-block animate-pulse">🚀</span>
              </h2>
            </div>

            {/* Pricing Info */}
            <div className="space-y-3 py-4">
              <p className="text-lg sm:text-xl text-gray-300 font-medium">
                ✅ পূর্ণ ১ বছরের হোস্টিং ফ্রি
              </p>
              <p className="text-lg sm:text-xl text-gray-300 font-medium">
                ✅ ডোমেইন সহ সম্পূর্ণ সেটআপ
              </p>
              <div className="flex items-baseline gap-3">
                <p className="text-3xl sm:text-4xl font-bold text-white">
                  মাত্র ৫,০০০ টাকা
                </p>
                <span className="text-2xl">🔥</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-base font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50"
              >
                <span>শুরু করুন এখনই</span>
                <span>→</span>
              </a>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2 pt-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500" />
              <p className="text-sm text-gray-400 font-medium">
                অফার চলবে ১০শে জানুয়ারি ২০২৬ পর্যন্ত
              </p>
            </div>
          </div>

          {/* Right Side - Large Discount Badge */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              {/* Enhanced Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-[120px] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-[100px]" />

              <div className="relative text-center">
                <div className="text-[9rem] font-black bg-gradient-to-b from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent leading-none drop-shadow-2xl">
                  70%
                </div>
                <div className="text-5xl font-bold text-white/90 tracking-[0.3em] -mt-4">
                  OFF
                </div>

                {/* Enhanced Decorative elements */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-500/40 rounded-full blur-2xl" />
                <div className="absolute top-1/2 right-0 w-24 h-24 bg-pink-400/25 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
