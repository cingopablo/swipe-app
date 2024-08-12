import { Heart, X } from '@phosphor-icons/react'
import React from 'react'

import { LotType, VoteType } from '@/lib/types'

import { Button } from '../Button/Button'
import { DraggableCard } from '../DraggableCard/DraggableCard.tsx'
import { LoadingCard } from '../LoadingCard/LoadingCard'

type StackProps = {
  lots: LotType[]
  onVote: (lot: LotType, vote: VoteType, remainingElements: number) => Promise<void>
}

export function Stack({ lots, onVote }: StackProps) {
  const [items, setItems] = React.useState(lots)
  const [isVoting, setIsVoting] = React.useState(false)

  const interactiveItem = React.useMemo(() => items[items.length - 1], [items])

  const handleVote = React.useCallback(
    async (item: LotType, vote: VoteType) => {
      setItems(prevItems => prevItems.filter(pi => pi.id !== item.id))
      await onVote(item, vote, items.length - 1)
    },
    [items.length, onVote]
  )

  const handleDragEnd = React.useCallback((offset: number) => {
    setIsVoting(offset === 1 || offset === -1)
  }, [])

  return (
    <div className={'flex flex-col gap-8 p-4'}>
      <div className={'relative flex h-80 w-full items-center justify-center'}>
        {items.map((item, index) => (
          <DraggableCard
            key={`${item.id}-${index}`}
            item={item}
            drag={!isVoting}
            onDragEnd={handleDragEnd}
            onVote={async vote => {
              await handleVote(item, vote)
              setIsVoting(false)
            }}
          />
        ))}
        <LoadingCard className={'absolute top-0 -z-10'} />
      </div>

      <div className={'flex gap-4'}>
        <Button
          disabled={isVoting || !interactiveItem}
          onClick={async () => await handleVote(interactiveItem, 'disliked')}
          className={'rounded-full p-4'}>
          <X weight={'bold'} size={24} className={'fill-slate-600'} />
        </Button>

        <Button
          disabled={isVoting || !interactiveItem}
          onClick={async () => await handleVote(interactiveItem, 'liked')}
          className={'rounded-full p-4'}>
          <Heart weight={'fill'} size={24} className={'fill-red-400'} />
        </Button>
      </div>
    </div>
  )
}
