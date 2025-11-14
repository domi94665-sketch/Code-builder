# Codex Architect Workspace

Plataforma full-stack de produtividade construída com Next.js 14, Supabase, Sanity e Tailwind CSS.

## Stack

- **Frontend:** Next.js 14 (App Router) com Tailwind CSS e componentes reutilizáveis.
- **Backend:** API Routes tipadas com Supabase como camada de dados.
- **Autenticação:** Supabase Auth com middleware de proteção.
- **CMS:** Sanity.io com schema de Playbooks.
- **Infra:** Deploy sugerido em Vercel + Supabase + Sanity.

## Requisitos

- Node.js 18+
- Conta Supabase com projeto configurado
- Conta Sanity com dataset

## Instalação

```bash
npm install
```

Cria um ficheiro `.env.local` baseado em `.env.example` com as credenciais do Supabase e Sanity.

```bash
cp .env.example .env.local
```

### Variáveis necessárias

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`

## Setup da base de dados

Executa o SQL em `supabase/migrations/0001_init.sql` no teu projeto Supabase.

Configura a tabela `tasks` e `profiles` com as políticas de segurança incluídas.

## Executar em desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

## Sanity CMS

1. Instala as dependências do Sanity:
   ```bash
   npm install --save-dev sanity @sanity/cli
   ```
2. Inicia o estúdio:
   ```bash
   npx sanity dev
   ```
3. Define playbooks no schema `sanity/schemas/playbook.ts`.

## Estrutura de pastas

```
app/
  (auth)/login     # fluxo de autenticação com Supabase magic link
  api/tasks        # API REST para tarefas
  dashboard        # dashboard autenticado
  playbooks        # listagem de playbooks vindos do Sanity
components/        # UI reutilizável e providers
lib/               # utilitários Supabase e Sanity
sanity/            # configuração do CMS
supabase/          # migrações SQL
```

## Scripts úteis

- `npm run dev` - inicia o servidor local
- `npm run build` - compila para produção
- `npm run start` - inicia em modo produção
- `npm run lint` - verifica linting com ESLint

## Autenticação

O fluxo utiliza magic links. Atualiza o `emailRedirectTo` em `app/(auth)/login/page.tsx` conforme o domínio final.

## Deploy

1. Faz deploy do frontend para a Vercel.
2. Define as variáveis de ambiente no dashboard da Vercel.
3. Faz deploy das migrações na Supabase.
4. Configura o Sanity com o schema fornecido e gera um token de leitura.

Com isto, tens uma base sólida para expandir funcionalidades rapidamente.
