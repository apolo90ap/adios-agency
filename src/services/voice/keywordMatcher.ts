import { faqDatabase, type FaqSet } from "./faqDatabase";

// Language detection based on character ranges and common words
function detectLanguage(text: string): string {
  const lower = text.toLowerCase();

  // Hebrew characters
  if (/[\u0590-\u05FF]/.test(text)) return "he";
  // Arabic characters
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  // Cyrillic characters
  if (/[\u0400-\u04FF]/.test(text)) return "ru";
  // French-specific characters or common French words
  if (
    /[àâçéèêëïîôùûüÿœæ]/.test(lower) ||
    /\b(bonjour|merci|oui|comment|quoi|pourquoi|combien|salut)\b/.test(lower)
  )
    return "fr";
  // Spanish-specific characters or common Spanish words
  if (
    /[áéíóúüñ¿¡]/.test(lower) ||
    /\b(hola|gracias|buenos|cómo|qué|por qué|cuánto|cuándo|sí|también|puedo|tienes|tengo|hacer|quiero|necesito|ayuda|servicios|precio)\b/.test(lower)
  )
    return "es";

  return "en";
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"()\-¿¡]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateMatchScore(input: string, keywords: string[]): number {
  const normalized = normalizeText(input);
  let score = 0;

  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);

    // Exact substring match — highest score
    if (normalized.includes(normalizedKeyword)) {
      score += normalizedKeyword.split(" ").length * 3;
      continue;
    }

    // Individual word matching
    const keywordWords = normalizedKeyword.split(" ");
    const inputWords = normalized.split(" ");

    for (const kw of keywordWords) {
      for (const iw of inputWords) {
        // Exact word match
        if (iw === kw) {
          score += 2;
        }
        // Prefix match (for different word forms)
        else if (
          kw.length > 3 &&
          (iw.startsWith(kw.slice(0, -1)) || kw.startsWith(iw.slice(0, -1)))
        ) {
          score += 1;
        }
      }
    }
  }

  return score;
}

export interface MatchResult {
  answer: string;
  language: string;
  isGreeting: boolean;
}

const greetingPatterns: Record<string, string[]> = {
  en: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy"],
  ru: ["привет", "здравствуйте", "добрый день", "доброе утро", "добрый вечер", "хай"],
  he: ["שלום", "היי", "הי", "בוקר טוב", "ערב טוב"],
  fr: ["bonjour", "salut", "bonsoir", "coucou"],
  ar: ["مرحبا", "مرحباً", "أهلاً", "سلام", "صباح الخير", "مساء الخير"],
  es: ["hola", "buenos días", "buenas tardes", "buenas noches", "buenas", "qué tal"],
};

export function matchQuestion(input: string): MatchResult {
  const language = detectLanguage(input);
  const faq: FaqSet = faqDatabase[language] || faqDatabase.en;
  const normalized = normalizeText(input);

  // Check greetings first
  const greetings = greetingPatterns[language] || greetingPatterns.en;
  for (const g of greetings) {
    if (normalized.includes(g)) {
      return { answer: faq.greeting, language, isGreeting: true };
    }
  }

  // Find best matching FAQ entry
  let bestScore = 0;
  let bestAnswer = faq.fallback;

  for (const entry of faq.entries) {
    const score = calculateMatchScore(input, entry.keywords);
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = entry.answer;
    }
  }

  // Require minimum score threshold
  if (bestScore < 2) {
    bestAnswer = faq.fallback;
  }

  return { answer: bestAnswer, language, isGreeting: false };
}

export function getStillThereMessage(language: string): string {
  const faq = faqDatabase[language] || faqDatabase.en;
  return faq.stillThere;
}

export function getGreeting(language: string): string {
  const faq = faqDatabase[language] || faqDatabase.en;
  return faq.greeting;
}

export { detectLanguage };
