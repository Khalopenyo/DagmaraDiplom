import { describe, expect, it } from 'vitest'

import {
  LOCKED_CHINA_RATE,
  LOCKED_CHINA_RATE_LABEL,
  PLATFORM_FEE_RUBLES,
  buildTransferQuote,
  validateTransferDraft,
} from './transferQuote'

describe('buildTransferQuote', () => {
  it('returns the deterministic China quote for a debit amount of 100', () => {
    const quote = buildTransferQuote(100)

    expect(LOCKED_CHINA_RATE).toBe(2.234)
    expect(LOCKED_CHINA_RATE_LABEL).toBe('1 ЦР = 2.234 ЦЮ')
    expect(PLATFORM_FEE_RUBLES).toBe(10)
    expect(quote.recipientAmount).toBe(223.4)
    expect(quote.recipientAmountDisplay).toBe('223.40 ¥')
    expect(quote.feeAmountDisplay).toBe('10 ₽')
    expect(quote.totalAmountDisplay).toBe('110 ₽')
  })
})

describe('validateTransferDraft', () => {
  it('rejects an empty recipient identifier', () => {
    const result = validateTransferDraft({
      mode: 'card',
      recipientIdentifier: '',
      debitAmount: 100,
    })

    expect(result.isValid).toBe(false)
    expect(result.identifierError).not.toBeNull()
  })

  it('rejects mode-mismatched identifiers', () => {
    const invalidCardDraft = validateTransferDraft({
      mode: 'card',
      recipientIdentifier: '+86 138 0000 1746',
      debitAmount: 100,
    })
    const invalidPhoneDraft = validateTransferDraft({
      mode: 'phone',
      recipientIdentifier: '2200 0000 0000 1746',
      debitAmount: 100,
    })

    expect(invalidCardDraft.isValid).toBe(false)
    expect(invalidCardDraft.identifierError).not.toBeNull()
    expect(invalidPhoneDraft.isValid).toBe(false)
    expect(invalidPhoneDraft.identifierError).not.toBeNull()
  })

  it('rejects overdraft attempts above 3469.52', () => {
    const result = validateTransferDraft({
      mode: 'phone',
      recipientIdentifier: '+86 138 0000 1746',
      debitAmount: 3469.53,
    })

    expect(result.isValid).toBe(false)
    expect(result.amountError).not.toBeNull()
  })
})
