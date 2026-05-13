"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// ─── Types ──────────────────────────────────────────────────────────────────

interface DiscoveryResult {
  company?: { name?: string; country?: string };
  product?: { description?: string; type?: string; category?: string };
  tech?: string[];
  handles?: string[];
  privacy?: { hasPolicy?: boolean; policyUrl?: string; hasCookieBanner?: boolean };
  team?: { estimatedSize?: string; stage?: string };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const [stage, setStage] = useState<"input" | "discovering" | "review" | "deepen" | "scanning">("input");
  const [progressStep, setProgressStep] = useState(0);
  const [error, setError] = useState("");

  const [result, setResult] = useState<DiscoveryResult | null>(null);
  const [docText, setDocText] = useState("");
  const [docParsing, setDocParsing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState("");

  // Pre-fill website from email domain on mount
  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setEmail(user.email || "");
      const domain = user.email?.split("@")[1];
      if (domain && !["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"].includes(domain)) {
        setWebsite(domain);
      }
    })();
  }, [router]);

  // Fake progress steps to give a sense of action during the n8n call
  useEffect(() => {
    if (stage !== "discovering") return;
    const steps = ["Fetching website", "Reading homepage", "Detecting tech stack", "Analysing AI usage", "Mapping obligations"];
    let i = 0;
    setProgressStep(0);
    const t = setInterval(() => {
      i++;
      if (i < steps.length) setProgressStep(i);
      else clearInterval(t);
    }, 2500);
    return () => clearInterval(t);
  }, [stage]);

  async function runDiscovery() {
    setError("");
    setStage("discovering");
    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || "Discovery failed");
      }
      const data = (await res.json()) as DiscoveryResult;
      setResult(data);
      setStage("review");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Discovery failed");
      setStage("input");
    }
  }

  async function parseDoc(type: string) {
    if (docText.trim().length < 50) return;
    setDocParsing(true);
    setUploadError("");
    try {
      const res = await fetch("/api/parse-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, text: docText }),
      });
      if (res.ok) {
        setUploadedFiles((f) => [...f, `Pasted ${type.replace(/_/g, " ")}`]);
        setDocText("");
      }
    } finally {
      setDocParsing(false);
    }
  }

  async function uploadFile(file: File, type: string) {
    setDocParsing(true);
    setUploadError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("type", type);
      const res = await fetch("/api/upload-document", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUploadedFiles((f) => [...f, file.name]);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setDocParsing(false);
    }
  }

  // Run an initial scan from the discovered profile, then go to dashboard
  async function finishAndScan() {
    setStage("scanning");
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description:  result?.product?.description || "",
          businessType: result?.product?.type || "saas_ai",
          techStack:    result?.tech || [],
          handles:      result?.handles || [],
          country:      result?.company?.country || "Other EU",
          stage:        result?.team?.stage || "mvp",
          hasInPlace:   result?.privacy?.hasPolicy ? ["privacy_policy"] : [],
        }),
      });
      if (!res.ok) throw new Error("Scan failed");
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Scan failed");
      setStage("review");
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f18] text-[#b5b99f]">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#2e3329]">
        <Link href="/dashboard">
          <Image src="/logos/logo-green.svg" alt="Regulus" width={100} height={36} priority />
        </Link>
        <span className="text-xs text-[#7a7f6a] hidden md:inline">{email}</span>
      </nav>

      <main className="flex-1 px-6 py-16 max-w-2xl w-full mx-auto flex flex-col gap-10">

        {/* ── INPUT ────────────────────────────────────────────── */}
        {stage === "input" && (
          <>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Set up your workspace</p>
              <h1 className="text-3xl md:text-4xl text-[#b5b99f] leading-tight" style={{ fontFamily: "MomoTrust, serif" }}>
                Let&apos;s discover your company.
              </h1>
              <p className="text-sm text-[#7a7f6a] leading-relaxed">
                Drop your website URL — we&apos;ll auto-detect your stack, your data flows,
                and the regulations that apply. You confirm what&apos;s right. No forms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Company website</label>
              <input
                type="text"
                placeholder="yourcompany.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="h-12 px-4 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                onClick={runDiscovery}
                disabled={!website.trim()}
                className="h-12 mt-2 rounded-lg bg-[#3f4e40] text-[#b5b99f] font-medium text-sm hover:opacity-90 disabled:opacity-30 cursor-pointer transition-all flex items-center justify-center"
              >
                Start discovery →
              </button>
              <p className="text-xs text-[#4a4f3e] text-center">
                Don&apos;t have a website yet? <button onClick={() => { setResult({}); setStage("review"); }} className="text-[#7a7f6a] underline underline-offset-4 cursor-pointer">Set up manually</button>
              </p>
            </div>
          </>
        )}

        {/* ── DISCOVERING ──────────────────────────────────────── */}
        {stage === "discovering" && (
          <DiscoveryProgress step={progressStep} website={website} />
        )}

        {/* ── REVIEW ───────────────────────────────────────────── */}
        {stage === "review" && (
          <ReviewPanel
            result={result}
            onChange={setResult}
            onContinue={() => setStage("deepen")}
          />
        )}

        {/* ── DEEPEN (upload + paste docs) ──────────────────────── */}
        {stage === "deepen" && (
          <DeepenPanel
            docText={docText}
            setDocText={setDocText}
            onParse={parseDoc}
            onUpload={uploadFile}
            parsing={docParsing}
            uploadedFiles={uploadedFiles}
            uploadError={uploadError}
            onFinish={finishAndScan}
            onBack={() => setStage("review")}
          />
        )}

        {/* ── SCANNING ─────────────────────────────────────────── */}
        {stage === "scanning" && (
          <div className="flex flex-col items-center gap-6 text-center py-12">
            <div className="w-14 h-14 rounded-full border border-[#3f4e40]/50 flex items-center justify-center animate-pulse">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 6V12L16 14" stroke="#b5b99f" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke="#b5b99f" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
                Generating your compliance map…
              </h2>
              <p className="text-sm text-[#7a7f6a]">This takes 10–20 seconds.</p>
            </div>
          </div>
        )}

      </main>

      <footer className="px-6 md:px-12 py-6 border-t border-[#2e3329] flex items-center justify-between">
        <Image src="/logos/logo-green.svg" alt="Regulus" width={70} height={25} />
        <p className="text-[11px] text-[#3f4e40]">© 2026 Regulus</p>
      </footer>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function DiscoveryProgress({ step, website }: { step: number; website: string }) {
  const steps = [
    "Fetching website",
    "Reading homepage",
    "Detecting tech stack",
    "Analysing AI usage",
    "Mapping obligations",
  ];
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Discovering</p>
        <h2 className="text-2xl text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
          Reading {website}…
        </h2>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-sm">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3 text-sm">
            <div
              className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0"
              style={{
                borderColor: i <= step ? "#3f4e40" : "#2e3329",
                background:  i <  step ? "#3f4e40" : "transparent",
                color:       i <= step ? "#b5b99f" : "#4a4f3e",
              }}
            >
              {i < step ? "✓" : i === step ? "•" : ""}
            </div>
            <span style={{ color: i <= step ? "#b5b99f" : "#4a4f3e" }}>
              {s}{i === step ? "…" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewPanel({
  result, onChange, onContinue,
}: {
  result: DiscoveryResult | null;
  onChange: (r: DiscoveryResult) => void;
  onContinue: () => void;
}) {
  const r = result || {};

  function update(patch: Partial<DiscoveryResult>) {
    onChange({ ...r, ...patch });
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Review</p>
        <h1 className="text-3xl md:text-4xl text-[#b5b99f] leading-tight" style={{ fontFamily: "MomoTrust, serif" }}>
          Here&apos;s what I found.
        </h1>
        <p className="text-sm text-[#7a7f6a] leading-relaxed">
          Edit anything that&apos;s wrong. We&apos;ll use this to map your regulations.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Company */}
        <EditableRow
          label="Company"
          value={r.company?.name || ""}
          onChange={(v) => update({ company: { ...r.company, name: v } })}
          placeholder="Your company name"
        />
        <EditableRow
          label="Country"
          value={r.company?.country || ""}
          onChange={(v) => update({ company: { ...r.company, country: v } })}
          placeholder="Germany, Malta, Ireland…"
        />
        <EditableRow
          label="What you do"
          value={r.product?.description || ""}
          onChange={(v) => update({ product: { ...r.product, description: v } })}
          placeholder="A B2B SaaS using AI to…"
          multiline
        />

        {/* Stage */}
        <ChipRow
          label="Stage"
          options={[
            { id: "idea",    label: "Idea" },
            { id: "mvp",     label: "MVP" },
            { id: "growing", label: "Growing" },
            { id: "scaling", label: "Scaling" },
          ]}
          value={r.team?.stage || ""}
          onChange={(v) => update({ team: { ...r.team, stage: v } })}
        />

        {/* Tech stack */}
        <ChipMultiRow
          label="Tech stack"
          value={r.tech || []}
          onChange={(v) => update({ tech: v })}
          suggestions={["openai", "anthropic", "gemini", "vercel", "supabase", "aws", "stripe", "intercom"]}
        />

        {/* Handles */}
        <ChipMultiRow
          label="Data you handle"
          value={r.handles || []}
          onChange={(v) => update({ handles: v })}
          suggestions={["personal_data", "behavioral_data", "health_data", "financial_data", "biometric_data", "children_data"]}
        />

        {/* Privacy policy */}
        <div className="flex items-center justify-between rounded-lg border border-[#2e3329] bg-[#222720] px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Privacy policy</span>
            <span className="text-sm text-[#b5b99f]">
              {r.privacy?.hasPolicy ? "Found on website" : "Not detected"}
            </span>
          </div>
          <button
            onClick={() => update({ privacy: { ...r.privacy, hasPolicy: !r.privacy?.hasPolicy } })}
            className="text-xs text-[#7a7f6a] underline underline-offset-4 cursor-pointer"
          >
            Toggle
          </button>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="h-12 rounded-lg bg-[#3f4e40] text-[#b5b99f] font-medium text-sm hover:opacity-90 cursor-pointer transition-all flex items-center justify-center"
      >
        Looks good — continue →
      </button>
    </>
  );
}

function DeepenPanel({
  docText, setDocText, onParse, onUpload, parsing, uploadedFiles, uploadError, onFinish, onBack,
}: {
  docText: string;
  setDocText: (v: string) => void;
  onParse: (type: string) => void;
  onUpload: (file: File, type: string) => void;
  parsing: boolean;
  uploadedFiles: string[];
  uploadError: string;
  onFinish: () => void;
  onBack: () => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [pendingType, setPendingType] = useState("privacy_policy");

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((f) => onUpload(f, pendingType));
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Optional</p>
        <h1 className="text-3xl md:text-4xl text-[#b5b99f] leading-tight" style={{ fontFamily: "MomoTrust, serif" }}>
          Want a deeper read?
        </h1>
        <p className="text-sm text-[#7a7f6a] leading-relaxed">
          Drop in your privacy policy, pitch deck, or DPA — we&apos;ll extract sub-processors,
          retention periods, lawful basis, and more. Or skip and go straight to your dashboard.
        </p>
      </div>

      {/* Doc type selector */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Document type</label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "privacy_policy", label: "Privacy policy" },
            { id: "dpa",            label: "DPA / contract" },
            { id: "pitch",          label: "Pitch / description" },
            { id: "other",          label: "Other" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setPendingType(id)}
              className="h-9 px-4 rounded-lg border text-xs cursor-pointer transition-colors"
              style={{
                borderColor: pendingType === id ? "#3f4e40" : "#2e3329",
                background:  pendingType === id ? "#222720" : "transparent",
                color:       pendingType === id ? "#b5b99f" : "#7a7f6a",
              }}
            >
              {pendingType === id ? "✓ " : ""}{label}
            </button>
          ))}
        </div>
      </div>

      {/* Dropzone */}
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        className="flex flex-col items-center justify-center gap-3 px-6 py-10 rounded-xl border-2 border-dashed cursor-pointer transition-colors"
        style={{
          borderColor: dragOver ? "#3f4e40" : "#2e3329",
          background:  dragOver ? "#222720" : "transparent",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: "#7a7f6a" }}>
          <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-sm text-[#b5b99f]">
            {parsing ? "Reading file…" : "Drop a file or click to upload"}
          </span>
          <span className="text-[11px] text-[#4a4f3e]">PDF, DOCX, PPTX, MD, TXT — up to 10MB</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".pdf,.docx,.pptx,.xlsx,.odt,.odp,.ods,.md,.markdown,.txt,.html"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={parsing}
        />
      </label>

      {uploadError && <p className="text-xs text-red-400 text-center">{uploadError}</p>}

      {uploadedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Parsed</label>
          {uploadedFiles.map((name, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#3f4e40]/40 bg-[#222720]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#b5b99f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs text-[#b5b99f]">{name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Or paste */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Or paste text</label>
        <textarea
          rows={6}
          value={docText}
          onChange={(e) => setDocText(e.target.value)}
          placeholder="Paste document content here…"
          className="w-full px-4 py-3 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors resize-none leading-relaxed"
        />
        <button
          onClick={() => onParse(pendingType)}
          disabled={docText.trim().length < 50 || parsing}
          className="h-9 px-4 rounded-lg border border-[#2e3329] text-xs text-[#7a7f6a] hover:border-[#3f4e40] hover:text-[#b5b99f] disabled:opacity-30 cursor-pointer transition-colors w-fit"
        >
          {parsing ? "Parsing…" : "Parse pasted text"}
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="h-12 px-6 rounded-lg border border-[#2e3329] text-sm text-[#7a7f6a] hover:border-[#3f4e40] hover:text-[#b5b99f] cursor-pointer transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onFinish}
          className="flex-1 h-12 rounded-lg bg-[#3f4e40] text-[#b5b99f] font-medium text-sm hover:opacity-90 cursor-pointer transition-all flex items-center justify-center"
        >
          Generate my compliance map →
        </button>
      </div>
    </>
  );
}

// ─── Field components ─────────────────────────────────────────

function EditableRow({
  label, value, onChange, placeholder, multiline,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">{label}</label>
      {multiline ? (
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors resize-none leading-relaxed"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 px-4 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors"
        />
      )}
    </div>
  );
}

function ChipRow({
  label, options, value, onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="h-9 px-4 rounded-lg border text-xs cursor-pointer transition-colors"
            style={{
              borderColor: value === id ? "#3f4e40" : "#2e3329",
              background:  value === id ? "#222720" : "transparent",
              color:       value === id ? "#b5b99f" : "#7a7f6a",
            }}
          >
            {value === id ? "✓ " : ""}{label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChipMultiRow({
  label, value, onChange, suggestions,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  suggestions: string[];
}) {
  const all = Array.from(new Set([...value, ...suggestions]));
  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter(v => v !== id) : [...value, id]);
  }
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">{label}</label>
      <div className="flex flex-wrap gap-2">
        {all.map((id) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className="h-9 px-4 rounded-lg border text-xs cursor-pointer transition-colors"
            style={{
              borderColor: value.includes(id) ? "#3f4e40" : "#2e3329",
              background:  value.includes(id) ? "#222720" : "transparent",
              color:       value.includes(id) ? "#b5b99f" : "#7a7f6a",
            }}
          >
            {value.includes(id) ? "✓ " : ""}{id.replace(/_/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
