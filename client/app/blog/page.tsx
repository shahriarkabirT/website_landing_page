import Navbar from "../components/navbar"
import { Metadata } from "next"
import { blogPosts } from "../../lib/blog-data"
import BlogGrid from "./blog-grid"

export const metadata: Metadata = {
    title: "ব্লগ ও নিউজ | idokans.com",
    description: "ই-কমার্স ব্যবসার টিপস, ট্রিক্স এবং আমাদের নতুন ফিচার আপডেট।",
}

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Navbar />

            <div className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        আমাদের ব্লগ ও নিউজ
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        ই-কমার্স ব্যবসার টিপস, ট্রিক্স এবং আমাদের নতুন আপডেট সম্পর্কে জানতে নিয়মিত পড়ুন।
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16">
                <BlogGrid posts={blogPosts} />
            </div>
        </main>
    )
}
