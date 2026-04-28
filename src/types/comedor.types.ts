export interface Comedor {
  id: string
  codigo: string
  nombre: string
  direccion: string
  email: string
  ciudadId: string
  presupuesto: number
  gananciaPorcentaje: number
  usaInsumos: boolean
  usaRecetas: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateComedorPayload {
  codigo: string
  nombre: string
  direccion: string
  email: string
  ciudadId: string
  presupuesto: number
  gananciaPorcentaje: number
  usaInsumos: boolean
  usaRecetas: boolean
}

export type UpdateComedorPayload = Partial<CreateComedorPayload>
