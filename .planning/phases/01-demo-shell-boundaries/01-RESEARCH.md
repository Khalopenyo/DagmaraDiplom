# Phase 1: Demo Shell & Boundaries - Research

**Researched:** 2026-04-08
**Domain:** Desktop SPA shell architecture for a frontend-only React/Vite demo
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Claude's Discretion
- Точная типографическая и цветовая система внутри выбранного desktop-направления.
- Формат placeholder-state для поиска и уведомлений, если он не противоречит display-first решению.
- Детали микровзаимодействий sidebar/header при hover/focus.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAVG-01 | Пользователь видит desktop-layout с левой боковой навигацией, содержащей разделы «Главная», «Переводы», «Обмен валют» и «Настройки». | Persistent `AppShell`, pathless layout route, typed nav config, fixed `264px` sidebar primitive. |
| NAVG-02 | Пользователь видит верхнюю панель с приветствием «Здравствуйте, Дагмара», глобальным поиском и уведомлениями. | Shared `TopHeader`, local shell primitives, display-first stub pattern, accessibility guardrails for icon button. |
| NAVG-03 | Пользователь может переходить между основными разделами без перезагрузки браузера. | `BrowserRouter` + `Routes/Route/NavLink`, route-based SPA navigation, root redirect pattern, 404 route inside shell. |
| NAVG-04 | Пользователь видит основной контент по центру экрана с ограничением ширины до `1200px`. | `PageContainer` contract, centered `max-width: 1200px` shell canvas plus inner narrative column at `max-width: 760px`. |
| DEMO-01 | Пользователь видит на ключевых экранах, что платформа является симулированным demo-прототипом с фиктивными данными. | Reusable `StatusBadge` + route-level boundary copy, explicit anti-overclaim rules, placeholder screens that never imply live banking behavior. |
</phase_requirements>

## Summary

Phase 1 is mostly bootstrap plus shell architecture, not page content work. The repository is still greenfield: there is no `package.json`, no `src/`, no router, no test framework, and no installed `vite` or `vitest` CLI. Planning needs to treat scaffolding as a first-class Wave 0 task instead of assuming the app skeleton already exists.

The implementation path is straightforward because the project constraints are tight. Use a Vite React TypeScript app, add `react-router` in declarative mode with `BrowserRouter`, and model the phase around one persistent `AppShell` layout route with four child screens. Keep search and notifications local and display-first only, and treat the simulation boundary as shared product infrastructure, not page copy you duplicate ad hoc.

The main planning risk is not technical complexity, but drift: remounting the shell on route changes, implying backend behavior in header chrome, or letting layout and copy exceed the demo-safe boundaries defined in `01-UI-SPEC.md`. The plan should optimize for a believable, stable diploma demo, not for generalized app architecture.

**Primary recommendation:** Scaffold with `Vite + React + TypeScript`, then build Phase 1 as a single persistent shell layout route with local shell primitives, shared demo-boundary messaging, and Vitest/RTL coverage for the five phase requirements.

## Project Constraints (from CLAUDE.md)

