# API CRUD Endpoints

## Base URL

- `http://localhost:3000`
- Todos los endpoints protegidos requieren:
  - `Authorization: Bearer <ACCESS_TOKEN>`
- El login/register devuelve `access_token` y `refresh_token`.

---

## 1. Auth

### Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Perez",
    "email": "juan@example.com",
    "password": "Secret123!"
  }'
```

#### Respuesta esperada

```json
{
  "user": {
    "id": "<USER_UUID>",
    "name": "Juan Perez",
    "email": "juan@example.com"
  },
  "access_token": "<JWT>",
  "refresh_token": "<JWT>"
}
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Secret123!"
  }'
```

#### Respuesta esperada

```json
{
  "user": {
    "id": "<USER_UUID>",
    "name": "Juan Perez",
    "email": "juan@example.com",
    "perfilId": "<PERFIL_UUID>",
    "comedorId": "<COMEDOR_UUID>"
  },
  "access_token": "<JWT>",
  "refresh_token": "<JWT>"
}
```

### Refresh tokens

```bash
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <REFRESH_TOKEN>"
```

#### Respuesta esperada

```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>"
}
```

### Logout

```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

#### Respuesta esperada

```json
{
  "message": "Logout successful"
}
```

---

## 2. Users

### Create user

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "name": "María López",
    "email": "maria@example.com",
    "password": "Secret123!",
    "perfilId": "<PERFIL_UUID>",
    "comedorId": "<COMEDOR_UUID>"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<USER_UUID>",
  "name": "María López",
  "email": "maria@example.com",
  "perfilId": "<PERFIL_UUID>",
  "comedorId": "<COMEDOR_UUID>"
}
```

### Get all users

```bash
curl http://localhost:3000/users \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

#### Respuesta esperada

```json
[
  {
    "id": "<USER_UUID>",
    "name": "María López",
    "email": "maria@example.com",
    "perfilId": "<PERFIL_UUID>",
    "comedorId": "<COMEDOR_UUID>"
  }
]
```

### Get user by ID

```bash
curl http://localhost:3000/users/<USER_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update user

```bash
curl -X PATCH http://localhost:3000/users/<USER_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "name": "María López Actualizada"
  }'
```

### Delete user

```bash
curl -X DELETE http://localhost:3000/users/<USER_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 3. Providers

### Create provider

```bash
curl -X POST http://localhost:3000/providers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "codigo": "PROV-01",
    "razonSocial": "Proveedor Uno",
    "email": "prov@example.com",
    "telefono": "+521234567890",
    "direccion": "Calle Falsa 123"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<PROVIDER_UUID>",
  "codigo": "PROV-01",
  "razonSocial": "Proveedor Uno",
  "email": "prov@example.com",
  "telefono": "+521234567890",
  "direccion": "Calle Falsa 123"
}
```

### Get all providers

```bash
curl http://localhost:3000/providers \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get provider by ID

```bash
curl http://localhost:3000/providers/<PROVIDER_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update provider

```bash
curl -X PATCH http://localhost:3000/providers/<PROVIDER_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "telefono": "+529876543210"
  }'
```

### Delete provider

```bash
curl -X DELETE http://localhost:3000/providers/<PROVIDER_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 4. Supplies

### Create supply

```bash
curl -X POST http://localhost:3000/supplies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "codigo": "INS-01",
    "nombre": "Tomate",
    "descripcion": "Tomate fresco",
    "precio": 20.5,
    "stock": 100,
    "unidad": "kg",
    "providerId": "<PROVIDER_UUID>"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<SUPPLY_UUID>",
  "codigo": "INS-01",
  "nombre": "Tomate",
  "descripcion": "Tomate fresco",
  "precio": 20.5,
  "stock": 100,
  "unidad": "kg",
  "providerId": "<PROVIDER_UUID>"
}
```

### Get all supplies

```bash
curl http://localhost:3000/supplies \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get supplies by provider

```bash
curl http://localhost:3000/supplies/by-provider/<PROVIDER_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get supply by ID

```bash
curl http://localhost:3000/supplies/<SUPPLY_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update supply

```bash
curl -X PATCH http://localhost:3000/supplies/<SUPPLY_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "precio": 21.0
  }'
```

### Delete supply

