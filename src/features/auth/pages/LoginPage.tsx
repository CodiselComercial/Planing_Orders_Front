import { motion } from 'framer-motion'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { useLogin } from '@/features/auth/hooks/useAuth'

export default function LoginPage() {
  const login = useLogin()

  return (
    <div className="min-h-screen bg-[#EFF8F2] px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white p-8 shadow-soft"
      >
        <div className="rounded-[2rem] border border-border bg-neutral p-8">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Iniciar sesión</p>
            <h2 className="mt-3 text-2xl font-semibold text-text">Bienvenido a ChefFlow</h2>
          </div>
          <LoginForm onSubmit={(values) => login.mutate(values)} isLoading={login.status === 'pending'} />
        </div>
      </motion.div>
    </div>
  )
}
