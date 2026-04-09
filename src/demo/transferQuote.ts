import { accountSummary } from './accountSummary'
import { formatDecimalValue } from './formatters'
import type {
  DemoTransferDraftInput,
  DemoTransferDraftValidationResult,
  DemoTransferQuote,
} from './types'

export const LOCKED_CHINA_RATE = 2.234
export const LOCKED_CHINA_RATE_LABEL = '1 ЦР = 2.234 ЦЮ'
export const PLATFORM_FEE_RUBLES = 10

const CARD_IDENTIFIER_PATTERN = /^\d{16}$/
const PHONE_IDENTIFIER_PATTERN = /^\+\d[\d\s()-]{9,}$/

function formatCompactRubleAmount(value: number) {
  const fractionDigits = Number.isInteger(value) ? 0 : 2

  return `${formatDecimalValue(value, fractionDigits)} ₽`
}

export function buildTransferQuote(debitAmount: number): DemoTransferQuote {
  const recipientAmount = debitAmount * LOCKED_CHINA_RATE
  const feeAmount = PLATFORM_FEE_RUBLES
  const totalAmount = debitAmount + feeAmount

  return {
    rateValue: LOCKED_CHINA_RATE,
    rateLabel: LOCKED_CHINA_RATE_LABEL,
    debitAmount,
    debitAmountDisplay: formatCompactRubleAmount(debitAmount),
    recipientAmount,
    recipientAmountDisplay: `${formatDecimalValue(recipientAmount, 2)} ¥`,
    feeAmount,
    feeAmountDisplay: formatCompactRubleAmount(feeAmount),
    totalAmount,
    totalAmountDisplay: formatCompactRubleAmount(totalAmount),
  }
}

export function validateTransferDraft(
  draft: DemoTransferDraftInput,
): DemoTransferDraftValidationResult {
  const normalizedIdentifier = draft.recipientIdentifier.trim()
  const normalizedCardIdentifier = normalizedIdentifier.replace(/\s+/g, '')
  const identifierMatchesMode =
    draft.mode === 'card'
      ? CARD_IDENTIFIER_PATTERN.test(normalizedCardIdentifier)
      : PHONE_IDENTIFIER_PATTERN.test(normalizedIdentifier)

  const identifierError =
    normalizedIdentifier.length === 0
      ? 'Укажите реквизиты получателя.'
      : !identifierMatchesMode
        ? 'Проверьте формат реквизитов для выбранного типа перевода.'
        : null

  const amountError =
    draft.debitAmount <= 0
      ? 'Укажите сумму списания больше нуля.'
      : draft.debitAmount > accountSummary.balanceAmount
        ? `Сумма превышает доступный остаток ${accountSummary.balanceAmount.toFixed(2)}.`
        : null

  return {
    isValid: identifierError === null && amountError === null,
    identifierError,
    amountError,
  }
}
