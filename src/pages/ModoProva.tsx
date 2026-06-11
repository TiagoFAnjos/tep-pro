import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'
import {
  choices,
  provaTituloPediatriaQuestions,
  type Choice,
  type ProvaQuestion,
} from '../data/provaTituloPediatria'
import { cleanQuestions } from '../utils/questions'
import {
  formatCacheDate,
  loadOfflineQuestionsCache,
  saveQuestionsToOfflineCache,
} from '../utils/offlineQuestionsCache'

const provaSize = 50

export default function ModoProva() {
  const [bankQuestions, setBankQuestions] = useState<Question[]>([])
  const [deck, setDeck] = useState<ProvaQuestion[]>([])
  const [current, setCurrent] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [offlineNotice, setOfflineNotice] = useState('')

  async function fetchQuestions() {
    setLoading(true)

    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .not('simulado', 'is', null)
      .limit(1000)

    if (error) {
      console.log(error)
      const cached = await loadOfflineQuestionsCache()
      const cachedSimulados = cached.questions.filter((question) =>
        question.simulado?.trim()
      )

      setBankQuestions(cachedSimulados)
      setDeck(buildDeck(cachedSimulados))
      setOfflineNotice(
        cachedSimulados.length
          ? `Modo offline: usando questões salvas em ${formatCacheDate(cached.cachedAt)}.`
          : 'Modo offline: usando apenas questões locais embutidas no app.'
      )
      setLoading(false)
      return
    }

    const loaded = cleanQuestions(data)

    setBankQuestions(loaded)
    setDeck(buildDeck(loaded))
    setOfflineNotice('')
    void saveQuestionsToOfflineCache(loaded)
    setLoading(false)
  }

  useEffect(() => {
    void Promise.resolve().then(fetchQuestions)
  }, [])

  const temas = useMemo(
    () => new Set(deck.map((question) => question.tema)),
    [deck]
  )

  const question = deck[current]
  const answered = selectedChoice !== null
  const isCorrect = selectedChoice === question?.resposta

  function choose(choice: Choice) {
    if (answered) return

    setSelectedChoice(choice)

    if (choice === question.resposta) {
      setScore((prev) => prev + 1)
    }
  }

  function nextQuestion() {
    if (current + 1 >= deck.length) {
      setFinished(true)
      return
    }

    setCurrent((prev) => prev + 1)
    setSelectedChoice(null)
  }

  function restart() {
    setDeck(buildDeck(bankQuestions))
    setCurrent(0)
    setSelectedChoice(null)
    setFinished(false)
    setScore(0)
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Carregando prova...
        </h1>
      </div>
    )
  }

  if (!deck.length) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Nenhuma questão disponível
        </h1>
      </div>
    )
  }

  if (finished) {
    const percentual = Math.round((score / deck.length) * 100)

    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Simulado unificado
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Resultado Final
          </h1>
        </header>

        <section className="bg-white rounded-lg shadow-sm border p-5 mt-8 sm:p-8">
          <h2 className="text-4xl font-bold text-green-700 sm:text-5xl">
            {percentual}%
          </h2>

          <p className="mt-4 text-xl text-slate-700">
            {score} acertos de {deck.length}
          </p>

          <p className="mt-3 text-slate-600">
            Temas avaliados: {temas.size}
          </p>

          <div className="mt-8">
            {percentual >= 80 && (
              <p className="text-green-700 font-bold text-xl">
                Excelente desempenho
              </p>
            )}

            {percentual >= 60 && percentual < 80 && (
              <p className="text-yellow-700 font-bold text-xl">
                Bom desempenho, mas revise os temas fracos
              </p>
            )}

            {percentual < 60 && (
              <p className="text-red-700 font-bold text-xl">
                Revisão intensiva recomendada
              </p>
            )}
          </div>

          <button
            onClick={restart}
            className="mt-8 bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold"
          >
            Nova prova
          </button>
        </section>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Simulado unificado
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Modo Prova TEP
          </h1>
        </div>

        <div className="bg-white rounded-lg px-5 py-3 shadow-sm border text-slate-700">
          Questão {current + 1}/{deck.length}
        </div>
      </div>

      {offlineNotice && (
        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {offlineNotice}
        </p>
      )}

      <section className="bg-white rounded-lg shadow-sm border p-5 mt-8 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-blue-50 text-blue-700 px-3 py-1 text-sm font-semibold">
            {question.tema}
          </span>
          <span className="rounded-lg bg-slate-100 text-slate-700 px-3 py-1 text-sm font-semibold">
            {question.origem}
          </span>
        </div>

        <h2 className="break-words text-2xl font-bold text-slate-900 mt-5 sm:text-3xl">
          {question.title}
        </h2>

        <p className="text-slate-800 whitespace-pre-line leading-relaxed mt-6">
          {question.enunciado}
        </p>

        <div className="grid gap-3 mt-8">
          {choices.map((choice) => {
            const isAnswer = question.resposta === choice
            const isSelected = selectedChoice === choice

            return (
              <button
                key={choice}
                onClick={() => choose(choice)}
                className={`break-words rounded-lg border px-4 py-4 text-left transition ${
                  answered && isAnswer
                    ? 'border-green-600 bg-green-50 text-green-900'
                    : ''
                } ${
                  answered && isSelected && !isAnswer
                    ? 'border-red-600 bg-red-50 text-red-900'
                    : ''
                } ${
                  !answered
                    ? 'border-slate-200 hover:border-blue-500 hover:bg-blue-50'
                    : ''
                }`}
              >
                <span className="font-bold">{choice})</span>{' '}
                {question.alternativas[choice]}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="mt-8 bg-slate-50 rounded-lg p-5 border">
            <h3
              className={`text-xl font-bold ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {isCorrect ? 'Resposta correta' : 'Resposta incorreta'}
            </h3>

            <p className="text-slate-800 mt-3 leading-relaxed">
              Gabarito: {question.resposta}){' '}
              {question.alternativas[question.resposta]}
            </p>

            <p className="text-slate-700 whitespace-pre-line leading-relaxed mt-4">
              {question.explicacao}
            </p>

            {question.dica && (
              <p className="text-blue-800 mt-4 font-medium">
                Dica TEP: {question.dica}
              </p>
            )}

            {question.referencia && (
              <p className="text-slate-500 mt-4 text-sm">
                Referência: {question.referencia}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col justify-between gap-4 mt-10 sm:flex-row sm:items-center">
          <p className="text-slate-600">
            Pontuação atual: {score}/{answered ? current + 1 : current}
          </p>

          <button
            onClick={nextQuestion}
            disabled={!answered}
            className="bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {current + 1 >= deck.length ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </section>
    </div>
  )
}

function buildDeck(bankQuestions: Question[]) {
  const parsedBank = bankQuestions
    .map(parseBankQuestion)
    .filter((question): question is ProvaQuestion => Boolean(question))

  return shuffle([
    ...parsedBank,
    ...provaTituloPediatriaQuestions,
  ]).slice(0, provaSize)
}

function parseBankQuestion(question: Question): ProvaQuestion | null {
  if (!question.simulado?.trim()) return null

  const normalizedSimulado = normalizeInlineAlternatives(question.simulado)
  const lines = normalizedSimulado
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const firstAlternativeIndex = lines.findIndex((line) =>
    /^[A-D]\)/.test(line)
  )

  const answer = normalizedSimulado.match(/Resposta correta:\s*([A-D])/i)?.[1] as
    | Choice
    | undefined

  if (firstAlternativeIndex < 0 || !answer) return null

  const alternativas = {} as Record<Choice, string>

  for (const line of lines) {
    const match = line.match(/^([A-D])\)\s*(.+)$/)

    if (match) {
      alternativas[match[1] as Choice] = match[2]
    }
  }

  if (choices.some((choice) => !alternativas[choice])) return null

  const explanation =
    normalizedSimulado.match(/Explica(?:ç|c)[ãa]o:\s*([\s\S]*)/i)?.[1] ||
    question.dica_tep ||
    'Revise o protocolo relacionado para consolidar a justificativa.'

  return {
    id: `bank-${question.id}`,
    title: question.title || 'Questão do banco',
    tema: question.tema || 'Geral',
    enunciado: lines.slice(0, firstAlternativeIndex).join('\n'),
    alternativas,
    resposta: answer,
    explicacao: explanation.trim(),
    dica: question.dica_tep,
    origem: 'Banco TEP PRO',
  }
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

function normalizeInlineAlternatives(value: string) {
  return value
    .replace(/\s+(A\))/g, '\n$1')
    .replace(/\s+(B\))/g, '\n$1')
    .replace(/\s+(C\))/g, '\n$1')
    .replace(/\s+(D\))/g, '\n$1')
    .replace(/\s+(Resposta correta:)/i, '\n$1')
    .replace(/\s+(Explica(?:ç|c)[ãa]o:)/i, '\n$1')
}
