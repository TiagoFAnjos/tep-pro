import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from './layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Protocolos from './pages/Protocolos'
import Flashcards from './pages/Flashcards'
import Simulados from './pages/Simulados'
import Revisao from './pages/Revisao'
import ModoProva from './pages/ModoProva'

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
            <Route path="/revisao" element={<Revisao />} />
            <Route path="/modo-prova" element={<ModoProva />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}