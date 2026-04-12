"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const clients = [
  {
    id: "plugin",
    name: "Plugin Agency",
    logo: (
      <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none">
        <circle cx="50" cy="50" r="44" stroke="#00FF41" strokeWidth="4" strokeDasharray="220 60" strokeLinecap="round"/>
        <rect x="32" y="38" width="36" height="28" rx="4" stroke="#00FF41" strokeWidth="4"/>
        <line x1="41" y1="66" x2="41" y2="76" stroke="#00FF41" strokeWidth="4" strokeLinecap="round"/>
        <line x1="59" y1="66" x2="59" y2="76" stroke="#00FF41" strokeWidth="4" strokeLinecap="round"/>
        <path d="M50 24 Q56 18 56 30" stroke="#00FF41" strokeWidth="4" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    bg: "rgba(0,255,65,0.05)",
    border: "rgba(0,255,65,0.2)",
  },
  {
    id: "fershman",
    name: "The Fershman Journal",
    logo: (
      <div className="flex items-center gap-2">
        <span style={{ fontFamily: "Georgia, serif", fontSize: "2.5rem", fontWeight: "bold", color: "#1a6b4a", lineHeight: 1 }}>F</span>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", color: "#2d2d2d", fontWeight: "400" }}>The</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", color: "#2d2d2d", fontWeight: "700" }}>Fershman</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", color: "#2d2d2d", fontWeight: "700" }}>Journal</div>
        </div>
      </div>
    ),
    bg: "rgba(245,240,230,0.08)",
    border: "rgba(26,107,74,0.3)",
  },
  {
    id: "next",
    name: null,
    logo: (
      <div className="flex flex-col items-center gap-2">
        <span className="text-3xl">✦</span>
        <span className="text-xs text-gray-400 text-center px-2">You could be next</span>
      </div>
    ),
    bg: "rgba(255,42,31,0.03)",
    border: "rgba(255,42,31,0.15)",
  },
];

const duplicated = [...clients, ...clients, ...clients];

export default function Clients() {
  const t = useTranslations("clients");

  return (
    <section id="clients" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-infinite w-max">
          {duplicated.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex-shrink-0 w-36 h-36 mx-4 rounded-2xl flex flex-col items-center justify-center gap-2 select-none"
              style={{
                background: client.bg,
                border: `1px solid ${client.border}`,
                backdropFilter: "blur(8px)",
              }}
            >
              {client.logo}
              {client.name && (
                <span className="text-xs text-gray-500 text-center px-2 mt-1">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
