import ContactForm from "./components/contact-form";
import Hero from "./components/hero";
import Templates from "./components/templates";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <Templates />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 border-t border-border/50 bg-secondary/20"
      >
        <div className="mx-auto max-w-2xl px-6">
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
