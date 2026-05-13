import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://regulusgroup.eu"),
  title: "Regulus — EU Compliance for AI Companies",
  description:
    "If you use AI and hold EU client data, you have overlapping GDPR, EU AI Act, and NIS2 obligations. Regulus maps them, tracks them, and tells you exactly what to do.",
  openGraph: {
    title: "Regulus — EU Compliance for AI Companies",
    description:
      "GDPR. EU AI Act. NIS2. DORA. AML. One AI dashboard maps every regulation that applies to your business — tracked, simplified, and acted on.",
    siteName: "Regulus",
    type: "website",
    url: "https://regulusgroup.eu",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Regulus — AI Compliance for EU Fintechs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulus — EU Compliance for AI Companies",
    description:
      "GDPR. EU AI Act. NIS2. DORA. AML. One AI dashboard maps every regulation that applies to your business — tracked, simplified, and acted on.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
