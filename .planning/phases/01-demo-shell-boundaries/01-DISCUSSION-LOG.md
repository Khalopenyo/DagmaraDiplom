# Phase 1: Demo Shell & Boundaries - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 01-demo-shell-boundaries
**Areas discussed:** Shell structure, Navigation model, Header behavior, Demo framing, Desktop translation

---

## Shell structure

| Option | Description | Selected |
|--------|-------------|----------|
| Persistent `AppShell` | One shared layout with sidebar, header, and routed content | ✓ |
| Per-page chrome | Each page owns its own local header/sidebar composition | |
| Single long dashboard | One scrolling page with anchored sections instead of routed screens | |

**User's choice:** `[auto] Persistent AppShell`
**Notes:** Auto-selected recommended default because Phase 1 is specifically about shell and navigation boundaries.

---

## Navigation model

| Option | Description | Selected |
|--------|-------------|----------|
| Four routed sections | `Главная`, `Переводы`, `Обмен валют`, `Настройки` as distinct SPA routes | ✓ |
| One page with tabs | Single route with internal tab switching | |
| Wizard-first only | Force the user directly into a stepper-style transfer flow | |

**User's choice:** `[auto] Four routed sections`
**Notes:** Best match for roadmap scope and future phase separation.

---

## Header behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Display-first shell controls | Greeting, search, notifications are visible now; deeper logic can come later | ✓ |
| Clickable stub drawers | Search and notifications open fake drawers in Phase 1 | |
| Fully functional utilities | Build complete search/notification behaviors in Phase 1 | |

**User's choice:** `[auto] Display-first shell controls`
**Notes:** Keeps Phase 1 within scope while satisfying `NAVG-02`.

---

## Demo framing

| Option | Description | Selected |
|--------|-------------|----------|
| Header chip only | Minimal `Simulated demo` tag in the shell | |
| Persistent shell marker + concise inline disclaimer | Clear simulation boundary without turning the UI into a legal notice | ✓ |
| Settings-only disclaimer | Put the explanation only on the settings page | |

**User's choice:** `[auto] Persistent shell marker + concise inline disclaimer`
**Notes:** Recommended because research flagged misleading-real-system perception as the main Phase 1 risk.

---

## Desktop translation

| Option | Description | Selected |
|--------|-------------|----------|
| Centered card-based desktop adaptation | Preserve mobile visual logic with bounded content width and generous spacing | ✓ |
| Dense enterprise layout | Fill the screen with heavy data panels and compact controls | |
| Edge-to-edge showcase canvas | Remove width constraints and lean into presentation graphics | |

**User's choice:** `[auto] Centered card-based desktop adaptation`
**Notes:** Best fit for the mobile-to-desktop adaptation goal in `PROJECT.md`.

---

## the agent's Discretion

- Exact typography, spacing scale, and motion details inside the chosen shell pattern
- Placeholder behavior for search and notifications
- Visual treatment of the simulation marker as long as it remains visible and concise

## Deferred Ideas

None.
