# Nexus AI Ops

A portfolio-grade SaaS analytics dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS 4**, and **Gemini AI**. Designed to demonstrate production-quality frontend architecture, real-time data visualization, and integrated AI capabilities — with zero environment variables required to run the demo.

---

## Features

- **5 curated startup scenarios** — switch between Baseline, Hyper-growth, Retention Crisis, Revenue Anomaly, and Acquisition Spike; all charts, KPIs, and AI responses update live
- **Scenario-aware AI chat** — streaming Gemini AI assistant understands the active scenario's metrics and responds with context-appropriate analysis; quick-prompt chips update per scenario
- **Floating AI Copilot** — persistent assistant overlay accessible from any dashboard page
- **Embedded AI Chat** — full inline chat panel on the AI Insights page
- **Guided onboarding tour** — 3-step walkthrough with localStorage persistence
- **Live operations stream** — real-time activity feed, ingestion monitor, and metric stream
- **Boardroom-ready reports** — PDF export links, executive summaries, report history
- **Command palette** — `⌘K` search for fast navigation
- **Dark / light mode** — full theme support
- **Zero-config demo** — everything works without Supabase, Gemini API key, or any backend

---

## AI Capabilities

The AI layer uses **Google Gemini 1.5 Flash** and surfaces on two panels:

### Floating AI Copilot
Accessible via the purple button (bottom-right) on any dashboard page.
- Streaming token-by-token responses
- Receives the active scenario's revenue, acquisition, and retention data as context
- Quick-prompt chips change per scenario (e.g. *"Why is retention dropping?"* on Retention Crisis)
- Chat resets with a scenario-specific greeting on scenario switch
- Clear-chat button for clean demo walkthroughs

### Embedded AI Chat (AI Insights page)
- Full-width inline chat next to the autonomous AI Analysis Panel
- Same streaming and scenario-awareness as the copilot

### Offline / demo mode
Without a `GEMINI_API_KEY`, the AI returns scenario-specific mock streaming responses — the demo still feels live and interactive.

---

## Scenario System

Five startup stories that alter the live dashboard data end-to-end:

| Scenario | Story | What changes |
|----------|-------|-------------|
| **Baseline** | Healthy startup, normal growth | Default metrics |
| **Hyper-growth** | Explosive MRR, scaling ops | Revenue +35%, paid acquisition +60% |
| **Retention Crisis** | Dropping WAU, cohort churn | Retention drops 20 pts after week 7 |
| **Revenue Anomaly** | Spike or drop in November | November revenue +60% (unexplained) |
| **Acquisition Spike** | Marketing channel success | Wednesday paid acquisition ×3 |

Switching scenarios updates: KPI cards, charts, AI copilot greeting, quick-prompt chips, and all AI responses.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS 4, `class-variance-authority` |
| UI Components | Shadcn/UI (Base UI primitives) |
| Charts | Recharts |
| Animations | Framer Motion |
| AI | Google Gemini 1.5 Flash |
| Auth (optional) | Supabase Auth |
| Database (optional) | Supabase PostgreSQL |
| Fonts | Geist Sans + Geist Mono |
| Theme | `next-themes` |

---

## Installation

```bash
git clone https://github.com/yourusername/nexus-ai-ops.git
cd nexus-ai-ops
npm install
```

---

## Running Locally

### Demo mode (no API keys needed)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). All 5 scenarios, the AI chat, guided tour, and every dashboard page work without any configuration.

### With live Gemini AI

Create `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com).

### With Supabase (optional)

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Without Supabase, demo auth accepts any email/password.

---

## Project Structure

```
src/
├── app/
│   ├── (app)/              # Protected dashboard routes
│   │   ├── dashboard/      # Command Center (main view)
│   │   ├── analytics/      # Revenue + acquisition charts
│   │   ├── ai-insights/    # AI chat + saved intelligence
│   │   ├── reports/        # Report history + executive summary
│   │   └── settings/       # Workspace settings
│   ├── auth/               # Login + signup
│   ├── api/
│   │   ├── ai/chat/        # Streaming Gemini chat endpoint
│   │   ├── ai/insights/    # AI analysis generation
│   │   └── analytics/      # Analytics ingestion
│   └── page.tsx            # Landing page
│
├── components/
│   ├── dashboard/
│   │   ├── ai-copilot-panel.tsx    # Floating AI chat overlay
│   │   ├── ai-chat-section.tsx     # Embedded AI chat
│   │   ├── command-center.tsx      # Main dashboard layout
│   │   ├── kpi-card.tsx            # Metric cards
│   │   └── ...                     # Charts, panels, feeds
│   ├── layout/             # Shell, navbar, sidebar
│   ├── onboarding/         # Guided tour wizard
│   └── ui/                 # Shadcn primitives
│
├── providers/
│   ├── demo-scenario-provider.tsx  # Scenario state + data transforms
│   └── demo-auth-provider.tsx      # Demo auth (no Supabase needed)
│
├── lib/
│   ├── gemini/             # Gemini AI client
│   ├── prompts/            # System prompts + context builders
│   ├── saas/               # Mock data + server utilities
│   └── ops/                # Rate limiting, logging, env validation
│
└── data/
    └── mock-analytics.ts   # Base dataset (transformed per scenario)
```

---

## Screenshot Plan

Recommended screenshots for portfolio / README:

| Filename | What to capture |
|----------|----------------|
| `dashboard-overview.png` | Dashboard / Command Center — KPI cards, scenario switcher, live ops stream |
| `retention-crisis.png` | Switch to Retention Crisis — charts shifted, AI alerts showing crisis signals |
| `ai-insights-chat.png` | AI Insights page — embedded chat and AI analysis panel side-by-side |
| `ai-chat-response.png` | AI chat mid-conversation with a scenario-aware streaming response visible |
| `analytics-charts.png` | Analytics page — Revenue Growth and Customer Acquisition charts |
| `reports-page.png` | Reports page — board snapshot, MRR comparison, report history table |
| `login-page.png` | Auth page — split-panel login with feature callouts |

---

## Future Improvements

These were kept out of scope for the demo but represent natural next steps:

- **Real Supabase integration** — wire up auth and schema for persistent sessions
- **Chat history persistence** — store conversation threads per workspace
- **Live data ingestion** — connect `/api/analytics/ingest` to Segment or PostHog
- **Custom scenarios** — user-defined scenario parameters
- **Real PDF exports** — generate boardroom PDFs from snapshot data
- **Team collaboration** — shared workspaces with role-based views
- **Webhook alerts** — Slack/email when AI flags a critical risk

---

## License

MIT
