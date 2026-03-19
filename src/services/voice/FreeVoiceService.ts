import { VoiceState, type VoiceService, type VoiceServiceCallbacks } from "./types";
import { matchQuestion, getStillThereMessage, getGreeting, detectLanguage } from "./keywordMatcher";

/* eslint-disable @typescript-eslint/no-explicit-any */
const getRecognitionConstructor = (): (new () => any) | null => {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const langMap: Record<string, string> = {
  en: "en-US",
  ru: "ru-RU",
  he: "he-IL",
  fr: "fr-FR",
  ar: "ar-SA",
  es: "es-ES",
};

function pickBestVoice(synthesis: SpeechSynthesis, langCode: string): SpeechSynthesisVoice | null {
  const voices = synthesis.getVoices();
  const bcp47 = langMap[langCode] || "en-US";
  const langPrefix = bcp47.split("-")[0];

  // Google's online voices (neural quality) — available in Chrome when online
  const googleOnline = [
    `Google ${langCode === "en" ? "US " : ""}English`,
    "Google UK English Female",
    "Google UK English Male",
    "Google US English",
    `Google ${langCode}`,
  ];

  for (const name of googleOnline) {
    const found = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
    if (found) return found;
  }

  // Any non-local (network/cloud) voice for this language — better quality
  const networkVoice = voices.find(v => v.lang.startsWith(langPrefix) && !v.localService);
  if (networkVoice) return networkVoice;

  // macOS Enhanced/Premium voices (much better than default Samantha)
  const enhanced = voices.find(
    v => v.lang.startsWith(langPrefix) && (
      v.name.includes("Enhanced") ||
      v.name.includes("Premium") ||
      v.name.includes("Siri")
    )
  );
  if (enhanced) return enhanced;

  // Any exact locale match
  const exact = voices.find(v => v.lang === bcp47);
  if (exact) return exact;

  // Any language prefix match
  return voices.find(v => v.lang.startsWith(langPrefix)) || null;
}

export class FreeVoiceService implements VoiceService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private callbacks: VoiceServiceCallbacks | null = null;
  private silenceTimer: ReturnType<typeof setTimeout> | null = null;
  private currentLanguage = "en";
  private isRunning = false;
  private isSpeaking = false;
  private voiceLoadDone = false;

  isSupported(): boolean {
    return !!getRecognitionConstructor() && typeof window !== "undefined" && !!window.speechSynthesis;
  }

  start(callbacks: VoiceServiceCallbacks): void {
    if (!this.isSupported()) {
      callbacks.onError("Speech recognition is not supported in this browser.");
      return;
    }
    this.callbacks = callbacks;
    this.synthesis = window.speechSynthesis;
    this.isRunning = true;
    this.initRecognition("en");

    const greet = () => {
      if (this.voiceLoadDone) return;
      this.voiceLoadDone = true;
      this.speak(getGreeting("en"), "en");
    };

    // Chrome loads voices async
    if (this.synthesis.getVoices().length > 0) {
      greet();
    } else {
      this.synthesis.addEventListener("voiceschanged", greet, { once: true });
      setTimeout(greet, 700);
    }
  }

  stop(): void {
    this.isRunning = false;
    this.clearSilenceTimer();
    if (this.recognition) {
      try { this.recognition.abort(); } catch { /* ignore */ }
      this.recognition = null;
    }
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
    this.callbacks?.onStateChange(VoiceState.IDLE);
    this.callbacks = null;
  }

  /** Called by UI when user clicks a language button */
  setLanguage(lang: string): void {
    if (lang === this.currentLanguage) return;
    this.currentLanguage = lang;
    this.callbacks?.onLanguageChange?.(lang);
    // If speaking, cancel and restart recognition in new lang
    if (this.synthesis) this.synthesis.cancel();
    this.isSpeaking = false;
    this.initRecognition(lang);
    this.callbacks?.onStateChange(VoiceState.LISTENING);
    this.startListening();
  }

  private initRecognition(lang: string): void {
    const Ctor = getRecognitionConstructor();
    if (!Ctor) return;

    if (this.recognition) {
      try { this.recognition.abort(); } catch { /* ignore */ }
      this.recognition = null;
    }

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = langMap[lang] || "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      if (this.isSpeaking) this.interruptSpeaking();
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        const transcript = lastResult[0].transcript.trim();
        if (transcript.length > 0) this.handleUserInput(transcript);
      } else {
        this.resetSilenceTimer();
      }
    };

    recognition.onend = () => {
      if (this.isRunning && !this.isSpeaking) {
        try { recognition.start(); } catch { /* already started */ }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      if (event.error === "not-allowed") {
        this.callbacks?.onError("Microphone access denied.");
        this.stop();
        return;
      }
      if (this.isRunning) {
        try { recognition.start(); } catch { /* ignore */ }
      }
    };

    this.recognition = recognition;
  }

  private handleUserInput(transcript: string): void {
    this.clearSilenceTimer();
    this.callbacks?.onStateChange(VoiceState.THINKING);

    // Auto-detect language from transcript text as a hint
    const textLang = detectLanguage(transcript);
    if (textLang !== this.currentLanguage) {
      this.currentLanguage = textLang;
      this.callbacks?.onLanguageChange?.(textLang);
      this.initRecognition(textLang);
    }

    const result = matchQuestion(transcript);
    setTimeout(() => {
      if (this.isRunning) this.speak(result.answer, result.language);
    }, 200);
  }

  private buildUtterance(text: string, lang: string): SpeechSynthesisUtterance {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langMap[lang] || "en-US";
    u.rate = 0.88;
    u.pitch = 1.0;
    u.volume = 1.0;
    const voice = pickBestVoice(this.synthesis!, lang);
    if (voice) u.voice = voice;
    return u;
  }

  private speak(text: string, lang: string): void {
    if (!this.synthesis || !this.isRunning) return;
    try { this.recognition?.stop(); } catch { /* ignore */ }
    this.isSpeaking = true;
    this.callbacks?.onStateChange(VoiceState.SPEAKING);
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    this.speakChain(sentences.map(s => s.trim()).filter(Boolean), lang);
  }

  private speakChain(sentences: string[], lang: string): void {
    if (!this.synthesis || !this.isRunning || sentences.length === 0) {
      this.isSpeaking = false;
      if (this.isRunning) {
        this.callbacks?.onStateChange(VoiceState.LISTENING);
        this.startListening();
        this.resetSilenceTimer();
      }
      return;
    }
    const [first, ...rest] = sentences;
    const u = this.buildUtterance(first, lang);
    u.onend = () => {
      if (rest.length > 0 && this.isRunning) {
        this.speakChain(rest, lang);
      } else {
        this.isSpeaking = false;
        if (this.isRunning) {
          this.callbacks?.onStateChange(VoiceState.LISTENING);
          this.startListening();
          this.resetSilenceTimer();
        }
      }
    };
    u.onerror = () => {
      this.isSpeaking = false;
      if (this.isRunning) {
        this.callbacks?.onStateChange(VoiceState.LISTENING);
        this.startListening();
      }
    };
    this.synthesis.speak(u);
  }

  private interruptSpeaking(): void {
    if (this.synthesis && this.isSpeaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
      this.callbacks?.onStateChange(VoiceState.LISTENING);
    }
  }

  private startListening(): void {
    if (!this.recognition || !this.isRunning) return;
    try { this.recognition.start(); } catch { /* already started */ }
  }

  private resetSilenceTimer(): void {
    this.clearSilenceTimer();
    this.silenceTimer = setTimeout(() => {
      if (this.isRunning && !this.isSpeaking) {
        this.speak(getStillThereMessage(this.currentLanguage), this.currentLanguage);
      }
    }, 12000);
  }

  private clearSilenceTimer(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }
}
