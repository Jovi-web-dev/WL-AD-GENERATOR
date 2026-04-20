# Changelog

Registra mudanças relevantes no projeto. Segue [Keep a Changelog](https://keepachangelog.com/).

Datas no formato `YYYY-MM-DD`.

---

## [Não lançado]

### Etapa 0 — Higiene (2026-04-20)

Limpeza estrutural antes de iniciar a refatoração por etapas. Sem mudança funcional.

**Removido**
- Pasta `src/` legada contendo monólito React de 2008 linhas (substituído por `client/src/` modular).
- Pasta `public/` com `index.html` duplicado e órfão.
- Arquivo `wl-importados-platform.zip` indevidamente commitado no repositório.
- Documentos consolidados ou obsoletos: `INVENTARIO.md`, `INICIO-RAPIDO.md`,
  `docs/RESUMO-IMPLEMENTACAO.md`, `docs/UI-DOCUMENTATION.md`.
- Credenciais default pré-preenchidas no formulário de login (`LoginPage.jsx`) — era
  vulnerabilidade de acesso.
- Referências hardcoded à marca "WL Importados" em textos de UI, fallbacks de geração de texto
  no servidor e logs.

**Alterado**
- `package.json`: nome do projeto passa de `wl-importados-platform` para `ad-generator`; descrição
  neutralizada.
- `client/src/config/app.js`: introduzido objeto `BRAND` como ponto único de configuração do nome
  comercial da plataforma. Sidebar e LoginPage passam a consumir `BRAND`.
- `client/src/App.jsx`: componente default renomeado de `WLPlatform` para `AdGeneratorApp`.
- `client/src/theme/themes.js`: rótulo do tema principal alterado de "Padrão WL" para
  "Premium Dourado". Paleta de cores preservada integralmente.
- `README.md`: reescrito como fonte única de verdade documental, com roadmap de refatoração.
- `replit.md`: reduzido a notas específicas do ambiente Replit, delegando visão geral ao README.
- `server/src/services/ai/textService.js`: fallbacks de título, keywords e descrição agora
  agnósticos de marca (não embutem mais "WL Importados" no conteúdo gerado para clientes).
- `server/src/index.js`: log de startup sem referência à marca antiga.
- `index.html`: título e metadados neutros.

### Conhecido (será tratado nas próximas etapas)

- Autenticação JWT em `localStorage` (vulnerável a XSS) — será migrada para cookies httpOnly
  na Etapa 1.
- Registro aberto sem invite code — Etapa 1.
- Chaves de IA lidas de `process.env` em vez de por usuário (não é BYOK real) — Etapa 2.
- Tiers Starter/Pro/Premium não existem no modelo de dados — Etapa 3.
- Integração com Mercado Livre inexistente — Etapa 4.
- Geração síncrona, sem fila — Etapa 5.
- `mediaService.js` retorna apenas placeholders SVG, sem chamadas reais a Gemini/fal — Etapa 6.
