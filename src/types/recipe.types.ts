export interface Recipe {
  id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateRecipePayload {
  name: string
  description: string
  isActive?: boolean
}

export type UpdateRecipePayload = Partial<CreateRecipePayload>
