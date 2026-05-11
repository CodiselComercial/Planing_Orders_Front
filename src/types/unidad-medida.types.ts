export interface UnidadMedida {
  id: string
  tipo: string
  descripcion: string
  multiplicador: number
  comedorId?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateUnidadMedidaPayload {
  tipo: string
  descripcion: string
  multiplicador: number
  comedorId?: string
}

export type UpdateUnidadMedidaPayload = Partial<CreateUnidadMedidaPayload>
