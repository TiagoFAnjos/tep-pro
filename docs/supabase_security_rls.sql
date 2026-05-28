-- TEP PRO - Segurança Supabase
-- Execute este arquivo no SQL Editor do Supabase depois de criar o usuário admin em Authentication > Users.
--
-- Troque o e-mail no bloco "Primeiro administrador" pelo seu e-mail de login.

begin;

create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.app_admins enable row level security;
alter table public.questions enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

do $$
declare
  policy_name text;
begin
  for policy_name in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'questions'
  loop
    execute format('drop policy if exists %I on public.questions', policy_name);
  end loop;

  for policy_name in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'app_admins'
  loop
    execute format('drop policy if exists %I on public.app_admins', policy_name);
  end loop;
end $$;

revoke all on public.questions from anon;
grant select, insert, update, delete on public.questions to authenticated;

revoke all on public.app_admins from anon;
grant select, insert, update, delete on public.app_admins to authenticated;

grant usage on all sequences in schema public to authenticated;
revoke all on all sequences in schema public from anon;

create policy "Usuários autenticados podem ler protocolos"
on public.questions
for select
to authenticated
using (true);

create policy "Somente admins podem inserir protocolos"
on public.questions
for insert
to authenticated
with check (public.is_admin());

create policy "Somente admins podem atualizar protocolos"
on public.questions
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Somente admins podem excluir protocolos"
on public.questions
for delete
to authenticated
using (public.is_admin());

create policy "Usuário pode ver o próprio registro admin"
on public.app_admins
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Admins podem cadastrar outros admins"
on public.app_admins
for insert
to authenticated
with check (public.is_admin());

create policy "Admins podem atualizar admins"
on public.app_admins
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins podem remover admins"
on public.app_admins
for delete
to authenticated
using (public.is_admin());

-- Primeiro administrador:
-- 1. Crie seu usuário em Authentication > Users ou faça cadastro pelo app.
-- 2. Confirme o e-mail, se a confirmação estiver ativada.
-- 3. Troque o e-mail abaixo pelo seu e-mail e execute este insert junto do script.

insert into public.app_admins (user_id, email)
select id, email
from auth.users
where lower(email) = lower('SEU_EMAIL_ADMIN_AQUI')
on conflict (user_id) do update
set email = excluded.email;

commit;
