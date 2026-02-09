import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1️⃣ Parse request body
    const body = await req.json();
    console.log("📩 Incoming body:", body);

    const query = body?.query;

    if (!query) {
      console.error("❌ Missing query");
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // 2️⃣ Check env variable
    if (!process.env.CHAT_API_KEY) {
      console.error("❌ CHAT_API_KEY missing");
      return NextResponse.json(
        { error: "API key missing" },
        { status: 500 }
      );
    }

    // 3️⃣ Call external API
    const apiRes = await fetch(
      "https://bn6jgpgs-8000.inc1.devtunnels.ms/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.CHAT_API_KEY,
        },
        body: JSON.stringify({ query }),
      }
    );

    console.log("🌐 External status:", apiRes.status);

    const text = await apiRes.text(); // 👈 IMPORTANT
    console.log("🌐 External raw response:", text);

    if (!apiRes.ok) {
      return NextResponse.json(
        {
          error: "External API failed",
          status: apiRes.status,
          response: text,
        },
        { status: 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("❌ Invalid JSON from external API");
      return NextResponse.json(
        { error: "Invalid JSON from API", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reply: data.answer || data.response || data.message || "No reply",
    });
  } catch (err: any) {
    console.error("🔥 Route crash:", err);
    return NextResponse.json(
      { error: err.message || "Server crash" },
      { status: 500 }
    );
  }
}