import type { Metadata } from "next";
import localFont from "next/font/local";
import { Pacifico } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const pacifico = Pacifico({
  weight: "400",
  variable: "--font-pacifico",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Adios Agency — AI Agents & Automation for Business",
  description:
    "Adios Agency builds AI agents, AI automation, chatbots, voice AI assistants, Telegram bots, WhatsApp bots and Instagram automation for businesses worldwide. AI автоматизация для бизнеса. סוכני AI לעסקים.",
  keywords: [
    "AI agents", "AI automation", "AI chatbot", "voice AI", "Telegram bot", "WhatsApp bot",
    "Instagram automation", "Facebook automation", "business automation", "AI agency",
    "chatbot development", "AI assistant", "AI agent for business", "automation agency",
    "voice assistant AI", "lead generation bot", "AI bot", "conversational AI",
    "AI автоматизация", "ИИ агенты", "чат-бот для бизнеса", "голосовой ИИ",
    "автоматизация бизнеса", "телеграм бот", "WhatsApp бот", "агентство автоматизации",
    "סוכני בינה מלאכותית", "אוטומציה לעסקים", "צ'אטבוט לעסקים", "בינה מלאכותית",
    "agentes de IA", "automatización con IA", "chatbot empresarial", "agencia de IA",
    "agents IA", "automatisation IA", "chatbot IA", "assistant vocal IA",
    "agence automatisation", "bot Telegram", "bot WhatsApp", "IA pour les entreprises",
  ],
  icons: {
    icon: "/adios-favicon.png",
  },
  openGraph: {
    title: "Adios Agency — AI Agents & Automation for Business",
    description:
      "AI agents, chatbots, voice AI and automation solutions for businesses worldwide.",
    type: "website",
    url: "https://adiosagency.com",
  },
};

const rtlLocales = ["he", "ar"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="icon" href="/adios-favicon.png?v=3" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} font-sans antialiased bg-dark text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
