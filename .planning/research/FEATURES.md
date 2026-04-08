# Feature Research

**Domain:** Frontend-only MVP web platform for an academic demo of cross-border CBDC transfers between central banks
**Researched:** 2026-04-08
**Confidence:** MEDIUM

This document is scoped to the exact demo described in `PROJECT.md`: a desktop SPA that convincingly shows one cross-border transfer in digital national currencies. It is intentionally narrower than a production banking platform.

## Feature Landscape

### Table Stakes (This Demo Must Show These)

Features the diploma jury will reasonably expect to see in this exact scenario. Missing these weakens the core story.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Digital-ruble account dashboard | Bank of Russia positions digital-ruble access through familiar bank channels, so the demo needs a credible account context before the transfer starts. | LOW | One fixed demo user, one primary digital-ruble account card, balance, and 2-3 quick actions are enough. |
| Friendly-country corridor and rates directory | Cross-border CBDC value is impossible to understand without visible corridor options and FX context. Cross-border payment targets also make FX transparency a baseline expectation. | LOW | Show 3-5 mocked corridors, visible FX rate, explicit fee line even if zero, and a simple "last updated" label. |
| Transfer composer | The product exists to demonstrate one send flow. The user must be able to choose recipient, corridor and amount without leaving the SPA. | MEDIUM | Use pre-seeded recipients and a guided happy path instead of a flexible banking form. |
| Conversion preview with exact debit and credit | Official cross-border initiatives repeatedly emphasize that the payer should see the applied FX rate and exact debit/credit outcomes before sending. | MEDIUM | Show send amount, receive amount, FX rate, conversion charge or spread, and estimated delivery before confirmation. |
| Central-bank corridor status tracker | Status visibility is one of the clearest user-facing promises in cross-border payments, and the brief explicitly requires showing the route through central banks. | MEDIUM | Use 4-6 scripted steps such as initiated, FX matched, source CBDC platform accepted, partner CBDC platform accepted, recipient credited. |
| Confirmation receipt / electronic cheque | A demo needs a clean endpoint and a stable artifact to leave on screen during explanation and Q&A. | LOW | Include transfer ID, currencies, rate used, timestamp, final status and recipient summary. |

### Differentiators (Strengthen The Diploma Defense)

Features that are not required for the MVP to function, but make the thesis argument clearer and more defensible.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Corridor rail visualization | Makes the invisible infrastructure legible. The jury can see why this is a CBDC cross-border flow rather than a generic transfer form. | MEDIUM | Animate the path from sender bank UI to source central bank, cross-border corridor, partner central bank and recipient bank or wallet. |
| Guided explanation mode | Turns the UI into a self-explaining defense aid instead of relying entirely on the presenter. | MEDIUM | Add short plain-language annotations beside each stage, not long theory blocks. |
| Scenario presets / corridor switcher | Lets the presenter demonstrate that the model generalizes across multiple partner countries without building new flows. | LOW | Ship 3 curated corridors with different rates and timings. |
| Best-rate / bridge-currency reveal | Directly references the strongest academic insight from Project Icebreaker: competitive FX selection and optional bridge-currency routing. | HIGH | Keep this simulated and visual. A compact "best quote selected" panel is enough. |
| Legacy transfer vs CBDC snapshot | Makes the thesis claim explicit by comparing fewer intermediaries, clearer FX and faster status visibility with a traditional cross-border transfer. | LOW | Keep it as a compact comparison card near the preview or receipt, not a separate product area. |

### Anti-Features (Do Not Build For This MVP)

