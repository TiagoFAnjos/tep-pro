export type Question = {
  id: string | number
  title?: string
  tema?: string
  dificuldade?: number | string
  definicao?: string
  fisiopatologia?: string
  fatores_risco?: string
  sinais_sintomas?: string
  diagnostico?: string
  conduta?: string
  tratamento?: string
  medicacoes_doses?: string
  diagnosticos_diferenciais?: string
  nivel_risco?: string
  palavras_chave_clinicas?: string
  conduta_emergencia?: string
  sinais_gravidade?: string
  criterios_internacao?: string
  criterios_uti?: string
  erros_comuns?: string
  pegadinhas?: string
  dica_tep?: string
  resumo?: string
  fluxograma?: string
  algoritmo?: string
  tabela_resumo?: string
  score_clinico?: string
  checklist?: string
  mini_aula?: string
  flashcards?: string
  simulado?: string
  favorito?: boolean
  acertos?: number
  erros?: number
  nivel_dominio?: number
  ultima_revisao?: string
  proxima_revisao?: string
}
