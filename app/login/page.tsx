"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f18] text-[#b5b99f]">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#2e3329]">
        <Link href="/">
          <Image src="/logos/logo-green.svg" alt="Regulus" width={100} height={36} priority />
        </Link>
      </nav>

      <main className="flex flex-col items-center justify-center flex-1 px-6 py-20">
        <div className="w-full max-w-sm flex flex-col gap-10">

          {status === "sent" ? (
            <div className="flex flex-col items-center gap-6 text-center py-8">
              <div className="w-14 h-14 rounded-full border border-[#3f4e40]/50 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9-4 9 4" stroke="#b5b99f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xl text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
                  Check your email.
                </p>
                <p className="text-sm text-[#7a7f6a] leading-relaxed">
                  We sent a sign-in link to <span className="text-[#b5b99f]">{email}</span>.
                  Click it to access your dashboard.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 text-center">
                <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Sign in</p>
                <h1 className="text-3xl text-[#b5b99f] leading-tight" style={{ fontFamily: "MomoTrust, serif" }}>
                  Welcome back.
                </h1>
                <p className="text-sm text-[#7a7f6a] leading-relaxed">
                  Enter your email — we&apos;ll send you a one-time sign-in link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

                {status === "error" && (
                  <p className="text-xs text-red-400 text-center">{errorMsg || "Something went wrong."}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 mt-2 rounded-lg bg-[#3f4e40] text-[#b5b99f] font-medium text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer transition-all"
                >
                  {status === "loading" ? "Sending…" : "Send sign-in link"}
                </button>

                <p className="text-xs text-[#4a4f3e] text-center">
                  No password. No spam. One-time link only.
                </p>
              </form>

              <div className="border-t border-[#2e3329] pt-6 text-center">
                <p className="text-xs text-[#7a7f6a]">
                  Don&apos;t have an account yet?{" "}
                  <Link href="/waitlist" className="text-[#b5b99f] underline underline-offset-4">
                    Join the waitlist
                  </Link>
                </p>
              </div>
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
