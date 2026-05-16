import ContactForm from "./components/contact-form";
import Hero from "./components/hero";
import Templates from "./components/templates";
import Pricing from "./components/pricing";
import Navbar from "./components/navbar";
import DemoSection from "./components/demo-section";
import ConsultationForm from "./components/consultation-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <DemoSection />

      {/* <Templates /> */}
      <Pricing />
      <ConsultationForm />

      <section id="contact" className="py-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-6">
          <ContactForm />
        </div>
      </section>


    </main>
  );
}
