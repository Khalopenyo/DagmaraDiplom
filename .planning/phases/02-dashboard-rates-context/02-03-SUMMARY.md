---
phase: 02-dashboard-rates-context
plan: 03
subsystem: ui
tags: [react, rates, testing, routing, tailwind]
requires:
  - phase: 02-dashboard-rates-context
    provides: shared rates directory data and formatters from 02-01
provides:
  - three-row simulated rates board for China, Vietnam, and South Korea
  - explicit corridor framing that keeps China primary and the other rows reference-only
  - route-level rates regression coverage for ordering, exact values, and row framing
affects: [dashboard, rates, transfer-flow]
tech-stack:
  added: []
  patterns: [feature-level row composition, route-scoped TDD, seeded-contract invariants]
key-files:
  created: [src/features/rates/flagBadges.tsx, src/features/rates/RatesBoard.tsx, src/features/rates/RateRow.tsx, src/pages/RatesPage.test.tsx]
  modified: [src/pages/RatesPage.tsx]
key-decisions:
  - "Keep the rates route read-only in Phase 2 and express corridor priority through explicit row framing instead of executable controls."
  - "Enforce the seeded country order and exact simulated rate values with runtime invariants inside RatesBoard."
patterns-established:
  - "RatesPage composes canonical demo framing, route metadata, and a dedicated board component instead of placeholder logic."
  - "Route-level tests assert user-visible corridor framing and exact seeded values rather than styling-only implementation details."
requirements-completed: [RATE-01, RATE-02, RATE-03]
duration: "4min"
completed: 2026-04-08
---

# Phase 2 Plan 03: Rates context Summary

**Three-row simulated CBDC rates board with explicit China-first corridor framing and route-level regression coverage**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-08T17:08:00+03:00
- **Completed:** 2026-04-08T17:16:00+03:00
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Replaced the generic rates placeholder with a real seeded board for `Китай`, `Вьетнам`, and `Южная Корея`.
- Rendered the repeated base label `1 ЦР` plus the exact seeded values `2.234`, `1.746`, and `5.151` from the shared demo directory.
- Added explicit corridor framing so China reads as `Основной маршрут` while Vietnam and South Korea stay visible as `Справочно`.
- Added route-level tests that prove ordering, exact values, and primary/reference-only framing on `/rates`.

## Task Commits

1. **Task 1: Implement the three-row simulated rates board** - `4386751` (feat)
2. **Task 2 RED: Add failing rates route regression tests for exact values and ordering** - `a21b084` (test)
3. **Task 2 GREEN: Add corridor framing and accessibility hooks for route-level verification** - `1a17549` (feat)

## Files Created/Modified

- `src/features/rates/flagBadges.tsx` - Supplies lightweight local country markers for the three simulated corridors.
- `src/features/rates/RatesBoard.tsx` - Wraps the read-only directory, enforces the seeded country/rate contract, and maps rows in canonical order.
- `src/features/rates/RateRow.tsx` - Renders one country row with `1 ЦР`, exact target rate, and explicit primary/reference corridor framing.
- `src/pages/RatesPage.tsx` - Replaces the placeholder route with the Phase 2 rates page composition.
- `src/pages/RatesPage.test.tsx` - Verifies row order, exact values, and corridor framing on the real route.

## Decisions Made

- Kept the Phase 2 rates directory strictly read-only so it supports the demo narrative without implying multi-corridor execution.
- Used visible labels and accessible row grouping to prove corridor priority in tests without coupling coverage to CSS class names.

## Deviations from Plan

None

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 3 can treat `/rates` as a stable pre-transfer context step. The fixed Russia -> China corridor is now visible and test-covered before the editable transfer flow begins.

---
*Phase: 02-dashboard-rates-context*
*Completed: 2026-04-08*
