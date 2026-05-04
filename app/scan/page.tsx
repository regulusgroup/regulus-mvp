"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type BusinessType = "payments" | "crypto" | "lending" | "neobank" | "insurance";
type Handle = "user_data" | "crypto_assets" | "card_payments" | "cross_border" | "lending_credit";

interface Regulation {
  id: string;
  name: string;
  fullName: string;
  applies: boolean;
  reason: string;
  action: string;
  urgency: "high" | "medium" | "low";
}

// ─── Compliance logic ─────────────────────────────────────────────────────────

function computeReport(business: BusinessType, handles: Handle[]): Regulation[] {
  const h = (key: Handle) => handles.includes(key);

  return [
    {
      id: "gdpr",
      name: "GDPR",
      fullName: "General Data Protection Regulation",
      applies: true, // always
      reason: "Any fintech processing EU user data is subject to GDPR.",
      action: "Assess DPO necessity, document data flows, and implement a privacy policy.",
      urgency: "high",
    },
    {
      id: "aml",
      name: "AML",
      fullName: "Anti-Money Laundering Directive",
      applies: ["payments", "crypto", "lending", "neobank"].includes(business) || h("cross_border") || h("crypto_assets") || h("lending_credit"),
      reason: "Applies to businesses handling payments, crypto, lending, or cross-border transfers.",
      action: "Implement KYC/KYB procedures, transaction monitoring, and file a SAR policy.",
      urgency: "high",
    },
    {
      id: "psd2",
      name: "PSD2",
      fullName: "Payment Services Directive 2",
      applies: ["payments", "neobank"].includes(business) || h("card_payments") || h("cross_border"),
      reason: "Applies to any service initiating or processing payments within the EU.",
      action: "Obtain a Payment Institution license or partner with a licensed PI. Implement Strong Customer Authentication (SCA).",
      urgency: "high",
    },
    {
      id: "mica",
      name: "MiCA",
      fullName: "Markets in Crypto-Assets Regulation",
      applies: business === "crypto" || h("crypto_assets"),
      reason: "MiCA governs all crypto-asset services and issuers operating in the EU.",
      action: "Register as a Crypto-Asset Service Provider (CASP). Prepare white paper disclosures.",
      urgency: "high",
    },
    {
      id: "dora",
      name: "DORA",
      fullName: "Digital Operational Resilience Act",
      applies: ["payments", "neobank", "lending", "crypto"].includes(business),
      reason: "DORA applies to regulated financial entities and requires ICT risk management.",
      action: "Conduct an ICT risk assessment, set up incident reporting procedures, and test resilience.",
      urgency: "medium",
    },
  ];
}

function getRiskLevel(regulations: Regulation[]) {
  const count = regulations.filter((r) => r.applies).length;
  if (count >= 4) return { label: "High", color: "#c97b7b", bg: "#2a1f1f" };
  if (count >= 3) return { label: "Medium", color: "#c9a87b", bg: "#2a231a" };
  return { label: "Low", color: "#b5b99f", bg: "#222720" };
}

// ─── Step components ──────────────────────────────────────────────────────────

const BUSINESS_TYPES: { id: BusinessType; label: string; desc: string }[] = [
  { id: "payments", label: "Payments App", desc: "Money transfers, wallets, payment processing" },
  { id: "crypto", label: "Crypto & DeFi", desc: "Exchanges, custody, tokenisation, DeFi protocols" },
  { id: "lending", label: "Lending & Credit", desc: "BNPL, consumer loans, credit scoring" },
  { id: "neobank", label: "Neobank", desc: "Digital banking, accounts, cards" },
  { id: "insurance", label: "Insurtech", desc: "Digital insurance products and distribution" },
];

