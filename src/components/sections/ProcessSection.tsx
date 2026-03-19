"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const icons = [
  // Step 1 - Tell us your problem
  (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  // Step 2 - We build it
  (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  // Step 3 - Keep it
  (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
];

export default function ProcessSection() {
  const t = useTranslations("process");

  const steps = [
    {
      number: t("step1Number"),
      title: t("step1Title"),
      description: t("step1Description"),
    },
    {
      number: t("step2Number"),
      title: t("step2Title"),
      description: t("step2Description"),
    },
    {
      number: t("step3Number"),
      title: t("step3Title"),
      description: t("step3Description"),
    },
  ];

  return (
    <section id="process" className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse, rgba(255,42,31,0.05) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.p
            className="text-xs tracking-[0.3em] uppercase mb-4 font-medium"
            style={{ color: "#FF5A2F" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t("label")}
          </motion.p>
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t("title")}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("titleHighlight")}
            </span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-14 left-[16.6%] right-[16.6%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,42,31,0.3) 30%, rgba(255,90,47,0.3) 70%, transparent)",
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon circle */}
              <motion.div
                className="relative w-28 h-28 rounded-full flex items-center justify-center mb-8 z-10"
                style={{
                  background: "rgba(255,42,31,0.06)",
                  border: "1px solid rgba(255,42,31,0.15)",
                }}
                whileHover={{
                  boxShadow: "0 0 40px rgba(255,42,31,0.2)",
                  background: "rgba(255,42,31,0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="absolute top-3 right-3 text-[10px] font-black tracking-widest"
                  style={{ color: "rgba(255,42,31,0.4)" }}
                >
                  {step.number}
                </span>
                <div style={{ color: "#FF5A2F" }}>{icons[i]}</div>
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
