import type { Question } from '../types/question'

export type TepContentSection = {
  id: string
  title: string
  subtitle: string
  tone: 'neutral' | 'danger' | 'warning' | 'blue' | 'green'
  blocks: Array<{
    label: string
    content?: string
    highlight?: boolean
  }>
}

export type TepFlashcard = {
  pergunta: string
  resposta: string
}

export type TepQuestion = {
  enunciado: string
  alternativas: string[]
  resposta?: string
  explicacao?: string
}

export type TepContentUpgrade = {
  quickReview: Array<{
    label: string
    value?: string
    tone: 'neutral' | 'danger' | 'warning' | 'blue' | 'green'
  }>
  sections: TepContentSection[]
  flashcards: TepFlashcard[]
  questions: TepQuestion[]
}

export function buildTepContentUpgrade(protocol: Question): TepContentUpgrade {
  const redFlags = firstText(
    protocol.red_flags,
    protocol.sinais_gravidade,
    protocol.criterios_uti
  )

  const sections: TepContentSection[] = [
    {
      id: 'visao-geral',
      title: 'Visão geral',
      subtitle: 'Definição, relevância para prova e contexto de uso.',
      tone: 'blue',
      blocks: [
        {
          label: 'Descrição clínica ampliada',
          content: firstText(protocol.descricao_clinica_ampliada, protocol.definicao, protocol.resumo),
        },
        {
          label: 'Importância para o TEP',
          content: firstText(protocol.dica_tep, protocol.pegadinhas, protocol.palavras_chave_clinicas),
          highlight: true,
        },
        {
          label: 'Contexto prático',
          content: summarizeContext(protocol),
        },
      ],
    },
    {
      id: 'quadro-clinico',
      title: 'Quadro clínico',
      subtitle: 'Sinais, sintomas, variações por idade e pistas de gravidade.',
      tone: 'neutral',
      blocks: [
        {
          label: 'Sintomas e sinais típicos',
          content: firstText(protocol.quadro_clinico_estruturado, protocol.sinais_sintomas),
        },
        {
          label: 'Fatores de risco',
          content: protocol.fatores_risco,
        },
        {
          label: 'Red flags',
          content: redFlags,
          highlight: true,
        },
      ],
    },
    {
      id: 'diagnostico',
      title: 'Diagnóstico',
      subtitle: 'Critérios, exames indicados, diferenciais e armadilhas.',
      tone: 'green',
      blocks: [
        {
          label: 'Critérios e exames',
          content: firstText(protocol.diagnostico_estruturado, protocol.diagnostico),
        },
        {
          label: 'Diferenciais cobrados',
          content: protocol.diagnosticos_diferenciais,
        },
        {
          label: 'Quando a banca tenta confundir',
          content: firstText(protocol.pegadinhas, protocol.erros_comuns),
          highlight: true,
        },
      ],
    },
    {
      id: 'tratamento',
      title: 'Tratamento',
      subtitle: 'Conduta inicial, dose quando houver, internação e UTI.',
      tone: 'warning',
      blocks: [
        {
          label: 'Conduta inicial',
          content: firstText(protocol.tratamento_estruturado, protocol.conduta, protocol.tratamento),
        },
        {
          label: 'Medicações e doses',
          content: protocol.medicacoes_doses,
          highlight: true,
        },
        {
          label: 'Critérios de internação',
          content: protocol.criterios_internacao,
        },
        {
          label: 'Critérios de UTI',
          content: protocol.criterios_uti,
          highlight: true,
        },
      ],
    },
    {
      id: 'emergencia',
      title: 'Conduta prática',
      subtitle: 'Pronto atendimento, ambulatório, seguimento e sinais de retorno.',
      tone: 'danger',
      blocks: [
        {
          label: 'Pronto atendimento / emergência',
          content: firstText(protocol.conduta_pratica, protocol.conduta_emergencia),
          highlight: true,
        },
        {
          label: 'Ambulatório e seguimento',
          content: firstText(protocol.mini_aula, protocol.resumo),
        },
        {
          label: 'Erros comuns',
          content: protocol.erros_comuns,
        },
      ],
    },
    {
      id: 'tep',
      title: 'Raciocínio TEP',
      subtitle: 'Palavras-chave, pegadinhas e resposta mais provável.',
      tone: 'blue',
      blocks: [
        {
          label: 'Como pensar na prova',
          content: firstText(protocol.raciocinio_tep, protocol.dica_tep, protocol.pegadinhas),
          highlight: true,
        },
        {
          label: 'Palavras-chave do enunciado',
          content: protocol.palavras_chave_clinicas,
        },
        {
          label: 'Fluxograma mental',
          content: firstText(protocol.algoritmo, protocol.fluxograma),
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Checklist final',
      subtitle: 'Diagnóstico, gravidade, exames, tratamento e orientação.',
      tone: 'green',
      blocks: [
        {
          label: 'Checklist do tema',
          content: protocol.checklist,
          highlight: true,
        },
        {
          label: 'Tabela / score de apoio',
          content: firstText(protocol.tabela_resumo, protocol.score_clinico),
        },
      ],
    },
  ]

  return {
    quickReview: [
      {
        label: 'Risco',
        value: protocol.nivel_risco || 'Não definido',
        tone: protocol.nivel_risco === 'Alto' ? 'danger' : protocol.nivel_risco === 'Moderado/Alto' ? 'warning' : 'neutral',
      },
      {
        label: 'Emergência',
        value: shortText(protocol.conduta_emergencia),
        tone: 'danger',
      },
      {
        label: 'Pegadinha TEP',
        value: shortText(firstText(protocol.pegadinhas, protocol.dica_tep)),
        tone: 'blue',
      },
      {
        label: 'Doses',
        value: protocol.medicacoes_doses ? 'Há esquema/dose cadastrada' : 'Sem dose estruturada',
        tone: protocol.medicacoes_doses ? 'warning' : 'neutral',
      },
    ],
    sections,
    flashcards: parseFlashcards(protocol.flashcards),
    questions: parseQuestions(firstText(protocol.questoes_tep, protocol.simulado)),
  }
}

function summarizeContext(protocol: Question) {
  const parts = [
    protocol.conduta_emergencia ? 'PA/emergência: há conduta inicial cadastrada.' : '',
    protocol.criterios_internacao ? 'Internação: há critérios definidos.' : '',
    protocol.criterios_uti ? 'UTI: há critérios de escalonamento.' : '',
    protocol.mini_aula ? 'Estudo aprofundado: mini-aula disponível.' : '',
  ].filter(Boolean)

  return parts.length
    ? parts.join(' ')
    : 'Tema disponível para revisão; ampliar contexto ambulatorial, pronto atendimento e seguimento nas próximas rodadas de conteúdo.'
}

function firstText(...values: Array<string | undefined>) {
  return values.find((value) => value?.trim())?.trim()
}

function shortText(value?: string) {
  if (!value?.trim()) return undefined

  const compact = value.replace(/\s+/g, ' ').trim()
  return compact.length > 170 ? `${compact.slice(0, 167)}...` : compact
}

function parseFlashcards(text?: string): TepFlashcard[] {
  if (!text?.trim()) return []

  const cards: TepFlashcard[] = []

  for (const rawPart of text.split('|')) {
    const part = rawPart.trim()
    if (!part) continue

    const separatorIndex = part.indexOf('::')

    if (separatorIndex >= 0) {
      cards.push({
        pergunta: part.slice(0, separatorIndex).trim(),
        resposta: part.slice(separatorIndex + 2).trim(),
      })
      continue
    }

    const previous = cards.at(-1)

    if (previous) {
      previous.resposta = `${previous.resposta} | ${part}`.trim()
    }
  }

  return cards.filter((card) => card.pergunta && card.resposta)
}

function parseQuestions(text?: string): TepQuestion[] {
  if (!text?.trim()) return []

  const chunks = text
    .split(/\n{2,}|\|\s*(?=Caso|Questão|Enunciado|[A-D]\))/i)
    .map((chunk) => chunk.trim())
    .filter(Boolean)

  const source = chunks.length > 1 ? chunks : [text]

  return source
    .map(parseQuestionChunk)
    .filter((question): question is TepQuestion => Boolean(question))
}

function parseQuestionChunk(chunk: string): TepQuestion | null {
  const normalized = chunk
    .replace(/\s+(A\))/g, '\nA)')
    .replace(/\s+(B\))/g, '\nB)')
    .replace(/\s+(C\))/g, '\nC)')
    .replace(/\s+(D\))/g, '\nD)')
    .replace(/\s+(Resposta correta:)/i, '\nResposta correta:')
    .replace(/\s+(Explica(?:ç|c)[ãa]o:)/i, '\nExplicação:')

  const lines = normalized
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const firstAlternativeIndex = lines.findIndex((line) => /^[A-D]\)/.test(line))
  if (firstAlternativeIndex < 0) return null

  const answerLineIndex = lines.findIndex((line) => /^Resposta correta:/i.test(line))
  const explanationLineIndex = lines.findIndex((line) => /^Explica(?:ç|c)[ãa]o:/i.test(line))

  return {
    enunciado: lines.slice(0, firstAlternativeIndex).join('\n'),
    alternativas: lines
      .slice(firstAlternativeIndex, answerLineIndex > -1 ? answerLineIndex : explanationLineIndex > -1 ? explanationLineIndex : undefined)
      .filter((line) => /^[A-D]\)/.test(line)),
    resposta: answerLineIndex > -1 ? lines[answerLineIndex].replace(/^Resposta correta:\s*/i, '') : undefined,
    explicacao: explanationLineIndex > -1
      ? lines.slice(explanationLineIndex).join('\n').replace(/^Explica(?:ç|c)[ãa]o:\s*/i, '')
      : undefined,
  }
}
