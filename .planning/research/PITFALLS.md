# Pitfalls Research

**Domain:** Frontend-only MVP web demo for cross-border CBDC transfers between central banks
**Researched:** 2026-04-08
**Confidence:** MEDIUM

Official CBDC and financial-conduct sources are strong on architecture, compliance, FX, privacy and prototype-boundary issues. The project-specific translation to a client-only diploma demo is still an inference layer, so overall confidence is MEDIUM rather than HIGH.

## Recommended Prevention Phases

1. **Phase 1 - Corridor Scope and Claim Boundaries**
   Lock the demo to one corridor, one user story, one explicit set of assumptions, and clear "simulated / research-only" language.
2. **Phase 2 - Domain Model, Actors and Mock Data Contract**
   Define who exists in the flow, what each actor can see, how FX is represented, and which statuses are valid.
3. **Phase 3 - Transfer UX, Copy and Architecture Explanation**
   Turn the domain model into clear desktop screens, labels, disclaimers, and a non-misleading architecture explainer.
4. **Phase 4 - Status Simulation, Exception Paths and Receipt Logic**
   Build the transfer tracker as a deterministic state machine with at least one non-happy-path outcome.
5. **Phase 5 - Demo Hardening, Comprehension Testing and Resetability**
   Verify that outside viewers understand what is simulated, what is assumed, and what the prototype does not claim.

## Critical Pitfalls

### Pitfall 1: Prototype That Looks Like a Real Payment Rail

**Confidence:** HIGH

**What goes wrong:**
The UI, receipt, and status tracker imply that the app is connected to a real cross-border CBDC rail, has official central-bank backing, or demonstrates production-ready settlement finality. In a diploma defense, that creates the wrong standard: the audience starts judging missing backend, legal and operational controls instead of the demo narrative.

**Why it happens:**
CBDC prototype literature uses serious institutional language, and polished fintech UI naturally looks "real". Central-bank prototype programs themselves repeatedly state that their work is research, not deployment, and that prototypes are not final production designs.

**How to avoid:**
- Put a persistent "Simulated demo" label in the first viewport of the dashboard, transfer flow, status page, and receipt.
- Use one canonical disclaimer everywhere: client-side simulation, fictional data, no real money movement, no official central-bank integration, no regulatory claim.
- Avoid absolute copy such as "final settlement completed" unless it is explicitly labeled "simulated settlement result".
- Keep institution references descriptive, not promotional. Do not imply endorsement.

**Warning signs:**
- The first screen has no visible mock/simulation marker.
- The receipt looks like an official bank document with no disclaimer.
- Reviewers ask whether the prototype is connected to a real CBDC platform.
- Copy uses "official", "guaranteed", "live", or "real-time" without a source or boundary note.

**Phase to address:**
Phase 1 - Corridor Scope and Claim Boundaries

---

### Pitfall 2: Magical Central-Bank-to-Central-Bank UX That Erases Real Actors

**Confidence:** HIGH

**What goes wrong:**
The transfer journey shows a user sending money "from Central Bank A to Central Bank B" as if one app directly controls issuance, FX, compliance, routing, and receipt creation. That makes the demo visually clean but conceptually wrong.

**Why it happens:**
Architecture-showcase demos often collapse actors to make diagrams simpler. But official CBDC experiments separate user-facing providers, FX providers, domestic systems, hubs/common platforms, and jurisdiction-specific rule layers. If the actor model is wrong, every downstream screen becomes misleading.

**How to avoid:**
- Define a canonical actor list before UI work: sender wallet/interface, origin-side institution, FX/compliance layer, destination-side institution, receiving wallet/interface.
- Use those same actors in the status timeline, architecture explainer, and receipt metadata.
- If you intentionally simplify an actor out, say so in the assumptions panel instead of silently erasing it.
- Show central banks as infrastructure/governance participants, not as the only visible end-user counterparties.

**Warning signs:**
- The flow diagram contains only two central-bank logos and a transfer arrow.
- There is no place in the data model for FX provider, intermediary, or corridor policy state.
- Screen labels switch between "bank", "wallet", "platform", and "central bank" without a stable meaning.
- The audience cannot tell who the user is actually interacting with.

**Phase to address:**
Phase 2 - Domain Model, Actors and Mock Data Contract

---

### Pitfall 3: FX Black Box That Hides Assumptions, Timing and Fees

**Confidence:** HIGH

