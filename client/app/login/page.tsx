import { Metadata } from "next"
import LoginContent from "./login-content"

export const metadata: Metadata = {
    title: "লগিন | idokans.com Dashboard",
    description: "আপনার অ্যাকাউন্টে লগিন করুন এবং অনলাইন দোকান ম্যানেজ করুন।",
}

export default function LoginPage() {
    return <LoginContent />
}
