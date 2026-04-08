import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import {
  NOT_FOUND_COPY,
  PHASE_BOUNDARY_COPY,
  SHELL_BADGE_LABEL,
} from '../content/demoCopy'
import { renderApp } from '../test/renderApp'

describe('Route placeholders', () => {
  it.each([
    ['/dashboard', 'Демонстрационный маршрут Россия → Китай'],
    ['/transfers', 'Переводы'],
    ['/rates', 'Обмен валют'],
    ['/settings', 'Настройки'],
  ] as const)(
    'shows the canonical disclaimer and shell badge on %s',
    (route, heading) => {
      renderApp(<AppRoutes />, { route })

      expect(
        screen.getByRole('heading', {
          name: heading,
        }),
      ).toBeInTheDocument()
      expect(screen.getByText(PHASE_BOUNDARY_COPY)).toBeInTheDocument()
      expect(screen.getByText(SHELL_BADGE_LABEL)).toBeInTheDocument()
    },
  )

  it('navigates from the dashboard placeholder to the transfers route', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/dashboard' })

    await user.click(
      screen.getByRole('link', {
        name: 'Перейти к переводу',
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Переводы',
      }),
    ).toBeInTheDocument()
  })

  it.each(['/transfers', '/rates', '/settings'] as const)(
    'navigates back to the dashboard placeholder from %s',
    async (route) => {
      const user = userEvent.setup()

      renderApp(<AppRoutes />, { route })

      await user.click(
        screen.getByRole('link', {
          name: 'Вернуться на главную',
        }),
      )

      expect(
        screen.getByRole('heading', {
          name: 'Демонстрационный маршрут Россия → Китай',
        }),
      ).toBeInTheDocument()
    },
  )

  it('renders the approved not-found recovery card inside the shell', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/missing-route' })

    expect(screen.getByText(NOT_FOUND_COPY)).toBeInTheDocument()
    expect(screen.getByText(SHELL_BADGE_LABEL)).toBeInTheDocument()

    await user.click(
      screen.getByRole('link', {
        name: 'Вернуться на главную',
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Демонстрационный маршрут Россия → Китай',
      }),
    ).toBeInTheDocument()
  })
})
