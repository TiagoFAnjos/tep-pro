import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'
import { cleanQuestions } from '../utils/questions'

export default function Dashboard() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1000)

    if (error) {
      console.log(error)
      alert('Erro ao carregar dashboard')
      return
    }

    setQuestions(cleanQuestions(data))
    setLoading(false)
  }

  useEffect(() => {
    void Promise.resolve().then(fetchQuestions)
  }, [])

  const total = questions.length
  const favoritos = questions.filter((q) => q.favorito === true).length
  const completos = questions.filter(
    (q) => q.definicao && q.conduta && q.checklist
  ).length
  const basicos = total - completos

  const temas = Array.from(
    new Set(
      questions
        .map((q) => q.tema)
        .filter((tema): tema is string => Boolean(tema))
    )
  )

  const porTema = temas.map((tema) => ({
    tema,
    total: questions.filter((q) => q.tema === tema).length,
  }))

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-900">
        Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Visão geral do ecossistema pediátrico TEP PRO.
      </p>

      {loading && (
        <p className="mt-8 text-slate-600">
          Carregando dashboard...
        </p>
      )}

      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <Card title="Temas totais" value={total} />
            <Card title="Favoritos" value={favoritos} />
            <Card title="Protocolos completos" value={completos} />
            <Card title="Temas básicos" value={basicos} />
          </div>

          <section className="bg-white rounded-lg shadow-sm border p-6 mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Temas por especialidade
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {porTema.map((item) => (
                <div
                  key={item.tema}
                  className="bg-slate-50 rounded-lg p-4 border"
                >
                  <div className="flex justify-between gap-4">
                    <span className="font-semibold text-slate-800">
                      {item.tema}
                    </span>

                    <span className="text-blue-700 font-bold">
                      {item.total}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          total ? (item.total / total) * 100 : 0,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm border p-6 mt-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Status do banco
            </h2>

            <div className="mt-6 space-y-3 text-slate-700">
              <p>Bloco 1: Neonatologia + Emergência</p>
              <p>Bloco 2: Pneumologia + Infectologia + Vacinas</p>
              <p>Bloco 3: Cardiologia + Nefrologia + Endocrinologia</p>
              <p>Bloco 4: Neurologia + Hematologia + Reumatologia</p>
              <p>Bloco 5: Desenvolvimento + Adolescência + Ambulatorial</p>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function Card({
  title,
  value,
}: {
  title: string
  value: number
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-4xl font-bold text-slate-900 mt-3">
        {value}
      </h2>
    </div>
  )
}
