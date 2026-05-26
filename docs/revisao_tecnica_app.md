# TEP PRO - Revisao tecnica do app

## Achados principais

### 1. Importador de CSV em Protocolos quebra campos longos

Arquivo: `C:\Users\tiago\tep-pro\src\pages\Protocolos.tsx`

Linhas relevantes: 90-108.

A pagina usa `text.split('\n')` e depois `line.split(',')`. Isso quebra qualquer CSV clinico real que tenha virgulas, quebras de linha, doses, alternativas ou explicacoes longas. Os CSVs finais do Bloco 1 precisam ser importados com PapaParse, como ja existe em `src/components/CsvImporter.tsx`.

Prioridade: alta.

Correcao recomendada:

- remover o parser manual de `Protocolos.tsx`;
- reutilizar `Papa.parse(file, { header: true, skipEmptyLines: true })`;
- filtrar linhas sem `title`;
- manter `upsert(..., { onConflict: 'title' })`;
- apos sucesso, chamar `fetchQuestions()`.

### 2. Textos da interface estao com mojibake

Arquivos afetados: `Protocolos.tsx`, `Flashcards.tsx`, `Simulados.tsx`, `Dashboard.tsx`, `MotorClinico.tsx`, `ModoProva.tsx`, `Revisao.tsx`, `Sidebar.tsx`.

Exemplos visiveis: `ðŸ“š`, `clÃ­nica`, `RevisÃ£o`, `NÃ£o definido`.

Isso indica que em algum momento os arquivos foram salvos/lidos com encoding errado. O app ainda pode funcionar, mas a experiencia visual fica quebrada.

Prioridade: alta para produto.

Correcao recomendada:

- salvar todos os `.tsx` como UTF-8;
- substituir emojis/textos corrompidos por texto UTF-8 normal ou por icones via biblioteca;
- revisar `index.html` para garantir `<meta charset="UTF-8">`.

### 3. Chave Supabase esta hardcoded

Arquivo: `C:\Users\tiago\tep-pro\src\lib\supabase.ts`

Linhas relevantes: 3-4.

A chave anon do Supabase pode ficar no frontend se as policies RLS estiverem corretas, mas nao deve ficar hardcoded no repositorio. Use variaveis Vite:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Prioridade: alta antes de deploy publico.

### 4. Lint falha com 19 erros

Comando executado:

```text
npm.cmd run lint
```

Principais causas:

- `any` explicito em paginas e importador;
- regra `react-hooks/immutability` reclamando de funcoes chamadas em `useEffect` antes da declaracao;
- problemas repetidos em `Dashboard`, `Flashcards`, `ModoProva`, `MotorClinico`, `Revisao`, `Simulados`.

Prioridade: media/alta antes de deploy.

Correcao recomendada:

- criar tipo `Question`;
- trocar `useState<any[]>` por `useState<Question[]>`;
- declarar `fetch...` antes do `useEffect` ou envolver em `useCallback`;
- tipar linhas importadas do CSV como `Partial<Question>`.

### 5. Modo Prova busca perguntas sem garantir simulado

Arquivo: `C:\Users\tiago\tep-pro\src\pages\ModoProva.tsx`

Linhas relevantes: 15-18.

Hoje busca qualquer linha da tabela `questions`, inclusive protocolos sem `simulado`. O correto e filtrar:

```ts
.not('simulado', 'is', null)
```

E idealmente excluir string vazia.

Prioridade: media.

### 6. Separacao editorial esta boa, mas o banco continua centralizado

O app separou as abas de Protocolos, Flashcards e Simulados, mas todos continuam na tabela `questions`. Isso e aceitavel para MVP porque o upsert por `title` e simples. Para evoluir, considere:

- `protocols`
- `flashcards`
- `simulated_questions`
- `review_events`
- `favorites`
- `profiles`

Prioridade: futura, depois do Bloco 1 estabilizado.

## Ordem tecnica recomendada

1. Corrigir importador CSV de `Protocolos.tsx` para PapaParse.
2. Corrigir mojibake da interface.
3. Mover Supabase URL/key para `.env`.
4. Tipar `Question`.
5. Corrigir lint.
6. Filtrar Modo Prova por `simulado`.
7. So depois investir em login, deploy e mobile.
