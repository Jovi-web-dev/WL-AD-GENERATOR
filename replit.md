# Notas de ambiente Replit

Este arquivo é consumido por agentes de IA do Replit (Replit AI, Ghostwriter, etc.) para entender
o projeto. A fonte de verdade documental é `README.md` — este arquivo contém apenas notas
específicas do Replit.

## Nome do projeto

`ad-generator` (ver `package.json`). O nome comercial exibido na UI é controlado pelo objeto
`BRAND` em `client/src/config/app.js` e atualmente contém um placeholder.

## Runtime

- Node.js 20 (`modules = ["nodejs-20"]` em `.replit`).
- Comando de desenvolvimento: `npm start`. Sobe Express + Vite middleware no mesmo processo em
  `0.0.0.0:5000`.
- Deploy configurado para *autoscale* com `npm run build` e `npm run start:prod`.

## Banco de dados

PostgreSQL é obrigatório via variável `DATABASE_URL`. O Replit oferece Postgres nativo — basta
criar no painel e a variável é injetada automaticamente.

## Segredos

Configure em **Secrets** (não em arquivos versionados):

- `DATABASE_URL` — string de conexão Postgres.
- `JWT_SECRET` — gerar com `openssl rand -hex 32`.

## Arquitetura

Ver `README.md` (seção *Estrutura do repositório* e *Roadmap da refatoração*) para visão completa
e próximas etapas.
