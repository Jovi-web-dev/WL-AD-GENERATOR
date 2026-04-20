# Ad Generator

SaaS de geração de anúncios completos para marketplaces (foco inicial: Mercado Livre), com
pipeline de IA para gerar títulos, descrições, palavras-chave, imagens e clipes curtos a partir
das informações do produto.

> **Estado atual:** pré-MVP. Código em refatoração estruturada. Não usar em produção.

---

## Visão geral

Cliente preenche dados de um produto → plataforma consulta dados públicos do Mercado Livre para
benchmark → Claude gera textos otimizados e prompts de imagem/vídeo → Gemini (Nano Banana) gera as
imagens → fal.ai (Hailuo / Seedance / Veo) gera o clipe → cliente copia o anúncio pronto para o
Mercado Livre.

Modelo de negócio: **BYOK** (*Bring Your Own Key*). O cliente cadastra as chaves de API dele
(Anthropic, Google, fal.ai) na plataforma. A assinatura mensal dá acesso à ferramenta; o custo de
inferência corre pela conta do próprio cliente.

Três tiers de assinatura:

- **Starter** — títulos (tradicional + long tail), palavras-chave, descrição.
- **Pro** — Starter + título de catálogo + tags + 4 imagens.
- **Premium** — Pro + 5ª imagem + 1 clipe (15–30s) + acesso a modelo de vídeo top-tier.

---

## Stack

- **Frontend:** React 18 + Vite, CSS-in-JS via tokens de tema.
- **Backend:** Express + Node 20, PostgreSQL (driver `pg`), JWT.
- **Planejado (próximas etapas):** BullMQ + Redis (pipeline assíncrono), Cloudflare R2 (mídia),
  integração real com Anthropic / Gemini / fal.ai / API pública do Mercado Livre.

---

## Estrutura do repositório

```
.
├── client/                # Frontend React
│   └── src/
│       ├── components/    # UI compartilhada + Sidebar
│       ├── config/        # app.js concentra BRAND, NAV, CATEGORIES, MARKETPLACES
│       ├── lib/           # Cliente HTTP (api.js)
│       ├── pages/         # Uma página por rota lógica
│       └── theme/         # Tokens dos temas
│
├── server/                # Backend Express
│   └── src/
│       ├── db/            # Pool pg + bootstrap de tabelas
│       ├── middleware/    # auth, errorHandler
│       ├── routes/        # Handlers HTTP finos
│       └── services/      # Regras de negócio + wrappers de IA
│
├── shared/                # Schemas e tipos compartilhados
├── docs/                  # Documentação técnica pontual (deploy, providers)
├── index.html             # Entry do Vite
├── vite.config.mjs
└── package.json
```

---

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha.

| Variável | Obrigatória | Uso |
|---|---|---|
| `DATABASE_URL` | sim | String de conexão PostgreSQL. |
| `JWT_SECRET` | sim em produção | Chave de assinatura dos tokens de sessão. |
| `PORT` | não | Default `5000`. |
| `NODE_ENV` | não | `development` ou `production`. |

> **Importante:** a partir da Etapa 2 da refatoração, chaves de IA dos clientes serão
> armazenadas criptografadas no banco (não em variáveis de ambiente). Os campos
> `ANTHROPIC_API_KEY` e similares atualmente lidos em `process.env` são temporários.

---

## Executando localmente

Requisitos: Node 20, PostgreSQL acessível via `DATABASE_URL`.

```bash
npm install
npm start
```

O servidor sobe em `http://localhost:5000`. No modo `development`, o próprio Express embute o Vite
via middleware — ou seja, uma única URL serve frontend e API.

Em produção:

```bash
npm run build      # gera dist/
npm run start:prod # serve dist/ estático + API
```

---

## Executando no Replit

O projeto já traz `.replit` e `replit.nix` configurados para Node 20. Basta clonar, definir
`DATABASE_URL` (o Replit oferece PostgreSQL nativo) e `JWT_SECRET` nos *Secrets* do projeto e
apertar **Run**.

---

## Roadmap da refatoração

O projeto está sendo refatorado em etapas incrementais. Cada etapa é isolada e testável.

- [x] **Etapa 0 — Higiene.** Remoção de código legado, consolidação de docs, neutralização da
      marca no código (plataforma passa a usar `BRAND` centralizado em `client/src/config/app.js`).
- [ ] **Etapa 1 — Segurança da base.** Invite codes, JWT em cookie httpOnly com refresh rotation,
      validação Zod nas rotas, rate limit.
- [ ] **Etapa 2 — BYOK Vault.** Tabela de credenciais criptografadas (AES-256-GCM), UI de cadastro
      e validação de chaves por provider.
- [ ] **Etapa 3 — Tiers e cotas.** Enum de tier, assinaturas com cota por ciclo, middleware de
      gating.
- [ ] **Etapa 4 — Benchmark Mercado Livre.** App registrada no ML, cache de benchmark, prompts
      enriquecidos com top keywords/títulos reais.
- [ ] **Etapa 5 — Pipeline assíncrono.** BullMQ + Redis + workers, fluxo DAG, polling de status.
- [ ] **Etapa 6 — Integrações reais.** Gemini/Nano Banana, fal.ai (Hailuo/Seedance/Veo), upload
      para R2, concatenação de clipes via FFmpeg.
- [ ] **Etapa 7 — TypeScript gradual.** A partir dos adapters de providers.

---

## Branding

O nome comercial da plataforma é **placeholder** neste momento (`AdGen` em
`client/src/config/app.js` → `BRAND`). Quando o nome definitivo for escolhido, basta alterar o
objeto `BRAND` — nada mais precisa mudar na UI.

Conteúdo gerado para o cliente (títulos, descrições) é **agnóstico de marca**: nenhuma assinatura
da plataforma é embutida no texto que vai para o anúncio do cliente.

---

## Licença

Uso privado. Todos os direitos reservados.
