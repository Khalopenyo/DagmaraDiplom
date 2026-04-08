# Phase 2: Dashboard & Rates Context - Research

**Researched:** 2026-04-08
**Domain:** Read-only dashboard and rates context for the scripted Russia -> China CBDC demo
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
### Dashboard account framing
- **D-01:** `Главная` должна начинаться с одного основного виджета цифрового счета для фиксированного demo-пользователя `Дагмара`, а не с набора нескольких счетов, графиков или ленты операций.
- **D-02:** Виджет счета показывает имя владельца, маскированный номер `4756 •••• •••• 9018` и стартовый баланс `3 469.52 ЦР` как read-only seeded context без live-обновления, скрытых деталей и backend-shaped copy.

### Quick actions
- **D-03:** Быстрые действия показываются как grid `2 x 4` из восьми card-like пунктов: `Аккаунт и счета`, `Переводы`, `Снятие`, `Оплата счета`, `Накопления`, `Кредитная карта`, `Отчет о транзакциях`, `Контакты`.
- **D-04:** Из быстрых действий только `Переводы` обязано вести дальше по сценарию на `/transfers`; остальные пункты остаются display-first и не должны обещать недостроенные backend-фичи или новые продуктовые ветки.

### Rates directory
- **D-05:** Экран `Обмен валют` строится как компактный card-based directory/table с тремя фиксированными строками: Китай, Вьетнам и Южная Корея.
- **D-06:** Китай всегда идет первой строкой и визуально обозначается как основной demo corridor; Вьетнам и Южная Корея показываются после него как reference-only строки, без возможности переключить сценарий перевода в v1.
- **D-07:** Каждая строка справочника обязана показывать флаг/визуальный идентификатор страны, название страны, базу `1 ЦР` и seeded rate: Китай `2.234`, Вьетнам `1.746`, Южная Корея `5.151`.

### Demo data posture
- **D-08:** Баланс счета, quick actions и rates должны жить в локальных typed mock-data модулях или статических JSON внутри frontend-кода, чтобы следующие фазы читали те же seeded значения без дублирования.
- **D-09:** Phase 2 добавляет только context surfaces; никакого editable transfer form, recent-activity ledger, live FX refresh, multi-corridor switcher или transaction history в рамках этой фазы не появляется.

### Claude's Discretion
- Точный visual treatment для флагов: emoji, inline SVG или локальные декоративные badges, если это не ломает единый card-based стиль.
- Небольшой supporting copy внутри dashboard и rates cards, если она усиливает demo framing и не создает ощущение live banking.
- Внутреннее разбиение seeded data по файлам, если source of truth остается единым и переиспользуемым в следующих фазах.

### Deferred Ideas (OUT OF SCOPE)
- Recent activity / transaction history on the dashboard
- Multi-corridor execution or rates interactions beyond read-only comparison
- Editable account selectors, analytics widgets, or live FX refresh
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DASH-01 | Пользователь видит виджет цифрового счета с именем владельца, маскированным номером `4756 •••• •••• 9018` и балансом по умолчанию `3 469.52 ЦР`. | One dedicated account summary card, seeded data module, exact-value display assertions. |
| DASH-02 | Пользователь видит панель быстрых действий с пунктами «Аккаунт и счета», «Переводы», «Снятие», «Оплата счета», «Накопления», «Кредитная карта», «Отчет о транзакциях» и «Контакты». | Eight-tile quick-actions grid, display-first action tiles, centralized action metadata. |
| DASH-03 | Пользователь может начать сценарий перевода из дашборда через навигацию или быстрое действие «Переводы». | Primary CTA in account card plus route-enabled quick-action tile pointing to `/transfers`. |
| RATE-01 | Пользователь видит справочник цифровых валют дружественных стран с флагом и названием страны для каждой строки. | Three-row rates board with country marker and label per row. |
| RATE-02 | Пользователь видит для каждой строки базовое значение `1 ЦР` и курс целевой цифровой валюты. | Structured row model with base column and exact seeded rate values. |
| RATE-03 | Пользователь видит как минимум курсы для Китая, Вьетнама и Южной Кореи, помеченные как симулированные данные. | Fixed seeded rates module, China-first ordering, reference-only treatment for Vietnam and South Korea. |
</phase_requirements>

## Summary

