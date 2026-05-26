# TEP PRO - Checklist de importacao no Supabase

## Antes de importar

- Fazer backup/export da tabela `questions`.
- Confirmar que `title` tem constraint unica ou indice unico.
- Confirmar que as colunas abaixo existem na tabela:

```text
title
tema
dificuldade
definicao
fisiopatologia
fatores_risco
sinais_sintomas
diagnostico
conduta
tratamento
medicacoes_doses
diagnosticos_diferenciais
nivel_risco
palavras_chave_clinicas
conduta_emergencia
sinais_gravidade
criterios_internacao
criterios_uti
erros_comuns
pegadinhas
dica_tep
resumo
fluxograma
algoritmo
tabela_resumo
score_clinico
checklist
mini_aula
fontes
flashcards
simulado
```

Se alguma coluna nao existir, o import via Supabase vai falhar.

## Ordem de importacao

1. `protocolos_final_bloco1.csv`
2. `flashcards_final_bloco1.csv`
3. `simulados_final_bloco1.csv`

Todos usam os mesmos `title`, entao o `upsert` deve atualizar as mesmas linhas.

## Importador correto

Usar parser CSV robusto:

```text
PapaParse com header: true e skipEmptyLines: true
```

Nao usar `split(',')`, porque os protocolos tem virgulas, quebras de linha e textos longos.

## Validacao apos importacao

Rodar no app:

- Protocolos: buscar `RN com SDR`, `Choque septico`, `Cetoacidose diabetica`.
- Flashcards: confirmar que cada tema abre 8 cards.
- Simulados: confirmar que os casos aparecem com alternativas, resposta e explicacao.
- Motor Clinico: testar:

```text
Lactente febril com TEC 5 segundos, extremidades frias e oliguria
```

Deve priorizar choque septico/desidratacao grave conforme palavras-chave.

## Controle de qualidade clinica

- Validar doses por peso com protocolo institucional.
- Atualizar fontes quando houver nova diretriz.
- Marcar que a plataforma e apoio educacional/cognitivo, nao substitui decisao medica.
- Revisar especialmente: antibioticoterapia neonatal, surfactante, CAD, choque e sedacao/via aerea.
