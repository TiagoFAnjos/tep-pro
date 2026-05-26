import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'

const searchableFields: Array<keyof Question> = [
  'title',
  'tema',
  'definicao',
  'diagnostico',
  'conduta',
  'tratamento',
  'medicacoes_doses',
  'diagnosticos_diferenciais',
  'palavras_chave_clinicas',
]

export default function Protocolos() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selected, setSelected] = useState<Question | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [importing, setImporting] = useState(false)

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

  useEffect(() => {
    void Promise.resolve().then(fetchQuestions)
  }, [])

  const temas = useMemo(
    () => [
      'Todos',
      ...Array.from(
        new Set(
          questions
            .map((q) => q.tema)
            .filter((tema): tema is string => Boolean(tema))
        )
      ).sort((a, b) => a.localeCompare(b)),
    ],
    [questions]
  )

  const filtered = useMemo(
    () =>
      questions.filter((q) => {
        const matchTema = filter === 'Todos' ? true : q.tema === filter

        const texto = searchableFields
          .map((field) => q[field] || '')
          .join(' ')
          .toLowerCase()

        return matchTema && texto.includes(search.toLowerCase())
      }),
    [filter, questions, search]
  )

  const totalAltoRisco = questions.filter(
    (q) => q.nivel_risco === 'Alto'
  ).length

  async function handleCsvImport(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    setImporting(true)

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
        try {
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

          alert(`CSV importado com sucesso. ${data.length} linha(s).`)
          event.target.value = ''
          fetchQuestions()
        } finally {
          setImporting(false)
        }
      },

      error: (error) => {
        console.log(error)
        alert(`Erro ao ler CSV: ${error.message}`)
        setImporting(false)
      },
    })
  }

  return (
    <div className="p-8">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Protocolos
            </h1>

            <p className="mt-2 text-slate-600">
              Biblioteca clínica pediátrica integrada ao banco TEP PRO.
            </p>
          </div>

          <label className="bg-white border rounded-lg px-4 py-3 shadow-sm cursor-pointer text-sm font-semibold text-slate-700 hover:bg-slate-50 w-fit">
            {importing ? 'Importando...' : 'Importar CSV'}
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvImport}
              className="hidden"
              disabled={importing}
            />
          </label>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Metric label="Protocolos" value={questions.length} />
          <Metric label="Especialidades" value={temas.length - 1} />
          <Metric label="Alto risco" value={totalAltoRisco} tone="red" />
        </div>

        <section className="bg-white border rounded-lg shadow-sm p-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
            <input
              type="text"
              placeholder="Buscar por tema, diagnóstico, conduta, dose ou palavra-chave..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border p-4 outline-none focus:border-blue-500"
            />

            <div className="text-sm text-slate-500 flex items-center">
              {filtered.length} resultado(s)
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {temas.map((tema) => (
              <button
                key={tema}
                onClick={() => setFilter(tema)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === tema
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 border hover:bg-slate-100'
                }`}
              >
                {tema}
              </button>
            ))}
          </div>
        </section>

        {!selected ? (
          <div className="grid gap-4">
            {filtered.map((q) => (
              <button
                key={q.id}
                className="bg-white rounded-lg shadow-sm border p-5 text-left hover:border-blue-300 hover:bg-blue-50 transition"
                onClick={() => setSelected(q)}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {q.title}
                    </h2>

                    <p className="text-slate-500 mt-1">
                      {q.tema || 'Tema não definido'}
                    </p>
                  </div>

                  <RiskBadge value={q.nivel_risco} />
                </div>

                <p className="mt-4 text-slate-700 line-clamp-3">
                  {q.definicao}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <ProtocolDetail
            protocol={selected}
            onBack={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  )
}

function ProtocolDetail({
  protocol,
  onBack,
}: {
  protocol: Question
  onBack: () => void
}) {
  const sections = [
    ['Definição', protocol.definicao],
    ['Fisiopatologia', protocol.fisiopatologia],
    ['Fatores de risco', protocol.fatores_risco],
    ['Sinais e sintomas', protocol.sinais_sintomas],
    ['Diagnóstico', protocol.diagnostico],
    ['Conduta', protocol.conduta],
    ['Tratamento', protocol.tratamento],
    ['Medicações e doses', protocol.medicacoes_doses],
    ['Diagnósticos diferenciais', protocol.diagnosticos_diferenciais],
    ['Conduta na emergência', protocol.conduta_emergencia],
    ['Sinais de gravidade', protocol.sinais_gravidade],
    ['Critérios de internação', protocol.criterios_internacao],
    ['Critérios de UTI', protocol.criterios_uti],
    ['Erros comuns', protocol.erros_comuns],
    ['Pegadinhas TEP', protocol.pegadinhas],
    ['Resumo clínico', protocol.resumo],
    ['Fluxograma', protocol.fluxograma],
    ['Algoritmo', protocol.algoritmo],
    ['Tabela resumo', protocol.tabela_resumo],
    ['Score clínico', protocol.score_clinico],
    ['Mini aula', protocol.mini_aula],
    ['Checklist', protocol.checklist],
    ['Palavras-chave clínicas', protocol.palavras_chave_clinicas],
    ['Fontes', protocol.fontes],
  ] as const

  return (
    <div className="grid gap-5">
      <button
        onClick={onBack}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg w-fit font-semibold"
      >
        Voltar
      </button>

      <section className="bg-white rounded-lg shadow-sm border p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              {protocol.title}
            </h2>

            <p className="text-slate-500 mt-3">
              Tema: {protocol.tema || 'Não definido'}
            </p>
          </div>

          <RiskBadge value={protocol.nivel_risco} />
        </div>
      </section>

      <div className="grid gap-5">
        {sections.map(([title, content]) => (
          <Section key={title} title={title} content={content} />
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
  content?: string
}) {
  if (!content) return null

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        {title}
      </h3>

      <p className="whitespace-pre-line leading-relaxed text-slate-700">
        {content}
      </p>
    </section>
  )
}

function Metric({
  label,
  value,
  tone = 'slate',
}: {
  label: string
  value: number
  tone?: 'slate' | 'red'
}) {
  const valueClass = tone === 'red' ? 'text-red-700' : 'text-slate-900'

  return (
    <div className="bg-white rounded-lg shadow-sm border p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`text-4xl font-bold mt-3 ${valueClass}`}>{value}</p>
    </div>
  )
}

function RiskBadge({ value }: { value?: string }) {
  const className =
    value === 'Alto'
      ? 'bg-red-100 text-red-700'
      : value === 'Moderado/Alto'
        ? 'bg-orange-100 text-orange-700'
        : 'bg-slate-100 text-slate-700'

  return (
    <span className={`px-4 py-2 rounded-lg text-sm font-bold h-fit ${className}`}>
      {value || 'Risco não definido'}
    </span>
  )
}
