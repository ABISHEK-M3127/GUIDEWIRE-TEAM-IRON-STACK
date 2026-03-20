# 🛡️ GigSecure
### AI-Powered Parametric Income Protection for Gig Workers
### 🚀 Guidewire DEVTrails 2026 | Team Iron Stack


> **"Auto-triggered weekly micro-insurance that protects gig workers instantly when disruptions stop their income — zero paperwork, zero waiting, zero friction."**

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Why GigSecure Is Innovative](#-why-gigsecure-is-innovative)
- [Target Persona](#-target-persona)
- [Parametric Triggers](#-parametric-triggers)
- [Actuarial Basis](#-actuarial-basis)
- [Weekly Premium Model](#-weekly-premium-model)
- [Weekly Payout Structure](#-weekly-payout-structure)
- [Loss Ratio Analysis](#-loss-ratio-analysis)
- [Worker Affordability](#-worker-affordability)
- [NCR Rewards System](#-ncr-rewards-system)
- [Claim Eligibility & Risk-Based Payout](#-claim-eligibility--risk-based-payout)
- [AI/ML Architecture](#-aiml-architecture)
- [Fraud Prevention & Anti-Spoofing](#-fraud-prevention--anti-spoofing)
- [Zero-Touch Claim Flow](#-zero-touch-claim-flow)
- [Tech Stack](#️-tech-stack)
- [System Architecture](#️-system-architecture)
- [Dashboards](#-dashboards)
- [Coverage Scope & Exclusions](#-coverage-scope--exclusions)
- [Financial Model](#-financial-model)
- [45-Day Roadmap](#️-45-day-roadmap)
- [Live Demo](#-live-demo)
- [Team Iron Stack](#-team-iron-stack)
- [License](#-license)

---

## 🚨 Problem Statement

India's gig economy is the backbone of its urban logistics — yet over **15 million gig workers** (Swiggy, Zomato, Dunzo, Rapido, etc.) have **zero income protection**.

| Pain Point | Impact |
|---|---|
| No formal employment contract | No PF, ESI, or health coverage |
| Weather / lockdown disruptions | Instant 100% income loss |
| Traditional insurance barriers | High premiums, complex forms, long claim cycles |
| Financial vulnerability | Most workers live paycheck-to-paycheck |

A single day of heavy rain or a city-wide lockdown can wipe out a worker's entire weekly income with **no safety net** — a deeply systemic problem that GigSecure directly solves.

---

## 💡 Our Solution

**GigSecure** is an AI-powered **parametric micro-insurance platform** that:

- 📲 Enrolls gig workers in **60 seconds** via mobile
- 🌦️ **Automatically detects** qualifying disruption events (rain, heatwave, lockdown)
- ⚡ **Triggers payouts instantly** — no claim forms, no manual review
- 💸 Delivers money via **UPI within minutes** of a verified event
- 🤖 Uses **machine learning** to price premiums fairly by zone and risk profile

**No paperwork. No waiting. No middlemen.**

---

## 🚀 Why GigSecure Is Innovative

| Feature | Traditional Insurance | GigSecure |
|---|---|---|
| **Claim Model** | Manual submission + review | Parametric auto-trigger |
| **Payout Speed** | Days to weeks | Minutes |
| **Premium** | ₹500–₹2,000/month | ₹25–₹90/week |
| **Eligibility Check** | Agent + documents | AI-verified automatically |
| **Fraud Detection** | Manual audit | ML multi-signal detection |
| **Accessibility** | Bank account + paperwork | UPI + Aadhaar |
| **Coverage Granularity** | City-wide | Micro-zone (3 km radius) |
| **Loyalty Rewards** | None | NCR points system |

---

## 👤 Target Persona

**Rajan, 28 — Delivery Worker, Bengaluru**

- Works for Swiggy / Zomato, 10–12 hours/day
- Earns ₹900–₹1,300/day (₹5,400–₹7,800/week)
- Has zero savings buffer; family depends on daily income
- Owns a smartphone, uses UPI (PhonePe / GPay) daily
- Cannot afford a ₹1,500/month health plan; ₹25/week is viable
- Loses 1–3 workdays per month to weather or platform disruptions

---

## ⚡ Parametric Triggers

GigSecure uses **real-time API data** — not self-reporting — to verify disruption events objectively. All thresholds are aligned with IMD (India Meteorological Department) official classifications.

| Trigger Type | Condition | Data Source | Threshold |
|---|---|---|---|
| 🌧️ Heavy Rain | Rainfall intensity | OpenWeatherMap API + IMD | ≥ 15 mm/hr |
| 🌡️ Extreme Heat | Heat index by city | IMD / Weather API | See city table below |
| 🔒 Lockdown | Government order | Official Gov API / News API | Order issued |
| 🚦 Traffic Disruption | Severe road block | TomTom / HERE Maps *(planned)* | Congestion index ≥ 8 |

### 🌡️ City-Specific Heat Thresholds (IMD Standard)

| City | Heatwave Threshold | Severe Heatwave |
|---|---|---|
| Delhi | ≥ 45°C | ≥ 47°C |
| Hyderabad | ≥ 43°C | ≥ 45°C |
| Mumbai | ≥ 40°C (+ humidity) | ≥ 42°C |
| Bengaluru | ≥ 40°C | ≥ 42°C |

> Thresholds are sourced from IMD's official heatwave criteria, which vary by region based on historical baseline temperatures. This ensures payouts are triggered only during genuinely abnormal events for each city.

> **Smart Validation**: Each trigger requires **≥ 2 independent sources** to confirm before a payout is initiated. Timestamps are cross-validated to prevent spoofing.

---

## 📊 Actuarial Basis

Based on **IMD and NDMA public historical disruption data** across four major Indian cities (Bengaluru, Mumbai, Delhi, Hyderabad) covering 2021–2024:

| Metric | Value |
|---|---|
| Average disrupted days per week | ~1.26 days |
| Average daily income loss | ₹1,100 |
| **Expected weekly loss per worker** | **₹113** |
| Annual disruption events (avg per zone) | 8–12 |
| Data period | 2021–2024 (3 years) |
| Cities analyzed | Bengaluru, Mumbai, Delhi, Hyderabad |
| Data sources | IMD rainfall archives, NDMA disruption logs, city lockdown records |

> All loss estimates are conservative. The ₹113/week figure represents the probability-weighted expected payout, not worst-case loss, making it a sound actuarial basis for premium setting.

---

## 💰 Weekly Premium Model

| Plan | Weekly Premium | Coverage | Best For |
|---|---|---|---|
| 🔵 **Simple** | ₹25 | Basic weather events | First-time users, low-risk zones |
| 🟡 **Standard** | ₹50 | Weather + partial lockdown | Most workers |
| 🟢 **Premium** | ₹90 | All triggers + risk multiplier | High-risk zones, heavy earners |

### AI-Driven Premium Formula

```
Premium = Base_Rate × Zone_Risk_Index × (1 + Claim_History_Factor) × NCR_Discount
```

| Parameter | Range | Description |
|---|---|---|
| `Zone_Risk_Index` | 0.8 – 1.6 | Historical disruption frequency in the 3 km micro-zone |
| `Claim_History_Factor` | -0.1 to +0.3 | Reward for no claims; penalty for frequent claims |
| `NCR_Discount` | Up to 0.85× | Loyalty discount for NCR point holders |

> ⚠️ **Disclaimer**: Premiums are dynamically adjusted weekly based on real-time risk signals from IMD and NDMA feeds. Enrolled workers receive 48-hour advance notice before any premium change.

---

## 💵 Weekly Payout Per Disruption Type

| Event | Simple Plan | Standard Plan | Premium Plan |
|---|---|---|---|
| Heavy Rain (1 day) | ₹200 | ₹350 | ₹500 |
| Heavy Rain (2+ days) | ₹350 | ₹600 | ₹900 |
| Extreme Heatwave | ₹150 | ₹300 | ₹450 |
| City Lockdown (partial) | ₹200 | ₹400 | ₹600 |
| City Lockdown (full) | ₹300 | ₹550 | ₹800 |
| Traffic Disruption *(planned)* | ₹100 | ₹200 | ₹350 |

> Maximum **1 payout per event type per week** to prevent abuse. Events must be non-overlapping within a 24-hour window.

> Maximum **payout** changes for different plans.

> Price of plans may be change or payout amount may change in forther updates.
---

## 📉 Loss Ratio Analysis

A healthy insurance loss ratio is **50–75%**. GigSecure targets this range across all plans, validated against IMD/NDMA historical data.

| Plan | Weekly Premium | Expected Payout | Loss Ratio |
|---|---|---|---|
| Simple | ₹25 | ₹14.22 | **56.9%** |
| Standard | ₹50 | ₹28.44 | **56.9%** |
| Premium | ₹90 | ₹45.50 | **50.6%** |

> Loss ratios account for platform fee (10%), fraud reserve (5%), and operational overhead (8%). All plans remain actuarially sustainable.

---

## 💸 Worker Affordability Check

| Plan | Weekly Premium | Weekly Earnings (avg ₹6,000) | Income % |
|---|---|---|---|
| Simple | ₹25 | ₹6,000 | **0.42%** |
| Standard | ₹50 | ₹6,000 | **0.83%** |
| Premium | ₹90 | ₹6,000 | **1.50%** |

✅ All plans are **well under 2% of weekly income** — comparable to a single auto-rickshaw fare, making GigSecure genuinely accessible to its target users.

---

## 🎁 NCR Rewards System

**NCR (No Claim Reward)** incentivizes plan retention and honest usage.

> ⚠️ **Status**: NCR system is **designed and specified** — backend implementation is planned for Phase 2 (post-hackathon).

| Milestone | NCR Points | Reward |
|---|---|---|
| 4 weeks enrolled, 0 claims | +50 pts | ₹10 premium discount |
| 8 weeks enrolled, ≤ 1 claim | +100 pts | Free week of Simple plan |
| 12 weeks enrolled | +200 pts | 15% premium reduction |
| Referral (friend enrolls) | +75 pts | ₹15 cashback |

**Redemption Options:**
- 💸 Premium discounts
- 🎁 Partner vouchers (grocery, fuel)
- 📦 Free plan upgrades for 1 week

> This rewards may change in further updates.

> Points expire after 6 months of inactivity to encourage continued enrollment.

---

## ⏳ Claim Eligibility & Risk-Based Payout

GigSecure uses an **enrollment tenure + risk multiplier** system to reward long-term users and deter abuse.

| Enrollment Duration | Payout Level | Risk Multiplier |
|---|---|---|
| Week 1–5 | ❌ Not eligible (lock-in period) | — |
| Week 6 | ✅ Partial payout (50%) | 0.5× |
| Week 7–9 | ✅ Partial payout (75%) | 0.75× |
| Week 10+ | ✅ Full payout (100%) | 1.0× |
| Week 20+ (zero claims) | ✅ Full + loyalty bonus (110%) | 1.1× |

> The 6-week lock-in prevents sign-up-and-claim abuse while keeping the barrier low for genuine workers.

---

## 🤖 AI/ML Architecture

GigSecure's intelligence layer is built on **AI-driven adaptive models** selected for their proven performance on tabular insurance data.

### Recommended & Planned Model Stack

| Model | Role | Why It Fits GigSecure |
|---|---|---|
| **XGBoost** | Premium pricing + payout optimization | Best-in-class for structured tabular data; handles missing values; widely used in InsurTech |
| **Isolation Forest** | Anomaly & fraud detection | Unsupervised; excellent for detecting unusual claim patterns without labeled fraud data |
| **LightGBM** | Zone-level risk scoring | Faster than XGBoost for high-frequency weekly re-pricing; low memory footprint |

### How They Work Together

```
[IMD / NDMA Historical Data]
         ↓
[LightGBM — Zone Risk Scorer]
   Outputs: Zone_Risk_Index (0.8–1.6 per micro-zone)
         ↓
[XGBoost — Premium & Payout Engine]
   Inputs: Zone_Risk_Index + Worker tenure + Plan tier
   Outputs: Weekly premium + Final payout amount
         ↓
[Isolation Forest — Fraud Guard]
   Inputs: Claim frequency, GPS delta, device fingerprint, event overlap
   Outputs: Anomaly score (0.0–1.0); score > 0.75 → manual review
         ↓
[UPI Payout Engine] → Worker's Account
```

> All models are trained on IMD/NDMA public datasets. The architecture is AI-feed driven — models are retrained weekly as new weather and disruption data arrives, keeping risk pricing current without manual intervention.

---

## 🧠 Smart Validation Layer

Every triggered event passes through a **multi-source, time-locked validation pipeline** before any payout is approved:

1. **Source Redundancy** — Event confirmed by ≥ 2 independent APIs
2. **Geo-fence Check** — Worker's registered micro-zone must intersect the event zone
3. **Timestamp Lock** — Event must fall within the active policy window
4. **Activity Signal** — Optional platform login / GPS trace confirms worker was active pre-disruption
5. **Duplicate Guard** — SHA-256 event fingerprinting; one claim per event per policy

---

## 🛡️ Fraud Prevention & Anti-Spoofing

| Attack Vector | Defense Mechanism |
|---|---|
| Fake GPS location | Server-side zone validation + platform API cross-check |
| Duplicate claims | SHA-256 event fingerprinting; one claim per event per policy |
| API manipulation | Read-only certified data feeds; no user-submitted triggers |
| Account farming | Device fingerprinting + Aadhaar-linked KYC |
| Weather API spoofing | Multi-source consensus (≥ 2 APIs must agree) |
| Collusion rings | Isolation Forest detects claim clustering anomalies |

---

## ⚡ Zero-Touch Claim Flow

```
1. TRIGGER DETECTED
   ↳ OpenWeatherMap + IMD signals threshold breach (≥15mm/hr or city heatwave level)

2. MULTI-SOURCE VALIDATION
   ↳ ≥2 sources confirm → Geo-fence checked → Timestamp verified

3. ELIGIBILITY CHECK
   ↳ Policy active? Enrollment week ≥6? No duplicate fingerprint?

4. FRAUD SCORING
   ↳ Isolation Forest scores the claim
   ↳ Score < 0.75 → auto-approve | Score ≥ 0.75 → human review queue

5. PAYOUT CALCULATION
   ↳ XGBoost determines final payout within plan limits

6. UPI TRANSFER *(Razorpay — planned)*
   ↳ Payment dispatched → Worker notified via SMS + app push

⏱️ Target: < 5 minutes from event detection to bank credit
```

---

## 🖥️ Tech Stack

### Backend

| Component | Technology |
|---|---|
| API Framework | FastAPI (Python 3.11) |
| Database | PostgreSQL 15 + SQLAlchemy ORM |
| Task Queue | Celery + Redis |
| ML Models | XGBoost, LightGBM, scikit-learn (Isolation Forest) |
| Auth | JWT + Aadhaar OTP (mock) |

### Frontend

| Component | Technology |
|---|---|
| Worker App | Vanilla JS / Progressive Web App |
| Admin Dashboard | React.js |
| Charts | Chart.js |

### Integrations

| Service | Provider | Status |
|---|---|---|
| Weather Data | OpenWeatherMap API + IMD | ✅ Live |
| Disruption Data | NDMA public feed | ✅ Live |
| Traffic Data | TomTom / HERE Maps | 🔧 Planned |
| Government Orders | Official Gov API | 🔧 Mock |
| UPI Payments | Razorpay (sandbox) | 🔧 Planned |
| Notifications | Firebase Cloud Messaging | ✅ Live |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────┐
│                  WORKER (PWA)                        │
│        Enroll → View Policy → Receive Alerts         │
└───────────────────────┬──────────────────────────────┘
                        │ HTTPS
┌───────────────────────▼──────────────────────────────┐
│               FastAPI Backend                        │
│  Auth │ Policy Engine │ Event Processor │ Payouts    │
└──────────────┬──────────────────────┬────────────────┘
               │                      │
     ┌─────────▼───────┐   ┌──────────▼──────────┐
     │  PostgreSQL DB  │   │    ML Services       │
     │  Policies       │   │  XGBoost (pricing)   │
     │  Claims         │   │  LightGBM (risk)     │
     │  Workers        │   │  Isolation Forest    │
     └─────────────────┘   └──────────┬───────────┘
                                      │
                            ┌─────────▼──────────┐
                            │   External APIs    │
                            │  IMD / NDMA        │
                            │  OpenWeatherMap    │
                            │  Razorpay (UPI)    │
                            └────────────────────┘
```

---

## 📊 Dashboards

### Worker Dashboard
- Active plan + renewal date
- Real-time disruption alerts for their registered micro-zone
- Payout history + NCR point balance *(NCR display planned)*
- Plan upgrade / downgrade controls

### Admin Dashboard
- Real-time claims feed with Isolation Forest fraud scores
- Zone-wise risk heatmap (LightGBM output)
- Loss ratio tracker per plan
- ML model performance metrics (weekly retraining logs)
- Manual override queue for flagged claims (score ≥ 0.75)

---

## 📦 Coverage Scope & Exclusions

### ✅ Covered Events
- Heavy rainfall (≥ 15 mm/hr) causing delivery suspension
- City/region heatwave advisories (IMD thresholds, city-specific)
- Government-declared city or district lockdowns
- Severe traffic disruptions causing platform suspension *(planned)*

### ❌ Exclusions
- Personal illness or injury
- Vehicle breakdown or accidents
- Platform-side app outages (unless correlated with an environmental event)
- Events outside the worker's registered micro-zone
- Claims during the 6-week lock-in period

---

## 🔄 Plan Cancellation & Refund Policy

| Scenario | Policy |
|---|---|
| Cancellation before week starts | Full refund of that week's premium |
| Cancellation mid-week | No partial refund (weekly billing cycle) |
| Plan downgrade | Effective next billing cycle |
| Plan upgrade | Effective immediately; prorated difference charged |
| Account deletion | NCR points forfeited; outstanding claims settled first |

---

## 💼 Financial Model

| Revenue Stream | Detail |
|---|---|
| Platform Fee | 10% of all collected premiums |
| Reinsurance | 20% of risk ceded to reinsurer *(planned — post-launch)* |
| NCR Partner Revenue | Commissions from voucher redemption partners *(planned)* |

### Unit Economics — Standard Plan, 1,000 Workers

| Metric | Value |
|---|---|
| Weekly premium revenue | ₹50,000 |
| Platform fee (10%) | ₹5,000 |
| Expected payouts (56.9%) | ₹28,450 |
| Fraud reserve (5%) | ₹2,500 |
| Operational cost (8%) | ₹4,000 |
| **Weekly net margin** | **~₹10,050 (~20%)** |

---

## 🗓️ 45-Day Roadmap

```
Week 1–2 │ FOUNDATION
          │ ✅ Core API (FastAPI + PostgreSQL)
          │ ✅ Worker enrollment flow (KYC mock + Aadhaar OTP)
          │ ✅ Weather API integration (OpenWeatherMap + IMD)
          │ ✅ Basic parametric trigger engine (rain ≥15mm/hr)
          │ ✅ City-specific heatwave thresholds (IMD standards)

Week 3–4 │ ML & INTELLIGENCE
          │ ✅ XGBoost — premium pricing + payout optimizer
          │ ✅ Isolation Forest — fraud & anomaly detection
          │ ✅ LightGBM — micro-zone risk scorer
          │ ✅ Weekly model retraining pipeline (IMD/NDMA feeds)
          │ ✅ Smart validation layer (multi-source, geo-fence)

Week 5–6 │ PAYMENTS & UI
          │ ✅ Worker PWA dashboard
          │ ✅ Admin dashboard (React + Chart.js)
          │ ✅ SMS + push notifications (Firebase)
          │ 🔧 UPI payout integration (Razorpay sandbox — in progress)
          │ 🔧 NCR rewards backend (planned — Phase 2)
          │ 🔧 Traffic disruption trigger (TomTom — planned)
```

---

## 🌐 Live Demo

| Resource | Link |
|---|---|
| 🖥️ Live Demo | *(link to be added)* |
| 🎥 Demo Video | *(link to be added)* |
---

## 👥 Team Iron Stack

| Name |
|---|
| **Abishek M** |
| **Anish M** | 
| **Jegajith J K** |
| **J Madhan Kumaar** |
| **Pratheep S** |

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for India's 15 million gig workers**

*GigSecure — Guidewire DEVTrails 2026 | Team Iron Stack*

</div>
