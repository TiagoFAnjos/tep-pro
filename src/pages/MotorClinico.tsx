import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function MotorClinico() {
  const [questions, setQuestions] = useState<any[]>([])
  const [caso, setCaso] = useState('')
  const [resultados, setResultados] = useState<any[]>([])

  useEffect(() => {
    fetchQuestions()
  }, [])

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

    setQuestions(data || [])
  }

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
      <h1 className="text-4xl font-bold text-blue-700">
        🧠 Motor Clínico Interno
      </h1>

      <p className="mt-2 text-gray-700">
        Busca clínica interna baseada nos protocolos do seu banco TEP.
      </p>

      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <textarea
          value={caso}
          onChange={(e) => setCaso(e.target.value)}
          placeholder="Ex: Lactente 4 meses com febre, gemência e Sat 89%"
          className="w-full h-40 border rounded-xl p-4 outline-none focus:border-blue-500"
        />

        <button
          onClick={analisarCaso}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          🔎 Analisar caso
        </button>
      </div>

      {resultados.length > 0 && (
        <div className="mt-10">
          <div
            className={`rounded-2xl p-6 shadow mb-8 ${
              riscoGeral === 'ALTO'
                ? 'bg-red-100 border border-red-300'
                : riscoGeral === 'MODERADO/ALTO'
                  ? 'bg-orange-100 border border-orange-300'
                  : 'bg-yellow-100 border border-yellow-300'
            }`}
          >
            <h2 className="text-3xl font-bold">
              🚨 Risco geral: {riscoGeral}
            </h2>

            <p className="mt-2 text-gray-700">
              O sistema priorizou protocolos com maior compatibilidade clínica
              e maior risco.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-4">
            Protocolos principais
          </h2>

          <div className="grid gap-4">
            {resultados.map((q, index) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-700">
                      {index + 1}. {q.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      Tema: {q.tema} | Compatibilidade: {q.pontos}
                    </p>
                  </div>

                  <div
                    className={`px-4 py-2 rounded-xl font-bold h-fit ${
                      q.nivel_risco === 'Alto'
                        ? 'bg-red-100 text-red-700'
                        : q.nivel_risco === 'Moderado/Alto'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {q.nivel_risco || 'Risco não definido'}
                  </div>
                </div>

                <Section
                  title="✅ Hipótese / protocolo relacionado"
                  content={q.definicao}
                />

                <Section
                  title="🚨 Conduta de emergência"
                  content={q.conduta_emergencia}
                />

                <Section
                  title="💊 Medicações e doses"
                  content={q.medicacoes_doses}
                />

                <Section
                  title="🔀 Diagnósticos diferenciais"
                  content={q.diagnosticos_diferenciais}
                />

                <Section
                  title="🚨 Sinais de gravidade"
                  content={q.sinais_gravidade}
                />

                <Section
                  title="💊 Conduta inicial"
                  content={q.conduta}
                />

                <Section
                  title="🧠 Algoritmo"
                  content={q.algoritmo}
                />

                <Section
                  title="🎯 Pegadinhas TEP"
                  content={q.pegadinhas}
                />

                <Section
                  title="✅ Checklist"
                  content={q.checklist}
                />
              </div>
            ))}
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 mt-8 text-sm text-gray-700">
            ⚠️ Este motor é uma ferramenta de estudo e apoio cognitivo.
            Doses pediátricas devem ser sempre confirmadas por peso, idade,
            função renal/hepática, disponibilidade local e protocolo institucional.
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
  content: string
}) {
  if (!content) return null

  return (
    <div className="mt-5 bg-gray-50 border rounded-xl p-4">
      <h4 className="font-bold mb-2">{title}</h4>

      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
    </div>
  )
}