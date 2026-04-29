# Ingram Micro — Partner Intelligence Platform (MVP)

> An AI-powered ecosystem portal that digitizes partner assessment, funding optimization, and intelligent lead matching — starting with the AWS partner network in Canada as the pilot market.

**🔗 Live Demo: [partner-scorecard-mvp.vercel.app](https://partner-scorecard-mvp.vercel.app)**

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google)

---

## The Problem

Managing a global partner ecosystem today is manual, spreadsheet-heavy, and unscalable:

- **No visibility** into partner technical maturity across regions
- **Missed funding** — partners don't know what they qualify for
- **Slow lead routing** — matching opportunities to the right partner takes hours of manual analysis
- **No data-driven decisions** — partner enablement is relationship-based, not evidence-based

## The Solution

This platform digitizes the entire partner lifecycle into a single intelligence layer:

| Capability | What It Does | Business Impact |
|---|---|---|
| **Partner Scorecard** | 360° maturity assessment across Capability, Capacity, AI Readiness | Replace subjective assessments with data |
| **Funding Calculator** | Instant funding estimates (MAP, OLA, POC, MDF) based on partner tier | Accelerate deal velocity — partners close faster |
| **AI Practice Consultant** | Context-aware chatbot that knows each partner's exact gaps | 24/7 enablement at scale, no PDM bottleneck |
| **Bulk Lead Ingestion** | CSV import with automatic parsing and partner detection | Minutes instead of days for event lead processing |
| **AI Opportunity Matcher** | GenAI ranks top 3 partner matches per lead with confidence scores | Higher win rates through data-driven routing |
| **Pipeline Governance** | End-to-end deal tracking from assignment through close | Full visibility across the ecosystem |

### Why This Matters at Scale

The pilot covers **7 AWS partners in Canada**. The architecture is designed to extend to:
- **Multi-cloud** — Azure, GCP partner programs with the same scoring framework
- **Global markets** — Swap province data for country/region, same engine
- **Thousands of partners** — LocalStorage demo → production database is a config change

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Google Gemini API Key](https://aistudio.google.com/apikey) (optional — AI features fall back gracefully without it)

### Setup

```bash
# Clone the repository
git clone https://github.com/ashaw-studio/Partner-Scorecard-MVP.git
cd Partner-Scorecard-MVP

# Install dependencies
npm install

# Configure environment (optional, for AI features)
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

> Without a Gemini API key, the AI Consultant and Opportunity Matcher use intelligent fallback responses. All other features work fully.

---

## Demo Walkthrough (10 minutes)

The app ships with **7 pre-seeded partners** and sample lead data for a complete end-to-end demo.

### Phase 1 — Partner Experience (The Value We Deliver *To* Partners)

1. Select **"Partner Portal"** → click **"Show Demo Users"** → choose **Adastra Corporation**
2. **Executive Scorecard** — see their 360° maturity view (radar chart, certifications, AI readiness)
3. **Funding Calculator** — select Migration workload, enter $500K ARR → instant funding breakdown
4. **AI Consultant** — ask: *"How can I increase my AI readiness score?"* → watch the AI reference their specific gaps

### Phase 2 — Admin Experience (How Ingram Manages at Scale)

1. Log out → select **"Ingram Micro Admin"**
2. **Portfolio** — browse all partners, filter by Track (A/B/C), search by name
3. **Bulk Import** → click **"Load Live Sample"** → process the CSV → leads auto-distributed
4. **AI Matcher** → watch GenAI analyze each unassigned lead and rank partner matches
5. **Approve matches** → verify in the **Pipeline** view

### Phase 3 — Closing the Loop

1. Log back in as the partner who received a lead
2. Update the opportunity to **"Closed Won"**
3. Switch to Admin → the deal shows as won in the master Pipeline

*This demonstrates the complete data flow: Lead → AI Match → Partner Assignment → Deal Close → Admin Visibility.*

---

## Architecture

```
├── App.tsx                    # Root SPA — routing & state management
├── components/
│   ├── AdminDashboard.tsx     # Portfolio, CSV import, AI matcher, pipeline
│   ├── Dashboard.tsx          # Partner scorecard, funding calc, opportunities
│   ├── IntakeWizard.tsx       # Multi-step partner assessment (50+ data points)
│   ├── ChatBot.tsx            # AI Practice Consultant (Gemini-powered)
│   ├── PartnerLogin.tsx       # Partner authentication
│   └── Presentation.tsx       # Executive presentation mode (built-in)
├── services/
│   ├── dbService.ts           # Data persistence layer (LocalStorage → DB ready)
│   ├── geminiService.ts       # Google Gemini AI integration
│   ├── seedData.ts            # 7 pilot partner profiles
│   └── sampleLeads.ts        # Demo lead datasets
├── types.ts                   # TypeScript interfaces & constants
├── server.ts                  # Express + Vite dev server
└── vite.config.ts             # Build configuration
```

### Tech Stack

| Layer | Technology | Production Path |
|---|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS | Same |
| **Build** | Vite 6 | Same |
| **Charts** | Recharts | Same |
| **AI** | Google Gemini (`gemini-3-flash-preview`) | Move to server-side edge function |
| **Data** | LocalStorage (simulated) | PostgreSQL / DynamoDB |
| **Auth** | Simulated RBAC | AWS Cognito / SSO |

---

## How the Scoring Works

Partners are evaluated across three vectors (0–100 each):

| Score | What It Measures | How It's Calculated |
|---|---|---|
| **Capability** | Technical depth & certifications | Competencies ×5 + SDPs ×3 + PubSec bonus |
| **Capacity** | Ability to execute at scale | Team size bands → score tiers |
| **AI Readiness** | GenAI maturity | 19-dimension matrix (0–5), normalized to 100 |

Partners are classified into **Tracks**:
- **Track A (Foundational)** — New to the ecosystem, needs playbooks and co-sell structure
- **Track B (Growth)** — Has competencies, needs to accelerate funding and joint GTM
- **Track C (Strategic)** — Elite tier, prioritize for strategic accounts and co-investment

### AI-Powered Matching

For each unassigned lead, the AI evaluates all partners:
- **40%** Capability alignment (do their competencies match the workload?)
- **20%** Track maturity (complex deals → Track B/C only)
- **15%** Geographic proximity
- **10%** Industry vertical overlap

Returns top 3 matches with confidence scores and plain-English reasoning.

---

## Roadmap: MVP → Production

| Area | Current (MVP) | Phase 1 | Phase 2 |
|---|---|---|---|
| **Data** | LocalStorage | PostgreSQL | Multi-region replication |
| **Auth** | Simulated | SSO / Cognito | RBAC with org hierarchy |
| **AI** | Client-side API | Serverless edge functions | Fine-tuned models on partner data |
| **Hosting** | Local dev | Vercel / Amplify | Enterprise cloud deployment |
| **Scope** | AWS Canada (7 partners) | AWS Global | Multi-cloud (Azure, GCP) |
| **Intake** | Manual wizard | API integration with vendor portals | Automated data sync |

---

## Built-In Presentation Mode

The app includes a **Presentation Mode** accessible from the login screen. It provides:
- Guided demo script with step-by-step narration
- Element highlighting for each feature being discussed
- Navigation sidebar for jumping between sections
- AI "Under the Hood" inspector showing how the matching engine works

Ideal for executive demos and stakeholder presentations.

---

## License

Ingram Micro — Internal use only. Confidential.
