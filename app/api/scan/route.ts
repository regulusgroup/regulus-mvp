import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK = "https://n8n.regulusgroup.eu/webhook/regulus-demo-v1";

interface RegulationResult {
  name: string;
  fullName?: string;
  applies: boolean;
  priority?: string;
  reason?: string;
  action?: string;
}

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

    // If user is authenticated, persist the scan + regulation tasks
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const inputs = { description, businessType, techStack, handles, country, stage, hasInPlace };

      const { data: scanRow, error: scanError } = await supabase
        .from("scans")
        .insert({ user_id: user.id, inputs, report: data })
        .select("id")
        .single();

      if (scanError) {
        console.error("[scan] save failed:", scanError);
      } else if (scanRow && Array.isArray(data?.regulations)) {
        // Replace prior tasks with the latest scan's applicable regulations
        await supabase.from("regulation_tasks").delete().eq("user_id", user.id);

        const tasksToInsert = (data.regulations as RegulationResult[])
          .filter((r) => r.applies)
          .map((r) => ({
            user_id:         user.id,
            scan_id:         scanRow.id,
            regulation_name: r.name,
            regulation_full: r.fullName ?? null,
            priority:        r.priority ?? null,
            reason:          r.reason ?? null,
            action:          r.action ?? null,
            status:          "not_started",
          }));

        if (tasksToInsert.length > 0) {
          const { error: tasksError } = await supabase.from("regulation_tasks").insert(tasksToInsert);
          if (tasksError) console.error("[scan] tasks save failed:", tasksError);
        }
      }

      // Also keep the user's profile in sync with their latest scan inputs
      await supabase.from("profiles").upsert({
        id:          user.id,
        email:       user.email!,
        country:     country ?? null,
        stage:       stage ?? null,
        business:    businessType ?? null,
        description: description ?? null,
        updated_at:  new Date().toISOString(),
      });

      return NextResponse.json({ ...data, saved: true });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("n8n error:", err);
    return NextResponse.json({ error: "Failed to generate report." }, { status: 500 });
  }
}
