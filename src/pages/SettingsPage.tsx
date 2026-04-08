import { getTopLevelRoute } from '../content/topLevelRoutes'

import { RoutePlaceholderPage } from './RoutePlaceholderPage'

const SETTINGS_TITLE = 'Настройки'

function getSettingsRoute() {
  const route = getTopLevelRoute('/settings')

  if (!route || route.pageTitle !== SETTINGS_TITLE) {
    throw new Error('Settings route metadata is misconfigured.')
  }

  return route
}

export function SettingsPage() {
  return <RoutePlaceholderPage route={getSettingsRoute()} />
}
