import { type ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-white p-8 text-center shadow-soft">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-soft text-brand">
        <span className="text-3xl">🍃</span>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-text">{title}</h2>
      <p className="mx-auto max-w-md text-sm text-text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
