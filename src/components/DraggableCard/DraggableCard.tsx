import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import React from 'react'

import { cn } from '@/lib/cn'
import { CARD_CONSTRAINTS, DRAG_CONSTRAINTS, DRAG_ELASTIC, OFFSET_THRESHOLD } from '@/lib/constants'
import { LotType, VoteType } from '@/lib/types'

type DraggableCardProps = Pick<React.ComponentProps<'div'>, 'className'> & {
  item: LotType
  drag?: boolean
  onDrag?: (offset: number) => void
  onDragEnd?: (offset: number) => void
  onVote?: (vote: VoteType) => void
}

export function DraggableCard({ item, drag = true, onVote, onDrag, onDragEnd, className }: DraggableCardProps) {
  const x = useMotionValue(0)
  const scale = useTransform(x, [-CARD_CONSTRAINTS, 0, CARD_CONSTRAINTS], [1.18, 1.1, 1.18])
  const rotate = useTransform(x, [-CARD_CONSTRAINTS, 0, CARD_CONSTRAINTS], [-2.5, 0, 2.5])
  const controls = useAnimation()

  const handleDrag = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const dragOffset = info.offset.x
      let offset = 0

      if (dragOffset < -OFFSET_THRESHOLD) {
        offset = Math.max(-1, Math.min(dragOffset / OFFSET_THRESHOLD, 0))
      } else if (dragOffset > OFFSET_THRESHOLD) {
        offset = Math.max(0, Math.min(dragOffset / OFFSET_THRESHOLD, 1))
      }

      onDrag?.(offset)
    },
    [onDrag]
  )

  const handleDragEnd = React.useCallback(async () => {
    let offset = 0

    const endOffset = x.get()

    if (endOffset > OFFSET_THRESHOLD) {
      offset = 1
    } else if (endOffset < -OFFSET_THRESHOLD) {
      offset = -1
    }

    onDragEnd?.(offset)

    if (offset === 1) {
      await controls.start({ x: 500, scale: 1.3, opacity: 0 })
      onVote?.('liked')
    } else if (offset === -1) {
      await controls.start({ x: -500, scale: 1.3, opacity: 0 })
      onVote?.('disliked')
    } else {
      await controls.start({ x: 0, scale: 1.1, opacity: 1 })
    }
  }, [controls, onDragEnd, onVote])

  return (
    <motion.div
      drag={drag}
      animate={controls}
      whileHover={drag ? { scale: 1.1 } : undefined}
      whileTap={drag ? { scale: 1.1, boxShadow: '0px 0px 15px rgba(0,0,0,0.2)', cursor: 'grabbing' } : undefined}
      dragElastic={DRAG_ELASTIC}
      dragConstraints={DRAG_CONSTRAINTS}
      dragSnapToOrigin
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x,
        scale,
        rotate,
        backgroundImage: `url(${item.image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className={cn(
        'absolute z-10 flex h-80 w-64 cursor-grab items-center justify-center rounded-3xl shadow',
        className
      )}>
      <span
        className={
          'absolute bottom-4 left-4 flex flex-col gap-0 rounded-xl bg-slate-300/20 px-3 py-1 text-white backdrop-blur'
        }>
        <span className={'line-clamp-1 text-lg font-semibold'}>{item.name}</span>
        <span className={'line-clamp-1 text-sm'}>{`Live date: ${item?.live_date ?? '-'}`}</span>
      </span>
    </motion.div>
  )
}
