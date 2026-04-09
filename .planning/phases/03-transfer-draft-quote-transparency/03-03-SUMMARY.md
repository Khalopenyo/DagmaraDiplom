---
phase: 03-transfer-draft-quote-transparency
plan: 03
subsystem: ui
tags: [react, typescript, transfers, quote, validation]
requires:
  - phase: 03-transfer-draft-quote-transparency
    provides: live `/transfers` draft form route with local state and route-level interaction coverage
provides:
  - persistent quote preview card with deterministic corridor math
  - confirm gating tied to reusable validation helpers
affects: [transfers, transaction-tracking, receipt]
tech-stack:
  added: []
  patterns: [route-derived quote composition, disabled-state CTA gating, shared validation through demo barrel]
key-files:
  created: [src/features/transfers/QuotePreviewCard.tsx]
  modified: [src/features/transfers/TransferDraftForm.tsx, src/pages/TransfersPage.tsx, src/pages/TransfersPage.test.tsx, src/demo/transferQuote.ts, src/demo/index.ts]
key-decisions:
  - "Keep the quote visible on the same route as the draft form so conversion math never becomes a hidden step."
  - "Treat `Подтвердить` as a readiness boundary only; no router transition or fake transaction creation in Phase 3."
patterns-established:
  - "TransfersPage derives quote and validation from local draft state, then passes those results into presentational transfer primitives."
  - "QuotePreviewCard owns corridor transparency and CTA messaging while remaining side-effect free."
requirements-completed: [XFER-05, XFER-06, XFER-07]
duration: "6min"
completed: 2026-04-09
---

# Phase 3 Plan 03: Quote transparency Summary

**Side-by-side transfer quote preview with deterministic conversion math, visible fee breakdown, and disabled-state confirm gating**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-09T04:31:00+03:00
- **Completed:** 2026-04-09T04:37:00+03:00
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Added a real quote preview card for corridor Россия → Китай with the fixed rate line, recipient amount, platform fee, and total.
- Wired `TransfersPage` into reusable deterministic helpers so quote outputs and confirm state react immediately to form edits.
- Extended route-level regression coverage for recalculation, breakdown visibility, and valid versus invalid confirm states.

## Task Commits

1. **Task 1: Implement the quote preview card and wire draft state into deterministic quote helpers** - `1316df4` (feat)
2. **Task 2: Extend route tests for amount recalculation and confirm gating** - `522745e` (test)

## Files Created/Modified

- `src/features/transfers/QuotePreviewCard.tsx` - Renders the deterministic corridor quote, fee breakdown, and local-only `Подтвердить` CTA.
- `src/features/transfers/TransferDraftForm.tsx` - Consumes helper-derived validation messages while keeping debit amount as the editable source of truth.
- `src/pages/TransfersPage.tsx` - Derives quote and validation from route-local draft state and composes the two-column form plus quote layout.
- `src/pages/TransfersPage.test.tsx` - Verifies recalculation to `223.40 ¥`, fee `10 ₽`, total `110 ₽`, and confirm gating.
- `src/demo/transferQuote.ts` - Tightens draft validation to reject non-finite debit values before UI composition.
- `src/demo/index.ts` - Re-exports quote helpers through the shared barrel used by the route.

## Decisions Made

- Kept quote transparency on the same route as the editable form so the MVP shows conversion logic without a wizard step.
- Kept `Подтвердить` local-only in Phase 3 to avoid implying that settlement or central-bank processing has already started.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Closed helper export and invalid-number validation gaps during route wiring**
- **Found during:** Task 1 (Implement the quote preview card and wire draft state into deterministic quote helpers)
- **Issue:** `TransfersPage` could not safely consume quote helpers through the shared demo barrel, and `validateTransferDraft` did not reject non-finite debit values.
- **Fix:** Re-exported `buildTransferQuote` and `validateTransferDraft` from `src/demo/index.ts` and added a `Number.isFinite` guard in `src/demo/transferQuote.ts`.
- **Files modified:** `src/demo/index.ts`, `src/demo/transferQuote.ts`
- **Verification:** `npm run test -- src/demo/transferQuote.test.ts --run`, `npm run test -- src/pages/TransfersPage.test.tsx --run`, `npm exec tsc --noEmit`
- **Committed in:** `1316df4` (part of task commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** The auto-fix was necessary for correctness and kept the quote route safely deterministic. No scope creep.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Phase 4 can now reuse the same deterministic quote values and validated draft state to generate a transaction ID, tracker steps, and receipt content without redefining core money math.

---
*Phase: 03-transfer-draft-quote-transparency*
*Completed: 2026-04-09*
