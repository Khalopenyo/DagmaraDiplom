# Stack Research

**Domain:** frontend-only academic web prototype for cross-border CBDC transfer flows
**Researched:** 2026-04-08
**Confidence:** HIGH

## Recommendation in One Sentence

Use a small React SPA stack: `React 19 + TypeScript 5.9 + Vite 8 + React Router 7 + Tailwind CSS 4 + Vitest`, keep data in local JSON/modules, and avoid backend-shaped tooling like SSR frameworks, server-state libraries, or enterprise UI kits.

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

Use:

- `React + TypeScript` for the app itself
- `Vite` for scaffolding, dev, and static build
- `React Router` in **Declarative Mode** first with `BrowserRouter`
- `Tailwind CSS` plus a small global theme file for tokens the design actually needs
- static JSON files in `src/mocks/` plus plain TypeScript utility functions for rates, conversions, and transaction-step simulation
- React local state and a tiny Context only where flow state truly crosses screens

Do not start with:

- SSR or file-system framework tooling
- Redux, Zustand, or TanStack Query by default
- a fake backend layer
- a heavy component library that will fight the existing visual design

## Installation

```bash
# Scaffold
npm create vite@latest cbdc-demo -- --template react-ts

# App dependencies
npm install react-router tailwindcss @tailwindcss/vite

# Test + quality
npm install -D vitest jsdom @testing-library/react @testing-library/user-event eslint @eslint/js typescript-eslint
```

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

**If the product stays a strictly scripted demo:**
- Use `BrowserRouter`, imported JSON, and local component state.
- Because the simplest architecture is the most reliable one during a presentation.

**If transfer state needs to survive refresh during a demo:**
- Persist only the transfer draft and latest transaction to `sessionStorage`.
- Because this gives resilience without introducing app-wide state infrastructure.

**If route-level loading starts to simplify code:**
- Switch from `BrowserRouter` to `createBrowserRouter` in React Router Data Mode.
- Because route loaders can read local JSON cleanly without inventing an API layer.

**If you later need realistic network behavior:**
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

For this project, the right stack is not "banking-grade frontend architecture." It is a polished static React SPA with good routing, good styling ergonomics, and just enough testing to keep the transfer flow credible.

If I were implementing it from scratch today, I would start with:

1. `Vite + React + TypeScript`
2. `React Router` declarative routes for each screen
3. `Tailwind CSS` for desktop adaptation of the mobile UI
4. local JSON mock files plus a small `lib/` layer for conversion and status simulation
5. `Vitest + Testing Library` for the transfer happy path and conversion logic

That stack is simple, current, professional-looking, and proportionate to a frontend-only diploma MVP.

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

---
*Stack research for: frontend-only CBDC transfer demo SPA*
*Researched: 2026-04-08*