**What goes wrong:**
The app shows a converted recipient amount as if it were certain and self-explanatory, but does not say whether the rate is indicative, locked, best-available, simulated, fee-adjusted, or based on a bridge currency. This is the easiest way for a finance demo to become misleading.

**Why it happens:**
Teams optimize for a clean amount-entry screen and keep FX details in code or small print. Official cross-border CBDC work treats FX as a separate problem space, not a cosmetic number conversion. Financial-promotion guidance also treats hidden conditions, unclear total cost, and unrealistic expectations as misleading.

**How to avoid:**
- Give every quote a timestamp and a plain-language source label such as "Simulated corridor quote".
- Separate gross send amount, FX rate, service fee, and recipient amount in both confirmation and receipt.
- Decide once whether the rate is locked or indicative, and keep that answer consistent on every screen.
- If the corridor assumes a bridge currency or selected provider, say so in the architecture explainer or rate details drawer.

**Warning signs:**
- The amount received changes between entry, confirmation, tracker, and receipt.
- The rate has no timestamp or status label.
- Fees are absent on the form but appear on the receipt, or vice versa.
- Reviewers ask "Why did the beneficiary receive this exact amount?"

**Phase to address:**
Phase 2 - Domain Model, Actors and Mock Data Contract

---

### Pitfall 4: Compliance Either Disappears or Turns Into Fake Full-Stack Theater

**Confidence:** HIGH

**What goes wrong:**
The demo either ignores corridor eligibility, sanctions/AML checks, access rules, and jurisdiction-specific constraints entirely, or it overcompensates by inventing a giant fake KYC/compliance system that the MVP cannot credibly support. Both directions damage credibility.

**Why it happens:**
Cross-border CBDC discussions are full of legal and regulatory complexity, so demo teams often choose one extreme: pretend it does not exist, or build a fake compliance epic. Official BIS work keeps repeating that legal, policy and governance choices are foundational and corridor-specific.

**How to avoid:**
- Scope the MVP to a pre-defined demo corridor with explicit assumptions: permitted corridor, pre-validated parties, and simplified compliance screening.
- Represent compliance as a bounded checkpoint in the status flow, not a pseudo-enterprise subsystem.
- Include at least one exception state tied to corridor rules, such as "manual review" or "corridor not available".
- Never claim "compliant by design" unless the UI explains what is actually being simulated.

**Warning signs:**
- The product claims "instant cross-border CBDC transfer" for all destinations.
- There is no corridor assumptions panel anywhere in the app.
- Backlog items include KYC portals, admin dashboards, or rule engines before the core transfer journey works.
- The status tracker has no state that reflects screening, review, or eligibility.

**Phase to address:**
Phase 1 - Corridor Scope and Claim Boundaries

---

### Pitfall 5: Over-Engineered MVP Scope That Tries to Recreate the Entire CBDC Stack

**Confidence:** HIGH

**What goes wrong:**
The project drifts into live rates, multiple corridors, role-based access, smart-contract rules, offline mode, admin monitoring, wallet management, full transaction history, or generic blockchain infrastructure before one convincing desktop transfer story is stable.

**Why it happens:**
CBDC research is architecture-heavy, so teams copy the breadth of the ecosystem instead of the minimum story needed for a demo. Official sources explicitly say there is no one-size-fits-all design, and complexity rises quickly as more currencies, jurisdictions and interoperability choices are added.

**How to avoid:**
- Freeze MVP scope to one sender, one recipient, one corridor, one successful transfer, and one exception path.
- Defer live data, authentication, back-office tools, and generalized "platform" abstractions.
- Treat the architecture explainer as supporting material, not the product itself.
- Create a hard backlog rule: no new corridor or subsystem until the golden path and receipt are demo-safe.

**Warning signs:**
- More screens exist for settings, admin or node views than for the send-money flow.
- Implementation time is going into framework and simulation plumbing instead of UX clarity.
- The roadmap contains multiple countries and corridor variants before the first receipt is believable.
- The team is building abstractions for future integrations that do not exist in the MVP.

**Phase to address:**
Phase 1 - Corridor Scope and Claim Boundaries

---

### Pitfall 6: Blockchain Theater That Makes the Demo Look Like Generic Crypto

**Confidence:** HIGH

**What goes wrong:**
The UI leans on hashes, blocks, mining-like progress, smart-contract jargon, or "programmable money" language as if those are intrinsic to CBDC. The result is a demo that feels like a crypto wallet with central-bank logos pasted on top.

