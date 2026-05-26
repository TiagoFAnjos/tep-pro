import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'

export default function Simulados() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  async function fetchSimulados() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .not('simulado', 'is', null)
      .limit(1000)

    if (error) {
      console.log(error)
      alert('Erro ao carregar simulados')
      return
    }

    setQuestions((data || []) as Question[])
  }

  useEffect(() => {
    void Promise.resolve().then(fetchSimulados)
  }, [])

  const temas = [
    'Todos',
    ...Array.from(
      new Set(
        questions
          .map((q) => q.tema)
          .filter((tema): tema is string => Boolean(tema))
      )
    ),
  ]

  const filtered = questions.filter((q) => {
    const matchTema = filter === 'Todos' ? true : q.tema === filter

    const texto = `
      ${q.title || ''}
      ${q.tema || ''}
      ${q.simulado || ''}
    `.toLowerCase()

    return matchTema && texto.includes(search.toLowerCase())
  })

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-900">
        Simulados
      </h1>

      <p className="mt-2 text-slate-600">
        Casos clínicos e questões estilo TEP.
      </p>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Buscar simulado..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-lg shadow-sm p-4 outline-none border focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        {temas.map((tema) => (
          <button
            key={tema}
            onClick={() => setFilter(tema)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === tema
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border'
            }`}
          >
            {tema}
          </button>
        ))}
      </div>

      <p className="text-slate-600 mt-6">
        Exibindo {filtered.length} simulado(s)
      </p>

      <div className="grid gap-5 mt-8">
        {filtered.map((q) => (
          <section
            key={q.id}
            className="bg-white rounded-lg shadow-sm border p-6"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              {q.title}
            </h2>

            <p className="text-slate-500 mt-1">
              Tema: {q.tema}
            </p>

            <div className="mt-6 bg-slate-50 rounded-lg border p-5">
              <p className="text-slate-800 whitespace-pre-line leading-relaxed">
                {q.simulado}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
