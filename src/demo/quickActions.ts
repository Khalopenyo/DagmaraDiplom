import type { DemoQuickAction } from './types'

export const quickActions = [
  {
    label: 'Аккаунт и счета',
    iconKey: 'account',
    mode: 'display',
  },
  {
    label: 'Переводы',
    iconKey: 'transfer',
    mode: 'route',
    to: '/transfers',
  },
  {
    label: 'Снятие',
    iconKey: 'cash',
    mode: 'display',
  },
  {
    label: 'Оплата счета',
    iconKey: 'bill',
    mode: 'display',
  },
  {
    label: 'Накопления',
    iconKey: 'savings',
    mode: 'display',
  },
  {
    label: 'Кредитная карта',
    iconKey: 'card',
    mode: 'display',
  },
  {
    label: 'Отчет о транзакциях',
    iconKey: 'report',
    mode: 'display',
  },
  {
    label: 'Контакты',
    iconKey: 'contacts',
    mode: 'display',
  },
] as const satisfies readonly DemoQuickAction[]
