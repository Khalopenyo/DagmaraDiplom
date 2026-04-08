# Project Research Summary

**Project:** MVP веб-платформы для трансграничных переводов в цифровых валютах ЦБ
**Domain:** Frontend-only desktop SPA academic demo for cross-border CBDC transfers
**Researched:** 2026-04-08
**Confidence:** MEDIUM

## Executive Summary

This product is not a banking platform. It is a frontend-only desktop SPA that demonstrates one cross-border CBDC transfer clearly enough for a diploma defense: digital-ruble account context, visible corridor rates, one guided transfer flow, transparent conversion, a staged route through the corridor, and a final simulated receipt. The research is consistent on the right implementation posture: experts would build this as a small static React app with local mock data, explicit simulation boundaries, and a narrow scripted user journey, not as a fake production bank.

The recommended approach is to lock the MVP to one named corridor, one demo user, one golden-path transfer, and one believable exception path. Use `React 19 + TypeScript 5.9 + Vite 8 + React Router 7 + Tailwind CSS 4`, keep balances/rates/recipients/steps in local JSON, and organize the app around a single reducer-backed demo state. The transfer draft should be the only writable source of truth; quotes, tracker summaries, and receipts should be derived from that state so the same numbers appear everywhere.

The main risks are conceptual, not technical. A polished UI can accidentally imply real settlement, central-bank endorsement, or production-grade compliance. The roadmap therefore has to start with scope, actor vocabulary, and disclaimer boundaries before UI polish. After that, the biggest execution risks are FX ambiguity, status logic that only works on the happy path, and scope creep into generic banking or crypto theater. Each is manageable if the app keeps one corridor, one shared domain model, deterministic simulation, and explicit "simulated demo" copy on every major screen.

## Key Findings

### Recommended Stack

The stack recommendation is deliberately small because the MVP is narrow and frontend-only. A Vite-based React SPA is the right fit: it is current, fast to run, easy to demo, and does not add SSR or backend-shaped complexity the project does not need. Tailwind is the pragmatic choice for adapting an existing mobile UI into a constrained desktop layout, and Vitest plus Testing Library are enough to protect the transfer math and happy-path rendering.

**Core technologies:**
- `React 19.2.x`: UI runtime for a polished SPA without framework overhead.
- `TypeScript 5.9.x`: domain typing for balances, FX quotes, transfer steps, and receipts.
- `Vite 8.0.5`: fast dev/build toolchain for a static desktop demo.
- `React Router 7.14.0`: route-based navigation for dashboard, rates, transfer, tracker, and receipt.
- `Tailwind CSS 4.2.x`: fast desktop adaptation of the existing mobile design.
- `Vitest 4.1.3` + Testing Library: enough testing for conversion logic, route behavior, and the scripted flow.

### Expected Features

The research is clear that the MVP should prove one coherent user story, not simulate a full financial system. Table stakes are the six screens or states already implied by `PROJECT.md`: dashboard, rates, transfer composer, conversion preview, status tracker, and receipt. The strongest post-MVP additions are explanation-oriented, not infrastructure-oriented.

**Must have (table stakes):**
- Digital-ruble account dashboard with one fixed demo persona and visible balance context.
- Friendly-country corridor and rates directory with mocked rates, fee line, and update label.
- Transfer composer with pre-seeded recipients and guided happy-path inputs.
- Conversion preview with exact debit, exact credit, visible rate basis, and delivery expectation.
- Central-bank corridor status tracker with 4-6 scripted steps.
- Confirmation receipt / electronic cheque with transfer ID, timestamp, currencies, rate, and final simulated status.

**Should have (defense-strengthening):**
- Corridor rail visualization that makes the infrastructure path legible without becoming the whole product.
- Guided explanation mode with short plain-language annotations for each stage.
- Scenario presets / corridor switcher if the presenter needs multiple curated examples.

**Defer (v2+):**
- Best-rate / bridge-currency reveal until quote logic can be simulated cleanly.
- Legacy transfer vs CBDC comparison until the core flow is already stable and credible.
- Anything backend-shaped: onboarding, KYC, admin consoles, live FX, real integrations, full history, or crypto-wallet mechanics.

### Architecture Approach

