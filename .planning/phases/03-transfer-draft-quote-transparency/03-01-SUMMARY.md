---
phase: 03-transfer-draft-quote-transparency
plan: 01
subsystem: ui
tags: [react, typescript, mock-data, transfers, validation]
requires:
  - phase: 02-dashboard-rates-context
    provides: seeded Dagmara account context, China-first rates directory, and shared display helpers
provides:
  - shared typed transfer draft seed modules for source account, transfer modes, and favorite recipients
  - deterministic quote math and validation helpers for the locked Russia -> China corridor
affects: [transfers, transaction-tracking, receipt]
tech-stack:
  added: []
  patterns: [shared transfer demo modules, deterministic quote helpers, pure draft validation]
key-files:
  created: [src/demo/transferOptions.ts, src/demo/favoriteRecipients.ts, src/demo/transferQuote.ts, src/demo/transferQuote.test.ts]
  modified: [src/demo/types.ts, src/demo/index.ts]
key-decisions:
  - "Keep all Phase 3 transfer seeds in src/demo so later route and tracker phases read one local source of truth."
  - "Keep quote math and draft validation pure and synchronous so UI components only compose state instead of embedding financial rules."
patterns-established:
  - "src/demo/index.ts remains the single import surface for transfer draft seeds and helpers."
  - "Transfer quote display strings are derived in helper functions, not assembled inside route components."
requirements-completed: [XFER-01, XFER-02, XFER-03, XFER-04, XFER-05, XFER-06, XFER-07]
duration: "3min"
completed: 2026-04-09
---

# Phase 3 Plan 01: Shared transfer draft domain Summary

**Typed transfer seed data plus deterministic quote and validation helpers for the locked Russia -> China corridor**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-09T04:23:00+03:00
- **Completed:** 2026-04-09T04:26:00+03:00
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Added one shared `src/demo` source of truth for the transfer source account, transfer modes, and favorite recipients.
- Encoded the locked quote contract for `1 ЦР = 2.234 ЦЮ`, `10 ₽` platform fee, and `100 -> 223.40 ¥` deterministic conversion behavior.
- Added pure draft validation so Phase 3 UI can gate empty, mismatched, and over-balance states without router or backend coupling.

## Task Commits

1. **Task 1: Add typed transfer seeds for account selection, transfer modes, and favorite recipients** - `e26436c` (feat)
2. **Task 2: Add deterministic quote math and draft validation helpers with unit coverage** - `47e375b` (test), `4dfae0a` (feat)

## Files Created/Modified

- `src/demo/types.ts` - Extends the shared mock-data contracts with transfer modes, recipients, quote shape, and validation results.
- `src/demo/transferOptions.ts` - Stores the single executable Dagmara source account, mode labels, placeholders, and locked rate label.
- `src/demo/favoriteRecipients.ts` - Stores the seeded `Emma` and `Justin` recipient prefills plus the `+` display affordance.
- `src/demo/transferQuote.ts` - Provides deterministic quote math and draft validation helpers for the transfer route.
- `src/demo/transferQuote.test.ts` - Proves the locked conversion math and invalid-state rules with unit coverage.
- `src/demo/index.ts` - Re-exports the transfer seeds and helper API from one stable barrel.

## Decisions Made

- Kept all Phase 3 transfer draft seeds inside `src/demo/*` instead of page-local literals so Phase 4 can reuse the same amounts and prefills.
- Kept quote math and validation pure and synchronous so `/transfers` can remain a thin composition layer.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

`03-02` can now build the real `/transfers` form from shared transfer seeds, and `03-03` can wire the route into reusable quote and validation helpers without duplicating financial literals. No blockers remain for Wave 2.

---
*Phase: 03-transfer-draft-quote-transparency*
*Completed: 2026-04-09*
