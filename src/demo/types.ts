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

export type DemoCountryBadgeToken = 'china' | 'vietnam' | 'south-korea'

export interface DemoCbdcRate {
  country: 'Китай' | 'Вьетнам' | 'Южная Корея'
  badgeToken: DemoCountryBadgeToken
  corridor: DemoCorridorMode
  baseLabel: '1 ЦР'
  rateValue: number
}
