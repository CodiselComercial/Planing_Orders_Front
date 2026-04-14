import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useLogin } from '@/features/auth/hooks/useAuth'

export default function LoginPage() {
  const login = useLogin()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#EFF8F2] px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto grid max-w-5xl gap-10 overflow-hidden rounded-[2rem] bg-white p-8 shadow-soft md:grid-cols-[1.2fr_1fr]"
      >
        <div className="space-y-6 px-4 py-8 sm:px-6">
          <div className="rounded-[1.75rem] bg-brand p-8 text-white shadow-lg shadow-brand/10">
            <p className="text-sm uppercase tracking-[0.28em] text-white/80">Bienvenido a ChefFlow</p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight">Gestiona recetas, proveedores e insumos con fluidez.</h1>
          </div>
          <p className="text-sm text-text-muted">Ingresa tus credenciales para acceder al panel y comenzar a optimizar operaciones gastronómicas.</p>
          <div className="rounded-[1.5rem] border border-border bg-neutral p-5">
            <p className="text-sm text-text-muted">¿Nuevo en ChefFlow?</p>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-3xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
              onClick={() => navigate('/register')}
            >
              Crear cuenta
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-neutral p-8">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Iniciar sesión</p>
            <h2 className="mt-3 text-2xl font-semibold text-text">Bienvenido de nuevo</h2>
          </div>
          <LoginForm onSubmit={(values) => login.mutate(values)} isLoading={login.status === 'pending'} />
          <p className="mt-6 text-sm text-text-muted">
            No tienes cuenta?{' '}
            <Link to="/register" className="font-semibold text-brand hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