The architecture research recommends a route-based SPA with one shared demo state, feature modules per screen, and a small domain layer for quote math, validation, simulation, and receipt building. The critical architectural rule is simple: only the transfer draft is editable; everything else reads derived state or frozen transaction snapshots. That keeps dashboard, rates, transfer, tracker, and receipt aligned and prevents demo-breaking contradictions.

**Major components:**
1. `AppShell` and route layout — desktop shell with sidebar, header, bounded main content, and page routing.
2. `DemoStateProvider` — reducer-backed shared demo state with typed actions and selectors.
3. `DashboardPage` and `RatesPage` — read-only context screens that prove layout and seed the transfer flow.
4. `TransferForm` + `ConverterCard` — the only writable workflow, deriving quote details from the draft.
5. `TransferSimulator`, `TrackerPage`, and `ReceiptPage` — centralized status progression, immutable receipt generation, and demo reset loop.

### Critical Pitfalls

1. **Prototype that looks like a real payment rail** — mark every major screen as a simulated research demo, use one canonical disclaimer, and avoid copy that implies live settlement or endorsement.
2. **Actor model collapse** — define sender-side institution, FX/compliance layer, destination-side institution, and recipient view before UI work; reuse those labels everywhere.
3. **FX black box** — show timestamp, rate status, fees, and net recipient amount consistently on form, confirmation, tracker summary, and receipt.
4. **Over-engineered MVP scope** — freeze to one corridor, one sender, one recipient, one success path, and one exception path before adding new screens or abstractions.
5. **Happy-path-only simulation** — use a deterministic transaction model with at least one exception branch and only issue receipts from valid terminal success.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Corridor Contract and Claim Boundaries
**Rationale:** This must come first because the highest-risk failure is not a broken UI; it is a misleading one. Scope, actors, disclaimer language, and corridor assumptions are dependencies for every later screen.
**Delivers:** One named demo corridor, one fixed demo user, one success path plus one exception path, canonical actor vocabulary, a shared mock-data contract, and standard "simulated demo" boundary copy.
**Addresses:** MVP scope control, anti-features, corridor assumptions, compliance framing.
**Avoids:** Prototype-that-looks-real, compliance theater, and scope creep into production banking.

### Phase 2: Desktop Shell, Navigation, and Read-Only Context
**Rationale:** The project needs the desktop adaptation and app structure proven before editing flows are introduced. Read-only screens validate layout, pacing, and data presentation with low risk.
**Delivers:** `AppShell`, sidebar/header/main layout, route wiring, mock-data bootstrap, `/dashboard`, `/rates`, and visible simulation markers in the first viewport.
**Uses:** `React`, `React Router`, `Tailwind`, typed JSON seeds, selector-driven rendering.
**Implements:** App shell, dashboard context, rates directory, and basic recent-activity scaffolding.

### Phase 3: Transfer Draft and FX Transparency
**Rationale:** Tracker and receipt should not exist until the writable transfer contract is stable. This phase establishes the single source of truth that all later screens depend on.
**Delivers:** `/transfer`, controlled draft form, draft validation, derived conversion preview, locked-vs-indicative quote policy, and consistent amount labeling.
**Addresses:** Transfer composer and conversion preview from the MVP feature set.
**Avoids:** FX ambiguity, duplicated amounts across screens, and inconsistent actor/field naming.

### Phase 4: Simulation, Tracker, Receipt, and Reset
**Rationale:** Once the transaction snapshot is stable, the app can safely add timed behavior and immutable outputs. Centralized simulation is the only credible way to keep the demo deterministic.
**Delivers:** Transaction creation, centralized simulator or small state machine, `/tracker/:transactionId`, `/receipt/:transactionId`, success plus one exception branch, receipt gating, recent-activity loopback, and one-click reset to seed state.
**Uses:** Shared reducer state, pure domain helpers, and browser timers isolated behind one simulation module.
**Implements:** Status tracker, notification flow, receipt builder, and dashboard feedback loop.

### Phase 5: Defense Hardening and Optional Enhancements
**Rationale:** Differentiators should only be added after the golden path is demo-safe. This phase improves comprehension and presentation quality without expanding the product into a platform.
**Delivers:** Guided explanation mode, corridor rail visualization, optional corridor presets if presentation needs them, copy hardening, and a reviewer comprehension pass.
**Addresses:** The strongest v1.x differentiators from the feature research.
**Avoids:** Blockchain theater, privacy confusion, and architecture visuals overwhelming the user journey.

