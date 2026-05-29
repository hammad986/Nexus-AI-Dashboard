"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, BrainCircuit, Command, LineChart, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border/40 bg-background/60 px-6 backdrop-blur-xl transition-all">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BrainCircuit className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Nexus AI Ops</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#intelligence" className="hover:text-foreground transition-colors">Intelligence</Link>
          <Link href="#showcase" className="hover:text-foreground transition-colors">Showcase</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button className="h-9 gap-2 rounded-full px-4">
              Enter Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/50 px-3 py-1 text-sm font-medium backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Introducing Nexus Engine 2.0</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              The Operations Platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Hyper-Growth</span> Startups.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              Instantly monitor revenue, predict churn, and act on AI-driven insights. 
              Nexus connects directly to your data streams to act as your autonomous operational analyst.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/dashboard">
                <Button size="lg" className="h-12 gap-2 rounded-full px-8 text-base">
                  Launch Live Demo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#architecture">
                <Button size="lg" variant="outline" className="h-12 rounded-full px-8 text-base">
                  View Architecture
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Product Preview Glow / Shadow */}
          <div className="relative mx-auto mt-20 max-w-[80vw] md:max-w-6xl">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary/20 via-primary/5 to-blue-500/20 opacity-50 blur-3xl" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative rounded-2xl border border-border/40 bg-background/50 p-2 shadow-2xl backdrop-blur-sm"
            >
              <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border/50 bg-muted/20 relative flex items-center justify-center">
                 <div className="text-center text-muted-foreground flex flex-col items-center gap-4">
                    <BarChart3 className="h-16 w-16 opacity-50" />
                    <p>Interactive Demo Environment Available</p>
                    <Link href="/dashboard">
                      <Button variant="secondary" className="shadow-lg">Enter Dashboard</Button>
                    </Link>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature grid */}
        <section id="features" className="container mx-auto px-4 py-32">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Everything you need to orchestrate scale.</h2>
            <p className="mt-4 text-muted-foreground">Purpose-built for modern operators who refuse to navigate complex BI tools.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Autonomous Insights", desc: "Our AI Engine constantly scans your metrics for anomalies and retention risks.", icon: BrainCircuit },
              { title: "Real-time Telemetry", desc: "Connects to your streams to provide second-by-second analytics updates.", icon: Zap },
              { title: "Command & Control", desc: "Take action securely from an enterprise-grade command palette.", icon: Command },
            ].map((f, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 transition-colors hover:bg-muted/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-muted/20 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex justify-center items-center gap-2 mb-4">
            <BrainCircuit className="h-5 w-5" />
            <span className="font-bold">Nexus AI Ops</span>
          </div>
          <p className="text-sm">A portfolio showcase project. Not a real SaaS product.</p>
        </div>
      </footer>
    </div>
  )
}
