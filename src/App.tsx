import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from './layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Protocolos from './pages/Protocolos'
import Flashcards from './pages/Flashcards'
import Simulados from './pages/Simulados'
import Revisao from './pages/Revisao'
import ModoProva from './pages/ModoProva'
import MotorClinico from './pages/MotorClinico'
import { AuthProvider } from './auth/AuthProvider'
import AuthGate from './auth/AuthGate'

export default function App() {
  return (
    <AuthProvider>
      <AuthGate>
        <BrowserRouter>
          <div className="flex min-h-screen flex-col bg-gray-100 lg:flex-row">
            <Sidebar />

            <main className="min-w-0 flex-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/protocolos" element={<Protocolos />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/simulados" element={<Simulados />} />
                <Route path="/revisao" element={<Revisao />} />
                <Route path="/modo-prova" element={<ModoProva />} />
                <Route path="/motor-clinico" element={<MotorClinico />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthGate>
    </AuthProvider>
  )
}
