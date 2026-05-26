import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'

export default function Flashcards() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')
  const [openCard, setOpenCard] = useState<string | null>(null)

  async function fetchFlashcards() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .not('flashcards', 'is', null)
      .limit(1000)

    if (error) {
      console.log(error)
      alert('Erro ao carregar flashcards')
      return
    }

    setQuestions((data || []) as Question[])
  }

  useEffect(() => {
    void Promise.resolve().then(fetchFlashcards)
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
      ${q.flashcards || ''}
    `.toLowerCase()

    return matchTema && texto.includes(search.toLowerCase())
  })

  function parseFlashcards(text: string) {
    return text
      .split('|')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [pergunta, resposta] = item.split('::')

        return {
          pergunta: pergunta?.trim() || item,
          resposta: resposta?.trim() || 'Sem resposta cadastrada',
        }
      })
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-900">
        Flashcards
      </h1>

      <p className="mt-2 text-slate-600">
        Revisão rápida por perguntas e respostas dos protocolos.
      </p>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Buscar flashcard..."
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
        Exibindo {filtered.length} tema(s)
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

            <div className="grid gap-4 mt-6">
              {parseFlashcards(q.flashcards || '').map(
                (card, index) => {
                  const cardId = `${q.id}-${index}`
                  const isOpen = openCard === cardId

                  return (
                    <div
                      key={cardId}
                      className="border rounded-lg p-5 bg-slate-50"
                    >
                      <button
                        onClick={() =>
                          setOpenCard(isOpen ? null : cardId)
                        }
                        className="w-full text-left"
                      >
                        <p className="font-bold text-lg text-slate-900">
                          {card.pergunta}
                        </p>

                        <p className="text-blue-600 mt-2 text-sm font-medium">
                          {isOpen
                            ? 'Ocultar resposta'
                            : 'Mostrar resposta'}
                        </p>
                      </button>

                      {isOpen && (
                        <div className="mt-4 bg-white rounded-lg p-4 border">
                          <p className="text-slate-700 leading-relaxed">
                            {card.resposta}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                }
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
