import type { DemoCbdcRate } from './types'

export const cbdcRates = [
  {
    country: 'Вьетнам',
    badgeToken: 'vietnam',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 1.746,
  },
  {
    country: 'Никарагуа',
    badgeToken: 'nicaragua',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 12.09,
  },
  {
    country: 'Южная Корея',
    badgeToken: 'south-korea',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 5.151,
  },
  {
    country: 'Индия',
    badgeToken: 'india',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 144.4,
  },
  {
    country: 'Китай',
    badgeToken: 'china',
    corridor: 'primary',
    baseLabel: '1 ЦР',
    rateValue: 2.234,
  },
  {
    country: 'Португалия',
    badgeToken: 'portugal',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 1.746,
  },
  {
    country: 'Франция',
    badgeToken: 'france',
    corridor: 'reference',
    baseLabel: '1 ЦР',
    rateValue: 34.56,
  },
] as const satisfies readonly DemoCbdcRate[]