- SPA without page reloads.
- Frontend-only architecture; no server-side or backend layer.
- Data layer limited to mock JSON and local React state.
- Desktop layout must use `sidebar + header + main content` with centered content capped at `1200px`.
- Scope stays focused on digital ruble plus friendly-country CBDC demo flows.
- Visual clarity for a diploma demo is more important than feature breadth.
- Use the established frontend stack: `React 19`, `TypeScript 5.9`, `Vite 8`, `React Router 7`, `Tailwind CSS 4`, `Node.js 20.19+`, `@vitejs/plugin-react`, and `Vitest 4`.
- Start React Router in declarative mode with `BrowserRouter`.
- Keep styling to Tailwind plus a small global theme file; prefer native CSS over Sass/Less/Stylus.
- Keep state local; use a tiny Context only if flow state truly crosses screens.
- Avoid SSR/meta-frameworks, `react-router-dom` in new v7 code, CSS Modules by default, Redux/Zustand/TanStack Query as a starting point, and extra Vite plugins unless justified.
- File-changing work should happen through GSD workflow entry points, not ad hoc repo edits.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `react` | `19.2.4` (published 2026-01-26) | UI runtime | Current stable React 19 line; matches project constraints and current React docs line `19.2`. |
| `typescript` | `5.9.3` (published 2025-09-30) | Type-safe route metadata, shell props, and placeholder contracts | Locked by project stack; current patch on the 5.9 line without jumping to TS 6. |
| `vite` | `8.0.7` (published 2026-04-07) | Scaffold, dev server, static build | Current Vite 8 patch; simplest path for a frontend-only desktop SPA. |
| `react-router` | `7.14.0` (published 2026-04-02) | Route-based SPA navigation and shared shell layout | Official v7 package for declarative routing; supports nested routes and active nav state without hand-rolled history logic. |
| `tailwindcss` | `4.2.2` (published 2026-03-18) | Utility styling plus tokenized shell theme | Official Tailwind 4 line with `@theme` tokens, which maps well to the approved shell token contract. |
| `@tailwindcss/vite` | `4.2.2` (published 2026-03-18) | Official Tailwind Vite integration | Tailwind docs explicitly recommend the Vite plugin path for Vite-based apps. |
| `@vitejs/plugin-react` | `6.0.1` (published 2026-03-13) | Official React support for Vite | Current official plugin line for React on Vite 8. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `vitest` | `4.1.3` (published 2026-04-07) | Fast requirement-level unit/integration tests | Use for shell rendering, routing, demo-boundary assertions, and class/ARIA contracts. |
| `jsdom` | `29.0.2` (published 2026-04-07) | Browser-like DOM environment for Vitest | Required for React Testing Library assertions against the desktop shell. |
| `@testing-library/react` | `16.3.2` (published 2026-01-19) | Render/assert user-visible shell behavior | Use for route rendering, header/sidebar visibility, and 404/error-card checks. |
| `@testing-library/user-event` | `14.6.1` (published 2025-01-21) | Realistic click/input interactions | Use for nav transitions and local search-input typing behavior. |
| `@fontsource-variable/manrope` | `5.2.8` (published 2025-09-17) | Stable local delivery of the approved Manrope font | Prefer for a diploma demo so typography does not depend on external font CDNs or network access. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `BrowserRouter` | `HashRouter` | Use only if the final demo host cannot provide SPA rewrites. `BrowserRouter` is cleaner and should remain the primary plan. |
| Tailwind `@theme` tokens | Plain `:root` CSS variables only | Plain CSS variables are fine for one-off values, but `@theme` is better when the token should generate Tailwind utilities too. |
| Local shell primitives | Third-party component library | A library may speed up raw scaffolding, but it will fight the approved visual contract and add unnecessary abstraction in Phase 1. |
| `@fontsource-variable/manrope` | Remote Google Fonts import | Remote delivery is simpler to paste in, but it adds network dependency to a controlled demo environment. |

**Installation:**
```bash
npm create vite@latest . -- --template react-ts
npm install react-router tailwindcss @tailwindcss/vite @fontsource-variable/manrope
npm install -D vitest jsdom @testing-library/react @testing-library/user-event
```

**Version verification:**
```bash
npm view react version
npm view typescript@5.9 version
npm view vite version
npm view react-router version
npm view tailwindcss version
npm view @tailwindcss/vite version
npm view @vitejs/plugin-react version
npm view vitest version
```

## Architecture Patterns

### Recommended Project Structure
```text
src/
├── app/                 # entrypoint, BrowserRouter mount, route tree
├── shell/               # AppShell, SidebarNav, TopHeader, PageContainer, ShellCard, StatusBadge
├── pages/               # Dashboard, Transfers, Rates, Settings, NotFound placeholders
├── content/             # nav metadata, page intros, shared boundary copy
├── styles/              # tailwind import, @theme tokens, font import, global shell rules
└── test/                # vitest setup and render helpers
```

