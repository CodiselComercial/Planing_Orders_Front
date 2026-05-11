export type CrudFieldType = 'text' | 'number' | 'boolean' | 'datetime' | 'json'

export interface CrudFieldConfig {
  key: string
  label: string
  type: CrudFieldType
  required?: boolean
  relationEndpoint?: string
  relationLabelKey?: string
  relationValueKey?: string
  options?: string[]
}

export interface CrudResourceConfig {
  key: string
  title: string
  route: string
  endpoint: string
  idField?: string
  fields: CrudFieldConfig[]
}

export const crudResources: CrudResourceConfig[] = [
  {
    key: 'providers',
    title: 'Proveedores',
    route: '/providers',
    endpoint: '/providers',
    fields: [
      { key: 'codigo', label: 'Codigo', type: 'text', required: true },
      { key: 'razonSocial', label: 'Razon social', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'telefono', label: 'Telefono', type: 'text' },
      { key: 'direccion', label: 'Direccion', type: 'text' },
    ],
  },
  {
    key: 'supplies',
    title: 'Insumos',
    route: '/supplies',
    endpoint: '/supplies',
    fields: [
      { key: 'codigo', label: 'Codigo', type: 'text', required: true },
      { key: 'nombre', label: 'Nombre', type: 'text', required: true },
      { key: 'descripcion', label: 'Descripcion', type: 'text' },
      { key: 'precio', label: 'Precio', type: 'number', required: true },
      { key: 'stock', label: 'Stock', type: 'number', required: true },
      { key: 'unidad', label: 'Unidad', type: 'text', required: true },
      {
        key: 'providerId',
        label: 'Proveedor',
        type: 'text',
        required: true,
        relationEndpoint: '/providers',
        relationLabelKey: 'razonSocial',
      },
    ],
  },
  {
    key: 'recipes',
    title: 'Recetas',
    route: '/recipes',
    endpoint: '/recipes',
    fields: [
      { key: 'codigo', label: 'Codigo', type: 'text', required: true },
      { key: 'descripcion', label: 'Descripcion', type: 'text', required: true },
      {
        key: 'comedorId',
        label: 'Comedor',
        type: 'text',
        required: true,
        relationEndpoint: '/comedors',
        relationLabelKey: 'nombre',
      },
      {
        key: 'categoriaId',
        label: 'Categoria',
        type: 'text',
        required: true,
        relationEndpoint: '/categorias',
        relationLabelKey: 'descripcion',
      },
      { key: 'precio', label: 'Precio', type: 'number', required: true },
      { key: 'costo', label: 'Costo', type: 'number', required: true },
      { key: 'ganancia', label: 'Ganancia', type: 'number' },
      { key: 'subsidio', label: 'Subsidio', type: 'number' },
      { key: 'esSubreceta', label: 'Es subreceta', type: 'boolean' },
      { key: 'estado', label: 'Estado', type: 'text' },
      { key: 'supplies', label: 'Supplies JSON', type: 'json' },
    ],
  },
  {
    key: 'users',
    title: 'Usuarios',
    route: '/users',
    endpoint: '/users',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'text' },
      {
        key: 'perfilId',
        label: 'Perfil',
        type: 'text',
        required: true,
        relationEndpoint: '/perfils',
        relationLabelKey: 'name',
      },
      {
        key: 'comedorId',
        label: 'Comedor',
        type: 'text',
        required: true,
        relationEndpoint: '/comedors',
        relationLabelKey: 'nombre',
      },
    ],
  },
  {
    key: 'perfils',
    title: 'Perfiles',
    route: '/perfils',
    endpoint: '/perfils',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'description', label: 'Descripcion', type: 'text' },
    ],
  },
  {
    key: 'ciudads',
    title: 'Ciudades',
    route: '/ciudads',
    endpoint: '/ciudads',
    fields: [
      { key: 'name', label: 'Nombre', type: 'text', required: true },
      { key: 'state', label: 'Estado', type: 'text', required: true },
    ],
  },
  {
    key: 'departamentos',
    title: 'Departamentos',
    route: '/departamentos',
    endpoint: '/departamentos',
    fields: [{ key: 'descripcion', label: 'Descripcion', type: 'text', required: true }],
  },
  {
    key: 'categorias',
    title: 'Categorias',
    route: '/categorias',
    endpoint: '/categorias',
    fields: [{ key: 'descripcion', label: 'Descripcion', type: 'text', required: true }],
  },
  {
    key: 'comedors',
    title: 'Comedores',
    route: '/comedors',
    endpoint: '/comedors',
    fields: [
      { key: 'codigo', label: 'Codigo', type: 'text', required: true },
      { key: 'nombre', label: 'Nombre', type: 'text', required: true },
      { key: 'direccion', label: 'Direccion', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      {
        key: 'ciudadId',
        label: 'Ciudad',
        type: 'text',
        required: true,
        relationEndpoint: '/ciudads',
        relationLabelKey: 'name',
      },
      { key: 'presupuesto', label: 'Presupuesto', type: 'number' },
      { key: 'gananciaPorcentaje', label: 'Ganancia %', type: 'number' },
      { key: 'usaInsumos', label: 'Usa insumos', type: 'boolean' },
      { key: 'usaRecetas', label: 'Usa recetas', type: 'boolean' },
    ],
  },
  {
    key: 'unidades-medida',
    title: 'Unidades de medida',
    route: '/unidades-medida',
    endpoint: '/unidades-medida',
    fields: [
      { key: 'tipo', label: 'Tipo', type: 'text', required: true, options: ['Cantidad', 'Peso', 'Volumen', 'Otro'] },
      { key: 'descripcion', label: 'Descripcion', type: 'text', required: true },
      { key: 'multiplicador', label: 'Multiplicador', type: 'number', required: true },
    ],
  },
  {
    key: 'planes',
    title: 'Planes',
    route: '/planes',
    endpoint: '/planes',
    fields: [
      { key: 'fecha', label: 'Fecha', type: 'datetime', required: true },
      { key: 'descripcion', label: 'Descripcion', type: 'text' },
      { key: 'estado', label: 'Estado', type: 'text' },
      { key: 'etiquetaColor', label: 'Etiqueta color', type: 'text' },
      {
        key: 'comedorId',
        label: 'Comedor',
        type: 'text',
        required: true,
        relationEndpoint: '/comedors',
        relationLabelKey: 'nombre',
      },
      { key: 'menuId', label: 'Menu ID', type: 'text' },
    ],
  },
  {
    key: 'ordenes-compra',
    title: 'Ordenes de compra',
    route: '/ordenes-compra',
    endpoint: '/ordenes-compra',
    fields: [
      { key: 'fechaPlan', label: 'Fecha plan', type: 'datetime', required: true },
      {
        key: 'comedorId',
        label: 'Comedor',
        type: 'text',
        required: true,
        relationEndpoint: '/comedors',
        relationLabelKey: 'nombre',
      },
      {
        key: 'proveedorId',
        label: 'Proveedor',
        type: 'text',
        required: true,
        relationEndpoint: '/providers',
        relationLabelKey: 'razonSocial',
      },
      { key: 'planId', label: 'Plan ID', type: 'number' },
      { key: 'totalRecibido', label: 'Total recibido', type: 'number' },
      { key: 'completa', label: 'Completa', type: 'boolean' },
      { key: 'estado', label: 'Estado', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'fechaEmailEnviado', label: 'Fecha email enviado', type: 'datetime' },
      { key: 'items', label: 'Items JSON', type: 'json' },
    ],
  },
  {
    key: 'orden-compra-items',
    title: 'Orden compra items',
    route: '/orden-compra-items',
    endpoint: '/orden-compra-items',
    fields: [
      { key: 'ordenCompraId', label: 'Orden compra ID', type: 'number', required: true },
      {
        key: 'insumoId',
        label: 'Insumo',
        type: 'text',
        required: true,
        relationEndpoint: '/supplies',
        relationLabelKey: 'nombre',
      },
      { key: 'cantidad', label: 'Cantidad', type: 'number', required: true },
      { key: 'unidad', label: 'Unidad', type: 'text', required: true },
      { key: 'precioUnitario', label: 'Precio unitario', type: 'number', required: true },
    ],
  },
  {
    key: 'auditoria-eventos',
    title: 'Auditoria de eventos',
    route: '/auditoria-eventos',
    endpoint: '/auditoria-eventos',
    fields: [
      { key: 'fecha', label: 'Fecha', type: 'datetime', required: true },
      { key: 'evento', label: 'Evento', type: 'text', required: true },
      { key: 'usuario', label: 'Usuario', type: 'text', required: true },
      { key: 'adicional', label: 'Adicional', type: 'text' },
    ],
  },
  {
    key: 'reporte-costos',
    title: 'CRUD reporte costos',
    route: '/reporte-costos',
    endpoint: '/reporte-costos',
    fields: [
      { key: 'fechaInicio', label: 'Fecha inicio', type: 'datetime', required: true },
      { key: 'fechaFin', label: 'Fecha fin', type: 'datetime', required: true },
      { key: 'costoTotal', label: 'Costo total', type: 'number', required: true },
      { key: 'comedorNombre', label: 'Comedor nombre', type: 'text', required: true },
    ],
  },
]
