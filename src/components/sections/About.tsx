"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const TELEGRAM_URL = "https://t.me/adiosagency_bot";

export default function About() {
  const t = useTranslations("about");
  const cta = useTranslations("cta");

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>

        <motion.p
          className="text-lg text-gray-400 leading-relaxed mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("text")}
        </motion.p>

        {/* CTA Block */}
        <motion.div
          className="glass rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            {cta("title")}
          </h3>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 100%)",
              boxShadow: "0 0 30px rgba(255, 42, 31, 0.3)",
            }}
          >
            {cta("button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
