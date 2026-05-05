"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ROLES = [
  "Founder / CEO",
  "CTO / Engineering Lead",
  "Compliance Officer",
  "Legal Counsel",
  "Investor / VC",
  "Advisor",
  "Other",
];

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role, company }),
    });

    if (res.ok) {
      setStatus("success");
    } else if (res.status === 409) {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f18] text-[#b5b99f]">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#2e3329]">
        <Link href="/">
          <Image src="/logos/logo-green.svg" alt="Regulus" width={100} height={36} priority />
        </Link>
        <Link
          href="/scan"
          className="h-8 px-4 rounded-lg border border-[#2e3329] text-xs text-[#7a7f6a] hover:border-[#3f4e40] hover:text-[#b5b99f] transition-colors"
        >
          Try the snapshot →
        </Link>
      </nav>

      <main className="flex flex-col items-center justify-center flex-1 px-6 py-20">
        <div className="w-full max-w-md flex flex-col gap-10">

          {status === "success" ? (
            <div className="flex flex-col items-center gap-6 text-center py-8">
              <div className="w-14 h-14 rounded-full border border-[#3f4e40]/50 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#b5b99f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
                  You&apos;re on the list.
                </p>
                <p className="text-sm text-[#7a7f6a] leading-relaxed max-w-xs">
                  We&apos;ll reach out personally — no mass emails.
                  In the meantime, try the compliance snapshot.
                </p>
              </div>
              <Link
                href="/scan"
                className="h-11 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 transition-all"
              >
                Get your compliance snapshot →
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Early access</p>
                <h1
                  className="text-3xl md:text-4xl text-[#b5b99f] leading-tight"
                  style={{ fontFamily: "MomoTrust, serif" }}
                >
                  Get in early.
                </h1>
                <p className="text-sm text-[#7a7f6a] leading-relaxed">
                  We&apos;re onboarding a small group of design partners — founders, compliance leads, and investors who want to shape what we build and get first access.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Work email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Company</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors"
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#7a7f6a] uppercase tracking-widest">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-11 px-4 rounded-lg border border-[#2e3329] bg-[#222720] text-sm outline-none focus:border-[#3f4e40] transition-colors appearance-none cursor-pointer"
                    style={{ color: role ? "#b5b99f" : "#4a4f3e" }}
                  >
                    <option value="" disabled>Select your role</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r} style={{ color: "#b5b99f", background: "#222720" }}>{r}</option>
                    ))}
                  </select>
                </div>

                {status === "duplicate" && (
                  <p className="text-xs text-[#7a7f6a] text-center">You&apos;re already on the list.</p>
                )}
                {status === "error" && (
                  <p className="text-xs text-red-400 text-center">Something went wrong — try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 mt-2 rounded-lg bg-[#3f4e40] text-[#b5b99f] font-medium text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer transition-all"
                >
                  {status === "loading" ? "Joining…" : "Join the waitlist"}
                </button>

                <p className="text-xs text-[#4a4f3e] text-center">
                  No spam. We reach out personally when it matters.
                </p>
              </form>
            </>
          )}
        </div>
      </main>

      <footer className="px-6 md:px-12 py-6 border-t border-[#2e3329] flex items-center justify-between">
        <Image src="/logos/logo-green.svg" alt="Regulus" width={70} height={25} />
        <p className="text-[11px] text-[#3f4e40]">© 2026 Regulus</p>
      </footer>
    </div>
  );
}
