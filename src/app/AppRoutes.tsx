import { Navigate, Route, Routes } from 'react-router'

import {
  DashboardPage,
  NotFoundPage,
  RatesPage,
  SettingsPage,
  TransfersPage,
} from '../pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/transfers" element={<TransfersPage />} />
      <Route path="/rates" element={<RatesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
