import { describe, expect, it } from 'vitest'

import { resolveRateTrendDirection } from './useLiveCbdcRates'

describe('resolveRateTrendDirection', () => {
  it('returns up when the current rate is higher than the previous one', () => {
    expect(resolveRateTrendDirection(2.3, 2.1)).toBe('up')
  })

  it('returns down when the current rate is lower than the previous one', () => {
    expect(resolveRateTrendDirection(2.1, 2.3)).toBe('down')
  })

  it('returns neutral when one of the values is missing or unchanged', () => {
    expect(resolveRateTrendDirection(2.3, 2.3)).toBe('neutral')
    expect(resolveRateTrendDirection(2.3, undefined)).toBe('neutral')
  })
})
