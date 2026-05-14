import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import CsvImporter from '../components/CsvImporter'

export default function Protocolos() {
  const [questions, setQuestions] = useState<any[]>([])
  const [selected, setSelected] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Todos')

  const temas = [
    'Todos',
    'Neonatologia',
    'Emergência',
    'Pneumologia',
    'Infectologia',
    'Neurologia',
    'Endocrinologia',
    'Cardiologia',
    'Gastroenterologia',
    'Hematologia',
    'Nefrologia',
  ]

  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('tema', { ascending: true })
      .limit(300)

    if (error) {
      console.log(error)
      alert('Erro ao conectar Supabase')
      return
    }

    setQuestions(data || [])
    setLoading(false)
  }

  const filteredQuestions = questions.filter((q) =>
    filter === 'Todos' ? true : q.tema === filter
  )

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
          <h1 className="text-3xl font-bold text-blue-700">
            {selected.title}
          </h1>

          <p className="mt-2 text-gray-600">
            Tema: {selected.tema} | Dificuldade:{' '}
            {selected.dificuldade || '—'}
          </p>

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

      <div className="flex flex-wrap gap-3 mt-10">
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

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Temas do Banco
      </h2>

      <p className="text-gray-600 mb-4">
        Exibindo {filteredQuestions.length} tema(s)
      </p>

      {loading && <p>Carregando...</p>}

      <div className="grid gap-4">
        {filteredQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => setSelected(q)}
            className="bg-white rounded-2xl shadow p-6 text-left hover:bg-blue-50 transition"
          >
            <h3 className="text-xl font-bold">{q.title}</h3>

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