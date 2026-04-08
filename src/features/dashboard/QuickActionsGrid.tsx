import { quickActions } from '../../demo'
import { ShellCard } from '../../shell/ShellCard'
import { QuickActionTile } from './QuickActionTile'

const QUICK_ACTIONS_HEADING = 'Быстрые действия'
const EXPECTED_QUICK_ACTION_LABELS = [
  'Аккаунт и счета',
  'Переводы',
  'Снятие',
  'Оплата счета',
  'Накопления',
  'Кредитная карта',
  'Отчет о транзакциях',
  'Контакты',
] as const

function assertQuickActionContract() {
  const actualLabels = quickActions.map((action) => action.label)

  if (
    actualLabels.length !== EXPECTED_QUICK_ACTION_LABELS.length ||
    EXPECTED_QUICK_ACTION_LABELS.some((label, index) => actualLabels[index] !== label)
  ) {
    throw new Error('Dashboard quick action seed drifted from the Phase 2 contract.')
  }
}

export function QuickActionsGrid() {
  assertQuickActionContract()

  return (
    <section
      aria-labelledby="dashboard-quick-actions-heading"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <h2
          className="text-xl font-semibold text-[var(--color-text-strong)]"
          id="dashboard-quick-actions-heading"
        >
          {QUICK_ACTIONS_HEADING}
        </h2>
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          Один live-переход продолжает corridor `Россия → Китай`, остальные
          действия фиксируют структуру MVP без недостроенных backend-веток.
        </p>
      </div>

      <ShellCard className="gap-5 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => (
            <QuickActionTile action={action} key={action.label} />
          ))}
        </div>
      </ShellCard>
    </section>
  )
}
