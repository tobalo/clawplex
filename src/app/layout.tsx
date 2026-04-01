import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
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
  description:
    "Dallas-Fort Worth community for AI builders, local LLMs, and practical AI.",
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

// JSON-LD is static site metadata — not user-generated content
const jsonLdString = JSON.stringify(jsonLd);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body className="font-sans antialiased">
        <div className="film-grain" />
        {children}
      </body>
    </html>
  );
}
