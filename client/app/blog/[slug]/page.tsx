import { blogPosts } from "../../../lib/blog-data"
import Navbar from "../../components/navbar"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Share2 } from "lucide-react"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{
        slug: string
    }>
}

// SEO Metadata Generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: `${post.title} | idokans.com Blog`,
        description: post.metaDescription,
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: "article",
            authors: [post.author],
            publishedTime: post.date,
            images: [post.image],
        },
    }
}

// Static Params Generator for Speed
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = blogPosts.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <Navbar />

            <article className="py-10">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    {/* Back Link */}
                    <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        ব্লগ-এ ফিরে যান
                    </Link>

                    {/* Header */}
                    <header className="mb-10 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 mb-6 font-bangla">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full font-bold">
                                {post.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {post.readTime}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8 font-bangla">
                            {post.title}
                        </h1>

                        {/* Author */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <User className="w-5 h-5 text-slate-500" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-900 dark:text-white text-sm font-bangla">{post.author}</p>
                                <p className="text-xs text-slate-500">Content Writer, idokans.com</p>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {/* 
                    <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-xl">
                        <Image 
                            src={post.image} 
                            alt={post.title} 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                    */}

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-slate font-bangla prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-loose">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    {/* Share & Footer */}
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg font-bangla">
                                লেখাটি শেয়ার করুন:
                            </h3>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition">
                                    <Linkedin className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-300 dark:hover:bg-slate-700 transition">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* CTA Section */}
            <section className="py-20 bg-slate-100 dark:bg-slate-900 mt-20">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 font-bangla">
                        আপনার ব্যবসাকে পরবর্তী লেভেলে নিয়ে যান
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                        মাত্র ১০০০ টাকায় নিজের ই-কমার্স ওয়েবসাইট তৈরি করুন। কোনো কোডিং বা টেকনিক্যাল নলেজ ছাড়াই।
                    </p>
                    <Link
                        href="/#pricing"
                        className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition-all"
                    >
                        প্যাকেজ দেখুন
                    </Link>
                </div>
            </section>
        </main>
    )
}
