"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Category icons ───────────────────────────────────────────────────────────

const IconAI = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.1"/>
    <circle cx="1.5" cy="3.5" r="1" stroke="currentColor" strokeWidth="1.1"/>
    <circle cx="13.5" cy="3.5" r="1" stroke="currentColor" strokeWidth="1.1"/>
    <circle cx="1.5" cy="11.5" r="1" stroke="currentColor" strokeWidth="1.1"/>
    <circle cx="13.5" cy="11.5" r="1" stroke="currentColor" strokeWidth="1.1"/>
    <line x1="2.5" y1="4" x2="5.8" y2="6.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="12.5" y1="4" x2="9.2" y2="6.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="2.5" y1="11" x2="5.8" y2="8.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="12.5" y1="11" x2="9.2" y2="8.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const IconHealth = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.1"/>
    <line x1="7.5" y1="4.5" x2="7.5" y2="10.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="4.5" y1="7.5" x2="10.5" y2="7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const IconHR = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="4.5" r="2.3" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M2.5 13.5c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const IconCommerce = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M8 2h4.5a.5.5 0 01.5.5V7a.5.5 0 01-.146.354l-5.5 5.5a.5.5 0 01-.708 0l-4.5-4.5a.5.5 0 010-.708l5.5-5.5A.5.5 0 018 2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
    <circle cx="11" cy="5" r="0.8" fill="currentColor"/>
  </svg>
);

const IconProfessional = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1.5" y="5.5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M5.5 5.5V4.5a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <line x1="1.5" y1="9.5" x2="13.5" y2="9.5" stroke="currentColor" strokeWidth="1.1" opacity="0.4"/>
  </svg>
);

const IconFinance = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <line x1="1" y1="13.5" x2="14" y2="13.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.5"/>
    <rect x="2" y="7" width="2" height="6.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
    <rect x="6.5" y="7" width="2" height="6.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
    <rect x="11" y="7" width="2" height="6.5" rx="0.5" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M1.5 7L7.5 3l6 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const BUSINESS_CATEGORIES = [
  {
    id: "ai_saas",
    label: "AI & Software",
    icon: <IconAI />,
    types: [
      { id: "saas_ai",    label: "B2B SaaS with AI",        desc: "SaaS product with AI features that processes user data" },
      { id: "dev_tools",  label: "Developer Tools & APIs",  desc: "APIs, SDKs, platforms used by other developers" },
      { id: "analytics",  label: "Data & Analytics",        desc: "Data pipelines, BI tools, customer intelligence platforms" },
      { id: "ai_agent",   label: "AI Agents / Automation",  desc: "Autonomous AI agents, workflow automation, AI assistants" },
    ],
  },
  {
    id: "health",
    label: "Healthcare & Life Sciences",
    icon: <IconHealth />,
    types: [
      { id: "digital_health", label: "Digital Health / Telemedicine", desc: "Patient apps, remote consultations, health monitoring" },
      { id: "medtech",        label: "Medical Devices (SaMD)",        desc: "Software as a Medical Device — diagnostics, decision support" },
      { id: "wellness",       label: "Health & Wellness Apps",        desc: "Fitness, mental health, nutrition — consumer data at scale" },
      { id: "pharma_tech",    label: "Pharma & Biotech Tech",         desc: "Clinical trials, drug discovery, research data platforms" },
    ],
  },
  {
    id: "hr_people",
    label: "HR & Workforce",
    icon: <IconHR />,
    types: [
      { id: "recruitment",   label: "Recruitment & ATS",        desc: "Applicant tracking, CV screening, candidate scoring" },
      { id: "hr_mgmt",       label: "HR Management",            desc: "Employee records, performance management, payroll" },
      { id: "workforce_ai",  label: "Workforce Analytics",      desc: "Productivity monitoring, workforce planning, people analytics" },
    ],
  },
  {
    id: "commerce",
    label: "Commerce & Marketing",
    icon: <IconCommerce />,
    types: [
      { id: "ecommerce",    label: "E-commerce & Retail",    desc: "Online stores, marketplaces, personalised shopping" },
      { id: "martech",      label: "MarTech & AdTech",       desc: "Ad targeting, email automation, customer segmentation" },
      { id: "crm_cx",       label: "CRM & Customer Success", desc: "Customer relationship platforms, support tooling" },
    ],
  },
  {
    id: "professional",
    label: "Professional Services",
    icon: <IconProfessional />,
    types: [
      { id: "legaltech",   label: "Legal Tech",        desc: "Contract analysis, legal research, document automation" },
      { id: "edtech",      label: "EdTech",            desc: "E-learning, student profiling, adaptive learning" },
      { id: "proptech",    label: "PropTech",          desc: "Property management, smart buildings, real estate platforms" },
      { id: "govtech",     label: "GovTech / RegTech", desc: "Public sector software, regulatory reporting, compliance tools" },
    ],
  },
  {
    id: "financial",
    label: "Financial Services",
    icon: <IconFinance />,
    types: [
      { id: "neobank",     label: "Neobank",            desc: "Digital accounts, cards, banking services" },
      { id: "payments",    label: "Payments App",       desc: "Wallets, transfers, payment processing" },
      { id: "lending",     label: "Lending & Credit",   desc: "BNPL, personal loans, credit scoring" },
      { id: "crypto",      label: "Crypto & DeFi",      desc: "Exchanges, custody, yield, tokenisation" },
      { id: "wealthtech",  label: "Wealthtech",         desc: "Robo-advisors, investing, trading platforms" },
      { id: "embedded",    label: "Embedded Finance",   desc: "BaaS, white-label financial products" },
      { id: "openbanking", label: "Open Banking",       desc: "Account aggregation, PFM, data APIs" },
      { id: "b2bfinance",  label: "B2B Finance",        desc: "Corporate payments, treasury, FX" },
      { id: "insurance",   label: "Insurtech",          desc: "Digital insurance products & distribution" },
      { id: "regtech",     label: "Regtech",            desc: "Compliance tools, regulatory reporting, AML" },
    ],
  },
];

