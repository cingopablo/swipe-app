import { Heart, HeartBreak } from '@phosphor-icons/react'
import { formatDate } from 'date-fns'

import { SummaryType } from '@/lib/types'

type ListItemProps = {
  item: SummaryType
}

export function ListItem({ item }: ListItemProps) {
  const { lot, vote, createdAt } = item
  return (
    <li key={lot.id} className={'flex items-center justify-between px-6 py-2'}>
      <div className={'flex items-center gap-4'}>
        <img src={lot.image} alt={lot.name} className={'aspect-square size-16 rounded-xl object-cover'} />
        <div className={'flex flex-col'}>
          <span className={'line-clamp-1 font-medium'}>{lot.name}</span>
          <span className={'line-clamp-1 text-xs text-slate-800'}>{lot.address}</span>
          <span data-cy={'list-item-date'} className={'line-clamp-1 text-xs text-slate-800'}>
            {formatDate(createdAt, 'PPpp')}
          </span>
        </div>
      </div>
      <span>
        {vote === 'liked' ? (
          <Heart size={32} weight={'fill'} className={'fill-red-400'} />
        ) : (
          <HeartBreak size={32} weight={'duotone'} />
        )}
      </span>
    </li>
  )
}
