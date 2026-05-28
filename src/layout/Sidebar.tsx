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
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      <div>
        <h1 className="text-2xl font-bold">
          TEP PRO
        </h1>

        <div className="mt-4 rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Login</p>
          <p className="mt-1 break-all text-sm font-semibold text-slate-100">
            {user?.email}
          </p>
          <p className="mt-2 text-xs font-semibold text-blue-200">
            {adminLoading ? 'Verificando perfil...' : isAdmin ? 'Administrador' : 'Usuário leitura'}
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 mt-8">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => void signOut()}
        className="mt-auto rounded-lg bg-slate-800 px-3 py-2 text-left text-sm font-semibold text-slate-200 hover:bg-slate-700"
      >
        Sair
      </button>
    </aside>
  )
}
