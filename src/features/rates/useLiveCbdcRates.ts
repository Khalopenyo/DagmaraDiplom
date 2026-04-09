import { useEffect, useMemo, useState } from 'react'

import { cbdcRates, type DemoCbdcRate } from '../../demo'

const REFRESH_INTERVAL_MS = 60_000
const HISTORY_WINDOW_DAYS = 10

export type RateTrendDirection = 'up' | 'down' | 'neutral'

interface FrankfurterRateEntry {
  date: string
  quote: DemoCbdcRate['forexCode']
  rate: number
}

function formatApiDate(value: Date) {
  return value.toISOString().slice(0, 10)
}

function buildForexApiUrl() {
  const today = new Date()
  const fromDate = new Date(today)
  fromDate.setDate(today.getDate() - HISTORY_WINDOW_DAYS)

  const searchParams = new URLSearchParams({
    base: 'RUB',
    from: formatApiDate(fromDate),
    to: formatApiDate(today),
    quotes: 'CNY,VND,KRW,INR,NIO,EUR',
  })

  return `https://api.frankfurter.dev/v2/rates?${searchParams.toString()}`
}

export function resolveRateTrendDirection(
  currentRate: number | undefined,
  previousRate: number | undefined,
): RateTrendDirection {
  if (
    !Number.isFinite(currentRate)
    || !Number.isFinite(previousRate)
    || currentRate === previousRate
  ) {
    return 'neutral'
  }

  return currentRate > previousRate ? 'up' : 'down'
}

export function useLiveCbdcRates() {
  const [liveRates, setLiveRates] = useState<
    Partial<Record<DemoCbdcRate['forexCode'], number>>
  >({})
  const [rateTrends, setRateTrends] = useState<
    Partial<Record<DemoCbdcRate['forexCode'], RateTrendDirection>>
  >({})

  useEffect(() => {
    if (import.meta.env.MODE === 'test') {
      return undefined
    }

    let isDisposed = false

    async function syncRates() {
      try {
        const response = await fetch(buildForexApiUrl(), {
          headers: {
            accept: 'application/json',
          },
        })

        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as FrankfurterRateEntry[]
        const historyByQuote = payload.reduce<Record<DemoCbdcRate['forexCode'], FrankfurterRateEntry[]>>(
          (accumulator, entry) => {
            if (!Number.isFinite(entry.rate)) {
              return accumulator
            }

            if (!accumulator[entry.quote]) {
              accumulator[entry.quote] = []
            }

            accumulator[entry.quote].push(entry)

            return accumulator
          },
          {} as Record<DemoCbdcRate['forexCode'], FrankfurterRateEntry[]>,
        )

        const nextRates: Partial<Record<DemoCbdcRate['forexCode'], number>> = {}
        const nextRateTrends: Partial<Record<DemoCbdcRate['forexCode'], RateTrendDirection>> = {}

        for (const [quote, history] of Object.entries(historyByQuote) as Array<
          [DemoCbdcRate['forexCode'], FrankfurterRateEntry[]]
        >) {
          const sortedHistory = [...history].sort((left, right) => left.date.localeCompare(right.date))
          const latestEntry = sortedHistory.at(-1)
          const previousEntry = sortedHistory.at(-2)

          if (latestEntry) {
            nextRates[quote] = latestEntry.rate
            nextRateTrends[quote] = resolveRateTrendDirection(
              latestEntry.rate,
              previousEntry?.rate,
            )
          }
        }

        if (!isDisposed && Object.keys(nextRates).length > 0) {
          setLiveRates(nextRates)
          setRateTrends(nextRateTrends)
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

  return useMemo(() => {
    const rates = cbdcRates.map((rate) => ({
      ...rate,
      rateValue: liveRates[rate.forexCode] ?? rate.rateValue,
    }))

    return {
      rates,
      rateTrends,
    }
  }, [liveRates, rateTrends])
}
