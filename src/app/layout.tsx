import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthHashHandler } from '@/components/auth/hash-handler';

const SITE_NAME = 'MCP Beacon';
const SITE_DESCRIPTION = 'AI Agent Monitoring, Illuminated — Real-time observability, cost tracking, and smart alerts for your AI agent infrastructure.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mcpbeacon.asia';

export const viewport: Viewport = {
  themeColor: '#F97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  // ── Basic ──
  title: {
    default: `${SITE_NAME} — AI Agent Monitoring, Illuminated`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'MCP', 'AI Agent', 'monitoring', 'observability', 'cost tracking',
    'LLM', 'Model Context Protocol', 'agent analytics', 'AI infrastructure',
  ],
  authors: [{ name: 'MCP Beacon Team' }],
  creator: 'MCP Beacon',
  publisher: 'MCP Beacon',

  // ── Canonical & Alternates ──
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph ──
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI Agent Monitoring, Illuminated`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — AI Agent Monitoring Dashboard`,
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI Agent Monitoring, Illuminated`,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@mcpbeacon',
    site: '@mcpbeacon',
  },

  // ── Icons ──
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#F97316',
      },
    ],
  },

  // ── PWA / Manifest ──
  manifest: '/manifest.json',

  // ── App Links ──
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },

  // ── Other Meta ──
  category: 'technology',
  classification: 'SaaS',
  other: {
    'msapplication-TileColor': '#F97316',
    'msapplication-TileImage': '/icon-192x192.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for analytics (placeholder) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen">
        <AuthHashHandler />
        {children}
      </body>
    </html>
  );
}
