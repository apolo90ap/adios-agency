"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { clients, type Client } from "@/data/clients";

function ClientLogo({
  client,
  onClick,
}: {
  client: Client;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-32 h-32 mx-4 glass rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:border-primary/30"
    >
      <span
        className="text-2xl font-bold"
        style={{
          background: "linear-gradient(135deg, #FF2A1F 0%, #FF5A2F 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {client.logo}
      </span>
      <span className="text-xs text-gray-500 text-center px-2">
        {client.name}
      </span>
    </button>
  );
}

function ClientModal({
  client,
  onClose,
}: {
  client: Client;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <motion.div
        className="relative glass rounded-3xl p-8 max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(255,42,31,0.2), rgba(255,90,47,0.1))",
            }}
          >
            <span className="text-xl font-bold text-primary">
              {client.logo}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold">{client.name}</h3>
            <p className="text-sm text-gray-400">{client.shortDescription}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-sm text-gray-300 leading-relaxed">
            {client.result}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Clients() {
  const t = useTranslations("clients");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Duplicate for infinite scroll effect
  const duplicated = [...clients, ...clients];

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

      {/* Infinite scroll */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-infinite w-max">
          {duplicated.map((client, i) => (
            <ClientLogo
              key={`${client.id}-${i}`}
              client={client}
              onClick={() => setSelectedClient(client)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedClient && (
          <ClientModal
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
