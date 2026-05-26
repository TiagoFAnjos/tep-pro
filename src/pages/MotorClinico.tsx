import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'

type ResultadoClinico = Question & {
  pontos: number
}

export default function MotorClinico() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [caso, setCaso] = useState('')
  const [resultados, setResultados] = useState<ResultadoClinico[]>([])

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1500)

    if (error) {
      console.log(error)
      alert('Erro ao carregar protocolos')
      return
    }

    setQuestions((data || []) as Question[])
  }

  useEffect(() => {
    void Promise.resolve().then(fetchQuestions)
  }, [])

  function analisarCaso() {
    const texto = caso.toLowerCase()

    const palavras = texto
      .split(/\s+/)
      .map((p) => p.replace(/[.,;:!?]/g, ''))
      .filter((p) => p.length > 3)

    const sinaisGravidadeTexto = [
      'sat 89',
      'sat 88',
      'sat 87',
      'sat 86',
      'sat 85',
      'saturação baixa',
      'gemência',
      'tiragem',
      'cianose',
      'apneia',
      'letargia',
      'hipotensão',
      'convulsão',
      'rebaixamento',
      'extremidades frias',
      'tec aumentado',
      'oligúria',
      'kussmaul',
    ]

    const temGravidade = sinaisGravidadeTexto.some((sinal) =>
      texto.includes(sinal)
    )

    const achados = questions
      .map((q) => {
        const base = `
          ${q.title || ''}
          ${q.tema || ''}
          ${q.definicao || ''}
          ${q.sinais_sintomas || ''}
          ${q.diagnostico || ''}
          ${q.conduta || ''}
          ${q.tratamento || ''}
          ${q.pegadinhas || ''}
          ${q.checklist || ''}
          ${q.dica_tep || ''}
          ${q.palavras_chave_clinicas || ''}
          ${q.conduta_emergencia || ''}
          ${q.diagnosticos_diferenciais || ''}
          ${q.medicacoes_doses || ''}
        `.toLowerCase()

        const pontosTexto = palavras.filter((p) =>
          base.includes(p)
        ).length

        const pontosRisco =
          q.nivel_risco === 'Alto' && temGravidade
            ? 5
            : q.nivel_risco === 'Moderado/Alto' && temGravidade
              ? 3
              : 0

        return {
          ...q,
          pontos: pontosTexto + pontosRisco,
        }
      })
      .filter((q) => q.pontos > 0)
      .sort((a, b) => b.pontos - a.pontos)
      .slice(0, 6)

    setResultados(achados)
  }

  const riscoGeral =
    resultados.some((r) => r.nivel_risco === 'Alto')
      ? 'ALTO'
      : resultados.some((r) => r.nivel_risco === 'Moderado/Alto')
        ? 'MODERADO/ALTO'
        : resultados.length > 0
          ? 'MODERADO'
          : ''

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-slate-900">
        Motor Clínico Interno
      </h1>

      <p className="mt-2 text-slate-600">
        Busca clínica interna baseada nos protocolos do banco TEP.
      </p>

      <section className="bg-white rounded-lg shadow-sm border p-6 mt-8">
        <textarea
          value={caso}
          onChange={(e) => setCaso(e.target.value)}
          placeholder="Ex: Lactente 4 meses com febre, gemência e Sat 89%"
          className="w-full h-40 border rounded-lg p-4 outline-none focus:border-blue-500"
        />

        <button
          onClick={analisarCaso}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Analisar caso
        </button>
      </section>

      {resultados.length > 0 && (
        <div className="mt-10">
          <div
            className={`rounded-lg p-6 shadow-sm border mb-8 ${
              riscoGeral === 'ALTO'
                ? 'bg-red-50 border-red-200'
                : riscoGeral === 'MODERADO/ALTO'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-yellow-50 border-yellow-200'
            }`}
          >
            <h2 className="text-3xl font-bold text-slate-900">
              Risco geral: {riscoGeral}
            </h2>

            <p className="mt-2 text-slate-700">
              O sistema priorizou protocolos com maior compatibilidade clínica
              e maior risco.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-slate-900">
            Protocolos principais
          </h2>

          <div className="grid gap-4">
            {resultados.map((q, index) => (
              <section
                key={q.id}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {index + 1}. {q.title}
                    </h3>

                    <p className="text-slate-500 mt-2">
                      Tema: {q.tema} | Compatibilidade: {q.pontos}
                    </p>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-lg font-bold h-fit ${
                      q.nivel_risco === 'Alto'
                        ? 'bg-red-100 text-red-700'
                        : q.nivel_risco === 'Moderado/Alto'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {q.nivel_risco || 'Risco não definido'}
                  </div>
                </div>

                <Section
                  title="Hipótese / protocolo relacionado"
                  content={q.definicao}
                />

                <Section
                  title="Conduta de emergência"
                  content={q.conduta_emergencia}
                />

                <Section
                  title="Medicações e doses"
                  content={q.medicacoes_doses}
                />

                <Section
                  title="Diagnósticos diferenciais"
                  content={q.diagnosticos_diferenciais}
                />

                <Section
                  title="Sinais de gravidade"
                  content={q.sinais_gravidade}
                />

                <Section
                  title="Conduta inicial"
                  content={q.conduta}
                />

                <Section
                  title="Algoritmo"
                  content={q.algoritmo}
                />

                <Section
                  title="Pegadinhas TEP"
                  content={q.pegadinhas}
                />

                <Section
                  title="Checklist"
                  content={q.checklist}
                />
              </section>
            ))}
          </div>

          <div className="bg-slate-100 rounded-lg p-6 mt-8 text-sm text-slate-700">
            Este motor é uma ferramenta de estudo e apoio cognitivo. Doses
            pediátricas devem ser sempre confirmadas por peso, idade, função
            renal/hepática, disponibilidade local e protocolo institucional.
          </div>
        </div>
      )}
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
    <div className="mt-5 bg-slate-50 border rounded-lg p-4">
      <h4 className="font-bold mb-2 text-slate-900">{title}</h4>

      <p className="text-slate-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
    </div>
  )
}
