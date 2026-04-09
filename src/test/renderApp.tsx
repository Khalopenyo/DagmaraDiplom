import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { AuthProvider } from '../features/auth'
import {
  buildUserProfile,
  saveAuthProfile,
  type DemoAuthDraft,
} from '../features/auth/authStorage'

interface RenderAppOptions {
  route?: string
  authenticated?: boolean
}

const DEFAULT_TEST_DRAFT: DemoAuthDraft = {
  fullName: 'Тестовый Пользователь',
  login: 'test_user',
  phone: '+79991234567',
  password: 'test123',
}

export function renderApp(ui: ReactElement, options: RenderAppOptions = {}) {
  const { route = '/dashboard', authenticated = true } = options

  if (authenticated) {
    const profile = buildUserProfile(DEFAULT_TEST_DRAFT)

    saveAuthProfile(profile)
  }

  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>,
  )
}