Features that sound impressive but would dilute the demo or blow up the scope.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Real onboarding, authentication, KYC and user management | Makes the product look like a real bank. | Violates the brief, requires backend and compliance flows, and delays the single scenario the project must prove. | Use one fixed demo identity with a clear "demo user" banner. |
| Live FX feeds, backend APIs or real settlement integrations | Feels more realistic and "real-time". | Removes determinism, introduces failure modes during the defense, and shifts effort from explanation to infrastructure. | Use mocked rates, mocked recipients and scripted status progression. |
| Admin, operations or compliance consoles | Sounds institution-grade and serious. | Creates a second product with almost no value for the end-user journey this diploma is about. | Use a lightweight explainer panel describing central-bank roles in the flow. |
| Full transaction history, statements, analytics and exports | Makes the dashboard feel more complete. | High UI scope for low narrative value. The jury needs one convincing transfer, not a retail-banking back office. | Show only the latest transfer card and a replayable receipt. |
| Wallet addresses, blockchain explorer surfaces or smart-contract details | Feels technically advanced. | Confuses CBDC UX with public-crypto tooling and distracts from the user-visible value of the transfer corridor. | Use human-readable corridor steps and plain-language status labels. |
| Chat, notifications, support center, profile settings | Adds polish and familiar app furniture. | Consumes design time without improving the thesis argument or the core transfer flow. | Keep navigation minimal: dashboard, rates, transfer flow, receipt. |

## Feature Dependencies

```text
[Digital-ruble account dashboard]
    └──enables──> [Transfer composer]
                       └──requires──> [Conversion preview with exact debit and credit]
                                              └──feeds──> [Central-bank corridor status tracker]
                                                                 └──ends with──> [Confirmation receipt / electronic cheque]

[Friendly-country corridor and rates directory] ──enhances──> [Transfer composer]
[Scenario presets / corridor switcher] ──enhances──> [Transfer composer]
[Guided explanation mode] ──enhances──> [Central-bank corridor status tracker]
[Best-rate / bridge-currency reveal] ──enhances──> [Conversion preview with exact debit and credit]
[Live integrations] ──conflicts──> [Deterministic scripted demo]
```

### Dependency Notes

- **Dashboard enables transfer composer:** the send flow is more credible when the user starts from a visible CBDC balance and account card.
- **Transfer composer requires conversion preview:** the user cannot meaningfully confirm a cross-border CBDC payment until the final debit, final credit and applied rate are visible.
- **Conversion preview feeds status tracker:** the tracker needs the confirmed corridor, amount pair and selected rate to render a coherent story of the transfer.
- **Status tracker ends with receipt:** the receipt is only meaningful after the scripted route has completed or reached its terminal state.
- **Rates directory enhances transfer composer:** a visible rate board reduces cognitive load and makes corridor choice feel grounded rather than arbitrary.
- **Guided explanation mode enhances status tracker:** explanatory copy matters most when the route is being animated or updated.
- **Best-rate / bridge-currency reveal enhances conversion preview:** it is an advanced extension of the preview, not a separate primary workflow.
- **Live integrations conflict with deterministic scripted demo:** the presenter needs a reliable, repeatable storyline more than live market realism.

## MVP Definition

### Launch With (v1)

Minimum viable demo. This is the smallest set that still convincingly demonstrates the thesis.

- [ ] Digital-ruble account dashboard — establishes the wallet context and balance the transfer starts from.
- [ ] Friendly-country corridor and rates directory — makes the foreign-currency side of the scenario legible.
- [ ] Transfer composer — allows the presenter to perform the core action in one uninterrupted flow.
- [ ] Conversion preview with exact debit and credit — proves transparency before confirmation.
- [ ] Central-bank corridor status tracker — visualizes the cross-border CBDC route and status changes.
- [ ] Confirmation receipt / electronic cheque — gives the scenario a crisp ending and a reusable artifact for discussion.

### Add After Validation (v1.x)

Features that strengthen the demo after the core path already works reliably.

- [ ] Corridor rail visualization — add once the basic status tracker feels stable and understandable.
- [ ] Guided explanation mode — add if early reviews show that viewers need more domain narration.
- [ ] Scenario presets / corridor switcher — add if the presenter needs multiple country-pair examples in one defense.

### Future Consideration (v2+)

Useful only if there is time after the core and the first defense-oriented enhancements are done.

