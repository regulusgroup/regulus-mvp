import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const N8N_PARSE_WEBHOOK =
  process.env.N8N_PARSE_DOC_WEBHOOK_URL || "https://n8n.regulusgroup.eu/webhook/regulus-parse-doc-v1";

const ALLOWED_TYPES = ["privacy_policy", "dpa", "pitch", "other"] as const;
type DocType = (typeof ALLOWED_TYPES)[number];

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { text, type } = await req.json();
  if (!text || typeof text !== "string" || text.trim().length < 50) {
    return NextResponse.json({ error: "Document text too short" }, { status: 400 });
  }

  const docType: DocType = ALLOWED_TYPES.includes(type) ? type : "other";

  try {
    const res = await fetch(N8N_PARSE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: docType, text: text.slice(0, 50_000) }),
    });

    if (!res.ok) throw new Error(`n8n parse responded with ${res.status}`);
    const extracted = await res.json();

    await supabase.from("parsed_documents").insert({
      user_id:   user.id,
      doc_type:  docType,
      raw_text:  text.slice(0, 50_000),
      extracted,
    });

    // Merge useful fields back into the profile when relevant
    if (docType === "privacy_policy") {
      const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (extracted?.subProcessors) patch.discovered_data = extracted; // simple merge — refine later
      await supabase.from("profiles").update(patch).eq("id", user.id);
    }

    return NextResponse.json(extracted);
  } catch (err) {
    console.error("[parse-document] error:", err);
    return NextResponse.json({ error: "Document parsing failed" }, { status: 500 });
  }
}
