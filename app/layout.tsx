import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl = "https://archives.canadian-ai.ca";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Archives | Canadian AI Solutions",
  description:
    "A Canadian AI Solutions history project that indexes selected Canadian Artificial Intelligence magazine issues from CAIAC's official archive and explains their place in Canada's AI history.",
  applicationName: "Canadian AI Archives",
  authors: [{ name: "Canadian AI Solutions Inc.", url: "https://www.canadian-ai.ca" }],
  creator: "Canadian AI Solutions Inc.",
  publisher: "Canadian AI Solutions Inc.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Canadian AI Archives",
    title: "Archives | Canadian AI Solutions",
    description:
      "A Canadian AI Solutions history project linking to selected issues in CAIAC's official Canadian AI magazine archive.",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Canadian AI Archives by Canadian AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archives | Canadian AI Solutions",
    description:
      "A Canadian AI Solutions history project linking to selected issues in CAIAC's official archive.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
