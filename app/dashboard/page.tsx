import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PRIORITY_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  urgent:  { label: "Urgent",       color: "#c97b7b", bg: "#2a1f1f" },
  quarter: { label: "This quarter", color: "#c9a87b", bg: "#2a231a" },
  year:    { label: "This year",    color: "#b5b99f", bg: "#222720" },
  na:      { label: "Not required", color: "#4a4f3e", bg: "transparent" },
};

const STATUS_LABEL: Record<string, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  done:        "Done",
};

// Ghost regulations shown before the user runs their first scan
const GHOST_REGULATIONS = [
  { name: "GDPR",     full: "General Data Protection Regulation" },
  { name: "EU AI Act", full: "Artificial Intelligence Act" },
  { name: "NIS2",     full: "Network and Information Security Directive 2" },
  { name: "DORA",     full: "Digital Operational Resilience Act" },
];

interface RegulationTask {
  id: string;
  regulation_name: string;
  regulation_full: string | null;
  priority: string | null;
  reason: string | null;
  action: string | null;
  status: string;
}

interface Scan {
  id: string;
  inputs: Record<string, unknown>;
  report: {
    summary?: string;
    riskScore?: number;
    riskLevel?: string;
    costRange?: string;
    timelineToLaunch?: string;
  };
  created_at: string;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: scans }, { data: tasks }] = await Promise.all([
    supabase
      .from("scans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("regulation_tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("priority", { ascending: true }),
  ]);

  const latestScan: Scan | null = scans?.[0] ?? null;
  const allTasks: RegulationTask[] = tasks ?? [];
  const hasData = !!latestScan;

  const stats = {
    total:       allTasks.length,
    not_started: allTasks.filter(t => t.status === "not_started").length,
    in_progress: allTasks.filter(t => t.status === "in_progress").length,
    done:        allTasks.filter(t => t.status === "done").length,
  };
  const progressPct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f18] text-[#b5b99f]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#2e3329]">
        <Link href="/dashboard">
          <Image src="/logos/logo-green.svg" alt="Regulus" width={100} height={36} priority />
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#7a7f6a] hidden md:inline">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="h-8 px-4 rounded-lg border border-[#2e3329] text-xs text-[#7a7f6a] hover:border-[#3f4e40] hover:text-[#b5b99f] transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="flex-1 px-6 md:px-12 py-12 max-w-5xl w-full mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Dashboard</p>
          <h1 className="text-3xl md:text-4xl text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
            Your compliance posture.
          </h1>
        </div>

        {/* Onboarding banner — only when no scan exists */}
        {!hasData && (
          <div className="rounded-xl border border-[#3f4e40]/60 bg-[#222720] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Get started</p>
              <h2 className="text-lg text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
                Run your first compliance scan.
              </h2>
              <p className="text-sm text-[#7a7f6a] leading-relaxed">
                Once you scan, your obligations appear here — tracked, prioritised, ready to act on.
              </p>
            </div>
            <Link
              href="/scan"
              className="h-11 px-7 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center shrink-0"
            >
              Start scan →
            </Link>
          </div>
        )}

        {/* Stats row — always rendered */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#2e3329] rounded-xl overflow-hidden">
          <StatCard
            label="Risk score"
            value={hasData ? `${latestScan?.report.riskScore ?? "—"}/10` : "—"}
            sub={hasData ? latestScan?.report.riskLevel : "No scan yet"}
            empty={!hasData}
          />
          <StatCard
            label="Regulations"
            value={hasData ? String(stats.total) : "—"}
            sub={hasData ? "apply" : "to be mapped"}
            empty={!hasData}
          />
          <StatCard
            label="Progress"
            value={hasData ? `${progressPct}%` : "0%"}
            sub={hasData ? `${stats.done} of ${stats.total}` : "no tasks yet"}
            empty={!hasData}
          />
          <StatCard
            label="Est. cost"
            value={hasData ? (latestScan?.report.costRange ?? "—") : "—"}
            sub={hasData ? latestScan?.report.timelineToLaunch : "to be estimated"}
            empty={!hasData}
          />
        </div>

        {/* Progress bar — always rendered */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Overall progress</p>
            <p className="text-[11px] text-[#7a7f6a]">{progressPct}%</p>
          </div>
          <div className="h-1.5 rounded-full bg-[#2e3329] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progressPct}%`, background: "#3f4e40" }}
            />
          </div>
        </div>

        {/* Action tracker — always rendered */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
              Action tracker
            </h2>
            <Link href="/scan" className="text-xs text-[#7a7f6a] hover:text-[#b5b99f] underline underline-offset-4">
              {hasData ? "Re-scan" : "Run first scan"}
            </Link>
          </div>

          {hasData ? (
            allTasks.length === 0 ? (
              <p className="text-sm text-[#4a4f3e]">No tasks — your scan didn&apos;t flag any applicable regulations.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {allTasks.map((t) => {
                  const p = PRIORITY_STYLES[t.priority ?? "na"] ?? PRIORITY_STYLES.na;
                  return (
                    <div
                      key={t.id}
                      className="rounded-lg border border-[#2e3329] bg-[#222720] p-4 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#3f4e40", color: "#b5b99f" }}>
                            {t.regulation_name}
                          </span>
                          <span className="text-[11px] text-[#7a7f6a]">{t.regulation_full}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: p.color + "50", color: p.color, background: p.bg }}>
                            {p.label}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#2e3329] text-[#7a7f6a]">
                            {STATUS_LABEL[t.status] ?? t.status}
                          </span>
                        </div>
                      </div>
                      {t.action && (
                        <p className="text-xs text-[#b5b99f] leading-relaxed">{t.action}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            // Ghost cards before first scan
            <div className="flex flex-col gap-2 relative">
              {GHOST_REGULATIONS.map((r) => (
                <div
                  key={r.name}
                  className="rounded-lg border border-[#2e3329] bg-[#222720]/40 p-4 flex items-center justify-between gap-3"
                  style={{ opacity: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#3f4e40", color: "#b5b99f" }}>
                      {r.name}
                    </span>
                    <span className="text-[11px] text-[#7a7f6a]">{r.full}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#2e3329] text-[#4a4f3e]">
                    Pending scan
                  </span>
                </div>
              ))}
              <p className="text-[11px] text-[#4a4f3e] text-center mt-2">
                Run a scan to populate this with regulations specific to your business.
              </p>
            </div>
          )}
        </div>

        {/* Activity / next steps — always rendered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#2e3329] bg-[#222720] p-5 flex flex-col gap-2">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Latest scan</p>
            <p className="text-sm text-[#b5b99f]">
              {hasData
                ? new Date(latestScan!.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                : "No scan yet"}
            </p>
            <p className="text-xs text-[#7a7f6a]">
              {hasData ? "Re-scan when your stack, geography, or product changes." : "Run your first scan to start tracking."}
            </p>
          </div>
          <div className="rounded-xl border border-[#2e3329] bg-[#222720] p-5 flex flex-col gap-2">
            <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Regulatory alerts</p>
            <p className="text-sm text-[#b5b99f]">Coming soon</p>
            <p className="text-xs text-[#7a7f6a]">Get notified when a regulation that applies to you is amended.</p>
          </div>
        </div>

      </main>

      <footer className="px-6 md:px-12 py-6 border-t border-[#2e3329] flex items-center justify-between">
        <Image src="/logos/logo-green.svg" alt="Regulus" width={70} height={25} />
        <p className="text-[11px] text-[#3f4e40]">© 2026 Regulus</p>
      </footer>
    </div>
  );
}

function StatCard({ label, value, sub, empty }: { label: string; value: string; sub?: string | null; empty?: boolean }) {
  return (
    <div className="bg-[#1a1f18] flex flex-col items-start gap-1 px-5 py-6">
      <span className="text-[10px] text-[#3f4e40] uppercase tracking-widest">{label}</span>
      <span
        className="text-2xl md:text-3xl"
        style={{
          fontFamily: "MomoTrust, serif",
          color: empty ? "#3f4e40" : "#b5b99f",
        }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-[11px]" style={{ color: empty ? "#3f4e40" : "#7a7f6a" }}>
          {sub}
        </span>
      )}
    </div>
  );
}
