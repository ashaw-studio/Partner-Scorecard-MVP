# Complete System & Product Specification: Ingram Micro AWS Ecosystem Portal
**Version:** 1.1.0 (Comprehensive Build)
**Scope:** Frontend Architecture, Simulated Backend, Data Algorithms, ML/AI Routing, UX/UI, and Business Process mapping.

---

## 1. Product & Business Perspective

### 1.1 Product Vision & North Star
The Ingram Micro AWS Ecosystem Portal serves as a "Digital Twin" for the entire Canadian AWS Partner Network managed by Ingram Micro. It replaces anecdotal, relationship-based enablement and spreadsheet-based lead routing with a deterministic, data-driven, and AI-powered engine. The goal is to:
1.  **Reduce Enablement Latency:** Cut the time a PDM (Partner Development Manager) spends analyzing a partner from hours to seconds.
2.  **Optimize Lead Matchmaking:** Route active opportunities deterministically based on empirical capability data, directly resulting in higher win rates.

### 1.2 User Personas & Journey Maps

#### Persona 1: The Managing Director (AWS Partner)
*   **Goal:** Maximize AWS relationship, achieve higher tier funding (MDF, MAP).
*   **Journey:**
    1.  **Auth & Entry:** Logs in via unique enterprise gateway.
    2.  **The Intake Evaluation (Audit):** Driven through a highly responsive 7-step React wizard (`IntakeWizard.tsx`), answering declarative capacity constraints and AI readiness matrices without leaving the UI.
    3.  **Real-Time Benchmarking:** Is presented instantly with a 360-degree `Dashboard.tsx` displaying Cap/Cap vectors.
    4.  **AI Consulting:** Interacts with `ChatBot.tsx`, asking "How do I reach Track C?" The AI, knowing their exact deficit (e.g., lack of DevOps competency), generates a tailored 60-day roadmap.

#### Persona 2: The Partner Development Manager / Admin (Ingram Micro)
*   **Goal:** Distribute ingested leads efficiently, monitor ecosystem health, identify macro capability gaps.
*   **Journey:**
    1.  **Auth Dash:** Enters `AdminDashboard.tsx`, bypassing normal user flows.
    2.  **Ecosystem Topography:** Views the grid of all active partners categorized by Track A/B/C.
    3.  **Lead Queuing:** Uploads CSV of raw Amazon Web Services ACE leads into the `UNASSIGNED_LEADS` pool.
    4.  **AI Matchmaking:** Iterates over the queue, triggering the Gemini `matchLeads()` function to receive an array of the top 3 optimal partners alongside risk blockers.

---

## 2. Technical Architecture & Component Tree

### 2.1 Core Frameworks & Tooling
*   **Core UI Library:** React v19.2 (Hooks, Functional Components, Strict Mode).
*   **Styling Engine:** Tailwind CSS via PostCSS.
*   **Build Bundler:** Vite v6.2 (Rollup under the hood).
*   **Language:** TypeScript (Strict execution).
*   **AI API Wrapper:** `@google/genai` (v1.38).

### 2.2 Application State & Routing Module (`App.tsx`)
The application is a pure SPA, devoid of traditional URL-based routing (e.g., React Router) to keep the demo footprint portable and un-encumbered. State transitions are controlled via React Hooks.

*   `view` state string: `'login' | 'partner_login' | 'intake' | 'dashboard' | 'admin_dashboard' | 'admin_view_partner' | 'presentation'`
*   `role` state: Enforces RBAC locally (`'guest' | 'partner' | 'admin'`).

### 2.3 Component Hierarchy
```text
<App>
 ├─ <Login / Presentation Gateway>
 ├─ <IntakeWizard>
 │   ├─ <Step1_CompanyInfo>
 │   ├─ <StepX_AiReadiness> (Captures aiReadinessMatrix)
 │   └─ <CalculationEngine> (In-memory prior to dbService commit)
 ├─ <Dashboard>
 │   ├─ <CapCapChart> (Recharts Radar Graphic)
 │   ├─ <FundingCalculator>
 │   └─ <ChatBot> (Context-aware Gemini Chat UI)
 └─ <AdminDashboard>
     ├─ <PartnerGrid>
     ├─ <CSVUploader>
     └─ <LeadMatchModal> (Connects to geminiService)
```

---

## 3. Data Dictionary & Memory Management

### 3.1 Persistence Layer (`dbService.ts`)
To eliminate the requirement for a heavy Dockerized database setup, the MVP leverages HTML5 LocalStorage as a highly available, synchronous key-value store simulating NoSQL.

*   `DB_KEY = 'ingram_micro_partner_db_v1'`: Array of `PartnerData` objects.
*   `UNASSIGNED_KEY = 'ingram_micro_unassigned_leads_v1'`: Array of `Opportunity` objects.

**Operations Expose:**
*   `savePartner()`: Upsert operations based on composite key (email). Preserves relational `Opportunity` arrays upon merge.
*   `assignOpportunity()`: Moves unassigned leads into the partitioned array within a specific `PartnerData` record.
*   `updateOpportunityDetails()`: Mutates nested state in the opportunity array pipeline.

### 3.2 The `PartnerData` Interface (`types.ts`)
A massive localized JSON store holding ~60 scalar values, nested geometries, and computed fields.
_Critical Sub-Trees:_
*   `headcount` (Object): Breaks down technical staff by functional area.
*   `certCount` (Object): Normalizes AWS certification volume.
*   `aiReadinessMatrix` (Hashmap): K:V numeric pairing for LLM capability.

---

## 4. Algorithms: The Scoring Math

