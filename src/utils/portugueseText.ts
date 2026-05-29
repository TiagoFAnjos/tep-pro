const urlPattern = /https?:\/\/\S+/g

const phraseCorrections: Array<[RegExp, string]> = [
  [/\bQual e\b/g, 'Qual é'],
  [/\bqual e\b/g, 'qual é'],
  [/\bNao e\b/g, 'Não é'],
  [/\bnao e\b/g, 'não é'],
  [/\bNao ha\b/g, 'Não há'],
  [/\bnao ha\b/g, 'não há'],
  [/\bha risco\b/g, 'há risco'],
  [/\bHa risco\b/g, 'Há risco'],
  [/\bprova cobra o que nao fazer\b/g, 'prova cobra o que não fazer'],
  [/\bnao deve ser\b/g, 'não deve ser'],
  [/\bnao substitui\b/g, 'não substitui'],
  [/\bnao exclui\b/g, 'não exclui'],
  [/\bnao confirma\b/g, 'não confirma'],
  [/\bnao precisam\b/g, 'não precisam'],
  [/\bnao precisa\b/g, 'não precisa'],
  [/\bnao sao\b/g, 'não são'],
  [/\bnao e rotina\b/g, 'não é rotina'],
  [/\bnao e automaticamente\b/g, 'não é automaticamente'],
  [/\bnao e para\b/g, 'não é para'],
  [/\bnao ha sinais\b/g, 'não há sinais'],
]

