import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from './AppRoutes'
import { renderApp } from '../test/renderApp'

describe('AppRoutes', () => {
  it('redirects / to the dashboard route', () => {
    renderApp(<AppRoutes />, { route: '/' })

    expect(
      screen.getByRole('heading', {
        name: 'Демонстрационный маршрут Россия → Китай',
      }),
    ).toBeInTheDocument()
  })

  it('renders the rates route inside the SPA router tree', () => {
    renderApp(<AppRoutes />, { route: '/rates' })

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Обмен валют',
      }),
    ).toBeInTheDocument()
  })

  it('renders the exchange route inside the SPA router tree', () => {
    renderApp(<AppRoutes />, { route: '/rates/exchange/china' })

    expect(
      screen.getByRole('heading', {
        name: 'Обмен',
      }),
    ).toBeInTheDocument()
  })

  it('renders the in-app not-found stub for unknown routes', () => {
    renderApp(<AppRoutes />, { route: '/missing-route' })

    expect(
      screen.getByRole('heading', {
        name: 'Раздел не найден',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Не удалось отобразить демо-экран. Вернитесь на «Главную» или обновите страницу — реальные данные не затронуты.',
      ),
    ).toBeInTheDocument()
  })
})
