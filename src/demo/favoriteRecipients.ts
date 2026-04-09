import type { DemoFavoriteRecipient } from './types'

export const FAVORITE_RECIPIENT_ADD_LABEL = '+'

export const favoriteRecipients = [
  {
    id: 'emma',
    name: 'Emma',
    cardValue: '2200 0000 0000 1746',
    phoneValue: '+86 138 0000 1746',
  },
  {
    id: 'justin',
    name: 'Justin',
    cardValue: '2200 0000 0000 5151',
    phoneValue: '+86 138 0000 5151',
  },
] as const satisfies readonly DemoFavoriteRecipient[]
