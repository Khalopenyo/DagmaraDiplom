import { SHELL_BADGE_LABEL } from '../content/demoCopy'
import { useAuth } from '../features/auth'

import { GlobalSearchStub } from './GlobalSearchStub'
import { NotificationButton } from './NotificationButton'
import { StatusBadge } from './StatusBadge'

export function TopHeader() {
  const { user } = useAuth()

  return (
    <header className="flex h-20 items-center justify-between border-b border-[var(--color-border-soft)] bg-[var(--color-surface)] px-8">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-muted)]">
          {user ? `Здравствуйте, ${user.fullName}` : ''}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <GlobalSearchStub />
        <StatusBadge>{SHELL_BADGE_LABEL}</StatusBadge>
        <NotificationButton />
      </div>
    </header>
  )
}
