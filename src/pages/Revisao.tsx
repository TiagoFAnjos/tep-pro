import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Question } from '../types/question'

export default function Revisao() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selected, setSelected] = useState<Question | null>(null)

  async function fetchRevisoes() {
    const hoje = new Date().toISOString()

    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .or(`proxima_revisao.is.null,proxima_revisao.lte.${hoje}`)
      .order('nivel_dominio', { ascending: true })
      .limit(30)

    if (error) {
      console.log(error)
      alert('Erro ao carregar revisões')
      return
    }

    setQuestions((data || []) as Question[])
  }

  async function responder(q: Question, acertou: boolean) {
    const acertos = acertou ? (q.acertos || 0) + 1 : q.acertos || 0
    const erros = acertou ? q.erros || 0 : (q.erros || 0) + 1

    const nivelAtual = q.nivel_dominio || 0
    const novoNivel = acertou
      ? Math.min(nivelAtual + 1, 5)
      : Math.max(nivelAtual - 1, 0)

    const dias = acertou
      ? [1, 3, 7, 15, 30, 60][novoNivel]
      : 1

    const proxima = new Date()
    proxima.setDate(proxima.getDate() + dias)

    const { error } = await supabase
      .from('questions')
      .update({
        acertos,
        erros,
        nivel_dominio: novoNivel,
        ultima_revisao: new Date().toISOString(),
        proxima_revisao: proxima.toISOString(),
      })
      .eq('id', q.id)

    if (error) {
      console.log(error)
      alert('Erro ao salvar revisão')
      return
    }

    setSelected(null)
    fetchRevisoes()
  }

  useEffect(() => {
    void Promise.resolve().then(fetchRevisoes)
  }, [])

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
            Tema: {selected.tema} | Domínio: {selected.nivel_dominio || 0}/5
          </p>

          <Section title="📚 Definição" content={selected.definicao} />
          <Section title="💊 Conduta" content={selected.conduta} />
          <Section title="🎯 Pegadinhas TEP" content={selected.pegadinhas} />
          <Section title="✅ Checklist" content={selected.checklist} />
          <Section title="🧠 Flashcards" content={selected.flashcards} />
          <Section title="🧪 Simulado" content={selected.simulado} />

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => responder(selected, false)}
              className="bg-red-600 text-white px-6 py-3 rounded-xl"
            >
              ❌ Errei
            </button>

            <button
              onClick={() => responder(selected, true)}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              ✅ Acertei
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-700">
        🔁 Revisão Adaptativa
      </h1>

      <p className="mt-2 text-gray-700">
        Temas vencidos ou ainda não revisados
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card title="Revisões hoje" value={questions.length} />
        <Card
          title="Baixo domínio"
          value={questions.filter((q) => (q.nivel_dominio || 0) <= 2).length}
        />
        <Card
          title="Favoritos"
          value={questions.filter((q) => q.favorito === true).length}
        />
      </div>

      <div className="grid gap-4 mt-10">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => setSelected(q)}
            className="bg-white rounded-2xl shadow p-6 text-left hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-bold">
              {q.title}
            </h2>

            <p className="text-gray-600 mt-2">
              Tema: {q.tema}
            </p>

            <p className="text-gray-600">
              Domínio: {q.nivel_dominio || 0}/5
            </p>

            <p className="mt-3 text-blue-600 font-semibold">
              Revisar →
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
  content?: string
}) {
  if (!content) return null

  return (
    <div className="mt-6 bg-gray-50 rounded-xl p-5 border">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
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
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-4xl font-bold text-blue-700 mt-3">
        {value}
      </h2>
    </div>
  )
}
