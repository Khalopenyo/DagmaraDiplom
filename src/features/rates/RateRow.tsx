import { formatRateValue, type DemoCbdcRate } from '../../demo'
import { CountryFlagBadge } from './flagBadges'

interface RateRowProps {
  rate: DemoCbdcRate
}

export function RateRow({ rate }: RateRowProps) {
  const isPrimary = rate.corridor === 'primary'
  const corridorLabel = isPrimary ? 'Основной маршрут' : 'Справочно'
  const rowClassName = isPrimary
    ? 'border-[rgba(15,108,189,0.18)] bg-[rgba(15,108,189,0.08)]'
    : 'border-[var(--color-border-soft)] bg-[var(--color-surface)]'
  const corridorBadgeClassName = isPrimary
    ? 'bg-[rgba(15,108,189,0.12)] text-[var(--color-accent)]'
    : 'bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]'

  return (
    <div
      aria-label={rate.country}
      className={`grid gap-4 rounded-[20px] border p-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:items-center ${rowClassName}`}
      role="group"
    >
      <div className="flex items-center gap-4">
        <CountryFlagBadge badgeToken={rate.badgeToken} primary={isPrimary} />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-base font-semibold text-[var(--color-text-strong)]">
              {rate.country}
            </p>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${corridorBadgeClassName}`}
            >
              {corridorLabel}
            </span>
          </div>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">
            Симулированные значения без live-конвертации и без переключения
            corridor в Phase 2.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          База
        </p>
        <p className="text-base font-semibold text-[var(--color-text-strong)]">
          1 ЦР
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          Курс ЦВ
        </p>
        <p className="text-[22px] font-semibold leading-[1.2] text-[var(--color-text-strong)]">
          {formatRateValue(rate.rateValue)}
        </p>
      </div>
    </div>
  )
}
