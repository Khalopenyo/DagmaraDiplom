---
phase: 01-demo-shell-boundaries
plan: 03
subsystem: ui
tags: [react-router, layout, shell, navigation, tests]
provides:
  - persistent desktop shell with sidebar, header, and centered content canvas
  - metadata-driven sidebar navigation across the four top-level routes
  - regression tests proving shell persistence across SPA navigation
affects: [phase-1-placeholders, dashboard, transfers, rates, settings]
tech-stack:
  added: []
  patterns: [layout-route shell composition, metadata-driven nav chrome, route-persistent shell state]
key-files:
  created: [src/shell/AppShell.tsx, src/shell/SidebarNav.tsx, src/shell/TopHeader.tsx, src/shell/GlobalSearchStub.tsx, src/shell/NotificationButton.tsx, src/shell/PageContainer.tsx, src/shell/ShellCard.tsx, src/shell/StatusBadge.tsx, src/shell/icons.tsx, src/shell/AppShell.test.tsx]
  modified: [src/app/AppRoutes.tsx]
key-decisions:
  - "Keep shell chrome mounted above all top-level routes so search state survives navigation."
  - "Drive sidebar links from route metadata instead of hardcoding labels in the shell."
patterns-established:
  - "AppRoutes owns the layout route while AppShell owns only desktop chrome and Outlet framing."
  - "PageContainer enforces the 1200px shell canvas and 760px narrative column contract for all routed pages."
requirements-completed: [NAVG-01, NAVG-02, NAVG-03, NAVG-04]
duration: "26min"
completed: 2026-04-08
---

# Phase 1: Persistent shell and SPA navigation Summary

**Desktop shell primitives, layout-route wiring, and regression tests that prove header/sidebar chrome persists across route changes**

## Performance

- **Duration:** 26 min
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments

- Added the full Phase 1 desktop shell: fixed-width sidebar, 80px header, centered `1200px` content canvas, and `760px` narrative column.
- Wired the shell into the route tree as a layout route so all top-level pages share one persistent header and sidebar.
- Added regression coverage that verifies navigation labels, required header controls, and search-value persistence across SPA route changes.

## Task Commits

1. **Task 1: Build shell primitives for sidebar, header, and content framing** - `a3c1cbb`
2. **Task 2: Wire the shell as the persistent layout route and prove SPA navigation behavior** - `913e06b`

## Files Created/Modified

- `src/shell/AppShell.tsx` - Defines the desktop shell and renders routed page content through `Outlet`.
- `src/shell/SidebarNav.tsx` - Maps `TOP_LEVEL_ROUTES` into persistent sidebar navigation with active-state styling.
- `src/shell/TopHeader.tsx` - Renders the Dagmara greeting, faux-search, shell badge, and notifications control.
- `src/shell/PageContainer.tsx` - Locks routed screens to the `1200px`/`760px` layout contract from the UI spec.
- `src/shell/AppShell.test.tsx` - Verifies shell chrome, route transitions, and non-remounting search state.
- `src/app/AppRoutes.tsx` - Wraps all top-level routes in `element={<AppShell />}` while keeping the root redirect intact.

## Decisions & Deviations

None - followed the plan as specified. `src/test/renderApp.tsx` already supported route-targeted rendering, so no extra helper changes were necessary.

## Next Phase Readiness

Phase `01-04` can now replace the stub pages with real placeholder content inside a stable shell without touching the layout contract again. The route tree, nav chrome, and shared spacing constraints are now fixed and test-backed.
