"use client";

import { motion } from "framer-motion";

interface VoiceButtonProps {
  onClick: () => void;
  label: string;
}

export default function VoiceButton({ onClick, label }: VoiceButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 100%)",
        boxShadow: "0 0 30px rgba(255, 42, 31, 0.3)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
        {label}
      </span>
    </motion.button>
  );
}
