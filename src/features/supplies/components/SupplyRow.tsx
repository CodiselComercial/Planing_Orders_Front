import { Badge } from '@/components/ui/Badge'
import type { Supply } from '@/types/supply.types'
import type { Provider } from '@/types/provider.types'

interface SupplyRowProps {
  supply: Supply
  provider?: Provider
  onEdit: () => void
  onDelete: () => void
}

export function SupplyRow({ supply, provider, onEdit, onDelete }: SupplyRowProps) {
  const badgeVariant = supply.quantity === 0 ? 'error' : supply.quantity <= 10 ? 'warning' : 'success'
  return (
    <div className="grid gap-3 rounded-[1.5rem] border border-border bg-white p-5 text-sm text-text shadow-soft sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-center">
      <div>
        <p className="font-semibold text-text">{supply.name}</p>
        <p className="text-xs text-text-muted">{new Date(supply.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={badgeVariant}>{supply.quantity}</Badge>
      </div>
      <div>{provider?.name ?? 'Sin proveedor'}</div>
      <div className="text-text-muted">{new Date(supply.createdAt).toLocaleDateString()}</div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onEdit} className="rounded-3xl bg-brand-soft px-3 py-2 text-xs text-brand transition hover:bg-brand/10">Editar</button>
        <button type="button" onClick={onDelete} className="rounded-3xl bg-[#FEE2E2] px-3 py-2 text-xs text-[#C92A2A] transition hover:bg-[#F9D6D6]">Eliminar</button>
      </div>
    </div>
  )
}
