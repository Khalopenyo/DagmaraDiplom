import type { DemoCountryBadgeToken } from '../../demo'

interface CountryFlagBadgeProps {
  badgeToken: DemoCountryBadgeToken
  primary: boolean
}

const badgeLabels: Record<DemoCountryBadgeToken, string> = {
  china: 'CN',
  vietnam: 'VN',
  'south-korea': 'KR',
}

const badgeColorTokens: Record<DemoCountryBadgeToken, string> = {
  china: 'from-[#C93C37] to-[#F4C542]',
  vietnam: 'from-[#D64545] to-[#F0C73B]',
  'south-korea': 'from-[#1866C0] to-[#D64545]',
}

export function CountryFlagBadge({
  badgeToken,
  primary,
}: CountryFlagBadgeProps) {
  const ringClassName = primary
    ? 'ring-2 ring-[rgba(15,108,189,0.18)]'
    : 'ring-1 ring-[rgba(24,38,58,0.06)]'

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-11 w-11 items-center justify-center rounded-[16px] bg-gradient-to-br ${badgeColorTokens[badgeToken]} text-sm font-semibold tracking-[0.12em] text-white ${ringClassName}`}
    >
      {badgeLabels[badgeToken]}
    </span>
  )
}
