---
phase: 01-demo-shell-boundaries
plan: 02
subsystem: ui
tags: [react-router, routing, copy, tests]
provides:
  - top-level route tree with root redirect
  - canonical route metadata and demo copy constants
  - route smoke tests with MemoryRouter helper
affects: [phase-1-shell, phase-1-placeholders, dashboard, transfers, rates, settings]
tech-stack:
  added: []
  patterns: [BrowserRouter wrapper isolation, metadata-driven routes, MemoryRouter render helper]
key-files:
  created: [src/app/AppRouter.tsx, src/app/AppRoutes.tsx, src/content/topLevelRoutes.ts, src/content/demoCopy.ts, src/test/renderApp.tsx, src/app/AppRouter.test.tsx]
  modified: [src/App.tsx, src/pages/DashboardPage.tsx, src/pages/TransfersPage.tsx, src/pages/RatesPage.tsx, src/pages/SettingsPage.tsx, src/pages/NotFoundPage.tsx, src/pages/index.ts]
key-decisions:
  - "Keep BrowserRouter isolated in AppRouter so future router-mode changes stay one-file deep."
  - "Freeze route labels, titles, CTA labels, and boundary modes in one typed source before shell work."
patterns-established:
  - "AppRoutes owns pure route declarations and can be tested under MemoryRouter."
  - "Phase-level copy constants live in src/content rather than inline page strings."
requirements-completed: [NAVG-03]
duration: "24min"
completed: 2026-04-08
---

# Phase 1: Lock router and copy contracts Summary

**Root redirect, typed top-level route metadata, canonical demo-copy constants, and routing smoke tests for the Phase 1 SPA**

## Performance

- **Duration:** 24 min
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments

- Switched the app root from the branded bootstrap screen to a `BrowserRouter` entry with the Phase 1 route tree.
- Locked the four top-level sections and the shared demo copy into typed content modules so later shell and page work cannot drift.
- Added a reusable `MemoryRouter` render helper and smoke tests for `/`, `/rates`, and the unknown-route fallback.

## Task Commits

1. **Task 1: Replace the bootstrap placeholder with the Phase 1 router and copy contracts** - `781981d`
2. **Task 2: Add route smoke tests and a reusable router-aware render helper** - `351162d`

## Files Created/Modified

- `src/App.tsx` - Hands the root render over to `AppRouter`.
- `src/app/AppRouter.tsx` - Isolates `BrowserRouter` from the rest of the app tree.
- `src/app/AppRoutes.tsx` - Owns the redirect and top-level route declarations.
- `src/content/topLevelRoutes.ts` - Freezes route labels, titles, CTA labels, and boundary modes.
- `src/content/demoCopy.ts` - Freezes canonical demo boundary, empty-state, and not-found copy.
- `src/test/renderApp.tsx` - Renders route trees under `MemoryRouter` for tests.
- `src/app/AppRouter.test.tsx` - Verifies the root redirect, known route rendering, and in-app fallback.

## Decisions & Deviations

None - followed the plan as specified. The route pages stay stub-only and intentionally avoid shell layout, data widgets, and live-banking claims until later plans.

## Next Phase Readiness

Phase `01-03` can now wrap the route tree in a persistent `AppShell` without revisiting route ownership, labels, or disclaimer copy. The shell work only needs to consume `TOP_LEVEL_ROUTES`, `SHELL_BADGE_LABEL`, and the existing router tests/helpers.
