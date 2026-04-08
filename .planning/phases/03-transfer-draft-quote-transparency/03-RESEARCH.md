# Phase 3: Transfer Draft & Quote Transparency - Research

**Researched:** 2026-04-08
**Domain:** Editable transfer draft and quote transparency for the scripted Russia -> China CBDC corridor
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
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

### Deferred Ideas (OUT OF SCOPE)
- Submit side effects, transaction ID, status simulation, tracker, receipt
- Multi-corridor switching or live FX logic
- Contact-management, AML/KYC or backend-shaped account orchestration
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| XFER-01 | Пользователь может выбрать счет списания и видит доступный остаток перед отправкой перевода. | Render one seeded selector surface with visible available balance and keep it tied to Phase 2 account data. |
| XFER-02 | Пользователь может выбрать тип перевода: по номеру карты или по номеру телефона. | Use one local transfer-mode switch with two explicit labels and mode-aware identifier labels. |
| XFER-03 | Пользователь может выбрать избранного получателя из карусели с предзаполненными контактами или начать добавление нового. | Seed `Emma`, `Justin`, and `+` in a compact favorites strip with prefilling behavior only. |
| XFER-04 | Пользователь может вручную ввести идентификатор получателя в формате, соответствующем выбранному типу перевода. | Keep the identifier input always visible and validate it against the active mode. |
| XFER-05 | Пользователь может указать сумму списания, после чего сумма получения автоматически пересчитывается по выбранному курсу. | Treat debit amount as the single writable monetary source of truth and derive recipient amount from the China rate helper. |
| XFER-06 | Пользователь видит до подтверждения курс конвертации, сумму списания, сумму получения, комиссию платформы и итог. | Build one quote summary card from shared quote helpers and display the full breakdown before CTA. |
| XFER-07 | Пользователь не может подтвердить перевод, если обязательные поля не заполнены или сумма превышает доступный остаток. | Centralize draft validation in helper functions and wire the CTA disabled state to those results. |
</phase_requirements>

## Summary

Phase 3 is the first writable surface in the MVP, so the architecture must stay narrow: one route, one local draft state, one locked corridor, and one derived quote summary. The cleanest implementation path is to keep the shell and route metadata intact, introduce a small transfer-specific demo domain under `src/demo/`, and let `/transfers` own the only editable state while all quote details are derived from helpers.

The strongest pattern for this phase is a split desktop layout: one form card for the editable fields, one persistent quote card for the derived result. The form should not become a wizard. All inputs required for the scripted story should stay visible together: source account, transfer type, favorite recipients, recipient identifier, and debit amount. The quote side should recalculate immediately and expose the same math that later tracker/receipt phases must inherit.

**Primary recommendation:** Split the phase into three plans. First, create transfer-specific seed data, quote helpers, and validation logic under `src/demo/` with unit coverage. Second, replace the `/transfers` placeholder with a real draft form plus route-level interaction coverage for source account, transfer mode, favorites, and identifier editing. Third, add the derived quote preview and CTA gating using the same helpers, then extend the route tests to prove amount recalculation and disabled-state rules.

## Project Constraints (from AGENTS.md / PROJECT.md)

- Frontend-only SPA with no backend/API/database.
- `React 19`, `TypeScript 5.9`, `Vite 8`, `React Router 7`, `Tailwind CSS 4`, `Vitest 4`.
- Desktop shell, dashboard, and rates routes are already validated and must remain intact.
- Primary executable corridor remains `Россия -> Китай`.
- Vietnam and South Korea remain reference-only, not selectable for execution.
- Data must stay in local modules or local route state; no async FX, auth, admin, or live integrations.
- Phase 3 stops before real submit side effects, tracker, and receipt generation.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `react` | `19.2.4` | Local form state, derived quote rendering, route composition | Already installed and aligned with the existing app. |
| `react-router` | `7.14.0` | Keeps the transfer route inside the SPA shell and preserves CTA semantics | Existing router contract already powers all top-level routes. |
| `tailwindcss` | `4.2.2` | Lays out split desktop transfer form and quote card | Existing tokenized utility styling is sufficient. |
| `typescript` | `5.9.3` | Types transfer modes, favorites, validation results, and quote breakdowns | Prevents drift between form logic and later tracker/receipt phases. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `vitest` | `4.1.3` | Unit coverage for quote math and route-level assertions for `/transfers` | Use for the deterministic money math and SPA contract. |
| `@testing-library/react` | `16.3.2` | Render route pages under the existing shell | Use for visible form, mode toggle, favorites, and quote breakdown checks. |
| `@testing-library/user-event` | `14.6.1` | Drive toggles, favorites, amount entry, and CTA-state assertions | Use for the real route interactions the user will demo. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Transfer-specific demo helpers in `src/demo/` | Inline calculation and validation inside `TransfersPage.tsx` | Faster short-term, but risks quote drift between Phase 3 and Phase 4. |
| One route with simultaneous form + quote | Multi-step wizard | Wizard sequencing hides the quote and adds state transitions before they are needed. |
| Route-level test file plus helper unit tests | Form-only manual testing | Manual-only verification would not adequately protect money math or disabled-state rules. |

