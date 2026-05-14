import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        🧠 TEP PRO
      </h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-200">
          📊 Dashboard
        </Link>

        <Link
          to="/protocolos"
          className="hover:text-blue-200"
        >
          📚 Protocolos
        </Link>

        <Link
          to="/flashcards"
          className="hover:text-blue-200"
        >
          🧠 Flashcards
        </Link>

        <Link
          to="/simulados"
          className="hover:text-blue-200"
        >
          🩺 Simulados
        </Link>
      </nav>
    </div>
  )
}