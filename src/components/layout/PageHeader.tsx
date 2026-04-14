import { type ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-[1.25rem] border border-border bg-white p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-text-muted">Panel</p>
        <h1 className="mt-2 text-2xl font-semibold text-text">{title}</h1>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  )
}
