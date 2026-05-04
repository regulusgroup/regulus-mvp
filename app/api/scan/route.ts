import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK = "https://n8n.regulusgroup.eu/webhook/regulus-demo-v1";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    description,
    businessType,
    techStack,
    handles,
    country,
    stage,
    hasInPlace,
  } = body;

  if (!description || !businessType) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        businessType,
        techStack: techStack ?? [],
        handles: handles ?? [],
        country: country ?? "EU",
        stage: stage ?? "pre-launch",
        hasInPlace: hasInPlace ?? [],
      }),
    });

    if (!res.ok) {
      throw new Error(`n8n responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("n8n error:", err);
    return NextResponse.json({ error: "Failed to generate report." }, { status: 500 });
  }
}
