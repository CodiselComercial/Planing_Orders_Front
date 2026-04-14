import { apiClient, unwrapApiResponse } from './client'
import type { CreateRecipePayload, Recipe, UpdateRecipePayload } from '@/types/recipe.types'

export const recipesApi = {
  getAll: async (): Promise<Recipe[]> => {
    const response = await apiClient.get('/recipes')
    return unwrapApiResponse<Recipe[]>(response)
  },

  getById: async (id: string): Promise<Recipe> => {
    const response = await apiClient.get(`/recipes/${id}`)
    return unwrapApiResponse<Recipe>(response)
  },

  create: async (payload: CreateRecipePayload): Promise<Recipe> => {
    const response = await apiClient.post('/recipes', payload)
    return unwrapApiResponse<Recipe>(response)
  },

  update: async (id: string, payload: UpdateRecipePayload): Promise<Recipe> => {
    const response = await apiClient.patch(`/recipes/${id}`, payload)
    return unwrapApiResponse<Recipe>(response)
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/recipes/${id}`)
  },
}