### Phase Ordering Rationale

- Phase 1 comes before implementation because actor boundaries, disclaimers, and corridor assumptions drive both copy and data model.
- Phase 2 is intentionally read-only so the desktop shell and design adaptation can stabilize without flow logic noise.
- Phase 3 must precede Phase 4 because tracker and receipt logic depend on one immutable quote and transaction snapshot.
- Phase 4 closes the MVP story first: submit, observe, complete, and reset. That is the minimum credible diploma demo.
- Phase 5 is the right place for polish and explanatory enhancements. Keep best-rate logic, legacy comparisons, and any multi-corridor expansion out of the initial roadmap unless the defense explicitly requires them.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Validate the exact corridor, country naming, and institutional terminology the diploma should present. Research quality is strong, but the specific corridor choice is still open.
- **Phase 5:** Run targeted research only if adding best-rate / bridge-currency explanation, legacy-vs-CBDC comparison, or multi-corridor presets. These are the most domain-sensitive extensions.

Phases with standard patterns (skip research-phase):
- **Phase 2:** Well-documented React/Vite/Tailwind SPA shell and routing work.
- **Phase 3:** Standard reducer + selectors + controlled form patterns with local mock data.
- **Phase 4:** Standard deterministic client-side simulation patterns once the state contract is fixed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Current versions and tool choices were verified against official React, Vite, React Router, Tailwind, and Vitest documentation. |
| Features | MEDIUM | The feature set is well grounded in official CBDC initiatives, but the exact prioritization is still a product inference for a diploma demo rather than direct user research. |
| Architecture | HIGH | The architectural guidance maps cleanly to established React patterns and the narrow frontend-only scope. |
| Pitfalls | MEDIUM | The risks are strongly supported by official CBDC and financial-conduct sources, but the final translation into UI copy and thesis framing still needs judgment. |

**Overall confidence:** MEDIUM

### Gaps to Address

- **Specific corridor choice:** `PROJECT.md` says "friendly countries" but does not name the exact demo corridor. Choose one early and keep the rest clearly out of scope.
- **Mobile-to-desktop design inputs:** The research assumes an existing mobile UI, but the actual design assets and constraints are not captured here. The roadmap should reserve explicit adaptation work.
- **Copy validation in Russian:** Most domain sources are institutional English-language materials. Final Russian copy, disclaimers, and actor labels should be reviewed for clarity before the defense.
- **Audience comprehension testing:** There is no direct reviewer feedback yet. A short demo-readiness pass is needed to confirm viewers understand that the app is simulated and what each actor does.

## Sources

### Primary (HIGH confidence)
- `/Users/tkestkes/Dagmara/.planning/PROJECT.md` — authoritative MVP scope and out-of-scope boundaries.
- https://react.dev/versions — React version baseline and current stable line.
- https://vite.dev/blog/announcing-vite8 — Vite 8 version and Node compatibility.
- https://reactrouter.com/start/modes — React Router 7 mode guidance for SPA routing.
- https://tailwindcss.com/docs/installation/using-vite — Tailwind 4 Vite integration path.
- https://www.cbr.ru/fintech/dr/ — Bank of Russia digital-ruble framing and user entry context.
- https://www.bis.org/publ/othp61.htm — Project Icebreaker for retail cross-border CBDC and FX transparency.
- https://www.bis.org/about/bisih/topics/cbdc/mcbdc_bridge.htm — Project mBridge for corridor and settlement framing.
- https://www.bis.org/publ/othp52.htm — Cross-border CBDC interoperability options and actor complexity.
- https://www.fca.org.uk/consumers/misleading-financial-promotions — misleading-claims guidance relevant to simulated financial UX.

### Secondary (MEDIUM confidence)
- https://www.bis.org/publ/othp86.pdf — Project Nexus, used for cross-border transparency and status expectations beyond strict CBDC scope.
- https://www.ecb.europa.eu/press/intro/news/html/ecb.mipnews230526.hr.html — digital euro prototyping evidence for user-facing prototype framing.
- https://www.newyorkfed.org/aboutthefed/nyic/project-cedar — cross-border prototype reference for architecture and settlement discussion.

### Tertiary (LOW confidence)
- None.

---
*Research completed: 2026-04-08*
*Ready for roadmap: yes*
