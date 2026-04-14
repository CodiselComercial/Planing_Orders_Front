import { type ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden w-max -translate-x-1/2 rounded-xl bg-text px-3 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100">
        {content}
      </span>
    </span>
  )
}
