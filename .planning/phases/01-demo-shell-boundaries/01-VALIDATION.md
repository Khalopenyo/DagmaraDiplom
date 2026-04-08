---
phase: 01
slug: demo-shell-boundaries
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-08
---

# Phase 01 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `Vitest 4.1.3 + React Testing Library 16.3.2 + jsdom 29.0.2` |
| **Config file** | `vite.config.ts` with `test.environment = "jsdom"` and `test.setupFiles = ["./src/test/setup.ts"]` |
| **Quick run command** | `npm exec tsc --noEmit` |
| **Full suite command** | `npm run test -- --run && npm run build` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm exec tsc --noEmit`
- **After every plan wave:** Run the task-specific automated command for that wave
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | NAVG-03, NAVG-04 | setup | `npm install` | ✅ planned | ⬜ pending |
| 01-01-02 | 01 | 1 | DEMO-01, NAVG-04 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 01-02-01 | 02 | 2 | NAVG-03, DEMO-01 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 01-02-02 | 02 | 2 | NAVG-03 | integration | `npm run test -- src/app/AppRouter.test.tsx --run` | ✅ planned | ⬜ pending |
| 01-03-01 | 03 | 3 | NAVG-01, NAVG-02, NAVG-04 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 01-03-02 | 03 | 3 | NAVG-01, NAVG-02, NAVG-03, NAVG-04 | integration | `npm run test -- src/shell/AppShell.test.tsx --run` | ✅ planned | ⬜ pending |
| 01-04-01 | 04 | 4 | DEMO-01, NAVG-04 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 01-04-02 | 04 | 4 | DEMO-01, NAVG-03 | integration | `npm run test -- src/pages/RoutePlaceholders.test.tsx --run` | ✅ planned | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `package.json` — install `react`, `react-dom`, `react-router`, `tailwindcss`, `@tailwindcss/vite`, `@fontsource-variable/manrope`
- [ ] `vite.config.ts` — add `react()`, `tailwindcss()`, and `test.environment = "jsdom"`
- [ ] `src/test/setup.ts` — shared RTL setup and cleanup hooks
- [ ] `src/app/AppRouter.test.tsx` — covers root redirect, route availability, and SPA routing smoke tests
- [ ] `src/shell/AppShell.test.tsx` — covers sidebar, header chrome, and shell persistence
- [ ] `src/pages/RoutePlaceholders.test.tsx` — covers placeholder copy, not-found recovery, and demo-boundary visibility
- [ ] Framework install: `npm install -D vitest jsdom @testing-library/react @testing-library/user-event`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Simulation badge feels visible but not visually dominant on every top-level route | DEMO-01 | Visual hierarchy and presentation quality are subjective in a way automated assertions cannot fully validate | Open `/dashboard`, `/transfers`, `/rates`, `/settings`; confirm `Simulated demo` is visible without overwhelming the intro card or title |
| Main content feels centered within the desktop shell on a typical laptop viewport | NAVG-04 | Automated tests can assert max-width classes, but not perceived spatial balance | Run the app at approximately `1440x900`; confirm sidebar, header, and main canvas preserve the `264px / 80px / 1200px` shell contract from `01-UI-SPEC.md` |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 20s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-08
