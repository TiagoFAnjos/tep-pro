# TEP PRO Content Upgrade - mapeamento e estratégia

## Estrutura atual encontrada

- Banco principal: Supabase, tabela `questions`.
- Tipagem principal: `src/types/question.ts`.
- Renderização dos temas: `src/pages/Protocolos.tsx`.
- Normalização dos dados lidos do banco: `src/utils/questions.ts`.
- CSVs-fonte/importação: `src/csv/Protocolos`, `src/csv/Flashcards` e `src/csv/Simulados`.
- Simulados estilo prova: `src/pages/ModoProva.tsx` e `src/data/provaTituloPediatria.ts`.
- Flashcards: `src/pages/Flashcards.tsx`.

## Primeira versão implementada

A primeira versão do upgrade é não destrutiva. Ela não substitui o conteúdo atual nem exige migration imediata.

Arquivos criados:

- `src/utils/tepContentUpgrade.ts`
- `src/components/ProtocolContentUpgrade.tsx`
- `docs/tep_content_upgrade_schema.sql`

Arquivos alterados:

- `src/types/question.ts`
- `src/pages/Protocolos.tsx`

## Novos campos opcionais

Foram adicionados ao tipo `Question` como opcionais:

- `descricao_clinica_ampliada`
- `quadro_clinico_estruturado`
- `diagnostico_estruturado`
- `tratamento_estruturado`
- `raciocinio_tep`
- `conduta_pratica`
- `red_flags`
- `questoes_tep`

Enquanto esses campos não existirem no Supabase, o app usa fallback dos campos atuais:

- `definicao`
- `sinais_sintomas`
- `diagnostico`
- `tratamento`
- `conduta`
- `medicacoes_doses`
- `sinais_gravidade`
- `criterios_internacao`
- `criterios_uti`
- `pegadinhas`
- `dica_tep`
- `checklist`
- `flashcards`
- `simulado`

## UX aplicada

A página de detalhe de cada protocolo agora exibe:

- revisão rápida;
- abas por seção;
- red flags destacadas;
- pegadinhas TEP destacadas;
- condutas práticas destacadas;
- flashcards do tema;
- questões estilo TEP quando cadastradas;
- conteúdo original completo preservado abaixo.

## Estratégia progressiva

1. Executar `docs/tep_content_upgrade_schema.sql` no Supabase quando quiser persistir os novos campos.
2. Enriquecer os temas por blocos, preenchendo primeiro:
   - `descricao_clinica_ampliada`
   - `quadro_clinico_estruturado`
   - `raciocinio_tep`
   - `conduta_pratica`
   - `red_flags`
3. Reimportar via CSV usando `title` como chave de conflito.
4. Manter o conteúdo legado como fonte de segurança até todos os temas estarem revisados.
5. Depois da revisão por blocos, separar estruturalmente protocolos, flashcards e questões em tabelas próprias.

## Como testar

1. Rodar `npm.cmd run lint`.
2. Rodar `npm.cmd run build`.
3. Abrir a página `Protocolos`.
4. Entrar em qualquer tema.
5. Conferir se aparece o painel `TEP PRO Content Upgrade`.
6. Conferir se o conteúdo antigo continua visível em `Conteúdo original completo`.