### Pattern 1: Persistent Shell Layout Route
**What:** Mount one `AppShell` once at the parent route and render child pages through `<Outlet />`.
**When to use:** For every top-level Phase 1 route. This is the core mechanism that satisfies `NAVG-01`, `NAVG-02`, and `NAVG-03`.
**Example:**
```tsx
// Source: React Router declarative routing docs + 01-CONTEXT.md decisions
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AppShell } from "../shell/AppShell";
import { DashboardPage, RatesPage, SettingsPage, TransferPage, NotFoundPage } from "../pages";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transfers" element={<TransferPage />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Pattern 2: Route Metadata Drives Both Nav and Page Intro
**What:** Store path, label, icon key, title, supporting copy, CTA label, and boundary treatment in one typed metadata table.
**When to use:** Immediately in Phase 1. It keeps sidebar labels, route placeholders, and demo-boundary copy from drifting apart.
**Example:**
```ts
// Source synthesis: 01-UI-SPEC.md + React Router route-based navigation docs
export const topLevelRoutes = [
  {
    path: "/dashboard",
    navLabel: "Главная",
    pageTitle: "Демонстрационный маршрут Россия → Китай",
    boundaryMode: "intro-card",
    ctaLabel: "Перейти к переводу",
  },
  {
    path: "/transfers",
    navLabel: "Переводы",
    pageTitle: "Переводы",
    boundaryMode: "intro-card",
    ctaLabel: "Вернуться на главную",
  },
  {
    path: "/rates",
    navLabel: "Обмен валют",
    pageTitle: "Обмен валют",
    boundaryMode: "inline-helper",
    ctaLabel: "Вернуться на главную",
  },
  {
    path: "/settings",
    navLabel: "Настройки",
    pageTitle: "Настройки",
    boundaryMode: "inline-helper",
    ctaLabel: "Вернуться на главную",
  },
] as const;
```

### Pattern 3: Tailwind Theme Tokens Backed by the UI Contract
**What:** Put shell tokens in one top-level Tailwind `@theme` block, and reserve plain `:root` variables only for values that should not generate utilities.
**When to use:** In the first stylesheet. This keeps layout, color, and radius tokens aligned with `01-UI-SPEC.md`.
**Example:**
```css
/* Source: Tailwind theme docs + 01-UI-SPEC.md token contract */
@import "tailwindcss";
@import "@fontsource-variable/manrope/wght.css";

@theme {
  --color-bg: #f5f1e8;
  --color-surface: #ffffff;
  --color-surface-muted: #eef3f7;
  --color-text-strong: #18263a;
  --color-text-muted: #617086;
  --color-border-soft: #d9e1e8;
  --color-accent: #0f6cbd;
  --radius-control: 16px;
  --radius-card: 24px;
}

