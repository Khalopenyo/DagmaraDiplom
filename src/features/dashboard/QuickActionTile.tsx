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
    'group flex min-h-[132px] flex-col items-center justify-center gap-4 rounded-[24px] border px-4 py-5 text-center shadow-[0_18px_32px_rgba(24,38,58,0.08)] transition-all duration-150 ease-out'

  if (action.mode === 'route') {
    return (
      <Link
        aria-label={action.label}
        className={`${baseClassName} border-[rgba(83,77,201,0.12)] bg-[rgba(255,255,255,0.94)] text-[var(--color-text-strong)] hover:-translate-y-0.5 hover:shadow-[0_22px_36px_rgba(83,77,201,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#534dc9]`}
        to="/transfers"
      >
        <QuickActionIcon accent={isPrimaryTransfer} iconKey={action.iconKey} />
        <span className="text-[15px] font-medium leading-5 text-[var(--color-text-strong)]">
          {action.label}
        </span>
      </Link>
    )
  }

  return (
    <article
      className={`${baseClassName} border-[rgba(24,38,58,0.04)] bg-[rgba(255,255,255,0.92)] text-[var(--color-text-strong)]`}
    >
      <QuickActionIcon accent={false} iconKey={action.iconKey} />
      <span className="text-[15px] font-medium leading-5 text-[var(--color-text-muted)]">
        {action.label}
      </span>
    </article>
  )
}
