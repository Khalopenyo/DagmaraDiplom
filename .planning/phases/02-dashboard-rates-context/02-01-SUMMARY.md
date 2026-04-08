---
phase: 02-dashboard-rates-context
plan: 01
subsystem: ui
tags: [react, typescript, mock-data, dashboard, rates]
requires:
  - phase: 01-demo-shell-boundaries
    provides: persistent shell, centered content canvas, and canonical demo copy
provides:
  - shared typed seed modules for the dashboard account, quick actions, and rates board
  - reusable numeric formatting helpers for balance and rate displays
affects: [dashboard, rates, transfer-flow, receipt]
tech-stack:
  added: []
  patterns: [shared demo seed modules, typed local mock data, reusable financial formatting helpers]
key-files:
  created: [src/demo/types.ts, src/demo/accountSummary.ts, src/demo/quickActions.ts, src/demo/cbdcRates.ts, src/demo/formatters.ts, src/demo/index.ts]
  modified: []
key-decisions:
  - "Keep Phase 2 seed data in src/demo modules so dashboard, rates, and later transfer steps read one source of truth."
  - "Store rates as numeric values and format them at render time to keep future conversion logic deterministic."
patterns-established:
  - "src/demo/index.ts is the single import surface for seeded dashboard and rates data."
  - "formatAmountWithCurrency and formatRateValue own display formatting instead of page-local string assembly."
requirements-completed: [DASH-01, DASH-02, RATE-01, RATE-02, RATE-03]
duration: "4min"
completed: 2026-04-08
---

# Phase 2 Plan 01: Shared demo data layer Summary

**Typed local seed modules for Dagmara account context, quick-action metadata, China-first rates data, and reusable display formatters**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-08T16:54:00+03:00
- **Completed:** 2026-04-08T16:57:45+03:00
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Added one shared `src/demo` source of truth for the seeded account summary, quick-action grid metadata, and rates rows.
- Encoded the exact Phase 2 values for `Дагмара`, `4756 •••• •••• 9018`, `3 469.52 ЦР`, and the China/Vietnam/South Korea rate set without any async or backend-shaped plumbing.
- Added reusable decimal and currency formatting helpers so later phases can reuse the same balance and rate display rules.

## Task Commits

1. **Task 1: Create typed account and quick-action demo contracts** - `75672f3` (feat)
2. **Task 2: Create seeded rates data, formatting helpers, and barrel exports** - `b02599c` (feat)

## Files Created/Modified

- `src/demo/types.ts` - Defines the typed contracts for account, quick action, and rates seed data.
- `src/demo/accountSummary.ts` - Stores the fixed Dagmara account identity and starting balance.
- `src/demo/quickActions.ts` - Stores the exact eight dashboard quick actions with only `Переводы` route-enabled.
- `src/demo/cbdcRates.ts` - Stores the China-first simulated rates directory with reference-only rows for Vietnam and South Korea.
- `src/demo/formatters.ts` - Provides shared helpers for `3 469.52 ЦР` and three-decimal rate formatting.
- `src/demo/index.ts` - Re-exports the Phase 2 demo data and helper API from one stable entrypoint.

## Decisions Made

- Kept Phase 2 seed data in `src/demo/*` instead of page-local literals so later phases can reuse the same exact values.
- Stored rates as numeric values and formatted them through helpers to support later conversion math without reparsing strings.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

`02-02` can now render the dashboard from shared seeded account and quick-action data, and `02-03` can build the rates board from the same deterministic source. No blockers remain for Wave 2.

---
*Phase: 02-dashboard-rates-context*
*Completed: 2026-04-08*