**Why it happens:**
Those visual metaphors are familiar and dramatic, and demo teams want something to animate. But official CBDC work is clear that CBDC does not require DLT, and programmability is a policy/design choice rather than a universal property.

**How to avoid:**
- Use payment-language first: request, verification, quote, transfer, settlement status, receipt.
- Keep technical implementation detail in a separate architecture tab or modal.
- Replace hash/block visuals with actor-based status checkpoints that answer the user's question: "Where is my transfer in the simulated process?"
- If you show ledger technology at all, label it as one possible infrastructure model, not the definition of CBDC.

**Warning signs:**
- The main transfer tracker shows a transaction hash or block number before it shows the payer, amount, or recipient.
- Reviewers start asking whether this is "crypto" rather than a CBDC demo.
- The app uses "smart contract executed" or "mined" style language.
- The architecture art is more detailed than the money flow explanation.

**Phase to address:**
Phase 3 - Transfer UX, Copy and Architecture Explanation

---

### Pitfall 7: Happy-Path-Only Status Simulation

**Confidence:** HIGH

**What goes wrong:**
The transfer tracker always succeeds with perfectly timed steps, there is no expiry, review, rejection or retry state, and the receipt appears no matter what. That makes the simulation feel fake and exposes the client-only nature in the worst possible way.

**Why it happens:**
Teams implement the tracker with chained timers because it is quick and visually satisfying. But CBDC prototype and operational-risk work repeatedly emphasizes interruptions, recovery, contingency handling and operational resilience.

**How to avoid:**
- Model the transfer as a small explicit state machine rather than a series of UI timeouts.
- Support at least one believable exception path: quote expired, recipient mismatch, corridor paused, manual review, or transfer rejected.
- Make receipt generation depend on terminal states only.
- Add a one-click reset so the demo can restart from a known seed state.

**Warning signs:**
- The tracker logic lives entirely in component-local timers.
- Every demo run takes exactly the same number of seconds.
- There is no terminal failure state in the route map or receipt logic.
- Refreshing the browser produces inconsistent status history.

**Phase to address:**
Phase 4 - Status Simulation, Exception Paths and Receipt Logic

---

### Pitfall 8: Privacy and Data-Visibility Story That Feels Politically Naive or Alarming

**Confidence:** MEDIUM

**What goes wrong:**
The demo shows central banks inspecting every personal transaction field in real time, or implies the opposite, that no identity/compliance data exists at all. Either version invites avoidable skepticism and distracts from the intended demo story.

**Why it happens:**
Parcel-tracker UI metaphors encourage teams to show the same payload at every node. But official CBDC work often separates what intermediaries see, what central infrastructure sees, and what is merely pseudonymized or not processed in prototypes.

**How to avoid:**
- Decide who sees what before any architecture visualization is designed.
- Keep user-identifying details local to the sender/receiver-facing UI and do not animate them through every central-bank node.
- Use fictional, obviously non-real personal and account data in mock JSON.
- Add a short privacy note in the architecture explainer: what is simulated, what is omitted, and which actors are assumed to see minimum necessary data.

**Warning signs:**
- The route animation repeats full payer/beneficiary details on every infrastructure node.
- Mock data uses realistic-looking IDs or account numbers with no redaction strategy.
- Reviewers focus on surveillance or privacy concerns instead of the payment flow.
- Different screens contradict each other about who can see transaction details.

**Phase to address:**
Phase 2 - Domain Model, Actors and Mock Data Contract

## Technical Debt Patterns

Shortcuts that are acceptable only if they are explicit, isolated and reversible.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Single hard-coded corridor and rate table in one JSON seed | Fastest path to a stable demo | Harder to extend to more corridors later | Acceptable for MVP if every quote is visibly labeled as simulated |
| Fixed demo user and pre-filled beneficiary | Keeps the flow short and repeatable | Can make the product feel fake if not framed as a scripted scenario | Acceptable for MVP with a visible "demo persona" label |
| One simplified compliance checkpoint instead of a real rules engine | Preserves clarity and avoids fake enterprise scope | Future backend integration will need a real policy layer | Acceptable and recommended for this MVP |
| Separate architecture explainer page instead of interactive live system map | Prevents the product UI from turning into a network diagram | Less reusable for future technical demos | Acceptable and preferable for MVP |
| Manual reset-to-seed action instead of persistent history | Makes demos reliable in class or review sessions | No durable state or audit trail | Acceptable for MVP and should be planned early |
| Copy-only privacy explanation with no full data-governance model | Keeps the scope contained | May need redesign if the project later adds backend logic | Acceptable for MVP if claims stay modest and specific |