```bash
curl -X DELETE http://localhost:3000/supplies/<SUPPLY_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 5. Recipes

### Create recipe

```bash
curl -X POST http://localhost:3000/recipes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "codigo": "REC-01",
    "descripcion": "Ensalada de tomate",
    "comedorId": "<COMEDOR_UUID>",
    "categoriaId": "<CATEGORIA_UUID>",
    "precio": 50.0,
    "costo": 30.0,
    "ganancia": 20.0,
    "subsidio": 0.0,
    "esSubreceta": false,
    "estado": "activo",
    "supplies": [
      {
        "insumoId": "<SUPPLY_UUID>",
        "cantidad": 1.5,
        "unidad": "kg"
      }
    ]
  }'
```

#### Respuesta esperada

```json
{
  "id": "<RECIPE_UUID>",
  "codigo": "REC-01",
  "descripcion": "Ensalada de tomate",
  "comedorId": "<COMEDOR_UUID>",
  "categoriaId": "<CATEGORIA_UUID>",
  "precio": 50.0,
  "costo": 30.0,
  "ganancia": 20.0,
  "subsidio": 0.0,
  "esSubreceta": false,
  "estado": "activo",
  "supplies": [
    {
      "insumoId": "<SUPPLY_UUID>",
      "cantidad": 1.5,
      "unidad": "kg"
    }
  ]
}
```

### Get all recipes

```bash
curl http://localhost:3000/recipes \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get recipe by ID

```bash
curl http://localhost:3000/recipes/<RECIPE_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update recipe

```bash
curl -X PATCH http://localhost:3000/recipes/<RECIPE_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "descripcion": "Nueva descripción"
  }'
```

### Delete recipe

```bash
curl -X DELETE http://localhost:3000/recipes/<RECIPE_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 6. Perfils

### Create perfil

```bash
curl -X POST http://localhost:3000/perfils \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "name": "Administrador",
    "description": "Perfil administrativo"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<PERFIL_UUID>",
  "name": "Administrador",
  "description": "Perfil administrativo"
}
```

### Get all perfils

```bash
curl http://localhost:3000/perfils \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get perfil by ID

```bash
curl http://localhost:3000/perfils/<PERFIL_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update perfil

```bash
curl -X PATCH http://localhost:3000/perfils/<PERFIL_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "description": "Perfil actualizado"
  }'
```

### Delete perfil

```bash
curl -X DELETE http://localhost:3000/perfils/<PERFIL_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 7. Ciudads

### Create ciudad

```bash
curl -X POST http://localhost:3000/ciudads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "name": "Ciudad de México",
    "state": "CDMX"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<CIUDAD_UUID>",
  "name": "Ciudad de México",
  "state": "CDMX"
}
```

### Get all ciudads

```bash
curl http://localhost:3000/ciudads \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get ciudad by ID

```bash
curl http://localhost:3000/ciudads/<CIUDAD_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update ciudad

```bash
curl -X PATCH http://localhost:3000/ciudads/<CIUDAD_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "state": "Nuevo Estado"
  }'
```

### Delete ciudad

```bash
curl -X DELETE http://localhost:3000/ciudads/<CIUDAD_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 8. Departamentos

### Create departamento

```bash
curl -X POST http://localhost:3000/departamentos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "descripcion": "Departamento A"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<DEPARTAMENTO_UUID>",
  "descripcion": "Departamento A"
}
```

### Get all departamentos

```bash
curl http://localhost:3000/departamentos \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get departamento by ID

```bash
curl http://localhost:3000/departamentos/<DEPARTAMENTO_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update departamento

```bash
curl -X PATCH http://localhost:3000/departamentos/<DEPARTAMENTO_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "descripcion": "Departamento Actualizado"
  }'
```

### Delete departamento

```bash
curl -X DELETE http://localhost:3000/departamentos/<DEPARTAMENTO_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 9. Categorias

### Create categoria

```bash
curl -X POST http://localhost:3000/categorias \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "descripcion": "Bebidas"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<CATEGORIA_UUID>",
  "descripcion": "Bebidas"
}
```

### Get all categorias

```bash
curl http://localhost:3000/categorias \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get categoria by ID

```bash
curl http://localhost:3000/categorias/<CATEGORIA_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update categoria

```bash
curl -X PATCH http://localhost:3000/categorias/<CATEGORIA_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "descripcion": "Alimentos"
  }'
```

### Delete categoria

```bash
curl -X DELETE http://localhost:3000/categorias/<CATEGORIA_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 10. Comedors

### Create comedor

```bash
curl -X POST http://localhost:3000/comedors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "codigo": "COM-01",
    "nombre": "Comedor Central",
    "direccion": "Av. Central 100",
    "email": "central@example.com",
    "ciudadId": "<CIUDAD_UUID>",
    "presupuesto": 50000.0,
    "gananciaPorcentaje": 20.0,
    "usaInsumos": true,
    "usaRecetas": true
  }'
```

