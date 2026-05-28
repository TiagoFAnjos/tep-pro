# Segurança para deploy do TEP PRO

## O que foi protegido no app

- O app exige login Supabase antes de mostrar qualquer tela.
- Usuários comuns entram em modo somente leitura.
- O botão `Importar CSV` aparece apenas para administradores.
- A revisão adaptativa global só pode ser alterada pelo administrador.
- A chave pública do Supabase saiu do código-fonte e passou para variáveis de ambiente.

## O que precisa ser aplicado no Supabase

A proteção real contra escrita indevida fica no Supabase, com RLS.

Execute o arquivo:

```text
docs/supabase_security_rls.sql
```

Antes de executar, troque:

```sql
'SEU_EMAIL_ADMIN_AQUI'
```

pelo e-mail que será o administrador do app.

Esse script cria:

- tabela `app_admins`;
- função `is_admin()`;
- leitura da tabela `questions` somente para usuários autenticados;
- `insert`, `update` e `delete` em `questions` somente para admin;
- bloqueio de acesso anônimo à tabela `questions`.

## Variáveis na Vercel

Configure no projeto da Vercel:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Os valores locais ficam em `.env.local`, que não é versionado pelo Git.

## Login de usuários

No Supabase, use `Authentication > Users` para criar ou aprovar usuários.

Recomendação para um app privado:

- desativar cadastro público se quiser controlar quem entra;
- criar usuários manualmente no painel do Supabase;
- deixar apenas seu e-mail cadastrado na tabela `app_admins`.

## Permissões finais

| Perfil | Pode ler | Pode importar CSV | Pode alterar revisão | Pode inserir/editar/excluir |
|---|---:|---:|---:|---:|
| Sem login | Não | Não | Não | Não |
| Usuário comum | Sim | Não | Não | Não |
| Admin | Sim | Sim | Sim | Sim |
