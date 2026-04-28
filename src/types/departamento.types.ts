export interface Departamento {
  id: string
  descripcion: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateDepartamentoPayload {
  descripcion: string
}

export type UpdateDepartamentoPayload = Partial<CreateDepartamentoPayload>
