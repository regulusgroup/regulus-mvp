import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { parseOffice } from "officeparser";

async function extractFromBuffer(buffer: Buffer): Promise<string> {
  const ast = await parseOffice(buffer);
  return typeof ast === "string" ? ast : ast.toText();
}

export const runtime = "nodejs";

const N8N_PARSE_WEBHOOK =
  process.env.N8N_PARSE_DOC_WEBHOOK_URL || "https://n8n.regulusgroup.eu/webhook/regulus-parse-doc-v1";

const MAX_BYTES        = 10 * 1024 * 1024; // 10MB
const MAX_TEXT_CHARS   = 50_000;
const ALLOWED_DOC_TYPES = ["privacy_policy", "dpa", "pitch", "other"] as const;
type DocType = (typeof ALLOWED_DOC_TYPES)[number];

const OFFICE_EXTENSIONS = [".pdf", ".docx", ".pptx", ".xlsx", ".odt", ".odp", ".ods"];
const TEXT_EXTENSIONS   = [".md", ".markdown", ".txt", ".html", ".htm"];

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const typeField = form.get("type") as string | null;
  const docType: DocType = (ALLOWED_DOC_TYPES as readonly string[]).includes(typeField ?? "")
    ? (typeField as DocType)
    : "other";

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  // ── 1. Extract text from the file ────────────────────────────
  let text = "";
  const lowerName = file.name.toLowerCase();
  const ext = "." + (lowerName.split(".").pop() || "");

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (OFFICE_EXTENSIONS.includes(ext)) {
      text = await extractFromBuffer(buffer);
    } else if (TEXT_EXTENSIONS.includes(ext) || file.type.startsWith("text/")) {
      text = buffer.toString("utf8");
    } else {
      return NextResponse.json(
        { error: `Unsupported file type: ${ext}. Use PDF, DOCX, PPTX, MD, or TXT.` },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("[upload-document] extraction failed:", err);
    return NextResponse.json({ error: "Couldn't read the file. Try a different format." }, { status: 400 });
  }

  text = text.trim().slice(0, MAX_TEXT_CHARS);
  if (text.length < 50) {
    return NextResponse.json({ error: "File contained no readable text." }, { status: 400 });
  }

  // ── 2. Send extracted text to n8n for LLM parsing ────────────
  let extracted: unknown = null;
  try {
    const res = await fetch(N8N_PARSE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: docType, text }),
    });
    if (!res.ok) throw new Error(`n8n parse responded with ${res.status}`);
    extracted = await res.json();
  } catch (err) {
    console.error("[upload-document] n8n parse failed:", err);
    // Still save the raw text so the user doesn't lose their upload
  }

  // ── 3. Persist ───────────────────────────────────────────────
  await supabase.from("parsed_documents").insert({
    user_id:  user.id,
    doc_type: docType,
    raw_text: text,
    extracted,
  });

  return NextResponse.json({
    fileName:    file.name,
    chars:       text.length,
    extracted,
  });
}
