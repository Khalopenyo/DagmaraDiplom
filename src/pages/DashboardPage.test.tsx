import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('DashboardPage', () => {
  it('renders the seeded account summary and all eight quick actions', () => {
    renderApp(<AppRoutes />, { route: '/dashboard' })

    expect(screen.getAllByText('Тестовый Пользователь').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('2200 •••• •••• 1810').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('3 469.52 ₽')).toBeInTheDocument()

    const quickActionsRegion = screen.getByRole('region', {
      name: 'Быстрые действия',
    })

    expect(
      within(quickActionsRegion).getByText('Аккаунт и счета'),
    ).toBeInTheDocument()
    expect(within(quickActionsRegion).getByText('Переводы')).toBeInTheDocument()
    expect(within(quickActionsRegion).getByText('Снятие')).toBeInTheDocument()
    expect(within(quickActionsRegion).getByText('Оплата счета')).toBeInTheDocument()
    expect(within(quickActionsRegion).getByText('Накопления')).toBeInTheDocument()
    expect(within(quickActionsRegion).getByText('Кредитная карта')).toBeInTheDocument()
    expect(
      within(quickActionsRegion).getByText('Отчет о транзакциях'),
    ).toBeInTheDocument()
    expect(within(quickActionsRegion).getByText('Контакты')).toBeInTheDocument()
  })

  it('routes to transfers from the account card CTA', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/dashboard' })

    await user.click(
      screen.getByRole('link', {
        name: 'Перейти к переводу',
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Трансграничный перевод',
      }),
    ).toBeInTheDocument()
  })

  it('routes to transfers from the quick action tile while the other tiles stay display-first', async () => {
    const user = userEvent.setup()

    renderApp(<AppRoutes />, { route: '/dashboard' })

    const quickActionsRegion = screen.getByRole('region', {
      name: 'Быстрые действия',
    })

    expect(
      within(quickActionsRegion).getByRole('link', {
        name: 'Переводы',
      }),
    ).toBeInTheDocument()

    expect(
      within(quickActionsRegion).queryByRole('link', {
        name: 'Аккаунт и счета',
      }),
    ).not.toBeInTheDocument()
    expect(
      within(quickActionsRegion).queryByRole('link', {
        name: 'Снятие',
      }),
    ).not.toBeInTheDocument()
    expect(
      within(quickActionsRegion).queryByRole('link', {
        name: 'Оплата счета',
      }),
    ).not.toBeInTheDocument()
    expect(
      within(quickActionsRegion).queryByRole('link', {
        name: 'Накопления',
      }),
    ).not.toBeInTheDocument()
    expect(
      within(quickActionsRegion).queryByRole('link', {
        name: 'Кредитная карта',
      }),
    ).not.toBeInTheDocument()
    expect(
      within(quickActionsRegion).queryByRole('link', {
        name: 'Отчет о транзакциях',
      }),
    ).not.toBeInTheDocument()
    expect(
      within(quickActionsRegion).queryByRole('link', {
        name: 'Контакты',
      }),
    ).not.toBeInTheDocument()

    await user.click(
      within(quickActionsRegion).getByRole('link', {
        name: 'Переводы',
      }),
    )

    expect(
      screen.getByRole('heading', {
        name: 'Трансграничный перевод',
      }),
    ).toBeInTheDocument()
  })

  it('tops up the balance when using the Пополнить button', async () => {
    const user = userEvent.setup()
    renderApp(<AppRoutes />, { route: '/dashboard' })

    await user.click(screen.getByRole('button', { name: 'Пополнить' }))

    const input = screen.getByLabelText('Сумма пополнения')
    const confirmButton = screen.getByRole('button', { name: 'Подтвердить' })

    expect(screen.getByRole('heading', { name: 'Пополнение баланса' })).toBeInTheDocument()

    // Clear the default "1000" and type "1500"
    await user.clear(input)
    await user.type(input, '1500')

    await user.click(confirmButton)

    // The modal should close and the balance should update: 3469.52 + 1500 = 4969.52
    expect(screen.queryByRole('heading', { name: 'Пополнение баланса' })).not.toBeInTheDocument()
    expect(screen.getByText('4 969.52 ₽')).toBeInTheDocument()
  })
})
