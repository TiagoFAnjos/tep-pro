import { useState } from 'react'
import { useAuth } from './useAuth'

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { loading, session, signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-100 p-6">
        <p className="text-slate-600">Carregando sessão...</p>
      </div>
    )
  }

  if (session) return <>{children}</>

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setMessage('')

    const result = mode === 'login'
      ? await signIn(email.trim(), password)
      : await signUp(email.trim(), password)

    setSubmitting(false)

    if (result.error) {
      setMessage(result.error)
      return
    }

    if ('needsConfirmation' in result && result.needsConfirmation) {
      setMessage('Cadastro criado. Confirme o e-mail antes de entrar.')
      setMode('login')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 grid place-items-center p-6">
      <section className="w-full max-w-md bg-white border rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          TEP PRO
        </h1>

        <p className="mt-2 text-slate-600">
          Entre com seu login para acessar a plataforma.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-6 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`rounded-md px-3 py-2 text-sm font-semibold ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            Criar login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-lg border p-3 outline-none focus:border-blue-500"
              autoComplete="email"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-lg border p-3 outline-none focus:border-blue-500"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </label>

          {message && (
            <p className="rounded-lg bg-slate-50 border p-3 text-sm text-slate-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {submitting
              ? 'Aguarde...'
              : mode === 'login'
                ? 'Entrar'
                : 'Criar login'}
          </button>
        </form>

        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          Usuários comuns têm acesso somente leitura. Alterações no banco,
          importações e revisão global ficam restritas ao administrador.
        </p>
      </section>
    </div>
  )
}
