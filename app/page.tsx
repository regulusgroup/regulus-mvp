"use client";
// v3
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ShieldIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <path d="M20 4L8 9v10c0 8.284 5.163 15.647 12 18 6.837-2.353 12-9.716 12-18V9L20 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 20l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <path d="M20 6a9 9 0 00-9 9v7l-3 3h24l-3-3v-7a9 9 0 00-9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M17 31a3 3 0 006 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="6" width="24" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 16l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <line x1="14" y1="26" x2="26" y2="26" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="14" y1="30" x2="22" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="5" width="24" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="12" width="12" height="2" rx="1" fill="currentColor" opacity="0.6" />
      <rect x="14" y="17" width="9" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
      <rect x="14" y="21" width="11" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
      <path d="M14 29l3-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const waitlistRef = useRef<HTMLElement>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f18] text-[#b5b99f]">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#2e3329]">
        <Image
          src="/logos/logo-green.svg"
          alt="Regulus"
          width={120}
          height={43}
          priority
        />
        <Link
          href="/waitlist"
          className="h-8 px-4 rounded-lg border border-[#3f4e40] text-xs text-[#b5b99f] hover:opacity-80 transition-opacity"
        >
          Join waitlist
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center">
        <div className="flex flex-col items-center gap-8 max-w-2xl">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3f4e40]/60 bg-[#222720]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b5b99f]" />
            <span className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Early access — joining waitlist now</span>
          </div>

          <h1
            className="text-5xl md:text-7xl leading-[1.05] tracking-tight text-[#b5b99f]"
            style={{ fontFamily: "MomoTrust, serif" }}
          >
            EU compliance for companies{" "}
            <span className="text-[#3f4e40]">that use AI.</span>
          </h1>

          <p className="text-base md:text-lg text-[#7a7f6a] max-w-lg leading-relaxed">
            GDPR. EU AI Act. NIS2. DORA. AML. If you use AI and hold client data in the EU, you have obligations. Regulus maps them, tracks them, and tells you exactly what to do next.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/scan"
              className="h-12 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] font-medium text-sm transition-all hover:opacity-90 flex items-center border border-[#3f4e40]"
            >
              Get your compliance snapshot →
            </Link>
            <Link
              href="/waitlist"
              className="h-12 px-8 rounded-lg border border-[#2e3329] text-[#7a7f6a] font-medium text-sm transition-all hover:border-[#3f4e40] hover:text-[#b5b99f]"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#2e3329]" />

      {/* Problem */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col items-center gap-16 max-w-4xl w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">The problem</p>
            <h2
              className="text-3xl md:text-4xl text-[#b5b99f]"
              style={{ fontFamily: "MomoTrust, serif" }}
            >
              EU regulation just got a lot more complicated.
            </h2>
            <p className="text-[#7a7f6a] max-w-md leading-relaxed text-sm">
              The EU AI Act, GDPR, NIS2, and sector-specific rules now overlap for any company using AI with client data — regardless of industry.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2e3329] rounded-xl overflow-hidden w-full">
            {[
              { stat: "3+",   label: "overlapping EU frameworks apply to any AI product handling personal data" },
              { stat: "2026", label: "EU AI Act high-risk obligations apply — many companies still unprepared" },
              { stat: "€35M", label: "maximum fine for violating the EU AI Act prohibited practices" },
              { stat: "€50K", label: "per year spent on compliance consultants by early-stage companies on average" },
            ].map(({ stat, label }) => (
              <div key={stat} className="bg-[#1a1f18] flex flex-col items-center gap-2 px-6 py-8 text-center">
                <span
                  className="text-3xl md:text-4xl text-[#b5b99f]"
                  style={{ fontFamily: "MomoTrust, serif" }}
                >
                  {stat}
                </span>
                <span className="text-xs text-[#7a7f6a] leading-relaxed max-w-[120px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#2e3329]" />

      {/* Solution */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col items-center gap-16 max-w-4xl w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">The solution</p>
            <h2
              className="text-3xl md:text-4xl text-[#b5b99f]"
              style={{ fontFamily: "MomoTrust, serif" }}
            >
              One dashboard. All EU regulations.
            </h2>
            <p className="text-[#7a7f6a] max-w-md leading-relaxed text-sm">
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
              <div key={title} className="rounded-xl border border-[#2e3329] bg-[#222720] p-6 flex flex-col gap-4">
                <div className="text-[#3f4e40]">{icon}</div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-medium text-[#b5b99f]">{title}</h3>
                  <p className="text-sm text-[#7a7f6a] leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#2e3329]" />

      {/* Who it's for */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col items-center gap-16 max-w-4xl w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Who it&apos;s for</p>
            <h2
              className="text-3xl md:text-4xl text-[#b5b99f]"
              style={{ fontFamily: "MomoTrust, serif" }}
            >
              Built for the people compliance falls on.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {[
              {
                title: "Founders building with AI",
                description: "If your product uses AI and holds EU client data, you have overlapping GDPR, EU AI Act, and NIS2 obligations. Know exactly where you stand.",
              },
              {
                title: "Investors & VCs",
                description: "Compliance risk is the most common hidden liability in early-stage EU companies. Get a clear posture read in minutes, not weeks.",
              },
              {
                title: "Compliance & Legal Teams",
                description: "One source of truth across all EU frameworks — GDPR, AI Act, NIS2, sector-specific rules. Stop maintaining spreadsheets.",
              },
            ].map(({ title, description }) => (
              <div key={title} className="rounded-xl border border-[#2e3329] bg-[#222720] p-6 flex flex-col gap-3">
                <div className="w-1 h-6 rounded-full bg-[#3f4e40]" />
                <h3 className="text-base font-medium text-[#b5b99f]">{title}</h3>
                <p className="text-sm text-[#7a7f6a] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#2e3329]" />

      {/* Why EU */}
      <section className="flex flex-col items-center px-6 py-24">
        <div className="flex flex-col md:flex-row items-start gap-12 max-w-4xl w-full">
          <div className="flex flex-col gap-4 flex-1">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Why EU only</p>
            <h2
              className="text-3xl md:text-4xl text-[#b5b99f] leading-tight"
              style={{ fontFamily: "MomoTrust, serif" }}
            >
              The complexity<br />is the moat.
            </h2>
          </div>
          <div className="flex flex-col gap-5 flex-1 text-sm text-[#7a7f6a] leading-relaxed">
            <p>
              The moment you use AI to make decisions about people — or store EU personal data at scale — you are subject to GDPR, the EU AI Act, and likely NIS2. If you&apos;re in fintech, healthcare, or HR, add sector-specific rules on top.
            </p>
            <p>
              These frameworks overlap, contradict, and evolve on different timelines. No single consultant covers all of them affordably. No existing tool maps them to your specific stack, country, and business model.
            </p>
            <p>
              Regulus is built for this complexity. EU-first, regulation-native, and grounded in primary sources — not legal approximations.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto h-px bg-[#2e3329]" />

      {/* Waitlist CTA */}
      <section ref={waitlistRef} className="flex flex-col items-center px-6 py-32">
        <div className="flex flex-col items-center gap-8 max-w-lg w-full text-center">
          <div className="flex flex-col gap-4">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Early access</p>
            <h2
              className="text-4xl md:text-5xl text-[#b5b99f] leading-tight"
              style={{ fontFamily: "MomoTrust, serif" }}
            >
              Get in early.<br />Help shape what we build.
            </h2>
            <p className="text-[#7a7f6a] text-sm leading-relaxed max-w-sm mx-auto">
              We&apos;re onboarding a small group of design partners — founders, compliance leads, and investors who want to influence the roadmap and get first access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/waitlist"
              className="h-12 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] font-medium text-sm hover:opacity-90 transition-all"
            >
              Join the waitlist
            </Link>
            <Link
              href="/scan"
              className="h-12 px-8 rounded-lg border border-[#2e3329] text-[#7a7f6a] font-medium text-sm hover:border-[#3f4e40] hover:text-[#b5b99f] transition-all"
            >
              Try the snapshot first
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 border-t border-[#2e3329] gap-4 mt-auto">
        <Image
          src="/logos/logo-green.svg"
          alt="Regulus"
          width={80}
          height={29}
        />
        <a
          href="mailto:contact@regulus.eu"
          className="text-xs text-[#4a4f3e] hover:text-[#b5b99f] transition-colors"
        >
          contact@regulus.eu
        </a>
        <p className="text-[11px] text-[#3f4e40]">© 2026 Regulus</p>
      </footer>
    </div>
  );
}
