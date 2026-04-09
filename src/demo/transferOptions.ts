import { accountSummary } from './accountSummary'
import { formatAmountWithCurrency } from './formatters'
import type { DemoTransferMode, DemoTransferSourceAccount } from './types'

export const LOCKED_TRANSFER_RATE_LABEL = '1 ЦР = 2.234 ЦЮ'

export const transferSourceAccounts = [
  {
    id: 'dagmara-digital-ruble',
    ownerName: accountSummary.ownerName,
    maskedAccountNumber: accountSummary.maskedAccountNumber,
    availableBalance: accountSummary.balanceAmount,
    availableBalanceLabel: formatAmountWithCurrency(
      accountSummary.balanceAmount,
      accountSummary.currencyLabel,
    ),
    currencyLabel: accountSummary.currencyLabel,
  },
] as const satisfies readonly DemoTransferSourceAccount[]

export const transferModes = [
  {
    id: 'card',
    label: 'По номеру карты',
    inputLabel: 'Номер карты получателя',
    placeholder: '2200 0000 0000 0000',
  },
  {
    id: 'phone',
    label: 'По номеру телефона',
    inputLabel: 'Номер телефона получателя',
    placeholder: '+86 138 0000 0000',
  },
] as const satisfies readonly DemoTransferMode[]
