-- TEP PRO Content Upgrade - campos opcionais para evolução do conteúdo.
-- Seguro para executar mais de uma vez no SQL Editor do Supabase.
-- A primeira versão do app já funciona sem estes campos, usando fallback dos campos atuais.

begin;

alter table public.questions
  add column if not exists descricao_clinica_ampliada text,
  add column if not exists quadro_clinico_estruturado text,
  add column if not exists diagnostico_estruturado text,
  add column if not exists tratamento_estruturado text,
  add column if not exists raciocinio_tep text,
  add column if not exists conduta_pratica text,
  add column if not exists red_flags text,
  add column if not exists questoes_tep text;

comment on column public.questions.descricao_clinica_ampliada is
  'Camada TEP PRO: definição objetiva, relevância para TEP, epidemiologia e contexto ambulatorial/PA/emergência.';

comment on column public.questions.quadro_clinico_estruturado is
  'Camada TEP PRO: sintomas típicos, atípicos, variações por idade, red flags e achados que confundem em prova.';

comment on column public.questions.diagnostico_estruturado is
  'Camada TEP PRO: critérios clínicos, exames indicados, quando não pedir exame, diferenciais e pegadinhas.';

comment on column public.questions.tratamento_estruturado is
  'Camada TEP PRO: conduta inicial, primeira linha, alternativas, internação, UTI, encaminhamento, família e erros comuns.';

comment on column public.questions.raciocinio_tep is
  'Camada TEP PRO: palavras-chave, armadilhas, diferenciação diagnóstica e resposta mais provável em prova.';

comment on column public.questions.conduta_pratica is
  'Camada TEP PRO: pronto atendimento, ambulatório, estabilização, seguimento, retorno e sinais de alarme.';

comment on column public.questions.red_flags is
  'Camada TEP PRO: sinais de gravidade destacados para revisão rápida.';

comment on column public.questions.questoes_tep is
  'Camada TEP PRO: questões comentadas no estilo TEP, preservando simulado legado.';

commit;
