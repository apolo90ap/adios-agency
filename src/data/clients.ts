export interface Client {
  id: string;
  name: string;
  logo: string;
  shortDescription: string;
  result: string;
}

// Demo / placeholder clients — replace with real data later
export const clients: Client[] = [
  {
    id: "luxe-dental",
    name: "Luxe Dental",
    logo: "LD",
    shortDescription: "Premium dental clinic chain",
    result: "Automated 80% of appointment bookings with AI Voice, reducing reception workload by 3x.",
  },
  {
    id: "greenmarket",
    name: "GreenMarket",
    logo: "GM",
    shortDescription: "Online grocery delivery",
    result: "Telegram bot handles 500+ daily customer inquiries automatically. Support costs cut by 60%.",
  },
  {
    id: "nova-fitness",
    name: "Nova Fitness",
    logo: "NF",
    shortDescription: "Fitness studio network",
    result: "AI booking system fills 95% of available slots. No-shows reduced by 40%.",
  },
  {
    id: "bright-academy",
    name: "Bright Academy",
    logo: "BA",
    shortDescription: "Online education platform",
    result: "Voice AI handles student onboarding and FAQ, saving 20+ hours per week of admin time.",
  },
  {
    id: "autoplus",
    name: "AutoPlus",
    logo: "AP",
    shortDescription: "Car service center",
    result: "AI assistant manages service appointments 24/7. Customer satisfaction increased by 35%.",
  },
  {
    id: "skyline-realty",
    name: "Skyline Realty",
    logo: "SR",
    shortDescription: "Real estate agency",
    result: "Telegram bot qualifies leads and schedules viewings. Conversion rate improved by 25%.",
  },
];
