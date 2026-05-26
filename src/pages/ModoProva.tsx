import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'

export default function ModoProva() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .not('simulado', 'is', null)
      .limit(20)

    if (error) {
      console.log(error)
      return
    }

    const shuffled = [...((data || []) as Question[])].sort(
      () => Math.random() - 0.5
    )

    setQuestions(shuffled)
  }

  useEffect(() => {
    void Promise.resolve().then(fetchQuestions)
  }, [])

  function responder(acertou: boolean) {
    if (acertou) {
      setScore((prev) => prev + 1)
    }

    if (current + 1 >= questions.length) {
      setFinished(true)
      return
    }

    setCurrent((prev) => prev + 1)
  }

  if (!questions.length) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Carregando prova...
        </h1>
      </div>
    )
  }

  if (finished) {
    const percentual = Math.round(
      (score / questions.length) * 100
    )

    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Resultado Final
        </h1>

        <section className="bg-white rounded-lg shadow-sm border p-8 mt-8">
          <h2 className="text-5xl font-bold text-green-700">
            {percentual}%
          </h2>

          <p className="mt-4 text-xl text-slate-700">
            {score} acertos de {questions.length}
          </p>

          <div className="mt-8">
            {percentual >= 80 && (
              <p className="text-green-700 font-bold text-xl">
                Excelente desempenho
              </p>
            )}

            {percentual >= 60 && percentual < 80 && (
              <p className="text-yellow-700 font-bold text-xl">
                Bom desempenho, mas revisar temas fracos
              </p>
            )}

            {percentual < 60 && (
              <p className="text-red-700 font-bold text-xl">
                Revisão intensiva recomendada
              </p>
            )}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold"
          >
            Nova prova
          </button>
        </section>
      </div>
    )
  }

  const q = questions[current]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-4xl font-bold text-slate-900">
          Modo Prova TEP
        </h1>

        <div className="bg-white rounded-lg px-5 py-3 shadow-sm border">
          Questão {current + 1}/{questions.length}
        </div>
      </div>

      <section className="bg-white rounded-lg shadow-sm border p-8 mt-8">
        <h2 className="text-3xl font-bold text-slate-900">
          {q.title}
        </h2>

        <p className="text-slate-500 mt-2">
          Tema: {q.tema}
        </p>

        <div className="mt-8">
          <Section
            title="Simulado"
            content={q.simulado}
          />

          <Section
            title="Dica TEP"
            content={q.dica_tep}
          />
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={() => responder(false)}
            className="bg-red-600 text-white px-6 py-4 rounded-lg font-semibold"
          >
            Errei
          </button>

          <button
            onClick={() => responder(true)}
            className="bg-green-700 text-white px-6 py-4 rounded-lg font-semibold"
          >
            Acertei
          </button>
        </div>
      </section>
    </div>
  )
}

function Section({
  title,
  content,
}: {
  title: string
  content?: string
}) {
  if (!content) return null

  return (
    <div className="mt-6 bg-slate-50 rounded-lg p-5 border">
      <h2 className="text-xl font-bold mb-3 text-slate-900">
        {title}
      </h2>

      <p className="text-slate-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
    </div>
  )
}