:root {
  font-family: "Manrope Variable", sans-serif;
}
```

### Anti-Patterns to Avoid
- **Per-page shell wrappers:** If `AppShell` lives inside each page component, sidebar/header will remount, and search input focus or local typed text will reset on every route change.
- **Tab-state navigation instead of URL navigation:** This breaks `NAVG-03`, weakens deep-linking, and makes not-found handling harder.
- **Backend-shaped header stubs:** Search suggestions, unread badges, timestamps, or syncing language imply real infrastructure the prototype does not have.
- **Global store in Phase 1:** This phase has static shell chrome plus placeholder routes; global state would mostly be ceremony.
- **Full-width placeholder pages:** The shell contract requires a centered `1200px` content cap with a narrower narrative column inside it.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SPA routing/history | Local `useState` tabs, `window.location` hacks, or manual active-link bookkeeping | `react-router` with `BrowserRouter`, `Routes`, `Route`, `NavLink`, and `Outlet` | Nested routing, active-state handling, and shell persistence are already solved. |
| Design-token plumbing | A separate SCSS token system or a large custom utility layer | Tailwind 4 `@theme` plus a tiny global CSS file | Tailwind generates utilities from tokens and keeps the shell styling surface small. |
| DOM test harness | Ad hoc mount helpers and manual cleanup logic per file | `vitest` + `jsdom` + React Testing Library | Reliable browser-like tests with established cleanup and interaction patterns. |
| Font asset delivery | Manual `@font-face` management or remote font CDN dependency | `@fontsource-variable/manrope` | Local assets make the demo more reproducible and match the locked font decision. |
| Icon pipeline | SVG-to-React build transforms or icon megabundles | Inline outline SVG primitives | Matches the approved icon contract and avoids extra Vite transform cost. |

**Key insight:** Phase 1 should solve shell persistence, route structure, and claim boundaries with the minimum moving parts. Any extra abstraction that does not directly support those goals is negative value at this stage.

## Common Pitfalls

### Pitfall 1: Shell Remounts on Route Change
**What goes wrong:** The sidebar, header, and shell badge blink or lose local state during navigation.
**Why it happens:** Routes are defined as separate top-level page trees instead of child routes under one layout route.
**How to avoid:** Put `AppShell` at the parent route and render child pages through `<Outlet />`.
**Warning signs:** Search text clears on navigation, focus jumps unexpectedly, or the shell appears to re-render from scratch.

### Pitfall 2: Header Chrome Implies Live Banking Features
**What goes wrong:** Search, notifications, or status treatments make the prototype look production-backed.
**Why it happens:** Placeholder UI is implemented with badges, timestamps, result popovers, or server-like language.
**How to avoid:** Limit Phase 1 shell chrome to focus, hover, text entry, and ARIA-complete controls with no result surface or unread model.
**Warning signs:** Copy mentions syncing, inboxes, balances updating, or real account activity.

### Pitfall 3: BrowserRouter Deployment Trap
**What goes wrong:** Direct refresh on a deep link returns a 404 outside the Vite dev server.
**Why it happens:** `BrowserRouter` needs the host to rewrite unknown paths back to the SPA entry file.
**How to avoid:** Plan BrowserRouter as the default, but include either a hosting rewrite step or a deployment-only `HashRouter` fallback decision.
**Warning signs:** `/transfers` works after in-app navigation but fails on hard refresh or on a static host preview.

### Pitfall 4: Tailwind Tokens Defined Only in `:root`
**What goes wrong:** Designers approve token names, but developers cannot use corresponding Tailwind utilities.
**Why it happens:** Values are stored only as plain CSS variables instead of Tailwind `@theme` variables.
**How to avoid:** Put utility-worthy colors, radii, breakpoints, and font tokens in `@theme`; reserve `:root` for plain CSS-only values.
**Warning signs:** Repeated arbitrary-value classes like `bg-[var(--color-accent)]` everywhere.

### Pitfall 5: Test Setup Stops at `vitest` Install
**What goes wrong:** React tests fail because `document` is missing or DOM cleanup leaks between tests.
**Why it happens:** `jsdom` environment or RTL cleanup configuration is skipped.
**How to avoid:** Configure Vitest with `environment: "jsdom"` and enable RTL cleanup via globals or a setup file.
**Warning signs:** `document is not defined`, duplicate elements across tests, or flaky routing assertions.

## Code Examples

Verified patterns from official sources:

### Shared Shell Navigation
```tsx
// Source: React Router docs on BrowserRouter/NavLink/Route + 01-UI-SPEC.md
import { NavLink } from "react-router";

