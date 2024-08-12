import { Heart, X } from '@phosphor-icons/react'
import React from 'react'

import { cn } from '@/lib/cn'

import { Button } from '../Button/Button'

type LoadingCardProps = Pick<React.ComponentProps<'div'>, 'className'> & {
  showActions?: boolean
}

export function LoadingCard({ showActions, className }: LoadingCardProps) {
  return (
    <div className={'flex flex-col items-center gap-8 p-4'}>
      <div
        className={cn(
          'relative z-10 flex h-80 w-64 scale-110 animate-pulse items-center justify-center rounded-3xl bg-slate-100 shadow',
          className
        )}>
        <span
          className={
            'absolute bottom-4 left-4 flex flex-col gap-1 rounded-xl bg-slate-300/20 px-3 py-2 text-white backdrop-blur'
          }>
          <span className={'h-8 w-36 rounded bg-slate-200 text-lg font-semibold'} />
          <span className={'h-4 w-28 rounded bg-slate-200 text-sm'} />
        </span>
      </div>

      {showActions && (
        <div className={'flex gap-4'}>
          <Button disabled className={'rounded-full p-4'}>
            <X weight={'bold'} size={24} className={'fill-slate-600'} />
          </Button>

          <Button disabled className={'rounded-full p-4'}>
            <Heart weight={'fill'} size={24} className={'fill-red-400'} />
          </Button>
        </div>
      )}
    </div>
  )
}
