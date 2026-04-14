import { type ReactNode } from 'react'

export interface Column<T> {
  header: string
  render: (item: T) => ReactNode
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyLabel?: string
}

export function Table<T>({ columns, data, loading, emptyLabel }: TableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-3xl border border-border bg-white p-5" />
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return <p className="rounded-3xl border border-border bg-white p-6 text-center text-sm text-text-muted">{emptyLabel ?? 'No hay datos para mostrar'}</p>
  }

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-soft">
      <div className="hidden grid-cols-[1.5fr_repeat(4,1fr)] gap-0 border-b border-border px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-text-muted sm:grid">
        {columns.map((column) => (
          <div key={column.header} className={column.className}>{column.header}</div>
        ))}
      </div>
      <div className="divide-y divide-border">
        {data.map((item, index) => (
          <div key={index} className="grid gap-4 px-6 py-4 sm:grid-cols-[1.5fr_repeat(4,1fr)] sm:items-center hover:bg-neutral">
            {columns.map((column) => (
              <div key={column.header} className={column.className}>{column.render(item)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
