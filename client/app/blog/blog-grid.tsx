"use client"

import Link from "next/link"
import { ArrowRight, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import { BlogPost } from "@/lib/blog-data"

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {posts.map((post) => (
                <motion.div key={post.id} variants={item}>
                    <Link
                        href={`/blog/${post.slug}`}
                        className="group block h-full"
                    >
                        <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full hover:border-blue-200 dark:hover:border-blue-800">
                            <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 font-bangla">
                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full font-bold">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {post.readTime}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 font-bangla leading-snug group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 font-bangla line-clamp-3 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div className="text-xs">
                                            <p className="font-bold text-slate-900 dark:text-white font-bangla">{post.author}</p>
                                            <p className="text-slate-500 font-bangla">{post.date}</p>
                                        </div>
                                    </div>

                                    <span className="text-blue-600 font-bold text-sm font-bangla flex items-center gap-1 group-hover:gap-2 transition-all translate-x-0 group-hover:translate-x-1">
                                        বিস্তারিত <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </article>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    )
}
