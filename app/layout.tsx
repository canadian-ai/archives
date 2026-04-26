import React from "react";
import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});
export const metadata: Metadata = {
    title: "Canadian AI Magazine Archives",
    description: "A historical archive preserving Canadian AI magazine issues and research.",
    keywords: ['Canadian AI', 'artificial intelligence', 'AI history', 'CAIAC', 'machine learning', 'neural networks', 'expert systems', '1980s AI'],
    authors: [{ name: 'Canadian Artificial Intelligence Association (CAIAC)' }],
    generator: 'v0.app',
    metadataBase: new URL("https://archives.canadian-ai.ca"),
    openGraph: {
        type: "website",
        siteName: "Canadian AI Magazine Archives",
        title: "Canadian AI Magazine Archives",
        description: "A historical archive preserving Canadian AI magazine issues and research.",
        url: "https://archives.canadian-ai.ca",
        images: [{
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Canadian AI Magazine Archives"
            }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Canadian AI Magazine Archives",
        description: "A historical archive preserving Canadian AI magazine issues and research.",
        images: ["/twitter-image.png"]
    },
    icons: {
        icon: [{
                url: "/icon-16x16.png",
                sizes: "16x16",
                type: "image/png"
            }, {
                url: "/icon-32x32.png",
                sizes: "32x32",
                type: "image/png"
            }, {
                url: "/icon-48x48.png",
                sizes: "48x48",
                type: "image/png"
            }, { url: "/icon.svg", type: "image/svg+xml" }],
        apple: "/apple-icon.png",
        shortcut: "/favicon.ico"
    }
};
export const viewport: Viewport = {
    themeColor: '#0a1628',
    colorScheme: 'dark',
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>);
}
