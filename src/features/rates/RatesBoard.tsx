import { RateRow } from './RateRow'
import { useLiveCbdcRates } from './useLiveCbdcRates'

const EXPECTED_COUNTRY_ORDER = [
  'Вьетнам',
  'Никарагуа',
  'Южная Корея',
  'Индия',
  'Китай',
  'Португалия',
  'Франция',
] as const

function assertRatesContract(countryOrder: readonly string[]) {
  const actualCountries = countryOrder

  if (
    EXPECTED_COUNTRY_ORDER.some((country, index) => actualCountries[index] !== country)
  ) {
    throw new Error('Rates country order drifted from the Phase 2 contract.')
  }
}

export function RatesBoard() {
  const rates = useLiveCbdcRates()

  assertRatesContract(rates.map((rate) => rate.country))

  return (
    <section className="overflow-hidden rounded-[32px] border border-[rgba(24,38,58,0.08)] bg-[rgba(255,255,255,0.96)] shadow-[0_24px_48px_rgba(24,38,58,0.08)]">
      <div className="grid grid-cols-[minmax(0,1.7fr)_56px_92px] items-end gap-4 border-b border-[rgba(24,38,58,0.08)] px-6 py-5 text-sm font-semibold text-[var(--color-text-muted)] sm:grid-cols-[minmax(0,1.9fr)_72px_110px] sm:px-8">
        <p>Страна</p>
        <p className="text-center">ЦР</p>
        <p className="text-right">
          <span className="sr-only">ЦВ страны</span>
          <span aria-hidden="true">
            ЦВ
            <br />
            страны
          </span>
        </p>
      </div>

      <div className="flex flex-col">
        {rates.map((rate) => (
          <RateRow key={rate.country} rate={rate} />
        ))}
      </div>
    </section>
  )
}
