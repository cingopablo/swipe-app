import React from 'react'

import { Dialog, LoadingCard, Stack } from '@/components'
import { useParkingLots } from '@/hooks'
import { LotType, SummaryType, VoteType } from '@/lib/types'

export function App() {
  const { pages, isFetching, fetchNextPage } = useParkingLots()
  const [summary, setSummary] = React.useState<SummaryType[]>([])

  const currentLots = React.useMemo(() => pages[pages.length - 1]?.getAllParkingLots || [], [pages])

  const handleVote = React.useCallback(
    async (lot: LotType, vote: VoteType, remainingElements: number) => {
      setSummary(prev => [...prev, { lot, vote, createdAt: new Date().toISOString() }])

      if (remainingElements === 0) {
        await fetchNextPage()
      }
    },
    [fetchNextPage]
  )

  return (
    <main className={'flex h-screen w-screen flex-col items-center justify-center gap-8'}>
      <div className={'mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-8'}>
        {isFetching ? <LoadingCard showActions /> : <Stack lots={currentLots} onVote={handleVote} />}
      </div>

      <Dialog title={'Summary view'} lots={summary} />
    </main>
  )
}
