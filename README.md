
# Ingram Micro Xvantage: AWS Partner Transformation Platform

## 1. Executive Summary & Business Project Description

The **Ingram Micro AWS Partner Transformation Platform** is a mission-critical web application designed to accelerate the growth of the Canadian AWS Partner Ecosystem. It addresses two primary challenges: **Ecosystem Transparency** and **Intelligent Lead Distribution**.

Traditionally, identifying which partners are ready for complex AWS workloads (e.g., Generative AI, Large Scale Migrations) is a manual, spreadsheet-heavy process. Furthermore, distributing leads from marketing events to the "best-fit" partner is often subjective and slow.

This platform digitizes this experience via two interfaces:
1.  **For Partners (The "Scorecard"):** An intake and analytics dashboard that assesses their technical maturity against AWS standards (Track A, B, C). It offers real-time AI consulting to help them unlock AWS funding and grow their practice.
2.  **For Ingram Admins (The "Command Center"):** A centralized portfolio view that allows for the bulk ingestion of marketing leads (CSV) and uses Generative AI to semantic match those leads to partners based on geography, competency, and past performance.

---

## 2. User Stories

### Persona: Sarah - AWS Business Development Manager (Admin)
*   **US-1 (Bulk Distribution):** "As Sarah, I want to upload a CSV file containing 50+ raw leads from a 'Cloud Summit' event so that I can automatically route them to partners without manually reading every description."
    *   *Acceptance Criteria:* System accepts CSV, parses specific headers, displays a preview, and AI assigns a "Match Score" and "Reasoning" for each lead.
*   **US-2 (Pipeline Governance):** "As Sarah, I want to see a master list of all opportunities (assigned and unassigned) so that I can identify which deals are stalling."
    *   *Acceptance Criteria:* A "Pipeline" view shows a table of all deals with "Last Updated" timestamps. Unassigned leads are highlighted in Orange.
*   **US-3 (Partner Portfolio):** "As Sarah, I want to search for a partner by name or filter by 'Strategic' status to quickly check their capabilities during a QBR."
    *   *Acceptance Criteria:* Search bar filters the partner list instantly. Clicking a partner opens their detailed Scorecard view.

### Persona: Alex - CTO of "CloudNative Inc." (Partner)
*   **US-4 (Maturity Assessment):** "As Alex, I want to complete a technical intake form so that Ingram Micro understands my team's certifications and capabilities."
    *   *Acceptance Criteria:* A multi-step wizard collects data on Certs, Headcount, and Competencies. A score (0-100) is generated at the end.
*   **US-5 (Funding Calculator):** "As Alex, I want to estimate how much AWS funding (MAP/OLA) I can get for a $250k migration project."
    *   *Acceptance Criteria:* A calculator tab allows inputting ARR/Service fees and outputs potential funding amounts based on my competency status.
*   **US-6 (Lead Management):** "As Alex, I want to view leads assigned to me by Ingram and update their stage to 'Closed Won' so that I can prove my ROI."
    *   *Acceptance Criteria:* A "My Opportunities" tab lists assigned deals. I can edit the Stage, and the change is reflected in the Admin dashboard.

---

## 3. Technical Specifications

### Architecture
*   **Frontend:** React 18 (Functional Components, Hooks).
*   **Build Tool:** Vite / ESM (via Browser-native imports).
*   **Styling:** Tailwind CSS v3.
*   **Database:** `localStorage` (Simulated NoSQL via `dbService.ts`).
*   **AI Engine:** Google Gemini (`gemini-3-flash-preview`) via `@google/genai` SDK.

### Key Components
*   `AdminDashboard.tsx`: Handles CSV parsing, lead queue management, and the "1-Click Match" workflow.
*   `Dashboard.tsx`: The Partner view. Contains the Logic for Propensity Scoring and the Funding Calculator.
*   `IntakeWizard.tsx`: Complex multi-step form for gathering partner data.
*   `geminiService.ts`: Abstraction layer for AI calls. handles JSON sanitization and prompt engineering.