const TECH_STACK = {
  "AI Providers": [
    { id: "openai",    label: "OpenAI" },
    { id: "anthropic", label: "Anthropic (Claude)" },
    { id: "gemini",    label: "Google Gemini" },
    { id: "mistral",   label: "Mistral (EU)" },
  ],
  "Infrastructure": [
    { id: "aws",       label: "AWS" },
    { id: "gcp",       label: "Google Cloud" },
    { id: "azure",     label: "Azure" },
    { id: "supabase",  label: "Supabase" },
    { id: "vercel",    label: "Vercel" },
    { id: "hetzner",   label: "Hetzner (EU)" },
  ],
  "Payments & Banking": [
    { id: "stripe",    label: "Stripe" },
    { id: "adyen",     label: "Adyen" },
    { id: "wise",      label: "Wise" },
    { id: "plaid",     label: "Plaid" },
  ],
  "Crypto Tools": [
    { id: "fireblocks",  label: "Fireblocks" },
    { id: "chainalysis", label: "Chainalysis" },
    { id: "alchemy",     label: "Alchemy" },
  ],
};

const HANDLES = [
  { id: "personal_data",   label: "Personal profiles / identity" },
  { id: "health_data",     label: "Health or medical data" },
  { id: "financial_data",  label: "Financial data" },
  { id: "employee_data",   label: "Employee data" },
  { id: "behavioral_data", label: "Behavioral / usage data" },
  { id: "biometric_data",  label: "Biometric data" },
  { id: "children_data",   label: "Children's data (under 16)" },
  { id: "card_payments",   label: "Payment card data" },
  { id: "crypto_assets",   label: "Crypto assets" },
  { id: "user_funds",      label: "Custody of client funds" },
  { id: "cross_border",    label: "Cross-border transfers" },
  { id: "lending_credit",  label: "Lending / Credit decisions" },
];

