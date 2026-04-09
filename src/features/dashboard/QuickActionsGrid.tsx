import { quickActions } from '../../demo'
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
      className="flex flex-col gap-5"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          className="text-lg font-semibold text-[var(--color-text-strong)] sm:text-xl"
          id="dashboard-quick-actions-heading"
        >
          {QUICK_ACTIONS_HEADING}
        </h2>
        <p className="max-w-[28ch] text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          Адаптировано из mobile dashboard в desktop-grid
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <QuickActionTile action={action} key={action.label} />
        ))}
      </div>
    </section>
  )
}
