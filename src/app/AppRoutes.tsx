import { Navigate, Route, Routes } from 'react-router'

import { AppShell } from '../shell/AppShell'
import {
  CurrencyExchangePage,
  DashboardPage,
  NotFoundPage,
  RatesPage,
  SettingsPage,
  TransfersPage,
} from '../pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transfers" element={<TransfersPage />} />
        <Route path="/rates/exchange/:badgeToken" element={<CurrencyExchangePage />} />
        <Route path="/rates" element={<RatesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
