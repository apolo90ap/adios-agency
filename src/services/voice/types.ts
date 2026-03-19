export enum VoiceState {
  IDLE = "idle",
  LISTENING = "listening",
  THINKING = "thinking",
  SPEAKING = "speaking",
}

export interface VoiceServiceCallbacks {
  onStateChange: (state: VoiceState) => void;
  onError: (error: string) => void;
  onLanguageChange?: (lang: string) => void;
}

export interface VoiceService {
  start(callbacks: VoiceServiceCallbacks): void;
  stop(): void;
  isSupported(): boolean;
}
