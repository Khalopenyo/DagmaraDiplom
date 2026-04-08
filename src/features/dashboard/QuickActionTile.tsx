import { Link } from 'react-router'

import type { DemoQuickAction } from '../../demo'
import { QuickActionIcon } from './quickActionIcons'

const PRIMARY_TRANSFER_LABEL = 'Переводы'
const PRIMARY_TRANSFER_TARGET = '/transfers'

interface QuickActionTileProps {
  action: DemoQuickAction
}

export function QuickActionTile({ action }: QuickActionTileProps) {
  const isPrimaryTransfer =
    action.mode === 'route' &&
    action.label === PRIMARY_TRANSFER_LABEL &&
    action.to === PRIMARY_TRANSFER_TARGET

  const baseClassName =
    'flex min-h-[148px] flex-col justify-between rounded-[24px] border p-5 text-left shadow-[var(--shadow-card)] transition-colors duration-150 ease-out'

  if (action.mode === 'route') {
    return (
      <Link
        aria-label={action.label}
        className={`${baseClassName} border-[rgba(15,108,189,0.18)] bg-[rgba(15,108,189,0.08)] text-[var(--color-text-strong)] hover:bg-[rgba(15,108,189,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]`}
        to="/transfers"
      >
        <QuickActionIcon accent={isPrimaryTransfer} iconKey={action.iconKey} />
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold leading-6">{action.label}</span>
          <span
            aria-hidden="true"
            className="text-sm leading-6 text-[var(--color-text-muted)]"
          >
            Продолжить основной demo-сценарий перевода.
          </span>
        </div>
      </Link>
    )
  }

  return (
    <article
      className={`${baseClassName} border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-strong)]`}
    >
      <QuickActionIcon accent={false} iconKey={action.iconKey} />
      <div className="flex flex-col gap-2">
        <span className="text-base font-semibold leading-6">{action.label}</span>
        <span className="text-sm leading-6 text-[var(--color-text-muted)]">
          Контекстный раздел закреплен для следующих фаз.
        </span>
      </div>
    </article>
  )
}
