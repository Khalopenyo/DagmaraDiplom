---
phase: 01
slug: demo-shell-boundaries
status: approved
nyquist_compliant: true
wave_0_complete: false
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
| **Quick run command** | `npx vitest run src/app/__tests__/shell-routing.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/app/__tests__/shell-routing.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | NAVG-03 | setup | `npm install` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | NAVG-03 | integration | `npx vitest run src/app/__tests__/shell-routing.test.tsx` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 2 | NAVG-01, NAVG-02, NAVG-04 | integration | `npm exec tsc --noEmit` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 2 | NAVG-01, NAVG-02, NAVG-03, NAVG-04 | integration | `npx vitest run src/shell/AppShell.test.tsx` | ❌ W0 | ⬜ pending |
| 01-03-01 | 03 | 3 | DEMO-01 | integration | `npx vitest run src/app/__tests__/demo-boundary.test.tsx` | ❌ W0 | ⬜ pending |
| 01-03-02 | 03 | 3 | NAVG-01, NAVG-02, NAVG-03, NAVG-04, DEMO-01 | build + integration | `npm run build && npx vitest run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `package.json` — install `react`, `react-dom`, `react-router`, `tailwindcss`, `@tailwindcss/vite`, `@fontsource-variable/manrope`
- [ ] `vite.config.ts` — add `react()`, `tailwindcss()`, and `test.environment = "jsdom"`
- [ ] `src/test/setup.ts` — shared RTL setup and cleanup hooks
- [ ] `src/app/__tests__/app-shell.test.tsx` — covers `NAVG-01`, `NAVG-02`
- [ ] `src/app/__tests__/shell-routing.test.tsx` — covers `NAVG-03`
- [ ] `src/app/__tests__/page-container.test.tsx` — covers `NAVG-04`
- [ ] `src/app/__tests__/demo-boundary.test.tsx` — covers `DEMO-01`
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
