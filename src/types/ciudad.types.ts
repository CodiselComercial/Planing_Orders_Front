export interface Ciudad {
  id: string
  name: string
  state: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateCiudadPayload {
  name: string
  state: string
}

export type UpdateCiudadPayload = Partial<CreateCiudadPayload>
