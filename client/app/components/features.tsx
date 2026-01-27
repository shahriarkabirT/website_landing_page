"use client"

import { motion } from "framer-motion"

export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Fast & Modern",
      description: "আমরা দ্রুত, আধুনিক ওয়েবসাইট তৈরি করি যা দ্রুত লোড হয়।",
    },
    {
      icon: "🔍",
      title: "SEO Ready",
      description: "সার্চ ইঞ্জিনের জন্য অপ্টিমাইজড এবং মোবাইল-বান্ধব ডিজাইন।",
    },
    {
      icon: "💼",
      title: "Professional",
      description: "ব্যবসায়িক গুণমান এবং পেশাদার ডিজাইন নিশ্চিত করা হয়।",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-20 border-b border-border/50 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground">
            আমাদের পরিষেবা সম্পর্কে জানুন — Why Work With Our Team?
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 rounded-xl border border-border/50 bg-background hover:border-border transition-colors hover:shadow-lg"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 grid md:grid-cols-4 gap-4 pt-12 border-t border-border/50"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">100+</p>
            <p className="text-sm text-muted-foreground">Completed Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">✓</p>
            <p className="text-sm text-muted-foreground">Modern & Responsive</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">✓</p>
            <p className="text-sm text-muted-foreground">
              Free 1-Month Support
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">✓</p>
            <p className="text-sm text-muted-foreground">Affordable Packages</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
