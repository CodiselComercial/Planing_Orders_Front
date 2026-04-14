# Inicio rápido - RapidP



## Comandos principales

1. Instalar dependencias

```bash
npm install
```

2. Iniciar el servidor de desarrollo

```bash
npm run dev
```

3. Construir el proyecto para producción

```bash
npm run build
```

4. Previsualizar la versión de producción

```bash
npm run preview
```

## Qué hace cada comando

- `npm install`: descarga todas las dependencias definidas en `package.json`.
- `npm run dev`: levanta el servidor de desarrollo Vite en `http://localhost:5173`.
- `npm run build`: genera los archivos finales optimizados en `dist/`.
- `npm run preview`: sirve la versión construida para pruebas locales.

## Stack principal

- React + TypeScript
- Vite
- Tailwind CSS
- React Router Dom
- TanStack React Query
- Axios
- Zustand
- Zod
- React Hook Form
- Framer Motion
- Recharts

## Estructura del proyecto

```
plan-orders-front/
├── public/                 # Archivos estáticos
├── src/
│   ├── api/                # Lógica de llamadas a la API (Axios)
│   ├── components/         # UI compartida y componentes reutilizables
│   ├── features/           # Módulos por dominio: auth, recipes, providers, supplies, dashboard
│   ├── lib/                # Utilidades generales y cliente de React Query
│   ├── router/             # Rutas y protección de accesos
│   ├── store/              # Estado global de autenticación con Zustand
│   ├── types/              # Tipos TypeScript usados en toda la app
│   ├── App.tsx             # Entrada principal de componentes del frontend
│   ├── main.tsx            # Monta React en el DOM
│   └── index.css           # Estilos globales
├── index.html              # HTML base del proyecto
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración de TypeScript
├── vite.config.ts          # Configuración de Vite
├── tailwind.config.ts      # Configuración de Tailwind CSS
└── postcss.config.js       # Configuración de PostCSS
```

## Puntos clave de la arquitectura

- El app usa `RouterProvider` y rutas privadas para proteger las páginas internas.
- La autenticación se guarda en localStorage con Zustand, incluyendo `user`, `accessToken` y `refreshToken`.
- Las peticiones API se realizan con Axios y usan un proxy en desarrollo para evitar CORS.
- Las páginas se organizan por dominio en `src/features/` para facilitar mantenimiento.
- El dashboard central muestra datos de recetas, proveedores e insumos con gráficas de Recharts.

## Flujo de autenticación

1. El usuario envía email/contraseña desde el formulario de login.
2. El frontend llama al endpoint `/auth/login`.
3. El backend responde con `data.user`, `data.access_token` y `data.refresh_token`.
4. El frontend guarda esos valores en el store global.
5. A partir de ese momento, Axios envía el token en `Authorization` para las peticiones protegidas.


