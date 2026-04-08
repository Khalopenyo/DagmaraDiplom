import { getTopLevelRoute } from '../content/topLevelRoutes'

import { RoutePlaceholderPage } from './RoutePlaceholderPage'

const RATES_TITLE = 'Обмен валют'

function getRatesRoute() {
  const route = getTopLevelRoute('/rates')

  if (!route || route.pageTitle !== RATES_TITLE) {
    throw new Error('Rates route metadata is misconfigured.')
  }

  return route
}

export function RatesPage() {
  return <RoutePlaceholderPage route={getRatesRoute()} />
}
