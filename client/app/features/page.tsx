import { Metadata } from "next"
import FeaturesContent from "./features-content"

export const metadata: Metadata = {
    title: "ই-কমার্স ফিচারসমূহ | idokans.com",
    description: "ইনভেন্টরি ম্যানেজমেন্ট, অর্ডার ট্র্যাকিং, কাস্টম ডোমেইন, এসএসএল এবং আরও অনেক কিছু। আপনার ব্যবসার জন্য সম্পূর্ণ ফিচার লিস্ট।",
}

export default function FeaturesPage() {
    return <FeaturesContent />
}
