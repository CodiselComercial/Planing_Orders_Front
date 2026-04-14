import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { RecipeCard } from '@/features/recipes/components/RecipeCard'
import { RecipeForm } from '@/components/forms/RecipeForm'
import { useCreateRecipe, useDeleteRecipe, useRecipes, useUpdateRecipe } from '@/features/recipes/hooks/useRecipes'
import { useDebounce } from '@/hooks/useDebounce'
import type { Recipe } from '@/types/recipe.types'

const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Activas', value: 'active' },
  { label: 'Inactivas', value: 'inactive' },
] as const

type FilterType = (typeof filters)[number]['value']

export default function RecipesPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [deleteRecipeId, setDeleteRecipeId] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const debouncedSearch = useDebounce(search, 300)
  const recipesQuery = useRecipes()
  const createMutation = useCreateRecipe()
  const updateMutation = useUpdateRecipe()
  const deleteMutation = useDeleteRecipe()

  const items = recipesQuery.data ?? []
  const filteredRecipes = useMemo(() => {
    return items.filter((recipe) => {
      const matchesSearch = recipe.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesFilter =
        filter === 'all' ? true : filter === 'active' ? recipe.isActive : !recipe.isActive
      return matchesSearch && matchesFilter
    })
  }, [debouncedSearch, filter, items])

  const openEdit = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setIsModalOpen(true)
  }

  const openDelete = (id: string) => {
    setDeleteRecipeId(id)
    setIsConfirmOpen(true)
  }

  const handleSubmit = (values: { name: string; description: string; isActive?: boolean }) => {
    if (selectedRecipe) {
      updateMutation.mutate({ id: selectedRecipe.id, payload: values })
    } else {
      createMutation.mutate(values)
    }
    setIsModalOpen(false)
    setSelectedRecipe(null)
  }

  const handleConfirmDelete = () => {
    if (deleteRecipeId) deleteMutation.mutate(deleteRecipeId)
    setIsConfirmOpen(false)
    setDeleteRecipeId(null)
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Recetas" description="Controla tu menú y administra recetas activas e inactivas." actions={
        <Button onClick={() => { setSelectedRecipe(null); setIsModalOpen(true) }} leftIcon={<Plus className="h-4 w-4" />}>Nueva receta</Button>
      } />

      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar receta..."
            className="w-full rounded-3xl border border-border bg-white py-3 pl-12 pr-4 text-sm text-text outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <div className="flex gap-2 overflow-auto rounded-3xl bg-white p-2 shadow-soft">
          {filters.map((item) => (
            <button
              key={item.value}
              className={`rounded-3xl px-4 py-2 text-sm transition ${filter === item.value ? 'bg-brand text-white' : 'text-text-muted hover:bg-neutral'}`}
              type="button"
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {recipesQuery.isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-[1.5rem] bg-white" />
          ))}
        </div>
      ) : filteredRecipes.length === 0 ? (
        <EmptyState
          title="No hay recetas todavía"
          description="Crea tu primera receta para comenzar a organizar el menú del restaurante."
          action={<Button onClick={() => setIsModalOpen(true)}>Agregar receta</Button>}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={() => openEdit(recipe)}
              onDelete={() => openDelete(recipe.id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={isConfirmOpen}
        title="Eliminar receta"
        description="Esta acción no se puede deshacer. ¿Deseas continuar?"
        severity="error"
        isLoading={deleteMutation.status === 'pending'}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <div className={`fixed inset-0 z-50 ${isModalOpen ? '' : 'pointer-events-none'}`}>
        {isModalOpen ? (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => { setIsModalOpen(false); setSelectedRecipe(null) }} />
        ) : null}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-[1.5rem] border border-border bg-white p-8 shadow-soft">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">{selectedRecipe ? 'Editar receta' : 'Nueva receta'}</p>
                <h2 className="text-2xl font-semibold text-text">{selectedRecipe ? selectedRecipe.name : 'Registrar receta'}</h2>
              </div>
              <button onClick={() => { setIsModalOpen(false); setSelectedRecipe(null) }} className="rounded-full bg-neutral px-3 py-2 text-text-muted hover:bg-border">✕</button>
            </div>
            <RecipeForm initialValues={selectedRecipe ? { name: selectedRecipe.name, description: selectedRecipe.description, isActive: selectedRecipe.isActive } : undefined} submitLabel={selectedRecipe ? 'Guardar cambios' : 'Crear receta'} onSubmit={handleSubmit} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
