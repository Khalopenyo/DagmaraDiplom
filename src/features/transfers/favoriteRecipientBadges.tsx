interface FavoriteRecipientBadgeProps {
  label: string
  active: boolean
  isAddAction?: boolean
}

function getInitials(label: string) {
  if (label === '+') {
    return label
  }

  return label.slice(0, 1).toUpperCase()
}

export function FavoriteRecipientBadge({
  label,
  active,
  isAddAction = false,
}: FavoriteRecipientBadgeProps) {
  const baseClassName =
    'flex h-[68px] w-[68px] items-center justify-center rounded-full text-[28px] font-semibold transition-colors duration-150 ease-out'

  if (isAddAction) {
    return (
      <span
        aria-hidden="true"
        className={`${baseClassName} ${
          active
            ? 'bg-[rgba(62,56,199,0.12)] text-[#3E38C7]'
            : 'bg-[rgba(244,242,255,0.92)] text-[rgba(160,168,193,0.95)]'
        }`}
      >
        {label}
      </span>
    )
  }

  const avatarClassName = {
    Emma:
      'bg-[radial-gradient(circle_at_45%_30%,#f7dccd_0%,#d0c9b6_34%,#526067_100%)] text-white',
    Justin:
      'bg-[radial-gradient(circle_at_45%_25%,#f8e8de_0%,#d4cbc6_32%,#8393a6_100%)] text-white',
  }[label] ?? 'bg-[rgba(62,56,199,0.12)] text-[#3E38C7]'

  return (
    <span
      aria-hidden="true"
      className={`${baseClassName} ${avatarClassName} ${
        active ? 'ring-2 ring-[#3E38C7] ring-offset-4 ring-offset-white' : ''
      }`}
    >
      <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.16)]">
        {getInitials(label)}
      </span>
    </span>
  )
}
