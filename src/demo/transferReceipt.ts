import type {
  DemoFavoriteRecipient,
  DemoTransferModeId,
  DemoTransferQuote,
  DemoTransferReceipt,
} from './types'

interface BuildTransferReceiptInput {
  senderName: string
  recipientIdentifier: string
  selectedFavorite?: DemoFavoriteRecipient | null
  mode: DemoTransferModeId
  quote: DemoTransferQuote
  issuedAt?: Date
}

function formatReceiptDate(value: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(value)
}

function buildTransactionCode(identifier: string, issuedAt: Date) {
  const digits = identifier.replace(/\D/g, '')
  const seed = `${issuedAt.getTime()}${digits.slice(-4).padStart(4, '0')}`

  return `#${seed.slice(-7)}`
}

function getReceiptContactLabel(mode: DemoTransferModeId) {
  return mode === 'phone' ? 'Номер телефона' : 'Номер счета'
}

function getReceiptContactValue(
  mode: DemoTransferModeId,
  recipientIdentifier: string,
  selectedFavorite?: DemoFavoriteRecipient | null,
) {
  if (mode === 'phone') {
    return selectedFavorite?.phoneValue ?? recipientIdentifier
  }

  return selectedFavorite?.cardValue ?? recipientIdentifier
}

export function buildTransferReceipt({
  senderName,
  recipientIdentifier,
  selectedFavorite,
  mode,
  quote,
  issuedAt = new Date(),
}: BuildTransferReceiptInput): DemoTransferReceipt {
  return {
    senderName,
    recipientName: selectedFavorite?.name ?? recipientIdentifier,
    contactLabel: getReceiptContactLabel(mode),
    contactValue: getReceiptContactValue(mode, recipientIdentifier, selectedFavorite),
    transactionCode: buildTransactionCode(recipientIdentifier, issuedAt),
    transferCreatedDate: formatReceiptDate(issuedAt),
    recipientSettlementDate: formatReceiptDate(issuedAt),
    debitAmountDisplay: quote.debitAmountDisplay,
    feeAmountDisplay: quote.feeAmountDisplay,
    totalAmountDisplay: quote.totalAmountDisplay,
  }
}
