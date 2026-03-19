"use client";

import { useState } from "react";
import Preloader from "@/components/preloader/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import ProcessSection from "@/components/sections/ProcessSection";
import Clients from "@/components/sections/Clients";
import About from "@/components/sections/About";
import Footer from "@/components/layout/Footer";
import VoiceOverlay from "@/components/voice/VoiceOverlay";

export default function Home() {
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero onTryVoice={() => setVoiceOpen(true)} />
        <Capabilities />
        <ProcessSection />
        <Clients />
        <About />
      </main>
      <Footer />
      <VoiceOverlay open={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </>
  );
}