## Architecture Patterns

### Recommended Project Structure Extension
```text
src/
├── demo/
│   ├── favoriteRecipients.ts
│   ├── transferOptions.ts
│   ├── transferQuote.ts
│   └── transferQuote.test.ts
├── features/
│   └── transfers/
│       ├── TransferDraftForm.tsx
│       ├── TransferTypeSelector.tsx
│       ├── FavoriteRecipientsStrip.tsx
│       └── QuotePreviewCard.tsx
└── pages/
    ├── TransfersPage.tsx
    └── TransfersPage.test.tsx
```

### Pattern 1: One Writable Draft, Everything Else Derived
**What:** Keep local route state only for mode, selected favorite, identifier, and debit amount string.
**When to use:** Immediately in Phase 3, because quote preview and CTA gating must stay deterministic.
**Example:** Debit input changes -> helper recomputes recipient amount, fee, total, and validity without any second editable amount field.

### Pattern 2: Quote Helper Module, Not JSX Math
**What:** Put quote math and draft validation in pure helper functions under `src/demo/transferQuote.ts`.
**When to use:** Before wiring UI, so unit tests can prove `100 ₽ -> 223.40 ¥`, fee `10 ₽`, total `110 ₽`.
**Trade-off:** Slightly more files, but dramatically lower risk of later tracker/receipt mismatches.

### Pattern 3: Route-Level Integration Tests for Real Interactions
**What:** Use `TransfersPage.test.tsx` to assert the full visible contract for toggles, favorites, amount entry, and disabled confirmation.
**When to use:** As the main regression layer for Phase 3 UI behavior.
**Trade-off:** Tests are broader, but they protect the actual demo path instead of implementation-only details.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Quote math | JSX-local arithmetic spread across components | One pure helper module in `src/demo/transferQuote.ts` | Prevents drift and simplifies later Phase 4 reuse. |
| Recipient favorites | Backend-shaped contacts store or modal management flow | One local favorites strip with seeded metadata | Keeps the MVP narrow and the demo fast. |
| Validation | Hidden browser-only constraints with no explicit UI rules | Mode-aware validation helpers plus visible disabled-state reasons | Makes the scripted flow understandable during the demo. |
| Account switching | Async fetch or fake account provider | One seeded account selector shell | Satisfies the requirement without inventing backend behavior. |

## Common Pitfalls

### Pitfall 1: The form becomes a generic banking wizard
**What goes wrong:** Inputs are split across hidden steps, tabs, or drawers, so the user cannot see how the amount maps to the quote.
**How to avoid:** Keep the entire draft on one route and keep the quote visible while editing.

### Pitfall 2: FX becomes a black box again
**What goes wrong:** The route shows a recipient amount but hides the exact rate, fee, or total until a later phase.
**How to avoid:** Show the full breakdown in the quote card before confirmation and use the exact line `1 ЦР = 2.234 ЦЮ`.

### Pitfall 3: Favorites replace manual entry
**What goes wrong:** Clicking `Emma` or `Justin` hides the identifier field, making the demo look like a canned shortcut rather than an editable transfer.
**How to avoid:** Keep favorites as prefills only; the identifier field always remains visible and editable.

### Pitfall 4: Phase 3 quietly starts Phase 4
**What goes wrong:** The page creates fake transaction IDs, navigates on confirm, or shows receipt-like panels too early.
**How to avoid:** Keep `Подтвердить` as a readiness boundary only. No tracker or receipt behavior yet.

## Code Examples

### Example 1: Deterministic quote helper contract
```ts
export function buildTransferQuote(debitAmount: number) {
  const recipientAmount = debitAmount * 2.234
  const feeAmount = 10
  const totalAmount = debitAmount + feeAmount

  return { recipientAmount, feeAmount, totalAmount }
}
```

### Example 2: Mode-aware recipient validation contract
```ts
export function validateRecipientIdentifier(mode: 'card' | 'phone', value: string) {
  if (mode === 'card') {
    return /^\d{16}$/.test(value.replace(/\s+/g, ''))
  }

  return /^\+?\d[\d\s()-]{9,}$/.test(value)
}
```

## State of the Art

