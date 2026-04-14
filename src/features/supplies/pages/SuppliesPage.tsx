import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { SupplyForm } from '@/components/forms/SupplyForm'
import { SupplyRow } from '@/features/supplies/components/SupplyRow'
import { useCreateSupply, useDeleteSupply, useSupplies, useUpdateSupply } from '@/features/supplies/hooks/useSupplies'
import { useProviders } from '@/features/providers/hooks/useProviders'
import { useDebounce } from '@/hooks/useDebounce'
import type { Supply } from '@/types/supply.types'

export default function SuppliesPage() {
  const [search, setSearch] = useState('')
  const [providerFilter, setProviderFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 300)
  const suppliesQuery = useSupplies()
  const providersQuery = useProviders()
  const createSupply = useCreateSupply()
  const updateSupply = useUpdateSupply()
  const deleteSupply = useDeleteSupply()

  const supplies = suppliesQuery.data ?? []
  const providers = providersQuery.data ?? []
  const filtered = useMemo(
    () => supplies.filter((supply) => {
      const matchesSearch = supply.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesProvider = providerFilter ? supply.providerId === providerFilter : true
      return matchesSearch && matchesProvider
    }),
    [debouncedSearch, providerFilter, supplies]
  )

  const getProviderById = (id: string) => providers.find((provider) => provider.id === id)

  const openEdit = (supply: Supply) => {
    setSelectedSupply(supply)
    setIsModalOpen(true)
  }

  const handleSubmit = (values: { name: string; quantity: number; providerId: string }) => {
    if (selectedSupply) {
      updateSupply.mutate({ id: selectedSupply.id, payload: values })
    } else {
      createSupply.mutate(values)
    }
    setIsModalOpen(false)
    setSelectedSupply(null)
  }

  const handleDelete = () => {
    if (deleteId) deleteSupply.mutate(deleteId)
    setConfirmOpen(false)
    setDeleteId(null)
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Insumos" description="Supervisa cantidades, proveedores y cadencia de reposición." actions={
        <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-4 w-4" />}>Nuevo insumo</Button>
      } />

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar insumo..."
            className="w-full rounded-3xl border border-border bg-white py-3 pl-12 pr-4 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block text-sm text-text-muted">
          <span className="sr-only">Filtrar por proveedor</span>
          <select
            value={providerFilter}
            onChange={(event) => setProviderFilter(event.target.value)}
            className="w-full rounded-3xl border border-border bg-white py-3 px-4 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          >
            <option value="">Todos los proveedores</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>{provider.name}</option>
            ))}
          </select>
        </label>
      </div>

      {suppliesQuery.isLoading || providersQuery.isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-[1.5rem] bg-white" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No hay insumos todavía"
          description="Agrega un insumo para controlar su stock y su proveedor asignado." 
          action={<Button onClick={() => setIsModalOpen(true)}>Agregar insumo</Button>}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((supply) => (
            <SupplyRow
              key={supply.id}
              supply={supply}
              provider={getProviderById(supply.providerId)}
              onEdit={() => openEdit(supply)}
              onDelete={() => { setDeleteId(supply.id); setConfirmOpen(true) }}
            />
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        title={selectedSupply ? 'Editar insumo' : 'Nuevo insumo'}
        onClose={() => { setIsModalOpen(false); setSelectedSupply(null) }}
        size="md"
      >
        <SupplyForm
          providers={providers}
          initialValues={selectedSupply ? { name: selectedSupply.name, quantity: selectedSupply.quantity, providerId: selectedSupply.providerId } : undefined}
          submitLabel={selectedSupply ? 'Guardar' : 'Crear'}
          onSubmit={handleSubmit}
        />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Eliminar insumo"
        description="Eliminar un insumo también quita su historial de inventario." 
        severity="error"
        isLoading={deleteSupply.status === 'pending'}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
