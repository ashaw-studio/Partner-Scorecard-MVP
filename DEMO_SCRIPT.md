# Executive Presentation & Demo Script
**Audience:** Group President, Ingram Micro
**Presenter:** SVP Engineering
**Duration:** 15 Minutes

---

## Phase 1: The "Why" & The Vision (2 Minutes)

**Narrative:** 
"We are moving from a transactional distributor to a **Platform-First Technology Partner**. Today, managing our AWS ecosystem involves spreadsheets, manual emails, and subjective decisions. We have built an **Intelligence-Driven Ecosystem Portal** that digitizes the entire partner lifecycle—from assessment to funding to opportunity matching—powered by Generative AI."

**Key Themes:**
1.  **Digitization:** Replacing spreadsheets with apps.
2.  **Intelligence:** AI-driven insights, not just data entry.
3.  **Velocity:** Accelerating deal flow via automated funding & routing.

---

## Phase 2: The Partner Experience (5 Minutes)

**Goal:** Show how we deliver value *to* the partner.

**Step 1: The Login Experience (Wow Factor)**
*   **Action:** Open the App. Show the "Login" screen.
*   **Talk Track:** "It starts with a premium brand experience. We aren't just a portal; we are an enterprise gateway."
*   **Demo:** 
    *   Click **"Partner Portal"** (Top Right).
    *   Select **"Mariner Innovations"** (Track C Partner) to show a mature view first.

**Step 2: The Executive Scorecard**
*   **Action:** Land on `Dashboard`. Scroll through the "Executive Scorecard".
*   **Talk Track:** "Instantly, a partner sees their 'Digital Twin'. We score them on Capability, Capacity, and AI Readiness. No more guessing where they stand."
*   **Demo:** 
    *   Hover over the **Radar Chart** to show the multi-dimensional analysis.
    *   Click **"View Analysis"** on "Resell Propensity" to show the breakdown.

**Step 3: The Funding Calculator (Revenue Driver)**
*   **Action:** Click the **"Funding Calculator"** tab.
*   **Talk Track:** "This is the #1 question partners ask: 'How much money can I get from AWS?' We automated it."
*   **Demo:**
    *   Select **"Migration"** workload.
    *   Enter **$500,000** ARR.
    *   Show the immediate breakdown: **"MAP Mobilize: $200k"**, **"MAP Migrate: $75k"**.
    *   *Insight:* "This drives immediate deal velocity."

**Step 4: AI Consultant (The "Magic")**
*   **Action:** Click the **"Consultant AI"** tab.
*   **Talk Track:** "We embedded a virtual Solution Architect into the platform. It knows *exactly* who the partner is."
*   **Demo:**
    *   Type: *"How can I increase my valuation to get to Track C?"*
    *   *Wait for response.*
    *   Highlight how the AI references their *specific* missing competencies or team size.

---

## Phase 3: The Admin Command Center (5 Minutes)

**Goal:** Show how Ingram Micro manages the business at scale.

**Step 1: Ecosystem Visibility**
*   **Action:** Logout. Click **"Admin Command"** (Top Right).
*   **Talk Track:** "This is the PDM (Partner Development Manager) view. Total visibility across Canada."
*   **Demo:**
    *   Filter by **"Strategic Account - Scale"**. Show how the list filters instantly.
    *   Hover over the **"Tech Focus"** pie chart.

**Step 2: Intelligent Lead Injection**
*   **Action:** Click **"Pipeline Import"** tab.
*   **Talk Track:** "We receive leads from AWS in messy CSVs. We need to ingest and route them instantly."
*   **Demo:**
    *   Click **"Load Real Data (PII)"** (Simulated).
    *   Show the preview of the parsed data.
    *   Click **"Process & Import"**.
    *   *Result:* Toast message: "Imported 15 leads: 3 Assigned, 12 Queued."

**Step 3: AI Opportunity Matching (The Grand Finale)**
*   **Action:** Click **"AI Matcher"** tab.
*   **Talk Track:** "This is the game changer. We have 12 unassigned leads. Instead of a PDM calling 5 partners, Gemini analyzes the lead description against our entire partner database."
*   **Demo:**
    *   Click **"Run Batch Analysis"**.
    *   *Watch the progress bar.*
    *   When results appear, expand the first match.
    *   **Read the AI Reasoning:** *"95% Match. Partner has Migration Competency and is located in the same region as the customer."*
    *   Click **"Approve & Assign"**.
    *   *Insight:* "We just saved 4 hours of work in 4 seconds."

---

## Phase 4: Closing (3 Minutes)

**Narrative:**
"We have built the foundation. The data is structured, the AI is integrated, and the value is clear.
1.  **Partners** get clarity and funding.
2.  **Ingram** gets operational efficiency.
3.  **Vendors (AWS)** get higher conversion rates.
This is ready for pilot next week."

---

## Technical "Cheat Sheet" for Q&A

*   **"Is this real AI?"** -> Yes, it uses Google's Gemini 2.0 Flash model via API. It's not a script; it actually reads the data.
*   **"Where is the data?"** -> Currently simulated in local storage for the demo, but architected to plug into our existing SQL/CosmosDB backend.
*   **"Security?"** -> We anonymize partner data before sending it to the LLM for matching. No PII is trained on.
*   **"Scalability?"** -> Built on React/Vite. Can host thousands of concurrent users on standard cloud infrastructure (Azure/GCP).
