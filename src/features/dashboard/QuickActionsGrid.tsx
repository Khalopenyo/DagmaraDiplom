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
    <section aria-label={QUICK_ACTIONS_HEADING} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <QuickActionTile action={action} key={action.label} />
        ))}
      </div>
    </section>
  )
}
