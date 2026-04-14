import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <motion.span
      className={cn('inline-block origin-center', className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full fill-none stroke-current">
        <circle cx="12" cy="12" r="9" strokeWidth="2" strokeOpacity="0.25" />
        <path d="M21 12a9 9 0 0 1-9 9" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.span>
  )
}
