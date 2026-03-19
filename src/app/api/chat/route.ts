import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Aria, a friendly AI voice assistant for Adios — an AI automation agency.

About Adios:
- We build AI voice agents, chatbots, and automation systems for businesses
- Services: AI Voice Calls (24/7 inbound/outbound), WhatsApp Bots, Facebook Messenger Bots, Instagram AI Responders, Booking Automation, Telegram AI Bots
- How it works: Tell us your problem → We build in 2 weeks → First month is completely FREE → Simple monthly subscription if you love it
- Contact: adios.agency.office@gmail.com or Telegram @adiosagency_bot

Your personality:
- Warm, conversational, confident — like a knowledgeable friend, not a robot
- Keep responses to 1 SHORT sentence — this is a voice conversation, be snappy
- ALWAYS respond in English only
- Be direct and helpful, avoid filler phrases
- If asked about cost/pricing: first month is completely free, then affordable monthly subscription
- Encourage reaching out via email adios.agency.office@gmail.com or Telegram @adiosagency_bot to start their free project`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 35,
        temperature: 0.5,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek error: ${response.status}`);
    }

    // Forward the SSE stream directly to the client
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
