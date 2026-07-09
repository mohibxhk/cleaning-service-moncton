import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ChatAssistant } from "@/components/chat-assistant";
import { FloatingCta } from "@/components/floating-cta";
import { CookieConsent } from "@/components/cookie-consent";
import { JsonLd, localBusinessSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Residential & Commercial Cleaning`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cleaning service Moncton",
    "house cleaning Moncton NB",
    "commercial cleaning Moncton",
    "office cleaning Dieppe",
    "move out cleaning Riverview",
    "cleaning products supplier Moncton",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08332F" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ChatAssistant />
        <FloatingCta />
        <CookieConsent />
      </body>
    </html>
  );
}
