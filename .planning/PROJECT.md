# MVP веб-платформы для трансграничных переводов в цифровых валютах ЦБ

## What This Is

Это frontend-only SPA-прототип для демонстрации пользовательского пути при совершении трансграничных переводов в цифровых национальных валютах центральных банков дружественных стран. Платформа показывает, как пользователь видит цифровой счет, курсы ЦВЦБ, конвертацию цифрового рубля и статус прохождения транзакции между Центральным банком РФ и банком страны-получателя.

Проект создается как MVP для защиты диплома: без серверной части, без реальных интеграций и без production-процессинга. Основная задача продукта на данном этапе не операционная, а демонстрационная: наглядно и убедительно провести пользователя через ключевой сценарий трансграничного перевода.

## Core Value

Пользователь должен за один непрерывный сценарий понять, как цифровой рубль конвертируется в цифровую валюту другой страны и как эта транзакция прозрачно отслеживается между центральными банками.

## Requirements

### Validated

- [x] Phase 2 validated seeded dashboard context: one fixed account card for `Дагмара`, masked number `4756 •••• •••• 9018`, starting balance `3 469.52 ЦР`, and eight quick actions with only `Переводы` live.
- [x] Phase 2 validated simulated rates context: a read-only three-row CBDC directory for Китай, Вьетнам и Южная Корея, with China visually primary and the other two rows reference-only.
- [x] Phase 3 validated the editable `/transfers` draft: one seeded source account, card/phone transfer modes, favorites `Emma` and `Justin`, deterministic quote math, and confirm gating before processing.

### Active

- [ ] Завершить основной флоу трансграничного перевода: подтвердить подготовленный draft, запустить детерминированный processing и показать receipt без backend-интеграций.
- [ ] Визуализировать процесс прохождения транзакции через шлюзы центральных банков с поэтапным статусом и электронным чеком.
- [ ] Адаптировать существующий мобильный UI-дизайн под десктопный веб-интерфейс с боковой навигацией, верхней панелью и ограниченной шириной контента.

## Current State

Phase 3 complete: dashboard, rates, and transfer-draft routes are live, seeded, and test-covered inside the desktop shell. The next active concern is Phase 4, where the approved Russia -> China draft must transition into deterministic transaction simulation, tracker states, and a receipt that reuses the same confirmed amounts.

### Out of Scope

- Реальный backend, API и база данных — MVP предназначен для демонстрации CJM, а не для боевой эксплуатации.
- Реальные CBDC-интеграции, смарт-контракты и межбанковский процессинг — в MVP допустима только клиентская симуляция статусов и переводов.
- Production-grade безопасность, комплаенс и аудит — это отдельный контур требований за пределами дипломного прототипа.
- Реальная аутентификация, KYC и управление пользователями — для демо достаточно фиксированного пользователя и моковых данных.
- Нативное мобильное приложение — текущая задача состоит именно в адаптации мобильного дизайна к desktop web.

## Context

- Продукт ориентирован на демонстрацию взаимодействия центральных банков дружественных стран в сценарии трансграничных переводов.
- Основной scripted demo-коридор для MVP: перевод из цифрового рубля в цифровую валюту Китая; другие дружественные страны могут присутствовать в справочнике курсов как reference-only сценарии.
- Исходный UX уже существует в мобильном формате и должен быть переосмыслен как desktop SPA без потери визуальных пропорций и понятности сценария.
- Основной пользователь демо-сценария — защищающий диплом или демонстрирующий прототип участник, которому нужно быстро показать целостный пользовательский путь.
- Данные о балансах, курсах валют, истории и статусах транзакций должны эмулироваться на клиенте через JSON-файлы или состояние приложения.
- Ключевой акцент интерфейса: прозрачность конвертации, понятность маршрута перевода и наглядность статусов обработки.

## Constraints

- **Application Type**: SPA без перезагрузки страниц — нужно показать бесшовный пользовательский путь.
- **Architecture**: Frontend-only без серверной части — проект демонстрационный и должен быть простым в запуске и показе.
- **Data Layer**: Только моковые JSON/state — реальные внешние источники данных отсутствуют по условиям MVP.
- **UI Layout**: Desktop layout с `sidebar + header + main content` и `max-width: 1200px` — необходимо сохранить пропорции мобильного дизайна на широком экране.
- **Domain Scope**: Только цифровой рубль и валюты дружественных стран — это фокус дипломной демонстрации.
- **Product Goal**: Наглядная защита дипломного сценария важнее полноты банковского функционала — приоритет на ясность и визуальную убедительность.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Делать продукт как frontend-only SPA | Для дипломного MVP не нужен backend, важнее быстрый и стабильный демо-контур | — Pending |
| Использовать моковые данные для балансов, курсов и статусов | Позволяет контролировать сценарий показа и не зависеть от внешних систем | — Pending |
| Сфокусировать MVP на одном сквозном пользовательском пути трансграничного перевода | Это напрямую поддерживает основную ценность продукта и снижает риск расползания scope | — Pending |
| Зафиксировать основной demo-коридор как Россия → Китай | В ТЗ именно этот маршрут используется в конвертации и в статусах через ЦБ Китая, значит он лучше всего подходит для первого сквозного сценария | — Pending |
| Адаптировать мобильный UI в desktop-layout с sidebar/header/main | Пользователю нужен веб-формат для демонстрации, но с сохранением визуальной логики существующего дизайна | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-09 after Phase 3 completion*
