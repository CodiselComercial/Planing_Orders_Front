import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children: ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('rounded-[1.25rem] border border-border bg-white p-5 shadow-soft', className)}>
      {children}
    </div>
  )
}
