# Ingram Micro AWS Ecosystem Portal - Project Documentation

## 1. Executive Summary & Business Value

The **Ingram Micro AWS Ecosystem Portal** is a next-generation, AI-driven platform designed to modernize how Ingram Micro assesses, enables, and accelerates its AWS Partner ecosystem. 

For business owners and stakeholders, this platform represents a shift from reactive, spreadsheet-based management to a proactive, automated, and scalable revenue engine. 

### Core Value Propositions:
* **Accelerated Time-to-Revenue:** Identifies eligible AWS funding (MAP, OLA, POC) automatically, helping partners close deals faster.
* **Objective, Data-Driven Lead Routing:** Eliminates bias by using Generative AI to match high-value cloud opportunities to the partner with the highest probability of closing, based on verified capabilities.
* **Automated Partner Enablement:** Provides 24/7 personalized, AI-driven consulting ("AI Practice Consultant") tailored exactly to a partner's unique scorecard.
* **Ecosystem Visibility:** Gives Ingram Micro leadership a real-time, macroeconomic view of their entire Canadian partner base—identifying capability gaps (e.g., a shortage of AI/ML partners) before they impact revenue.

---

## 2. Key User Stories

The application is built around two primary personas: the **AWS Partner** (the user being enabled) and the **Ingram Micro Admin** (the internal user managing the ecosystem).

### For the AWS Partner
* **As a Partner,** I want an intuitive intake process so that I can easily provide my company’s capabilities without filling out complex Excel spreadsheets.
* **As a Partner,** I want to see my "Maturity Score" across Technical, Sales, and Delivery, so that I know exactly where I stand relative to the top global partners.
* **As a Partner,** I want to simulate AWS funding for my upcoming projects, so that I can offer competitive pricing and accelerate my customer's decision-making.
* **As a Partner,** I want to ask an AI Consultant for strategic advice on my practice, so that I can learn the fastest path to upgrade my AWS Tier (e.g., from Select to Advanced).

### For the Ingram Micro Admin (PDM/Leadership)
* **As an Admin,** I want a centralized dashboard showing all registered partners categorized by their Maturity Track, so that I can prioritize my enablement investments.
* **As an Admin,** I want to import a CSV of raw customer leads and have the system automatically analyze them, so that I don't have to manually interpret technical requirements.
* **As an Admin,** I want an "AI Matcher" to recommend the top 3 best-fit partners for a specific lead alongside a confidence score, so that I can accurately route opportunities and maximize win rates.
* **As an Admin,** I want to "View As Partner" to see exactly what my partners see, so I can guide them through their capability gaps during our 1-on-1 meetings.

---

## 3. How the Modules Work and Integrate

The platform is a cohesive ecosystem where data flows seamlessly from input to analysis to action. 

### A. The Intake Wizard (`IntakeWizard.tsx`)
* **What it does:** A dynamic, multi-step form that captures over 50 data points from the partner (Demographics, Business Model, Certifications, AWS Competencies, and AI Readiness).
* **Integration:** As soon as the form is submitted, the data is instantly processed by the Scoring Engine (detailed below) and saved to the central database, triggering a real-time update on both the Partner Dashboard and Admin Command Center.

### B. The Partner Dashboard (`Dashboard.tsx`)
* **What it does:** The "Mission Control" for the partner. It visualizes their scores using Radar and Bar charts, breaks down their business model (Resell vs. Services), and houses the Funding Calculator.
* **Integration:** This module reads directly from the user's profile data. It also passes this complete data profile securely into the `ChatBot` component, acting as the memory context for the AI Consultant.

### C. The Admin Command Center (`AdminDashboard.tsx`)
* **What it does:** The global view for Ingram Micro. It aggregates all partner profiles into a searchable grid. It also contains the "Lead Import" tool.
* **Integration:** When an Admin imports leads, this module triggers the `geminiService` (the AI backend). The service cross-references the raw lead's technical requirements against the capabilities of every partner in the database to generate matches.

