import { Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/protocolos', label: 'Protocolos' },
  { to: '/flashcards', label: 'Flashcards' },
  { to: '/simulados', label: 'Simulados' },
  { to: '/revisao', label: 'Revisão' },
  { to: '/modo-prova', label: 'Modo Prova' },
  { to: '/motor-clinico', label: 'Motor Clínico' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        TEP PRO
      </h1>

      <nav className="flex flex-col gap-2">
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
    </aside>
  )
}
