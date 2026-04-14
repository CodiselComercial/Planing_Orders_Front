import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { recipesApi } from '@/api/recipes.api'
import type { CreateRecipePayload, UpdateRecipePayload } from '@/types/recipe.types'
import toast from 'react-hot-toast'

export const RECIPES_QUERY_KEY = ['recipes'] as const

export function useRecipes() {
  return useQuery({
    queryKey: RECIPES_QUERY_KEY,
    queryFn: recipesApi.getAll,
    staleTime: 1000 * 60 * 5,
  })
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: [...RECIPES_QUERY_KEY, id],
    queryFn: () => recipesApi.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateRecipe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateRecipePayload) => recipesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY })
      toast.success('Receta creada exitosamente')
    },
  })
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateRecipePayload }) =>
      recipesApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY })
      toast.success('Receta actualizada')
    },
  })
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => recipesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_QUERY_KEY })
      toast.success('Receta eliminada')
    },
  })
}
