import { useAuth } from '../features/auth'

import { GlobalSearch } from './GlobalSearch'
import { NotificationButton } from './NotificationButton'

export function TopHeader() {
  const { user } = useAuth()

  return (
    <header className="flex h-20 items-center justify-between border-b border-[var(--color-border-soft)] bg-[var(--color-surface)] px-8">
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight text-[var(--color-text-strong)]">
          {user ? `Здравствуйте, ${user.fullName.split(' ')[1] || user.fullName.split(' ')[0]}` : ''}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <GlobalSearch />
        <NotificationButton />
      </div>
    </header>
  )
}
