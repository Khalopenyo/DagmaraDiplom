import { formatRateValue, type DemoCbdcRate } from '../../demo'
import { CountryFlagBadge } from './flagBadges'

interface RateRowProps {
  rate: DemoCbdcRate
}

export function RateRow({ rate }: RateRowProps) {
  const isPrimary = rate.corridor === 'primary'
  const rowClassName = isPrimary
    ? 'border-[rgba(15,108,189,0.18)] bg-[rgba(15,108,189,0.08)]'
    : 'border-[var(--color-border-soft)] bg-[var(--color-surface)]'

  return (
    <div
      className={`grid gap-4 rounded-[20px] border p-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:items-center ${rowClassName}`}
    >
      <div className="flex items-center gap-4">
        <CountryFlagBadge badgeToken={rate.badgeToken} primary={isPrimary} />
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-[var(--color-text-strong)]">
            {rate.country}
          </p>
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">
            Симулированный corridor для академического demo.
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
