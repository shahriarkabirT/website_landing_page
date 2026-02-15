"use client"

import { Suspense } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import LoginView from "./login-view"

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                className="max-w-md p-8 sm:p-12 bg-white dark:bg-slate-900 border-none rounded-[2.5rem] shadow-2xl"
                closeButtonClassName="top-8 right-8"
            >
                <Suspense fallback={
                    <div className="flex items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                }>
                    <LoginView onSuccess={onClose} />
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}