### D. The AI Services Engine (`geminiService.ts` & `ChatBot.tsx`)
* **What it does:** The brain of the operation, powered by Google's Gemini AI. 
* **Integration:** It acts as a middleware. For partners, it integrates as an interactive chat overlay. For admins, it acts as a silent analysis engine that processes arrays of data (Leads + Partners) and returns structured JSON responses detailing the best business matches.

---

## 4. The Scoring Engine Explained (Layman to Technical)

To provide actionable insights, the system constantly evaluates a partner's data to generate specific scores. Here is how the "black box" works under the hood:

### The "Track" System (Maturity Levels)
Think of tracks as "belts" in martial arts. As partners gain skills, they move up.
* **Track A (Foundational):** The starting point. The partner is registered but has limited proven delivery experience.
* **Track B (Growth):** The partner has unlocked at least 1 official AWS Competency OR has submitted several validated customer delivery references.
* **Track C (Strategic):** The elite tier. Requires 2+ official AWS Competencies, a robust engineering team (5+ certified engineers), and inclusion in the Service Delivery Program (SDP). 

### The Vector Scores (Capability, Capacity, AI Readiness)
Alongside their "Track", partners are scored from 0 to 100 in three distinct areas:

1. **Capability Score (Technical pedigree):** 
   * *Layman:* How many official "badges" does AWS recognize you for?
   * *Technical:* A weighted algorithmic sum. `(AWS Competencies * 5 points) + (Service Delivery Programs * 3 points) + (Public Sector Status * 10 points)`. Capped at 100.
2. **Capacity Score (Execution scale):**
   * *Layman:* Do you have enough engineers to actually do the work?
   * *Technical:* Derived directly from the `technicalTeamSize` dropdown. (e.g., 1-5 engineers = 30 points, 11-20 engineers = 80 points, 50+ engineers = 100 points).
3. **AI Readiness Score (Future-proofing):**
   * *Layman:* Are you ready for the Generative AI revolution?
   * *Technical:* The intake wizard asks partners to rate their experience across 19 exact AI domains (like Amazon Bedrock, SageMaker, RAG integrations). The system averages these responses on a 5-point maturity matrix and converts it to a 0-100 percentage.

---

## 5. The "Magic": How the AI Generates Value

The platform uses AI not just for chat, but for core business logic.

### 1. The AI Consultant (Partner Facing)
Instead of asking a generic AI "How do I grow my AWS business?", the portal injects the partner's **exact** scorecard invisibly into the prompt. 
* *Result:* The AI responds with breathtaking specificity. *"I see your capacity score is 80, but your capability score is only 30. Your large team of 20+ engineers needs to focus on acquiring the AWS Cloud Migration Competency. Here is the 90-day learning path to get them certified."*

### 2. The Opportunity Matcher (Admin Facing)
When Ingram gets a lead that says: *"Healthcare company in BC needs a heavily compliant data lake migration with machine learning pipelines."*
* *Result:* The AI doesn't just look for keyword matches. It runs a weighted heuristic evaluation:
  1. **Capability Match (40% weight):** Filters out anyone without Data & Analytics competencies.
  2. **Track/Maturity (20% weight):** Ensures the partner is Track B or C (we wouldn't risk a massive healthcare deal on a Track A partner).
  3. **Operational Fit (15% weight):** Prioritizes partners physically located in British Columbia for potential on-site requirements.
  4. **Industry Alignment (10% weight):** Looks for partners who flagged "Healthcare" in their intake form.
* The AI then outputs the top 3 absolute best choices, complete with an explanation of *why* they were chosen and what potential blockers might exist.

---

## 6. Conclusion

The Ingram Micro AWS Ecosystem Portal is more than a dashboard—it is a strategic growth engine. By digitizing intellectual property, enforcing objective scoring, and utilizing AI for high-velocity matchmaking, Ingram Micro can dramatically reduce the time it takes to enable partners, route deals accurately, and capture more AWS market share.
