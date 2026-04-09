import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('AppShell', () => {
  it('renders the persistent shell around the dashboard route', () => {
    renderApp(<AppRoutes />, { route: '/dashboard' })

    const navigation = screen.getByRole('navigation')

    expect(
      within(navigation).getByRole('link', { name: 'Главная' }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Переводы' }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Обмен валют' }),
    ).toBeInTheDocument()
    expect(
      within(navigation).getByRole('link', { name: 'Настройки' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Здравствуйте, Дагмара')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Поиск по demo')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Уведомления' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Simulated demo')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Демонстрационный маршрут Россия → Китай',
      }),
    ).toBeInTheDocument()
  })

  it('keeps shell-local search state when navigating to another route', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/dashboard' })

    const searchInput = screen.getByPlaceholderText('Поиск по demo')
    const navigation = screen.getByRole('navigation')

    await user.type(searchInput, 'demo')
    await user.click(
      within(navigation).getByRole('link', { name: 'Обмен валют' }),
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Обмен валют',
      }),
    ).toBeInTheDocument()
    expect(searchInput).toHaveValue('demo')
  })

  it('keeps the shell container while letting the dashboard expand to full width', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/dashboard' })

    const pageContainer = screen.getByTestId('page-container')
    const dashboardContent = screen.getByTestId('page-content')

    expect(pageContainer.className).toContain('max-w-[1200px]')
    expect(pageContainer.className).toContain('px-8')
    expect(pageContainer.className).toContain('pt-8')
    expect(pageContainer.className).toContain('pb-12')
    expect(dashboardContent.className).toContain('max-w-none')

    await user.click(screen.getByRole('link', { name: 'Настройки' }))

    const settingsContent = screen.getByTestId('page-content')

    expect(settingsContent.className).toContain('max-w-[760px]')
    expect(screen.getByText('Simulated demo')).toBeInTheDocument()
    expect(screen.getByText('Здравствуйте, Дагмара')).toBeInTheDocument()
  })
})
