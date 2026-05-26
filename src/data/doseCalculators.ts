export type DoseRule = {
  medication: string
  dosePerKg: number
  unit: 'mg' | 'mcg' | 'UI' | 'mL'
  interval: string
  route: string
  maxDose?: number
  minDose?: number
  observation?: string
}

export type DoseCalculatorGroup = {
  title: string
  aliases: string[]
  rules: DoseRule[]
}

export const doseCalculatorGroups: DoseCalculatorGroup[] = [
  {
    title: 'Pneumonia adquirida na comunidade',
    aliases: ['pneumonia adquirida na comunidade', 'pneumonia'],
    rules: [
      {
        medication: 'Amoxicilina',
        dosePerKg: 50,
        unit: 'mg',
        interval: 'por dia, dividir a cada 8 ou 12 horas conforme protocolo local',
        route: 'VO',
        maxDose: 3000,
        observation: 'Dose diária total usual para PAC ambulatorial.',
      },
      {
        medication: 'Amoxicilina em dose alta',
        dosePerKg: 80,
        unit: 'mg',
        interval: 'por dia, dividir a cada 8 ou 12 horas',
        route: 'VO',
        maxDose: 4000,
        observation: 'Considerar em maior risco de pneumococo resistente ou doença mais intensa.',
      },
      {
        medication: 'Ceftriaxona',
        dosePerKg: 50,
        unit: 'mg',
        interval: 'a cada 24 horas',
        route: 'IV/IM',
        maxDose: 2000,
      },
    ],
  },
  {
    title: 'Meningite bacteriana',
    aliases: ['meningite bacteriana', 'meningite'],
    rules: [
      {
        medication: 'Ceftriaxona',
        dosePerKg: 100,
        unit: 'mg',
        interval: 'por dia, dividir a cada 12 horas',
        route: 'IV',
        maxDose: 4000,
      },
      {
        medication: 'Cefotaxima',
        dosePerKg: 200,
        unit: 'mg',
        interval: 'por dia, dividir a cada 6 horas',
        route: 'IV',
        maxDose: 12000,
      },
      {
        medication: 'Dexametasona',
        dosePerKg: 0.15,
        unit: 'mg',
        interval: 'a cada 6 horas',
        route: 'IV',
        maxDose: 10,
        observation: 'Quando indicada, idealmente antes ou junto da primeira dose do antibiótico.',
      },
    ],
  },
  {
    title: 'Asma grave e laringite',
    aliases: ['asma grave', 'laringite viral', 'broncoespasmo'],
    rules: [
      {
        medication: 'Prednisolona',
        dosePerKg: 1,
        unit: 'mg',
        interval: 'por dia',
        route: 'VO',
        maxDose: 60,
      },
      {
        medication: 'Dexametasona',
        dosePerKg: 0.6,
        unit: 'mg',
        interval: 'dose única',
        route: 'VO/IM/IV',
        maxDose: 16,
        observation: 'Útil em laringite; em asma, ajustar ao protocolo local.',
      },
      {
        medication: 'Sulfato de magnésio',
        dosePerKg: 50,
        unit: 'mg',
        interval: 'dose única em 20 minutos',
        route: 'IV',
        maxDose: 2000,
        observation: 'Asma grave/refratária em ambiente monitorizado.',
      },
    ],
  },
  {
    title: 'Anafilaxia e choque',
    aliases: ['anafilaxia', 'choque séptico', 'choque septico'],
    rules: [
      {
        medication: 'Adrenalina 1 mg/mL',
        dosePerKg: 0.01,
        unit: 'mg',
        interval: 'dose IM, repetir a cada 5-15 min se necessário',
        route: 'IM',
        maxDose: 0.5,
        observation: 'Primeira linha na anafilaxia.',
      },
      {
        medication: 'Cristaloide isotônico',
        dosePerKg: 10,
        unit: 'mL',
        interval: 'bolus, reavaliar perfusão e sobrecarga',
        route: 'IV/IO',
        maxDose: 1000,
        observation: 'Choque: titular 10-20 mL/kg conforme contexto e resposta.',
      },
    ],
  },
  {
    title: 'Cetoacidose diabética',
    aliases: ['cetoacidose diabética', 'cetoacidose diabetica', 'cad'],
    rules: [
      {
        medication: 'Insulina regular',
        dosePerKg: 0.05,
        unit: 'UI',
        interval: 'por hora em bomba de infusão',
        route: 'IV',
        observation: 'Usar 0,05-0,1 UI/kg/h conforme gravidade e protocolo local.',
      },
      {
        medication: 'Cristaloide inicial',
        dosePerKg: 10,
        unit: 'mL',
        interval: 'em 30-60 minutos, reavaliar',
        route: 'IV',
        maxDose: 1000,
        observation: 'Evitar correção rápida; monitorar sódio corrigido e estado neurológico.',
      },
    ],
  },
  {
    title: 'Convulsão e estado de mal epiléptico',
    aliases: ['convulsão febril', 'estado de mal epiléptico', 'estado de mal epileptico'],
    rules: [
      {
        medication: 'Midazolam',
        dosePerKg: 0.2,
        unit: 'mg',
        interval: 'dose intranasal/bucal',
        route: 'IN/bucal',
        maxDose: 10,
      },
      {
        medication: 'Diazepam',
        dosePerKg: 0.2,
        unit: 'mg',
        interval: 'dose IV lenta',
        route: 'IV',
        maxDose: 10,
      },
      {
        medication: 'Levetiracetam',
        dosePerKg: 40,
        unit: 'mg',
        interval: 'dose de ataque',
        route: 'IV/VO',
        maxDose: 3000,
      },
    ],
  },
  {
    title: 'Desidratação grave',
    aliases: ['desidratação grave', 'desidratacao grave'],
    rules: [
      {
        medication: 'Soro fisiológico 0,9% ou Ringer lactato',
        dosePerKg: 20,
        unit: 'mL',
        interval: 'bolus inicial, reavaliar',
        route: 'IV/IO',
        maxDose: 1000,
      },
      {
        medication: 'Ondansetrona',
        dosePerKg: 0.15,
        unit: 'mg',
        interval: 'dose única',
        route: 'VO/IV',
        maxDose: 8,
        observation: 'Quando vômitos impedem terapia de reidratação oral.',
      },
    ],
  },
  {
    title: 'ITU e pielonefrite',
    aliases: ['infecção do trato urinário', 'infeccao do trato urinario', 'itu'],
    rules: [
      {
        medication: 'Cefalexina',
        dosePerKg: 50,
        unit: 'mg',
        interval: 'por dia, dividir a cada 6 horas',
        route: 'VO',
        maxDose: 4000,
      },
      {
        medication: 'Ceftriaxona',
        dosePerKg: 50,
        unit: 'mg',
        interval: 'a cada 24 horas',
        route: 'IV/IM',
        maxDose: 2000,
      },
    ],
  },
  {
    title: 'Anemia ferropriva',
    aliases: ['anemia ferropriva'],
    rules: [
      {
        medication: 'Ferro elementar terapêutico',
        dosePerKg: 3,
        unit: 'mg',
        interval: 'por dia',
        route: 'VO',
        maxDose: 200,
        observation: 'Faixa usual 3-6 mg/kg/dia; ajustar conforme gravidade e tolerância.',
      },
    ],
  },
  {
    title: 'Tuberculose pediátrica',
    aliases: ['tuberculose', 'tb pediátrica', 'tb pediatrica'],
    rules: [
      {
        medication: 'Rifampicina',
        dosePerKg: 15,
        unit: 'mg',
        interval: 'por dia',
        route: 'VO',
        maxDose: 600,
      },
      {
        medication: 'Isoniazida',
        dosePerKg: 10,
        unit: 'mg',
        interval: 'por dia',
        route: 'VO',
        maxDose: 300,
      },
      {
        medication: 'Pirazinamida',
        dosePerKg: 35,
        unit: 'mg',
        interval: 'por dia',
        route: 'VO',
        maxDose: 2000,
      },
      {
        medication: 'Etambutol',
        dosePerKg: 20,
        unit: 'mg',
        interval: 'por dia',
        route: 'VO',
        maxDose: 1200,
      },
    ],
  },
  {
    title: 'Reanimação neonatal',
    aliases: ['reanimação neonatal', 'reanimação do recém-nascido', 'prematuro menor a 34 semanas'],
    rules: [
      {
        medication: 'Adrenalina neonatal 0,1 mg/mL',
        dosePerKg: 0.01,
        unit: 'mg',
        interval: 'dose IV/IO, repetir conforme protocolo',
        route: 'IV/IO',
        observation: 'Faixa IV/IO usual 0,01-0,03 mg/kg por dose.',
      },
      {
        medication: 'Soro fisiológico 0,9%',
        dosePerKg: 10,
        unit: 'mL',
        interval: 'expansão volêmica quando indicada',
        route: 'IV/IO',
        observation: 'Usar se suspeita de hipovolemia/perda sanguínea.',
      },
    ],
  },
]

export function getDoseCalculatorGroups(title?: string, tema?: string) {
  const haystack = normalize(`${title || ''} ${tema || ''}`)

  return doseCalculatorGroups.filter((group) =>
    group.aliases.some((alias) => haystack.includes(normalize(alias)))
  )
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
