import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://regulus.eu"),
  title: "Regulus — AI Compliance for EU Fintechs",
  description:
    "One AI dashboard for all EU fintech regulations. MiCA, PSD2, DORA, GDPR, AML — tracked, simplified, and acted on. Join the waitlist.",
  openGraph: {
    title: "Regulus — AI Compliance for EU Fintechs",
    description:
      "One AI dashboard for all EU fintech regulations. MiCA, PSD2, DORA, GDPR, AML — tracked, simplified, and acted on.",
    siteName: "Regulus",
    type: "website",
    url: "https://regulus.eu",
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
    title: "Regulus — AI Compliance for EU Fintechs",
    description:
      "One AI dashboard for all EU fintech regulations. MiCA, PSD2, DORA, GDPR, AML — tracked, simplified, and acted on.",
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
