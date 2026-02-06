"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogOut, User, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

import Image from "next/image"

export default function Navbar() {
    const { user, logout } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["demos", "pricing", "contact"]
            let current = ""

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = `#${section}`
                    }
                }
            }
            setActiveSection(current)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/" && activeSection === ""
        if (path.startsWith("/#")) return pathname === "/" && activeSection === path.substring(1)
        return pathname === path
    }
    const linkClass = (path: string) => `text-sm font-bold transition-colors ${isActive(path) ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-blue-600"}`
    const mobileLinkClass = (path: string) => `text-base font-bold transition-colors ${isActive(path) ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400 hover:text-blue-600"}`

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

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className={linkClass("/")}>হোম</Link>
                    <Link href="/#demos" className={linkClass("/#demos")}>ডেমো</Link>

                    <Link href="/#pricing" className={linkClass("/#pricing")}>প্যাকেজ</Link>
                    <Link href="/features" className={linkClass("/features")}>ই-কমার্স ফিচারগুলো</Link>
                    <Link href="/#contact" className={linkClass("/#contact")}>যোগাযোগ</Link>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}>
                                <Button variant="ghost" className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                                    <LayoutDashboard className="w-4 h-4" /> ড্যাশবোর্ড
                                </Button>
                            </Link>
                            <Button onClick={logout} variant="outline" className="flex items-center gap-2 font-bold text-red-600 border-red-100 hover:bg-red-50 rounded-xl">
                                <LogOut className="w-4 h-4" /> লগআউট
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button variant="ghost" className="font-bold text-slate-700 dark:text-slate-300">লগিন</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 px-6">
                                    শুরু করুন
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 dark:text-slate-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
                    <Link href="/" className={mobileLinkClass("/")} onClick={() => setIsMobileMenuOpen(false)}>হোম</Link>
                    <Link href="/features" className={mobileLinkClass("/features")} onClick={() => setIsMobileMenuOpen(false)}>ফিচার</Link>
                    <Link href="/#demos" className={mobileLinkClass("/#demos")} onClick={() => setIsMobileMenuOpen(false)}>ডেমো</Link>
                    <Link href="/#pricing" className={mobileLinkClass("/#pricing")} onClick={() => setIsMobileMenuOpen(false)}>প্যাকেজ</Link>
                    <Link href="/#contact" className={mobileLinkClass("/#contact")} onClick={() => setIsMobileMenuOpen(false)}>যোগাযোগ</Link>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />

                    {user ? (
                        <div className="flex flex-col gap-3">
                            <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
                                    <LayoutDashboard className="w-4 h-4" /> ড্যাশবোর্ড
                                </Button>
                            </Link>
                            <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="outline" className="w-full justify-start flex items-center gap-2 font-bold text-red-600 border-red-100 hover:bg-red-50 rounded-xl">
                                <LogOut className="w-4 h-4" /> লগআউট
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start font-bold text-slate-700 dark:text-slate-300">লগিন</Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20">
                                    শুরু করুন
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}
