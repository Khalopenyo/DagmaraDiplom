import { Link } from 'react-router'

import { formatRateValue, type DemoCbdcRate } from '../../demo'
import { buildExchangeRoutePath } from '../../content/exchangeRoutes'
import type { RateTrendDirection } from './useLiveCbdcRates'
import { CountryFlagBadge } from './flagBadges'

interface RateRowProps {
  rate: DemoCbdcRate
  trendDirection?: RateTrendDirection
}

export function RateRow({
  rate,
  trendDirection = 'neutral',
}: RateRowProps) {
  const isPrimary = rate.corridor === 'primary'
  const corridorLabel = isPrimary ? 'Основной маршрут' : 'Справочно'

  return (
    <Link
      aria-label={rate.country}
      className="grid grid-cols-[minmax(0,1.7fr)_56px_92px] items-center gap-4 border-b border-[rgba(24,38,58,0.08)] px-6 py-5 text-inherit no-underline transition-colors duration-150 hover:bg-[rgba(62,56,199,0.04)] focus-visible:bg-[rgba(62,56,199,0.04)] focus-visible:outline-none last:border-b-0 sm:grid-cols-[minmax(0,1.9fr)_72px_110px] sm:px-8"
      to={buildExchangeRoutePath(rate.badgeToken)}
    >
      <div className="flex min-w-0 items-center gap-4">
        <CountryFlagBadge badgeToken={rate.badgeToken} primary={isPrimary} />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-[var(--color-text-strong)] sm:text-[16px]">
            {rate.country}
          </p>
          <span className="sr-only">{corridorLabel}</span>
        </div>
      </div>

      <p className="text-center text-[17px] font-medium text-[var(--color-text-strong)]">
        1
      </p>

      <div className="flex items-center justify-end gap-2">
        <span
          aria-hidden="true"
          className={isPrimary ? 'h-2 w-2 rounded-full bg-[#E24B43]' : 'hidden'}
        />
        {trendDirection !== 'neutral' ? (
          <span
            aria-label={trendDirection === 'up' ? 'Курс вырос' : 'Курс снизился'}
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
              trendDirection === 'up'
                ? 'bg-[rgba(37,181,108,0.14)] text-[#25B56C]'
                : 'bg-[rgba(255,90,114,0.14)] text-[#FF5A72]'
            }`}
          >
            {trendDirection === 'up' ? '↑' : '↓'}
          </span>
        ) : null}
        <p className="text-right text-[17px] font-medium text-[var(--color-text-strong)] sm:text-[18px]">
          {formatRateValue(rate.rateValue)}
        </p>
      </div>
    </Link>
  )
}
