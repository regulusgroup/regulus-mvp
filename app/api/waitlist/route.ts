import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, role, company } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("waitlist")
    .insert({
      email:   email.trim().toLowerCase(),
      name:    name?.trim()    || null,
      role:    role            || null,
      company: company?.trim() || null,
    });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Already on the list." }, { status: 409 });
    }
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  // Trigger n8n webhook to send confirmation email
  const webhookUrl = process.env.N8N_WAITLIST_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    name?.trim()    || null,
          email:   email.trim().toLowerCase(),
          role:    role            || null,
          company: company?.trim() || null,
        }),
      });
    } catch (err) {
      console.error("[n8n] waitlist webhook failed:", err);
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
