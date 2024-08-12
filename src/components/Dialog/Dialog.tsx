import { X } from '@phosphor-icons/react'
import { compareAsc, compareDesc } from 'date-fns'
import React from 'react'

import { GroupedKeysType, GroupedLotsType, SortingType, SummaryType } from '@/lib/types'

import { Button } from '../Button/Button'
import { Chip } from '../Chip/Chip.tsx'
import { EmptyPage } from './components/EmptyPage.tsx'
import { ListItem } from './components/ListItem.tsx'

type DialogProps = Omit<React.ComponentProps<'dialog'>, 'children'> & {
  title: string
  lots: SummaryType[]
}

const sortingOptions: SortingType[] = ['desc', 'asc']

export function Dialog({ title, lots, ...props }: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const [search, setSearch] = React.useState('')
  const [sorting, setSorting] = React.useState<SortingType>('desc')
  const [isGrouped, setIsGrouped] = React.useState(false)

  const sortedLots = React.useMemo(() => {
    return lots.sort((a, b) =>
      sorting === 'asc'
        ? compareAsc(new Date(a.createdAt), new Date(b.createdAt))
        : compareDesc(new Date(a.createdAt), new Date(b.createdAt))
    )
  }, [lots, sorting])

  const filteredLots = React.useMemo(() => {
    return sortedLots.filter(({ lot }) => lot.name.toLowerCase().includes(search))
  }, [sortedLots, sorting, search])

  const groupedLots = React.useMemo(() => {
    const addToGroup = (acc: GroupedLotsType, lot: SummaryType) => {
      if (lot.vote === 'liked') {
        return {
          ...acc,
          liked: [...acc.liked, lot],
          all: [...acc.all, lot],
        }
      }
      return {
        ...acc,
        disliked: [...acc.disliked, lot],
        all: [...acc.all, lot],
      }
    }

    return filteredLots.reduce(addToGroup, {
      liked: [],
      disliked: [],
      all: [],
    } as GroupedLotsType)
  }, [filteredLots, sorting])

  const groupedKeys = Object.keys(groupedLots).filter(i =>
    isGrouped ? i === 'liked' || i === 'disliked' : i === 'all'
  ) as GroupedKeysType[]

  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect()
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width

      if (!isInDialog) {
        dialogRef.current?.close()
      }
    }
  }

  return (
    <React.Fragment>
      <dialog
        data-cy={'dialog'}
        ref={dialogRef}
        onClick={handleClick}
        className={
          'fixed h-screen w-full max-w-3xl overflow-hidden rounded-xl backdrop:bg-slate-900/50 backdrop:backdrop-blur'
        }
        {...props}>
        <div className={'flex h-full flex-col'}>
          <div className={'flex-shrink-0 bg-white pb-4 shadow-sm'}>
            <div className={'flex items-center justify-between bg-white px-6 py-3'}>
              <h1 className={'text-2xl font-medium'}>{title}</h1>

              <Button onClick={() => dialogRef.current?.close()} className={'rounded-full p-2.5'}>
                <X weight={'bold'} size={20} className={'fill-slate-600'} />
              </Button>
            </div>

            <div className={'mb-4 px-6 py-1'}>
              <input
                data-cy={'search-box'}
                value={search}
                placeholder={'Search by name...'}
                onChange={e => setSearch(e.target.value.toLowerCase())}
                className={
                  'w-full rounded-lg border-2 border-indigo-100 px-4 py-2 outline-none transition-colors hover:border-indigo-200 focus-visible:border-indigo-200'
                }
              />
            </div>

            <div className={'flex items-center justify-between px-6 py-1'}>
              <div className={'flex items-center gap-2'}>
                <span className={'text-sm font-medium'}>Sort by</span>

                {sortingOptions.map(i => (
                  <Chip key={i} data-cy={`sort-${i}`} isSelected={sorting === i} onClick={() => setSorting(i)}>
                    {i === 'desc' ? 'Newest First' : 'Oldest First'}
                  </Chip>
                ))}
              </div>

              <div className={'flex items-center gap-2'}>
                <Chip data-cy={'group'} isSelected={isGrouped} onClick={() => setIsGrouped(last => !last)}>
                  Group results
                </Chip>
              </div>
            </div>
          </div>

          <div className={'h-2/3 flex-grow overflow-auto'}>
            {groupedLots.all.length > 0 ? (
              <ul>
                {groupedKeys.map(key => (
                  <div key={key} className={'mb-4'}>
                    <h3
                      data-cy={`group-title-${key}`}
                      className={
                        'sticky top-0 mb-2 border-y bg-white px-6 py-4 text-lg font-medium capitalize'
                      }>{`${key} (${groupedLots[key].length})`}</h3>
                    <div data-cy={'list'}>
                      {groupedLots[key].map(item => (
                        <ListItem key={item.lot.id} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <EmptyPage />
            )}
          </div>
        </div>
      </dialog>

      <Button data-cy={'show-summary-view'} onClick={() => dialogRef.current?.showModal()}>
        Show summary view
      </Button>
    </React.Fragment>
  )
}
