import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import { RateRow } from './RateRow'

const baseRate = {
  country: 'Китай',
  badgeToken: 'china',
  corridor: 'primary',
  baseLabel: '1 ЦР',
  forexCode: 'CNY',
  targetCurrencyLabel: 'ЦЮ',
  rateValue: 2.234,
} as const

describe('RateRow', () => {
  it('renders an upward trend badge when the rate increased', () => {
    render(
      <MemoryRouter>
        <RateRow rate={baseRate} trendDirection="up" />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Курс вырос')).toBeInTheDocument()
  })

  it('renders a downward trend badge when the rate decreased', () => {
    render(
      <MemoryRouter>
        <RateRow rate={baseRate} trendDirection="down" />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText('Курс снизился')).toBeInTheDocument()
  })
})
