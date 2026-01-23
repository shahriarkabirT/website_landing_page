import ContactForm from "./components/contact-form";
import Hero from "./components/hero";
import Templates from "./components/templates";
import Pricing from "./components/pricing";
import Navbar from "./components/navbar";
import ConsultationForm from "./components/consultation-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <Templates />
      <Pricing />
      <ConsultationForm />

      <section id="contact" className="py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-6">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Professional Web Development</p>
          <p className="mt-2">আপনার ব্যবসার জন্য সেরা ওয়েবসাইট সমাধান</p>
        </div>
      </footer>
    </main>
  );
}
