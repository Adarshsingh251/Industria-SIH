# INDUSTRIA — Industrial Approvals, Compliance & Government Support Platform
### Smart India Hackathon (SIH26130) · Government of Maharashtra

> **A unified industrial lifecycle platform that guides businesses from approval discovery to application tracking, document management, compliance maintenance, and state government incentive discovery.**

---

## 🎯 Problem Statement (SIH26130)

* **Problem Statement:** Efficiency in streamlining industrial approvals, compliance processes, and access to government support services.
* **Organization:** Government of Maharashtra
* **Theme:** Miscellaneous / Ease of Doing Business
* **Submission ID:** SIH26130

---

## 🚀 Core Features & Implementation

### 1. Approval Discovery Engine
* Deterministic rules engine mapping industry classification (NIC), direct workforce, capital investment, power demand, and environmental footprint to statutory requirements.
* Three distinct categories: **Required**, **Potentially Required**, and **Information Needed** with transparent applicability rationale.
* AI-assisted natural language profile extractor to bootstrap business parameters from plain English text.

### 2. Unified Application Tracker
* Multi-department scrutiny tracking (DISH Labour, Maharashtra Fire Services, MPCB, MSEDCL).
* Real-time 5-stage stepper (*Submitted → Document Verification → Department Review → Inspection → Approved*).
* Next Action banner and SLA day counters.

### 3. Contextual Document Center (Vault)
* Files strictly bound to statutory approvals and applications (not generic storage).
* Status management: `Missing`, `Uploaded`, `Under Verification`, `Verified`, `Expired`.
* Simulated AI Document Assistant validating layout legends, seals, and compliance tags.

### 4. Post-Approval Compliance Center
* Scheduled calendar and schedule table for recurring obligations: Factory License Form 2 renewals, MPCB Form 4 Hazardous Waste manifests, Environmental Statement Form V, and Fire Safety audits.
* Real-time "Mark Filed" workflow.

### 5. Government Support & MSME Subsidies
* Matched against Maharashtra Package Scheme of Incentives (PSI 2019), Power Tariff Rebates, Clean Energy Grants, and Export Certification reimbursements.
* Interactive eligibility breakdown tailored for Aarohan Precision Components.

### 6. Government Officer Scrutiny Queue
* Two-way interactive workflow allowing switching into the Scrutiny Desk to advance review milestones and inspect uploaded dossiers.

---

## 🏢 Coherent Demo Enterprise

* **Company Name:** Aarohan Precision Components Pvt. Ltd.
* **Trade Name:** Aarohan Precision
* **CIN:** U29253PN2021PTC198421 · **PAN:** AABCA8923K · **GSTIN:** 27AABCA8923K1ZM
* **Location:** Plot No. B-42, MIDC Phase II, Chakan Industrial Area, Pune, Maharashtra 410501
* **Workforce:** 128 Registered Employees
* **Capital Investment:** ₹18.00 Cr
* **Sanctioned Power:** 450 kVA (HT 11 kV)
* **Environmental Classification:** MPCB Orange Category

---

## 🎨 Design System & Visual Motif

* **Primary Brand:** Parrot Green (`#7ED957` / `#245C3A`)
* **Pink Accent:** Controlled Highlights (`#F47BA6`)
* **Background:** Warm off-white (`#F7F8F4`)
* **Typography:** Inter Sans-Serif
* **Signature Motif:** Industrial Route Line (*Discover → Prepare → Apply → Review → Approve → Comply → Grow*)

---

## ⏱️ 3-Minute Demo Walkthrough

1. **0:00–0:20 (Landing Page):** Showcase the unified value proposition and the linear Industrial Lifecycle visual. Click **"Build My Approval Roadmap"**.
2. **0:20–0:50 (Approval Discovery):** Enter or review the 4-step parameters (Manufacturing, Maharashtra, 128 workers, ₹18 Cr investment). Alternatively test the AI Natural Language Extractor.
3. **0:50–1:10 (Generated Roadmap):** Review the 5 categorized statutory clearances (Factory License, Fire NOC, MPCB CTO, DISH Plan, Electricity). Click **"Track Application"**.
4. **1:10–1:35 (Application Detail - Fire NOC):** Inspect the 5-stage progress, deficiency notice, and missing *Fire Hydrant & Evacuation Blueprint*.
5. **1:35–1:55 (Document Center & AI Upload):** Click **"Upload"** on the missing Fire blueprint. Watch the AI Document Scrutiny Assistant validate the file and flip status from `Missing` → `Uploaded`, advancing the application state!
6. **1:55–2:15 (Compliance Calendar):** Open Compliance, review the October 2026 statutory calendar, and click **"Mark Filed"** on the urgent Fire Safety Audit.
7. **2:15–2:35 (Government Support):** Explore the 12 matched subsidies (Maharashtra PSI 2019 - 98% match up to ₹2.50 Cr) and inspect the eligibility breakdown.
8. **2:35–3:00 (Dashboard):** Return to the unified command center showing the complete loop: **Discover → Apply → Track → Comply → Grow**.

---

## 💻 Running the Application Locally

```bash
# Navigate to the project folder
cd "C:\Users\Singh Adarsh\.gemini\antigravity\scratch\industria"

# Install dependencies (already installed)
npm install

# Start the Vite development server
npm run dev

# Or build for production
npm run build
```
