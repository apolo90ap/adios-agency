import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Blob | null;

    if (!audio || audio.size === 0) {
      return NextResponse.json({ transcript: "", language: "en" });
    }

    const res = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&language=en",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
          "Content-Type": audio.type || "audio/webm",
        },
        body: audio,
      }
    );

    if (!res.ok) throw new Error(`Deepgram STT ${res.status}`);

    const data = await res.json();
    const transcript = data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    return NextResponse.json({ transcript, language: "en" });
  } catch (error) {
    console.error("STT error:", error);
    return NextResponse.json({ error: "STT failed" }, { status: 500 });
  }
}
