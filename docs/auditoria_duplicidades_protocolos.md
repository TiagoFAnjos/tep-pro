# Auditoria de duplicidades de protocolos

Data: 2026-05-28

## Resultado atual

- Não foram encontrados títulos exatamente duplicados após normalização simples de acentos, maiúsculas e pontuação.
- Não há linhas vazias sem título.
- As sobreposições reais antigas foram consolidadas em protocolos canônicos.
- A única sobreposição mantida intencionalmente foi `Asma grave` x `Asma infantil`, porque representam recortes clínicos diferentes.

## Protocolos consolidados

- `Dengue` foi incorporado em `Dengue pediátrica`.
- `Obesidade infantil` foi incorporado em `Obesidade pediátrica`.
- `RN prematuro com SDR` foi incorporado em `RN com SDR`.
- `Diabetes tipo 1` foi incorporado em `Diabetes mellitus tipo 1`.
- `Kawasaki` foi incorporado em `Doença de Kawasaki`.

## Protocolos mantidos separados

- `Asma grave`: crise grave, pronto atendimento, emergência e UTI.
- `Asma infantil`: doença crônica, controle, técnica inalatória, seguimento e prevenção de exacerbações.

## Conduta adotada

- O conteúdo textual útil das versões antigas foi incorporado nos destinos.
- Flashcards, simulados, favoritos e contadores de revisão foram preservados no protocolo canônico quando existiam.
- As linhas antigas consolidadas foram removidas do Supabase para não aparecerem duplicadas no app.
