import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/protocolos', label: 'Protocolos' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/revisao', label: 'Revisão' },
  { to: '/modo-prova', label: 'Simulados TEP' },
  { to: '/motor-clinico', label: 'Motor Clínico' },
]

export default function Sidebar() {
  const { user, isAdmin, adminLoading, signOut } = useAuth()

  return (
    <aside className="flex w-full flex-col bg-slate-900 p-4 text-white lg:sticky lg:top-0 lg:min-h-screen lg:w-64 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between lg:block">
        <h1 className="shrink-0 text-2xl font-bold">
          TEP PRO
        </h1>

        <div className="rounded-lg bg-slate-800 p-3 sm:max-w-xs lg:mt-4 lg:max-w-none">
          <p className="text-xs text-slate-400">Login</p>
          <p className="mt-1 break-all text-sm font-semibold text-slate-100">
            {user?.email}
          </p>
          <p className="mt-2 text-xs font-semibold text-blue-200">
            {adminLoading ? 'Verificando perfil...' : isAdmin ? 'Administrador' : 'Usuário leitura'}
          </p>
        </div>
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-col lg:overflow-visible lg:pb-0">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white lg:shrink"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => void signOut()}
        className="mt-4 rounded-lg bg-slate-800 px-3 py-2 text-left text-sm font-semibold text-slate-200 hover:bg-slate-700 lg:mt-auto"
      >
        Sair
      </button>
    </aside>
  )
}
