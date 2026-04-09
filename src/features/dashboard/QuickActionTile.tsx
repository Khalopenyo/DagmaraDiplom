import { Link } from 'react-router'

import type { DemoQuickAction } from '../../demo'
import { QuickActionIcon } from './quickActionIcons'

const ACCOUNT_ACTION_LABEL = 'Аккаунт и счета'
const PRIMARY_TRANSFER_LABEL = 'Переводы'
const PRIMARY_TRANSFER_TARGET = '/transfers'

interface QuickActionTileProps {
  action: DemoQuickAction
}

export function QuickActionTile({ action }: QuickActionTileProps) {
  const isAccountAction =
    action.mode === 'display' &&
    action.label === ACCOUNT_ACTION_LABEL &&
    action.iconKey === 'account'
  const isPrimaryTransfer =
    action.mode === 'route' &&
    action.label === PRIMARY_TRANSFER_LABEL &&
    action.to === PRIMARY_TRANSFER_TARGET

  if (isAccountAction) {
    return (
      <button
        aria-label={action.label}
        className="group flex min-h-[132px] cursor-pointer appearance-none flex-col items-center justify-center gap-3 border-0 bg-transparent px-2 py-4 text-center transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#534dc9]"
        onClick={() =>
          document
            .getElementById('dashboard-account-summary')
            ?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
        }
        type="button"
      >
        <QuickActionIcon accent={false} bare iconKey={action.iconKey} />
        <span className="text-[15px] font-medium leading-5 text-[var(--color-text-muted)]">
          {action.label}
        </span>
      </button>
    )
  }

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
