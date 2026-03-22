import { VoiceState, type VoiceService, type VoiceServiceCallbacks } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "Hey! I'm Aria from Adios. Speak to me in any language — how can I help?";

export class AriaVoiceService implements VoiceService {
  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  // VAD
  private vadContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private vadInterval: ReturnType<typeof setInterval> | null = null;
  private silenceTimer: ReturnType<typeof setTimeout> | null = null;
  private maxDurationTimer: ReturnType<typeof setTimeout> | null = null;
  private hasSpeech = false;

  // TTS — one AudioContext created during user gesture, reused forever
  private ttsContext: AudioContext | null = null;
  private ttsSource: AudioBufferSourceNode | null = null;

  // State
  private callbacks: VoiceServiceCallbacks | null = null;
  private isRunning = false;
  private isSpeaking = false;
  private conversationHistory: Message[] = [];

  isSupported(): boolean {
    return (
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia &&
      typeof window !== "undefined" &&
      !!window.MediaRecorder
    );
  }

  start(callbacks: VoiceServiceCallbacks): void {
    if (!this.isSupported()) {
      callbacks.onError("Microphone or MediaRecorder not supported in this browser.");
      return;
    }
    this.callbacks = callbacks;
    this.isRunning = true;

    // Create AudioContext immediately inside the user gesture
    const AudioCtx: typeof AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    this.ttsContext = new AudioCtx();

    // Pre-fetch greeting audio IN PARALLEL with mic initialization — no waiting
    const greetingFetch = fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: GREETING, lang: "en" }),
    }).then((r) => r.arrayBuffer());

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(async (stream) => {
        if (!this.isRunning) { stream.getTracks().forEach((t) => t.stop()); return; }
        this.stream = stream;
        this.setupVAD(stream);
        // Try to play greeting, if TTS fails — just start listening
        try {
          const buffer = await greetingFetch;
          if (this.isRunning) await this.playBuffer(buffer, () => {
            this.isSpeaking = false;
            if (this.isRunning) {
              this.callbacks?.onStateChange(VoiceState.LISTENING);
              this.startListening();
            }
          });
        } catch {
          // Deepgram TTS failed — use browser speech for greeting
          this.isSpeaking = true;
          this.speakViaBrowser(GREETING);
        }
      })
      .catch((err) => {
        callbacks.onError("Microphone access denied: " + err.message);
        this.stop();
      });
  }

  stop(): void {
    this.isRunning = false;
    this.clearTimers();
    this.stopRecorder();
    this.stopTTSSource();
    if (this.ttsContext) { this.ttsContext.close().catch(() => {}); this.ttsContext = null; }
    if (this.vadContext) { this.vadContext.close().catch(() => {}); this.vadContext = null; }
    if (this.stream) { this.stream.getTracks().forEach((t) => t.stop()); this.stream = null; }
    this.isSpeaking = false;
    this.callbacks?.onStateChange(VoiceState.IDLE);
    this.callbacks = null;
  }

  setLanguage(_lang: string): void { /* auto-detected */ }

  // ─── VAD ──────────────────────────────────────────────────────────────────

  private setupVAD(stream: MediaStream): void {
    const AudioCtx: typeof AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    this.vadContext = ctx;
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);
    this.analyser = analyser;
  }

  private getVolume(): number {
    if (!this.analyser) return 0;
    const data = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) { const n = (data[i] - 128) / 128; sum += n * n; }
    return Math.sqrt(sum / data.length);
  }

  // ─── Recording ────────────────────────────────────────────────────────────

  private startListening(): void {
    if (!this.stream || !this.isRunning || this.isSpeaking) return;

    this.audioChunks = [];
    this.hasSpeech = false;
    this.callbacks?.onStateChange(VoiceState.LISTENING);

    const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";

    const recorder = new MediaRecorder(this.stream, mimeType ? { mimeType } : {});
    this.mediaRecorder = recorder;

    recorder.ondataavailable = (e) => { if (e.data.size > 0) this.audioChunks.push(e.data); };
    recorder.onstop = () => {
      if (this.hasSpeech && this.isRunning && !this.isSpeaking) {
        this.processAudio();
      } else if (this.isRunning && !this.isSpeaking) {
        this.startListening();
      }
    };

    recorder.start(80);

    const SPEECH_THRESHOLD = 0.018;
    const SILENCE_MS = 250;   // ← 250ms silence ends recording
    const MAX_MS = 8000;

    this.vadInterval = setInterval(() => {
      if (!this.isRunning || this.isSpeaking) { this.stopRecorder(); return; }
      const vol = this.getVolume();
      if (vol > SPEECH_THRESHOLD) {
        this.hasSpeech = true;
        clearTimeout(this.silenceTimer!);
        this.silenceTimer = null;
        if (!this.maxDurationTimer) {
          this.maxDurationTimer = setTimeout(() => this.stopRecorder(), MAX_MS);
        }
      } else if (this.hasSpeech && !this.silenceTimer) {
        this.silenceTimer = setTimeout(() => this.stopRecorder(), SILENCE_MS);
      }
    }, 30);
  }

  private stopRecorder(): void {
    clearInterval(this.vadInterval!); this.vadInterval = null;
    clearTimeout(this.silenceTimer!); this.silenceTimer = null;
    clearTimeout(this.maxDurationTimer!); this.maxDurationTimer = null;
    if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
      try { this.mediaRecorder.stop(); } catch { /* ignore */ }
    }
  }

  // ─── STT + AI ─────────────────────────────────────────────────────────────

  private async processAudio(): Promise<void> {
    if (!this.isRunning) return;
    this.callbacks?.onStateChange(VoiceState.THINKING);

    try {
      const mimeType = this.mediaRecorder?.mimeType || "audio/webm";
      const blob = new Blob(this.audioChunks, { type: mimeType });

      const form = new FormData();
      form.append("audio", blob, "audio.webm");

      const sttRes = await fetch("/api/stt", { method: "POST", body: form });
      if (!sttRes.ok) throw new Error("STT failed");

      const { transcript } = await sttRes.json();

      if (!transcript?.trim()) {
        if (this.isRunning && !this.isSpeaking) this.startListening();
        return;
      }

      this.conversationHistory.push({ role: "user", content: transcript });

      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: this.conversationHistory }),
      });
      if (!chatRes.ok) throw new Error("Chat API failed");

      // Read SSE stream — collect full text, speak as soon as stream is done
      const fullText = await this.readStream(chatRes);

      if (!fullText.trim()) {
        if (this.isRunning && !this.isSpeaking) this.startListening();
        return;
      }

      this.conversationHistory.push({ role: "assistant", content: fullText });
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      if (this.isRunning) this.speak(fullText);
    } catch (err) {
      console.error("Voice processing error:", err);
      if (this.isRunning && !this.isSpeaking) {
        this.callbacks?.onStateChange(VoiceState.LISTENING);
        this.startListening();
      }
    }
  }

  // Read DeepSeek SSE stream and return the complete text
  private async readStream(response: Response): Promise<string> {
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let raw = "";
    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      raw += decoder.decode(value, { stream: true });
      const lines = raw.split("\n");
      raw = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") continue;
        try {
          const chunk = JSON.parse(data);
          text += chunk.choices?.[0]?.delta?.content || "";
        } catch { /* skip */ }
      }
    }
    return text.trim();
  }

  // ─── TTS ─────────────────────────────────────────────────────────────────

  private speak(text: string): void {
    if (!this.isRunning) return;
    this.isSpeaking = true;
    this.callbacks?.onStateChange(VoiceState.SPEAKING);
    this.speakViaAPI(text);
  }

  private async speakViaAPI(text: string): Promise<void> {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`TTS ${res.status}`);
      if (!this.isRunning) return;

      const buffer = await res.arrayBuffer();
      await this.playBuffer(buffer, () => {
        this.isSpeaking = false;
        if (this.isRunning) {
          this.callbacks?.onStateChange(VoiceState.LISTENING);
          this.startListening();
        }
      });
    } catch (err) {
      console.warn("TTS API failed, using browser speech:", err);
      this.speakViaBrowser(text);
    }
  }

  private speakViaBrowser(text: string): void {
    if (!("speechSynthesis" in window)) {
      this.isSpeaking = false;
      if (this.isRunning) {
        this.callbacks?.onStateChange(VoiceState.LISTENING);
        this.startListening();
      }
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      this.isSpeaking = false;
      if (this.isRunning) {
        this.callbacks?.onStateChange(VoiceState.LISTENING);
        this.startListening();
      }
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
      if (this.isRunning) {
        this.callbacks?.onStateChange(VoiceState.LISTENING);
        this.startListening();
      }
    };
    window.speechSynthesis.speak(utterance);
  }

  private async playBuffer(buffer: ArrayBuffer, onEnded: () => void): Promise<void> {
    if (!this.isRunning) return;
    const ctx = this.ttsContext!;
    if (ctx.state === "suspended") await ctx.resume();
    const audioData = await ctx.decodeAudioData(buffer.slice(0));
    const source = ctx.createBufferSource();
    this.ttsSource = source;
    source.buffer = audioData;
    source.connect(ctx.destination);
    source.onended = () => { this.ttsSource = null; onEnded(); };
    source.start();
    this.isSpeaking = true;
    this.callbacks?.onStateChange(VoiceState.SPEAKING);
  }

  private stopTTSSource(): void {
    if (this.ttsSource) {
      try { this.ttsSource.stop(); } catch { /* ignore */ }
      this.ttsSource = null;
    }
  }

  private clearTimers(): void {
    clearInterval(this.vadInterval!); this.vadInterval = null;
    clearTimeout(this.silenceTimer!); this.silenceTimer = null;
    clearTimeout(this.maxDurationTimer!); this.maxDurationTimer = null;
  }
}
