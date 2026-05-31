import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MCP Beacon — AI Agent Observability Platform",
    template: "%s | MCP Beacon",
  },
  description:
    "Monitor, alert, and optimize your AI agents. Real-time cost tracking, loop detection, and performance insights for OpenAI, Anthropic, and DeepSeek.",
  keywords: ["AI monitoring", "LLM observability", "agent tracking", "cost optimization", "loop detection"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mcpbeacon.dev",
    siteName: "MCP Beacon",
    title: "MCP Beacon — AI Agent Observability Platform",
    description:
      "Monitor, alert, and optimize your AI agents. Real-time cost tracking, loop detection, and performance insights.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCP Beacon — AI Agent Observability",
    description: "Monitor, alert, and optimize your AI agents.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-sans antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen",
        )}
      >
        {children}
      </body>
    </html>
  );
}
