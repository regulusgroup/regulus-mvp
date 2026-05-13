import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const N8N_DISCOVER_WEBHOOK =
  process.env.N8N_DISCOVER_WEBHOOK_URL || "https://n8n.regulusgroup.eu/webhook/regulus-discover-v1";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { website } = await req.json();
  if (!website || typeof website !== "string") {
    return NextResponse.json({ error: "Website URL required" }, { status: 400 });
  }

  // Normalise URL
  let url = website.trim().toLowerCase();
  if (!url.startsWith("http")) url = "https://" + url;

  try {
    const res = await fetch(N8N_DISCOVER_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, email: user.email }),
    });

    if (!res.ok) throw new Error(`n8n discover responded with ${res.status}`);

    const data = await res.json();

    // Persist discovery on profile
    await supabase.from("profiles").upsert({
      id:                   user.id,
      email:                user.email!,
      website:              url,
      company:              data?.company?.name ?? null,
      country:              data?.company?.country ?? null,
      stage:                data?.team?.stage ?? null,
      business:             data?.product?.type ?? null,
      description:          data?.product?.description ?? null,
      tech_stack:           Array.isArray(data?.tech) ? data.tech : null,
      handles:              Array.isArray(data?.handles) ? data.handles : null,
      has_privacy_policy:   data?.privacy?.hasPolicy ?? null,
      privacy_policy_url:   data?.privacy?.policyUrl ?? null,
      team_size_estimate:   data?.team?.estimatedSize ?? null,
      discovered_data:      data,
      discovered_at:        new Date().toISOString(),
      updated_at:           new Date().toISOString(),
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("[discover] error:", err);
    return NextResponse.json({ error: "Discovery failed" }, { status: 500 });
  }
}
