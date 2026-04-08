# Phase 1: Demo Shell & Boundaries - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Собрать desktop shell для MVP-прототипа, чтобы пользователь мог попасть в приложение, увидеть sidebar/header/main layout, перейти между ключевыми разделами без перезагрузки и сразу понять, что перед ним симулированный demo-продукт, а не живая банковская система.

</domain>

<decisions>
## Implementation Decisions

### Shell structure
- **D-01:** Использовать один постоянный `AppShell` с левой боковой навигацией, верхней панелью и `Outlet` для маршрутов, а не отдельные независимые layout на каждую страницу.
- **D-02:** Корневой маршрут должен перенаправлять пользователя на «Главная», чтобы сценарий всегда стартовал из dashboard-контекста.

### Navigation model
- **D-03:** В Phase 1 зафиксировать четыре top-level раздела: `Главная`, `Переводы`, `Обмен валют`, `Настройки`.
- **D-04:** Навигация должна быть route-based SPA без полной перезагрузки, а не набором локальных табов внутри одной страницы.

### Header behavior
- **D-05:** Приветствие «Здравствуйте, Дагмара», поле глобального поиска и иконка уведомлений должны присутствовать уже в shell, но поиск и уведомления на Phase 1 остаются display-first элементами без отдельной backend-логики.
- **D-06:** Header должен быть общим для всех top-level разделов, чтобы сохранить единый ритм desktop-интерфейса.

### Demo framing
- **D-07:** Simulation boundary должна быть заметной с первого экрана: компактный, но постоянный маркер `Simulated demo` в shell плюс краткая поясняющая подпись на основных маршрутах.
- **D-08:** Канонический дисклеймер: клиентская симуляция, фиктивные данные, отсутствие реального движения денег и официальных интеграций с центральными банками.

### Desktop translation
- **D-09:** Desktop-версия должна сохранять card-based характер мобильного дизайна, а не превращаться в перегруженный enterprise-dashboard.
- **D-10:** Основной контент фиксируется в центре экрана с `max-width: 1200px`; sidebar остается стабильной опорой навигации, а main area получает достаточно воздуха вокруг карточек и заголовков.

### the agent's Discretion
- Точная типографическая и цветовая система внутри выбранного desktop-направления.
- Формат placeholder-state для поиска и уведомлений, если он не противоречит display-first решению.
- Детали микровзаимодействий sidebar/header при hover/focus.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project scope
- `.planning/PROJECT.md` — границы MVP, desktop-layout ограничения и решение о primary demo corridor `Россия -> Китай`.
- `.planning/REQUIREMENTS.md` — требования `NAVG-01..04` и `DEMO-01`, которые покрывает эта фаза.
- `.planning/ROADMAP.md` — цель и success criteria Phase 1.

### Research guidance
- `.planning/research/SUMMARY.md` — why Phase 1 starts with claim boundaries and simulation framing before deeper UI work.
- `.planning/research/STACK.md` — рекомендуемый стек `React + TypeScript + Vite + React Router + Tailwind`.
- `.planning/research/PITFALLS.md` — риски misleading-demo, actor collapse и overclaiming real settlement.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Existing reusable assets отсутствуют — репозиторий greenfield и код ещё не создан.

### Established Patterns
- Established frontend patterns ещё не сложились; эту фазу нужно использовать для фиксации базового layout/routing pattern.

### Integration Points
- Новый код должен стать основанием для следующих фаз: `AppShell`, router, top-level route structure, shared demo framing, placeholder pages for `dashboard`, `transfer`, `rates`, `settings`.

</code_context>

<specifics>
## Specific Ideas

- Навигация должна ощущаться как финансовый desktop-интерфейс, но не как тяжёлый банковский back-office.
- Search и notifications нужны как части визуального языка интерфейса уже сейчас, даже если их логика будет stub-only.
- Simulation marker должен быть заметным, но не ломать презентационный вид дипломного прототипа.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-demo-shell-boundaries*
*Context gathered: 2026-04-08*
