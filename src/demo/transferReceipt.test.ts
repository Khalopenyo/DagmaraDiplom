import { describe, expect, it } from 'vitest'

import { favoriteRecipients } from './favoriteRecipients'
import { buildTransferQuote } from './transferQuote'
import { buildTransferReceipt } from './transferReceipt'

describe('buildTransferReceipt', () => {
  it('builds a dynamic receipt from the selected transfer draft', () => {
    const quote = buildTransferQuote(100)
    const issuedAt = new Date('2026-04-09T10:15:30.000Z')

    const receipt = buildTransferReceipt({
      senderName: 'Дагмара',
      recipientIdentifier: '2200 0000 0000 5151',
      selectedFavorite: favoriteRecipients[1],
      mode: 'card',
      quote,
      issuedAt,
    })

    expect(receipt.senderName).toBe('Дагмара')
    expect(receipt.recipientName).toBe('Justin')
    expect(receipt.contactLabel).toBe('Номер счета')
    expect(receipt.contactValue).toBe('2200 0000 0000 5151')
    expect(receipt.transactionCode).toMatch(/^#\d{7}$/)
    expect(receipt.transferCreatedDate).toBe('09/04/2026')
    expect(receipt.recipientSettlementDate).toBe('09/04/2026')
    expect(receipt.debitAmountDisplay).toBe('100 ₽')
    expect(receipt.feeAmountDisplay).toBe('10 ₽')
    expect(receipt.totalAmountDisplay).toBe('110 ₽')
  })
})
