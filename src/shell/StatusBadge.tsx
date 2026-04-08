import type { ReactNode } from 'react'

interface StatusBadgeProps {
  children: ReactNode
}

export function StatusBadge({ children }: StatusBadgeProps) {
  return (
    <span className="inline-flex h-8 items-center rounded-full bg-[rgba(15,108,189,0.12)] px-3 text-sm font-semibold text-[var(--color-accent)]">
      {children}
    </span>
  )
}
