"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      question: "কতদিনে ওয়েবসাইট তৈরি হবে?",
      answer: "সাধারণত ৩–৭ দিনের মধ্যে। জটিলতা অনুযায়ী সময় বেশি হতে পারে।",
    },
    {
      question: "ডোমেইন ও হোস্টিং কি আপনারা দেবেন?",
      answer:
        "হ্যাঁ, চাইলে আমরা সেটআপ করে দিতে পারি। অথবা আপনার নিজের ডোমেইন/হোস্টিং ব্যবহার করতে পারেন।",
    },
    {
      question: "আমি কি পরে ওয়েবসাইট এডিট করতে পারব?",
      answer:
        "হ্যাঁ, আমরা ইউজার-ফ্রেন্ডলি ড্যাশবোর্ড দেই যাতে আপনি সহজেই কন্টেন্ট আপডেট করতে পারেন।",
    },
    {
      question: "Payment process কি?",
      answer:
        "৫০% অগ্রিম + ৫০% কমপ্লিশনের পর। আমরা bKash, Nagad, Bank Transfer সব মাধ্যম গ্রহণ করি।",
    },
    {
      question: "How long do you provide support?",
      answer:
        "We provide 1 month of free support included in all plans. After that, you can opt for monthly support packages.",
    },
    {
      question: "কি SEO সার্ভিস অন্তর্ভুক্ত আছে?",
      answer:
        "হ্যাঁ, বেসিক SEO সব প্ল্যানে অন্তর্ভুক্ত। অ্যাডভান্সড SEO এর জন্য আমাদের সাথে যোগাযোগ করুন।",
    },
  ];

  return (
    <section className="py-20 border-b border-border/50 bg-secondary/20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">সাধারণ প্রশ্নের উত্তর</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-4 text-left bg-background hover:bg-secondary/30 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === i && (
                <div className="px-6 py-4 bg-secondary/20 border-t border-border/50">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
