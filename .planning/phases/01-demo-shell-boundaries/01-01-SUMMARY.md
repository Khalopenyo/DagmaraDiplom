---
phase: 01-demo-shell-boundaries
plan: 01
subsystem: ui
tags: [react, vite, vitest, tailwind, router]
provides:
  - installable React/Vite/Tailwind/Vitest baseline
  - branded frontend-only entry surface
  - shared test setup with jsdom and DOM matchers
affects: [phase-1-shell, phase-1-routing, dashboard, transfers, rates, settings]
tech-stack:
  added: [react-router, tailwindcss, "@tailwindcss/vite", vitest, jsdom, "@testing-library/react", "@testing-library/user-event", "@testing-library/jest-dom", "@fontsource-variable/manrope"]
  patterns: [vite-plus-vitest baseline, tokenized global stylesheet, frontend-only intro surface]
key-files:
  created: [package.json, vite.config.ts, src/main.tsx, src/App.tsx, src/styles/app.css, src/test/setup.ts]
  modified: [vite.config.ts]
key-decisions:
  - "Keep the bootstrap surface explicitly demo-safe before router work starts."
  - "Register @testing-library/jest-dom in the shared setup so later DOM matcher tests are valid."
patterns-established:
  - "Global styling lives in src/styles/app.css with shell tokens from UI-SPEC."
  - "Vitest configuration is centralized in vite.config.ts with jsdom and setupFiles."
requirements-completed: [NAVG-03, NAVG-04]
duration: "35min"
completed: 2026-04-08
---

# Phase 1: Bootstrap frontend baseline Summary

**Installable React/Vite desktop demo baseline with Tailwind tokens, Vitest harness, and a branded frontend-only entry surface**

## Performance

- **Duration:** 35 min
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments

- Bootstrapped the repo into a runnable React 19 + Vite 8 + Tailwind 4 workspace without touching planning artifacts.
- Added a shared jsdom/RTL test harness with `@testing-library/jest-dom` so later shell and routing tests can use DOM matchers safely.
- Replaced the starter screen with a Dagmara-branded intro card that clearly states the app is a frontend-only demo shell.

## Task Commits

1. **Task 1: Bootstrap the app from a safe temp scaffold instead of touching the repo root** - `76fc8cd`
2. **Task 2: Replace the starter screen with a demo-safe branded entry surface and theme tokens** - `4fc2eb3`

**Auto-fix after plan verification** - `88b3f5c`

## Files Created/Modified

- `package.json` - Defines the frontend-only stack, router dependency, Tailwind plugin, and Vitest toolchain.
- `vite.config.ts` - Registers React, Tailwind, jsdom, and shared test setup.
- `src/main.tsx` - Mounts the app through the shared global stylesheet.
- `src/App.tsx` - Renders the branded placeholder surface for the MVP shell.
- `src/styles/app.css` - Declares the global token contract, Manrope import, and first-screen layout styling.
- `src/test/setup.ts` - Registers DOM matchers and shared RTL cleanup.

## Decisions & Deviations

One planned deviation was required for correctness: `vite.config.ts` now imports `defineConfig` from `vitest/config` instead of `vite`, because the `test` block failed the TypeScript build under the plain Vite type surface. No scope was added beyond making the planned test harness type-safe.

## Next Phase Readiness

Phase `01-02` can now replace the temporary entry surface with the router tree without changing the toolchain again. The repository installs, type-checks, and builds cleanly, so the next plan can focus only on route metadata, copy contracts, and routing tests.
