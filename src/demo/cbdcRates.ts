import type { DemoCbdcRate } from './types'

export const cbdcRates = [
  {
    country: 'Китай',
    badgeToken: 'china',
    corridor: 'primary',
    baseLabel: '1 ЦР',
    rateValue: 2.234,
  },
  {
    country: 'Вьетнам',
    badgeToken: 'vietnam',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 1.746,
  },
  {
    country: 'Южная Корея',
    badgeToken: 'south-korea',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 5.151,
  },
] as const satisfies readonly DemoCbdcRate[]
