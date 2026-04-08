---
phase: 01-demo-shell-boundaries
plan: 04
subsystem: ui
tags: [placeholders, demo-boundary, react-router, testing]
provides:
  - shared placeholder renderer for all Phase 1 top-level routes
  - route-specific demo framing with intro-card versus inline-helper treatments
  - in-shell not-found recovery card with dashboard return path
affects: [dashboard, transfers, rates, settings, phase-2-dashboard, phase-5-settings]
tech-stack:
  added: []
  patterns: [metadata-guarded page wrappers, shared placeholder renderer, phase-level route regression tests]
key-files:
  created: [src/pages/RoutePlaceholderPage.tsx, src/pages/RoutePlaceholders.test.tsx]
  modified: [src/pages/DashboardPage.tsx, src/pages/TransfersPage.tsx, src/pages/RatesPage.tsx, src/pages/SettingsPage.tsx, src/pages/NotFoundPage.tsx, src/pages/index.ts]
key-decisions:
  - "Keep CTA targets deterministic: dashboard advances to transfers, every other Phase 1 placeholder returns to dashboard."
  - "Use one shared renderer so disclaimer treatment and placeholder copy stay consistent across routed screens."
patterns-established:
  - "Each top-level page file validates the metadata it expects before rendering the shared placeholder."
  - "Phase-level tests cover route copy, badge persistence, CTA navigation, and unknown-route recovery in one router-aware suite."
requirements-completed: [DEMO-01]
duration: "33min"
completed: 2026-04-08
---

# Phase 1: Demo-safe route placeholders Summary

**Shared placeholder screens, deterministic CTA routing, and in-shell recovery state that make the Phase 1 shell visibly simulated on every route**

## Performance

- **Duration:** 33 min
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Replaced the generic routed stubs with metadata-driven placeholder screens that honor the approved `intro-card` and `inline-helper` boundary modes.
- Added deterministic CTA behavior so the dashboard advances to `/transfers`, while the remaining placeholder routes recover back to `/dashboard`.
- Implemented a shell-contained not-found state and a regression suite that verifies disclaimer copy, badge persistence, CTA navigation, and recovery behavior.

## Task Commits

1. **Task 1: Implement the Phase 1 route placeholders and boundary treatments** - `21a44fc`
2. **Task 2: Implement the not-found recovery state and phase-level content regression tests** - `b5dd6f6`

## Files Created/Modified

- `src/pages/RoutePlaceholderPage.tsx` - Renders the shared Phase 1 placeholder layout from route metadata.
- `src/pages/DashboardPage.tsx` - Validates and renders the dashboard placeholder with the transfer CTA.
- `src/pages/TransfersPage.tsx` - Validates and renders the transfers placeholder with dashboard recovery CTA.
- `src/pages/RatesPage.tsx` - Validates and renders the rates placeholder with inline helper framing.
- `src/pages/SettingsPage.tsx` - Validates and renders the settings placeholder with inline helper framing.
- `src/pages/NotFoundPage.tsx` - Renders the approved error copy and recovery CTA back to `/dashboard`.
- `src/pages/RoutePlaceholders.test.tsx` - Covers the four top-level routes plus unknown-route recovery inside the persistent shell.

## Decisions & Deviations

None - followed the plan as specified. The placeholder pages remain intentionally descriptive and do not introduce Phase 2 widgets, live rates, or backend-shaped flows.

## Next Phase Readiness

Phase `01-demo-shell-boundaries` now satisfies its user-visible demo-boundary contract and is ready to close. Phase `02` can build seeded account context and the rates directory on top of stable routed placeholders, persistent shell chrome, and route-level regression coverage.
