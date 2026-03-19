"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setPhase("reveal");
        setTimeout(() => setShow(false), 900);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#0A0A0A" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Ambient glow behind logo */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(255,42,31,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Grid lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,42,31,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,42,31,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Logo */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              style={{
                fontFamily: "var(--font-pacifico)",
                fontSize: "clamp(4rem, 12vw, 9rem)",
                background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 50%, #FF2A1F 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              Adios
            </motion.span>

            {/* Tagline */}
            <motion.p
              className="text-xs tracking-[0.3em] text-gray-500 uppercase mt-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              AI Automation Agency
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="w-full h-px rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FF2A1F, #FF5A2F)",
                  boxShadow: "0 0 12px rgba(255,42,31,0.6)",
                  width: `${progress * 100}%`,
                  transition: "width 0.05s linear",
                }}
              />
            </div>
            <motion.p
              className="text-center text-[10px] text-gray-600 mt-3 tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {phase === "reveal" ? "READY" : `${Math.round(progress * 100)}%`}
            </motion.p>
          </motion.div>

          {/* Reveal flash */}
          <AnimatePresence>
            {phase === "reveal" && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "rgba(255,42,31,0.06)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
