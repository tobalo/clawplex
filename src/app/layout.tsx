import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClawPlex | DFW OpenClaw",
  description:
    "The DFW home base for builders shipping AI projects, local-model experiments, and live demos. A community for you and your agent.",
  openGraph: {
    title: "ClawPlex | DFW OpenClaw",
    description:
      "The DFW home base for builders shipping AI projects. 100+ attendees. Live demos. No posture.",
    url: "https://clawplex.dev",
    siteName: "ClawPlex DFW",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawPlex | DFW OpenClaw",
    description:
      "The DFW home base for builders shipping AI projects. 100+ attendees. Live demos. No posture.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "ClawPlex DFW",
  description: "Dallas-Fort Worth community for AI builders, local LLMs, and practical AI.",
  url: "https://clawplex.dev",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "DFW Metroplex",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas-Fort Worth",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
  previousEvent: {
    "@type": "Event",
    name: "ClawCon DFW",
    startDate: "2026-03-24",
    attendance: {
      "@type": "Integer",
      value: 100,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-black">
        <div className="film-grain" />
        {children}
      </body>
    </html>
  );
}
