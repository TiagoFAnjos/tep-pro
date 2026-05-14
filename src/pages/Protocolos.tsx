import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import CsvImporter from '../components/CsvImporter'

export default function Protocolos() {
  const [questions, setQuestions] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  const temas = [
    'Todos',
    'Favoritos',
    'Neonatologia',
    'Emergência',
    'Pneumologia',
    'Infectologia',
    'Vacinas',
    'Neurologia',
    'Endocrinologia',
    'Cardiologia',
    'Gastroenterologia',
    'Hematologia',
    'Nefrologia',
    'Reumatologia',
  ]

  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('tema', { ascending: true })
      .limit(700)

    if (error) {
      console.log(error)
      alert('Erro ao conectar Supabase')
      return
    }

    setQuestions(data || [])
    setLoading(false)
  }

  async function toggleFavorito(q: any) {
    const novoValor = !q.favorito

    const { error } = await supabase
      .from('questions')
      .update({ favorito: novoValor })
      .eq('id', q.id)

    if (error) {
      console.log(error)
      alert('Erro ao atualizar favorito')
      return
    }

    setQuestions((prev) =>
      prev.map((item) =>
        item.id === q.id
          ? { ...item, favorito: novoValor }
          : item
      )
    )

    if (selected?.id === q.id) {
      setSelected({
        ...selected,
        favorito: novoValor,
      })
    }
  }

  const filteredQuestions = questions.filter((q) => {
    const matchesTema =
      filter === 'Todos'
        ? true
        : filter === 'Favoritos'
          ? q.favorito === true
          : q.tema === filter

    const searchText = `
      ${q.title || ''}
      ${q.tema || ''}
      ${q.definicao || ''}
      ${q.conduta || ''}
      ${q.tratamento || ''}
      ${q.pegadinhas || ''}
      ${q.tags || ''}
      ${q.flashcards || ''}
      ${q.mini_aula || ''}
      ${q.simulado || ''}
    `.toLowerCase()

    const matchesSearch = searchText.includes(
      search.toLowerCase()
    )

    return matchesTema && matchesSearch
  })

  if (selected) {
    return (
      <div className="p-8">
        <button
          onClick={() => setSelected(null)}
          className="mb-6 bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          ← Voltar
        </button>

        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-700">
                {selected.title}
              </h1>

              <p className="mt-2 text-gray-600">
                Tema: {selected.tema} | Dificuldade:{' '}
                {selected.dificuldade || '—'}
              </p>
            </div>

            <button
              onClick={() => toggleFavorito(selected)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                selected.favorito
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {selected.favorito
                ? '⭐ Favorito'
                : '☆ Favoritar'}
            </button>
          </div>

          <Section title="📚 Definição" content={selected.definicao} />
          <Section title="🔬 Fisiopatologia" content={selected.fisiopatologia} />
          <Section title="⚠️ Fatores de risco" content={selected.fatores_risco} />
          <Section title="🩺 Sinais e sintomas" content={selected.sinais_sintomas} />
          <Section title="🧪 Diagnóstico" content={selected.diagnostico} />
          <Section title="💊 Conduta" content={selected.conduta} />
          <Section title="💉 Tratamento" content={selected.tratamento} />
          <Section title="🎯 Pegadinhas TEP" content={selected.pegadinhas} />
          <Section title="📝 Resumo" content={selected.resumo} />
          <Section title="🔄 Fluxograma" content={selected.fluxograma} />
          <Section title="📊 Tabela resumo" content={selected.tabela_resumo} />
          <Section title="🧠 Algoritmo" content={selected.algoritmo} />
          <Section title="📈 Score clínico" content={selected.score_clinico} />
          <Section title="🚨 Sinais de gravidade" content={selected.sinais_gravidade} />
          <Section title="🏥 Critérios de internação" content={selected.criterios_internacao} />
          <Section title="❌ Erros comuns" content={selected.erros_comuns} />
          <Section title="💡 Dica TEP" content={selected.dica_tep} />
          <Section title="✅ Checklist" content={selected.checklist} />
          <Section title="🧠 Flashcards" content={selected.flashcards} />
          <Section title="🎓 Mini aula" content={selected.mini_aula} />
          <Section title="🧪 Simulado" content={selected.simulado} />
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-700">
        📚 Protocolos
      </h1>

      <p className="mt-2 text-gray-700">
        Protocolos clínicos pediátricos integrados ao Supabase
      </p>

      <div className="mt-8">
        <CsvImporter />
      </div>

      <div className="mt-8">
        <input
          type="text"
          placeholder="🔎 Buscar por tema, conduta, doença, pegadinha..."
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
                : tema === 'Favoritos'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-white text-gray-700'
            }`}
          >
            {tema === 'Favoritos' ? '⭐ Favoritos' : tema}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Temas do Banco
      </h2>

      <p className="text-gray-600 mb-4">
        Exibindo {filteredQuestions.length} tema(s)
      </p>

      {loading && <p>Carregando...</p>}

      <div className="grid gap-4">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl shadow p-6 hover:bg-blue-50 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <button
                onClick={() => setSelected(q)}
                className="text-left flex-1"
              >
                <h3 className="text-xl font-bold">
                  {q.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  Tema: {q.tema}
                </p>

                <p className="text-gray-600">
                  Dificuldade: {q.dificuldade || '—'}
                </p>

                <p className="mt-3 text-blue-600 font-semibold">
                  Abrir protocolo →
                </p>
              </button>

              <button
                onClick={() => toggleFavorito(q)}
                className={`px-4 py-2 rounded-xl font-semibold ${
                  q.favorito
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {q.favorito ? '⭐' : '☆'}
              </button>
            </div>
          </div>
        ))}
      </div>
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
    <div className="mt-6 bg-gray-50 rounded-xl p-5 border">
      <h2 className="text-xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
    </div>
  )
}