- `/transfers` is still a Phase 1 placeholder and is the only top-level route without a validated Phase 2 replacement.
- Shared demo modules already exist for the Dagmara account and the China rate, so Phase 3 should consume them instead of redefining those values.
- Route-level and shell-level testing are already green in the repo, so Phase 3 can immediately extend the same test style for transfer interactions.

## Open Questions

1. **Should the quote card stay sticky on desktop?**
   What we know: the quote must remain visible while editing and should not be hidden behind a step.
   What's unclear: the exact CSS behavior at smaller laptop widths.
   Recommendation: Plan for a sticky card on wide screens, but keep the component valid in a normal stacked flow too.

2. **Should favorites prefill both card and phone values?**
   What we know: the field must remain editable and mode-aware.
   What's unclear: whether the chip click should switch modes automatically.
   Recommendation: Keep the current mode unchanged; favorite selection should prefill the identifier for that mode only.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | helper tests, route tests, Vite build | ✓ | `22.20.0` | — |
| npm | scripts and dependency resolution | ✓ | `10.9.3` | — |
| `vitest` CLI | unit and route assertions | ✓ | local install | `npm run test -- --run` |
| `vite` CLI | build verification | ✓ | local install | `npm run build` |

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
| XFER-01 | Transfer route shows one seeded source account selector and available balance before confirmation | integration | `npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned in Phase 3 |
| XFER-02 | Transfer type switch exposes `По номеру карты` and `По номеру телефона` | integration | `npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned in Phase 3 |
| XFER-03 | Favorites strip shows `Emma`, `Justin`, and `+` with prefilling behavior | integration | `npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned in Phase 3 |
| XFER-04 | Manual recipient identifier is validated against the active mode | unit + integration | `npm run test -- src/demo/transferQuote.test.ts --run && npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned in Phase 3 |
| XFER-05 | Debit amount recalculates the recipient amount automatically from the China rate | unit + integration | `npm run test -- src/demo/transferQuote.test.ts --run && npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned in Phase 3 |
| XFER-06 | Quote preview shows rate, debit, recipient, fee, and total before confirmation | integration | `npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned in Phase 3 |
| XFER-07 | Confirm stays disabled when fields are missing or the amount exceeds the balance | unit + integration | `npm run test -- src/demo/transferQuote.test.ts --run && npm run test -- src/pages/TransfersPage.test.tsx --run` | ✅ planned in Phase 3 |

### Sampling Rate
- **Per task commit:** `npm exec tsc --noEmit`
- **Per plan wave:** run the task-specific helper or route test file for that wave
- **Phase gate:** `npm run test -- --run && npm run build`

## Sources

### Primary (HIGH confidence)
- [03-CONTEXT.md](/Users/tkestkes/Dagmara/.planning/phases/03-transfer-draft-quote-transparency/03-CONTEXT.md) - locked Phase 3 decisions and exact corridor boundaries
- [03-UI-SPEC.md](/Users/tkestkes/Dagmara/.planning/phases/03-transfer-draft-quote-transparency/03-UI-SPEC.md) - approved visual and interaction contract for the transfer route
- [PROJECT.md](/Users/tkestkes/Dagmara/.planning/PROJECT.md) - MVP scope, frontend-only constraints and validated Phase 2 state
- [REQUIREMENTS.md](/Users/tkestkes/Dagmara/.planning/REQUIREMENTS.md) - Phase 3 requirement IDs and traceability
- [ROADMAP.md](/Users/tkestkes/Dagmara/.planning/ROADMAP.md) - Phase 3 goal and success criteria
- [02-CONTEXT.md](/Users/tkestkes/Dagmara/.planning/phases/02-dashboard-rates-context/02-CONTEXT.md) - fixed account and rates decisions reused in the transfer draft
- [02-VERIFICATION.md](/Users/tkestkes/Dagmara/.planning/phases/02-dashboard-rates-context/02-VERIFICATION.md) - proof that Phase 2 context is already satisfied
- [ARCHITECTURE.md](/Users/tkestkes/Dagmara/.planning/research/ARCHITECTURE.md) - project-level recommendation for one writable draft and derived downstream state
- [PITFALLS.md](/Users/tkestkes/Dagmara/.planning/research/PITFALLS.md) - FX transparency and misleading-demo pitfalls relevant to the transfer surface
- [src/pages/TransfersPage.tsx](/Users/tkestkes/Dagmara/src/pages/TransfersPage.tsx) - current placeholder implementation to replace

### Secondary (MEDIUM confidence)
- None. Phase 3 is primarily constrained by already validated project-local artifacts.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Architecture: HIGH — existing shell and shared demo modules already constrain the right approach.
- Verification: HIGH — unit and route test infrastructure already exists and is green.
- Visual hierarchy: MEDIUM — final polish still depends on execution quality of the split layout.
