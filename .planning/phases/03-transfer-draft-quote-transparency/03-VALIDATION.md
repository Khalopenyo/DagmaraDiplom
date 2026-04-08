---
phase: 03
slug: transfer-draft-quote-transparency
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-08
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | `Vitest 4.1.3 + React Testing Library 16.3.2 + @testing-library/jest-dom + jsdom 29.0.2` |
| **Config file** | `vite.config.ts` with `test.environment = "jsdom"` and `test.setupFiles = ["./src/test/setup.ts"]` |
| **Quick run command** | `npm exec tsc --noEmit` |
| **Full suite command** | `npm run test -- --run && npm run build` |
| **Estimated runtime** | ~25 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm exec tsc --noEmit`
- **After every plan wave:** Run the task-specific automated command for that wave
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 25 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | XFER-01, XFER-02, XFER-03 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 03-01-02 | 01 | 1 | XFER-04, XFER-05, XFER-06, XFER-07 | unit | `npm run test -- src/demo/transferQuote.test.ts --run` | ✅ planned | ⬜ pending |
| 03-02-01 | 02 | 2 | XFER-01, XFER-02, XFER-03, XFER-04 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 03-02-02 | 02 | 2 | XFER-01, XFER-02, XFER-03, XFER-04 | integration | `npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned | ⬜ pending |
| 03-03-01 | 03 | 3 | XFER-05, XFER-06 | static + types | `npm exec tsc --noEmit` | ✅ planned | ⬜ pending |
| 03-03-02 | 03 | 3 | XFER-05, XFER-06, XFER-07 | integration | `npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing shell, route tree, demo copy, and page test helpers from Phases 1-2 already cover route mounting and top-level navigation.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Form card and quote card remain readable side by side on a laptop-width viewport | XFER-05, XFER-06 | Automated tests can assert strings and structure, but not perceived layout balance | Open `/transfers` on a laptop-width viewport and confirm the quote stays visible without visually crushing the form |
| The valid `Подтвердить` state feels like the final draft boundary rather than a live settlement action | XFER-06, XFER-07 | Tone, emphasis and affordance quality are subjective | Fill the form with a valid draft and confirm the CTA reads as "ready to proceed" rather than "money already moved" |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 25s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-08
