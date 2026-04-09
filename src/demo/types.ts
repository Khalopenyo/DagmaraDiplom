export interface DemoAccountSummary {
  ownerName: string
  maskedAccountNumber: string
  balanceAmount: number
  currencyLabel: string
}

export type QuickActionMode = 'display' | 'route'

export type DemoQuickActionMode = QuickActionMode

export type QuickActionIconKey =
  | 'account'
  | 'transfer'
  | 'cash'
  | 'bill'
  | 'savings'
  | 'card'
  | 'report'
  | 'contacts'

export interface DemoQuickActionBase {
  label: string
  iconKey: QuickActionIconKey
}

export interface DemoDisplayQuickAction extends DemoQuickActionBase {
  mode: 'display'
}

export interface DemoRouteQuickAction extends DemoQuickActionBase {
  mode: 'route'
  to: '/transfers'
}

export type DemoQuickAction = DemoDisplayQuickAction | DemoRouteQuickAction

export type DemoCorridorMode = 'primary' | 'reference'

export type DemoCountryBadgeToken =
  | 'china'
  | 'vietnam'
  | 'south-korea'
  | 'nicaragua'
  | 'india'
  | 'portugal'
  | 'france'

export interface DemoCbdcRate {
  country:
    | 'Китай'
    | 'Вьетнам'
    | 'Южная Корея'
    | 'Никарагуа'
    | 'Индия'
    | 'Португалия'
    | 'Франция'
  badgeToken: DemoCountryBadgeToken
  corridor: DemoCorridorMode
  baseLabel: '1 ЦР'
  targetCurrencyLabel: 'ЦВ' | 'ЦН' | 'ЦК' | 'ЦИ' | 'ЦЮ' | 'ЦП' | 'ЦФ'
  rateValue: number
}

export type DemoTransferModeId = 'card' | 'phone'

export interface DemoTransferSourceAccount {
  id: 'dagmara-digital-ruble'
  ownerName: string
  maskedAccountNumber: string
  availableBalance: number
  availableBalanceLabel: string
  currencyLabel: 'ЦР'
}

export interface DemoTransferMode {
  id: DemoTransferModeId
  label: 'По номеру карты' | 'По номеру телефона'
  inputLabel: 'Номер карты получателя' | 'Номер телефона получателя'
  placeholder: '2200 0000 0000 0000' | '+86 138 0000 0000'
}

export interface DemoFavoriteRecipient {
  id: 'emma' | 'justin'
  name: 'Emma' | 'Justin'
  cardValue: string
  phoneValue: string
}

export interface DemoTransferDraftInput {
  mode: DemoTransferModeId
  recipientIdentifier: string
  debitAmount: number
}

export interface DemoTransferQuote {
  rateValue: number
  rateLabel: string
  debitAmount: number
  debitAmountDisplay: string
  recipientAmount: number
  recipientAmountDisplay: string
  feeAmount: number
  feeAmountDisplay: string
  totalAmount: number
  totalAmountDisplay: string
}

export interface DemoTransferDraftValidationResult {
  isValid: boolean
  identifierError: string | null
  amountError: string | null
}
