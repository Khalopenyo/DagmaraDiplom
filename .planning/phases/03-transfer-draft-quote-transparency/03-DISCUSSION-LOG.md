# Phase 3: Transfer Draft & Quote Transparency - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 03-Transfer Draft & Quote Transparency
**Areas discussed:** Draft structure, Source account and corridor lock, Recipient capture, Quote policy, CTA boundary

---

## Draft structure

| Option | Description | Selected |
|--------|-------------|----------|
| One route with draft form plus derived quote preview | Keeps the editable transfer state and quote transparency visible in one desktop surface | ✓ |
| Multi-step wizard | Adds flow friction and hides the quote behind step transitions | |
| Multiple subroutes / tabs | Splits one scripted demo moment across extra navigation complexity | |

**User's choice:** One route with draft form plus derived quote preview
**Notes:** Auto-picked because the phase goal is clarity of the writable draft and quote transparency, not step choreography.

---

## Source account and corridor lock

| Option | Description | Selected |
|--------|-------------|----------|
| One seeded Dagmara account and fixed Russia -> China corridor | Reuses Phase 2 context and keeps the MVP numerically consistent | ✓ |
| Multiple executable accounts | Implies extra account logic before it serves the demo | |
| Corridor/country selector in the form | Creates multi-corridor scope before the first golden path is stable | |

**User's choice:** One seeded Dagmara account and fixed Russia -> China corridor
**Notes:** Auto-picked to preserve the single-corridor MVP and avoid drift from the already validated dashboard/rates context.

---

## Recipient capture

| Option | Description | Selected |
|--------|-------------|----------|
| Two-mode toggle plus favorites strip and editable identifier field | Covers both assisted and manual entry in one screen | ✓ |
| Favorites only | Speeds the demo but fails to show realistic entry behavior | |
| Freeform form only | Technically simpler but misses the requested favorite-recipient affordance | |

**User's choice:** Two-mode toggle plus favorites strip and editable identifier field
**Notes:** Auto-picked because it satisfies the requested UI elements while keeping the scenario visible and teachable.

---

## Quote policy

| Option | Description | Selected |
|--------|-------------|----------|
| Editable debit amount with derived recipient amount and flat deterministic fee | Keeps the quote math transparent and reusable across later phases | ✓ |
| Two editable amount fields | Ambiguous source of truth and easier to desynchronize | |
| Hidden fee until receipt | Makes the quote feel misleading and violates the transparency goal | |

**User's choice:** Editable debit amount with derived recipient amount and flat deterministic fee
**Notes:** Auto-picked because it keeps one writable source of truth and aligns with the research recommendation to derive later tracker/receipt values from the same draft snapshot.

---

## CTA boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Keep `Подтвердить`, but use it only as a readiness boundary until Phase 4 | Preserves the final flow language without prematurely starting processing | ✓ |
| Remove the confirmation CTA entirely | Weakens the shape of the final scripted journey | |
| Fully submit and start tracker in Phase 3 | Pulls `XFER-08` and tracking work forward out of scope | |

**User's choice:** Keep `Подтвердить`, but use it only as a readiness boundary until Phase 4
**Notes:** Auto-picked to keep scope clean while still shaping the final user journey.

---

## the agent's Discretion

- Exact desktop arrangement of form and quote cards
- Favorite-recipient chip visuals and avatar styling
- Helper copy for simulated quote and validation hints

## Deferred Ideas

- Actual submit side effects, transaction simulation and receipt generation
- Multi-corridor, best-rate or bridge-currency behavior
- Contact management and backend-shaped account orchestration