#### Respuesta esperada

```json
{
  "id": "<COMEDOR_UUID>",
  "codigo": "COM-01",
  "nombre": "Comedor Central",
  "direccion": "Av. Central 100",
  "email": "central@example.com",
  "ciudadId": "<CIUDAD_UUID>",
  "presupuesto": 50000.0,
  "gananciaPorcentaje": 20.0,
  "usaInsumos": true,
  "usaRecetas": true
}
```

### Get all comedors

```bash
curl http://localhost:3000/comedors \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get comedor by ID

```bash
curl http://localhost:3000/comedors/<COMEDOR_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update comedor

```bash
curl -X PATCH http://localhost:3000/comedors/<COMEDOR_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "nombre": "Comedor Principal"
  }'
```

### Delete comedor

```bash
curl -X DELETE http://localhost:3000/comedors/<COMEDOR_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 11. Unidades de medida

### Create unidad de medida

```bash
curl -X POST http://localhost:3000/unidades-medida \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "tipo": "GRAMOS",
    "descripcion": "Gramos",
    "multiplicador": 1,
    "comedorId": "<COMEDOR_UUID>"
  }'
```

#### Respuesta esperada

```json
{
  "id": "<UNIDAD_UUID>",
  "tipo": "GRAMOS",
  "descripcion": "Gramos",
  "multiplicador": 1,
  "comedorId": "<COMEDOR_UUID>"
}
```

### Get all unidades de medida

```bash
curl http://localhost:3000/unidades-medida \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get unidad de medida by ID

```bash
curl http://localhost:3000/unidades-medida/<UNIDAD_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update unidad de medida

```bash
curl -X PATCH http://localhost:3000/unidades-medida/<UNIDAD_UUID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "descripcion": "Kg"
  }'
```

### Delete unidad de medida

```bash
curl -X DELETE http://localhost:3000/unidades-medida/<UNIDAD_UUID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 12. Planes

### Create plan

```bash
curl -X POST http://localhost:3000/planes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "fecha": "2026-05-01T08:00:00.000Z",
    "descripcion": "Plan mensual",
    "estado": "pendiente",
    "etiquetaColor": "#FF0000",
    "comedorId": "<COMEDOR_UUID>",
    "menuId": "<MENU_UUID>"
  }'
```

#### Respuesta esperada

```json
{
  "id": <PLAN_ID>,
  "fecha": "2026-05-01T08:00:00.000Z",
  "descripcion": "Plan mensual",
  "estado": "pendiente",
  "etiquetaColor": "#FF0000",
  "comedorId": "<COMEDOR_UUID>",
  "menuId": "<MENU_UUID>"
}
```

### Get all planes

```bash
curl http://localhost:3000/planes \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get plan by ID

```bash
curl http://localhost:3000/planes/<PLAN_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update plan

```bash
curl -X PATCH http://localhost:3000/planes/<PLAN_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "estado": "completado"
  }'
```

### Delete plan

```bash
curl -X DELETE http://localhost:3000/planes/<PLAN_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 13. Ordenes de compra

### Create orden de compra

```bash
curl -X POST http://localhost:3000/ordenes-compra \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "fechaPlan": "2026-05-05T08:00:00.000Z",
    "comedorId": "<COMEDOR_UUID>",
    "proveedorId": "<PROVIDER_UUID>",
    "planId": "<PLAN_ID>",
    "totalRecibido": 0,
    "completa": false,
    "estado": "pendiente",
    "email": "proveedor@example.com",
    "fechaEmailEnviado": null,
    "items": [
      {
        "insumoId": "<SUPPLY_UUID>",
        "cantidad": 2.5,
        "unidad": "kg",
        "precioUnitario": 10.0
      }
    ]
  }'
```

#### Respuesta esperada

```json
{
  "id": <ORDEN_ID>,
  "fechaPlan": "2026-05-05T08:00:00.000Z",
  "comedorId": "<COMEDOR_UUID>",
  "proveedorId": "<PROVIDER_UUID>",
  "planId": "<PLAN_ID>",
  "total": 25.00,
  "totalRecibido": 0,
  "completa": false,
  "estado": "pendiente",
  "email": "proveedor@example.com",
  "fechaEmailEnviado": null,
  "items": [
    {
      "id": <ITEM_ID>,
      "insumoId": "<SUPPLY_UUID>",
      "cantidad": 2.5,
      "unidad": "kg",
      "precioUnitario": 10.0,
      "subtotal": 25.00
    }
  ]
}
```

### Get all ordenes de compra

```bash
curl http://localhost:3000/ordenes-compra \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get orden de compra by ID

