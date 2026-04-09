import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from '../app/AppRoutes'
import { renderApp } from '../test/renderApp'

describe('RatesPage', () => {
  it('renders all country rows in the seeded visual order', () => {
    renderApp(<AppRoutes />, { route: '/rates' })

    const vietnamRow = screen.getByRole('group', { name: 'Вьетнам' })
    const nicaraguaRow = screen.getByRole('group', { name: 'Никарагуа' })
    const southKoreaRow = screen.getByRole('group', { name: 'Южная Корея' })
    const indiaRow = screen.getByRole('group', { name: 'Индия' })
    const chinaRow = screen.getByRole('group', { name: 'Китай' })
    const portugalRow = screen.getByRole('group', { name: 'Португалия' })
    const franceRow = screen.getByRole('group', { name: 'Франция' })

    expect(
      vietnamRow.compareDocumentPosition(nicaraguaRow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      nicaraguaRow.compareDocumentPosition(southKoreaRow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      southKoreaRow.compareDocumentPosition(indiaRow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      indiaRow.compareDocumentPosition(chinaRow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      chinaRow.compareDocumentPosition(portugalRow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      portugalRow.compareDocumentPosition(franceRow) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('shows the repeated base unit and the exact simulated rate values', () => {
    renderApp(<AppRoutes />, { route: '/rates' })

    expect(screen.getByText('Страна')).toBeInTheDocument()
    expect(screen.getByText('ЦР')).toBeInTheDocument()
    expect(screen.getByText('ЦВ страны')).toBeInTheDocument()
    expect(screen.getAllByText('1')).toHaveLength(7)
    expect(screen.getByText('2.234')).toBeInTheDocument()
    expect(screen.getAllByText('1.746')).toHaveLength(2)
    expect(screen.getByText('5.151')).toBeInTheDocument()
    expect(screen.getByText('12.09')).toBeInTheDocument()
    expect(screen.getByText('144.4')).toBeInTheDocument()
    expect(screen.getByText('34.56')).toBeInTheDocument()
  })

  it('keeps China as the primary corridor while the other rows stay reference-only', () => {
    renderApp(<AppRoutes />, { route: '/rates' })

    const chinaRow = screen.getByRole('group', { name: 'Китай' })
    const vietnamRow = screen.getByRole('group', { name: 'Вьетнам' })
    const southKoreaRow = screen.getByRole('group', { name: 'Южная Корея' })
    const franceRow = screen.getByRole('group', { name: 'Франция' })

    expect(within(chinaRow).getByText('Основной маршрут')).toBeInTheDocument()
    expect(within(vietnamRow).getByText('Справочно')).toBeInTheDocument()
    expect(within(southKoreaRow).getByText('Справочно')).toBeInTheDocument()
    expect(within(franceRow).getByText('Справочно')).toBeInTheDocument()
  })
})