Phase 2 is not a state-management or API phase; it is a context-display phase built on top of the already completed shell. The cleanest implementation path is to keep the shell and route metadata intact, replace only `/dashboard` and `/rates`, and introduce a small shared demo-data layer that centralizes the seeded account, quick-action labels, and rates values for reuse in later phases.

The dashboard should be treated as a read-only overview, not as the first transfer form. That means one dominant account summary card, one clearly prioritized CTA to `/transfers`, and a secondary grid of eight quick-action tiles where only `Переводы` is actually actionable. The rates screen should likewise stay intentionally narrow: one card, three rows, China first, and no sorting/filtering/corridor-switching affordances that would imply Phase 3 or v2 functionality.

**Primary recommendation:** Split Phase 2 into a small foundation plan for typed mock data and shared display helpers, then two parallel feature plans: one for the dashboard card and quick-action grid, one for the three-row rates board and reference-only corridor framing. Keep verification at the route/page level with Vitest + RTL rather than introducing a global store or data-fetch mock layer this early.

## Project Constraints (from CLAUDE.md)

- Frontend-only SPA with no backend/API/database.
- `React 19`, `TypeScript 5.9`, `Vite 8`, `React Router 7`, `Tailwind CSS 4`, `Vitest 4`.
- Desktop shell from Phase 1 is already approved and must remain intact.
- The product must keep one primary executable corridor: `Россия -> Китай`.
- Vietnam and South Korea remain reference-only in v1.
- Use local JSON/modules or local state only; no live FX, no auth/KYC/admin expansion.
- Preserve the card-based, presentation-safe language from Phase 1 and the approved UI specs.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `react` | `19.2.4` | Render dashboard and rates surfaces | Already installed and aligned with project stack. |
| `react-router` | `7.14.0` | Keep dashboard CTA and quick-action navigation in the SPA route tree | Existing router contract already used by shell and placeholder routes. |
| `tailwindcss` | `4.2.2` | Layout quick-actions grid, account widget, and rates board | Existing tokenized utility styling is sufficient; no new styling framework needed. |
| `typescript` | `5.9.3` | Type seeded account, quick-action, and rates data | Prevents drift of exact values that later phases must reuse. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `vitest` | `4.1.3` | Page-level assertions for dashboard and rates rendering | Keep tests focused on exact strings, routing, and seeded values. |
| `@testing-library/react` | `16.3.2` | Render route pages under the existing shell | Use for visible content, CTA presence, and reference-row ordering assertions. |
| `@testing-library/user-event` | `14.6.1` | Verify the `Переводы` tile and CTA route to `/transfers` | Only needed for the dashboard interaction assertions. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Typed TS seed modules under `src/demo/` | Static JSON files | JSON is acceptable, but typed TS modules are easier to co-locate with exact labels, icons, and route metadata without extra parsing. |
| Dedicated feature components for dashboard/rates | Building everything inline in `DashboardPage.tsx` and `RatesPage.tsx` | Inline pages are faster to start, but separate feature components keep later Phase 3 reuse cleaner and make tests more targeted. |
| One card-based rates board | Dense table with generic columns | A table is familiar, but a card-wrapped board better matches the Phase 1 visual contract and keeps the demo from looking like a trading terminal. |

## Architecture Patterns

### Recommended Project Structure Extension
```text
src/
├── demo/
│   ├── types.ts
│   ├── accountSummary.ts
│   ├── quickActions.ts
│   └── cbdcRates.ts
├── features/
│   ├── dashboard/
│   │   ├── AccountSummaryCard.tsx
│   │   ├── QuickActionsGrid.tsx
│   │   └── QuickActionTile.tsx
│   └── rates/
│       ├── RatesBoard.tsx
│       └── RateRow.tsx
└── pages/
    ├── DashboardPage.tsx
    ├── DashboardPage.test.tsx
    ├── RatesPage.tsx
    └── RatesPage.test.tsx
```

### Pattern 1: Typed Demo Seeds, Not Page-Local Literals
**What:** Store the exact account identity, balance, quick-action labels, and rates rows in shared typed modules.
**When to use:** Immediately in Phase 2, because Phase 3 will need the same balance and China corridor rate.
**Example:**
```ts
export const accountSummary = {
  ownerName: 'Дагмара',
  maskedAccountNumber: '4756 •••• •••• 9018',
  balanceLabel: '3 469.52 ЦР',
} as const
```

