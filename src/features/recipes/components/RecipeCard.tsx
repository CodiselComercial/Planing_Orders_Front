import { motion } from 'framer-motion'
import { Edit3, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { Recipe } from '@/types/recipe.types'

interface RecipeCardProps {
  recipe: Recipe
  onEdit: () => void
  onDelete: () => void
}

export function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[1.5rem] border border-border bg-white p-6 shadow-soft"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-text">{recipe.name}</h2>
          <p className="mt-2 text-sm text-text-muted">{recipe.description}</p>
        </div>
        <Badge variant={recipe.isActive ? 'success' : 'warning'}>{recipe.isActive ? 'Activa' : 'Inactiva'}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
        <span>Creada {new Date(recipe.createdAt).toLocaleDateString()}</span>
        <span className="rounded-full bg-neutral px-3 py-1">ID: {recipe.id.slice(0, 6)}</span>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-2 rounded-3xl bg-brand-soft px-4 py-2 text-sm text-brand transition hover:bg-brand/10">
          <Edit3 className="h-4 w-4" /> Editar
        </button>
        <button type="button" onClick={onDelete} className="inline-flex items-center gap-2 rounded-3xl bg-[#FEE2E2] px-4 py-2 text-sm text-[#C92A2A] transition hover:bg-[#F9D6D6]">
          <Trash2 className="h-4 w-4" /> Eliminar
        </button>
      </div>
    </motion.article>
  )
}
