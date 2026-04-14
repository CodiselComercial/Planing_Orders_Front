import { type Provider } from '@/types/provider.types'
import { Badge } from '@/components/ui/Badge'

interface ProviderCardProps {
  provider: Provider
  linkedCount: number
  onEdit: () => void
  onDelete: () => void
}

export function ProviderCard({ provider, linkedCount, onEdit, onDelete }: ProviderCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text">{provider.name}</h3>
          <p className="text-sm text-text-muted">{provider.email} · {provider.phone}</p>
        </div>
        <Badge variant={linkedCount > 0 ? 'info' : 'default'}>{linkedCount} insumo(s)</Badge>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={onEdit} className="rounded-3xl bg-brand-soft px-4 py-2 text-sm text-brand transition hover:bg-brand/10">
          Editar
        </button>
        <button type="button" onClick={onDelete} className="rounded-3xl bg-[#FEE2E2] px-4 py-2 text-sm text-[#C92A2A] transition hover:bg-[#F9D6D6]">
          Eliminar
        </button>
      </div>
    </div>
  )
}
