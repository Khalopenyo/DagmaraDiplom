import { getTopLevelRoute } from '../content/topLevelRoutes'

import { RoutePlaceholderPage } from './RoutePlaceholderPage'

const TRANSFERS_TITLE = 'Переводы'

function getTransfersRoute() {
  const route = getTopLevelRoute('/transfers')

  if (!route || route.pageTitle !== TRANSFERS_TITLE) {
    throw new Error('Transfers route metadata is misconfigured.')
  }

  return route
}

export function TransfersPage() {
  return <RoutePlaceholderPage route={getTransfersRoute()} />
}
