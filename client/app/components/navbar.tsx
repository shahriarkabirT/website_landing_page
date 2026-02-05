"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogOut, User } from "lucide-react"

import Image from "next/image"

export default function Navbar() {
    const { user, logout } = useAuth()

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="idokans.com"
                        width={100}
                        height={100}
                        className="w-24 h-24 object-contain"
                    />

                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/features" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Features</Link>
                    <Link href="/demos" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Demos</Link>
                    <Link href="/#pricing" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Pricing</Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}>
                                <Button variant="ghost" className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                                </Button>
                            </Link>
                            <Button onClick={logout} variant="outline" className="flex items-center gap-2 font-bold text-red-600 border-red-100 hover:bg-red-50 rounded-xl">
                                <LogOut className="w-4 h-4" /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button variant="ghost" className="font-bold text-slate-700 dark:text-slate-300">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 px-6">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
