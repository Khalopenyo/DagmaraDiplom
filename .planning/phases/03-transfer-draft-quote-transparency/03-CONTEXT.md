# Phase 3: Transfer Draft & Quote Transparency - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Заменить placeholder-экран `Переводы` на один desktop-экран editable transfer draft для фиксированного corridor `Россия -> Китай`, где пользователь выбирает источник списания, тип перевода, получателя и сумму, а затем видит прозрачный quote с автоматической конвертацией и правилами валидации. Эта фаза не запускает processing, tracker или receipt.

</domain>

<decisions>
## Implementation Decisions

### Draft structure
- **D-01:** `/transfers` остается одним route-level экраном с последовательной desktop-компоновкой `draft form + derived quote preview`, а не превращается в multi-step wizard, modal flow или отдельные промежуточные маршруты.
- **D-02:** Phase 3 покрывает только editable draft и quote transparency; генерация transaction ID, запуск status simulation и финальный receipt остаются Phase 4.

### Source account and corridor lock
- **D-03:** Селектор счета списания должен существовать визуально, но в v1 содержит один seeded digital-ruble account `Дагмара` из Phase 2 как единственный executable option с тем же доступным балансом.
- **D-04:** Перевод остается жестко зафиксированным на corridor `Россия -> Китай`; никакой country picker, multi-corridor switcher или альтернативный payout rail в этой фазе не появляется.

### Transfer type and recipient capture
- **D-05:** Тип перевода ограничен двумя явно видимыми вариантами: `По номеру карты` и `По номеру телефона`.
- **D-06:** Экран должен показывать компактную seeded carousel/row избранных получателей с как минимум `Emma`, `Justin` и display-first кнопкой `+`, чтобы demo можно было пройти быстро без отдельного contact-management flow.
- **D-07:** Выбор избранного получателя может префиллить реквизит, но поле идентификатора остается видимым и редактируемым, чтобы демонстрация покрывала и assisted, и manual entry в одном сценарии.
- **D-08:** Валидация реквизитов остается demo-level: card mode ожидает card-number-like numeric pattern, phone mode ожидает international-phone-like pattern, привязанный к corridor Китая, без обещания production-grade банковской проверки.

### Amounts and quote policy
- **D-09:** Редактируемым денежным полем является сумма списания в `₽/ЦР`; сумма получения в китайской цифровой валюте рассчитывается автоматически по shared seeded rate и показывается как derived read-only output.
- **D-10:** Quote math обязан переиспользовать Phase 2 source of truth для account balance и China rate (`2.234`), чтобы следующие фазы могли без drift повторять те же значения в tracker и receipt.
- **D-11:** Quote preview до подтверждения обязан показывать rate, сумму списания, сумму получения, фиксированную platform fee и итог; fee для MVP остается детерминированной и плоской (`10 ₽`), а не live- или percentage-based.
- **D-12:** Любой quote copy должен явно читатьcя как simulated corridor quote, а не как live FX, best execution или production settlement promise.

### Validation and CTA boundary
- **D-13:** Основной CTA уже называется `Подтвердить`, но в рамках Phase 3 отвечает только за readiness/validity draft state; фактический submit и переход в processing появляются только в Phase 4.
- **D-14:** Пользователь не должен иметь возможность продолжить сценарий с пустым обязательным реквизитом, неправильным форматом идентификатора, нулевой/отрицательной суммой или суммой выше доступного остатка.

### the agent's Discretion
- Точное desktop-расположение draft form и quote preview: одна колонка, две card-секции или асимметричный split, если сохраняется ясный сценарный ритм.
- Визуальный стиль аватаров/чипов избранных получателей и способ прокрутки favorites-strip.
- Небольшая helper-copy для simulated quote, validation hints и corridor lock, если она усиливает понимание и не выглядит как production-bank legalese.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product scope and current contract
- `.planning/PROJECT.md` — MVP boundaries, frontend-only posture and current validated Phase 2 state.
- `.planning/REQUIREMENTS.md` — requirements `XFER-01`, `XFER-02`, `XFER-03`, `XFER-04`, `XFER-05`, `XFER-06`, `XFER-07`, plus already satisfied `DASH-*` / `RATE-*` context dependencies.
- `.planning/ROADMAP.md` — Phase 3 goal, dependencies and success criteria.
- `.planning/STATE.md` — current project position after Phase 2 completion.

