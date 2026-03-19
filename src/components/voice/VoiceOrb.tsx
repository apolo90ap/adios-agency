"use client";

import { motion, type Variants } from "framer-motion";
import { VoiceState } from "@/services/voice/types";

interface VoiceOrbProps {
  state: VoiceState;
}

const orbVariants: Variants = {
  [VoiceState.IDLE]: {
    scale: 1,
    opacity: 0.6,
  },
  [VoiceState.LISTENING]: {
    scale: [1, 1.08, 1],
    opacity: 1,
    transition: {
      scale: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  [VoiceState.THINKING]: {
    scale: [1, 1.02, 1],
    opacity: [0.7, 1, 0.7],
    rotate: [0, 360],
    transition: {
      scale: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
      opacity: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  },
  [VoiceState.SPEAKING]: {
    scale: [1, 1.06, 0.97, 1.04, 1],
    opacity: 1,
    transition: {
      scale: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
};

const glowColors: Record<VoiceState, string> = {
  [VoiceState.IDLE]: "rgba(255, 42, 31, 0.2)",
  [VoiceState.LISTENING]: "rgba(34, 197, 94, 0.4)",
  [VoiceState.THINKING]: "rgba(59, 130, 246, 0.4)",
  [VoiceState.SPEAKING]: "rgba(255, 90, 47, 0.5)",
};

const borderColors: Record<VoiceState, string> = {
  [VoiceState.IDLE]: "rgba(255, 42, 31, 0.3)",
  [VoiceState.LISTENING]: "rgba(34, 197, 94, 0.5)",
  [VoiceState.THINKING]: "rgba(59, 130, 246, 0.5)",
  [VoiceState.SPEAKING]: "rgba(255, 90, 47, 0.6)",
};

export default function VoiceOrb({ state }: VoiceOrbProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full"
        animate={{
          boxShadow: `0 0 60px ${glowColors[state]}, 0 0 120px ${glowColors[state]}`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Main orb */}
      <motion.div
        className="relative w-40 h-40 md:w-52 md:h-52 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255, 90, 47, 0.2), rgba(255, 42, 31, 0.1), rgba(10, 10, 10, 0.8))`,
          border: `2px solid ${borderColors[state]}`,
        }}
        variants={orbVariants}
        animate={state}
      >
        {/* Inner core */}
        <motion.div
          className="w-20 h-20 md:w-28 md:h-28 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 42, 31, 0.4) 0%, rgba(255, 90, 47, 0.1) 70%)",
          }}
          animate={
            state === VoiceState.SPEAKING
              ? {
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  transition: { duration: 0.5, repeat: Infinity },
                }
              : state === VoiceState.LISTENING
              ? {
                  scale: [1, 1.1, 1],
                  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
                }
              : { scale: 1 }
          }
        />
      </motion.div>

      {/* Microphone icon */}
      <div className="absolute pointer-events-none">
        <svg
          className="w-8 h-8 md:w-10 md:h-10 text-white/60"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
        </svg>
      </div>
    </div>
  );
}