const COUNTRIES = [
  "Malta", "Germany", "France", "Netherlands",
  "Ireland", "Estonia", "Lithuania", "Spain", "Italy", "Other EU",
];

const STAGES = [
  { id: "idea",      label: "Idea / Pre-launch", desc: "Building, haven't launched yet" },
  { id: "mvp",       label: "MVP",               desc: "Live with first users" },
  { id: "growing",   label: "Growing",            desc: "Revenue, expanding user base" },
  { id: "scaling",   label: "Scaling",            desc: "Raising or scaling operations" },
];

const HAS_IN_PLACE = [
  { id: "privacy_policy",  label: "Privacy policy" },
  { id: "kyc_system",      label: "KYC system" },
  { id: "legal_counsel",   label: "Legal counsel" },
  { id: "banking_partner", label: "Banking partner" },
  { id: "compliance_officer", label: "Compliance officer" },
];

// ─── Report types ─────────────────────────────────────────────────────────────

interface RegulationResult {
  name: string;
  fullName: string;
  applies: boolean;
  priority: "urgent" | "quarter" | "year" | "na";
  reason: string;
  action: string;
}

interface TechFlag {
  tool: string;
  flag: string;
}

interface Report {
  summary: string;
  riskScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  regulations: RegulationResult[];
  techStackFlags: TechFlag[];
  thirtyDayPlan: string[];
  costRange: string;
  timelineToLaunch: string;
  saved?: boolean;  // true when the scan was persisted for a logged-in user
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  urgent:  { label: "Urgent",       color: "#c97b7b", bg: "#2a1f1f" },
  quarter: { label: "This quarter", color: "#c9a87b", bg: "#2a231a" },
  year:    { label: "This year",    color: "#b5b99f", bg: "#222720" },
  na:      { label: "Not required", color: "#4a4f3e", bg: "transparent" },
};

const RISK_COLOR: Record<string, string> = {
  Low: "#b5b99f", Medium: "#c9a87b", High: "#c97b7b", Critical: "#e05555",
};

function Chip({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 px-4 rounded-lg border text-xs transition-all cursor-pointer"
      style={{
        borderColor: selected ? "#3f4e40" : "#2e3329",
        background:  selected ? "#222720" : "transparent",
        color:       selected ? "#b5b99f" : "#7a7f6a",
      }}
    >
      {selected ? "✓ " : ""}{label}
    </button>
  );
}

// ─── Visualisation components ────────────────────────────────────────────────

function RiskGauge({ score, level, color }: { score: number; level: string; color: string }) {
  const r = 64, cx = 100, cy = 100;
  const C = 2 * Math.PI * r;
  const half = C / 2;
  const filled = (score / 10) * half;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 108 }}>
      <svg width="200" height="108" viewBox="0 0 200 108">
        {/* Background arc (top semicircle) */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="#2e3329" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${half} ${C}`}
          transform={`rotate(180 ${cx} ${cy})`}
        />
        {/* Score arc */}
        {filled > 0.1 && (
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${filled} ${C}`}
            transform={`rotate(180 ${cx} ${cy})`}
          />
        )}
      </svg>
      {/* Overlay text */}
      <div className="absolute flex flex-col items-center" style={{ top: 50 }}>
        <span className="text-3xl font-medium" style={{ color, fontFamily: "MomoTrust, serif", lineHeight: 1 }}>
          {score}
        </span>
        <span className="text-[10px] text-[#7a7f6a] mt-1 uppercase tracking-widest">{level} risk</span>
      </div>
    </div>
  );
}