## Integration Gotchas

There are no real external integrations in this MVP. The main integration risk is accidentally designing the frontend so that future data seams are impossible or misleading.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| FX quote source | Embedding conversion math directly in UI components | Create a small quote adapter now, even if it reads local JSON |
| Transfer status engine | Driving statuses with chained component timers | Store statuses in a deterministic state machine or scripted scenario model |
| Receipt generation | Recomputing values separately from the transfer confirmation screen | Derive receipt fields from the same transfer snapshot used for confirmation |
| Architecture explainer | Hard-coding actor names separately from the domain model | Reuse actor labels and status names from one shared schema |
| Future backend seam | Naming mock states after visuals instead of business events | Use domain events such as `quote_locked`, `compliance_review`, `settled_simulated` |

## Performance Traps

Performance matters here for demo smoothness on ordinary laptops and projectors, not for internet-scale throughput.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Timer-heavy animation chains | Janky tracker, skipped steps, inconsistent demo timing | Drive animation from state changes, not dozens of free-running timers | Breaks during live demos on modest hardware |
| Large always-mounted architecture graphics | Slow route changes and obvious repaint lag | Lazy-load the explainer and keep heavy visuals off the core flow | Breaks once multiple dense SVG/canvas views are open |
| Recomputing mock balances and receipts on every render | Amounts flicker or drift between screens | Freeze a transfer snapshot at confirmation time | Breaks as soon as user navigates back and forth mid-demo |
| Global polling simulation for fake real-time data | UI churn with no real benefit | Use seeded events, not background pseudo-live updates | Breaks immediately because the app is client-only |

## Security Mistakes

Security here is mostly a credibility problem: do not imply protections or integrations that do not exist.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Using realistic personal or account data in mock JSON | Screenshots and demos look like real financial data handling | Use obviously fictional names, IDs and account references |
| Claiming "bank-grade" security, AML, or regulatory approval in UI copy | Makes the demo misleading and easy to challenge | Use bounded language: "simulated", "assumed", "not implemented in MVP" |
| Baking fake API keys, endpoint URLs or institution secrets into the frontend | Creates false realism and teaches the wrong architecture | Keep the app openly mock-based with no pseudo-secrets |
| Letting any state generate an official-looking receipt | Suggests irreversible completion even when the flow failed | Gate receipts behind terminal success states and label them as simulated |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Simulated flow is not clearly marked | Audience assumes real infrastructure and asks the wrong questions | Put a visible simulation boundary on every major screen |
| Actor labels are vague or inconsistent | Users do not understand who is doing what | Keep one stable vocabulary across dashboard, flow, tracker and explainer |
| Recipient amount is shown without rate basis | Users see the product as financially misleading | Show rate status, timestamp, fees and net amount together |
| Architecture overwhelms the transfer task | Demo feels like a slide deck, not a product | Keep the core flow user-centric and move technical detail to secondary UI |
| Status tracker exposes too much technical jargon | Users lose the narrative thread | Phrase each step in user terms first, technical terms second |
| Country flags imply broad corridor support | Viewers assume unsupported jurisdictions are already covered | Show one named demo corridor and mark others as out of scope |

## "Looks Done But Isn't" Checklist

