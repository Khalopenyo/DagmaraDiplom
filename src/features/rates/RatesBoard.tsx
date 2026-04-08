import { cbdcRates } from '../../demo'
import { ShellCard } from '../../shell/ShellCard'
import { RateRow } from './RateRow'

const EXPECTED_COUNTRY_ORDER = ['Китай', 'Вьетнам', 'Южная Корея'] as const
const EXPECTED_RATE_VALUES = ['2.234', '1.746', '5.151'] as const

function assertRatesContract() {
  const actualCountries = cbdcRates.map((rate) => rate.country)
  const actualRateValues = cbdcRates.map((rate) => rate.rateValue.toFixed(3))

  if (
    EXPECTED_COUNTRY_ORDER.some((country, index) => actualCountries[index] !== country)
  ) {
    throw new Error('Rates country order drifted from the Phase 2 contract.')
  }

  if (
    EXPECTED_RATE_VALUES.some((value, index) => actualRateValues[index] !== value)
  ) {
    throw new Error('Rates values drifted from the Phase 2 contract.')
  }
}

export function RatesBoard() {
  assertRatesContract()

  return (
    <ShellCard className="gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">
          Обмен валют
        </h2>
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          Справочник показывает фиксированные симулированные значения для
          маршрута Россия → Китай и reference-only строк для дружественных
          стран.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {cbdcRates.map((rate) => (
          <RateRow key={rate.country} rate={rate} />
        ))}
      </div>
    </ShellCard>
  )
}
