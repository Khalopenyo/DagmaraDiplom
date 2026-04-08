# AGENTS

## Project

**MVP веб-платформы для трансграничных переводов в цифровых валютах ЦБ**

Это frontend-only SPA-прототип для демонстрации пользовательского пути при совершении трансграничных переводов в цифровых национальных валютах центральных банков дружественных стран. Основной demo-коридор v1: `Россия -> Китай`; Вьетнам и Южная Корея остаются reference-only строками в справочнике курсов.

**Core Value:** Пользователь должен за один непрерывный сценарий понять, как цифровой рубль конвертируется в цифровую валюту другой страны и как эта транзакция прозрачно отслеживается между центральными банками.

## Source of Truth

- `.planning/PROJECT.md` — проектный контекст и ограничения
- `.planning/REQUIREMENTS.md` — checkable v1/v2 requirements
- `.planning/ROADMAP.md` — текущая фазовая структура
- `.planning/STATE.md` — текущая позиция проекта
- `CLAUDE.md` — сгенерированная GSD-сводка по проекту, стеку и workflow

## Constraints

- Frontend-only SPA, без backend/API/БД
- Данные только из статических JSON/state
- Desktop layout: `sidebar + header + main content`
- Контент по центру, `max-width: 1200px`
- Никаких real-money claim, real integration claim или production-security claim

## Stack

- `React 19`
- `TypeScript 5.9`
- `Vite 8`
- `React Router 7`
- `Tailwind CSS 4`
- `Vitest 4`

## Workflow

- Начинайте work через GSD-команды, чтобы `.planning` оставался актуальным.
- Для следующего шага используйте `$gsd-discuss-phase 1` или сразу `$gsd-plan-phase 1`.
- Не расширяйте MVP в сторону backend, auth/KYC, admin tooling, live FX или multi-corridor execution, если это явно не перескоплено в `.planning`.
