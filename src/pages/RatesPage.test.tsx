import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('RatesPage', () => {
  it('renders the three country rows in China, Vietnam, South Korea order', () => {
    renderApp(<AppRoutes />, { route: '/rates' })

    const chinaRow = screen.getByRole('group', { name: 'Китай' })
    const vietnamRow = screen.getByRole('group', { name: 'Вьетнам' })
    const southKoreaRow = screen.getByRole('group', { name: 'Южная Корея' })

    expect(
      chinaRow.compareDocumentPosition(vietnamRow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      vietnamRow.compareDocumentPosition(southKoreaRow) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('shows the repeated base unit and the exact simulated rate values', () => {
    renderApp(<AppRoutes />, { route: '/rates' })

    expect(screen.getAllByText('1 ЦР')).toHaveLength(3)
    expect(screen.getByText('2.234')).toBeInTheDocument()
    expect(screen.getByText('1.746')).toBeInTheDocument()
    expect(screen.getByText('5.151')).toBeInTheDocument()
  })

  it('marks China as the primary corridor while the other rows stay reference-only', () => {
    renderApp(<AppRoutes />, { route: '/rates' })

    const chinaRow = screen.getByRole('group', { name: 'Китай' })
    const vietnamRow = screen.getByRole('group', { name: 'Вьетнам' })
    const southKoreaRow = screen.getByRole('group', { name: 'Южная Корея' })

    expect(within(chinaRow).getByText('Основной маршрут')).toBeInTheDocument()
    expect(within(vietnamRow).getByText('Справочно')).toBeInTheDocument()
    expect(within(southKoreaRow).getByText('Справочно')).toBeInTheDocument()
  })
})
