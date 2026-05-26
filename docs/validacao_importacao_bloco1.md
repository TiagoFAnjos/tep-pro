# TEP PRO - Validacao Bloco 1

Arquivos gerados em: C:\Users\tiago\Documents\Codex\2026-05-26\estou-usando-o-chatgpt-para-criar\outputs\tep-pro-bloco1

## Arquivos

- protocolos_final_bloco1.csv: 11 protocolos
- flashcards_final_bloco1.csv: 11 linhas, 8 flashcards por tema
- simulados_final_bloco1.csv: 11 questoes/casos

## Validacoes executadas

- Titulos unicos em protocolos
- Titulos consistentes entre protocolos, flashcards e simulados
- Campos obrigatorios preenchidos
- Flashcards com separador Pergunta::Resposta
- Simulados com resposta correta e explicacao

## Ordem recomendada de importacao

1. protocolos_final_bloco1.csv
2. flashcards_final_bloco1.csv
3. simulados_final_bloco1.csv

## Observacoes tecnicas

- Usar importador baseado em PapaParse. O importador manual atual em Protocolos.tsx usa split por virgula e quebra campos com virgulas ou quebras de linha.
- O upsert deve usar onConflict: title.
- Os titulos foram alinhados nos tres arquivos para evitar linhas duplicadas.
- Conteudo clinico deve ser revisado por medico habilitado e ajustado ao protocolo institucional antes de uso assistencial.