### Prior phase decisions and validated context
- `.planning/phases/01-demo-shell-boundaries/01-CONTEXT.md` — locked shell, navigation, demo framing and layout constraints that the transfer page must preserve.
- `.planning/phases/02-dashboard-rates-context/02-CONTEXT.md` — fixed account/rates posture, reference-only countries and shared seeded-data decisions.
- `.planning/phases/02-dashboard-rates-context/02-02-SUMMARY.md` — validated dashboard entry points into the transfer route.
- `.planning/phases/02-dashboard-rates-context/02-03-SUMMARY.md` — validated rates board and China-first corridor emphasis.
- `.planning/phases/02-dashboard-rates-context/02-VERIFICATION.md` — proof that dashboard and rates requirements are satisfied before the transfer draft begins.

### Research guidance
- `.planning/research/SUMMARY.md` — recommended reducer-backed demo posture, fixed corridor emphasis, derived quote model and narrow writable state.
- `.planning/research/PITFALLS.md` — risks around FX black boxes, misleading live-settlement cues and blockchain theater in the editable transfer surface.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/shell/AppShell.tsx`, `src/shell/PageContainer.tsx`, `src/shell/ShellCard.tsx` — existing desktop shell and card primitives that already define the visual rhythm for top-level routes.
- `src/content/topLevelRoutes.ts` and `src/content/demoCopy.ts` — canonical route metadata and simulation boundary copy that the transfer route should preserve.
- `src/demo/accountSummary.ts`, `src/demo/cbdcRates.ts`, `src/demo/formatters.ts` — shared seeded source of truth for available balance, China corridor rate and currency formatting.
- `src/pages/DashboardPage.tsx` and `src/pages/RatesPage.tsx` — live examples of how Phase 2 replaced placeholders with route-level compositions plus tests.

### Established Patterns
- Top-level route pages compose canonical disclaimer copy, route metadata and feature cards directly, rather than routing through a generic placeholder.
- Route-level regression tests use `AppRoutes` + `renderApp` and prefer user-visible contract checks over classname-only assertions.
- Shared frontend-only demo data is centralized in typed modules and guarded with invariants against silent drift.

### Integration Points
- `src/pages/TransfersPage.tsx` is still a Phase 1 placeholder and is the main route to replace in this phase.
- The transfer draft should reuse the same Dagmara account context and China rate already rendered on `/dashboard` and `/rates`.
- New transfer features can live under `src/features/transfers/` while keeping submit-side effects deferred until Phase 4.

</code_context>

<specifics>
## Specific Ideas

- Экран `Переводы` должен ощущаться как первый по-настоящему editable banking surface demo, но не как production payment hub.
- Пользователь должен без усилий увидеть, как цифровой рубль превращается в китайскую цифровую валюту; quote math нельзя прятать внизу или за collapsible state.
- Favorites нужны для быстрого demo-run, но не должны подменять собой ручной ввод — преподаватель должен видеть и assisted path, и manual path.
- Валидация должна быть строгой ровно настолько, чтобы сценарий выглядел правдоподобно, но не превращалась в fake compliance subsystem.

</specifics>

<deferred>
## Deferred Ideas

- Реальный submit, transaction ID, processing timeline, tracker и receipt — это следующая фаза.
- Multi-corridor switching, editable country selection, best-rate logic, bridge-currency explanation и live FX refresh — вне scope текущей фазы.
- Полноценное contact management, backend-shaped account switching, AML/KYC flows и error-heavy exception screens — не входят в Phase 3 MVP draft.

</deferred>

---

*Phase: 03-transfer-draft-quote-transparency*
*Context gathered: 2026-04-08*