### Pattern 2: One Dominant Dashboard Surface, Secondary Action Grid
**What:** Keep the account summary card as the visual anchor, then place the eight quick actions beneath it as smaller equal-weight tiles.
**When to use:** On `Главная`, to satisfy dashboard requirements without drifting into a generic finance portal.
**Trade-off:** Improves narrative focus, but intentionally leaves out extra "completeness" signals like activity feeds and charts.

### Pattern 3: Rates Board as Read-Only Comparison Surface
**What:** Represent country rows as simple repeated `RateRow` structures inside one `RatesBoard` card.
**When to use:** On `/rates`, where comparability matters more than interaction richness.
**Trade-off:** Avoids enterprise density and misleading controls, but requires explicit China emphasis to keep the scripted corridor obvious.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Shared seeded values | Duplicate literals directly inside route components | `src/demo/*` typed modules | Prevents drift between dashboard, rates, and later transfer logic. |
| Dashboard navigation | Manual click handlers that call `window.location` | `<Link>` or router-aware buttons to `/transfers` | Keeps `DASH-03` inside the existing SPA contract. |
| Rates markers | Remote flag assets or external icon packs | Inline badge treatment or lightweight local markers | Avoids network dependency and keeps Phase 2 deterministic. |
| Inactive actions | Disabled buttons with broken semantics or fake loading states | Display-first tiles with neutral styling and no backend-shaped copy | Matches the demo-safe posture and avoids false affordances. |

## Common Pitfalls

### Pitfall 1: Dashboard Becomes a Generic Banking Portal
**What goes wrong:** Charts, recent activity, multi-account selectors, and finance widgets crowd out the actual demo story.
**How to avoid:** Keep one account summary card plus the exact eight quick actions only. Nothing else should outrank the balance and transfer CTA.

### Pitfall 2: Quick Actions Look Fully Implemented
**What goes wrong:** All eight tiles receive equal active emphasis and clickable behavior, implying missing workflows are broken.
**How to avoid:** Make only `Переводы` visibly primary and route-enabled. The other seven tiles stay display-first and neutral.

### Pitfall 3: Rates Screen Implies Corridor Switching
**What goes wrong:** Vietnam or South Korea rows look selectable, as if the user can execute those corridors in v1.
**How to avoid:** Keep China first and visually emphasized, and label the other rows as reference-only if needed.

### Pitfall 4: Page Components Become Seed Data Dumps
**What goes wrong:** `DashboardPage.tsx` and `RatesPage.tsx` accumulate hard-coded labels and values, making Phase 3 data reuse messy.
**How to avoid:** Move seeded values into `src/demo/*` and keep route pages mostly compositional.

## Code Examples

### Example 1: Centralized quick-action metadata
```ts
export const quickActions = [
  { label: 'Аккаунт и счета', mode: 'display' },
  { label: 'Переводы', mode: 'route', to: '/transfers' },
  { label: 'Снятие', mode: 'display' },
  { label: 'Оплата счета', mode: 'display' },
  { label: 'Накопления', mode: 'display' },
  { label: 'Кредитная карта', mode: 'display' },
  { label: 'Отчет о транзакциях', mode: 'display' },
  { label: 'Контакты', mode: 'display' },
] as const
```

### Example 2: Rates row contract
```ts
export const cbdcRates = [
  { country: 'Китай', corridor: 'primary', baseLabel: '1 ЦР', rateLabel: '2.234' },
  { country: 'Вьетнам', corridor: 'reference', baseLabel: '1 ЦР', rateLabel: '1.746' },
  { country: 'Южная Корея', corridor: 'reference', baseLabel: '1 ЦР', rateLabel: '5.151' },
] as const
```

## State of the Art

- The current repo already has the full shell, page container, route tree, demo copy contract, and placeholder route behavior from Phase 1.
- No dedicated demo data layer exists yet; seeded dashboard and rates values would currently have to live in page files unless Phase 2 introduces shared modules.
- Test infrastructure is fully available now, so Phase 2 should add route/page tests immediately instead of leaving verification to manual review.

## Open Questions

1. **Should country markers use emoji flags or local decorative badges?**
   What we know: Phase 2 allows either as long as the result remains presentation-safe and visually consistent.
   What's unclear: Whether the final visual language should lean more literal or more abstract.
   Recommendation: Plan with a local badge treatment first; it keeps typography and spacing more controllable than raw emoji rendering.

