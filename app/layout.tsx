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
  openGraph: {
    title: 'Canadian AI Magazine Archives',
    description: 'Explore 29 historical issues of Canadian AI Magazine (1984-1992)',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
