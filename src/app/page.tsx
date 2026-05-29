"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, BrainCircuit, Command, LineChart, Sparkles, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border/40 bg-background/60 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-r from-primary to-blue-400 p-1">
              <Logo className="h-8 w-8" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-extrabold tracking-tight">Nexus AI Ops</div>
              <div className="text-xs text-muted-foreground">Startup Intelligence • Demo</div>
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#copilot" className="hover:text-foreground transition-colors">AI Copilot</Link>
          <Link href="#showcase" className="hover:text-foreground transition-colors">Showcase</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Story</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="h-9 gap-2 rounded-full px-4">Enter Demo <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-[#081026]/60 to-transparent border-b border-border/30 py-2">
          <div className="container mx-auto px-4 text-sm text-muted-foreground flex items-center justify-center">Demo Intelligence Environment — curated scenarios for portfolio showcase</div>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden pt-12 md:pt-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-muted/30 px-3 py-1 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    Demo-ready • Portfolio Showcase
                  </div>

                  <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                    Nexus AI Ops — Studio for Startup Intelligence
                  </h1>

                  <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
                    A premium demo experience that surfaces revenue signals, retention alarms, and AI‑driven opportunities — built for portfolio impact.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/dashboard">
                      <Button size="lg" className="h-12 gap-2 rounded-full px-6">Open Demo <ArrowRight className="h-4 w-4" /></Button>
                    </Link>
                    <a href="#showcase" className="inline-flex items-center rounded-full bg-muted/20 px-5 py-3 text-sm font-medium">View Showcase</a>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative rounded-2xl border border-border/40 bg-card p-4 shadow-2xl">
                  <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border/50 bg-muted/10">
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <BarChart3 className="mx-auto h-12 w-12 opacity-70" />
                        <div className="mt-3 text-sm">Live demo preview — interactive charts, AI insights, scenario switcher</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">What it does — at a glance</h2>
            <p className="mt-3 text-muted-foreground">Concise capabilities that impress stakeholders and explain design choices.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Autonomous Insights", desc: "AI surface-level opportunities and risks with human-readable explainers.", icon: BrainCircuit },
              { title: "Real-time Telemetry", desc: "Second-by-second visualizations and subtle animations for presentation clarity.", icon: Zap },
              { title: "Command Studio", desc: "Palette-driven micro-actions for demo scenarios and persona storytelling.", icon: Command },
            ].map((f, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 transition-colors hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-400 mb-6 text-white">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Copilot Showcase */}
        <section id="copilot" className="container mx-auto px-4 py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold">AI Copilot — Startups get recommendations</h3>
              <p className="mt-3 text-muted-foreground">A conversational overlay that suggests high-impact actions and writes human‑friendly summaries for stakeholders.</p>

              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                  <div className="text-sm font-semibold">Upsell Opportunity</div>
                  <div className="mt-1 text-muted-foreground text-sm">28 mid-tier customers show enterprise-like usage. Suggested campaign could increase MRR by ~$14k.</div>
                </div>

                <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                  <div className="text-sm font-semibold">Retention Alert</div>
                  <div className="mt-1 text-muted-foreground text-sm">Cohort 2024‑Q3 login frequency dropped 18% in two weeks. Recommend re-engagement flow.</div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-gradient-to-r from-primary to-blue-400" />
                    <div>
                      <div className="font-semibold">Nexus Copilot</div>
                      <div className="text-sm text-muted-foreground">AI assistant • explainers • one-click actions</div>
                    </div>
                  </div>
                  <Button variant="outline">Open</Button>
                </div>

                <div className="mt-6 rounded-md bg-muted/5 p-4 text-sm text-muted-foreground">"Summarize last 30 days revenue and flag anomalies" → <span className="font-medium text-foreground">Done: Revenue anomaly in Nov projected +25%</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase (scenarios placeholder) */}
        <section id="showcase" className="container mx-auto px-4 py-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Showcase Scenarios</h2>
            <p className="mt-3 text-muted-foreground">Switch between curated startup stories to see the product in action.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { title: 'Hyper-growth', desc: 'Growing ARR, scaling ops', color: 'from-primary to-blue-400' },
              { title: 'Retention Crisis', desc: 'Dropping weekly active users', color: 'from-red-500 to-pink-400' },
              { title: 'Revenue Anomaly', desc: 'Sudden spike or drop', color: 'from-yellow-400 to-orange-400' },
              { title: 'Acquisition Spike', desc: 'Marketing channel success', color: 'from-green-400 to-teal-400' },
            ].map((s, i) => (
              <div key={i} className="group rounded-2xl border border-border/40 p-6 text-center hover:shadow-xl">
                <div className={`mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr ${s.color} text-white`}>
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="mt-4 font-semibold">{s.title}</h4>
                <div className="mt-2 text-sm text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer / CTA */}
        <section className="border-t border-border/40 bg-muted/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold">Make your portfolio pop</h3>
            <p className="mt-2 text-muted-foreground">Open the demo and walk visitors through curated scenarios for maximum impression.</p>
            <div className="mt-6 flex justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 gap-2 rounded-full px-8">Try Demo • Nexus AI Ops</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
