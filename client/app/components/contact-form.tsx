"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", businessName: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error");
    }
  };

  return (
    <div className="space-y-8">
   
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Your Name / আপনার নাম
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-secondary/50 border-border/50 rounded-lg h-11 transition-all duration-200 focus:bg-background focus:border-primary/50"
          />
        </div>

        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Business Name / ব্যবসার নাম
          </label>
          <Input
            id="businessName"
            type="text"
            name="businessName"
            placeholder="Your Business Name"
            value={form.businessName}
            onChange={handleChange}
            required
            className="w-full bg-secondary/50 border-border/50 rounded-lg h-11 transition-all duration-200 focus:bg-background focus:border-primary/50"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Phone Number / ফোন নম্বর
          </label>
          <Input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+880 1X XXX XXXXX"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full bg-secondary/50 border-border/50 rounded-lg h-11 transition-all duration-200 focus:bg-background focus:border-primary/50"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Your Message / আপনার বার্তা
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full resize-none bg-secondary/50 border-border/50 rounded-lg transition-all duration-200 focus:bg-background focus:border-primary/50"
          />
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-11 text-base font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all duration-200"
          size="lg"
        >
          {status === "loading" ? "Sending..." : "Send Message / পাঠান"}
        </Button>

        {status === "success" && (
          <div className="rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20 p-4 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-green-700 font-medium">
              ✓ Message sent successfully! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-xl bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20 p-4 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-red-700 font-medium">✗ {error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
