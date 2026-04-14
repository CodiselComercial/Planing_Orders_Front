import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { queryClient } from '@/lib/queryClient'
import { router } from '@/router'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'DM Sans, sans-serif',
            borderRadius: '14px',
            border: '1px solid rgba(200, 230, 204, 0.7)',
          },
          success: {
            iconTheme: { primary: '#2D6A4F', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#F03E3E', secondary: '#fff' },
          },
        }}
      />
    </QueryClientProvider>
  )
}