const wordCorrections: Record<string, string> = {
  acido: 'ácido',
  acidos: 'ácidos',
  acidoses: 'acidoses',
  acustica: 'acústica',
  adrenalina: 'adrenalina',
  aerea: 'aérea',
  aereas: 'aéreas',
  aereos: 'aéreos',
  alimentacao: 'alimentação',
  alem: 'além',
  alergica: 'alérgica',
  alergico: 'alérgico',
  ambulatorio: 'ambulatório',
  analgesico: 'analgésico',
  antibiotico: 'antibiótico',
  antibioticos: 'antibióticos',
  antitermico: 'antitérmico',
  antitermicos: 'antitérmicos',
  apneico: 'apneico',
  apos: 'após',
  atencao: 'atenção',
  ate: 'até',
  ausculta: 'ausculta',
  avaliacao: 'avaliação',
  avaliacoes: 'avaliações',
  bacteriana: 'bacteriana',
  bilirrubinica: 'bilirrubínica',
  calcio: 'cálcio',
  cardíaco: 'cardíaco',
  cardiaca: 'cardíaca',
  cardiaco: 'cardíaco',
  cesarea: 'cesárea',
  classica: 'clássica',
  classico: 'clássico',
  clinica: 'clínica',
  clinicas: 'clínicas',
  clinico: 'clínico',
  clinicos: 'clínicos',
  complicacao: 'complicação',
  complicacoes: 'complicações',
  condicao: 'condição',
  condicoes: 'condições',
  congenita: 'congênita',
  consciencia: 'consciência',
  contraindicacao: 'contraindicação',
  correcoes: 'correções',
  correcao: 'correção',
  crianca: 'criança',
  criancas: 'crianças',
  decisao: 'decisão',
  deficiencia: 'deficiência',
  definicao: 'definição',
  desidratacao: 'desidratação',
  dificeis: 'difíceis',
  dificil: 'difícil',
  diagnostica: 'diagnóstica',
  diagnosticas: 'diagnósticas',
  diagnostico: 'diagnóstico',
  diagnosticos: 'diagnósticos',
  diarreia: 'diarreia',
  disfuncao: 'disfunção',
  disponivel: 'disponível',
  doenca: 'doença',
  doencas: 'doenças',
  duracao: 'duração',
  eletronico: 'eletrônico',
  emergencia: 'emergência',
  emergencias: 'emergências',
  empirica: 'empírica',
  empirico: 'empírico',
  encefalopatia: 'encefalopatia',
  episodica: 'episódica',
  episodio: 'episódio',
  episodios: 'episódios',
  especifica: 'específica',
  especificas: 'específicas',
  especifico: 'específico',
  especificos: 'específicos',
  estavel: 'estável',
  evolucao: 'evolução',
  excecao: 'exceção',
  excecoes: 'exceções',
  expansao: 'expansão',
  explicacao: 'explicação',
  familia: 'família',
  familias: 'famílias',
  farmaco: 'fármaco',
  fisiologica: 'fisiológica',
  fisiologico: 'fisiológico',
  funcao: 'função',
  gestacao: 'gestação',
  glicemico: 'glicêmico',
  habito: 'hábito',
  ha: 'há',
  hemodinamica: 'hemodinâmica',
  historia: 'história',
  hidratacao: 'hidratação',
  hidrica: 'hídrica',
  hipoxemica: 'hipoxêmica',
  hipoxico: 'hipóxico',
  hipotensao: 'hipotensão',
  hipotermia: 'hipotermia',
  hipotese: 'hipótese',
  indicacao: 'indicação',
  indicacoes: 'indicações',
  infeccao: 'infecção',
  infeccoes: 'infecções',
  inicio: 'início',
  instavel: 'instável',
  insuficiencia: 'insuficiência',
  intervencao: 'intervenção',
  intervencoes: 'intervenções',
  investigacao: 'investigação',
  ja: 'já',
  liquido: 'líquido',
  liquidos: 'líquidos',
  ma: 'má',
  mae: 'mãe',
  mecanica: 'mecânica',
  medicacao: 'medicação',
  medicacoes: 'medicações',
  medico: 'médico',
  meningea: 'meníngea',
  metabolica: 'metabólica',
  metabolico: 'metabólico',
  minima: 'mínima',
  minimo: 'mínimo',
  monitorizacao: 'monitorização',
  neurologica: 'neurológica',
  neurologico: 'neurológico',
  numero: 'número',
  obstrucao: 'obstrução',
  observacao: 'observação',
  oxigenio: 'oxigênio',
  padrao: 'padrão',
  pediatrica: 'pediátrica',
  pediatricas: 'pediátricas',
  pediatrico: 'pediátrico',
  pediatricos: 'pediátricos',
  perfusao: 'perfusão',
  persistencia: 'persistência',
  possivel: 'possível',
  potassio: 'potássio',
  pressao: 'pressão',
  proxima: 'próxima',
  proximo: 'próximo',
  pulmao: 'pulmão',
  punção: 'punção',
  rapida: 'rápida',
  rapido: 'rápido',
  reanimacao: 'reanimação',
  reavaliacao: 'reavaliação',
  recuperacao: 'recuperação',
  recorrencia: 'recorrência',
  restricao: 'restrição',
  saturacao: 'saturação',
  secundaria: 'secundária',
  secundario: 'secundário',
  sequencia: 'sequência',
  sindrome: 'síndrome',
  sistemica: 'sistêmica',
  sodio: 'sódio',
  termica: 'térmica',
  termico: 'térmico',
  terapeutica: 'terapêutica',
  terapeutico: 'terapêutico',
  toracica: 'torácica',
  torax: 'tórax',
  transitoria: 'transitória',
  unica: 'única',
  unico: 'único',
  ultima: 'última',
  vacinacao: 'vacinação',
  vigilancia: 'vigilância',
  vomito: 'vômito',
  vomitos: 'vômitos',
}

const wordEntries = Object.entries(wordCorrections).sort(
  ([left], [right]) => right.length - left.length
)

export function restorePortugueseAccents(value: string) {
  const urls: string[] = []
  const protectedText = value.replace(urlPattern, (url) => {
    urls.push(url)
    return `__URL_${urls.length - 1}__`
  })

  let normalized = protectedText

  for (const [pattern, replacement] of phraseCorrections) {
    normalized = normalized.replace(pattern, replacement)
  }

  for (const [source, replacement] of wordEntries) {
    normalized = normalized.replace(
      new RegExp(`(^|[^\\p{L}\\p{N}_])(${source})(?=$|[^\\p{L}\\p{N}_])`, 'giu'),
      (_, prefix: string, word: string) => {
        if (word === word.toUpperCase()) {
          return `${prefix}${replacement.toUpperCase()}`
        }

        if (word[0] === word[0].toUpperCase()) {
          return `${prefix}${replacement[0].toUpperCase()}${replacement.slice(1)}`
        }

        return `${prefix}${replacement}`
      }
    )
  }

  return normalized.replace(/__URL_(\d+)__/g, (_, index: string) => urls[Number(index)] || '')
}

export function normalizeQuestionRecord<T extends Record<string, unknown>>(record: T): T {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      typeof value === 'string' ? restorePortugueseAccents(value) : value,
    ])
  ) as T
}