export function SidebarNavItem({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex h-12 items-center gap-3 rounded-[16px] px-4 text-sm font-semibold transition-colors duration-150 ease-out",
          isActive
            ? "bg-[color:var(--color-accent)]/10 text-[color:var(--color-text-strong)]"
            : "text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-muted)]",
        ].join(" ")
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
```

### Demo Boundary Primitive
```tsx
// Source synthesis: 01-CONTEXT.md D-07/D-08 + 01-UI-SPEC.md
const DEMO_BOUNDARY_COPY =
  "Клиентская симуляция с фиктивными данными. Реального движения денег и официальных интеграций с центральными банками нет.";

export function DemoBoundary({ mode = "inline" }: { mode?: "inline" | "card" }) {
  if (mode === "card") {
    return (
      <section className="rounded-[24px] border border-[color:var(--color-border-soft)] bg-[color:var(--color-accent)]/8 p-8">
        <span className="inline-flex h-8 items-center rounded-full bg-[color:var(--color-accent)]/12 px-3 text-sm font-semibold text-[color:var(--color-accent)]">
          Simulated demo
        </span>
        <p className="mt-4 text-base leading-6 text-[color:var(--color-text-strong)]">{DEMO_BOUNDARY_COPY}</p>
      </section>
    );
  }

  return <p className="text-sm leading-6 text-[color:var(--color-text-muted)]">{DEMO_BOUNDARY_COPY}</p>;
}
```

### Vitest + RTL Setup for Phase 1
```ts
// Source: Vitest environment docs + Testing Library setup docs
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `react-router-dom` as the default package for web apps | `react-router` for new v7 declarative apps | React Router 7 | New code should target the current package surface and docs. |
| Tailwind config plus extra PostCSS scaffolding | Tailwind 4 Vite plugin plus CSS `@import`/`@theme` | Tailwind 4 | Simpler setup and fewer config files in a greenfield Vite app. |
| Preprocessor-heavy styling stacks | Native CSS and Tailwind utilities first | Vite 8 / Tailwind 4 guidance | Less tooling overhead, faster startup, and easier token alignment. |
| Remote web font dependency | Local packaged font asset | Common Vite/Fontsource pattern | Better demo stability and fewer runtime dependencies. |

**Deprecated/outdated:**
- `react-router-dom` for new v7-first code paths: use `react-router` unless you have a legacy v6 surface you are intentionally maintaining.
- Sass/Less/Stylus as the default styling layer for this app: Vite and Tailwind both push toward native CSS plus smaller toolchains unless you have a proven need.
- SVG-to-component transforms by default: Vite's performance guidance recommends importing SVGs as assets/strings unless transformation is truly justified.

## Open Questions

1. **What is the final demo runtime target?**
   What we know: `BrowserRouter` is the cleanest fit for the locked SPA behavior and shell routing decisions.
   What's unclear: Whether the final defense/demo will run through `vite dev`, a static host with rewrites, or a file-based/static preview without SPA fallback.
   Recommendation: Plan with `BrowserRouter`; add one explicit plan checkpoint to confirm rewrite support before shipping.

2. **Will the mobile design reference be available during implementation?**
   What we know: `STATE.md` flags mobile-source preservation as an active concern, and `01-UI-SPEC.md` already encodes the desktop translation contract.
   What's unclear: Whether implementation will have access to original screens or only the UI spec.
   Recommendation: Plan the shell primitives and tokens first, then include a visual-verification step before polish to confirm proportions and card rhythm.

3. **Should font delivery be fully offline-safe?**
   What we know: The approved font is Manrope, and this is a controlled demo environment.
   What's unclear: Whether the user expects the build to work without internet access during the diploma presentation.
   Recommendation: Treat local font packaging as the default unless the user explicitly prefers remote font loading.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Vite 8, Vitest 4, package installs | ✓ | `22.20.0` | — |
| npm | `create-vite`, dependency install, local scripts | ✓ | `10.9.3` | — |
| `vite` CLI | local dev/build after bootstrap | ✗ | — | Scaffold/install locally, then use `npm run dev` |
| `vitest` CLI | automated phase validation after bootstrap | ✗ | — | Install locally, then run `npx vitest run` or `npm run test` |

**Missing dependencies with no fallback:**
- None. The only missing items are project-local dependencies that can be installed during bootstrap.

**Missing dependencies with fallback:**
- `vite` and `vitest` are not installed yet, but local installation is expected as part of Wave 0 scaffolding.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | `Vitest 4.1.3 + React Testing Library 16.3.2 + jsdom 29.0.2` |
| Config file | `vitest.config.ts` — none yet, must be added in Wave 0 |
| Quick run command | `npx vitest run src/app/__tests__/shell-routing.test.tsx` |
| Full suite command | `npx vitest run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAVG-01 | Desktop shell renders sidebar with four required sections | integration | `npx vitest run src/app/__tests__/app-shell.test.tsx -t "renders required sidebar sections"` | ❌ Wave 0 |
| NAVG-02 | Shared header renders greeting, search stub, and notifications control | integration | `npx vitest run src/app/__tests__/app-shell.test.tsx -t "renders shared header chrome"` | ❌ Wave 0 |
| NAVG-03 | Navigation changes routes without full shell remount | integration | `npx vitest run src/app/__tests__/shell-routing.test.tsx -t "navigates between top-level routes inside the shell"` | ❌ Wave 0 |
| NAVG-04 | Main content stays centered and capped at `1200px` | integration | `npx vitest run src/app/__tests__/page-container.test.tsx -t "applies centered max-width shell container"` | ❌ Wave 0 |
| DEMO-01 | Demo badge and boundary copy are visible on required routes | integration | `npx vitest run src/app/__tests__/demo-boundary.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run src/app/__tests__/shell-routing.test.tsx`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `package.json` and Vite React TS scaffold in repo root
- [ ] `vitest.config.ts` with `environment: "jsdom"`
- [ ] `src/test/setup.ts` for RTL cleanup and shared test hooks
- [ ] `src/app/__tests__/app-shell.test.tsx` — covers `NAVG-01`, `NAVG-02`
- [ ] `src/app/__tests__/shell-routing.test.tsx` — covers `NAVG-03`
- [ ] `src/app/__tests__/page-container.test.tsx` — covers `NAVG-04`
- [ ] `src/app/__tests__/demo-boundary.test.tsx` — covers `DEMO-01`
- [ ] Framework install: `npm install -D vitest jsdom @testing-library/react @testing-library/user-event`

## Sources

### Primary (HIGH confidence)
- [01-CONTEXT.md](/Users/tkestkes/Dagmara/.planning/phases/01-demo-shell-boundaries/01-CONTEXT.md) - locked shell, routing, and demo-boundary decisions
- [01-UI-SPEC.md](/Users/tkestkes/Dagmara/.planning/phases/01-demo-shell-boundaries/01-UI-SPEC.md) - shell primitives, layout contract, copy, color, and motion limits
- [REQUIREMENTS.md](/Users/tkestkes/Dagmara/.planning/REQUIREMENTS.md) - requirement IDs and traceability for Phase 1
- https://reactrouter.com/start/framework/routing - nested routes, layout routes, and `Outlet`
- https://reactrouter.com/api/declarative-routers/BrowserRouter - declarative browser router behavior
- https://reactrouter.com/api/components/NavLink - active link rendering behavior and route-aware nav state
- https://reactrouter.com/api/components/Route - route composition and route tree structure
- https://reactrouter.com/api/components/Navigate - redirect component for index-to-dashboard redirect
- https://vite.dev/guide/ - Vite scaffolding command and Node compatibility note
- https://vite.dev/guide/performance.html - guidance on minimizing plugins, avoiding preprocessors by default, and not transforming SVGs unnecessarily
- https://tailwindcss.com/docs/installation/using-vite - official Tailwind 4 Vite setup
- https://tailwindcss.com/docs/theme - `@theme` tokens versus plain CSS variables
- https://vitest.dev/guide/ - Vitest install guidance and Node/Vite requirements
- https://vitest.dev/config/environment.html - `jsdom` environment and TS typing notes
- https://testing-library.com/docs/react-testing-library/setup/ - Vitest cleanup integration
- https://testing-library.com/docs/user-event/setup/ - `userEvent.setup()` pattern
- https://react.dev/versions - current React docs line (`19.2`)
- https://fontsource.org/fonts/manrope/install - official Manrope package install/import options
- npm registry via `npm view` on 2026-04-08 - verified package versions and publish dates for `react`, `typescript@5.9`, `vite`, `react-router`, `tailwindcss`, `@tailwindcss/vite`, `@vitejs/plugin-react`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, and `@fontsource-variable/manrope`

### Secondary (MEDIUM confidence)
- None. Critical claims were verified against project docs, official documentation, or the npm registry.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - version verification came from the npm registry and official docs.
- Architecture: HIGH - the shell pattern is tightly constrained by Phase 1 context, UI spec, and official React Router/Tailwind docs.
- Pitfalls: MEDIUM - deployment and overclaim risks are well-supported, but final hosting conditions are still unknown.

**Research date:** 2026-04-08
**Valid until:** 2026-05-08
