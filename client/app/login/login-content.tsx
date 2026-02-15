"use client"

import LoginView from "@/app/components/auth/login-view"

export default function LoginContent() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-20">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <LoginView />
            </div>
        </main>
    )
}
