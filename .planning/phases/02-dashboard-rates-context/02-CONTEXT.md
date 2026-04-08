# Phase 2: Dashboard & Rates Context - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Заменить placeholder-экраны `Главная` и `Обмен валют` на read-only контекстные экраны, которые показывают seeded digital-ruble account, быстрые действия и симулированный справочник курсов для corridor `Россия -> Китай`, не заходя в editable transfer flow, tracker или receipt.

</domain>

<decisions>
## Implementation Decisions

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

### the agent's Discretion
- Точный visual treatment для флагов: emoji, inline SVG или локальные декоративные badges, если это не ломает единый card-based стиль.
- Небольшой supporting copy внутри dashboard и rates cards, если она усиливает demo framing и не создает ощущение live banking.
- Внутреннее разбиение seeded data по файлам, если source of truth остается единым и переиспользуемым в следующих фазах.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product scope and phase contract
- `.planning/PROJECT.md` — MVP boundaries, fixed demo corridor `Россия -> Китай`, desktop layout constraints and frontend-only posture.
- `.planning/REQUIREMENTS.md` — requirements `DASH-01`, `DASH-02`, `DASH-03`, `RATE-01`, `RATE-02`, `RATE-03`.
- `.planning/ROADMAP.md` — Phase 2 goal, dependencies, and success criteria.
- `.planning/STATE.md` — current project position after Phase 1 completion.

### Prior phase decisions
- `.planning/phases/01-demo-shell-boundaries/01-CONTEXT.md` — locked shell, navigation, demo-framing and layout decisions that Phase 2 must preserve.
- `.planning/phases/01-demo-shell-boundaries/01-UI-SPEC.md` — approved desktop shell tokens, spacing, card and content-width contract.
- `.planning/phases/01-demo-shell-boundaries/01-03-SUMMARY.md` — persistent shell and route-layout behavior already implemented.
- `.planning/phases/01-demo-shell-boundaries/01-04-SUMMARY.md` — current placeholder route behavior that Phase 2 will replace only on `Главная` and `Обмен валют`.

### Research guidance
- `.planning/research/SUMMARY.md` — recommended reducer-backed demo posture, fixed corridor emphasis and narrow scripted scope.
- `.planning/research/STACK.md` — current stack and guidance to keep mock data local and lightweight.
- `.planning/research/PITFALLS.md` — warnings against misleading live-banking signals, actor collapse and multi-corridor scope creep.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/shell/AppShell.tsx` — persistent shell already wraps all top-level routes; Phase 2 should extend routed content, not alter the shell contract.
- `src/shell/PageContainer.tsx` — enforces the `1200px` page canvas and `760px` narrative column from Phase 1.
- `src/shell/ShellCard.tsx` — reusable card primitive for account widget, quick actions and rates list sections.
- `src/content/topLevelRoutes.ts` — route titles and CTA metadata are already centralized and should stay the source of route-level copy.
- `src/content/demoCopy.ts` — canonical simulation disclaimer and shell badge copy must remain visible.

### Established Patterns
- Route pages are rendered inside one persistent `AppShell` and must keep the visible `Simulated demo` framing.
- Card-based UI and centered content surfaces are the approved design direction; Phase 2 should enrich the cards, not replace them with enterprise tables or dense dashboards.
- Vitest + Testing Library are already in place for route-level and shell-level regressions.

### Integration Points
- `src/pages/DashboardPage.tsx` should replace the generic placeholder with the seeded account widget and quick-actions grid.
- `src/pages/RatesPage.tsx` should replace the generic placeholder with the three-row rates directory.
- `src/pages/TransfersPage.tsx` and `src/pages/SettingsPage.tsx` remain Phase 1 placeholders for now and should not absorb Phase 2 scope.
- New mock data should be introduced as shared frontend source of truth so Phase 3 can consume the same account and rate values.

</code_context>

<specifics>
## Specific Ideas

- Dashboard should feel like the first credible "banking" surface of the demo, but still clearly as a simulated prototype rather than a production online bank.
- The account widget is the emotional anchor of `Главная`; quick actions are secondary and should not outshine balance context.
- The rates screen should read as a reference board, with China visually emphasized as the active corridor and the other two countries clearly present but non-executable.
- If mobile design inputs are still incomplete, preserve the card rhythm and negative space established in Phase 1 instead of improvising denser desktop layouts.

</specifics>

<deferred>
## Deferred Ideas

- Recent activity / transaction history on the dashboard — belongs to a later phase or backlog item once the transfer flow and receipt exist.
- Multi-corridor execution, corridor switchers, sorting/filtering on the rates directory — explicitly out of v1 Phase 2 scope.
- Editable account selectors, live rate refresh, chart widgets or analytics — not needed before the scripted transfer path is complete.

</deferred>

---

*Phase: 02-dashboard-rates-context*
*Context gathered: 2026-04-08*
