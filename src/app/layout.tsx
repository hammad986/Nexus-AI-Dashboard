import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    default: "Nexus AI Ops",
    template: "%s | Nexus AI Ops",
  },
  description:
    "Portfolio demo: AI-powered SaaS analytics dashboard with scenario switching, streaming AI chat, and real-time startup telemetry. Built with Next.js 15, TypeScript, and Gemini AI.",
  keywords: [
    "SaaS analytics",
    "AI dashboard",
    "Next.js 15",
    "portfolio",
    "startup intelligence",
    "Gemini AI",
    "TypeScript",
  ],
  authors: [{ name: "Nexus AI Ops" }],
  openGraph: {
    title: "Nexus AI Ops — Startup Intelligence Platform",
    description:
      "AI-powered SaaS analytics with 5 curated startup scenarios, streaming AI chat, and real-time telemetry. A portfolio-grade Next.js 15 demo.",
    type: "website",
    siteName: "Nexus AI Ops",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus AI Ops — Startup Intelligence Platform",
    description:
      "AI-powered SaaS analytics with 5 curated startup scenarios, streaming AI chat, and real-time telemetry.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