```bash
curl http://localhost:3000/ordenes-compra/<ORDEN_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update orden de compra

```bash
curl -X PATCH http://localhost:3000/ordenes-compra/<ORDEN_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "estado": "completada",
    "completa": true
  }'
```

### Delete orden de compra

```bash
curl -X DELETE http://localhost:3000/ordenes-compra/<ORDEN_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 14. OrdenCompraItems

### Create orden compra item

```bash
curl -X POST http://localhost:3000/orden-compra-items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "ordenCompraId": "<ORDEN_ID>",
    "insumoId": "<SUPPLY_UUID>",
    "cantidad": 3.0,
    "unidad": "kg",
    "precioUnitario": 12.0
  }'
```

#### Respuesta esperada

```json
{
  "id": <ITEM_ID>,
  "ordenCompraId": "<ORDEN_ID>",
  "insumoId": "<SUPPLY_UUID>",
  "cantidad": 3.0,
  "unidad": "kg",
  "precioUnitario": 12.0,
  "subtotal": 36.00
}
```

### Get all orden compra items

```bash
curl http://localhost:3000/orden-compra-items \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get orden compra item by ID

```bash
curl http://localhost:3000/orden-compra-items/<ITEM_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update orden compra item

```bash
curl -X PATCH http://localhost:3000/orden-compra-items/<ITEM_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "cantidad": 4.0,
    "precioUnitario": 11.0
  }'
```

### Delete orden compra item

```bash
curl -X DELETE http://localhost:3000/orden-compra-items/<ITEM_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 15. ReporteCostos

### Create reporte costos

```bash
curl -X POST http://localhost:3000/reporte-costos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "fechaInicio": "2026-05-01T00:00:00.000Z",
    "fechaFin": "2026-05-31T23:59:59.000Z",
    "costoTotal": 12000.50,
    "comedorNombre": "Todos"
  }'
```

#### Respuesta esperada

```json
{
  "id": <REPORTE_ID>,
  "fechaInicio": "2026-05-01T00:00:00.000Z",
  "fechaFin": "2026-05-31T23:59:59.000Z",
  "costoTotal": 12000.50,
  "comedorNombre": "Todos"
}
```

### Get all reportes costos

```bash
curl http://localhost:3000/reporte-costos \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get reporte costos by ID

```bash
curl http://localhost:3000/reporte-costos/<REPORTE_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update reporte costos

```bash
curl -X PATCH http://localhost:3000/reporte-costos/<REPORTE_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "costoTotal": 12500.75
  }'
```

### Delete reporte costos

```bash
curl -X DELETE http://localhost:3000/reporte-costos/<REPORTE_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 16. AuditoriaEventos

### Create auditoria evento

```bash
curl -X POST http://localhost:3000/auditoria-eventos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "fecha": "2026-05-01T12:00:00.000Z",
    "evento": "Usuario creado",
    "usuario": "admin",
    "adicional": "Registro manual"
  }'
```

#### Respuesta esperada

```json
{
  "id": <AUDITORIA_ID>,
  "fecha": "2026-05-01T12:00:00.000Z",
  "evento": "Usuario creado",
  "usuario": "admin",
  "adicional": "Registro manual"
}
```

### Get all auditoria eventos

```bash
curl http://localhost:3000/auditoria-eventos \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Get auditoria evento by ID

```bash
curl http://localhost:3000/auditoria-eventos/<AUDITORIA_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

### Update auditoria evento

```bash
curl -X PATCH http://localhost:3000/auditoria-eventos/<AUDITORIA_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "adicional": "Evento actualizado"
  }'
```

### Delete auditoria evento

```bash
curl -X DELETE http://localhost:3000/auditoria-eventos/<AUDITORIA_ID> \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

---

## 17. External

### Get external todo

```bash
curl http://localhost:3000/external/todo
```

#### Respuesta esperada

- Depende de la implementación de `ExternalController`.

---

## Notas finales

- El build se ejecutó correctamente.
- Si la API está en otro puerto o URL, reemplaza `http://localhost:3000`.
- Reemplaza `"<ACCESS_TOKEN>"`, `"<REFRESH_TOKEN>"`, `"<UUID>"`, y `"<NUMERIC_ID>"` con valores reales.
- Todos los endpoints CRUD estándar usan `Authorization: Bearer <ACCESS_TOKEN>` excepto `auth/*` y `/external/todo`.
