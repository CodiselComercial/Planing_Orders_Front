export interface Categoria {
  id: string
  descripcion: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateCategoriaPayload {
  descripcion: string
}

export type UpdateCategoriaPayload = Partial<CreateCategoriaPayload>
