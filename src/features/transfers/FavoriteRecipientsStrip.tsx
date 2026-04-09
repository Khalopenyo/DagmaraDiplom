import {
  FAVORITE_RECIPIENT_ADD_LABEL,
  favoriteRecipients,
  type DemoFavoriteRecipient,
} from '../../demo'
import { FavoriteRecipientBadge } from './favoriteRecipientBadges'

interface FavoriteRecipientsStripProps {
  selectedFavoriteId: DemoFavoriteRecipient['id'] | null
  onSelect: (favoriteId: DemoFavoriteRecipient['id']) => void
}

export function FavoriteRecipientsStrip({
  selectedFavoriteId,
  onSelect,
}: FavoriteRecipientsStripProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold leading-6 text-[rgba(73,78,101,0.78)]">
        Выбрать получателя
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <button
          aria-disabled="true"
          className="flex min-h-[132px] flex-col items-center justify-center gap-4 rounded-[22px] border border-[rgba(24,38,58,0.06)] bg-white px-4 py-5 text-sm font-semibold text-[rgba(73,78,101,0.7)] shadow-[0_18px_36px_rgba(24,38,58,0.06)]"
          type="button"
        >
          <FavoriteRecipientBadge
            active={false}
            isAddAction
            label={FAVORITE_RECIPIENT_ADD_LABEL}
          />
          <span className="sr-only">{FAVORITE_RECIPIENT_ADD_LABEL}</span>
        </button>

        {favoriteRecipients.map((favorite) => {
          const isActive = favorite.id === selectedFavoriteId

          return (
            <button
              key={favorite.id}
              aria-pressed={isActive}
              className={`flex min-h-[132px] flex-col items-center justify-center gap-4 rounded-[22px] border px-4 py-5 text-sm font-semibold transition-all duration-150 ease-out ${
                isActive
                  ? 'border-[#3E38C7] bg-[rgba(62,56,199,0.04)] text-[#3E38C7] shadow-[0_18px_36px_rgba(62,56,199,0.14)]'
                  : 'border-[rgba(24,38,58,0.06)] bg-white text-[var(--color-text-strong)] shadow-[0_18px_36px_rgba(24,38,58,0.06)] hover:border-[rgba(62,56,199,0.18)]'
              }`}
              onClick={() => onSelect(favorite.id)}
              type="button"
            >
              <FavoriteRecipientBadge active={isActive} label={favorite.name} />
              <span className="text-[18px] font-medium text-[var(--color-text-strong)]">
                {favorite.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
