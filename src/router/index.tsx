import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { AppShell } from '@/components/layout/AppShell'
import LoginPage from '@/features/auth/pages/LoginPage'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ProfilePage from '@/features/auth/pages/ProfilePage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ReportsPage from '@/features/reports/pages/ReportsPage'
import { GenericCrudPage } from '@/features/crud/GenericCrudPage'
import { crudResources } from '@/features/crud/crudResources'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/reports', element: <ReportsPage /> },
          { path: '/profile', element: <ProfilePage /> },
          ...crudResources.map((resource) => ({
            path: resource.route,
            element: <GenericCrudPage resource={resource} />,
          })),
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