### Data Model (Key Entities)
*   **PartnerData:** Stores profile, certifications, competencies, and `calculatedTrack` (A/B/C).
*   **Opportunity:** Represents a deal. Contains `stage`, `estArr`, `history` log, and `description`.
*   **Unassigned Queue:** A separate list of Opportunities that have not yet been linked to a specific Partner email.

### Functional Requirements
*   **CSV Support:** Must support standard CSV format with columns for Customer, Email, Description, and optionally a Pre-assigned Partner.
*   **AI Reliability:** The Matcher must return valid JSON. If the AI fails or hallucinates markdown, the system must sanitize and retry or fallback gracefully.
*   **Data Persistence:** Refreshing the page should not lose the Partner Database (persisted in LocalStorage).

### Non-Functional Requirements
*   **Performance:** Dashboard interactions (filtering/searching) must be < 100ms.
*   **Security:** API Keys must be loaded via Environment Variables. Data isolation between Partner views (simulated).
*   **Responsiveness:** UI must scale from Laptop (1366px) to Large Desktop (2560px).

---

## 4. Comprehensive Demo Workflow (The "Happy Path")

Follow this script to demonstrate the full capabilities of the platform.

### Phase 1: The Admin Experience (Lead Distribution)
1.  **Login:**
    *   Select **"Admin Command"** (Right side).
2.  **Portfolio View:**
    *   Show the "Total Active Partners" metric.
    *   Use the Search bar to find **"Adastra"**. Click "Scorecard" to show you can view their details. Click "Back" to return.
3.  **Bulk Import:**
    *   Click the **"Bulk Import"** tab in the header.
    *   Click **"Load Live Sample"** (Red Button).
    *   *Explain:* "This simulates a CSV export from an event like AWS re:Invent."
    *   Click **"Next: Analyze Leads"**.
    *   *Observation:* Notice the system identifies some leads have a "Partner Assigned" column (Green) and others are "Unassigned" (Orange).
    *   Click **"Process Import"**.
    *   *Result:* Toast notification confirms distribution.
4.  **The Matching Engine:**
    *   Click the **"Matcher"** tab.
    *   *Explain:* "These are the leads that didn't have a pre-existing relationship. We need to find them a home."
    *   Click **"Analyze & Match All"**.
    *   *Observation:* Watch the progress bar. The AI is reading the Description of each deal and comparing it against the competency profiles of all 7 partners.
    *   *Result:* Matches appear. "Migration lead" -> "Adastra" (High score due to Migration Competency).
    *   Click **"Approve All Matches"**.
5.  **Pipeline Governance:**
    *   Click **"Pipeline"** tab.
    *   Show the "All Opportunities" table. Note the "Unassigned" matches are now gone, and everything is assigned to a Partner.

### Phase 2: The Partner Experience (Deal Acceptance)
1.  **Switch Roles:**
    *   Click the **Log Out** icon (Top right).
    *   Select **"Partner Portal"** (Left side).
2.  **Partner Login:**
    *   Click **"Show Demo Users"**.
    *   Select **"Adastra Corporation"**. Click **"Sign In"**.
3.  **The Scorecard:**
    *   Show the "Resell Propensity" score (likely high for Adastra).
    *   Show the "Practice Radar" chart.
4.  **Managing the Lead:**
    *   Click **"My Opportunities"** tab.
    *   Find one of the leads just assigned by the Admin.
    *   Click **"Update Status"**.
    *   Change Stage to **"Closed Won"**. Add a note: "Signed contract today."
    *   Click **"Save Update"**.
    *   *Result:* The card turns Green.
5.  **Funding:**
    *   Click **"Funding Calculator"**.
    *   Select **"Migration"** workload. Enter **$500,000** ARR.
    *   *Result:* See the estimated "MAP Mobilize" and "Migrate" credits available because Adastra has the Migration Competency.

### Phase 3: Closing the Loop
1.  **Log Out** and log back in as **Admin**.
2.  Go to **"Pipeline"**.
3.  *Observation:* The deal Adastra just closed is now showing as **"Closed Won"** (Green) in the master view. This demonstrates the end-to-end data flow.
