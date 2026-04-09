import { cbdcRates } from './cbdcRates'
import { accountSummary } from './accountSummary'
import { formatDecimalValue, formatRateValue } from './formatters'
import type {
  DemoCbdcRate,
  DemoCountryBadgeToken,
  DemoTransferDraftInput,
  DemoTransferDraftValidationResult,
  DemoTransferQuote,
} from './types'

export const LOCKED_CHINA_RATE = 2.234
export const LOCKED_CHINA_RATE_LABEL = '1 ЦР = 2.234 ЦЮ'
export const PLATFORM_FEE_RUBLES = 10

const CARD_IDENTIFIER_PATTERN = /^\d{16}$/
const PHONE_IDENTIFIER_PATTERN = /^\+\d[\d\s()-]{9,}$/
const TRANSFER_TARGET_SYMBOLS: Record<DemoCountryBadgeToken, string> = {
  china: '¥',
  vietnam: '₫',
  'south-korea': '₩',
  nicaragua: 'C$',
  india: '₹',
  portugal: '€',
  france: '€',
}

function getDefaultTransferTargetRate() {
  const defaultRate = cbdcRates.find((rate) => rate.badgeToken === 'china')

  if (!defaultRate) {
    throw new Error('Default China transfer rate seed is missing.')
  }

  return defaultRate
}

function formatCompactRubleAmount(value: number) {
  const fractionDigits = Number.isInteger(value) ? 0 : 2

  return `${formatDecimalValue(value, fractionDigits)} ₽`
}

export function buildTransferQuote(
  debitAmount: number,
  targetRate: DemoCbdcRate = getDefaultTransferTargetRate(),
): DemoTransferQuote {
  const recipientAmount = debitAmount * targetRate.rateValue
  const feeAmount = PLATFORM_FEE_RUBLES
  const totalAmount = debitAmount + feeAmount
  const recipientCurrencySymbol = TRANSFER_TARGET_SYMBOLS[targetRate.badgeToken]

  return {
    targetBadgeToken: targetRate.badgeToken,
    rateValue: targetRate.rateValue,
    rateLabel: `1 ЦР = ${formatRateValue(targetRate.rateValue)} ${targetRate.targetCurrencyLabel}`,
    debitAmount,
    debitAmountDisplay: formatCompactRubleAmount(debitAmount),
    recipientAmount,
    recipientCurrencyLabel: targetRate.targetCurrencyLabel,
    recipientCurrencySymbol,
    recipientAmountDisplay: `${formatDecimalValue(recipientAmount, 2)} ${recipientCurrencySymbol}`,
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
    !Number.isFinite(draft.debitAmount)
      ? 'Укажите корректную сумму списания.'
      : draft.debitAmount <= 0
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