- [ ] **Dashboard:** Verify the first viewport says the product is a simulated demo with fictional data.
- [ ] **Transfer form:** Verify rate timestamp, fee treatment and corridor assumptions are visible before confirmation.
- [ ] **Confirmation screen:** Verify the same numbers and labels appear again without recomputation drift.
- [ ] **Status tracker:** Verify at least one non-happy-path branch exists and can be demonstrated on demand.
- [ ] **Receipt:** Verify it is generated only from terminal success and is labeled as a simulated confirmation.
- [ ] **Architecture explainer:** Verify every node maps to a defined actor in the data model.
- [ ] **Privacy story:** Verify the app states who can see what, instead of implying universal visibility.
- [ ] **Demo reset:** Verify the app can return to a known state in one action before a live presentation.

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Prototype looks real/official | LOW | Add persistent simulation markers, rewrite absolute claims, relabel receipt and tracker |
| Actor model is wrong | MEDIUM | Rewrite the domain model first, then update labels, tracker steps and explainer from that source of truth |
| FX is misleading | MEDIUM | Freeze one quote model, add timestamp/fees, regenerate confirmation and receipt from the same snapshot |
| Compliance is missing or overbuilt | MEDIUM | Replace fake subsystem screens with a scoped corridor assumptions panel and one checkpoint state |
| MVP scope is bloated | HIGH | Cut to one corridor, archive extra features to backlog, and re-sequence roadmap around the golden path |
| Blockchain theater dominates | LOW | Remove hash/block language from primary UI and move infrastructure detail into an appendix view |
| Happy-path-only tracker | MEDIUM | Extract a transfer state machine, add one exception path, and gate receipt logic to valid terminal states |
| Privacy story is alarming | MEDIUM | Redact payload visuals, separate actor visibility, and rewrite the explainer with minimum-necessary data claims |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Prototype that looks like a real payment rail | Phase 1, reinforced in Phase 5 | A new reviewer can identify within 30 seconds that the app is a simulated research demo |
| Magical actor collapse | Phase 2 | Every status step and architecture node maps to a named actor in the shared schema |
| FX black box | Phase 2, reinforced in Phase 3 | Rate basis, timestamp, fees and net amount match on form, confirmation and receipt |
| Compliance disappears or becomes theater | Phase 1, reinforced in Phase 4 | The corridor assumptions are explicit and one exception state is demoable |
| Over-engineered MVP scope | Phase 1 | The roadmap contains one corridor, one success path and one exception path before any expansion work |
| Blockchain theater | Phase 3 | Primary UI screens can be understood without any blockchain vocabulary |
| Happy-path-only tracker | Phase 4 | The app supports a deterministic failure/review path and does not issue receipts from invalid states |
| Privacy/data-visibility confusion | Phase 2, reinforced in Phase 3 | The architecture explainer clearly distinguishes user-facing, infrastructure and policy visibility |

## Sources

- BIS, "Lessons learnt on CBDCs" (2023) [HIGH] - https://www.bis.org/publ/othp73.pdf
- BIS / CPMI / IMF / World Bank, "Options for access to and interoperability of CBDCs for cross-border payments" (2022) [HIGH] - https://www.bis.org/publ/othp52.htm
- BIS, "Project Dunbar - International settlements using multi-CBDCs" (2022) [HIGH] - https://www.bis.org/publ/othp47.htm
- BIS, "Project Icebreaker: breaking new paths in cross-border retail CBDC payments" (2023) [HIGH] - https://www.bis.org/publ/othp61.htm
- BIS, "Project mBridge reached minimum viable product stage" (updated 2024-11-11) [HIGH] - https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm
- BIS, "Project Mandala: shaping the future of cross-border payments compliance" (updated 2025-11) [HIGH] - https://www.bis.org/about/bisih/topics/cbdc/mandala.htm
- BIS, "Central bank digital currency (CBDC) information security and operational risks to central banks" (2023-11-29) [HIGH] - https://www.bis.org/publ/othp81.htm
- Federal Reserve Bank of New York, "Project Cedar: Improving Cross-Border Payments With Distributed Ledger Technology" [HIGH] - https://www.newyorkfed.org/aboutthefed/nyic/project-cedar
- ECB, "Documents for the digital euro prototyping exercise" (2022-12-07) [HIGH] - https://www.ecb.europa.eu/press/intro/news/html/ecb.mipnews221207.ar.html
- ECB, "Market research and prototyping exercise confirm feasibility of technical solutions and user interfaces for a digital euro" (2023-05-26) [HIGH] - https://www.ecb.europa.eu/press/intro/news/html/ecb.mipnews230526.hr.html
- FCA, "Misleading financial promotions" (updated 2023-10-09) [HIGH] - https://www.fca.org.uk/consumers/misleading-financial-promotions
- FCA, "FG24/1: Finalised guidance on financial promotions on social media" (2024-03-26) [HIGH] - https://www.fca.org.uk/publications/finalised-guidance/fg24-1-finalised-guidance-financial-promotions-social-media
- FCA, "Consumer understanding: good practice and areas for improvement" (2026-03-13) [HIGH] - https://www.fca.org.uk/publications/good-and-poor-practice/consumer-understanding-good-practice-areas-improvement
- Bank of England, "Point-of-sale proof of concept" (2024-05-16) [HIGH] - https://www.bankofengland.co.uk/report/2024/point-of-sale-proof-of-concept

---
*Pitfalls research for: frontend-only MVP web demo of cross-border CBDC transfers*
*Researched: 2026-04-08*
