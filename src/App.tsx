import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from './layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Protocolos from './pages/Protocolos'
import Flashcards from './pages/Flashcards'
import Simulados from './pages/Simulados'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/protocolos" element={<Protocolos />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/simulados" element={<Simulados />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}