- [ ] Best-rate / bridge-currency reveal — defer until the team can simulate alternative quote logic cleanly.
- [ ] Legacy transfer vs CBDC snapshot — defer unless the defense specifically needs a direct comparison frame.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Digital-ruble account dashboard | HIGH | LOW | P1 |
| Friendly-country corridor and rates directory | HIGH | LOW | P1 |
| Transfer composer | HIGH | MEDIUM | P1 |
| Conversion preview with exact debit and credit | HIGH | MEDIUM | P1 |
| Central-bank corridor status tracker | HIGH | MEDIUM | P1 |
| Confirmation receipt / electronic cheque | MEDIUM | LOW | P1 |
| Corridor rail visualization | HIGH | MEDIUM | P2 |
| Guided explanation mode | HIGH | MEDIUM | P2 |
| Scenario presets / corridor switcher | MEDIUM | LOW | P2 |
| Best-rate / bridge-currency reveal | MEDIUM | HIGH | P3 |
| Legacy transfer vs CBDC snapshot | MEDIUM | LOW | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Reference Initiative Analysis

These are design references, not direct product competitors. They show which user-visible capabilities matter in current cross-border CBDC and cross-border payment work.

| Feature | Bank of Russia digital ruble | Project Icebreaker | Project mBridge | Our Approach |
|---------|------------------------------|--------------------|-----------------|--------------|
| User entry point | Access to the digital-ruble account is framed through familiar banking channels. | End user interacts through a PSP wallet while FX is handled behind the scenes. | Commercial-bank participants operate on a shared multi-CBDC platform. | Start from a banking-style dashboard with one fixed demo user and one digital-ruble account. |
| FX transparency | Public materials emphasize familiar access rather than cross-border FX UX. | Best FX rate is selected for the payer, with optional bridge currencies. | Real-time peer-to-peer FX transactions are core platform capability. | Show the rate, exact debit, exact credit and optionally a "best quote selected" explanation. |
| Cross-border routing model | Central bank platform with familiar access through banks. | Hub-and-spoke interlinking of domestic CBDC systems. | Shared multi-CBDC infrastructure for instant cross-border payments and settlement. | Use a simplified corridor tracker that visualizes central-bank hops without building real infrastructure. |
| Speed and status | Consumer-facing materials focus on ease of access to the CBDC account. | Retail cross-border transactions are designed to complete within seconds. | Platform aims for instant cross-border payments and settlement. | Use a deterministic seconds-long progression with clear statuses and a terminal receipt. |

## Sources

- Project brief: `/Users/tkestkes/Dagmara/.planning/PROJECT.md` (authoritative scope, HIGH)
- Bank of Russia, digital ruble overview and FAQ, updated 2025: https://www.cbr.ru/fintech/dr/ and https://www.cbr.ru/Reception/TopicalMessage/Page/7847 (HIGH)
- Bank of Russia, *Digital Ruble: Current Project Status*, June 2025: https://cbr.ru/Content/Document/File/177415/digital_ruble_30062025.pdf (HIGH)
- Financial Stability Board, *G20 Targets for Enhancing Cross-border Payments*: https://www.fsb.org/work-of-the-fsb/financial-innovation-and-structural-change/cross-border-payments/g20-targets-for-enhancing-cross-border-payments-2/ (HIGH)
- BIS, *Project Icebreaker: breaking new paths in cross-border retail CBDC payments*, 6 March 2023: https://www.bis.org/publ/othp61.htm (HIGH)
- BIS, Project Icebreaker project page: https://www.bis.org/about/bisih/topics/cbdc/icebreaker.htm (HIGH)
- BIS, Project mBridge page, updated 11 November 2024: https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm (HIGH)
- BIS, *Project Nexus: Enabling instant cross-border payments*, July 2024: https://www.bis.org/publ/othp86.pdf (MEDIUM, used for sender-facing transparency and status expectations rather than CBDC-specific design)

---
*Feature research for: frontend-only academic demo of cross-border CBDC transfers*
*Researched: 2026-04-08*