2. **Do inactive quick actions need explicit "скоро" labeling?**
   What we know: Only `Переводы` should act as a live path in this phase.
   What's unclear: Whether neutral styling alone is enough to communicate non-interactivity.
   Recommendation: Let planning include one small inactive hint only if needed after first implementation pass; do not over-label all tiles.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | type checks, tests, Vite build | ✓ | `22.20.0` | — |
| npm | scripts and local dependency resolution | ✓ | `10.9.3` | — |
| `vite` CLI | build verification | ✓ | local install | `npm run build` |
| `vitest` CLI | route/page assertions | ✓ | local install | `npm run test -- --run` |

**Missing dependencies with no fallback:**
- None.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| **Framework** | `Vitest 4.1.3 + React Testing Library 16.3.2 + @testing-library/jest-dom + jsdom 29.0.2` |
| **Config file** | `vite.config.ts` with `test.environment = "jsdom"` and `test.setupFiles = ["./src/test/setup.ts"]` |
| **Quick run command** | `npm exec tsc --noEmit` |
| **Full suite command** | `npm run test -- --run && npm run build` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DASH-01 | Dashboard shows Dagmara account card, masked number, and seeded balance | integration | `npm run test -- src/pages/DashboardPage.test.tsx --run` | ✅ planned in Phase 2 |
| DASH-02 | Dashboard shows all eight quick actions in the required labels | integration | `npm run test -- src/pages/DashboardPage.test.tsx --run` | ✅ planned in Phase 2 |
| DASH-03 | Dashboard CTA and quick-action tile `Переводы` both route to `/transfers` | integration | `npm run test -- src/pages/DashboardPage.test.tsx --run` | ✅ planned in Phase 2 |
| RATE-01 | Rates board renders country marker and country name per row | integration | `npm run test -- src/pages/RatesPage.test.tsx --run` | ✅ planned in Phase 2 |
| RATE-02 | Every row renders `1 ЦР` plus the exact simulated target rate | integration | `npm run test -- src/pages/RatesPage.test.tsx --run` | ✅ planned in Phase 2 |
| RATE-03 | China, Vietnam, and South Korea render in the board with simulated/reference framing | integration | `npm run test -- src/pages/RatesPage.test.tsx --run` | ✅ planned in Phase 2 |

### Sampling Rate
- **Per task commit:** `npm exec tsc --noEmit`
- **Per plan wave:** run the page-level test file introduced in that wave
- **Phase gate:** `npm run test -- --run && npm run build`

## Sources

### Primary (HIGH confidence)
- [02-CONTEXT.md](/Users/tkestkes/Dagmara/.planning/phases/02-dashboard-rates-context/02-CONTEXT.md) - locked Phase 2 decisions and exact seeded values
- [02-UI-SPEC.md](/Users/tkestkes/Dagmara/.planning/phases/02-dashboard-rates-context/02-UI-SPEC.md) - visual contract for account widget, quick actions, and rates board
- [PROJECT.md](/Users/tkestkes/Dagmara/.planning/PROJECT.md) - MVP scope, corridor restrictions, and frontend-only constraints
- [REQUIREMENTS.md](/Users/tkestkes/Dagmara/.planning/REQUIREMENTS.md) - requirement IDs and traceability for Phase 2
- [01-CONTEXT.md](/Users/tkestkes/Dagmara/.planning/phases/01-demo-shell-boundaries/01-CONTEXT.md) - shell, demo-framing, and desktop constraints that Phase 2 must preserve
- [01-UI-SPEC.md](/Users/tkestkes/Dagmara/.planning/phases/01-demo-shell-boundaries/01-UI-SPEC.md) - existing shell tokens and layout constraints
- [ARCHITECTURE.md](/Users/tkestkes/Dagmara/.planning/research/ARCHITECTURE.md) - project-level recommendation for shared demo state and route-owned screens
- [FEATURES.md](/Users/tkestkes/Dagmara/.planning/research/FEATURES.md) - dashboard and rates expectations for the MVP feature story

### Secondary (MEDIUM confidence)
- None. Phase 2 research is primarily constrained by project-local artifacts and the already-approved shell.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Architecture: HIGH — Phase 1 shell and routing contracts already exist, so Phase 2 only extends known patterns.
- Verification: HIGH — test infrastructure is installed and green in the current repo.
- Visual hierarchy: MEDIUM — final polish still depends on implementation quality and any later mobile reference inputs.
