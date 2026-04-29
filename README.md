# Ingram Micro — AWS Partner Transformation Platform (MVP)

> An AI-powered ecosystem portal that digitizes partner assessment, funding optimization, and intelligent lead matching for the Canadian AWS Partner Network.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange?logo=google)

---

## Overview

The **Partner Transformation Platform** replaces spreadsheet-based partner management with an intelligence-driven portal. It serves two audiences:

- **AWS Partners** — Get scored on technical maturity, simulate AWS funding eligibility, and receive AI-driven practice consulting tailored to their exact capabilities.
- **Ingram Micro Admins** — View the entire partner ecosystem, bulk-import leads from CSV, and use Generative AI to match opportunities to the best-fit partner based on competency, geography, and track record.

### Key Capabilities

| Feature | Description |
|---|---|
| **Partner Scorecard** | 360° maturity assessment across Capability, Capacity, AI Readiness, and Growth |
| **Funding Calculator** | Instant MAP/OLA/POC funding estimates based on partner tier and project type |
| **AI Practice Consultant** | Context-aware chatbot that knows the partner's exact scorecard and gaps |
| **Bulk Lead Ingestion** | CSV import with automatic parsing and partner pre-assignment detection |
| **AI Opportunity Matcher** | Generative AI ranks top 3 partner matches per lead with confidence scores |
| **Pipeline Governance** | End-to-end deal tracking from assignment through close |

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ (or [Bun](https://bun.sh/))
- A [Google Gemini API Key](https://aistudio.google.com/apikey) (for AI features)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/ashaw-studio/Partner-Scorecard-MVP.git
cd Partner-Scorecard-MVP

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The AI Consultant and Opportunity Matcher require a valid Gemini API key. Without it, the app falls back to mock responses gracefully.

---

## Demo Walkthrough

The app ships with **7 pre-seeded Canadian AWS partners** and sample lead data for a complete demo experience.

### Phase 1 — The Partner Experience

1. Select **"Partner Portal"** from the login screen
2. Click **"Show Demo Users"** → select **Adastra Corporation**
3. Explore the **Executive Scorecard** (scores, radar chart, certifications)
4. Try the **Funding Calculator** — select Migration, enter $500K ARR
5. Ask the **AI Consultant**: *"How can I increase my AI readiness score?"*

### Phase 2 — The Admin Experience

1. Log out → select **"Ingram Micro Admin"**
2. Browse the **Portfolio** — filter by Track, search by name
3. Go to **Bulk Import** → click **"Load Live Sample"** → process the CSV
4. Switch to **Matcher** → watch AI analyze and rank partner matches
5. **Approve matches** → verify in the **Pipeline** view

### Phase 3 — Closing the Loop

1. Log back in as the partner who received a lead
2. Update the opportunity stage to **"Closed Won"**
3. Switch to Admin → confirm the deal shows as won in the Pipeline

---

## Architecture

```
├── App.tsx                    # Root component, routing & state management
├── components/
│   ├── AdminDashboard.tsx     # Admin: portfolio, CSV import, AI matcher, pipeline
│   ├── Dashboard.tsx          # Partner: scorecard, funding calc, opportunities
│   ├── IntakeWizard.tsx       # Multi-step partner assessment form
│   ├── ChatBot.tsx            # AI Practice Consultant (Gemini-powered)
│   ├── PartnerLogin.tsx       # Partner authentication
│   ├── Presentation.tsx       # Executive presentation mode
│   ├── DemoCopilot.tsx        # Guided demo overlay
│   ├── DemoNavigation.tsx     # Presentation sidebar navigation
│   └── AIUnderTheHood.tsx     # AI logic inspector panel
├── services/
│   ├── dbService.ts           # LocalStorage-based data persistence
│   ├── geminiService.ts       # Google Gemini AI integration
│   ├── seedData.ts            # 7 pre-configured pilot partners
│   └── sampleLeads.ts        # Demo & live CSV lead datasets
├── types.ts                   # TypeScript interfaces & constants
├── server.ts                  # Express + Vite dev server
└── vite.config.ts             # Build configuration
```

### Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Build:** Vite 6
- **Charts:** Recharts
- **AI:** Google Gemini (`gemini-3-flash-preview`) via `@google/genai`
- **Data:** LocalStorage (simulated NoSQL — production would use Postgres/DynamoDB)
- **Server:** Express 5 (dev middleware)

---

## Scoring Engine

Partners are evaluated across three vectors (0–100 each):

| Score | Inputs | Weight Factors |
|---|---|---|
| **Capability** | AWS Competencies, SDPs, Public Sector status | Competencies ×5, SDPs ×3, PubSec +10 |
| **Capacity** | Technical team size, certifications | Team size bands mapped to score tiers |
| **AI Readiness** | 19-dimension maturity matrix (0–5 scale) | Average across all dimensions, normalized to 100 |

Partners are classified into **Tracks**:
- **Track A (Foundational)** — Starting point, limited delivery experience
- **Track B (Growth)** — 1+ competency or SDP with validated references
- **Track C (Strategic)** — 2+ competencies, 5+ engineers, SDP active

---

## AI Integration

### Partner-Facing: Practice Consultant
The chatbot receives the partner's full scorecard as system context, enabling responses like:
> *"Your capacity score is 80 but capability is only 30. Focus on acquiring the AWS Migration Competency — here's a 90-day path."*

### Admin-Facing: Opportunity Matcher
For each unassigned lead, the AI evaluates all partners using weighted criteria:
- **40%** Capability alignment (competencies vs. workload)
- **20%** Track maturity (complex deals → Track B/C only)
- **15%** Geographic proximity
- **10%** Industry vertical overlap

Returns top 3 matches with confidence scores and reasoning.

---

## Roadmap to Production

| Area | Current (MVP) | Target |
|---|---|---|
| **Data** | LocalStorage | PostgreSQL with JSONB columns |
| **Auth** | Simulated | AWS Cognito / SSO |
| **AI Backend** | Client-side API calls | Serverless edge functions (API key server-side) |
| **Hosting** | Local dev server | Vercel / AWS Amplify |

---

## License

Internal use only — Ingram Micro confidential.
