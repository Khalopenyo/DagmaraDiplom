import { getTopLevelRoute } from '../content/topLevelRoutes'

import { RoutePlaceholderPage } from './RoutePlaceholderPage'

const DASHBOARD_TITLE = 'Демонстрационный маршрут Россия → Китай'

function getDashboardRoute() {
  const route = getTopLevelRoute('/dashboard')

  if (!route || route.pageTitle !== DASHBOARD_TITLE) {
    throw new Error('Dashboard route metadata is misconfigured.')
  }

  return route
}

export function DashboardPage() {
  return <RoutePlaceholderPage route={getDashboardRoute()} />
}
