import React from 'react'

import { cn } from '@/lib/cn'

type ChipProps = React.ComponentProps<'span'> & {
  isSelected?: boolean
}

export function Chip({ children, isSelected = false, ...props }: ChipProps) {
  return (
    <span
      className={cn('cursor-pointer rounded border border-indigo-300 px-2 py-1 text-xs font-medium capitalize', {
        'bg-indigo-100': isSelected,
      })}
      {...props}>
      {children}
    </span>
  )
}
