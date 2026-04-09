export interface TopLevelRoute {
  path: '/dashboard' | '/transfers' | '/rates' | '/settings'
  navLabel: 'Главная' | 'Переводы' | 'Обмен валют' | 'Настройки'
  pageTitle: string
  supportingCopy: string
  ctaLabel: string
  boundaryMode: 'intro-card' | 'inline-helper'
}

export const TOP_LEVEL_ROUTES: readonly TopLevelRoute[] = [
  {
    path: '/dashboard',
    navLabel: 'Главная',
    pageTitle: 'Демонстрационный маршрут Россия → Китай',
    supportingCopy:
      'Стартовая точка desktop-demo. Здесь пользователь должен сразу понять структуру приложения и границы симуляции.',
    ctaLabel: 'Перейти к переводу',
    boundaryMode: 'intro-card',
  },
  {
    path: '/transfers',
    navLabel: 'Переводы',
    pageTitle: 'Переводы',
    supportingCopy:
      'Соберите черновик перевода для corridor Россия → Китай: выберите способ отправки, получателя и сумму списания, чтобы увидеть прозрачный simulated quote.',
    ctaLabel: 'Вернуться на главную',
    boundaryMode: 'intro-card',
  },
  {
    path: '/rates',
    navLabel: 'Обмен валют',
    pageTitle: 'Обмен валют',
    supportingCopy:
      'Здесь появится справочник симулированных курсов дружественных стран. Не показывать фактическую таблицу до Phase 2.',
    ctaLabel: 'Вернуться на главную',
    boundaryMode: 'inline-helper',
  },
  {
    path: '/settings',
    navLabel: 'Настройки',
    pageTitle: 'Настройки',
    supportingCopy:
      'Раздел зарезервирован под границы demo и перезапуск сценария. В Phase 1 оставляйте его описательным.',
    ctaLabel: 'Вернуться на главную',
    boundaryMode: 'inline-helper',
  },
] as const

export function getTopLevelRoute(path: TopLevelRoute['path']) {
  return TOP_LEVEL_ROUTES.find((route) => route.path === path)
}
