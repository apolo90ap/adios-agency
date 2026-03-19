"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { VoiceState } from "@/services/voice/types";
import { AriaVoiceService } from "@/services/voice/AriaVoiceService";
import VoiceOrb from "./VoiceOrb";

interface VoiceOverlayProps {
  open: boolean;
  onClose: () => void;
}

const langNames: Record<string, string> = {
  en: "English",
  ru: "Русский",
  es: "Español",
  fr: "Français",
  he: "עברית",
  ar: "العربية",
};

export default function VoiceOverlay({ open, onClose }: VoiceOverlayProps) {
  const t = useTranslations("voice");
  const [state, setState] = useState<VoiceState>(VoiceState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState("en");
  const serviceRef = useRef<AriaVoiceService | null>(null);

  const handleClose = useCallback(() => {
    if (serviceRef.current) {
      serviceRef.current.stop();
      serviceRef.current = null;
    }
    setState(VoiceState.IDLE);
    setError(null);
    setActiveLang("en");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (open && !serviceRef.current) {
      const service = new AriaVoiceService();
      if (!service.isSupported()) {
        setError(t("micPermission"));
        return;
      }
      serviceRef.current = service;
      service.start({
        onStateChange: (newState: VoiceState) => setState(newState),
        onError: (err: string) => setError(err),
        onLanguageChange: (lang: string) => setActiveLang(lang),
      });
    }
    return () => {
      if (!open && serviceRef.current) {
        serviceRef.current.stop();
        serviceRef.current = null;
      }
    };
  }, [open, t]);

  const statusText: Record<VoiceState, string> = {
    [VoiceState.IDLE]: t("idle"),
    [VoiceState.LISTENING]: t("listening"),
    [VoiceState.THINKING]: t("thinking"),
    [VoiceState.SPEAKING]: t("speaking"),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #111111 100%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Orb */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <VoiceOrb state={state} />
          </motion.div>

          {/* Status */}
          <motion.p
            className="mt-12 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {error || statusText[state]}
          </motion.p>

          {/* Auto-detected language indicator */}
          <motion.div
            className="mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeLang}
                className="text-xs text-gray-600"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {langNames[activeLang] || activeLang}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Close label */}
          <motion.button
            onClick={handleClose}
            className="absolute bottom-10 text-sm text-gray-600 hover:text-gray-400 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t("close")}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