function PriorityBars({ regulations }: { regulations: RegulationResult[] }) {
  const applies = regulations.filter(r => r.applies);
  const total = applies.length;
  if (total === 0) return null;

  const bars = [
    { key: "urgent",  label: "Urgent",      count: applies.filter(r => r.priority === "urgent").length,  color: "#c97b7b" },
    { key: "quarter", label: "This quarter", count: applies.filter(r => r.priority === "quarter").length, color: "#c9a87b" },
    { key: "year",    label: "This year",    count: applies.filter(r => r.priority === "year").length,    color: "#b5b99f" },
  ];

  return (
    <div className="flex flex-col gap-2.5 p-4 rounded-lg border border-[#2e3329] bg-[#1a1f18]">
      <p className="text-[10px] text-[#3f4e40] uppercase tracking-widest mb-0.5">
        {total} regulation{total !== 1 ? "s" : ""} apply to your setup
      </p>
      {bars.map(({ key, label, count, color }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-[11px] text-[#7a7f6a] w-24 shrink-0">{label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-[#2e3329] overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${(count / total) * 100}%`, background: color, minWidth: count > 0 ? 6 : 0 }}
            />
          </div>
          <span className="text-[11px] font-medium w-3 text-right shrink-0" style={{ color: count > 0 ? color : "#4a4f3e" }}>
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ regulations }: { regulations: RegulationResult[] }) {
  const applies = regulations.filter(r => r.applies);
  const total = applies.length;
  if (total === 0) return null;

  const r = 36, cx = 50, cy = 50;
  const C = 2 * Math.PI * r;

  const segments = [
    { label: "Urgent",       count: applies.filter(s => s.priority === "urgent").length,  color: "#c97b7b" },
    { label: "This quarter", count: applies.filter(s => s.priority === "quarter").length, color: "#c9a87b" },
    { label: "This year",    count: applies.filter(s => s.priority === "year").length,    color: "#b5b99f" },
  ].filter(s => s.count > 0);

  let cumulative = 0;

  return (
    <div className="flex items-center gap-5 p-4 rounded-lg border border-[#2e3329] bg-[#1a1f18]">
      <div className="relative shrink-0" style={{ width: 100, height: 100 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2e3329" strokeWidth="14" />
          {segments.map(({ label, count, color }) => {
            const dash = (count / total) * C;
            const offset = -cumulative;
            cumulative += dash;
            return (
              <circle
                key={label} cx={cx} cy={cy} r={r}
                fill="none" stroke={color} strokeWidth="14"
                strokeDasharray={`${dash} ${C}`}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-medium text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif", lineHeight: 1 }}>
            {total}
          </span>
          <span className="text-[9px] text-[#7a7f6a] mt-0.5">regs</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {segments.map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
            <span className="text-xs text-[#7a7f6a] flex-1">{label}</span>
            <span className="text-xs font-medium" style={{ color }}>{count}</span>
          </div>
        ))}
        <p className="text-[10px] text-[#4a4f3e] pt-1 border-t border-[#2e3329] mt-1">
          out of {regulations.length} checked
        </p>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl animate-pulse">
      {[1,2,3,4].map(i => (
        <div key={i} className="rounded-xl border border-[#2e3329] bg-[#222720] p-6 flex flex-col gap-4">
          <div className="h-3 w-1/3 rounded bg-[#2e3329]" />
          <div className="h-5 w-2/3 rounded bg-[#2e3329]" />
          <div className="h-3 w-full rounded bg-[#2e3329]" />
          <div className="h-3 w-5/6 rounded bg-[#2e3329]" />
          <div className="h-3 w-4/5 rounded bg-[#2e3329]" />
        </div>
      ))}
    </div>
  );
}

// ─── Report renderer ──────────────────────────────────────────────────────────

function ReportView({ report, onEdit }: { report: Report; onEdit: () => void }) {
  const [slide, setSlide] = useState(0);
  const riskColor = RISK_COLOR[report.riskLevel] ?? "#b5b99f";

  const slides = ["Overview", "Regulations", "Tech Stack", "Action Plan", "Summary"];
  const total = slides.length;

  // derive 3 key takeaways from the report
  const keyTakeaways = [
    report.thirtyDayPlan?.[0],
    report.regulations?.find(r => r.applies && r.priority === "urgent")?.action,
    report.techStackFlags?.[0]?.flag,
  ].filter(Boolean).slice(0, 3) as string[];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">

      {/* Step dots */}
      <div className="flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s}
            onClick={() => setSlide(i)}
            className="transition-all cursor-pointer"
            title={s}
          >
            <div
              className="rounded-full transition-all"
              style={{
                width:  slide === i ? 20 : 6,
                height: 6,
                background: slide === i ? "#3f4e40" : "#2e3329",
              }}
            />
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="w-full rounded-xl border border-[#2e3329] bg-[#222720] p-8 flex flex-col gap-6 min-h-[420px]">

        {/* Label */}
        <p className="text-[10px] text-[#3f4e40] uppercase tracking-widest">
          {slide + 1} / {total} — {slides[slide]}
        </p>

        {/* ── Slide 0: Overview ── */}
        {slide === 0 && (
          <div className="flex flex-col gap-5 flex-1">
            <div className="flex justify-center">
              <RiskGauge score={report.riskScore} level={report.riskLevel} color={riskColor} />
            </div>
            <p className="text-sm text-[#7a7f6a] leading-relaxed">{report.summary}</p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2e3329] mt-auto">
              {report.costRange && (
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-[#3f4e40] uppercase tracking-widest">Est. cost</p>
                  <p className="text-lg font-medium text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>{report.costRange}</p>
                </div>
              )}
              {report.timelineToLaunch && (
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-[#3f4e40] uppercase tracking-widest">Timeline</p>
                  <p className="text-lg font-medium text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>{report.timelineToLaunch}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Slide 1: Regulations ── */}
        {slide === 1 && (
          <div className="flex flex-col gap-3 flex-1">
            <PriorityBars regulations={report.regulations} />
            {report.regulations?.map((reg) => {
              const p = PRIORITY_STYLES[reg.priority] ?? PRIORITY_STYLES.na;
              return (
                <div
                  key={reg.name}
                  className="rounded-lg border p-4 flex flex-col gap-2"
                  style={{
                    borderColor: reg.applies ? "#3f4e40" : "#2e3329",
                    background:  reg.applies ? "#1a1f18" : "transparent",
                    opacity:     reg.applies ? 1 : 0.35,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#3f4e40", color: "#b5b99f" }}>
                        {reg.name}
                      </span>
                      <span className="text-[11px] text-[#7a7f6a]">{reg.fullName}</span>
                    </div>
                    {reg.applies && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: p.color + "50", color: p.color, background: p.bg }}>
                        {p.label}
                      </span>
                    )}
                  </div>
                  {reg.applies && (
                    <>
                      <p className="text-xs text-[#7a7f6a] leading-relaxed">{reg.reason}</p>
                      <div className="flex gap-2 items-start border-t border-[#2e3329] pt-2">
                        <span className="text-[10px] text-[#3f4e40] uppercase tracking-widest mt-0.5 shrink-0">Action</span>
                        <p className="text-xs text-[#b5b99f] leading-relaxed">{reg.action}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Slide 2: Tech stack ── */}
        {slide === 2 && (
          <div className="flex flex-col gap-3 flex-1">
            {report.techStackFlags?.length > 0 ? (
              report.techStackFlags.map((f, i) => (
                <div key={i} className="rounded-lg border border-[#2e3329] bg-[#1a1f18] px-4 py-4 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#b5b99f]">{f.tool}</span>
                  <span className="text-xs text-[#7a7f6a] leading-relaxed">{f.flag}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#4a4f3e]">No specific compliance flags for your tech stack.</p>
            )}
          </div>
        )}

        {/* ── Slide 3: 30-day plan ── */}
        {slide === 3 && (
          <div className="flex flex-col gap-4 flex-1">
            {report.thirtyDayPlan?.map((action, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-7 h-7 rounded-full border border-[#3f4e40] flex items-center justify-center text-xs text-[#3f4e40] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-[#b5b99f] leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Slide 4: Summary + email ── */}
        {slide === 4 && (
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl text-[#b5b99f]" style={{ fontFamily: "MomoTrust, serif" }}>
                3 things to act on now.
              </h2>
              {keyTakeaways.map((t, i) => (
                <div key={i} className="flex gap-3 items-start rounded-lg border border-[#2e3329] bg-[#1a1f18] p-4">
                  <span className="w-5 h-5 rounded-full bg-[#3f4e40] flex items-center justify-center text-[10px] text-[#b5b99f] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#b5b99f] leading-relaxed">{t}</p>
                </div>
              ))}
            </div>

            <DonutChart regulations={report.regulations} />

            <div className="border-t border-[#2e3329] pt-5 flex flex-col gap-3 mt-auto">
              {report.saved ? (
                <>
                  <p className="text-xs text-[#7a7f6a]">Saved to your dashboard. Track and update status as you go.</p>
                  <Link
                    href="/dashboard"
                    className="h-10 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center"
                  >
                    Open dashboard →
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-xs text-[#7a7f6a]">Save this report and track progress — sign in to keep it in your dashboard.</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/login"
                      className="h-10 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center"
                    >
                      Save my report →
                    </Link>
                    <Link
                      href="/waitlist"
                      className="h-10 rounded-lg border border-[#3f4e40]/60 text-[#b5b99f] text-sm font-medium hover:border-[#3f4e40] hover:bg-[#222720] transition-all flex items-center justify-center"
                    >
                      Join waitlist
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Nav arrows */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => setSlide(s => Math.max(0, s - 1))}
          disabled={slide === 0}
          className="flex items-center gap-2 h-10 px-5 rounded-lg border border-[#2e3329] text-sm text-[#7a7f6a] hover:border-[#3f4e40] hover:text-[#b5b99f] disabled:opacity-20 transition-all cursor-pointer"
        >
          ← Previous
        </button>

        <button
          onClick={onEdit}
          className="text-xs text-[#3f4e40] hover:text-[#7a7f6a] transition-colors cursor-pointer"
        >
          Start over
        </button>

        <button
          onClick={() => setSlide(s => Math.min(total - 1, s + 1))}
          disabled={slide === total - 1}
          className="flex items-center gap-2 h-10 px-5 rounded-lg border border-[#2e3329] text-sm text-[#7a7f6a] hover:border-[#3f4e40] hover:text-[#b5b99f] disabled:opacity-20 transition-all cursor-pointer"
        >
          Next →
        </button>
      </div>

    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScanPage() {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [business, setBusiness] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [handles, setHandles] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [stage, setStage] = useState("");
  const [hasInPlace, setHasInPlace] = useState<string[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const totalSteps = 4;

  function toggle(list: string[], setList: (v: string[]) => void, id: string) {
    setList(list.includes(id) ? list.filter(i => i !== id) : [...list, id]);
  }

  async function generate() {
    setLoading(true);
    setError("");
    setStep(5);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, businessType: business, techStack, handles, country, stage, hasInPlace }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setReport(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStep(4);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(1); setDescription(""); setBusiness(""); setTechStack([]);
    setHandles([]); setCountry(""); setStage(""); setHasInPlace([]);
    setReport(null); setError(""); setOpenCategory(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f18] text-[#b5b99f]">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-[#2e3329]">
        <Link href="/">
          <Image src="/logos/logo-green.svg" alt="Regulus" width={100} height={36} priority />
        </Link>

        {/* Step indicator */}
        {step <= totalSteps && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div
                  className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-all"
                  style={{
                    borderColor: step >= s ? "#3f4e40" : "#2e3329",
                    background:  step > s  ? "#3f4e40" : "transparent",
                    color:       step >= s ? "#b5b99f" : "#4a4f3e",
                  }}
                >
                  {step > s ? "✓" : s}
                </div>
                {s < totalSteps && (
                  <div className="w-4 h-px" style={{ background: step > s ? "#3f4e40" : "#2e3329" }} />
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      <main className="flex flex-col items-center flex-1 px-6 py-16">

        {/* ── Step 1: Description + business type ── */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Step 1 of {totalSteps}</p>
              <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "MomoTrust, serif" }}>
                Tell us what you&apos;re building.
              </h1>
              <p className="text-sm text-[#7a7f6a]">The more specific, the more accurate your compliance snapshot.</p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-xs text-[#7a7f6a] uppercase tracking-widest">Describe your product</label>
              <textarea
                rows={3}
                placeholder="e.g. A B2B SaaS platform that uses AI to analyse HR data and recommend candidates — we process EU employee data at scale..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#2e3329] bg-[#222720] text-[#b5b99f] placeholder:text-[#4a4f3e] text-sm outline-none focus:border-[#3f4e40] transition-colors resize-none leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs text-[#7a7f6a] uppercase tracking-widest">Business type</label>

              {BUSINESS_CATEGORIES.map((cat) => {
                const isOpen = openCategory === cat.id;
                const hasSelection = cat.types.some(t => t.id === business);
                const selectedType = cat.types.find(t => t.id === business);

                return (
                  <div
                    key={cat.id}
                    className="rounded-xl border transition-all overflow-hidden"
                    style={{ borderColor: hasSelection ? "#3f4e40" : isOpen ? "#3f4e40" : "#2e3329" }}
                  >
                    {/* Category header */}
                    <button
                      type="button"
                      onClick={() => setOpenCategory(isOpen ? null : cat.id)}
                      className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
                      style={{ background: isOpen || hasSelection ? "#222720" : "transparent" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#7a7f6a] flex items-center">{cat.icon}</span>
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="text-sm font-medium text-[#b5b99f]">{cat.label}</span>
                          {hasSelection && !isOpen && (
                            <span className="text-[11px] text-[#3f4e40]">✓ {selectedType?.label}</span>
                          )}
                        </div>
                      </div>
                      <span
                        className="text-[#4a4f3e] text-xs transition-transform"
                        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        ▾
                      </span>
                    </button>

                    {/* Subcategories */}
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 flex flex-col gap-2 border-t border-[#2e3329]">
                        {cat.types.map(({ id, label, desc }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => {
                              setBusiness(id);
                              setOpenCategory(null);
                            }}
                            className="rounded-lg border px-4 py-3 text-left flex items-start justify-between gap-3 transition-all cursor-pointer"
                            style={{
                              borderColor: business === id ? "#3f4e40" : "#2e3329",
                              background:  business === id ? "#1a1f18" : "transparent",
                            }}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium text-[#b5b99f]">{label}</span>
                              <span className="text-xs text-[#7a7f6a]">{desc}</span>
                            </div>
                            {business === id && (
                              <span className="text-[#3f4e40] text-sm shrink-0 mt-0.5">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              disabled={!description.trim() || !business}
              onClick={() => setStep(2)}
              className="h-11 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 disabled:opacity-30 cursor-pointer"
            >
              Continue →
            </button>
          </div>
        )}

        {/* ── Step 2: Tech stack + what you handle ── */}
        {step === 2 && (
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Step 2 of {totalSteps}</p>
              <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "MomoTrust, serif" }}>
                What tools do you use?
              </h1>
              <p className="text-sm text-[#7a7f6a]">Your tech stack affects your compliance obligations directly.</p>
            </div>

            <div className="flex flex-col gap-6 w-full">
              {Object.entries(TECH_STACK).map(([category, tools]) => (
                <div key={category} className="flex flex-col gap-3">
                  <p className="text-xs text-[#7a7f6a] uppercase tracking-widest">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {tools.map(({ id, label }) => (
                      <Chip
                        key={id}
                        label={label}
                        selected={techStack.includes(id)}
                        onClick={() => toggle(techStack, setTechStack, id)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-3">
                <p className="text-xs text-[#7a7f6a] uppercase tracking-widest">What your product handles</p>
                <div className="flex flex-wrap gap-2">
                  {HANDLES.map(({ id, label }) => (
                    <Chip
                      key={id}
                      label={label}
                      selected={handles.includes(id)}
                      onClick={() => toggle(handles, setHandles, id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="h-11 px-6 rounded-lg border border-[#2e3329] text-sm text-[#7a7f6a] hover:border-[#3f4e40] cursor-pointer">← Back</button>
              <button onClick={() => setStep(3)} className="h-11 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 cursor-pointer">Continue →</button>
            </div>
          </div>
        )}

        {/* ── Step 3: Country + stage ── */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Step 3 of {totalSteps}</p>
              <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "MomoTrust, serif" }}>
                Where are you based?
              </h1>
              <p className="text-sm text-[#7a7f6a]">Regulations are implemented differently across EU member states.</p>
            </div>

            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-3">
                <p className="text-xs text-[#7a7f6a] uppercase tracking-widest">Country</p>
                <div className="flex flex-wrap gap-2">
                  {COUNTRIES.map((c) => (
                    <Chip key={c} label={c} selected={country === c} onClick={() => setCountry(c)} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs text-[#7a7f6a] uppercase tracking-widest">Stage</p>
                <div className="grid grid-cols-2 gap-3">
                  {STAGES.map(({ id, label, desc }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setStage(id)}
                      className="rounded-xl border p-4 text-left flex flex-col gap-1 transition-all cursor-pointer"
                      style={{
                        borderColor: stage === id ? "#3f4e40" : "#2e3329",
                        background:  stage === id ? "#222720" : "transparent",
                      }}
                    >
                      <span className="text-sm font-medium text-[#b5b99f]">{label}</span>
                      <span className="text-xs text-[#7a7f6a]">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="h-11 px-6 rounded-lg border border-[#2e3329] text-sm text-[#7a7f6a] hover:border-[#3f4e40] cursor-pointer">← Back</button>
              <button
                disabled={!country || !stage}
                onClick={() => setStep(4)}
                className="h-11 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 disabled:opacity-30 cursor-pointer"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: What you have + generate ── */}
        {step === 4 && (
          <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Step 4 of {totalSteps}</p>
              <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "MomoTrust, serif" }}>
                What do you already have?
              </h1>
              <p className="text-sm text-[#7a7f6a]">We&apos;ll factor this into your action plan.</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center w-full">
              {HAS_IN_PLACE.map(({ id, label }) => (
                <Chip
                  key={id}
                  label={label}
                  selected={hasInPlace.includes(id)}
                  onClick={() => toggle(hasInPlace, setHasInPlace, id)}
                />
              ))}
              <Chip
                label="Nothing yet"
                selected={hasInPlace.length === 0}
                onClick={() => setHasInPlace([])}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 text-center">{error}</p>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(3)} className="h-11 px-6 rounded-lg border border-[#2e3329] text-sm text-[#7a7f6a] hover:border-[#3f4e40] cursor-pointer">← Back</button>
              <button
                onClick={generate}
                className="h-11 px-8 rounded-lg bg-[#3f4e40] text-[#b5b99f] text-sm font-medium hover:opacity-90 cursor-pointer"
              >
                Generate my compliance report →
              </button>
            </div>
          </div>
        )}

        {/* ── Step 5: Loading / Results ── */}
        {step === 5 && (
          <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            {loading ? (
              <>
                <div className="flex flex-col items-center gap-3 text-center">
                  <p className="text-[11px] text-[#3f4e40] uppercase tracking-widest">Analysing your setup</p>
                  <h1 className="text-2xl" style={{ fontFamily: "MomoTrust, serif" }}>
                    Generating your compliance report…
                  </h1>
                  <p className="text-xs text-[#7a7f6a]">This takes 10–20 seconds.</p>
                </div>
                <Skeleton />
              </>
            ) : report ? (
              <ReportView report={report} onEdit={reset} />
            ) : null}
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
