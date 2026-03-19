"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

const TELEGRAM_URL = "https://t.me/adiosagency_bot";

interface HeroProps {
  onTryVoice: () => void;
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 1 + Math.random() * 2.5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(timeout);
  }, [target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 80, suffix: "%", label: "Tasks Automated" },
  { value: 3, suffix: "x", label: "Faster Response" },
  { value: 24, suffix: "/7", label: "AI Availability" },
];

export default function Hero({ onTryVoice }: HeroProps) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center ai-grid overflow-hidden">
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #0A0A0A 75%)",
        }}
      />

      {/* Subtle red glow center */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(255,42,31,0.07) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      <Particles />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs tracking-widest uppercase font-medium"
          style={{
            background: "rgba(255,42,31,0.08)",
            border: "1px solid rgba(255,42,31,0.2)",
            color: "#FF5A2F",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          AI Automation Agency
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.0] mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white block">{t("title").split(".")[0]}.</span>
          <span
            className="block mt-1"
            style={{
              background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("title").split(".")[1]?.trim() || ""}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t("subtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <button
            onClick={onTryVoice}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 100%)",
              boxShadow: "0 0 40px rgba(255, 42, 31, 0.35), 0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
              {t("tryVoice")}
            </span>
            {/* Shine */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }}
            />
          </button>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl font-semibold text-gray-300 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.03)" }}
          >
            {t("telegram")}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl sm:text-4xl font-black tabular-nums"
                style={{
                  background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-gray-500 mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
