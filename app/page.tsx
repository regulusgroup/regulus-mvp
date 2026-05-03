"use client";

import { useState, useRef } from "react";

function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 4L8 9v10c0 8.284 5.163 15.647 12 18 6.837-2.353 12-9.716 12-18V9L20 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 6a9 9 0 00-9 9v7l-3 3h24l-3-3v-7a9 9 0 00-9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M17 31a3 3 0 006 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="10" r="4" fill="#f6e8cf" opacity="0.25" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="6" width="24" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 16l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <line x1="14" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="14" y1="30" x2="22" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="5" width="24" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="12" width="12" height="2" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="14" y="17" width="9" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="14" y="21" width="11" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <path d="M14 29l3-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

const ROLES = [
  "Fintech Founder / CEO",
  "CTO / Engineering Lead",
  "Compliance Officer",
  "Investor / VC",
  "Advisor",
  "Other",
];

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    if (res.ok) {
      setStatus("success");
    } else if (res.status === 409) {
      setStatus("duplicate");
    } else {
      const data = await res.json();
      setErrorMsg(data.error || "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-8">
        <div className="w-14 h-14 rounded-full border border-[#f6e8cf]/20 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#f6e8cf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-[#f6e8cf] font-medium">You&apos;re on the list.</p>
        <p className="text-sm text-[#a0977e] max-w-xs leading-relaxed">
          We&apos;ll reach out personally when we open early access — no mass emails.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 px-4 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] text-[#f6e8cf] placeholder:text-[#a0977e] text-sm outline-none focus:border-[#f6e8cf]/40 transition-colors"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="h-12 px-4 rounded-lg border border-[#3a3a3a] bg-[#2a2a2a] text-sm outline-none focus:border-[#f6e8cf]/40 transition-colors appearance-none cursor-pointer"
        style={{ color: role ? "#f6e8cf" : "#a0977e" }}
      >
        <option value="" disabled>Your role (optional)</option>
        {ROLES.map((r) => (
          <option key={r} value={r} style={{ color: "#f6e8cf", background: "#2a2a2a" }}>{r}</option>
        ))}
      </select>

      {status === "duplicate" && (
        <p className="text-xs text-[#a0977e] text-center">You&apos;re already on the list.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-[#e55353] text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="h-12 rounded-lg bg-[#f6e8cf] text-[#222222] font-medium text-sm transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Joining…" : "Join the waitlist"}
      </button>

      <p className="text-xs text-[#a0977e] text-center">
        No spam. We&apos;ll reach out when it matters.
      </p>
    </form>
  );
}

export default function Home() {
  const waitlistRef = useRef<HTMLElement>(null);

  function scrollToWaitlist() {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-[#3a3a3a]">
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-[0.18em] uppercase text-[#f6e8cf]">Regulus</span>
          <span className="text-[9px] text-[#a0977e] tracking-[0.2em] uppercase mt-0.5">Group</span>
        </div>
        <button
          onClick={scrollToWaitlist}
          className="h-8 px-4 rounded-lg border border-[#f6e8cf]/20 text-xs text-[#f6e8cf] hover:border-[#f6e8cf]/50 transition-colors cursor-pointer"
        >
          Join waitlist
        </button>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center">
        <div className="flex flex-col items-center gap-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f6e8cf]/10 bg-[#f6e8cf]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f6e8cf]/40" />
            <span className="text-[11px] text-[#a0977e] uppercase tracking-widest">Early access — joining waitlist now</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-[#f6e8cf]">
            EU fintech compliance,<br />
            <span className="text-[#a0977e]">finally under control.</span>
          </h1>

          <p className="text-base md:text-lg text-[#a0977e] max-w-lg leading-relaxed">
            MiCA. PSD2. DORA. GDPR. AML. One AI dashboard tracks every regulation that applies to your business — so you can stop worrying and start building.
          </p>

          <button
            onClick={scrollToWaitlist}
            className="h-12 px-8 rounded-lg bg-[#f6e8cf] text-[#222222] font-medium text-sm transition-opacity hover:opacity-90 cursor-pointer"
          >
            Request early access
          </button>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#3a3a3a]" />

      {/* Problem */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col items-center gap-16 max-w-4xl w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] text-[#a0977e] uppercase tracking-widest">The problem</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#f6e8cf]">
              Compliance is killing European fintechs.
            </h2>
            <p className="text-[#a0977e] max-w-md leading-relaxed text-sm">
              Not because founders don&apos;t care — but because the regulatory surface is fragmented, expensive, and constantly moving.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#3a3a3a] rounded-xl overflow-hidden w-full">
            {[
              { stat: "73%", label: "of EU fintechs fail partly due to compliance failures" },
              { stat: "5+", label: "Excel files to track obligations across frameworks" },
              { stat: "50+", label: "pages of regulatory reading required per week" },
              { stat: "€50K", label: "per year spent on compliance consultants on average" },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-[#222222] flex flex-col items-center gap-2 px-6 py-8 text-center">
                <span className="text-3xl md:text-4xl font-semibold text-[#f6e8cf]">{stat}</span>
                <span className="text-xs text-[#a0977e] leading-relaxed max-w-[120px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#3a3a3a]" />

      {/* Solution */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col items-center gap-16 max-w-4xl w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] text-[#a0977e] uppercase tracking-widest">The solution</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#f6e8cf]">One dashboard. All EU regulations.</h2>
            <p className="text-[#a0977e] max-w-md leading-relaxed text-sm">
              Regulus reads the regulations, maps them to your business, and tells you exactly what to do next — no consultants required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {[
              {
                icon: <ShieldIcon />,
                title: "Compliance Dashboard",
                description: "Your full compliance status at a glance. Know exactly where you stand across MiCA, PSD2, DORA, GDPR, and AML — in real time.",
              },
              {
                icon: <BellIcon />,
                title: "AI Regulatory Alerts",
                description: "The AI reads new regulations and amendments so you don't have to. Get notified when something changes that affects your business.",
              },
              {
                icon: <ChecklistIcon />,
                title: "Step-by-step Checklists",
                description: "Turn complex regulatory requirements into clear, actionable tasks. Know what to do, in what order, by when.",
              },
              {
                icon: <ReportIcon />,
                title: "Audit-ready Reports",
                description: "One-click export of your compliance status for audits, investor due diligence, or regulatory filings.",
              },
            ].map(({ icon, title, description }) => (
              <div key={title} className="rounded-xl border border-[#3a3a3a] bg-[#2a2a2a] p-6 flex flex-col gap-4">
                <div className="text-[#f6e8cf]/60">{icon}</div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-medium text-[#f6e8cf]">{title}</h3>
                  <p className="text-sm text-[#a0977e] leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#3a3a3a]" />

      {/* Who it's for */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col items-center gap-16 max-w-4xl w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] text-[#a0977e] uppercase tracking-widest">Who it&apos;s for</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#f6e8cf]">Built for the people compliance falls on.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                title: "Fintech Founders",
                description: "Stop losing sleep over compliance. Know your obligations, track your progress, and never miss a deadline that could sink your company.",
              },
              {
                title: "Investors & VCs",
                description: "Due diligence in minutes, not weeks. Compliance posture is often the biggest hidden risk in early-stage fintech — now it's legible.",
              },
              {
                title: "Compliance Teams",
                description: "Stop maintaining spreadsheets. Get a single source of truth for your entire regulatory stack across all EU frameworks.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="rounded-xl border border-[#3a3a3a] bg-[#2a2a2a] p-6 flex flex-col gap-3">
                <h3 className="text-base font-medium text-[#f6e8cf]">{title}</h3>
                <p className="text-sm text-[#a0977e] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#3a3a3a]" />

      {/* Why EU */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col md:flex-row items-start gap-12 max-w-4xl w-full">
          <div className="flex flex-col gap-4 flex-1">
            <p className="text-[11px] text-[#a0977e] uppercase tracking-widest">Why EU only</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#f6e8cf] leading-tight">
              The complexity<br />is the moat.
            </h2>
          </div>
          <div className="flex flex-col gap-5 flex-1 text-sm text-[#a0977e] leading-relaxed">
            <p>
              Europe doesn&apos;t have one regulatory framework for fintech — it has dozens, layered across the EU and each member state. MiCA for crypto. PSD2 for payments. DORA for operational resilience. GDPR for data. AML for financial crime.
            </p>
            <p>
              No single tool maps all of them. No consultant covers all of them affordably. That&apos;s the gap — and it only grows as regulation accelerates.
            </p>
            <p>
              Regulus is built specifically for this complexity. EU-first, regulation-native, and designed to stay current as the rules change.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#3a3a3a]" />

      {/* Waitlist */}
      <section ref={waitlistRef} className="flex flex-col items-center px-6 py-32">
        <div className="flex flex-col items-center gap-10 max-w-lg w-full text-center">
          <div className="flex flex-col gap-4">
            <p className="text-[11px] text-[#a0977e] uppercase tracking-widest">Early access</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#f6e8cf] leading-tight">
              Get in early.<br />Help shape what we build.
            </h2>
            <p className="text-[#a0977e] text-sm leading-relaxed">
              We&apos;re onboarding a small group of design partners — fintech founders, compliance leads, and investors who want to influence the roadmap and get first access.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 border-t border-[#3a3a3a] gap-4 mt-auto">
        <div className="flex flex-col leading-none">
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#f6e8cf]">Regulus</span>
          <span className="text-[9px] text-[#a0977e] tracking-[0.2em] uppercase mt-0.5">Group</span>
        </div>
        <a
          href="mailto:contact@regulusgroup.eu"
          className="text-xs text-[#a0977e] hover:text-[#f6e8cf] transition-colors"
        >
          contact@regulusgroup.eu
        </a>
        <p className="text-[11px] text-[#a0977e]">© 2026 Regulus Group</p>
      </footer>
    </div>
  );
}
