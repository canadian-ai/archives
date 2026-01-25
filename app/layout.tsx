import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
  title: 'Canadian AI Magazine Archives | Pioneering AI Research 1984-1992',
  description: 'Explore the historical archives of Canadian AI Magazine from 1984-1992. A digital collection preserving the early days of artificial intelligence research in Canada, featuring 29 original issues.',
  keywords: ['Canadian AI', 'artificial intelligence', 'AI history', 'CAIAC', 'machine learning', 'neural networks', 'expert systems', '1980s AI'],
  authors: [{ name: 'Canadian Artificial Intelligence Association (CAIAC)' }],
  generator: 'v0.app',
  metadataBase: new URL('https://archives.canadian-ai.ca'),
  openGraph: {
    title: 'Canadian AI Magazine Archives | Explore Decades of AI Research',
    description: 'Discover decades of Canadian AI research and publications. Access 29 historical issues from 1984-1992, preserving the pioneering era of artificial intelligence.',
    type: 'website',
    url: 'https://archives.canadian-ai.ca',
    siteName: 'Canadian AI Magazine Archives',
    images: [
      {
        url: '/social.png',
        width: 1024,
        height: 512,
        alt: 'Canadian AI Magazine Archives - Explore decades of AI research',
      },
    ],
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian AI Magazine Archives | Explore the Archives',
    description: 'Discover decades of Canadian AI research and publications. Visit archives.canadian-ai.ca',
    images: ['/social.png'],
    creator: '@CanadianAI',
    site: '@CanadianAI',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1628',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
