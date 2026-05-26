export type Choice = 'A' | 'B' | 'C' | 'D'

export type ProvaQuestion = {
  id: string
  title: string
  tema: string
  enunciado: string
  alternativas: Record<Choice, string>
  resposta: Choice
  explicacao: string
  dica?: string
  referencia?: string
  origem: 'Banco TEP PRO' | 'Prova de Títulos'
}

export const choices: Choice[] = ['A', 'B', 'C', 'D']

export const provaTituloPediatriaQuestions: ProvaQuestion[] = [
  {
    id: 'tep-extra-sdr-neonatal-1',
    title: 'SDR neonatal',
    tema: 'Neonatologia',
    enunciado:
      'Prematuro de 30 semanas, com desconforto respiratório progressivo nas primeiras horas, gemência, retrações e radiografia com baixo volume pulmonar e padrão reticulogranular difuso. A conduta inicial mais adequada é:',
    alternativas: {
      A: 'Antibiótico isolado e observação em ar ambiente',
      B: 'CPAP precoce, suporte térmico/metabólico e surfactante se indicação clínica',
      C: 'Alta com orientação se saturação melhorar transitoriamente',
      D: 'Restrição absoluta de líquidos sem monitorização',
    },
    resposta: 'B',
    explicacao:
      'O quadro é típico de doença da membrana hialina. A prova costuma cobrar estabilização neonatal, CPAP precoce, controle térmico e surfactante quando há falha ou necessidade crescente de oxigênio.',
    dica: 'Prematuro + início precoce + vidro fosco/baixo volume = pensar SDR por deficiência de surfactante.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-sepse-neonatal-1',
    title: 'Sepse neonatal precoce',
    tema: 'Neonatologia',
    enunciado:
      'Recém-nascido com 12 horas de vida apresenta letargia, desconforto respiratório, má perfusão e história materna de febre intraparto. Qual é a melhor abordagem?',
    alternativas: {
      A: 'Aguardar resultado de hemocultura para iniciar antimicrobiano',
      B: 'Coletar culturas quando possível e iniciar antibiótico empírico imediatamente',
      C: 'Prescrever apenas antitérmico e observar em alojamento conjunto',
      D: 'Indicar antibiótico oral e retorno ambulatorial',
    },
    resposta: 'B',
    explicacao:
      'Sepse neonatal é tempo-dependente. Culturas devem ser coletadas se não atrasarem a terapia, mas a instabilidade clínica exige antibiótico empírico e suporte hemodinâmico/respiratório.',
    dica: 'Em sepse neonatal sintomática, não espere laboratório para tratar.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-reanimacao-neonatal-1',
    title: 'Reanimação neonatal',
    tema: 'Neonatologia',
    enunciado:
      'RN a termo nasce hipotônico, em apneia, com frequência cardíaca de 80 bpm após passos iniciais. A próxima conduta é:',
    alternativas: {
      A: 'Massagem cardíaca imediata',
      B: 'Ventilação com pressão positiva efetiva',
      C: 'Adrenalina endotraqueal como primeira medida',
      D: 'Aguardar um minuto para reavaliar espontaneamente',
    },
    resposta: 'B',
    explicacao:
      'Na reanimação neonatal, apneia/gasping ou FC abaixo de 100 bpm após passos iniciais indicam ventilação com pressão positiva. Compressões entram se FC permanece abaixo de 60 bpm após ventilação efetiva.',
    dica: 'Na sala de parto, ventilação efetiva é a intervenção mais importante.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-ictericia-1',
    title: 'Icterícia neonatal',
    tema: 'Neonatologia',
    enunciado:
      'RN com icterícia nas primeiras 24 horas de vida deve ser avaliado principalmente por qual razão?',
    alternativas: {
      A: 'É sempre fisiológica se o RN estiver mamando',
      B: 'Sugere hiperbilirrubinemia patológica, com necessidade de investigação e estratificação de risco',
      C: 'Dispensa dosagem de bilirrubina se não houver febre',
      D: 'Indica suspensão definitiva do aleitamento materno',
    },
    resposta: 'B',
    explicacao:
      'Icterícia antes de 24 horas é sinal de alerta para causas patológicas, como hemólise, infecção ou incompatibilidade sanguínea. Deve ser medida e comparada a curvas/limiares de tratamento.',
    dica: 'Icterícia precoce nunca é simplesmente fisiológica.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-bronquiolite-1',
    title: 'Bronquiolite',
    tema: 'Pneumologia',
    enunciado:
      'Lactente de 3 meses com primeiro episódio de sibilância, coriza, taquipneia leve e boa aceitação oral. Saturação 95% em ar ambiente. Qual conduta é mais adequada?',
    alternativas: {
      A: 'Corticoide sistêmico e salbutamol de horário para todos',
      B: 'Antibiótico empírico por se tratar de lactente',
      C: 'Suporte, higiene nasal, orientação de sinais de alarme e reavaliação',
      D: 'Radiografia de tórax obrigatória antes da alta',
    },
    resposta: 'C',
    explicacao:
      'Bronquiolite típica é manejada com suporte. Broncodilatador, corticoide, antibiótico e radiografia não são rotina em quadros leves sem sinais de gravidade.',
    dica: 'Na bronquiolite, a prova cobra o que não fazer: excesso de medicação e exames.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-pneumonia-1',
    title: 'Pneumonia adquirida na comunidade',
    tema: 'Infectologia',
    enunciado:
      'Pré-escolar com febre, tosse, taquipneia e tiragem subcostal. Não há sibilância predominante. Qual achado mais pesa para classificar gravidade?',
    alternativas: {
      A: 'Tosse isolada há 24 horas',
      B: 'Taquipneia com esforço respiratório e hipoxemia',
      C: 'Rinorreia clara sem febre',
      D: 'Ausculta normal com bom estado geral',
    },
    resposta: 'B',
    explicacao:
      'Taquipneia, esforço respiratório, hipoxemia, toxemia e incapacidade de hidratação orientam gravidade, necessidade de oxigênio, internação e via do antibiótico.',
    dica: 'Em pneumonia pediátrica, gravidade é clínica antes de ser radiológica.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-laringite-1',
    title: 'Laringite viral',
    tema: 'Pneumologia',
    enunciado:
      'Criança de 2 anos com tosse ladrante, rouquidão e estridor em repouso. Qual tratamento é mais apropriado no pronto atendimento?',
    alternativas: {
      A: 'Corticoide e adrenalina nebulizada, com observação após melhora',
      B: 'Antitussígeno e alta imediata',
      C: 'Antibiótico de amplo espectro para todos',
      D: 'Beta-2 agonista como tratamento principal',
    },
    resposta: 'A',
    explicacao:
      'Estridor em repouso sugere laringite moderada/grave. Corticoide é indicado e adrenalina nebulizada melhora obstrução temporariamente, exigindo observação.',
    dica: 'Estridor em repouso muda a conduta.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-meningite-1',
    title: 'Meningite bacteriana',
    tema: 'Infectologia',
    enunciado:
      'Lactente febril, sonolento, com abaulamento de fontanela e má perfusão. A conduta inicial correta é:',
    alternativas: {
      A: 'Aguardar punção lombar obrigatória antes de antibiótico',
      B: 'Estabilizar, coletar exames se possível e iniciar antibiótico empírico sem atraso',
      C: 'Tratar como virose se não houver rigidez de nuca',
      D: 'Alta após antitérmico se houver melhora da febre',
    },
    resposta: 'B',
    explicacao:
      'Meningite bacteriana suspeita é emergência. Em instabilidade, antibiótico não deve ser atrasado por punção lombar ou imagem.',
    dica: 'No lactente, ausência de rigidez de nuca não exclui meningite.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-dengue-1',
    title: 'Dengue',
    tema: 'Infectologia',
    enunciado:
      'Adolescente no 4º dia de febre por dengue apresenta dor abdominal intensa, vômitos persistentes e tontura ao levantar. O melhor enquadramento é:',
    alternativas: {
      A: 'Dengue sem sinais de alarme, alta sem hidratação orientada',
      B: 'Dengue com sinais de alarme, exigindo avaliação, hidratação e monitorização',
      C: 'Quadro incompatível com dengue',
      D: 'Indicação de AAS para prevenção de trombose',
    },
    resposta: 'B',
    explicacao:
      'Dor abdominal intensa, vômitos persistentes e hipotensão postural são sinais de alarme. O risco aumenta na defervescência, quando ocorre extravasamento plasmático.',
    dica: 'Na dengue, piora quando a febre baixa é pegadinha clássica.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-vacinas-1',
    title: 'Vacinação',
    tema: 'Vacinas',
    enunciado:
      'Criança chega à consulta com caderneta atrasada. A conduta mais adequada é:',
    alternativas: {
      A: 'Reiniciar todos os esquemas desde a primeira dose',
      B: 'Atualizar as vacinas conforme idade, intervalo mínimo e calendário vigente',
      C: 'Aguardar a adolescência para recuperar vacinas',
      D: 'Contraindicar vacinação se houve resfriado leve na semana anterior',
    },
    resposta: 'B',
    explicacao:
      'Esquemas atrasados não devem ser reiniciados. Deve-se atualizar conforme calendário, idade, intervalos e contraindicações reais.',
    dica: 'Vacina atrasada continua de onde parou, respeitando regra do imunobiológico.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-kawasaki-1',
    title: 'Doença de Kawasaki',
    tema: 'Cardiologia',
    enunciado:
      'Lactente com febre há 6 dias, conjuntivite não purulenta, lábios fissurados e exantema. PCR elevada. A melhor conduta é:',
    alternativas: {
      A: 'Aguardar descamação para confirmar o diagnóstico',
      B: 'Suspeitar de Kawasaki, internar, solicitar ecocardiograma e iniciar tratamento se critérios forem preenchidos',
      C: 'Prescrever apenas anti-histamínico',
      D: 'Excluir Kawasaki por ausência de linfonodo cervical',
    },
    resposta: 'B',
    explicacao:
      'Kawasaki pode ser incompleto, especialmente em lactentes. O atraso terapêutico aumenta risco de lesão coronariana. A ausência de um critério não exclui o diagnóstico.',
    dica: 'Kawasaki incompleto é uma armadilha em lactentes febris.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-itu-1',
    title: 'Infecção do trato urinário',
    tema: 'Nefrologia',
    enunciado:
      'Lactente febril sem foco aparente tem urina coletada por saco coletor com cultura positiva. Qual interpretação é correta?',
    alternativas: {
      A: 'Confirma ITU e dispensa nova coleta',
      B: 'Saco coletor pode servir para triagem, mas cultura confirmatória exige método adequado',
      C: 'Exclui ITU se não houver disúria',
      D: 'Permite antibiótico oral sem avaliação clínica',
    },
    resposta: 'B',
    explicacao:
      'Cultura de saco coletor tem alto risco de contaminação. Em lactentes, diagnóstico confiável exige coleta adequada, como cateterismo ou punção suprapúbica conforme contexto.',
    dica: 'Saco coletor não confirma cultura positiva.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-nefrotica-1',
    title: 'Síndrome nefrótica',
    tema: 'Nefrologia',
    enunciado:
      'Pré-escolar com edema palpebral progressivo, ascite leve, proteinúria importante e albumina baixa. A complicação que deve ser ativamente pesquisada é:',
    alternativas: {
      A: 'Trombose, infecção e hipovolemia efetiva',
      B: 'Hipercalcemia sintomática como regra',
      C: 'Apendicite obrigatória em todos',
      D: 'Hipoglicemia persistente como principal risco',
    },
    resposta: 'A',
    explicacao:
      'Síndrome nefrótica cursa com edema e perda proteica. Infecção, trombose, hipovolemia e dislipidemia são complicações relevantes.',
    dica: 'Edema importante não significa sempre excesso intravascular.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-gna-1',
    title: 'Glomerulonefrite aguda',
    tema: 'Nefrologia',
    enunciado:
      'Escolar com hematúria cor de coca-cola, edema, hipertensão e antecedente de impetigo. O manejo inicial deve priorizar:',
    alternativas: {
      A: 'Hidratação venosa vigorosa para todos',
      B: 'Controle de pressão, restrição hidrossalina conforme gravidade e avaliação de função renal',
      C: 'Corticoide em dose alta de rotina',
      D: 'Alta sem medir pressão arterial',
    },
    resposta: 'B',
    explicacao:
      'O quadro sugere síndrome nefrítica pós-infecciosa. Hipertensão, sobrecarga hídrica e função renal orientam gravidade e necessidade de internação.',
    dica: 'Na síndrome nefrítica, pressão arterial é dado obrigatório.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-cad-1',
    title: 'Cetoacidose diabética',
    tema: 'Endocrinologia',
    enunciado:
      'Criança com poliúria, perda ponderal, vômitos, respiração de Kussmaul, glicemia elevada e acidose. A conduta inicial correta é:',
    alternativas: {
      A: 'Bicarbonato de rotina antes de hidratação',
      B: 'Expansão inicial cuidadosa, insulinoterapia contínua após início do manejo e reposição de potássio conforme exames',
      C: 'Insulina subcutânea rápida em bolus repetidos',
      D: 'Suspender monitorização neurológica após melhora da glicemia',
    },
    resposta: 'B',
    explicacao:
      'CAD exige hidratação criteriosa, insulina regular contínua e manejo de potássio. Bicarbonato não é rotina e edema cerebral deve ser monitorado.',
    dica: 'Na CAD, corrigir rápido demais pode custar caro.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-estado-mal-1',
    title: 'Estado de mal epiléptico',
    tema: 'Neurologia',
    enunciado:
      'Criança convulsiona há 7 minutos na emergência. Glicemia capilar normal. Qual sequência terapêutica é mais adequada?',
    alternativas: {
      A: 'Aguardar 30 minutos antes de medicar',
      B: 'Benzodiazepínico em dose adequada, suporte ABC e segunda linha se persistência',
      C: 'Antibiótico oral e observação',
      D: 'Tomografia obrigatória antes de qualquer medicação',
    },
    resposta: 'B',
    explicacao:
      'Crise prolongada deve ser tratada rapidamente. O manejo começa com ABC, glicemia e benzodiazepínico; persistência exige anticonvulsivante de segunda linha.',
    dica: 'Estado de mal é tempo-dependente: dose certa, via disponível, sem atrasos.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-anemia-ferropriva-1',
    title: 'Anemia ferropriva',
    tema: 'Hematologia',
    enunciado:
      'Lactente com anemia microcítica, hipocrômica, ferritina baixa e alto consumo de leite de vaca. Qual conduta é mais apropriada?',
    alternativas: {
      A: 'Ferro terapêutico e correção alimentar, com reavaliação de resposta',
      B: 'Transfusão obrigatória se hemoglobina abaixo do normal',
      C: 'Suspender alimentação complementar',
      D: 'Tratar apenas com polivitamínico sem ferro',
    },
    resposta: 'A',
    explicacao:
      'Anemia ferropriva é tratada com ferro em dose terapêutica e intervenção nutricional. Transfusão fica para situações graves/sintomáticas específicas.',
    dica: 'Leite de vaca em excesso é pista frequente em prova.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-falciforme-1',
    title: 'Doença falciforme',
    tema: 'Hematologia',
    enunciado:
      'Criança com doença falciforme apresenta febre de 38,8 °C e bom estado geral. Qual conduta é mais segura?',
    alternativas: {
      A: 'Orientar retorno apenas se febre durar 5 dias',
      B: 'Avaliação imediata, culturas conforme protocolo e antibiótico empírico pela função esplênica comprometida',
      C: 'Apenas antitérmico domiciliar',
      D: 'Evitar vacinação pneumocócica',
    },
    resposta: 'B',
    explicacao:
      'Febre em doença falciforme é emergência pela asplenia funcional e risco de sepse por germes encapsulados. A avaliação e antibiótico não devem ser atrasados.',
    dica: 'Falciforme + febre = risco infeccioso alto até prova em contrário.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-pti-1',
    title: 'Púrpura trombocitopênica imune',
    tema: 'Hematologia',
    enunciado:
      'Criança previamente hígida, após virose, apresenta petéquias, equimoses, plaquetas muito baixas, sem anemia, sem leucopenia e sem sangramento mucoso importante. Conduta provável:',
    alternativas: {
      A: 'Observação e orientação se sangramento leve, com seguimento',
      B: 'Quimioterapia imediata',
      C: 'AAS para reduzir púrpura',
      D: 'Transfusão profilática de plaquetas em todo caso',
    },
    resposta: 'A',
    explicacao:
      'PTI típica em criança, sem sangramento relevante, pode ser observada. Tratamento é reservado a sangramento significativo ou contexto de maior risco.',
    dica: 'Plaqueta baixa assusta, mas sangramento manda na conduta.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-les-1',
    title: 'Lúpus eritematoso sistêmico juvenil',
    tema: 'Reumatologia',
    enunciado:
      'Adolescente com artralgias, fotossensibilidade, úlceras orais, anemia, proteinúria e FAN positivo. O ponto que mais muda prognóstico e urgência de avaliação é:',
    alternativas: {
      A: 'Nefrite lúpica sugerida por proteinúria',
      B: 'Acne associada',
      C: 'Dor muscular isolada pós-exercício',
      D: 'Rinite alérgica',
    },
    resposta: 'A',
    explicacao:
      'Proteinúria em suspeita de LES juvenil sugere acometimento renal e exige avaliação de função renal, urina, complemento, anti-DNA e encaminhamento especializado.',
    dica: 'No LES, sempre procure rim, sangue e sistema nervoso.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-dnpm-1',
    title: 'Desenvolvimento neuropsicomotor',
    tema: 'Desenvolvimento',
    enunciado:
      'Lactente de 10 meses não senta sem apoio e perdeu habilidade de balbuciar. Qual conduta é mais adequada?',
    alternativas: {
      A: 'Aguardar até 2 anos sem investigar',
      B: 'Reconhecer atraso/regressão, avaliar causas e encaminhar para intervenção precoce',
      C: 'Tranquilizar porque cada criança tem seu tempo em qualquer situação',
      D: 'Orientar apenas troca de fórmula',
    },
    resposta: 'B',
    explicacao:
      'Atraso motor importante e regressão são sinais de alerta. Intervenção precoce e investigação etiológica não devem ser adiadas.',
    dica: 'Regressão do desenvolvimento nunca é normal.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-tea-1',
    title: 'Transtorno do espectro autista',
    tema: 'Desenvolvimento',
    enunciado:
      'Criança de 18 meses não aponta para compartilhar interesse, não responde consistentemente ao nome e tem pouco contato visual. A melhor conduta é:',
    alternativas: {
      A: 'Esperar fala aparecer até 4 anos',
      B: 'Rastrear TEA, avaliar audição/desenvolvimento e iniciar encaminhamento/intervenção precoce',
      C: 'Atribuir obrigatoriamente a birra',
      D: 'Evitar orientar a família até diagnóstico fechado por especialista',
    },
    resposta: 'B',
    explicacao:
      'Sinais de alerta socio-comunicativos exigem rastreio, avaliação global e intervenção precoce. Não se deve esperar diagnóstico final para iniciar suporte.',
    dica: 'Apontar compartilhado e resposta ao nome são marcos sociais muito cobrados.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-puberdade-1',
    title: 'Puberdade e Tanner',
    tema: 'Endocrinologia',
    enunciado:
      'Menina de 7 anos apresenta telarca progressiva e aceleração da velocidade de crescimento. Qual hipótese deve ser considerada?',
    alternativas: {
      A: 'Puberdade precoce central ou periférica, exigindo avaliação',
      B: 'Puberdade normal para idade, sem seguimento',
      C: 'Menarca iminente fisiológica em todas as meninas de 7 anos',
      D: 'Hipotireoidismo descartado sem exame',
    },
    resposta: 'A',
    explicacao:
      'Caracteres puberais antes de 8 anos em meninas, especialmente progressivos e com aceleração de crescimento, exigem investigação de puberdade precoce.',
    dica: 'Idade, progressão e velocidade de crescimento definem a preocupação.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-constipacao-1',
    title: 'Constipação funcional',
    tema: 'Gastroenterologia',
    enunciado:
      'Pré-escolar com evacuações dolorosas, retenção fecal, escape fecal e massa fecal palpável, sem sinais sistêmicos. Conduta inicial:',
    alternativas: {
      A: 'Desimpactação quando necessária, manutenção com laxativo osmótico e treinamento comportamental',
      B: 'Colonoscopia obrigatória em todos',
      C: 'Suspender líquidos para reduzir evacuações',
      D: 'Antibiótico por 14 dias',
    },
    resposta: 'A',
    explicacao:
      'Constipação funcional é comum e exige tratar impactação, manter fezes macias e quebrar ciclo dor-retenção. Sinais de alarme mudam investigação.',
    dica: 'Escape fecal pode ser constipação grave, não diarreia simples.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-dermatite-atopica-1',
    title: 'Dermatite atópica',
    tema: 'Dermatologia',
    enunciado:
      'Lactente com eczema crônico pruriginoso em face e superfícies extensoras, sem sinais de infecção. Manejo de base:',
    alternativas: {
      A: 'Hidratação intensa, controle de gatilhos e anti-inflamatório tópico conforme gravidade',
      B: 'Antibiótico sistêmico contínuo',
      C: 'Banhos longos e muito quentes',
      D: 'Suspender todas as vacinas',
    },
    resposta: 'A',
    explicacao:
      'Dermatite atópica exige reparo de barreira cutânea e controle da inflamação. Antibiótico é para infecção secundária, não para uso contínuo sem indicação.',
    dica: 'Hidratante não é detalhe; é tratamento de base.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-aleitamento-1',
    title: 'Aleitamento materno',
    tema: 'Ambulatorial',
    enunciado:
      'Puérpera relata dor mamilar e fissuras. RN ganha peso, mas pega apenas o mamilo. Qual orientação é central?',
    alternativas: {
      A: 'Corrigir pega e posicionamento, mantendo aleitamento sempre que possível',
      B: 'Suspender definitivamente o aleitamento',
      C: 'Introduzir água para poupar a mãe',
      D: 'Mamadeira obrigatória em toda fissura',
    },
    resposta: 'A',
    explicacao:
      'Dor e fissura geralmente decorrem de pega inadequada. Corrigir técnica é a principal intervenção, mantendo suporte à amamentação.',
    dica: 'Fissura mamilar pede observar mamada, não só prescrever pomada.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-obesidade-1',
    title: 'Obesidade pediátrica',
    tema: 'Ambulatorial',
    enunciado:
      'Escolar com IMC acima do percentil 97, acantose nigricans e história familiar de diabetes tipo 2. Conduta adequada:',
    alternativas: {
      A: 'Abordagem familiar, avaliação de comorbidades e plano gradual de alimentação, sono, atividade física e telas',
      B: 'Dieta extremamente restritiva sem acompanhamento',
      C: 'Ignorar porque criança cresce e emagrece sempre',
      D: 'Prescrever estimulante como primeira medida universal',
    },
    resposta: 'A',
    explicacao:
      'Obesidade pediátrica exige abordagem crônica, familiar e rastreio de comorbidades, incluindo resistência insulínica, dislipidemia, hipertensão e esteatose.',
    dica: 'Acantose é pista de resistência insulínica.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-puericultura-1',
    title: 'Puericultura',
    tema: 'Ambulatorial',
    enunciado:
      'Em consulta de rotina de lactente, qual conjunto resume melhor uma puericultura completa?',
    alternativas: {
      A: 'Peso isolado e renovação de receita',
      B: 'Crescimento, desenvolvimento, alimentação, vacinas, exame físico, segurança e vínculo familiar',
      C: 'Apenas ausculta pulmonar se não houver queixa',
      D: 'Solicitação mensal de exames laboratoriais para todos',
    },
    resposta: 'B',
    explicacao:
      'Puericultura é cuidado preventivo longitudinal. A prova valoriza caderneta, curvas, marcos, vacinação, orientação antecipatória e identificação de risco.',
    dica: 'Consulta de rotina não é só pesar: é prevenção organizada por idade.',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-anafilaxia-1',
    title: 'Anafilaxia',
    tema: 'Emergência',
    enunciado:
      'Criança apresenta urticária difusa, edema labial, tosse, rouquidão e hipotensão minutos após ingestão alimentar. A medicação prioritária é:',
    alternativas: {
      A: 'Anti-histamínico oral e observação domiciliar',
      B: 'Corticoide inalatório como primeira linha',
      C: 'Adrenalina intramuscular imediata',
      D: 'Antibiótico parenteral',
    },
    resposta: 'C',
    explicacao:
      'Anafilaxia é emergência tempo-dependente. Adrenalina intramuscular é primeira linha; anti-histamínico e corticoide não substituem adrenalina.',
    dica: 'Anafilaxia com via aérea ou circulação comprometida: adrenalina sem atraso.',
    referencia: 'SBP/ASBAI - anafilaxia',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-pac-fr-1',
    title: 'Pneumonia adquirida na comunidade',
    tema: 'Pneumologia',
    enunciado:
      'Lactente de 7 meses com febre, tosse e frequência respiratória de 56 irpm, sem sibilância predominante. Pela faixa etária, esse achado sugere:',
    alternativas: {
      A: 'Taquipneia compatível com pneumonia',
      B: 'Frequência respiratória normal para idade',
      C: 'Critério isolado de asma',
      D: 'Indicação de alta sem reavaliação',
    },
    resposta: 'A',
    explicacao:
      'Entre 2 e 11 meses, frequência respiratória maior ou igual a 50 irpm é ponto de corte clássico para taquipneia em suspeita de pneumonia.',
    dica: 'TEP cobra pontos de corte por idade: 2-11 meses, 50 irpm.',
    referencia: 'SBP - Pneumonia adquirida na comunidade na infância',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-pac-rx-1',
    title: 'Pneumonia sem gravidade',
    tema: 'Pneumologia',
    enunciado:
      'Criança maior, bom estado geral, suspeita clínica de pneumonia não grave, sem hipoxemia e com possibilidade de seguimento. Sobre radiografia de tórax:',
    alternativas: {
      A: 'É obrigatória em toda suspeita antes de tratar',
      B: 'Não deve ser usada de rotina em casos sem gravidade tratados ambulatorialmente',
      C: 'Substitui a avaliação clínica de gravidade',
      D: 'Deve ser repetida diariamente até cura',
    },
    resposta: 'B',
    explicacao:
      'Em PAC não grave, sem necessidade de internação, a radiografia não é rotina. A decisão é guiada por gravidade, complicação, dúvida diagnóstica ou falha terapêutica.',
    dica: 'Radiografia não deve virar ritual em pneumonia leve.',
    referencia: 'SBP - Pneumonia adquirida na comunidade na infância',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-bronquiolite-risco-1',
    title: 'Bronquiolite grave',
    tema: 'Pneumologia',
    enunciado:
      'Qual criança com bronquiolite tem maior risco de evolução grave e necessidade de internação/UTI?',
    alternativas: {
      A: 'Lactente prematuro com cardiopatia ou doença pulmonar crônica',
      B: 'Escolar hígido com coriza isolada',
      C: 'Adolescente vacinado com rinite alérgica controlada',
      D: 'Pré-escolar sem esforço respiratório e boa ingesta',
    },
    resposta: 'A',
    explicacao:
      'Prematuridade, baixa idade, cardiopatia, doença pulmonar crônica, imunodeficiência e baixo peso aumentam risco de bronquiolite grave.',
    dica: 'Bronquiolite é mais perigosa quanto menor e mais comórbido o lactente.',
    referencia: 'SBP - Bronquiolite aguda',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-influenza-1',
    title: 'Influenza',
    tema: 'Infectologia',
    enunciado:
      'Criança de 4 anos, asmática, inicia febre alta, mialgia e tosse há 24 horas durante circulação de influenza. Qual conduta deve ser considerada?',
    alternativas: {
      A: 'Oseltamivir precoce por pertencer a grupo de risco, além de suporte',
      B: 'Aguardar sete dias para confirmar por sorologia',
      C: 'AAS para controle de febre',
      D: 'Antibiótico obrigatório em todo caso suspeito',
    },
    resposta: 'A',
    explicacao:
      'Crianças com doença crônica, como asma, têm maior risco de complicações por influenza. Antiviral precoce é mais útil quando iniciado nas primeiras 48 horas.',
    dica: 'Influenza + grupo de risco = pense em antiviral cedo.',
    referencia: 'CDC/MS - manejo de influenza',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-coqueluche-1',
    title: 'Coqueluche',
    tema: 'Infectologia',
    enunciado:
      'Lactente jovem com crises de tosse paroxística, cianose durante as crises e contato domiciliar com adolescente tossidor. A conduta mais adequada é:',
    alternativas: {
      A: 'Suspeitar de coqueluche, tratar com macrolídeo e avaliar contatos',
      B: 'Alta sem orientação porque não há febre',
      C: 'Corticoide isolado por 30 dias',
      D: 'Aguardar cultura para iniciar qualquer medida',
    },
    resposta: 'A',
    explicacao:
      'Coqueluche pode ser grave em lactentes, inclusive sem febre. Tratamento e profilaxia/avaliação de contatos reduzem transmissão.',
    dica: 'Adolescente tossidor pode ser fonte para lactente ainda vulnerável.',
    referencia: 'CDC/MS - coqueluche',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-vacina-rotavirus-1',
    title: 'Vacina rotavírus',
    tema: 'Vacinas',
    enunciado:
      'Lactente chega atrasado para iniciar esquema de rotavírus. Qual princípio deve orientar a decisão?',
    alternativas: {
      A: 'Aplicar a primeira dose em qualquer idade até 5 anos',
      B: 'Respeitar limites máximos de idade para primeira e última dose',
      C: 'Reiniciar rotavírus anualmente',
      D: 'Aplicar dose dupla para compensar atraso',
    },
    resposta: 'B',
    explicacao:
      'Vacinas contra rotavírus têm limites de idade para início e término do esquema. Atraso pode contraindicar início dependendo da idade.',
    dica: 'Rotavírus é vacina em que idade máxima importa muito.',
    referencia: 'SBP - Calendário de Vacinação 2025/2026',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-vacina-influenza-1',
    title: 'Vacina influenza',
    tema: 'Vacinas',
    enunciado:
      'Criança de 8 meses nunca vacinada contra influenza. Segundo recomendações usuais, o esquema inicial deve prever:',
    alternativas: {
      A: 'Duas doses na primovacinação, com intervalo apropriado',
      B: 'Uma única dose para toda a vida',
      C: 'Vacina apenas a partir de 5 anos',
      D: 'Contraindicação se frequenta creche',
    },
    resposta: 'A',
    explicacao:
      'Na primovacinação contra influenza em crianças pequenas, são recomendadas duas doses. Depois, a vacinação é anual conforme calendário.',
    dica: 'Menor de 9 anos nunca vacinado: lembre da segunda dose.',
    referencia: 'SBP - Calendário de Vacinação 2025/2026',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-dengue-grupo-b-1',
    title: 'Dengue com sangramento de pele',
    tema: 'Infectologia',
    enunciado:
      'Criança com suspeita de dengue, bom estado geral, sem sinais de alarme, mas com prova do laço positiva e petéquias. Qual cuidado é mais adequado?',
    alternativas: {
      A: 'Classificar como risco maior que dengue simples, solicitar hemograma e orientar acompanhamento',
      B: 'Liberar sem hidratação e sem retorno',
      C: 'Prescrever AAS se plaquetas estiverem baixas',
      D: 'Indicar antibiótico por sete dias',
    },
    resposta: 'A',
    explicacao:
      'Manifestações hemorrágicas leves ou prova do laço positiva exigem maior vigilância e avaliação laboratorial, ainda que não haja sinais de choque.',
    dica: 'Dengue não é só plaqueta: sinais de alarme e hemoconcentração mandam.',
    referencia: 'Ministério da Saúde - Dengue 6ª edição, 2024',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-caderneta-tea-1',
    title: 'Triagem de TEA',
    tema: 'Desenvolvimento',
    enunciado:
      'Em consulta de puericultura, teste de triagem para TEA vem alterado. A interpretação correta é:',
    alternativas: {
      A: 'Confirma diagnóstico definitivo de TEA',
      B: 'Indica risco aumentado e necessidade de avaliação, orientação e intervenção precoce',
      C: 'Deve ser ignorado se a criança anda bem',
      D: 'Substitui avaliação auditiva e de linguagem',
    },
    resposta: 'B',
    explicacao:
      'Instrumentos como M-CHAT-R são triagens. Resultado alterado não fecha diagnóstico, mas exige avaliação do desenvolvimento e encaminhamento/intervenção precoce.',
    dica: 'Triagem positiva não é sentença, mas também não é para esperar.',
    referencia: 'Ministério da Saúde - Caderneta da Criança/TEA',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-crescimento-1',
    title: 'Crescimento infantil',
    tema: 'Ambulatorial',
    enunciado:
      'Na puericultura, queda sustentada de canais de crescimento no gráfico de peso/estatura deve levar a:',
    alternativas: {
      A: 'Investigar ingestão, doença crônica, contexto familiar e sinais de alarme',
      B: 'Aguardar sem plano até a adolescência',
      C: 'Usar apenas estimulante de apetite',
      D: 'Desconsiderar se a criança não tem febre',
    },
    resposta: 'A',
    explicacao:
      'A Caderneta da Criança organiza vigilância de crescimento e desenvolvimento. Queda sustentada de percentis exige avaliação clínica, nutricional e social.',
    dica: 'Curva importa mais que medida isolada.',
    referencia: 'Ministério da Saúde - Caderneta da Criança',
    origem: 'Prova de Títulos',
  },
  {
    id: 'tep-extra-choque-septico-1',
    title: 'Choque séptico',
    tema: 'Emergência',
    enunciado:
      'Criança febril, letárgica, extremidades frias, TEC de 5 segundos e pulsos finos. Qual é a prioridade?',
    alternativas: {
      A: 'Reconhecer choque, ofertar oxigênio, acesso vascular, fluidos guiados por reavaliação e antibiótico precoce',
      B: 'Aguardar hipotensão para iniciar tratamento',
      C: 'Alta após antitérmico',
      D: 'Antibiótico oral sem monitorização',
    },
    resposta: 'A',
    explicacao:
      'Choque pediátrico pode existir antes de hipotensão. Perfusão, consciência, pulso e tempo de enchimento capilar orientam intervenção imediata.',
    dica: 'Hipotensão é sinal tardio em criança.',
    origem: 'Prova de Títulos',
  },
]
