import { HeartBreak } from '@phosphor-icons/react'

export function EmptyPage() {
  return (
    <div data-cy={'empty-page'} className={'flex h-full flex-col items-center justify-center gap-2'}>
      <HeartBreak size={128} weight={'duotone'} className={'mx-auto fill-red-400'} />
      <h2 className={'mx-auto max-w-sm text-center'}>
        Try another search or show some love to the parking lots and they will appear here.
      </h2>
    </div>
  )
}
