---
phase: 02
slug: dashboard-rates-context
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-08
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `Vitest 4.1.3 + React Testing Library 16.3.2 + @testing-library/jest-dom + jsdom 29.0.2` |
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
| 02-01-01 | 01 | 1 | DASH-01, DASH-02, RATE-01, RATE-02, RATE-03 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 02-01-02 | 01 | 1 | DASH-01, DASH-02, RATE-01, RATE-02, RATE-03 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 02-02-01 | 02 | 2 | DASH-01, DASH-03 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 02-02-02 | 02 | 2 | DASH-01, DASH-02, DASH-03 | integration | `npm run test -- src/pages/DashboardPage.test.tsx --run` | ✅ planned | ⬜ pending |
| 02-03-01 | 03 | 2 | RATE-01, RATE-02, RATE-03 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 02-03-02 | 03 | 2 | RATE-01, RATE-02, RATE-03 | integration | `npm run test -- src/pages/RatesPage.test.tsx --run` | ✅ planned | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dashboard visual hierarchy makes the account summary card clearly primary over the quick-actions grid | DASH-01, DASH-02 | Automated tests can assert strings and structure, but not perceived emphasis | Open `/dashboard` on a laptop-width viewport and confirm the balance card reads as the first focal surface |
| China corridor row feels primary without making Vietnam and South Korea look unavailable or broken | RATE-03 | Visual emphasis quality is subjective and better checked in-browser | Open `/rates`; confirm China is visually highlighted while the other two rows still read as valid reference entries |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 20s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-08
