interface FavoriteRecipientBadgeProps {
  label: string
  active: boolean
  isAddAction?: boolean
}

function getInitials(label: string) {
  if (label === '+') {
    return label
  }

  return label.slice(0, 2).toUpperCase()
}

export function FavoriteRecipientBadge({
  label,
  active,
  isAddAction = false,
}: FavoriteRecipientBadgeProps) {
  const baseClassName =
    'flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-150 ease-out'

  if (isAddAction) {
    return (
      <span
        aria-hidden="true"
        className={`${baseClassName} ${
          active
            ? 'border-[var(--color-accent)] bg-[rgba(15,108,189,0.12)] text-[var(--color-accent)]'
            : 'border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'
        }`}
      >
        {label}
      </span>
    )
  }

  return (
    <span
      aria-hidden="true"
      className={`${baseClassName} ${
        active
          ? 'border-[var(--color-accent)] bg-[rgba(15,108,189,0.14)] text-[var(--color-accent)]'
          : 'border-transparent bg-[color-mix(in_srgb,var(--color-surface-muted)_76%,rgba(15,108,189,0.08))] text-[var(--color-text-strong)]'
      }`}
    >
      {getInitials(label)}
    </span>
  )
}
