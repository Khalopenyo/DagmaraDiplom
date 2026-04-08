import type { ReactNode } from 'react'

interface ShellCardProps {
  children: ReactNode
  className?: string
}

export function ShellCard({ children, className = '' }: ShellCardProps) {
  return (
    <section
      className={`flex flex-col gap-4 rounded-[24px] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 ${className}`.trim()}
    >
      {children}
    </section>
  )
}
