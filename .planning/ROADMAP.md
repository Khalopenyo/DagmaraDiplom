# Roadmap: MVP веб-платформы для трансграничных переводов в цифровых валютах ЦБ

## Overview

This roadmap delivers a frontend-only desktop SPA for one diploma-ready transfer demo: a user starts from a digital-ruble account, reviews simulated CBDC rates, completes a fixed Russia -> China transfer, watches the transaction progress through central-bank checkpoints, and finishes with a receipt they can explain and rerun. Vietnam and South Korea stay visible only as reference rates in the directory, not as additional executable corridors in v1.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Demo Shell & Boundaries** - Establish the desktop SPA shell, navigation, and visible simulation framing. (completed 2026-04-08)
- [x] **Phase 2: Dashboard & Rates Context** - Show the seeded account context and simulated corridor rates before editing a transfer. (completed 2026-04-08)
- [ ] **Phase 3: Transfer Draft & Quote Transparency** - Let the user compose a transfer and inspect the conversion before submission.
- [ ] **Phase 4: Transaction Simulation & Receipt** - Submit the transfer, simulate deterministic processing, and present the final cheque.
- [ ] **Phase 5: Demo Reset & Settings** - Explain the prototype boundaries and reset the seeded demo state for repeated presentations.

## Phase Details

### Phase 1: Demo Shell & Boundaries
**Goal**: Users can enter a desktop SPA shell that clearly communicates the simulated nature of the product and lets them move through the core sections without page reloads.
**Depends on**: Nothing (first phase)
**Requirements**: NAVG-01, NAVG-02, NAVG-03, NAVG-04, DEMO-01
**Success Criteria** (what must be TRUE):
  1. User sees a desktop layout with a left sidebar, a top header, and centered main content capped at `1200px`.
  2. User can move between "Главная", "Переводы", "Обмен валют" and "Настройки" without a full browser reload.
  3. User sees clear simulated-demo framing on the key screens so the prototype is not mistaken for a live banking product.
**Plans**: 4 plans
Plans:
- [x] `01-01-PLAN.md` — Safely bootstrap the Vite/Tailwind/Vitest workspace and replace the starter app with a demo-safe branded entry screen.
- [x] `01-02-PLAN.md` — Lock the Phase 1 router tree, route metadata, and canonical demo-copy constants.
- [x] `01-03-PLAN.md` — Build the persistent shell, shared header/sidebar primitives, and SPA navigation behavior.
- [x] `01-04-PLAN.md` — Replace route stubs with demo-safe placeholder screens and phase-level content tests.
**UI hint**: yes

### Phase 2: Dashboard & Rates Context
**Goal**: Users can understand their seeded account context and the simulated CBDC rate board that supports the fixed Russia -> China demo corridor, while Vietnam and South Korea remain reference-only entries.
**Depends on**: Phase 1
**Requirements**: DASH-01, DASH-02, DASH-03, RATE-01, RATE-02, RATE-03
**Success Criteria** (what must be TRUE):
  1. User sees the demo digital account with the owner name, masked number `4756 •••• •••• 9018`, and starting balance `3 469.52 ЦР`.
  2. User sees the dashboard quick-action panel and can start the transfer scenario from the dashboard.
  3. User sees a simulated rates directory with country flag, country name, base value `1 ЦР`, and target CBDC rate for China, Vietnam, and South Korea.
**Plans**: 3 plans
Plans:
- [x] `02-01-PLAN.md` — Create the shared typed demo-data layer for the seeded account, quick actions, rates rows, and formatting helpers.
- [x] `02-02-PLAN.md` — Replace the dashboard placeholder with the seeded account card, quick-actions grid, and dashboard route tests.
- [x] `02-03-PLAN.md` — Replace the rates placeholder with the three-row rates board, corridor framing, and rates route tests.
**UI hint**: yes

### Phase 3: Transfer Draft & Quote Transparency
**Goal**: Users can compose the scripted Russia -> China transfer and understand the conversion details before they are allowed to submit it.
**Depends on**: Phase 2
**Requirements**: XFER-01, XFER-02, XFER-03, XFER-04, XFER-05, XFER-06, XFER-07
**Success Criteria** (what must be TRUE):
  1. User can choose the source account, choose transfer by card or phone, and select a saved recipient or enter a matching identifier manually.
  2. User can enter a debit amount and immediately see the recipient amount recalculated from the selected simulated rate.
  3. User sees the conversion preview before confirmation, including rate, debit amount, recipient amount, platform fee, and итог.
  4. User cannot continue when required fields are missing or when the entered amount exceeds the available balance.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Transaction Simulation & Receipt
**Goal**: Users can submit the scripted Russia -> China transfer, follow deterministic status updates through the corridor, and finish with a consistent electronic receipt.
**Depends on**: Phase 3
**Requirements**: XFER-08, TRCK-01, TRCK-02, TRCK-03, TRCK-04, TRCK-05
**Success Criteria** (what must be TRUE):
  1. User can confirm the transfer and receives a unique transaction or smart-contract identifier.
  2. User sees a step-by-step tracker that reflects routing through the Bank of Russia, the recipient-side central-bank step in China, and the final crediting stage.
  3. User sees deterministic status progression with the current step made explicit at each stage.
  4. User sees an electronic receipt whose sender, recipient, phone number, fee, and amounts match the values confirmed before submission.
**Plans**: TBD
**UI hint**: yes

### Phase 5: Demo Reset & Settings
**Goal**: Users can explain the MVP boundaries and restart the prototype from a clean seeded state for repeated demos.
**Depends on**: Phase 4
**Requirements**: DEMO-02, SETT-01
**Success Criteria** (what must be TRUE):
  1. User can open "Настройки" and read a concise explanation of the demo scope, usage scenario, and mocked-data boundaries.
  2. After finishing the scenario, user can reset the demo and return to the initial seeded state for another presentation run.
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Demo Shell & Boundaries | 4/4 | Complete   | 2026-04-08 |
| 2. Dashboard & Rates Context | 3/3 | Complete | 2026-04-08 |
| 3. Transfer Draft & Quote Transparency | 0/TBD | Not started | - |
| 4. Transaction Simulation & Receipt | 0/TBD | Not started | - |
| 5. Demo Reset & Settings | 0/TBD | Not started | - |
