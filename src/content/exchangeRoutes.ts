import type { DemoCountryBadgeToken } from '../demo'

export const EXCHANGE_ROUTE_PREFIX = '/rates/exchange'

export function buildExchangeRoutePath(badgeToken: DemoCountryBadgeToken) {
  return `${EXCHANGE_ROUTE_PREFIX}/${badgeToken}`
}
