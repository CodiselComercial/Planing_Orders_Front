import { Badge } from '@/components/ui/Badge'
import type { Recipe } from '@/types/recipe.types'

interface RecipeStatusBadgeProps {
  recipe: Recipe
}

export function RecipeStatusBadge({ recipe }: RecipeStatusBadgeProps) {
  return <Badge variant={recipe.isActive ? 'success' : 'warning'}>{recipe.isActive ? 'Activa' : 'Inactiva'}</Badge>
}
