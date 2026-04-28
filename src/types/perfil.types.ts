export interface Perfil {
  id: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export interface CreatePerfilPayload {
  name: string
  description: string
}

export type UpdatePerfilPayload = Partial<CreatePerfilPayload>
