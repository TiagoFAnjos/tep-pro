import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'
import { cleanQuestions } from '../utils/questions'
import {
  formatCacheDate,
  loadOfflineQuestionsCache,
  saveQuestionsToOfflineCache,
} from '../utils/offlineQuestionsCache'

type ResultadoClinico = Question & {
  pontos: number
}

export default function MotorClinico() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [caso, setCaso] = useState('')
  const [resultados, setResultados] = useState<ResultadoClinico[]>([])
  const [offlineNotice, setOfflineNotice] = useState('')

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1500)

    if (error) {
      console.log(error)
      const cached = await loadOfflineQuestionsCache()

      if (cached.questions.length) {
        setQuestions(cached.questions)
        setOfflineNotice(`Modo offline: motor clínico usando protocolos salvos em ${formatCacheDate(cached.cachedAt)}.`)
      } else {
        alert('Erro ao carregar protocolos e nenhum cache local foi encontrado.')
      }

      return
    }

    const loaded = cleanQuestions(data)
    setQuestions(loaded)
    setOfflineNotice('')
    void saveQuestionsToOfflineCache(loaded)
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
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Motor Clínico Interno
      </h1>

      <p className="mt-2 text-slate-600">
        Busca clínica interna baseada nos protocolos do banco TEP.
      </p>

      {offlineNotice && (
        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {offlineNotice}
        </p>
      )}

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
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
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
                className="bg-white rounded-lg shadow-sm border p-5 sm:p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
                      {index + 1}. {q.title}
                    </h3>

                    <p className="text-slate-500 mt-2">
                      Tema: {q.tema} | Compatibilidade: {q.pontos}
                    </p>
                  </div>

                  <div
                    className={`h-fit rounded-lg px-4 py-2 font-bold ${
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

      <p className="whitespace-pre-line break-words leading-relaxed text-slate-700">
        {content}
      </p>
    </div>
  )
}
