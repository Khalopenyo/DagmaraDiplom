import { Navigate, Route, Routes } from 'react-router'

import { AppShell } from '../shell/AppShell'
import { RequireAuth } from '../features/auth'
import { AuthPage } from '../pages/AuthPage'
import {
  CurrencyExchangePage,
  DashboardPage,
  NotFoundPage,
  RatesPage,
  SettingsPage,
  TransferReceiptPage,
  TransfersPage,
} from '../pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/transfers" element={<TransfersPage />} />
          <Route path="/transfers/receipt" element={<TransferReceiptPage />} />
          <Route path="/rates/exchange/:badgeToken" element={<CurrencyExchangePage />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
