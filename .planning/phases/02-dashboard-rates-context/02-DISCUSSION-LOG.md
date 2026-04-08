# Phase 2: Dashboard & Rates Context - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 02-Dashboard & Rates Context
**Areas discussed:** Dashboard account framing, Quick actions, Rates directory, Demo data posture

---

## Dashboard account framing

| Option | Description | Selected |
|--------|-------------|----------|
| Single primary account card | One seeded digital-ruble account for Dagmara with masked number and balance as the first content block | ✓ |
| Multi-account overview | Several accounts or tabs before the transfer corridor context becomes visible | |
| Metrics dashboard | Charts, summary counters or activity-led landing page | |

**User's choice:** Single primary account card
**Notes:** Auto-picked as the safest default for `gsd-next` in non-interactive mode. It satisfies `DASH-01` directly and keeps the main demo corridor legible.

---

## Quick actions

| Option | Description | Selected |
|--------|-------------|----------|
| Display-first 2x4 grid, only `Переводы` actionable | Shows all required actions while keeping only the corridor CTA live in Phase 2 | ✓ |
| All eight actions fully clickable | Implies eight separate downstream flows before they exist | |
| Minimal shortcut row | Reduces scope but fails the required eight-item quick-actions panel | |

**User's choice:** Display-first 2x4 grid, only `Переводы` actionable
**Notes:** Auto-picked because it meets `DASH-02` and `DASH-03` without creating false affordances or backend-shaped promises.

---

## Rates directory

| Option | Description | Selected |
|--------|-------------|----------|
| Three-row card/table with China highlighted first | China stays the active demo corridor; Vietnam and South Korea remain reference-only | ✓ |
| Dense financial table with many controls | Feels like back-office tooling and adds scope not required by Phase 2 | |
| Carousel or card deck by country | Looks decorative but weakens quick comparability of `1 ЦР` rates | |

**User's choice:** Three-row card/table with China highlighted first
**Notes:** Auto-picked because it best matches `RATE-01..03`, preserves comparison clarity and avoids implying multi-corridor execution.

---

## Demo data posture

| Option | Description | Selected |
|--------|-------------|----------|
| Shared typed mock-data modules | One local source of truth for account and rates reused by later phases | ✓ |
| Inline constants inside each page | Fastest short-term path but duplicates seeded values across the app | |
| Fake async API wrapper | Adds backend-shaped complexity before it is needed | |

**User's choice:** Shared typed mock-data modules
**Notes:** Auto-picked because it keeps the frontend-only posture intact while preparing Phase 3 to reuse the same seeded numbers without drift.

---

## the agent's Discretion

- Exact visual treatment for flags and reference-only badges
- Internal file split for mock data modules
- Supporting helper copy inside dashboard and rates cards

## Deferred Ideas

- Recent activity / history block on dashboard
- Multi-corridor switcher and advanced rates interactions
- Live FX refresh, analytics widgets, or editable account management
