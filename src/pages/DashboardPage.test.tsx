import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('DashboardPage', () => {
  it('renders the seeded account summary and all eight quick actions', () => {
    renderApp(<AppRoutes />, { route: '/dashboard' })

    expect(screen.getByText('Дагмара')).toBeInTheDocument()
    expect(screen.getByText('4756 •••• •••• 9018')).toBeInTheDocument()
    expect(screen.getByText('3 469.52 ЦР')).toBeInTheDocument()

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
})
