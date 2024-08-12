import React from 'react'

import { cn } from '@/lib/cn'

type ButtonProps = React.ComponentProps<'button'>

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-xl bg-slate-200 px-4 py-2 font-medium transition-all hover:scale-[1.02] focus-visible:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}>
      {children}
    </button>
  )
}
