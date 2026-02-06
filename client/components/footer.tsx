"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800 font-sans">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="idokans.com"
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-bangla">
                            Your digital partner for business growth. Start your online journey today.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog & News</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                            <li><Link href="/career" className="hover:text-blue-600 transition-colors">Career</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/refund" className="hover:text-blue-600 transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Social</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-pink-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
                        © {new Date().getFullYear()} <span className="font-bold text-slate-900 dark:text-white">idokans.com</span>. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
                        <Link href="/terms" className="hover:text-blue-600">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