The `IntakeWizard` runs deterministic algorithms to compute internal metrics (`capabilityScore`, `capacityScore`, `aiReadinessScore`) ensuring the subjective assessments are normalized.

### 4.1 Capability Scoring Algorithm (Technical Depth)
```typescript
let score = 0;
// AWS Official Validations
score += (partner.competencies.length * 5); // Massive weight to validated competencies
score += (partner.sdpStatus.length * 3);    // Moderate weight to specific delivery
if (partner.publicSectorActive) score += 10; // Base boost for pub-sec

// Math.min(score, 100) -> Max Cap
```

### 4.2 Capacity Scoring Algorithm (Execution Scale)
Derived primarily through `teamSizeTech`, a subjective banding selection:
*   `0`: 10 pts
*   `1`: 20 pts
*   `2-5`: 30 pts
*   `6-10`: 60 pts
*   `11-20`: 80 pts
*   `21-50`: 90 pts
*   `50+`: 100 pts

### 4.3 AI Readiness Algorithm (Emerging Tech)
Generates derived metric from a 19-question Likert Scale (1 = Beginner, 5 = Production).
```typescript
// Algorithm
let totalScore = 0;
Object.values(matrix).forEach(val => totalScore += val);
const maxPossible = 19 * 5; // 95
const percentage = Math.round((totalScore / maxPossible) * 100);
```

### 4.4 Matrix Track Calculation
The culmination algorithm classifying Partners into Ecosystem Tracks.
*   `Track C`: Elite tier. `competencies >= 2` AND `tech_capacity > 60` AND `sdp > 1`.
*   `Track B`: Growth tier. `competencies >= 1` AND `tech_capacity > 30`.
*   `Track A`: Foundational fallback.

---

## 5. Machine Learning & Generative AI Architecture

This system fundamentally integrates `gemini-3-flash-preview` natively into its data fabric to execute tasks normally reserved for human analysts.

### 5.1 Pattern 1: RAG (Retrieval-Augmented) System Prompts via ChatBot
`ChatBot.tsx` dynamically constructs a `systemInstruction` text blob.

*   **Prompt Architecture:**
    1.  **Directive Header:** "You are a senior AWS Partner Practice Consultant working for Ingram Micro."
    2.  **Context Injection:** "Here is the active partner's JSON data matrix: [JSON.stringify(PartnerData)]".
    3.  **Boundary Constraints:** "Generate advice localized ONLY to this data matrix. Do not provide code examples unless asked. Push the user to use Ingram Micro programs."

### 5.2 Pattern 2: Algorithmic Recommendation via Zero-Shot Classification
`geminiService.ts` executes the `matchLeads()` function.

*   **The Heuristic Prompt Design:**
    The LLM plays the role of a routing engine. We upload arrays of Anonymized Partner Data (dropping identifiable PII like emails for compliance) + The Lead Object.
    
    _Weights instructed to the LLM:_
    - 40% Capability Alignment (Do their competencies match the Lead Workload?)
    - 20% Track/Maturity Index.
    - 15% Geographical proximity (Canada is massive, HQ proximity is critical).
    - 10% Industry Vertical overlap.

*   **Enforcing JSON Output Schema (Crucial):**
    We mandate `responseMimeType: 'application/json'`. If the LLM generates conversational text, the application parsing will error out. The LLM guarantees a structured array that is consumed by `AdminDashboard.tsx` to automatically paint React components (Modals with "Match Percentage" visual bars).

---

## 6. System Security & Transition Constraints

### 6.1 Current Security Posture (Development Sandbox)
1. **API Key Management:** Defined in `vite.config.ts` via env variables (`import.meta.env`). *Warning:* In a client-side architecture, this exposes the API key over network tabs.
2. **Database Isolation:** Currently multi-tenant entirely within browser LocalStorage. 

### 6.2 Target State Architecture (Roadmap to Production)
To operationalize this platform securely for B2B enterprise users:
1. **BFF (Backend-For-Frontend) Edge Node:** Migrate Gemini inference calls (`geminiService.ts`) to a serverless Edge function (e.g., Cloud Run or Vercel Edge). The Edge function will hold the secure API key, receive the auth token, validate scope, and forward requests to Google AI.
2. **Relational Database Migration:** Migrate `dbService.ts` abstraction layer to point via GraphQL/REST to a Postgres cluster. Maintain JSON fields (`aiMatrix`, `certCount`) as `JSONB` column types in Postgres for indexing speeds.
3. **SSO/OAuth:** Implement AWS Cognito matching the `companyName` or email domain to enforce strict multi-tenant isolation rules.

---

## 7. UX/UI & Front-end Guidelines

### 7.1 Interface Design Philosophy
*   **Cognitive Load Reduction:** Multi-step wizards (instead of scrolling interfaces) break complex data ingestion (50+ fields) into bite-sized behavioral chunks.
*   **Accessibility (a11y):** Form inputs driven via native browser DOM bindings (`select`, `input`) wrapped in Tailwind for keyboard accessibility.
*   **Non-Blocking UIs:** All AI interactions feature animated typing indicator states (`Pulse` animations via Tailwind) to manage user patience during High-Latency LLM network requests.

### 7.2 Theming Engine (Tailwind)
*   **Canvas Boundaries:** Wrapped consistently in `.max-w-[1600px] .mx-auto` for ultra-wide screen control preventing typography degradation.
*   **Brand Palettes:** Strict adherence to `#004481` (Ingram Corporate Blue) overlaid with AWS signal orange elements for calls to action.
*   **Headless Vectors:** Lucide React enables infinitely scalable programmatic SVG icons embedded inline to prevent network waterfall requests.

-- END OF DOCUMENTATION --
