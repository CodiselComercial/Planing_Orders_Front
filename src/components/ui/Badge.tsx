import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  children: ReactNode
}

const variantClasses = {
  default: 'bg-[#E9F5EA] text-[#2D6A4F]',
  success: 'bg-[#E7F9EE] text-[#2F7B48]',
  warning: 'bg-[#FFF4D9] text-[#A36C00]',
  error: 'bg-[#FBE7E7] text-[#A42B2B]',
  info: 'bg-[#D8E9FF] text-[#1D5DB0]',
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', variantClasses[variant])}>
      {children}
    </span>
  )
}
