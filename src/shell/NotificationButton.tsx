import { BellIcon } from './icons'

export function NotificationButton() {
  return (
    <button
      type="button"
      aria-label="Уведомления"
      title="Уведомления"
      className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-strong)] transition-colors duration-150 ease-out hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      <BellIcon className="h-5 w-5" />
    </button>
  )
}
