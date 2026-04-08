<!-- GSD:project-start source:PROJECT.md -->
## Project

**MVP веб-платформы для трансграничных переводов в цифровых валютах ЦБ**

Это frontend-only SPA-прототип для демонстрации пользовательского пути при совершении трансграничных переводов в цифровых национальных валютах центральных банков дружественных стран. Платформа показывает, как пользователь видит цифровой счет, курсы ЦВЦБ, конвертацию цифрового рубля и статус прохождения транзакции между Центральным банком РФ и банком страны-получателя.

Проект создается как MVP для защиты диплома: без серверной части, без реальных интеграций и без production-процессинга. Основная задача продукта на данном этапе не операционная, а демонстрационная: наглядно и убедительно провести пользователя через ключевой сценарий трансграничного перевода.

**Core Value:** Пользователь должен за один непрерывный сценарий понять, как цифровой рубль конвертируется в цифровую валюту другой страны и как эта транзакция прозрачно отслеживается между центральными банками.

### Constraints

- **Application Type**: SPA без перезагрузки страниц — нужно показать бесшовный пользовательский путь.
- **Architecture**: Frontend-only без серверной части — проект демонстрационный и должен быть простым в запуске и показе.
- **Data Layer**: Только моковые JSON/state — реальные внешние источники данных отсутствуют по условиям MVP.
- **UI Layout**: Desktop layout с `sidebar + header + main content` и `max-width: 1200px` — необходимо сохранить пропорции мобильного дизайна на широком экране.
- **Domain Scope**: Только цифровой рубль и валюты дружественных стран — это фокус дипломной демонстрации.
- **Product Goal**: Наглядная защита дипломного сценария важнее полноты банковского функционала — приоритет на ясность и визуальную убедительность.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommendation in One Sentence
## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.2.x | UI runtime | Current stable React line. Strong enough for a polished SPA, but simpler than adopting a full meta-framework for a frontend-only diploma demo. |
| TypeScript | 5.9.x | Types for screens, mock domain models, conversion logic | Prevents brittle demo logic and lets you model balances, FX rates, transfer steps, and receipts clearly without backend schemas. |
| Vite | 8.0.5 | Dev server, build tool, static bundling | This is the standard fast React app toolchain in 2026. It keeps setup light, builds static assets well, and avoids framework overhead you do not need. |
| React Router | 7.14.0 | Screen-to-screen SPA navigation | The app has distinct screens: dashboard, rates, transfer flow, tracking, receipt. Router is justified, but use the simplest mode first. |
| Tailwind CSS | 4.2.x | Styling and responsive desktop adaptation | Best fit for adapting an existing mobile UI to desktop quickly. Utility-first styling is faster than hand-authoring a large CSS layer and gives precise layout control. |
| Node.js | 20.19+ LTS | Local toolchain runtime | Required by Vite 8 and a safe baseline for the whole frontend toolchain. Use current LTS and stop thinking about environment drift. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@vitejs/plugin-react` | 6.x | Official React integration for Vite | Baseline for any Vite React app. It keeps React setup current and leaves React Compiler as an explicit opt-in instead of hidden complexity. |
| `vitest` | 4.1.3 | Unit and component-adjacent testing | Use for conversion math, formatting helpers, route rendering, and happy-path screen behavior. Fast, Vite-native, and enough for an MVP. |
| `@testing-library/react` | latest compatible (approx.) | Component rendering and assertions | Use for the transfer wizard, tracker states, and receipt screen. Do not over-test static presentational pieces. |
| `@testing-library/user-event` | latest compatible (approx.) | Realistic input/click interactions in tests | Use for filling transfer fields, stepping through the flow, and verifying user-visible state changes. |
| `clsx` | latest compatible (approx., optional) | Conditional class composition | Add only if conditional Tailwind class strings become noisy. If the UI stays simple, skip it. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint (flat config) | Catch obvious bugs and drift | Keep rules minimal. This is a demo app, not a style bureaucracy exercise. |
| npm | Package management | Simplest common denominator for a greenfield diploma project. |
| Tailwind CSS IntelliSense | Faster UI iteration | Worth it because most implementation effort will be layout adaptation from mobile to desktop. |
## Prescriptive Setup
- `React + TypeScript` for the app itself
- `Vite` for scaffolding, dev, and static build
- `React Router` in **Declarative Mode** first with `BrowserRouter`
- `Tailwind CSS` plus a small global theme file for tokens the design actually needs
- static JSON files in `src/mocks/` plus plain TypeScript utility functions for rates, conversions, and transaction-step simulation
- React local state and a tiny Context only where flow state truly crosses screens
- SSR or file-system framework tooling
- Redux, Zustand, or TanStack Query by default
- a fake backend layer
- a heavy component library that will fight the existing visual design
## Installation
# Scaffold
# App dependencies
# Test + quality
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| React + Vite SPA | Next.js / full React framework | Only if the project suddenly needs SSR, SEO, server actions, or real backend integration. That is not this MVP. |
| React Router Declarative Mode | React Router Data Mode | Use Data Mode if route-level JSON loaders make the code cleaner than passing data through props/context. Still keep it frontend-only. |
| Tailwind CSS | MUI / Ant Design | Use a component library only if there is no existing design and speed matters more than fidelity. Here, fidelity to the mobile UI matters more. |
| React local state + small Context | Redux Toolkit / Zustand | Use a store only if transfer draft, tracking state, and receipt state become painful across many unrelated branches. Start without it. |
| Static JSON imports | MSW or mock API layer | Use MSW later only if you need simulated latency, request errors, or contract-shaped API tests. For the diploma MVP, direct JSON is cleaner. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Next.js, Remix, or other SSR-first app frameworks | They solve deployment, rendering, and backend-adjacent problems this prototype does not have. They add architecture that the diploma MVP cannot justify. | React + Vite SPA |
| `react-router-dom` in new v7 code | React Router v7 simplified packages; new apps should depend on `react-router`, not `react-router-dom`. | `react-router` |
| Sass, Less, or Stylus | Tailwind v4 explicitly says it is not designed to be used with CSS preprocessors. You do not need them for variables, nesting, or imports anymore. | Tailwind + native CSS variables |
| CSS Modules everywhere | Tailwind docs say they can coexist, but do not recommend using them together if you can avoid it because of scoping duplication and slower builds. | Utility classes + one global app/theme CSS file |
| Redux Toolkit, Zustand, or TanStack Query as a starting point | This app has no backend, no server cache, and a narrow happy-path demo flow. State tooling would mostly be ceremony. | React state + Context + static JSON |
| Extra Vite plugins by default, especially SVG-to-React transforms | Vite docs warn community plugins can hurt performance, and recommend importing SVGs as files/URLs instead of transforming them into framework components unless needed. | Official plugins only, raw SVG assets by default |
## Stack Patterns by Variant
- Use `BrowserRouter`, imported JSON, and local component state.
- Because the simplest architecture is the most reliable one during a presentation.
- Persist only the transfer draft and latest transaction to `sessionStorage`.
- Because this gives resilience without introducing app-wide state infrastructure.
- Switch from `BrowserRouter` to `createBrowserRouter` in React Router Data Mode.
- Because route loaders can read local JSON cleanly without inventing an API layer.
- Add a tiny mock service layer or MSW.
- Because fake latency and error states can improve the demo, but only after the basic UX is solid.
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `react@19.2.x` | `react-dom@19.2.x`, `react-router@7.14.0` | Safe default for a modern SPA. |
| `vite@8.0.5` | `@vitejs/plugin-react@6.x`, `vitest@4.1.3` | Vite 8 requires Node.js `20.19+` or `22.12+`. |
| `tailwindcss@4.2.x` | `@tailwindcss/vite@4.x` | Tailwind 4 targets modern browsers, which is acceptable for a controlled desktop demo. |
| `typescript@5.9.x` | `vite@8.0.5` | Use `strict` mode. Also use Vite's recommended `moduleResolution: "bundler"` in `tsconfig.json`. |
## Final Recommendation
## Sources
- https://react.dev/versions — verified React docs current line `19.2` and release list
- https://vite.dev/blog/announcing-vite8 — verified Vite `8.0.5`, Node requirements, and `@vitejs/plugin-react` v6
- https://vite.dev/guide/performance — verified guidance to avoid unnecessary plugins, prefer native tooling, and use `moduleResolution: "bundler"`
- https://reactrouter.com/start/modes — verified React Router latest `7.14.0` and mode guidance
- https://reactrouter.com/start/declarative/installation — verified Vite-first setup and `npm i react-router`
- https://reactrouter.com/upgrading/v6 — verified that v7 no longer needs `react-router-dom`
- https://tailwindcss.com/docs/installation/using-vite — verified official Vite plugin path for Tailwind
- https://tailwindcss.com/docs/compatibility — verified docs are on `v4.2`, plus guidance against Sass and CSS Modules by default
- https://vitest.dev/guide/ — verified `vitest` `4.1.3` and Vite integration
- https://vitest.dev/blog — verified current Vitest release line and latest 2026 announcements
- https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/ — verified TypeScript `5.9`
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
