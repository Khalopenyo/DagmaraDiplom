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
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold leading-6 text-[var(--color-text-strong)]">
          Избранные получатели
        </p>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          Быстрый запуск demo
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {favoriteRecipients.map((favorite) => {
          const isActive = favorite.id === selectedFavoriteId

          return (
            <button
              key={favorite.id}
              aria-pressed={isActive}
              className={`flex min-h-11 items-center gap-3 rounded-[18px] border px-4 py-3 text-sm font-semibold transition-colors duration-150 ease-out ${
                isActive
                  ? 'border-[var(--color-accent)] bg-[rgba(15,108,189,0.12)] text-[var(--color-accent)]'
                  : 'border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-strong)] hover:border-[rgba(15,108,189,0.24)]'
              }`}
              onClick={() => onSelect(favorite.id)}
              type="button"
            >
              <FavoriteRecipientBadge active={isActive} label={favorite.name} />
              <span>{favorite.name}</span>
            </button>
          )
        })}

        <button
          aria-disabled="true"
          className="flex min-h-11 items-center gap-3 rounded-[18px] border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-3 text-sm font-semibold text-[var(--color-text-muted)]"
          type="button"
        >
          <FavoriteRecipientBadge
            active={false}
            isAddAction
            label={FAVORITE_RECIPIENT_ADD_LABEL}
          />
          <span>{FAVORITE_RECIPIENT_ADD_LABEL}</span>
        </button>
      </div>
    </div>
  )
}
