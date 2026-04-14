import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <label className="space-y-2 text-sm text-text-muted">
        <span className="font-medium text-text">{label}</span>
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20',
              className
            )}
            {...props}
          />
          {icon ? <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">{icon}</span> : null}
        </div>
        {error ? <p className="text-xs text-[#F03E3E]">{error}</p> : null}
      </label>
    )
  }
)

Input.displayName = 'Input'
