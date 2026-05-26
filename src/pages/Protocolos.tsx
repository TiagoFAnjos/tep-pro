import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'

export default function Protocolos() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selected, setSelected] = useState<Question | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1000)

    if (error) {
      console.log(error)
      alert('Erro ao carregar protocolos')
      return
    }

    setQuestions((data || []) as Question[])
  }

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
    const matchTema =
      filter === 'Todos'
        ? true
        : q.tema === filter

    const texto = `
      ${q.title || ''}
      ${q.tema || ''}
      ${q.definicao || ''}
      ${q.palavras_chave_clinicas || ''}
    `.toLowerCase()

    return (
      matchTema &&
      texto.includes(search.toLowerCase())
    )
  })

  function renderSection(title: string, content?: string) {
    if (!content) return null

    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">
          {title}
        </h3>

        <p className="whitespace-pre-line leading-relaxed text-gray-700">
          {content}
        </p>
      </div>
    )
  }

  async function handleCsvImport(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
        if (results.errors.length > 0) {
          console.log(results.errors)
          alert('Erro ao ler CSV. Verifique o formato do arquivo.')
          return
        }

        const data = results.data.filter(
          (row) => row.title?.trim()
        )

        if (!data.length) {
          alert('Nenhuma linha válida encontrada no CSV.')
          return
        }

        const { error } = await supabase
          .from('questions')
          .upsert(data, {
            onConflict: 'title',
          })

        if (error) {
          console.log(error)
          alert(`Erro ao importar CSV: ${error.message}`)
          return
        }

        alert(`CSV importado com sucesso! ${data.length} linha(s).`)
        event.target.value = ''
        fetchQuestions()
      },

      error: (error) => {
        console.log(error)
        alert(`Erro ao ler CSV: ${error.message}`)
      },
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-700">
        📚 Protocolos
      </h1>

      <p className="mt-2 text-gray-700">
        Biblioteca clínica pediátrica integrada.
      </p>

    <div className="mt-6">
      <input
        type="file"
        accept=".csv"
        onChange={handleCsvImport}
    className="bg-white p-4 rounded-xl shadow border"
  />
</div>

      <div className="mt-8">
        <input
          type="text"
          placeholder="🔎 Buscar protocolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white rounded-2xl shadow p-4 outline-none border focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        {temas.map((tema) => (
          <button
            key={tema}
            onClick={() => setFilter(tema)}
            className={`px-4 py-2 rounded-xl ${
              filter === tema
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            {tema}
          </button>
        ))}
      </div>

      {!selected ? (
        <div className="grid gap-6 mt-8">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl shadow p-6 cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelected(q)}
            >
              <h2 className="text-2xl font-bold text-blue-700">
                {q.title}
              </h2>

              <p className="text-gray-600 mt-2">
                Tema: {q.tema}
              </p>

              <p className="mt-4 text-gray-700 line-clamp-3">
                {q.definicao}
              </p>

              <div className="mt-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm">
                  {q.nivel_risco || 'Sem classificação'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          <button
            onClick={() => setSelected(null)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl w-fit"
          >
            ← Voltar
          </button>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-4xl font-bold text-blue-700">
              {selected.title}
            </h2>

            <p className="text-gray-600 mt-3">
              Tema: {selected.tema}
            </p>

            <div className="mt-5">
              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-xl">
                Risco: {selected.nivel_risco || 'Não definido'}
              </span>
            </div>
          </div>

          {renderSection('📖 Definição', selected.definicao)}

          {renderSection(
            '🧬 Fisiopatologia',
            selected.fisiopatologia
          )}

          {renderSection(
            '⚠️ Fatores de risco',
            selected.fatores_risco
          )}

          {renderSection(
            '🩺 Sinais e sintomas',
            selected.sinais_sintomas
          )}

          {renderSection(
            '🔬 Diagnóstico',
            selected.diagnostico
          )}

          {renderSection(
            '🚨 Conduta',
            selected.conduta
          )}

          {renderSection(
            '💊 Tratamento',
            selected.tratamento
          )}

          {renderSection(
            '💉 Medicações e doses',
            selected.medicacoes_doses
          )}

          {renderSection(
            '🧠 Diagnósticos diferenciais',
            selected.diagnosticos_diferenciais
          )}

          {renderSection(
            '🚑 Conduta na emergência',
            selected.conduta_emergencia
          )}

          {renderSection(
            '🔺 Sinais de gravidade',
            selected.sinais_gravidade
          )}

          {renderSection(
            '🏥 Critérios de internação',
            selected.criterios_internacao
          )}

          {renderSection(
            '❌ Erros comuns',
            selected.erros_comuns
          )}

          {renderSection(
            '🎯 Pegadinhas TEP',
            selected.pegadinhas
          )}

          {renderSection(
            '📌 Resumo clínico',
            selected.resumo
          )}

          {renderSection(
            '🧭 Fluxograma',
            selected.fluxograma
          )}

          {renderSection(
            '📊 Tabela resumo',
            selected.tabela_resumo
          )}

          {renderSection(
            '🧮 Score clínico',
            selected.score_clinico
          )}

          {renderSection(
            '🧠 Mini aula',
            selected.mini_aula
          )}

          {renderSection(
            '📋 Checklist',
            selected.checklist
          )}

          {renderSection(
            '🔑 Palavras-chave clínicas',
            selected.palavras_chave_clinicas
          )}
        </div>
      )}
    </div>
  )
}
