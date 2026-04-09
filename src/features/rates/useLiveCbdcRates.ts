import { useEffect, useMemo, useState } from 'react'

import { cbdcRates, type DemoCbdcRate } from '../../demo'

const FOREX_API_URL =
  'https://api.frankfurter.dev/v2/rates?base=RUB&quotes=CNY,VND,KRW,INR,NIO,EUR'
const REFRESH_INTERVAL_MS = 60_000

interface FrankfurterRateEntry {
  quote: DemoCbdcRate['forexCode']
  rate: number
}

export function useLiveCbdcRates() {
  const [liveRates, setLiveRates] = useState<
    Partial<Record<DemoCbdcRate['forexCode'], number>>
  >({})

  useEffect(() => {
    if (import.meta.env.MODE === 'test') {
      return undefined
    }

    let isDisposed = false

    async function syncRates() {
      try {
        const response = await fetch(FOREX_API_URL, {
          headers: {
            accept: 'application/json',
          },
        })

        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as FrankfurterRateEntry[]
        const nextRates = payload.reduce<Partial<Record<DemoCbdcRate['forexCode'], number>>>(
          (accumulator, entry) => {
            if (Number.isFinite(entry.rate)) {
              accumulator[entry.quote] = entry.rate
            }

            return accumulator
          },
          {},
        )

        if (!isDisposed && Object.keys(nextRates).length > 0) {
          setLiveRates(nextRates)
        }
      } catch {
        // Preserve seeded fallback rates when the public FX endpoint is unavailable.
      }
    }

    void syncRates()

    const refreshIntervalId = window.setInterval(() => {
      void syncRates()
    }, REFRESH_INTERVAL_MS)

    return () => {
      isDisposed = true
      window.clearInterval(refreshIntervalId)
    }
  }, [])

  return useMemo(
    () => cbdcRates.map((rate) => ({
      ...rate,
      rateValue: liveRates[rate.forexCode] ?? rate.rateValue,
    })),
    [liveRates],
  )
}
