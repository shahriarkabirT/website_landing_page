export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    readTime: string;
    author: string;
    category: string;
    image: string;
    content: string; // HTML content
    metaDescription: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "how-to-start-online-business-bangladesh-complete-guide",
        title: "বাংলাদেশে অনলাইন ব্যবসা বা ই-কমার্স শুরু করার পূর্ণাঙ্গ গাইডলাইন (২০২৬)",
        excerpt: "চাকরির পাশাপাশি বা ফুল-টাইম পেশা হিসেবে ই-কমার্স ব্যবসা শুরু করতে চান? প্রোডাক্ট সোর্সিং থেকে ডেলিভারি - জেনে নিন সফল হওয়ার সম্পূর্ণ রোডম্যাপ।",
        metaDescription: "অনলাইন ব্যবসা কিভাবে শুরু করবেন? প্রোডাক্ট সোর্সিং, ফেসবুক পেইজ, ওয়েবসাইট তৈরি এবং ডেলিভারি নিয়ে বিস্তারিত গাইডলাইন। জিরো থেকে হিরো হওয়ার কমপ্লিট রোডম্যাপ।",
        date: "১০ ফেব্রুয়ারি, ২০২৬",
        readTime: "১২ মিনিট",
        author: "শাহরিয়ার কবির",
        image: "/blog/start-business.jpg",
        category: "উদ্যোক্তা গাইড",
        content: `
            <p class="lead text-xl font-medium text-slate-700 dark:text-slate-300 mb-8 border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                বাংলাদেশে বর্তমানে ই-কমার্স বাজারের আকার প্রায় ৩ বিলিয়ন ডলার। প্রতিদিন হাজার হাজার মানুষ অনলাইনে কেনাকাটা করছেন। আপনিও যদি এই বিশাল বাজারের অংশ হতে চান, তবে এই গাইডলাইনটি আপনার জন্য। এখানে আমরা ধাপে ধাপে আলোচনা করব কিভাবে শূন্য থেকে একটি সফল অনলাইন ব্যবসা দাঁড় করাবেন।
            </p>

            <div class="my-10 p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 class="text-xl font-bold mb-4 text-slate-900 dark:text-white">সূচিপত্র:</h3>
                <ul class="space-y-2 text-blue-600 dark:text-blue-400 font-medium">
                    <li>১. সঠিক ক্যাটালগ বা নিস (Niche) নির্বাচন</li>
                    <li>২. নির্ভরযোগ্য প্রোডাক্ট সোর্সিং</li>
                    <li>৩. ব্র্যান্ডিং এবং প্রফেশনাল উপস্থিতি (ওয়েবসাইট vs ফেসবুক)</li>
                    <li>৪. ডেলিভারি ও লজিস্টিকস ম্যানেজমেন্ট</li>
                    <li>৫. মার্কেটিং এবং সেলস ফানেল</li>
                </ul>
            </div>
            
            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">১. সঠিক ক্যাটালগ বা নিস (Niche) নির্বাচন</h2>
            <p>অধিকাংশ নতুন উদ্যোক্তা ভুল করেন এখানেই। তারা দেখাদেখি এমন পন্য নিয়ে কাজ শুরু করেন যা ইতিমধ্যে বাজারে সয়লাব (যেমন: সাধারণ সালোয়ার কামিজ বা টি-শার্ট)। সফল হতে হলে আপনাকে 'প্রবলেম সলভিং' প্রোডাক্ট বা ইউনিক কিছু নিয়ে কাজ করতে হবে।</p>
            <ul class="list-disc pl-6 mb-6 mt-4 space-y-3">
                <li><strong>কমপিটিশন এনালাইসিস:</strong> আপনি যে প্রোডাক্ট বিক্রি করতে চান, তা নিয়ে ফেসবুকে সার্চ করুন। দেখুন অন্যরা কত দামে দিচ্ছে এবং তাদের কাস্টমার ফিডব্যাক কী।</li>
                <li><strong>প্রফিট মার্জিন:</strong> এমন প্রোডাক্ট বাছুন যেখানে অন্তত ৩০-৪০% লাভ থাকে। কারণ মার্কেটিং এবং ডেলিভারি কস্টে ভালো একটা অংশ চলে যাবে।</li>
            </ul>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">২. নির্ভরযোগ্য প্রোডাক্ট সোর্সিং</h2>
            <p>প্রোডাক্ট কোথা থেকে কিনবেন? এটি ব্যবসার লাইফলাইন।</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="p-5 border rounded-xl bg-white dark:bg-slate-800">
                    <h4 class="font-bold text-lg mb-2 text-indigo-600">দেশীয় সোর্সিং (হোলসেল মার্কেট)</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">চকবাজার, ইসলামপুর বা বঙ্গবাজার থেকে সরাসরি হোলসেলে কিনতে পারেন। এতে শিপিং কস্ট কম এবং দ্রুত প্রোডাক্ট হাতে পাওয়া যায়।</p>
                </div>
                <div class="p-5 border rounded-xl bg-white dark:bg-slate-800">
                    <h4 class="font-bold text-lg mb-2 text-indigo-600">গ্লোবাল সোর্সিং (চীন/আলিবাবা)</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400">ইউনিক গ্যাজেট বা লাইফস্টাইল আইটেমের জন্য চীন সেরা। আলিবাবা থেকে স্যাম্পল আনিয়ে ভালো লাগলে বাল্ক অর্ডার করতে পারেন। শিপিংয়ের জন্য ভালো ফ্রেড ফরোয়ার্ডার ব্যবহার করুন।</p>
                </div>
            </div>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">৩. ব্র্যান্ডিং এবং প্রফেশনাল উপস্থিতি</h2>
            <p>শুধু একটি ফেসবুক পেজ দিয়ে এখন আর কাস্টমারের বিশ্বাস অর্জন করা কঠিন। কাস্টমাররা এখন অনেক সচেতন। তারা পেজ দেখার পর গুগল করে ওয়েবসাইট খোঁজে।</p>
            
            <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 my-6">
                <h4 class="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-400">⚠️ সতর্কর্তা:</h4>
                <p>ফেসবুক পেজ যেকোনো সময় রেস্ট্রিক্ট বা হ্যাক হতে পারে। তাছাড়া ফেসবুকের অ্যালগরিদম প্রতিনিয়ত বদলায়। তাই নিজের ওয়েবসাইট থাকা মানে ব্যবসার চাবিকাঠি নিজের হাতে রাখা।</p>
            </div>

            <h3 class="text-2xl font-bold mt-8 mb-4">ওয়েবসাইট কেন জরুরি?</h3>
            <ul class="list-check pl-6 mb-6 mt-4 space-y-3">
                <li class="flex items-start gap-2"><span class="text-green-500 font-bold">✓</span> <span><strong>অটোমেশন:</strong> কাস্টমার রাত ৩টায় অর্ডার করলেও ওয়েবসাইট তা প্রসেস করবে।</span></li>
                <li class="flex items-start gap-2"><span class="text-green-500 font-bold">✓</span> <span><strong>ডাটা কালেকশন:</strong> পিক্সেল সেটআপ করে আপনি ট্র্যাক করতে পারবেন কে আপনার সাইটে এসেছে, যা রি-টার্গেটিং এ কাজে লাগে।</span></li>
                <li class="flex items-start gap-2"><span class="text-green-500 font-bold">✓</span> <span><strong>ব্র্যান্ড ভ্যালু:</strong> নিজস্ব ডোমেইন (যেমন .com) থাকলে কাস্টমার আপনাকে "আসল কোম্পানি" মনে করে।</span></li>
            </ul>
            <p class="mb-4">idokans.com এর মতো প্ল্যাটফর্ম ব্যবহার করে আপনি মাত্র কয়েক মিনিটে নিজের প্রফেশনাল ই-কমার্স ওয়েবসাইট তৈরি করে নিতে পারেন, কোনো কোডিং নলেজ ছাড়াই।</p>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">৪. ডেলিভারি ও লজিস্টিকস</h2>
            <p>বাংলাদেশে এখন বেশ কিছু বিশ্বস্ত কুরিয়ার সার্ভিস আছে। পাঠাও, রেডএক্স, বা স্টেডফাস্ট কুরিয়ারের সাথে মার্চেন্ট একাউন্ট খুলে নিন।</p>
            <ul class="list-disc pl-6 mb-6 mt-4 space-y-3">
                <li><strong>প্যাকেজিং:</strong> প্রডাক্ট যত ভালোই হোক, প্যাকেজিং খারাপ হলে কাস্টমার ইম্প্রেশন খারাপ হবে। ভালো মানের বক্স এবং বাবল র‍্যাপ ব্যবহার করুন।</li>
                <li><strong>ডেলিভারি চার্জ:</strong> ওয়েবসাইটের চেকআউটে স্পষ্ট করে ডেলিভারি চার্জ উল্লেখ করুন। ইনসাইড ঢাকা ৬০-৮০ টাকা এবং আউটসাইড ১০০-১৫০ টাকা স্ট্যান্ডার্ড।</li>
            </ul>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">উপসংহার</h2>
            <p>অনলাইন ব্যবসা কোনো "রাতারাতি বড়লোক হওয়ার" স্কিম নয়। এটি একটি ধৈর্য এবং কৌশলের খেলা। সঠিক প্ল্যানিং, ভালো প্রোডাক্ট এবং কাস্টমার সার্ভিসে ফোকাস করলে সাফল্য আসবেই। আপনার ই-কমার্স যাত্রার বিশ্বস্ত সঙ্গী হতে idokans.com আছে আপনার পাশে।</p>
        `
    },
    {
        id: 2,
        slug: "ecommerce-website-cost-analysis-bangladesh",
        title: "ই-কমার্স ওয়েবসাইট তৈরির খরচ: কাস্টম ডেভেলপমেন্ট বনাম SaaS (বিস্তারিত হিসাব)",
        excerpt: "নতুন ওয়েবসাইট বানানোর আগে বাজেট নিয়ে চিন্তিত? কাস্টম সাইট ডেভেলপমেন্ট নাকি মাসিক সাবস্ক্রিপশন - কোনটিতে আপনার টাকা এবং সময় বাঁচবে? দেখুন বিস্তারিত তুলনামূলক বিশ্লেষণ।",
        metaDescription: "বাংলাদেশে ই-কমার্স ওয়েবসাইট তৈরির খরচ কত? ডোমেইন, হোস্টিং, এবং ডেভেলপমেন্ট কস্টের বিস্তারিত হিসাব। SaaS প্ল্যাটফর্ম vs কাস্টম কোডিং - কোনটি বেশি লাভজনক?",
        date: "৮ ফেব্রুয়ারি, ২০২৬",
        readTime: "১০ মিনিট",
        author: "টেক এনালিস্ট",
        image: "/blog/cost-analysis.jpg",
        category: "ফিন্যান্সিয়াল গাইড",
        content: `
            <p class="lead text-xl font-medium text-slate-700 dark:text-slate-300 mb-8">
                একজন নতুন উদ্যোক্তার জন্য প্রতিটি টাকা গুরুত্বপূর্ণ। ওয়েবসাইট তৈরির সিদ্ধান্ত নেওয়ার সময় অনেকেই দ্বিধায় থাকেন—আমি কি লাখ টাকা খরচ করে সাইট বানাবো, নাকি মাসিক ভাড়ায় চালাবো? এই আর্টিকেলে আমরা পাই-টু-পাই হিসাব করে দেখবো কোনটি আপনার ব্যবসার জন্য বুদ্ধিমানের কাজ।
            </p>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">অপশন ১: কাস্টম ডেভেলপমেন্ট (এজেন্সি বা ফ্রিল্যান্সার)</h2>
            <p>আপনি যখন কোনো এজেন্সিকে দিয়ে নিজের মতো করে সাইট বানিয়ে নেন।</p>

            <div class="overflow-x-auto my-8">
                <table class="w-full text-left border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead>
                        <tr class="bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <th class="p-4 border border-slate-300 dark:border-slate-700">খাত (Cost Items)</th>
                            <th class="p-4 border border-slate-300 dark:border-slate-700">আনুমানিক খরচ (১ম বছর)</th>
                            <th class="p-4 border border-slate-300 dark:border-slate-700">মন্তব্য</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white dark:bg-slate-900">
                            <td class="p-4 border border-slate-300 dark:border-slate-700 font-bold">ডেভেলপমেন্ট চার্জ</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">৫০,০০০ - ১,৫০,০০০+ টাকা</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">প্রফেশনাল এজেন্সির রেট। ফ্রিল্যান্সার কম নিতে পারে তবে ঝুঁকি থাকে।</td>
                        </tr>
                        <tr class="bg-slate-50 dark:bg-slate-950">
                            <td class="p-4 border border-slate-300 dark:border-slate-700 font-bold">ডোমেইন ও হোস্টিং</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">১০,০০০ - ২০,০০০ টাকা/বছর</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">ভাল স্পিড এবং সিকিউরিটির জন্য প্রিমিয়াম সার্ভার লাগবে।</td>
                        </tr>
                        <tr class="bg-white dark:bg-slate-900">
                            <td class="p-4 border border-slate-300 dark:border-slate-700 font-bold">মেইনটেনেন্স (AMC)</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">২০,০০০ - ৩০,০০০ টাকা/বছর</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">সাইট হ্যাক হলে বা আপডেট লাগলে সার্ভিস চার্জ।</td>
                        </tr>
                        <tr class="bg-red-50 dark:bg-red-900/20 font-bold text-red-700 dark:text-red-400">
                            <td class="p-4 border border-slate-300 dark:border-slate-700">সর্বমোট (Total)</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">৮০,০০০ - ২,০০,০০০ টাকা</td>
                            <td class="p-4 border border-slate-300 dark:border-slate-700">শুরুর বছরেই বিশাল বিনিয়োগ।</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-2xl font-bold mt-8 mb-4">কাস্টম সাইটের সুবিধা ও অসুবিধা</h3>
            <ul class="space-y-3 mb-8">
                <li class="flex gap-2"><span class="text-green-600 font-bold">PROS:</span> সম্পূর্ণ নিজের মালিকানা, ইউনিক ডিজাইন।</li>
                <li class="flex gap-2"><span class="text-red-600 font-bold">CONS:</span> অনেক বেশি খরচ, সময়সাপেক্ষ (২-৩ মাস লাগে), টেকনিক্যাল মেইনটেনেন্স নিজেকেই দেখতে হয়।</li>
            </ul>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">অপশন ২: SaaS প্ল্যাটফর্ম (যেমন idokans.com)</h2>
            <p>রেডিমেড সফটওয়্যার ভাড়া নেওয়া। টেকনিক্যাল সব দায়িত্ব কোম্পানির।</p>

            <div class="overflow-x-auto my-8">
                <table class="w-full text-left border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead>
                        <tr class="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-200">
                            <th class="p-4 border border-indigo-200 dark:border-indigo-800">খাত (Cost Items)</th>
                            <th class="p-4 border border-indigo-200 dark:border-indigo-800">খরচ (idokans.com)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white dark:bg-slate-900">
                            <td class="p-4 border border-indigo-100 dark:border-slate-800 font-bold">সেটআপ চার্জ</td>
                            <td class="p-4 border border-indigo-100 dark:border-slate-800">মাত্র ১০০০ টাকা (এককালীন অফার)</td>
                        </tr>
                        <tr class="bg-slate-50 dark:bg-slate-950">
                            <td class="p-4 border border-indigo-100 dark:border-slate-800 font-bold">মাসিক সাবস্ক্রিপশন</td>
                            <td class="p-4 border border-indigo-100 dark:border-slate-800">৩০০ - ৫০০ টাকা (প্যাকেজ অনুযায়ী)</td>
                        </tr>
                        <tr class="bg-white dark:bg-slate-900">
                            <td class="p-4 border border-indigo-100 dark:border-slate-800 font-bold">হোস্টিং ও সিকিউরিটি</td>
                            <td class="p-4 border border-indigo-100 dark:border-slate-800"><span class="text-green-600 font-bold">ফ্রি (অন্তর্ভুক্ত)</span></td>
                        </tr>
                        <tr class="bg-green-50 dark:bg-green-900/20 font-bold text-green-700 dark:text-green-400">
                            <td class="p-4 border border-indigo-200 dark:border-slate-800">সর্বমোট (১ম বছর)</td>
                            <td class="p-4 border border-indigo-200 dark:border-slate-800">৫,০০০ - ৬,০০০ টাকা</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 class="text-2xl font-bold mt-8 mb-4">SaaS এর সুবিধা</h3>
            <ul class="list-disc pl-6 mb-6 mt-4 space-y-3">
                <li><strong>কম খরচ:</strong> কাস্টম সাইটের তুলনায় প্রায় ১৫-২০ গুণ কম খরচ।</li>
                <li><strong>টেনশন ফ্রি:</strong> সার্ভার স্লো, সাইট ডাউন বা হ্যাকিং নিয়ে ভাবতে হবে না।</li>
                <li><strong>ইনস্ট্যান্ট লাইভ:</strong> আজ রেজিস্ট্রেশন করে আজই সেল শুরু করতে পারবেন।</li>
                <li><strong>নতুন ফিচার:</strong> কোম্পানি প্রতিনিয়ত নতুন ফিচার আপডেট করে যা আপনি ফ্রিতেই পেয়ে যান।</li>
            </ul>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">ফাইনাল ভার্ডিক্ট: কোনটি আপনার জন্য?</h2>
            <p class="mb-4">আপনার যদি "দারাজ" বা "চালডাল"-এর মতো বিশাল কাস্টম রিকোয়ারমেন্ট থাকে এবং বাজেট নিয়ে সমস্যা না থাকে, তবে <strong>কাস্টম ডেভেলপমেন্টে</strong> যান।</p>
            <p>কিন্তু আপনি যদি একজন এসএমই (SME) বা এফ-কমার্স উদ্যোক্তা হন যার মূল লক্ষ্য দ্রুত এবং কম খরচে অনলাইনে সেল শুরু করা, তবে <strong>idokans.com</strong> এর মতো ক্লাউড প্ল্যাটফর্ম আপনার জন্য সেরা সিদ্ধান্ত। এতে আপনার বেঁচে যাওয়া ১-১.৫ লাখ টাকা আপনি মার্কেটিং এবং প্রোডাক্ট স্টকে বিনিয়োগ করতে পারবেন, যা আপনার ব্যবসাকে দ্রুত বড় করতে সাহায্য করবে।</p>
        `
    },
    {
        id: 3,
        slug: "digital-marketing-secrets-for-ecommerce-sales",
        title: "ডিজিটাল মার্কেটিং মাস্টারক্লাস: ট্রাফিক থেকে সেলস জেনারেট করার সিক্রেট স্ট্র্যাটেজি",
        excerpt: "বুস্ট তো অনেক করলেন, কিন্তু সেল আসছে না? রিচ এবং এনগেজমেন্টের চক্র থেকে বেরিয়ে এসে কিভাবে 'কনভার্সন' বা আসল বিক্রি বাড়াবেন - জানুন প্রো-মার্কেটারদের গোপন টিপস।",
        metaDescription: "ই-কমার্স ডিজিটাল মার্কেটিং টিউটোরিয়াল। ফেসবুক এডস ফানেল, রি-টার্গেটিং, এবং কন্টেন্ট মার্কেটিং এর মাধ্যমে কিভাবে সেলস ১০ গুণ বাড়াবেন?",
        date: "১২ ফেব্রুয়ারি, ২০২৬",
        readTime: "১৫ মিনিট",
        author: "হেড অফ মার্কেটিং",
        image: "/blog/digital-marketing-pro.jpg",
        category: "মার্কেটিং মাস্টারক্লাস",
        content: `
            <p class="lead text-xl font-medium text-slate-700 dark:text-slate-300 mb-8">
                "ভাই, ডলার খরচ করে বুস্ট করলাম, কিন্তু ইনবক্সে শুধু 'Price Please' বা 'Hi' আসে, কেউ অর্ডার করে না!" — এটি বাংলাদেশের ৯৫% অনলাইন উদ্যোক্তার আক্ষেপ। সমস্যা আপনার পণ্যে নয়, সমস্যা আপনার মার্কেটিং স্ট্র্যাটেজিতে। আজ আমরা শিখবো কিভাবে শুধু লাইক-কমেন্ট না চেয়ে, কাস্টমারকে দিয়ে 'অর্ডার' বাটনে ক্লিক করাবেন।
            </p>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">১. সেলস ফানেল (Sales Funnel) বোঝা</h2>
            <p>অপরিচিত একজন মানুষ দেখামাত্রই আপনার পণ্য কিনবে না। তাকে একটি প্রক্রিয়ার মধ্য দিয়ে আনতে হবে। একে মার্কেটিংয়ের ভাষায় ফানেল বলে।</p>
            
            <div class="space-y-4 my-8">
                <div class="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h4 class="font-bold text-lg text-blue-800 dark:text-blue-300">ধাপ ১: Awareness (পরিচিতি)</h4>
                    <p class="text-slate-600 dark:text-slate-400">কাস্টমারকে জানান যে আপনি আছেন। এখানে বিক্রির চেষ্টা করবেন না। শিক্ষামূলক বা বিনোদনমূলক ভিডিও দিন। <br><strong>উদাহরণ:</strong> "চুলের সমস্যা? জানুন সমাধান" (তেল বিক্রির অ্যাড নয়)।</p>
                </div>
                <div class="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800">
                    <h4 class="font-bold text-lg text-purple-800 dark:text-purple-300">ধাপ ২: Consideration (বিবেচনা)</h4>
                    <p class="text-slate-600 dark:text-slate-400">যারা ১ম ধাপের ভিডিও দেখেছে, তাদের কাছে আপনার পণ্যের উপকারিতা তুলে ধরুন। <br><strong>উদাহরণ:</strong> "কেন আমাদের হর্বাল অয়েল বাজারের সেরা? দেখুন কাস্টমার রিভিউ।"</p>
                </div>
                <div class="p-6 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800">
                    <h4 class="font-bold text-lg text-green-800 dark:text-green-300">ধাপ ৩: Conversion (ক্রয়)</h4>
                    <p class="text-slate-600 dark:text-slate-400">এবার অফার দিন। "আজ কিনলে ডেলিভারি ফ্রি" বা "বাই ওয়ান গেট ওয়ান"। এখানে কল-টু-অ্যাকশন (CTA) থাকবে "অর্ডার করুন"।</p>
                </div>
            </div>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">২. কন্টেন্ট ইজ কিং: ভিডিও বনাম ইমেজ</h2>
            <p>২০২৬ সালে এসে স্ট্যাটিক ইমেজের দিন শেষ। এখন ভিডিওর যুগ।</p>
            <ul class="list-disc pl-6 mb-6 mt-4 space-y-3">
                <li><strong>ব্যবহারিক ভিডিও (Demonstration):</strong> প্রোডাক্টটি কিভাবে কাজ করে তা দেখান। জামা হলে পরে দেখান, গ্যাজেট হলে চালিয়ে দেখান।</li>
                <li><strong>ইউজার জেনারেটেড কন্টেন্ট (UGC):</strong> আপনার কাস্টমাররা প্রোডাক্ট হাতে পেয়ে খুশি—এমন ভিডিও বা ছবি শেয়ার করুন। এটি নতুন কাস্টমারের বিশ্বাস অর্জনে ১০০% কার্যকরী।</li>
            </ul>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">৩. রি-টার্গেটিং: গোপন অস্ত্র</h2>
            <p>গবেষণায় দেখা গেছে, ৯৮% মানুষ প্রথমবার ওয়েবসাইট ভিজিট করে কিছুই কেনে না। আপনি কি তাদের হারিয়ে ফেলবেন? না!</p>
            <p class="mt-4"><strong>ফেসবুক পিক্সেল (Pixel)</strong> ব্যবহার করে আপনি ওই ৯৮% মানুষকে ট্র্যাক করতে পারেন। পরবর্তীতে তাদের নিউজফিডে বারবার আপনার অ্যাড দেখাতে পারেন। একে বলে রি-টার্গেটিং।</p>
            <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border-l-4 border-orange-500 italic mt-4">
                "একজন কাস্টমার একটি পণ্য কেনার আগে গড়ে ৭ বার আপনার ব্র্যান্ডের নাম দেখতে হয়।" — মার্কেটিং সাইকোলজি
            </div>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">৪. ইমোশনাল মার্কেটিং</h2>
            <p>মানুষ যুক্তিতে বিচার করে, কিন্তু আবেগে কেনে। আপনার প্রোডাক্টের ফিচার না বেচে, বেনিফিট বা ইমোশন বিক্রি করুন।</p>
            <ul class="list-disc pl-6 mb-6 mt-4 space-y-3">
                <li>খারাপ উদাহরণ: "এই ব্লেন্ডারের মোটর ১০০০ ওয়াট।" (ফিচার)</li>
                <li>ভালো উদাহরণ: "সকালে তাড়াহুড়ো? ১ মিনিটেই তৈরি করুন পুরো পরিবারের নাস্তা।" (বেনিফিট/আবেগ)</li>
            </ul>

            <h2 class="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white">বোনাস টিপস: ডাটা বিশ্লেষণ</h2>
            <p>অন্ধের মতো বুস্ট করবেন না। প্রতি সপ্তাহে অ্যাড ম্যানেজার চেক করুন:</p>
            <ul class="list-disc pl-6 mb-6 mt-4 space-y-3">
                <li>কোন বয়সের মানুষ বেশি ক্লিক করছে?</li>
                <li>কোন এলাকায় অর্ডার বেশি?</li>
                <li>ভিডিওর কোন অংশে মানুষ দেখা বন্ধ করে দিচ্ছে?</li>
            </ul>
            <p>এই ডাটা ব্যবহার করে পরবর্তী অ্যাডগুলো অপটিমাইজ করুন। মনে রাখবেন, টেস্ট, লার্ন এবং রিপিট — এটিই ডিজিটাল মার্কেটিংয়ের সাফল্যের মন্ত্র।</p>
        `
    }
]