const HANDLES: { id: Handle; label: string }[] = [
  { id: "user_data", label: "User data / KYC" },
  { id: "crypto_assets", label: "Crypto assets" },
  { id: "card_payments", label: "Card payments" },
  { id: "cross_border", label: "Cross-border transfers" },
  { id: "lending_credit", label: "Lending / Credit" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScanPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [business, setBusiness] = useState<BusinessType | null>(null);
  const [handles, setHandles] = useState<Handle[]>([]);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "done" | "duplicate">("idle");

  const regulations = business ? computeReport(business, handles) : [];
  const applicable = regulations.filter((r) => r.applies);
  const risk = business ? getRiskLevel(regulations) : null;

  function toggleHandle(id: Handle) {
    setHandles((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setEmailStatus("loading");
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role: business ?? "" }),
    });
    setEmailStatus(res.status === 409 ? "duplicate" : "done");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f18] text-[#b5b99f]">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#2e3329]">
        <Link href="/">
          <Image src="/logos/logo-green.svg" alt="Regulus" width={100} height={36} priority />
        </Link>
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="flex items-center gap-1.5"
            >
              <div
                className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-all"
                style={{
                  borderColor: step >= s ? "#3f4e40" : "#2e3329",
                  background: step > s ? "#3f4e40" : "transparent",
                  color: step >= s ? "#b5b99f" : "#4a4f3e",
                }}
              >
                {step > s ? "✓" : s}
              </div>
              {s < 3 && <div className="w-6 h-px" style={{ background: step > s ? "#3f4e40" : "#2e3329" }} />}
            </div>
          ))}
        </div>
      </nav>

      <main className="flex flex-col items-center flex-1 px-6 py-16">

        {/* ── Step 1: Business type ── */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Step 1 of 3</p>
              <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "MomoTrust, serif" }}>
                What are you building?
              </h1>
              <p className="text-sm text-[#7a7f6a]">Select the type that best describes your product.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {BUSINESS_TYPES.map(({ id, label, desc }) => (
                <button
                  key={id}
                  onClick={() => setBusiness(id)}
                  className="rounded-xl border p-5 text-left flex flex-col gap-1.5 transition-all cursor-pointer"
                  style={{
                    borderColor: business === id ? "#3f4e40" : "#2e3329",
                    background: business === id ? "#222720" : "transparent",
                  }}
                >
                  <span className="text-sm font-medium text-[#b5b99f]">{label}</span>
                  <span className="text-xs text-[#7a7f6a] leading-relaxed">{desc}</span>
                </button>
              ))}
            </div>

            <button
              disabled={!business}
              onClick={() => setStep(2)}
              className="h-11 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium transition-all hover:opacity-90 disabled:opacity-30 cursor-pointer"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: What you handle ── */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Step 2 of 3</p>
              <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "MomoTrust, serif" }}>
                What does your product handle?
              </h1>
              <p className="text-sm text-[#7a7f6a]">Select all that apply.</p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center w-full">
              {HANDLES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => toggleHandle(id)}
                  className="h-10 px-4 rounded-lg border text-sm transition-all cursor-pointer"
                  style={{
                    borderColor: handles.includes(id) ? "#3f4e40" : "#2e3329",
                    background: handles.includes(id) ? "#222720" : "transparent",
                    color: handles.includes(id) ? "#b5b99f" : "#7a7f6a",
                  }}
                >
                  {handles.includes(id) ? "✓ " : ""}{label}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="h-11 px-6 rounded-lg border border-[#2e3329] text-sm text-[#7a7f6a] hover:border-[#3f4e40] transition-all cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="h-11 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium transition-all hover:opacity-90 cursor-pointer"
              >
                See my compliance snapshot →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Results ── */}
        {step === 3 && risk && (
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Your compliance snapshot</p>
              <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "MomoTrust, serif" }}>
                {applicable.length} regulation{applicable.length !== 1 ? "s" : ""} apply to you.
              </h1>
            </div>

            {/* Risk badge */}
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl border"
              style={{ borderColor: risk.color + "40", background: risk.bg }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: risk.color }} />
              <span className="text-sm" style={{ color: risk.color }}>
                Overall compliance risk: <strong>{risk.label}</strong>
              </span>
            </div>

            {/* Regulations grid */}
            <div className="flex flex-col gap-3 w-full">
              {regulations.map((reg) => (
                <div
                  key={reg.id}
                  className="rounded-xl border p-5 flex flex-col gap-3"
                  style={{
                    borderColor: reg.applies ? "#3f4e40" : "#2e3329",
                    background: reg.applies ? "#222720" : "transparent",
                    opacity: reg.applies ? 1 : 0.4,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{
                          background: reg.applies ? "#3f4e40" : "#2e3329",
                          color: reg.applies ? "#b5b99f" : "#7a7f6a",
                        }}
                      >
                        {reg.name}
                      </span>
                      <span className="text-xs text-[#7a7f6a]">{reg.fullName}</span>
                    </div>
                    <span className="text-xs" style={{ color: reg.applies ? "#b5b99f" : "#4a4f3e" }}>
                      {reg.applies ? "Applies ✓" : "Not applicable"}
                    </span>
                  </div>
                  {reg.applies && (
                    <>
                      <p className="text-xs text-[#7a7f6a] leading-relaxed">{reg.reason}</p>
                      <div className="flex gap-2 items-start">
                        <span className="text-[10px] text-[#3f4e40] uppercase tracking-widest mt-0.5 shrink-0">Action</span>
                        <p className="text-xs text-[#b5b99f] leading-relaxed">{reg.action}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Email capture */}
            <div className="w-full rounded-xl border border-[#3f4e40]/40 bg-[#222720] p-6 flex flex-col gap-4 text-center">
              {emailStatus === "done" || emailStatus === "duplicate" ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm font-medium text-[#b5b99f]">
                    {emailStatus === "done" ? "You're on the list." : "You're already on the list."}
                  </p>
                  <p className="text-xs text-[#7a7f6a]">We'll reach out when early access opens.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-[#b5b99f]">Save your report & get early access</p>
                  <p className="text-xs text-[#7a7f6a] leading-relaxed">
                    The full Regulus dashboard tracks all of this automatically — updated as regulations change.
                  </p>
                  <form onSubmit={submitEmail} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-10 px-3 rounded-lg border border-[#2e3329] bg-[#1a1f18] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "loading"}
                      className="h-10 px-5 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 disabled:opacity-50 cursor-pointer shrink-0"
                    >
                      {emailStatus === "loading" ? "Saving…" : "Get full access"}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="h-9 px-4 rounded-lg border border-[#2e3329] text-xs text-[#7a7f6a] hover:border-[#3f4e40] transition-all cursor-pointer"
              >
                ← Edit answers
              </button>
              <Link
                href="/"
                className="h-9 px-4 rounded-lg border border-[#2e3329] text-xs text-[#7a7f6a] hover:border-[#3f4e40] transition-all flex items-center"
              >
                Back to home
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 border-t border-[#2e3329] flex items-center justify-between">
        <Image src="/logos/logo-green.svg" alt="Regulus" width={70} height={25} />
        <p className="text-[11px] text-[#3f4e40]">© 2026 Regulus</p>
      </footer>
    </div>
  );
}
